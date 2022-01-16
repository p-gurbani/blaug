export default class ResponseHandler {
  static error(error) {
    if (error && error.response && error.response.data) {
      const { error: errMsg } = error.response.data;
      console.log(errMsg);
    } else {
      console.log(error);
    }
  }
}
