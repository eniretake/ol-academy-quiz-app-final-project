import { API } from "../Utilities/Variables";

export const fetchData = async () => {
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);
  return data;
};
