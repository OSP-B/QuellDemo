"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const TeamCards_modules_css_1 = __importDefault(require("./TeamCards.modules.css"));
const react_1 = require("react");
const QUELL_icons_linkedin_svg_1 = __importDefault(require("/client/src/assets/images/icons/QUELL-icons-linkedin.svg"));
const QUELL_icons_github_svg_1 = __importDefault(require("/client/src/assets/images/icons/QUELL-icons-github.svg"));
const quell_bird_border_svg_1 = __importDefault(require("/client/src/assets/images/quell_logos/quell-bird-border.svg"));
const teaminfo_1 = require("../teaminfo");
const Team = (0, react_1.memo)(() => {
    const [renderFx, toggleRenderFx] = (0, react_1.useState)('unrendered');
    // runs once on render, then procs the useState for rendered to change to renderedLogo
    // these two strings are ID's in our CSS.
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            toggleRenderFx('rendered');
        }, 550);
    }, []);
    //scrolls back to top
    (0, react_1.useEffect)(() => {
        if (window.location.href.includes('scroll-demo')) {
            window.scrollTo(0, 0);
        }
        window.scrollTo(0, 0);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: renderFx }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ id: TeamCards_modules_css_1.default.heading }, { children: "Team Quell" })), (0, jsx_runtime_1.jsx)("img", { id: TeamCards_modules_css_1.default.logo, src: quell_bird_border_svg_1.default }), (0, jsx_runtime_1.jsx)("h2", { children: "The Good Eggs of Quell" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: TeamCards_modules_css_1.default.team }, { children: teaminfo_1.TeamArr.map((currTeamObj, i) => {
                    return ((0, jsx_runtime_1.jsx)("article", Object.assign({ className: TeamCards_modules_css_1.default.card }, { children: (0, jsx_runtime_1.jsx)(TeamMember, { src: currTeamObj.src, bio: currTeamObj.bio, name: currTeamObj.name, linkedin: currTeamObj.linkedin, github: currTeamObj.github }, i) }), i));
                }) }))] })));
});
const TeamMember = ({ src, bio, name, linkedin, github }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: TeamCards_modules_css_1.default.profilePic }, { children: [(0, jsx_runtime_1.jsx)("img", { src: src, alt: "Quell Team Member" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: TeamCards_modules_css_1.default.name }, { children: name })), (0, jsx_runtime_1.jsx)("p", { children: bio }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: TeamCards_modules_css_1.default.socialIcons }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: linkedin, target: "_blank" }, { children: (0, jsx_runtime_1.jsx)("img", { src: QUELL_icons_linkedin_svg_1.default }) })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: github, target: "_blank" }, { children: (0, jsx_runtime_1.jsx)("img", { src: QUELL_icons_github_svg_1.default }) }))] }))] })));
};
exports.default = Team;
