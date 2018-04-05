webpackJsonp([1,6],{

/***/ 1001:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_example_component__ = __webpack_require__(1003);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_example_routing__ = __webpack_require__(1005);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddExampleModule", function() { return AddExampleModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AddExampleModule = (function () {
    function AddExampleModule() {
    }
    return AddExampleModule;
}());
AddExampleModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__add_example_routing__["a" /* Routing */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__add_example_component__["a" /* AddExampleComponent */]]
    })
], AddExampleModule);

//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/add-example.module.js.map

/***/ }),

/***/ 1003:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msft_sme_shell_angular__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__msft_sme_shell_core__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_dist_core_manifest_environment_modules__ = __webpack_require__(25);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddExampleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddExampleComponent = (function () {
    function AddExampleComponent(appContextService, route) {
        this.appContextService = appContextService;
        this.route = route;
        this.strings = MsftSme.resourcesStrings().SolutionExample;
        this.connectionType = 'msft.sme.connection-type.example'; // This needs to match the connectionTypes value used in the manifest.json.
        // TODO:
    }
    AddExampleComponent.prototype.ngOnInit = function () {
        // TODO
    };
    AddExampleComponent.prototype.onSubmit = function () {
        var connections = [];
        var connection = {
            id: __WEBPACK_IMPORTED_MODULE_3__msft_sme_shell_core__["b" /* ConnectionUtility */].createConnectionId(this.connectionType, this.newConnectionName),
            type: this.connectionType,
            name: this.newConnectionName
        };
        connections.push(connection);
        this.appContextService.rpc.updateData(__WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_dist_core_manifest_environment_modules__["a" /* EnvironmentModule */].nameOfShell, '##', {
            results: {
                connections: connections,
                credentials: null
            }
        });
    };
    AddExampleComponent.prototype.onCancel = function () {
        this.appContextService.rpc.updateData(__WEBPACK_IMPORTED_MODULE_4__msft_sme_shell_dist_core_manifest_environment_modules__["a" /* EnvironmentModule */].nameOfShell, '##', { results: { connections: [] } });
    };
    return AddExampleComponent;
}());
AddExampleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'add-example',
        template: __webpack_require__(1009),
        styles: [__webpack_require__(1007)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__msft_sme_shell_angular__["l" /* AppContextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__msft_sme_shell_angular__["l" /* AppContextService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object])
], AddExampleComponent);

var _a, _b;
//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/add-example.component.js.map

/***/ }),

/***/ 1005:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_example_component__ = __webpack_require__(1003);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Routing; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__add_example_component__["a" /* AddExampleComponent */]
    }
];
var Routing = (function () {
    function Routing() {
    }
    return Routing;
}());
Routing = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], Routing);

//# sourceMappingURL=C:/Users/matwils/Source/base/msft-sme-solution-example/src/add-example.routing.js.map

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1009:
/***/ (function(module, exports) {

module.exports = "<div class=\"stretch-absolute flex-layout vertical\">\n  <div class=\"auto-flex-size vertical-scroll-only\">\n    {{strings.connectionName}}\n    <input type=\"text\" [(ngModel)]=\"newConnectionName\" />\n  </div>\n  <div class=\"fixed-flex-size\">\n      <div class=\"sme-position-right-inline\">\n          <button type=\"button\" class=\"btn\" (click)=\"onSubmit()\">{{strings.buttons.add}}</button>\n          <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{strings.buttons.cancel}}</button>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })

});
//# sourceMappingURL=1.chunk.js.map