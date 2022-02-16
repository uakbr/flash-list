require 'json'

folly_version = '2021.06.28.00-v2'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name             = 'RNFlashList'
  s.version          = package['version']
  s.summary          = package['description']
  s.homepage         = package['homepage']
  s.license          = package['license']
  s.author           = package['author']
  s.platform         = :ios, '11.0'
  s.source           = { git: 'https://github.com/shopify/flash-list.git', tag: 'v#{s.version}' }
  s.source_files     = 'ios/Sources/**/*'
  s.requires_arc     = true
  s.swift_version    = '5.0'

  s.compiler_flags  = folly_compiler_flags

  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\""
  }

  s.dependency "React"
  s.dependency "React-RCTFabric" # This is for fabric component
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", folly_version
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"

  # Dependencies
  s.dependency 'React-Core'

  # Tests spec
  s.test_spec 'Tests' do |test_spec|
    test_spec.source_files = 'ios/Tests/**/*'
    test_spec.framework = 'XCTest'
  end
end
