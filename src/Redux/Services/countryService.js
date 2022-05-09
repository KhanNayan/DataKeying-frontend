import http from "../../utilities/http-common";

const getAll = async () => {
  return await http.get("/countries/");
};

const get = async (id) => {
  return await http.get(`/countries"/${id}`);
};

const create = async (data) => {
  return await http.post("/countries", data);
};

const update = async (id, data) => {
  return await http.put(`/countries/${id}`, data);
};

const remove = async (id) => {
  return await http.delete("/countries/" + id);
};

const CountryService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CountryService;
