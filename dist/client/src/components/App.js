"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../stylesheets/App.css");
const react_1 = __importStar(require("react"));
const Navbar_1 = require("./NavBar/Navbar");
const Demo_1 = __importDefault(require("./Demo/Demo"));
const About_1 = __importDefault(require("./About/About"));
const Footer_1 = __importDefault(require("./Footer/Footer"));
const LazyLoadTeam = react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require('./TeamCards/TeamCards'))));
function App() {
    const [renderFx, toggleRenderFx] = (0, react_1.useState)('');
    const [teamComp, toggleRenderTeam] = (0, react_1.useState)(false);
    //runs once on render, then procs the useState for rendered to change to renderedLogo
    //these two strings are ID's in our CSS.
    (0, react_1.useEffect)(() => {
        toggleRenderFx('rendered');
    }, []);
    (0, react_1.useEffect)(() => { }, [teamComp]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.Navbar, { teamComp: teamComp, toggleRenderTeam: toggleRenderTeam }), (0, jsx_runtime_1.jsx)(react_1.Suspense, Object.assign({ fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading.." }) }, { children: teamComp ? (0, jsx_runtime_1.jsx)(LazyLoadTeam, {}) : null })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "main", id: renderFx }, { children: [!teamComp && (0, jsx_runtime_1.jsx)(About_1.default, {}), !teamComp && (0, jsx_runtime_1.jsx)("hr", { style: { width: '60%' } }), !teamComp && (0, jsx_runtime_1.jsx)(Demo_1.default, {})] })), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
}
exports.default = App;
