"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_api_1 = require("../api/resource-api");
const resourceAPIInstance = new resource_api_1.default();
class ResorceController {
    sendFile(data) {
        return resourceAPIInstance
            .sendFile(data)
            .then((result) => JSON.parse(result.response))
            .catch((error) => {
            console.log(error);
        });
    }
}
exports.default = ResorceController;
//# sourceMappingURL=resource-controller.js.map