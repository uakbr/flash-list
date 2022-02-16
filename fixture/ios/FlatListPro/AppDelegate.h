//#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
//#import <reacthermes/HermesExecutorFactory.h>
//#import <React/RCTCxxBridgeDelegate.h>
//#import <React/RCTJSIExecutorRuntimeInstaller.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong, readonly) RCTBridge *bridge;


@end
