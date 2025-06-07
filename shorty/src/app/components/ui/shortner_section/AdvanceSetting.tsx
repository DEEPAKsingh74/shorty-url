import { useUrlCountQuery } from "@/app/hooks/analytics/useGetUrlCount";
import { useUserStore } from "@/state/store/auth.store";
import { ExpiryTypeEnum, TimeUnitEnum } from "@/types";
import { countries } from "@/utils/constants/country_codes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { FaGlobe, FaTimes } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Settings {
  countryRestriction: boolean;
  showCountryDropdown: boolean;
  restrictedCountries: string[];
  expiryType: ExpiryTypeEnum | null;
  maxClicks: number;
  expiryTimeValue: number;
  expiryTimeUnit: TimeUnitEnum | null;
  showAdvanceSettings: boolean;
  analytics: boolean;
}

interface AdvancedSettingsProps {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const AdvancedSettings = ({ settings, updateSetting }: AdvancedSettingsProps) => {

  const router = useRouter();

  const { isLoggedIn } = useUserStore()

  const toggleCountry = (countryCode: string) => {
    if (settings.restrictedCountries.includes(countryCode)) {
      const newRestrictedCountries = settings.restrictedCountries.filter(
        (c) => c !== countryCode
      );
      updateSetting("restrictedCountries", newRestrictedCountries);
    } else {
      updateSetting("restrictedCountries", [
        ...settings.restrictedCountries,
        countryCode,
      ]);
    }
  };

  const resetSettings = () => {
    updateSetting("countryRestriction", false);
    updateSetting("showCountryDropdown", false);
    updateSetting("expiryType", null);
    updateSetting("maxClicks", 0);
    updateSetting("expiryTimeValue", 0);
    updateSetting("expiryTimeUnit", TimeUnitEnum.HOURS);
    updateSetting("showAdvanceSettings", false);
    updateSetting("restrictedCountries", []);
    updateSetting("analytics", false);
  };

  const { data, isLoading } = useUrlCountQuery({
    enabled: typeof settings.analytics === 'boolean' && settings.analytics,
  });

  console.log("Analytics data: ", data, isLoading, settings.analytics);


  const handleAddAnalytics = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newAnalyticsState = e.target.checked;

      if (!isLoggedIn) {
        router.push("/auth/login");
        return;
      }

      // If enabling analytics, check limits
      if (newAnalyticsState && data?.data) {
        if (data.data.totalUrls <= data.data.urlUsed) {
          toast.error("Please upgrade your plan to add analytics");
          router.push("/pricing");
          return;
        }
      }

      // Update the setting if all checks pass
      updateSetting("analytics", newAnalyticsState);

    } catch (error) {
      console.error("Error toggling analytics:", error);
      toast.error("Failed to update analytics settings");
    }
  }, [isLoggedIn, data, router, updateSetting]);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() =>
          updateSetting("showAdvanceSettings", !settings.showAdvanceSettings)
        }
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        {settings.showAdvanceSettings ? (
          <>
            <span>Hide Advanced Settings</span>
            <FiChevronUp className="ml-1" />
          </>
        ) : (
          <>
            <span>Show Advanced Settings</span>
            <FiChevronDown className="ml-1" />
          </>
        )}
      </button>

      {settings.showAdvanceSettings && (
        <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-6">
          {/* Analytics Toggle - Fixed Section */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-6 justify-center items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Add Analytics
              </h3>
              <span className="text-sm text-gray-600">
                {
                  isLoading ? "loading..." :
                    data?.data
                      ? `${data.data.urlUsed} / ${data.data.totalUrls}`
                      : "NA / NA"
                }
              </span>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.analytics}
                onChange={handleAddAnalytics}
              />
              <div className="relative w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Advanced Settings
            </h3>
            <button
              type="button"
              onClick={resetSettings}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <FaTimes className="mr-1" /> Reset
            </button>
          </div>

          {/* Country Restriction */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={settings.countryRestriction}
                  onChange={() =>
                    updateSetting(
                      "countryRestriction",
                      !settings.countryRestriction
                    )
                  }
                />
                <div
                  className={`block w-12 h-6 rounded-full transition-colors ${settings.countryRestriction ? "bg-indigo-500" : "bg-gray-300"
                    }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.countryRestriction ? "transform translate-x-6" : ""
                    }`}
                ></div>
              </div>
              <div className="flex items-center">
                <FaGlobe className="text-gray-600 mr-2" />
                <span className="text-gray-700 font-medium">
                  Country Restrictions
                </span>
              </div>
            </label>

            {settings.countryRestriction && (
              <div className="ml-4 pl-6 border-l-2 border-gray-200">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      updateSetting(
                        "showCountryDropdown",
                        !settings.showCountryDropdown
                      )
                    }
                    className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
                  >
                    <span>
                      {settings.restrictedCountries.length > 0
                        ? `${settings.restrictedCountries.length} countries blocked`
                        : "Select countries to block"}
                    </span>
                    <FiChevronDown
                      className={`transition-transform ${settings.showCountryDropdown
                        ? "transform rotate-180"
                        : ""
                        }`}
                    />
                  </button>

                  {settings.showCountryDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      <div className="p-2 space-y-2">
                        {countries.map((country) => (
                          <label
                            key={country.code}
                            className="flex items-center px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={settings.restrictedCountries.includes(
                                country.code
                              )}
                              onChange={() => toggleCountry(country.code)}
                              className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="ml-3 text-gray-700">
                              {country.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {settings.restrictedCountries.length > 0
                    ? "Link will be blocked in selected countries"
                    : "All countries will be allowed by default"}
                </p>
              </div>
            )}
          </div>

          {/* Expiration Settings */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="expiry"
                  checked={settings.expiryType === null}
                  onChange={() => updateSetting("expiryType", null)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Never expire</span>
              </label>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="expiry"
                  checked={settings.expiryType === ExpiryTypeEnum.CLICKS}
                  onChange={() => updateSetting("expiryType", ExpiryTypeEnum.CLICKS)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Expire after</span>
                <input
                  type="number"
                  min="0"
                  value={settings.maxClicks}
                  onChange={(e) =>
                    updateSetting("maxClicks", Number(e.target.value))
                  }
                  disabled={settings.expiryType !== ExpiryTypeEnum.CLICKS}
                  className="w-20 px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                />
                <span className="text-gray-500">clicks (0 = infinite)</span>
              </label>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="expiry"
                  checked={settings.expiryType === ExpiryTypeEnum.TIME}
                  onChange={() => updateSetting("expiryType", ExpiryTypeEnum.TIME)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Expire in</span>
                <input
                  type="number"
                  min="0"
                  value={settings.expiryTimeValue}
                  onChange={(e) =>
                    updateSetting("expiryTimeValue", Number(e.target.value))
                  }
                  disabled={settings.expiryType !== ExpiryTypeEnum.TIME}
                  className="w-16 px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                />
                <select
                  value={settings.expiryTimeUnit === null ? "" : settings.expiryTimeUnit}
                  onChange={(e) =>
                    updateSetting(
                      "expiryTimeUnit",
                      e.target.value as TimeUnitEnum
                    )
                  }
                  disabled={settings.expiryType !== ExpiryTypeEnum.TIME}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value={TimeUnitEnum.HOURS}>hours</option>
                  <option value={TimeUnitEnum.DAYS}>days</option>
                  <option value={TimeUnitEnum.MONTHS}>months</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;