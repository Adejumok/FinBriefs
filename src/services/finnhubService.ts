import axios from 'axios';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string;
const BASE_URL = 'https://finnhub.io/api/v1/';

export interface IStockData {
  currentPrice: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface ICompanyProfile {
  name: string;
  ticker: string;
  logo: string;
}

export interface ICompanyNews {
  headline: string;
  datetime: number;
  url: string;
  summary: string;
  image: string;
}

export const fetchStockData = async (symbol: string): Promise<IStockData> => {
  const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
  const data = response.data;
  return {
    currentPrice: data.c,
    high: data.h,
    low: data.l,
    open: data.o,
    previousClose: data.pc
  };
};

export const fetchCompanyProfile = async (symbol: string): Promise<ICompanyProfile> => {
  try {
    const response = await axios.get<ICompanyProfile>(`${BASE_URL}stock/profile2?symbol=${symbol}&token=${API_KEY}`);
    console.log("API Response for company profile", symbol, ":", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching company profile for ${symbol}:`, error);
    throw error;
  }
};

export const fetchCompanyNews = async (symbol: string, from: string, to: string): Promise<ICompanyNews[]> => {
  try {
    const response = await axios.get<ICompanyNews[]>(`${BASE_URL}company-news?symbol=${symbol}&from=${from}&to=${to}&token=${API_KEY}`);
    console.log("API Response for company news", symbol, ":", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching company news for ${symbol}:`, error);
    throw error;
  }
};