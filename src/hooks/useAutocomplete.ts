import { useQuery } from "@tanstack/react-query";

const fetchSuggestions = async () => {
  const res = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  return res.json();
};

export const useAutocomplete = () => {
  return useQuery(["autocomplete"], fetchSuggestions, {
    staleTime: 60000,
  });
};
