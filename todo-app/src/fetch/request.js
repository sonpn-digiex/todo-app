import axios from "axios";

const apiUrl = "http://localhost:3004";
const token = "";

const instance = axios.create({ baseURL: apiUrl });
instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
instance.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";

const CancelToken = axios.CancelToken;

let cancel;
var Request = {
  API_URL: apiUrl,
  Get: function (url) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  Post: function (url, data) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((res) => {
          resolve(res);
        })

        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject("Something wrong!");
          }
        });
    });
  },
  Put: function (url, data) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject("Something wrong!");
          }
        });
    });
  },
  Delete: function (url) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject("Something wrong!");
          }
        });
    });
  },
  CancelRequest: function () {
    if (cancel) cancel();
  },
};
export default Request;
