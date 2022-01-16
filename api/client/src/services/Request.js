import { axiosInstance as axios } from "./axios.config";
import ResponseHandler from "./ResponseHandler";

export default class Request {
  static #handleError(error) {
    ResponseHandler.error(error);
    throw new Error(error);
  }

  static #processResponse(response) {
    console.log(response.data);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  }

  static async get(url) {
    try {
      const response = await axios.get(url);
      return this.#processResponse(response);
    } catch (error) {
      this.#handleError(error);
    }
  }

  static async post(url, payload) {
    try {
      const response = await axios.post(url, payload);
      return this.#processResponse(response);
    } catch (error) {
      this.#handleError(error);
    }
  }

  static async delete(url, payload) {
    try {
      const response = await axios.delete(url, { data: payload });
      return this.#processResponse(response);
    } catch (error) {
      this.#handleError(error);
    }
  }

  static async put(url, payload) {
    try {
      const response = await axios.put(url, payload);
      return this.#processResponse(response);
    } catch (error) {
      this.#handleError(error);
    }
  }
}
