import http from "../../utilities/http-common";

const getAll = async () => {
  return await http.get("/projects");
};

const get = async (id) => {
  return await http.get(`/projects/${id}`);
};

const create = async (data) => {
  return await http.post("/projects", data);
};

const update = async (id, data) => {
  return await http.put(`/projects/${id}`, data);
};

const remove = async (id) => {
  return await http.delete("/projects/" + id);
};

const createDatabase = async (data) => {
  return await http.post("/create-project-db", data);
};

const ProjectService = {
  getAll,
  get,
  create,
  update,
  remove,
  createDatabase,
};

export default ProjectService;
