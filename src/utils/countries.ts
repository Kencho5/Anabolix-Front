type Country = {
  value: string;
  label: string;
};

export const getCountries = (t: (key: string) => string): Country[] => [
  { value: "china", label: t("COUNTRIES.china") },
  { value: "india", label: t("COUNTRIES.india") },
  { value: "united_states", label: t("COUNTRIES.united_states") },
  { value: "indonesia", label: t("COUNTRIES.indonesia") },
  { value: "pakistan", label: t("COUNTRIES.pakistan") },
  { value: "brazil", label: t("COUNTRIES.brazil") },
  { value: "nigeria", label: t("COUNTRIES.nigeria") },
  { value: "bangladesh", label: t("COUNTRIES.bangladesh") },
  { value: "russia", label: t("COUNTRIES.russia") },
  { value: "mexico", label: t("COUNTRIES.mexico") },
];
