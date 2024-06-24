import { getCategories } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEY } from "../key";

export const useCategoryList = () => {
  return useQuery({
    queryFn: () => getCategories(),
    queryKey: [QUERIES_KEY.CATEGORY.GET_CATEGORIES],
  });
};
