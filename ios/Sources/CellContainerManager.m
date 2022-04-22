#import <RNFlashList-Swift.h>
#import "CellContainerManager.h"

@implementation CellContainerManager

RCT_EXPORT_MODULE(CellContainer)

RCT_EXPORT_VIEW_PROPERTY(index, NSInteger);

- (UIView *)view
{
    return [CellContainer  new];
}

@end
