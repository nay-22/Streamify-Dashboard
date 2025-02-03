import { BASE_URL, Service } from "./UrlConstants";

export const METRICS_URL = `${BASE_URL}/${Service.DASHBOARD}/metrics`;
export const USER_GROWTH_URL = `${BASE_URL}/${Service.DASHBOARD}/visuals/user-growth`;
export const REVENUE_URL = `${BASE_URL}/${Service.DASHBOARD}/visuals/revenue-distribution`;
export const TOP_5_STREAMS_URL = `${BASE_URL}/${Service.DASHBOARD}/visuals/top-5-streams`;
export const RECENTS_URL = `${BASE_URL}/${Service.DASHBOARD}/recents`;

export const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
