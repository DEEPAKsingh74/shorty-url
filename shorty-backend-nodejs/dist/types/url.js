"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserEnum = exports.OperatingSystemEnum = exports.AnalyticDeviceType = exports.DeviceTypeEnum = exports.ExpireUnitEnum = exports.ExpireTypeEnum = void 0;
var ExpireTypeEnum;
(function (ExpireTypeEnum) {
    ExpireTypeEnum["CLICKS"] = "CLICKS";
    ExpireTypeEnum["TIME"] = "TIME";
})(ExpireTypeEnum || (exports.ExpireTypeEnum = ExpireTypeEnum = {}));
var ExpireUnitEnum;
(function (ExpireUnitEnum) {
    ExpireUnitEnum["MONTHS"] = "MONTHS";
    ExpireUnitEnum["DAYS"] = "DAYS";
    ExpireUnitEnum["HOURS"] = "HOURS";
})(ExpireUnitEnum || (exports.ExpireUnitEnum = ExpireUnitEnum = {}));
var DeviceTypeEnum;
(function (DeviceTypeEnum) {
    DeviceTypeEnum["BOTH"] = "BOTH";
    DeviceTypeEnum["MOBILE"] = "MOBILE";
    DeviceTypeEnum["DESKTOP"] = "DESKTOP";
})(DeviceTypeEnum || (exports.DeviceTypeEnum = DeviceTypeEnum = {}));
var AnalyticDeviceType;
(function (AnalyticDeviceType) {
    AnalyticDeviceType["MOBILE"] = "mobile";
    AnalyticDeviceType["DESKTOP"] = "desktop";
})(AnalyticDeviceType || (exports.AnalyticDeviceType = AnalyticDeviceType = {}));
var OperatingSystemEnum;
(function (OperatingSystemEnum) {
    OperatingSystemEnum["MAC_OS"] = "mac_os";
    OperatingSystemEnum["WINDOWS"] = "windows";
    OperatingSystemEnum["OTHER"] = "other";
})(OperatingSystemEnum || (exports.OperatingSystemEnum = OperatingSystemEnum = {}));
var BrowserEnum;
(function (BrowserEnum) {
    BrowserEnum["CHROME"] = "chrome";
    BrowserEnum["FIREFOX"] = "firefox";
    BrowserEnum["SAFARI"] = "safari";
    BrowserEnum["EDGE"] = "edge";
    BrowserEnum["OPERA"] = "opera";
    BrowserEnum["OTHER"] = "other";
})(BrowserEnum || (exports.BrowserEnum = BrowserEnum = {}));
