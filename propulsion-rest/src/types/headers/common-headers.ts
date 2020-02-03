export const CommonRequestHeaderMap = {
  upgradeInsecureRequests: "Upgrade-Insecure-Requests",
  xRequestedWith: "X-Requested-With",
  dnt: "DNT",
  xForwardedFor: "X-Forwarded-For",
  xForwardedHost: "X-Forwarded-Host",
  xForwardedProto: "X-Forwarded-Proto",
  frontEndHttps: "Front-End-Https",
  xHttpMethodOverride: "X-Http-Method-Override",
  xAttDeviceId: "X-ATT-DeviceId",
  xWapProfile: "X-Wap-Profile",
  proxyConnection: "Proxy-Connection",
  xUidh: "X-UIDH",
  xCsrfToken: "X-Csrf-Token",
  xRequestId: "X-Request-ID",
  xCorrelationId: "X-Correlation-ID",
  saveData: "Save-Data"
};
export type CommonRequestHeaderMapType = typeof CommonRequestHeaderMap;
export type CommonRequestHeaderNameShort = keyof CommonRequestHeaderMapType;
export type CommonRequestHeaderName = CommonRequestHeaderMapType[keyof CommonRequestHeaderMapType];
