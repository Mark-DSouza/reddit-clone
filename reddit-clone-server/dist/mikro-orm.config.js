"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const environmentConstants_1 = require("./environmentConstants");
const path_1 = __importDefault(require("path"));
exports.default = {
    type: "postgresql",
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: "!(*.d).{js,ts}",
    },
    entities: ["./dist/entities"],
    entitiesTs: ["./src/entities"],
    dbName: "reddit-clone",
    debug: !constants_1.__prod__,
    allowGlobalContext: true,
    user: environmentConstants_1.POSTGRES_USER,
    password: environmentConstants_1.POSTGRES_PASSWORD,
};
//# sourceMappingURL=mikro-orm.config.js.map