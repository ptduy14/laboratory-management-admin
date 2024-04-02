import axios from "axios";

export const UserService = {
  getAll: async () => {
    return await axios.get("/users/get");
  },

  getById: async (id: string) => {
    return await axios.get("/users/get/" + id);
  },

  update: async (id: string, payload: any) => {
    return await axios.patch("/users/update/" + id, payload);
  },
};
