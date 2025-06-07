import { AnalyticDeviceType, BrowserEnum, DeviceType, ExpireType, ExpireUnit, OperatingSystemEnum, PaymentStatus } from '@prisma/client';

export const deviceTypeMap: Record<string, DeviceType> = {
  both: DeviceType.both,
  mobile: DeviceType.mobile,
  desktop: DeviceType.desktop
};

export const expireTypeMap: Record<string, ExpireType> = {
  clicks: ExpireType.clicks,
  time: ExpireType.time
};

export const expireUnitMap: Record<string, ExpireUnit> = {
  months: ExpireUnit.months,
  days: ExpireUnit.days,
  hours: ExpireUnit.hours
};

export const paymentMapper: Record<string, PaymentStatus> = {
  pending: PaymentStatus.pending,
  failed: PaymentStatus.failed,
  success: PaymentStatus.success,
  cancel: PaymentStatus.canceled,
  refund: PaymentStatus.refunded,

};

export const analyticDeviceTypeMap: Record<string, AnalyticDeviceType> = {
  mobile: AnalyticDeviceType.mobile,
  desktop: AnalyticDeviceType.desktop
};

export const operatingSystemMap: Record<string, OperatingSystemEnum> = {
  mac_os: OperatingSystemEnum.mac_os,
  window: OperatingSystemEnum.windows,
  other: OperatingSystemEnum.other
};
export const browserMap: Record<string, BrowserEnum> = {
  chrome: BrowserEnum.chrome,
  edge: BrowserEnum.edge,
  firefox: BrowserEnum.firefox,
  safari: BrowserEnum.safari,
  opera: BrowserEnum.opera,
  other: BrowserEnum.other
};


