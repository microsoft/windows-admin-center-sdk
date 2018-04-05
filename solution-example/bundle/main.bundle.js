webpackJsonp([3,6],{

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/add-example/add-example.module": [
		1001,
		1
	],
	"app/solution-example/solution-example.module": [
		1002,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 430;


/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__msft_sme_shell_core__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__(603);






if (__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
// initialize SME module environment with localization settings.
__WEBPACK_IMPORTED_MODULE_3__msft_sme_shell_core__["a" /* CoreEnvironment */].initialize({
    name: 'msft.sme.solutionExample-extension',
    isProduction: __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].production,
    shellOrigin: '*'
}, {
    resourcesPath: 'assets/strings'
})
    .then(function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]); });
//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/main.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msft_sme_shell_angular__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// These are the basic routes that are required in order to load an extension and make service calls.
var appRoutes = [
    // The idle component route is used for 'long running' processes that take any amount of time (async).
    // This is a required path and component.
    {
        path: 'idle',
        component: __WEBPACK_IMPORTED_MODULE_2__msft_sme_shell_angular__["m" /* IdleComponent */]
    },
    {
        path: 'solution',
        loadChildren: 'app/solution-example/solution-example.module#SolutionExampleModule'
    },
    {
        path: 'add',
        loadChildren: 'app/add-example/add-example.module#AddExampleModule'
    },
    // this child route is used to route back to the home path when an invalid URL is provided to the browser.
    {
        path: '**',
        redirectTo: 'solution' // double check navigation
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forRoot(appRoutes, {
                // un-comment to enable debug log messages
                // enableTracing: true,
                // don't navigate at initially.
                initialNavigation: true
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/app-routing.module.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__msft_sme_shell_angular__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(appContext, navigationService) {
        this.appContext = appContext;
        this.navigationService = navigationService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.appContext.ngInit({ navigationService: this.navigationService });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.appContext.ngDestroy();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'sme-root',
        template: __webpack_require__(715)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__msft_sme_shell_angular__["l" /* AppContextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__msft_sme_shell_angular__["l" /* AppContextService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__msft_sme_shell_angular__["n" /* NavigationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__msft_sme_shell_angular__["n" /* NavigationService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/app.component.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(601);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppModule = (function () {
    function AppModule(appContextService) {
        this.appContextService = appContextService;
        this.appContextService.initializeModule({});
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["a" /* CoreServiceModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["b" /* DialogModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["c" /* SmeStylesModule */],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["d" /* SvgModule */],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["e" /* IconModule */],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["f" /* LoadingWheelModule */],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["g" /* GuidedPanelModule */],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["h" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["i" /* IdleModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["j" /* ResourceService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"],
                useClass: __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["k" /* AppErrorHandler */]
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["l" /* AppContextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_angular__["l" /* AppContextService */]) === "function" && _a || Object])
], AppModule);

var _a;
//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/app.module.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/**
 * THIS FILE WAS GENERATED FROM msft-sme-build. DO NOT MODIFY. To change this file, make the appropriate changes in build
 *
 * The build system defaults to the dev environment which uses `environment.ts`, but if you do
 * `ng build --env=prod` then `environment.prod.ts` will be used instead.
 * The list of which env maps to which file can be found in `angular-cli.json`.
 */
/**
 * THIS FILE WAS GENERATED FROM msft-sme-build. DO NOT MODIFY. To change this file, make the appropriate changes in build
 *
 * The build system defaults to the dev environment which uses `environment.ts`, but if you do
 * `ng build --env=prod` then `environment.prod.ts` will be used instead.
 * The list of which env maps to which file can be found in `angular-cli.json`.
 */ var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/environment.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__ = __webpack_require__(997);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_zone_js_dist_zone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__msft_sme_shell_dist_core_polyfills__ = __webpack_require__(526);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
// tslint:disable-next-line:jsdoc-format
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
// tslint:disable-next-line:jsdoc-format
/** Evergreen browsers require these. **/


// tslint:disable-next-line:jsdoc-format
/** ALL Firefox browsers require the following to support `@angular/animation`. **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
// Server management tools specific polyfills

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';
//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/polyfills.js.map

/***/ }),

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 264,
	"./af.js": 264,
	"./ar": 271,
	"./ar-dz": 265,
	"./ar-dz.js": 265,
	"./ar-kw": 266,
	"./ar-kw.js": 266,
	"./ar-ly": 267,
	"./ar-ly.js": 267,
	"./ar-ma": 268,
	"./ar-ma.js": 268,
	"./ar-sa": 269,
	"./ar-sa.js": 269,
	"./ar-tn": 270,
	"./ar-tn.js": 270,
	"./ar.js": 271,
	"./az": 272,
	"./az.js": 272,
	"./be": 273,
	"./be.js": 273,
	"./bg": 274,
	"./bg.js": 274,
	"./bm": 275,
	"./bm.js": 275,
	"./bn": 276,
	"./bn.js": 276,
	"./bo": 277,
	"./bo.js": 277,
	"./br": 278,
	"./br.js": 278,
	"./bs": 279,
	"./bs.js": 279,
	"./ca": 280,
	"./ca.js": 280,
	"./cs": 281,
	"./cs.js": 281,
	"./cv": 282,
	"./cv.js": 282,
	"./cy": 283,
	"./cy.js": 283,
	"./da": 284,
	"./da.js": 284,
	"./de": 287,
	"./de-at": 285,
	"./de-at.js": 285,
	"./de-ch": 286,
	"./de-ch.js": 286,
	"./de.js": 287,
	"./dv": 288,
	"./dv.js": 288,
	"./el": 289,
	"./el.js": 289,
	"./en-au": 290,
	"./en-au.js": 290,
	"./en-ca": 291,
	"./en-ca.js": 291,
	"./en-gb": 292,
	"./en-gb.js": 292,
	"./en-ie": 293,
	"./en-ie.js": 293,
	"./en-nz": 294,
	"./en-nz.js": 294,
	"./eo": 295,
	"./eo.js": 295,
	"./es": 298,
	"./es-do": 296,
	"./es-do.js": 296,
	"./es-us": 297,
	"./es-us.js": 297,
	"./es.js": 298,
	"./et": 299,
	"./et.js": 299,
	"./eu": 300,
	"./eu.js": 300,
	"./fa": 301,
	"./fa.js": 301,
	"./fi": 302,
	"./fi.js": 302,
	"./fo": 303,
	"./fo.js": 303,
	"./fr": 306,
	"./fr-ca": 304,
	"./fr-ca.js": 304,
	"./fr-ch": 305,
	"./fr-ch.js": 305,
	"./fr.js": 306,
	"./fy": 307,
	"./fy.js": 307,
	"./gd": 308,
	"./gd.js": 308,
	"./gl": 309,
	"./gl.js": 309,
	"./gom-latn": 310,
	"./gom-latn.js": 310,
	"./gu": 311,
	"./gu.js": 311,
	"./he": 312,
	"./he.js": 312,
	"./hi": 313,
	"./hi.js": 313,
	"./hr": 314,
	"./hr.js": 314,
	"./hu": 315,
	"./hu.js": 315,
	"./hy-am": 316,
	"./hy-am.js": 316,
	"./id": 317,
	"./id.js": 317,
	"./is": 318,
	"./is.js": 318,
	"./it": 319,
	"./it.js": 319,
	"./ja": 320,
	"./ja.js": 320,
	"./jv": 321,
	"./jv.js": 321,
	"./ka": 322,
	"./ka.js": 322,
	"./kk": 323,
	"./kk.js": 323,
	"./km": 324,
	"./km.js": 324,
	"./kn": 325,
	"./kn.js": 325,
	"./ko": 326,
	"./ko.js": 326,
	"./ky": 327,
	"./ky.js": 327,
	"./lb": 328,
	"./lb.js": 328,
	"./lo": 329,
	"./lo.js": 329,
	"./lt": 330,
	"./lt.js": 330,
	"./lv": 331,
	"./lv.js": 331,
	"./me": 332,
	"./me.js": 332,
	"./mi": 333,
	"./mi.js": 333,
	"./mk": 334,
	"./mk.js": 334,
	"./ml": 335,
	"./ml.js": 335,
	"./mr": 336,
	"./mr.js": 336,
	"./ms": 338,
	"./ms-my": 337,
	"./ms-my.js": 337,
	"./ms.js": 338,
	"./my": 339,
	"./my.js": 339,
	"./nb": 340,
	"./nb.js": 340,
	"./ne": 341,
	"./ne.js": 341,
	"./nl": 343,
	"./nl-be": 342,
	"./nl-be.js": 342,
	"./nl.js": 343,
	"./nn": 344,
	"./nn.js": 344,
	"./pa-in": 345,
	"./pa-in.js": 345,
	"./pl": 346,
	"./pl.js": 346,
	"./pt": 348,
	"./pt-br": 347,
	"./pt-br.js": 347,
	"./pt.js": 348,
	"./ro": 349,
	"./ro.js": 349,
	"./ru": 350,
	"./ru.js": 350,
	"./sd": 351,
	"./sd.js": 351,
	"./se": 352,
	"./se.js": 352,
	"./si": 353,
	"./si.js": 353,
	"./sk": 354,
	"./sk.js": 354,
	"./sl": 355,
	"./sl.js": 355,
	"./sq": 356,
	"./sq.js": 356,
	"./sr": 358,
	"./sr-cyrl": 357,
	"./sr-cyrl.js": 357,
	"./sr.js": 358,
	"./ss": 359,
	"./ss.js": 359,
	"./sv": 360,
	"./sv.js": 360,
	"./sw": 361,
	"./sw.js": 361,
	"./ta": 362,
	"./ta.js": 362,
	"./te": 363,
	"./te.js": 363,
	"./tet": 364,
	"./tet.js": 364,
	"./th": 365,
	"./th.js": 365,
	"./tl-ph": 366,
	"./tl-ph.js": 366,
	"./tlh": 367,
	"./tlh.js": 367,
	"./tr": 368,
	"./tr.js": 368,
	"./tzl": 369,
	"./tzl.js": 369,
	"./tzm": 371,
	"./tzm-latn": 370,
	"./tzm-latn.js": 370,
	"./tzm.js": 371,
	"./uk": 372,
	"./uk.js": 372,
	"./ur": 373,
	"./ur.js": 373,
	"./uz": 375,
	"./uz-latn": 374,
	"./uz-latn.js": 374,
	"./uz.js": 375,
	"./vi": 376,
	"./vi.js": 376,
	"./x-pseudo": 377,
	"./x-pseudo.js": 377,
	"./yo": 378,
	"./yo.js": 378,
	"./zh-cn": 379,
	"./zh-cn.js": 379,
	"./zh-hk": 380,
	"./zh-hk.js": 380,
	"./zh-tw": 381,
	"./zh-tw.js": 381
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 712;


/***/ }),

/***/ 715:
/***/ (function(module, exports) {

module.exports = "<sme-styles>\r\n  <div class=\"stretch-absolute\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</sme-styles>"

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(431);


/***/ })

},[999]);
//# sourceMappingURL=main.bundle.js.map