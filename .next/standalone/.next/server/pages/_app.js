(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 328:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__(90);
// EXTERNAL MODULE: ./styles/argon-design-system-react.css
var argon_design_system_react = __webpack_require__(762);
// EXTERNAL MODULE: ./styles/styles.css
var styles = __webpack_require__(522);
// EXTERNAL MODULE: ./styles/vendor/font-awesome/css/font-awesome.min.css
var font_awesome_min = __webpack_require__(230);
// EXTERNAL MODULE: ./styles/vendor/nucleo/css/nucleo.css
var nucleo = __webpack_require__(974);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "reactstrap"
const external_reactstrap_namespaceObject = require("reactstrap");
// EXTERNAL MODULE: ./portfolio.ts
var portfolio = __webpack_require__(122);
;// CONCATENATED MODULE: ./components/Navigation.tsx




const Navigation = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.Nav, {
        className: "align-items-lg-center ml-lg-auto",
        navbar: true,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: "#home",
                    children: "Home"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: "#skills",
                    children: "Skills"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: "#education",
                    children: "Education"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: "#experience",
                    children: "Experience"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: "#projects",
                    children: "Projects"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: "#contact",
                    children: "Contact"
                })
            }),
            portfolio/* socialLinks.github */.KT.github && /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: portfolio/* socialLinks.github */.KT.github,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "GitHub",
                    className: "nav-link-icon",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                        className: "fa fa-github"
                    })
                })
            }),
            portfolio/* socialLinks.linkedin */.KT.linkedin && /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: portfolio/* socialLinks.linkedin */.KT.linkedin,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "LinkedIn",
                    className: "nav-link-icon",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                        className: "fa fa-linkedin"
                    })
                })
            }),
            portfolio/* socialLinks.instagram */.KT.instagram && /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavLink, {
                    href: portfolio/* socialLinks.instagram */.KT.instagram,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Instagram",
                    className: "nav-link-icon",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                        className: "fa fa-instagram"
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const components_Navigation = (Navigation);

;// CONCATENATED MODULE: ./pages/_app.tsx

// Global CSS





// Components

function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components_Navigation, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        ]
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 90:
/***/ (() => {



/***/ }),

/***/ 762:
/***/ (() => {



/***/ }),

/***/ 522:
/***/ (() => {



/***/ }),

/***/ 230:
/***/ (() => {



/***/ }),

/***/ 974:
/***/ (() => {



/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 450:
/***/ ((module) => {

"use strict";
module.exports = require("react-easy-emoji");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [122], () => (__webpack_exec__(328)));
module.exports = __webpack_exports__;

})();