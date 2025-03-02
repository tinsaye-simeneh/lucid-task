import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAutocomplete = async () => {
  try {
    const { data } = await axios.get(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch autocomplete suggestions");
  }
};

export const useAutocomplete = () => {
  return useQuery({
    queryKey: ["autocomplete"],
    queryFn: fetchAutocomplete,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 2, // Retry twice on failure
  });
};
