import EndPoints from "@/apis/endPoints";
import HttpClient from "@/apis/httpClient";
import { ICategory } from "@/domains";

export const getCategories = async (): Promise<ICategory[]> =>
  await HttpClient.get<ICategory[], any>(EndPoints.category.getCategories);
