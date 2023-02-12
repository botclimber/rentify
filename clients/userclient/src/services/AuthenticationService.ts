import Api from "./Api";

const baseURL = "user";

export default {
  login(email: string, password: string) {
    return Api().post(`${baseURL}/login`, { email, password });
  },

  register(email: string, password: string, name: string, username: string) {
    return Api().post(`${baseURL}/register`, {
      name,
      username,
      email,
      password,
    });
  },

  updatePassword(id: number, password: string, token: string) {
    return Api().post(`${baseURL}/updatePassword/${id}/${token}`, {
      password,
    });
  },

  changePasswordRequest(email: string) {
    return Api().get(`${baseURL}/changePassword/${email}`);
  },
};
