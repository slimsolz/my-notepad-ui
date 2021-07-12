// Services contains all api calls made from this module
// Api calls made to an external service should also be added here
import { Api } from "../../utils/Api";

const Services = {
  getAllNotes: async (key, page) => {
    try {
      const response = await Api.get(`/notes?page=${page}`);
      return response.data;
    } catch (error) {
      const {
        data: { message },
      } = error.response;
      throw new Error(message);
    }
  },

  saveNote: async (data) => {
    try {
      const response = await Api.post(`/notes`, data);
      return response.data;
    } catch (error) {
      const {
        data: { message },
      } = error.response;
      throw new Error(message);
    }
  },

  updateNote: async (data) => {
    try {
      const response = await Api.patch(`/notes/${data.id}`, data);
      return response.data;
    } catch (error) {
      const {
        data: { message },
      } = error.response;
      throw new Error(message);
    }
  },

  deleteNote: async (id) => {
    try {
      const response = await Api.delete(`/notes/${id}`);
      return response.status;
    } catch (error) {
      const {
        data: { message },
      } = error.response;
      throw new Error(message);
    }
  },

  deleteAllNotes: async () => {
    try {
      const response = await Api.delete(`/notes`);
      return response.data;
    } catch (error) {
      const {
        data: { message },
      } = error.response;
      throw new Error(message);
    }
  },
};

export default Services;
