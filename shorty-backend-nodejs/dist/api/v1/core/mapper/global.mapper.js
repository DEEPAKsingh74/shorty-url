"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserMap = exports.operatingSystemMap = exports.analyticDeviceTypeMap = exports.paymentMapper = exports.expireUnitMap = exports.expireTypeMap = exports.deviceTypeMap = void 0;
const client_1 = require("@prisma/client");
exports.deviceTypeMap = {
    both: client_1.DeviceType.both,
    mobile: client_1.DeviceType.mobile,
    desktop: client_1.DeviceType.desktop
};
exports.expireTypeMap = {
    clicks: client_1.ExpireType.clicks,
    time: client_1.ExpireType.time
};
exports.expireUnitMap = {
    months: client_1.ExpireUnit.months,
    days: client_1.ExpireUnit.days,
    hours: client_1.ExpireUnit.hours
};
exports.paymentMapper = {
    pending: client_1.PaymentStatus.pending,
    failed: client_1.PaymentStatus.failed,
    success: client_1.PaymentStatus.success,
    cancel: client_1.PaymentStatus.canceled,
    refund: client_1.PaymentStatus.refunded,
};
exports.analyticDeviceTypeMap = {
    mobile: client_1.AnalyticDeviceType.mobile,
    desktop: client_1.AnalyticDeviceType.desktop
};
exports.operatingSystemMap = {
    mac_os: client_1.OperatingSystemEnum.mac_os,
    window: client_1.OperatingSystemEnum.windows,
    other: client_1.OperatingSystemEnum.other
};
exports.browserMap = {
    chrome: client_1.BrowserEnum.chrome,
    edge: client_1.BrowserEnum.edge,
    firefox: client_1.BrowserEnum.firefox,
    safari: client_1.BrowserEnum.safari,
    opera: client_1.BrowserEnum.opera,
    other: client_1.BrowserEnum.other
};
