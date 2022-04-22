//
//  CellContainerView.cpp
//  RNFlashList
//
//  Created by Marek Fort on 22.04.22.
//

#ifdef RN_FABRIC_ENABLED

#include "CellContainerView.hpp"

#import <react/renderer/components/rnflashlist/ComponentDescriptors.h>
#import <react/renderer/components/rnflashlist/Props.h>
#import <react/renderer/components/rnflashlist/RCTComponentViewHelpers.h>
#import <react/renderer/components/rnflashlist/ShadowNodes.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface CellContainerView ()
@end

@implementation CellContainerView {
    CellContainer *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<CellContainerComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const CellContainerProps>();
        _props = defaultProps;

        _view = [[CellContainer alloc] init];
        _view.index = defaultProps->index;

        self.contentView = _view;
    }

    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<MapViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<MapViewProps const>(props);

    if(oldViewProps.index != newViewProps.index) {
        _view.index = newViewProps.index;
    }
    [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> CellConatinerViewCls(void)
{
    return CellContainerView.class;
}
#endif // RN_FABRIC_ENABLED
