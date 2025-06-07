"use client";

import { useCallback, useEffect, useState } from "react";
import { FaLink, FaCopy, FaMobile, FaDesktop } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { DeviceTypeEnum, ExpiryTypeEnum, TimeUnitEnum } from "@/types";
import AdvancedSettings from "./AdvanceSetting";
import { useValidation } from "@/app/hooks/auth/useValidation";
import { shortUrlSchema } from "@/app/lib/validation/short_url";
import { useSubmitUrl } from "@/app/hooks/url_shortener/useSubmitUrl";
import { ShortUrlData } from "@/types/url";
import { dateTimeFormatter } from "@/utils/helper/date_time_formater";
import toast from "react-hot-toast";
import { QRCodeSVG } from 'qrcode.react';


const initialSettings = {
  countryRestriction: false,
  showCountryDropdown: false,
  restrictedCountries: [] as string[],
  expiryType: null as ExpiryTypeEnum | null,
  maxClicks: 0,
  expiryTimeValue: 0,
  expiryTimeUnit: TimeUnitEnum.HOURS as TimeUnitEnum | null,
  showAdvanceSettings: false,
  analytics: false,
};

const UrlShortener = () => {

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState<DeviceTypeEnum>(DeviceTypeEnum.BOTH);
  const [shortUrlType, setShortUrlType] = useState<DeviceTypeEnum>(DeviceTypeEnum.BOTH);

  // Advanced settings state
  const [settings, setSettings] = useState(initialSettings);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOriginalUrl(value);
  }

  const handleDeviceTypeChange = (type: DeviceTypeEnum) => {
    setDeviceType(type);
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(
      () => setCopiedUrl(null),
      2000
    );
  }

  const { validate, errors: validationErrors } = useValidation(shortUrlSchema);
  const { shortUrl, data, isPending, isError, error } = useSubmitUrl();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setShortenedUrl("");

    setSettings((prev) => ({ ...prev, showAdvanceSettings: false }));

    try {
      // handle validate the form data.
      const urlData: ShortUrlData = {
        url: originalUrl,
        device_type: deviceType,
        restricted_countries: settings.restrictedCountries,
        expire_data: {
          type: settings.expiryType,
          unit: settings.expiryTimeUnit,
          value: settings.expiryType === ExpiryTypeEnum.CLICKS ? settings.maxClicks : settings.expiryTimeValue
        },
        analytics: settings.analytics
      }

      const result = validate(urlData);
      console.log("short url result: ", result);
      console.log("url Data : ", urlData);

      if (!result.valid) return;

      // handle submit the url.

      shortUrl(urlData, {
        onSuccess: (data) => {
          setShortenedUrl(data.data.short_url);
          setShortUrlType(data.data.device_type.toUpperCase());
          toast.success("shorter url generated")
        }
      });
      console.log("short url: ", data);

    } catch (error) {

      console.log(error);
      

      // TODO: "Failed to shorten URL. Please try again."
      toast.error("failed to short url, try again")

    }
  }, [deviceType, originalUrl, settings, data, shortUrl, validate]);

  const updateSetting = useCallback(
    <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border-2 border-gray-200 pt-12">

      {/* all errors are shown here  */}
      {(validationErrors) && Object.keys(validationErrors).length > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          {Object.entries(validationErrors).map(([field, message], index) => (
            <p key={index} className="text-red-600 text-sm">
              <strong>{field}:</strong> {message}
            </p>
          ))}
        </div>
      )}

      {(isError) && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 text-sm">
            {`${error}`}
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Shorten Your URL
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        {/* Device Type Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select device type
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleDeviceTypeChange(DeviceTypeEnum.DESKTOP)}
              className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${deviceType === DeviceTypeEnum.DESKTOP
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              <FaDesktop />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => handleDeviceTypeChange(DeviceTypeEnum.MOBILE)}
              className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${deviceType === DeviceTypeEnum.MOBILE
                ? "bg-purple-100 border-purple-500 text-purple-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              <FaMobile />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => handleDeviceTypeChange(DeviceTypeEnum.BOTH)}
              className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${deviceType === DeviceTypeEnum.BOTH
                ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center">
                <FaDesktop className="mr-1" />
                <FaMobile className="ml-1" />
              </div>
              <span>Both</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label
              htmlFor="originalUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter your long URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLink className="text-gray-400" />
              </div>
              <input
                type="url"
                id="originalUrl"
                name="originalUrl"
                value={originalUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/very-long-url"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="md:self-end">
            <button
              type="submit"
              disabled={isPending}
              className={`w-full md:w-auto px-6 py-3 border border-transparent text-sm font-bold tracking-wider rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isPending ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </div>

        <AdvancedSettings settings={settings} updateSetting={updateSetting} />
      </form>

      {shortenedUrl != "" && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-indigo-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-grow space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Your shortened URL :
              </p>

              {/* shortened URL */}
              {shortenedUrl !== "" && (
                <div className="space-y-1">
                  <div className="flex gap-4">

                    {
                      shortUrlType === DeviceTypeEnum.BOTH ? (
                        <div className="flex gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            <FaDesktop className="mr-1" /> Desktop
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            <FaMobile className="mr-1" /> Mobile
                          </span>

                        </div>
                      ) : shortUrlType === DeviceTypeEnum.MOBILE ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          <FaMobile className="mr-1" /> Mobile
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          <FaDesktop className="mr-1" /> Desktop
                        </span>
                      )
                    }

                    {data?.data && data.data.expire_type ? (
                      <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white ">
                        <span className="text-sm font-medium text-black/50">
                          Expires
                        </span>
                        <span className="text-sm text-gray-600 font-semibold">
                          {data.data.expire_type === "time"
                            ? dateTimeFormatter(data.data.expire_at)
                            : `${data.data.expire_clicks} click${data.data.expire_clicks !== 1 ? "s" : ""}`}
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">Never expires</div>
                    )}


                  </div>
                  <div className="flex items-center">
                    <a
                      href={shortenedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all mr-2"
                    >
                      {shortenedUrl}
                    </a>
                    <FiExternalLink className="text-gray-500 flex-shrink-0" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
              {shortenedUrl && (
                <button
                  onClick={() => copyToClipboard(shortenedUrl)}
                  className="flex-shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {copiedUrl === shortenedUrl ? (
                    "Copied!"
                  ) : (
                    <>
                      <FaCopy className="inline mr-1" /> Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* qr code for the link  */}
          <div className="mt-8">
            <QRCodeSVG value={shortenedUrl} size={256} level="H" />
          </div>

        </div>
      )}
    </div>
  );
};

export default UrlShortener;