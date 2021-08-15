"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../helpers/http");
const resourceAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/resources/');
class resorceAPI {
    sendFile(data) {
        return resourceAPIInstance.post('', { data });
    }
}
exports.default = resorceAPI;
//# sourceMappingURL=resource-api.js.map