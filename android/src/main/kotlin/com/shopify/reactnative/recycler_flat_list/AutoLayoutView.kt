package com.shopify.reactnative.recycler_flat_list

import android.content.Context
import android.graphics.Canvas
import android.util.DisplayMetrics
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.views.view.ReactViewGroup


/** Container for all RecyclerListView children. This will automatically remove all gaps and overlaps for GridLayouts with flexible spans.
 * Note: This cannot work for masonry layouts i.e, pinterest like layout */
class AutoLayoutView(context: Context) : ReactViewGroup(context) {
    val alShadow = AutoLayoutShadow()
    var enableInstrumentation = false

    var pixelDensity = 1.0;

    /** Overriding draw instead of onLayout. RecyclerListView uses absolute positions for each and every item which means that changes in child layouts may not trigger onLayout on this container. The same layout
     * can still cause views to overlap. Therefore, it makes sense to override draw to do correction. */
    override fun dispatchDraw(canvas: Canvas?) {
        fixLayout()
        super.dispatchDraw(canvas)

        if (enableInstrumentation) {
            // Since we need to call this method with scrollOffset on the UI thread and not with the one react has we're querying parent's parent
            // directly which will be a ScrollView. If it isn't reported values will be incorrect but the component will not break.
            // RecyclerListView is expected not to change the hierarchy of children.
            alShadow.computeBlankFromGivenOffset((parent.parent as View).let {
                if (alShadow.horizontal) it.scrollX else it.scrollY
            })
            emitBlankAreaEvent()
        }
    }

    /** Sorts views by index and then invokes clearGaps which does the correction.
     * Performance: Sort is needed. Given relatively low number of views in RecyclerListView render tree this should be a non issue.*/
    private fun fixLayout() {
        if (childCount > 1) {
            val positionSortedViews = Array(childCount) { getChildAt(it) as CellContainer }
            positionSortedViews.sortBy { it.index }
            alShadow.clearGapsAndOverlaps(positionSortedViews)
//            (parent as View).let {
//                it.bottom = (alShadow.height);
//                it.layout(it.left, it.top, it.right, alShadow.height)
//                it.requestLayout()
//            }
            this.bottom = this.top + alShadow.height
            (parent as View).bottom = (parent as View).top + alShadow.height
            (parent.parent as View).bottom = (parent.parent as View).top + alShadow.height
        }
    }

    override fun requestLayout() {
        super.requestLayout()

        // This view relies on a measure + layout pass happening after it calls requestLayout().
        // https://github.com/facebook/react-native/issues/4990#issuecomment-180415510
        // https://stackoverflow.com/questions/39836356/react-native-resize-custom-ui-component
        post(measureAndLayout)
    }

    private val measureAndLayout = Runnable {
        val p = (parent.parent as View)
        p.measure(MeasureSpec.makeMeasureSpec(p.width, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(p.height, MeasureSpec.EXACTLY))
        p.layout(p.left, p.top, p.right, p.bottom)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        fixLayout()
        super.onLayout(changed, left, top, right, bottom)
    }

    /** TODO: Check migration to Fabric*/
    private fun emitBlankAreaEvent() {
        val event: WritableMap = Arguments.createMap()
        val blanks: WritableMap = Arguments.createMap()
        blanks.putDouble("startOffset", alShadow.blankOffsetAtStart / pixelDensity)
        blanks.putDouble("endOffset", alShadow.blankOffsetAtEnd / pixelDensity)
        event.putMap("blanks", blanks)
        val reactContext = context as ReactContext
        reactContext
                .getJSModule(RCTEventEmitter::class.java).receiveEvent(id, Constants.EVENT_BLANK_AREA, event)
    }
}
