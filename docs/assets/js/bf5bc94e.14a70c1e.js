"use strict";(self.webpackChunkflash_list=self.webpackChunkflash_list||[]).push([[767],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),h=r,d=m["".concat(l,".").concat(h)]||m[h]||p[h]||o;return n?a.createElement(d,i(i({ref:t},u),{},{components:n})):a.createElement(d,i({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9959:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],s={id:"metrics",title:"Metrics",slug:"/metrics",sidebar_position:1},l=void 0,c={unversionedId:"fundamentals/metrics",id:"fundamentals/metrics",title:"Metrics",description:"FlashList enables you to track metrics in production that can give you more insight into how your app is doing in terms of performance. We recommend that you track the following in production:",source:"@site/docs/fundamentals/metrics.md",sourceDirName:"fundamentals",slug:"/metrics",permalink:"/flash-list/docs/metrics",editUrl:"https://github.com/shopify/flash-list/edit/main/docusaurus/docs/fundamentals/metrics.md",tags:[],version:"current",lastUpdatedBy:"Marek Fo\u0159t",lastUpdatedAt:1656607198,formattedLastUpdatedAt:"6/30/2022",sidebarPosition:1,frontMatter:{id:"metrics",title:"Metrics",slug:"/metrics",sidebar_position:1},sidebar:"autoSidebar",previous:{title:"Usage",permalink:"/flash-list/docs/usage"},next:{title:"Performance troubleshooting",permalink:"/flash-list/docs/performance-troubleshooting"}},u=[{value:"Visible blank area",id:"visible-blank-area",children:[],level:3},{value:"Load time",id:"load-time",children:[],level:3},{value:"Sampling",id:"sampling",children:[],level:3}],p={toc:u};function m(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"FlashList enables you to track metrics in production that can give you more insight into how your app is doing in terms of performance. We recommend that you track the following in production:"),(0,o.kt)("h3",{id:"visible-blank-area"},"Visible blank area"),(0,o.kt)("p",null,"FlashList comes with a hook that can track cumulative and maximum blank space that the user experienced while scrolling the list. The cost of tracking this metric is minimal and you can implement it in the following way:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const MyComponent = () => {\n  // `any` is the type of data. You can mention the type of data that you're using with your FlashList implementation.\n  const ref = useRef<FlashList<any>>(null);\n\n  // The tracking will happen for the entire lifecycle of the list and the result object will always have the latest values.\n  // You can make a call when to ingest this data. We recommend that you ingest when the list unmounts.\n  const [blankAreaTrackerResult, onBlankArea] = useBlankAreaTracker(ref);\n  useEffect(() => {\n    return () => {\n      // When component is being cleaned up, you can ingest the result into your analytics system.\n      // blankAreaTrackerResult has two fields - `cumulativeBlankArea` and `maxBlankArea`. `cumulativeBlankArea` is the total blank area that the user has seen while scrolling the list.\n      // maxBlankArea is the maximum blank area that the user has seen while scrolling the list.\n      ingestData(blankAreaTrackerResult);\n    };\n  }, []);\n\n  // pass the listener returned by the hook to FlashList\n  return <FlashList {...props} ref={ref} onBlankArea={onBlankArea} />;\n};\n")),(0,o.kt)("p",null,"You can rest assured when you see close to zero blank space in production. If you're not happy with the numbers, please refer to our ",(0,o.kt)("a",{parentName:"p",href:"/flash-list/docs/performance-troubleshooting"},"performance troubleshooting guide")," which can help you optimize your list's performance."),(0,o.kt)("h3",{id:"load-time"},"Load time"),(0,o.kt)("p",null,"FlashList has a built in ",(0,o.kt)("inlineCode",{parentName:"p"},"onLoad")," event that you can use to track the time taken to load the list. This tracks elapsed time from the point the list was created to the time when it's children are visible to the user."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'const MyComponent = () => {\n    const onLoadListener = useCallback(({ elapsedTimeInMs } ) => {\n        ingestData("Sample List load time", elapsedTimeInMs);\n    }, []);\n    return <FlashList {...props} onLoad={onLoadListener} />;\n')),(0,o.kt)("h3",{id:"sampling"},"Sampling"),(0,o.kt)("p",null,"Please note that you can always sample data collected by your implementation. It's possible to get an accurate picture of how your app is performing by collecting data from a subset of users. This is important incase you want to limit how much data you collect."))}m.isMDXComponent=!0}}]);