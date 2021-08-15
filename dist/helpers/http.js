"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable implicit-arrow-linebreak */
var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["PUT"] = "PUT";
    METHODS["POST"] = "POST";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
function queryStringify(data) {
    if (!data) {
        throw new Error('Не переданы данные!');
    }
    let queryString = '?';
    Object.entries(data).forEach(([key, value]) => {
        queryString += `${key}=${value}&`;
    });
    return queryString.slice(0, -1);
}
class HTTPTransport {
    constructor(baseUrl) {
        this.get = (url, options) => this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }));
        this.post = (url, options) => this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }));
        this.put = (url, options) => this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }));
        this.delete = (url, options) => this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }));
        this.request = (url, options) => {
            const fullUrl = this.baseUrl + url;
            const { method, timeout = 5000, headers = { 'Content-Type': 'application/json' }, data, } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.open(method || METHODS.GET, method === METHODS.GET && !!data ? `${fullUrl}${queryStringify(data)}` : fullUrl);
                xhr.timeout = timeout;
                Object.entries(headers).forEach(([key, value]) => {
                    if ((data === null || data === void 0 ? void 0 : data.form) && key === 'Content-Type') {
                        return;
                    }
                    xhr.setRequestHeader(key, value);
                });
                xhr.onload = () => {
                    resolve(xhr);
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else if (data.form) {
                    xhr.send(data.form);
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
        this.baseUrl = baseUrl;
    }
}
exports.default = HTTPTransport;
//# sourceMappingURL=http.js.map