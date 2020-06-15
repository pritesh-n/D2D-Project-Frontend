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

export const getSlugs = async () => {
  const response = await apiConfig
    .get("/gallery/slugs")
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

export const getGallery = async (slug, { params = {} } = {}) => {
  const response = await apiConfig
    .get(`/gallery/${slug}`, {
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
