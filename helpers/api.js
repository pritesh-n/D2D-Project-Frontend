import apiConfig from "./apiConfig";

export const getGalleries = async ({ params = {} } = {}) => {
  const response = await apiConfig
    .get("/gallery", {
      params: { ...params },
    })
    .then((res) => {
      // console.log(res.data);
      return res.status === 200 ? res.data : "some error occured";
    })
    .catch((e) => {
      console.log(e);
      return "error";
    });
  return response;
};
