import http from "../../utilities/http-common";

const getImageSeries = async () => {
  return await http.get("/Image/GetSeries");
};

const getImageData = async (data) => {
  return await http.get(`/Image/GetIndexTagging/${data}`);
};

const updateImageComment = async (data) => {
  return await http.put("/Image/UpdateComment", data);
};

const imageDataInsert = async (data) => {
  return await http.post("/Image/DataInsert", data);
};

const ImageTaggingService = {
  getImageSeries,
  getImageData,
  updateImageComment,
  imageDataInsert,
};

export default ImageTaggingService;
