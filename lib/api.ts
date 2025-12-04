import axios from "axios";

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;

  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: { thumb: string; original: string }[];
  reviews: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
};

export type CampersListResponse = {
  items: Camper[];
  total: number;
};

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const getCampers = async (
  page = 1,
  limit = 4,
  filters: Record<string, string> = {}
): Promise<Camper[]> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...filters,
  });

  const res = await axios.get<Camper[]>(`/campers?${params.toString()}`);
  return res.data;
};

export const getSingleCamper = async (id: string) => {
  const res = await axios.get<Camper>(`/campers/${id}`);
  return res.data;
};
