"use client";

import { use } from "react";
import { ClickMetrics } from "@/app/components/ui/analytics/ClickMetrics";
import { DeviceMetrics } from "@/app/components/ui/analytics/DeviceMetrics";
import { GeoMetrics } from "@/app/components/ui/analytics/GeoMetrics";
import { UrlHeader } from "@/app/components/ui/analytics/UrlHeader";
import { useGetAnalyticsQuery } from "@/app/hooks/analytics/useGetAnalytics";
import { dateTimeFormatter } from "@/utils/helper/date_time_formater";
import { useDeleteUrl } from "@/app/hooks/url/useDelete";

type DashboardAnalyticsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const DashboardAnalytics = ({ searchParams }: DashboardAnalyticsProps) => {
  const params = use(searchParams);
  const id = params.id as string;

  const { data, isLoading, error } = useGetAnalyticsQuery({
    id: id ?? "",
    enabled: Boolean(id),
  });

  const { deleteUrl, isPending } = useDeleteUrl();

  if (!id) {
    return (
      <div className="w-full text-center py-12 text-gray-600 text-lg">
        No URL ID provided.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="animate-spin h-6 w-6 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="w-full text-center py-12 text-red-600 font-semibold">
        Failed to load analytics.
      </div>
    );
  }

  const {
    urlInfo,
    clickAnalytics,
    geographicAnalytics,
    browserAnalytics,
  } = data.data;

  console.log("url info: ", urlInfo);

  let expires: string | null = null;
  if (urlInfo.expireType) {
    if (urlInfo.expireType === "clicks") {
      expires = `${urlInfo.expireClicks} clicks`
    } else if (urlInfo.expireType === "time") {
      expires = dateTimeFormatter(urlInfo.expireAt);
    }
  }

  const clickTrend = Object.entries(clickAnalytics.clicksPerDay).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  const handleDelete = (id: string) => {
    deleteUrl(id);
    console.log("Delete clicked");
  };

  return (
    <section className="container mx-auto px-6 py-10 space-y-8">
      <UrlHeader
        longUrl={urlInfo.originalUrl}
        shortUrl={`http://localhost:8000/${urlInfo.code}`}
        createdAt={new Date(urlInfo.createdAt)}
        expiresAt={expires}
        onDelete={()=> handleDelete(id)}
      />

      <ClickMetrics
        totalClicks={clickAnalytics.totalClicks}
        uniqueClicks={clickAnalytics.uniqueClicks}
        clickTrend={clickTrend}
      />

      <GeoMetrics
        topCountries={geographicAnalytics.topCountries.map((c) => ({
          country: c.country,
          count: c.count,
        }))}
        topCities={geographicAnalytics.topCities ?? []}
      />

      <DeviceMetrics
        devices={browserAnalytics.deviceTypeStats.map((d) => ({
          type: d.deviceType,
          count: d.count,
        }))}
        os={browserAnalytics.operatingSystemStats.map((os) => ({
          name: os.operatingSystem,
          count: os.count,
        }))}
        browsers={browserAnalytics.browserStats.map((b) => ({
          name: b.browser,
          count: b.count,
        }))}
      />
    </section>
  );
};

export default DashboardAnalytics;
