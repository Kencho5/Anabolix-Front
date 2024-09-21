import { ReactNode } from "react";
import { create } from "zustand";
import { useQuery } from "react-query";
import { changeLanguage } from "i18next";
import { allowedLanguages } from "./allowedLanguages";

interface LocationState {
  language: string | null;
  setLanguage: (lang: string) => void;
}

interface IpData {
  ip: string;
  city: string;
  country_name: string;
  country_code: string;
  country_calling_code: string;
  currency: string;
  languages: string;
}

const fetchIpData = async (): Promise<IpData> => {
  const response = await fetch("https://ipapi.co/json");
  if (!response.ok) throw new Error("IP data fetch failed");
  return response.json();
};

export const useIpData = create<LocationState>((set) => ({
  language: null,
  setLanguage: (lang: string) => {
    set({ language: lang });
    changeLanguage(lang);
    localStorage.setItem("language", lang);
  },
}));

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setLanguage } = useIpData();

  useQuery("IpData", fetchIpData, {
    onSuccess: (data) => {
      const lang = data.languages.split(",")[0].split("-")[0];
      if (!allowedLanguages.includes(lang)) return;
      setLanguage(lang);
    },
    enabled: !localStorage.getItem("language"),
  });

  return <>{children}</>;
};
