import Api from "./Api";

const baseURL = "user";

export default {
  login(email: string, password: string) {
    return Api().post(`${baseURL}/login`, { email, password });
  },

  register(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) {
    return Api().post(`${baseURL}/register`, {
      firstName,
      lastName,
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
