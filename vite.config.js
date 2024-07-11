"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_react_1 = require("@vitejs/plugin-react");
var vite_1 = require("vite");
// import tsconfigPaths from "vite-tsconfig-paths";
exports.default = (0, vite_1.defineConfig)({
    // plugins: [tsconfigPaths(), react()],
    plugins: [(0, plugin_react_1.default)()],
});
