import http from "../../utilities/http-common";

const getAll = async () => {
  return await http.get("/languages");
};

const get = async (id) => {
  return await http.get(`/languages/${id}`);
};

const create = async (data) => {
  return await http.post("/languages", data);
};

const update = async (id, data) => {
  return await http.put(`/languages/${id}`, data);
};

const remove = async (id) => {
  return await http.delete("/languages/" + id);
};

const LanguageService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default LanguageService;
