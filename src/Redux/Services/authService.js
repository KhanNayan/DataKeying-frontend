import http from "../../utilities/http-common";

const getToken = async (data) => {
  let formdata = new FormData();
  formdata.append("username", data.username);
  formdata.append("password", data.password);

  let response = await http.post("/login", formdata);

  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));

    let hours = 1; // Reset when storage is more than 24hours
    let now = Date.now();
    let setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("setupTime", now);
    }
  }

  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = async () => {
  let currentUser = await http.get("/current-user");
  return currentUser;
};

const AuthService = {
  getToken,
  logout,
  getCurrentUser,
};

export default AuthService;
