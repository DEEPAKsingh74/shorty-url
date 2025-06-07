import api from "@/network/api_config";

export const apiFetcher = async <T>(url: string, config = {}): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};
