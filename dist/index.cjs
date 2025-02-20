'use strict';

var axios = require('axios');

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
class BaseClient {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.axios = axios.create({ baseURL: this.baseUrl });
  }
  buildUrl(endpoint, params) {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));
    }
    return url.toString();
  }
  request(_0) {
    return __async(this, arguments, function* (endpoint, options = {}) {
      const { method = "GET", body, params } = options;
      const url = this.buildUrl(endpoint, params);
      let headers = __spreadValues$1({
        "X-API-Key": this.apiKey
      }, options.headers);
      if (body && body instanceof FormData) {
        headers = __spreadProps(__spreadValues$1({}, headers), { "Content-Type": "multipart/form-data" });
      }
      try {
        const response = yield this.axios.request({ method, headers, url, data: body });
        return response.data;
      } catch (error) {
        throw error;
      }
    });
  }
  get(endpoint, params) {
    return this.request(endpoint, { method: "GET", params });
  }
  post(endpoint, body, headers) {
    return this.request(endpoint, { method: "POST", body, headers });
  }
  put(endpoint, body, headers) {
    return this.request(endpoint, { method: "PUT", body, headers });
  }
  delete(endpoint, params) {
    return this.request(endpoint, { method: "DELETE", params });
  }
  patch(endpoint, body, headers) {
    return this.request(endpoint, { method: "PATCH", body, headers });
  }
}

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
class ApiClient extends BaseClient {
  constructor({ baseUrl, apiKey }) {
    super({ baseUrl, apiKey });
    this.gameData = {
      getWorldStatus: (gameId) => {
        return this.gameServiceApi(gameId, "getWorldStatus");
      },
      getAgentPlayerList: (gameId) => {
        return this.gameServiceApi(gameId, "getAgentPlayerList");
      },
      getHumanPlayerList: (gameId, paginationOptions) => {
        return this.gameServiceApi(gameId, "getHumanPlayerList", { paginationOptions });
      },
      getPlayer: (gameId, playerId) => {
        return this.gameServiceApi(gameId, "getPlayer", { playerId });
      },
      getConversationList: (gameId, paginationOptions) => {
        return this.gameServiceApi(gameId, "getConversationList", { paginationOptions });
      },
      getMessageList: (gameId, conversationId) => {
        return this.gameServiceApi(gameId, "getMessageList", { conversationId });
      }
    };
  }
  upload(file, fileName) {
    const form = new FormData();
    form.append("file", file, fileName);
    return this.post("/upload", form);
  }
  getMusicList() {
    return this.get("/music");
  }
  createMusic(params) {
    return this.post("/music", params);
  }
  updateMusic(params) {
    return this.patch("/music", params);
  }
  getMapList() {
    return this.get("/map");
  }
  createMap(params) {
    return this.post("/map", params);
  }
  updateMap(params) {
    return this.patch("/map", params);
  }
  getAgentList() {
    return this.get("/agent");
  }
  createAgent(params) {
    return this.post("/agent", params);
  }
  updateAgent(params) {
    return this.patch("/agent", params);
  }
  getGameList() {
    return this.get("/game");
  }
  createGame(params) {
    return this.post("/game", params);
  }
  updateGame(params) {
    return this.patch("/game", params);
  }
  gameServiceApi(gameId, action, restData) {
    return this.post("/manage-game", { action, data: __spreadValues({ gameId }, restData) });
  }
}

exports.ApiClient = ApiClient;
