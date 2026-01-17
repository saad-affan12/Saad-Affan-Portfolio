(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 628:
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
// EXTERNAL MODULE: ./portfolio.ts
var portfolio = __webpack_require__(122);
;// CONCATENATED MODULE: external "headroom.js"
const external_headroom_js_namespaceObject = require("headroom.js");
var external_headroom_js_default = /*#__PURE__*/__webpack_require__.n(external_headroom_js_namespaceObject);
;// CONCATENATED MODULE: external "reactstrap"
const external_reactstrap_namespaceObject = require("reactstrap");
;// CONCATENATED MODULE: ./components/Navigation.tsx





const Navigation = ()=>{
    const [collapseClasses, setCollapseClasses] = (0,external_react_.useState)("");
    const onExiting = ()=>setCollapseClasses("collapsing-out");
    const onExited = ()=>setCollapseClasses("");
    (0,external_react_.useEffect)(()=>{
        const el = document.getElementById("navbar-main");
        if (el) {
            const headroom = new (external_headroom_js_default())(el);
            headroom.init();
        }
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("header", {
        className: "header-global",
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.Navbar, {
            className: "navbar-main navbar-transparent navbar-light headroom",
            expand: "lg",
            id: "navbar-main",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.Container, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavbarBrand, {
                        href: "#home",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            className: "text-white mb-0",
                            children: portfolio/* greetings.name */.c0.name
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        className: "navbar-toggler",
                        "aria-label": "Toggle navigation",
                        id: "navbar_global",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "navbar-toggler-icon"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.UncontrolledCollapse, {
                        toggler: "#navbar_global",
                        navbar: true,
                        className: collapseClasses,
                        onExiting: onExiting,
                        onExited: onExited,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "navbar-collapse-header",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.Row, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.Col, {
                                            xs: "6",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                className: "text-black mb-0",
                                                children: portfolio/* greetings.name */.c0.name
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.Col, {
                                            className: "collapse-close",
                                            xs: "6",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                className: "navbar-toggler",
                                                id: "navbar_global",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {}),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {})
                                                ]
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.Nav, {
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
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.NavLink, {
                                            rel: "noopener noreferrer",
                                            "aria-label": "GitHub",
                                            className: "nav-link-icon",
                                            href: portfolio/* socialLinks.github */.KT.github,
                                            target: "_blank",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                    className: "fa fa-github"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "d-lg-none ml-2",
                                                    children: "GitHub"
                                                })
                                            ]
                                        })
                                    }),
                                    portfolio/* socialLinks.linkedin */.KT.linkedin && /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.NavLink, {
                                            rel: "noopener noreferrer",
                                            "aria-label": "LinkedIn",
                                            className: "nav-link-icon",
                                            href: portfolio/* socialLinks.linkedin */.KT.linkedin,
                                            target: "_blank",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                    className: "fa fa-linkedin"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "d-lg-none ml-2",
                                                    children: "LinkedIn"
                                                })
                                            ]
                                        })
                                    }),
                                    portfolio/* socialLinks.instagram */.KT.instagram && /*#__PURE__*/ jsx_runtime_.jsx(external_reactstrap_namespaceObject.NavItem, {
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_reactstrap_namespaceObject.NavLink, {
                                            rel: "noopener noreferrer",
                                            "aria-label": "Instagram",
                                            className: "nav-link-icon",
                                            href: portfolio/* socialLinks.instagram */.KT.instagram,
                                            target: "_blank",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                    className: "fa fa-instagram"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "d-lg-none ml-2",
                                                    children: "Instagram"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        })
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
var __webpack_exports__ = __webpack_require__.X(0, [122], () => (__webpack_exec__(628)));
module.exports = __webpack_exports__;

})();