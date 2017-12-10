webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".flex-cont {\r\nmin-height: 100%; /* Avoid the IE 10-11 `min-height` bug. */\r\ndisplay: -webkit-box;\r\ndisplay: -ms-flexbox;\r\ndisplay: flex;\r\n-webkit-box-orient: vertical;\r\n-webkit-box-direction: normal;\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n\r\n}\r\n.navbar {\r\n      background-color: #544e4e;\r\n}\r\n.foot {\r\n    /*background-color: rgba(128, 128, 128, 0.34);*/\r\n    background-color:   rgba(214, 63, 63, 0.85);\r\n    -ms-flex-negative: 0;\r\n        flex-shrink: 0; /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */\r\n    padding: 20px;\r\n}\r\n\r\n\r\n.content {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1 0 auto;\r\n          flex: 1 0 auto;\r\n\r\n}\r\n\r\n/*animations*/\r\n\r\n.fade-in {\r\n  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */ /* Firefox < 16 */ /* Internet Explorer */ /* Opera < 12.1 */\r\n          animation: fadein 2s;\r\n}\r\n\r\n@keyframes fadein {\r\n    from { opacity: 0; }\r\n    to   { opacity: 1; }\r\n}\r\n\r\n/* Firefox < 16 */\r\n\r\n/* Safari, Chrome and Opera > 12.1 */\r\n@-webkit-keyframes fadein {\r\n    from { opacity: 0; }\r\n    to   { opacity: 1; }\r\n}\r\n\r\n/* Internet Explorer */\r\n\r\n/* Opera < 12.1 */\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid flex-cont fade-in\">\n  <app-header></app-header>\n  <div class=\"content\">\n  <div class=\"row navigation\">\n    <div class=\"col-1\">\n      <button type=\"button\" class=\"btn btn-primary costi navig\" (click)=\"navigation('materiali')\"> Materiali </button>\n    </div>\n    <div class=\"col-1\">\n        <button type=\"button\" class=\"btn btn-primary magazzino navig\" (click)=\"navigation('magazzino')\"> Magazzino </button>\n    </div>\n    <div class=\"col-1\">\n        <button type=\"button\" class=\"btn btn-primary ordini navig\" (click)=\"navigation('ordini')\"> Ordini </button>\n    </div>\n    <div class=\"col-1\">\n        <button type=\"button\" class=\"btn btn-primary costi navig\" (click)=\"navigation('costi')\"> Costi di gestione </button>\n    </div>\n  </div>\n  <router-outlet></router-outlet>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
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
    function AppComponent(_router) {
        this._router = _router;
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.navigation = function (loc) {
        this._router.navigate(["/" + loc + ""]);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_app_routing_module__ = __webpack_require__("../../../../../src/app/shared/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_buttons__ = __webpack_require__("../../../../ngx-bootstrap/buttons/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__magazzino_magazzino_component__ = __webpack_require__("../../../../../src/app/magazzino/magazzino.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ordini_ordini_component__ = __webpack_require__("../../../../../src/app/ordini/ordini.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__costi_costi_component__ = __webpack_require__("../../../../../src/app/costi/costi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__materiali_materiali_component__ = __webpack_require__("../../../../../src/app/materiali/materiali.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_9__magazzino_magazzino_component__["a" /* MagazzinoComponent */],
                __WEBPACK_IMPORTED_MODULE_10__ordini_ordini_component__["a" /* OrdiniComponent */],
                __WEBPACK_IMPORTED_MODULE_11__costi_costi_component__["a" /* CostiComponent */],
                __WEBPACK_IMPORTED_MODULE_12__materiali_materiali_component__["a" /* MaterialiComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__shared_app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_buttons__["a" /* ButtonsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/costi/costi.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/costi/costi.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  costi works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/costi/costi.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CostiComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CostiComponent = (function () {
    function CostiComponent() {
    }
    CostiComponent.prototype.ngOnInit = function () {
    };
    CostiComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-costi',
            template: __webpack_require__("../../../../../src/app/costi/costi.component.html"),
            styles: [__webpack_require__("../../../../../src/app/costi/costi.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CostiComponent);
    return CostiComponent;
}());



/***/ }),

/***/ "../../../../../src/app/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".header {\r\n  /*text-align: center;*/\r\n  /*background-color: rgba(221, 219, 219, 0.44)*/\r\n  /*background-color: rgba(214, 63, 63, 0.85);*/\r\n  /*background-color:  rgba(53, 75, 94, 0.85);*/\r\n  /*background-color:  rgba(16, 16, 16, 0.85);*/\r\n  padding-top:7px;\r\n  padding-bottom: 7px;\r\n  max-height: 75px;\r\n  color:white;\r\n}\r\n.maintitle {\r\n  font-size: 3em;\r\n  /*font-family: vtks;\r\n  color: black;\r\n  letter-spacing: 0.19em;*/\r\n  font-size: 3em;\r\n  font-family: Open Sans, sans-serif;\r\n  color: white;\r\n  /* letter-spacing: 0.19em; */\r\n  font-weight: bold;\r\n}\r\n.sub-maintitle {\r\n  font-family: Open Sans, sans-serif;\r\n  /*font-family: Berkshire Swash;*/\r\n  font-size:1.2em;\r\n}\r\n.mainlogo {\r\n  border-radius: 50%;\r\n  width: 50px;\r\n}\r\n\r\n.header-container {\r\n  max-height: 250px;\r\n  background-color:  rgb(83, 131, 218);\r\n}\r\n/*search-class*/\r\n:host(\r\n  .on-searching {\r\n  max-height: 1000vh;\r\n  /*-webkit-transition: max-height 1s;\r\n  -moz-transition: max-height 1s;\r\n  -ms-transition: max-height 1s;\r\n  -o-transition: max-height 1s;*/\r\n  display:flex;\r\n  min-height: 100vh;\r\n  align-content: flex-start;\r\n  flex-direction: column;\r\n}\r\n)\r\n\r\n.results-container {\r\n  -webkit-box-flex:1;\r\n      -ms-flex:1;\r\n          flex:1;\r\n  background-color:  rgba(16, 16, 16, 0.75);\r\n  height:0px;\r\n}\r\n\r\n/* xs < 768 */\r\n@media screen and (max-width: 576px) {\r\n  .img-result-container{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    width: 100%;\r\n  }\r\n  .maintitle {\r\n    font-size: 1.35em;\r\n    text-align:center;\r\n  }\r\n  .sub-maintitle {\r\n    text-align:center;\r\n  }\r\n  .header-main-content {\r\n    -webkit-box-pack: center !important;\r\n        -ms-flex-pack: center !important;\r\n            justify-content: center !important;\r\n  }\r\n}\r\n@media screen and (width: 576px) {\r\n    .maintitle {\r\n        font-size: 1.35em;\r\n        text-align:left;\r\n    }\r\n    .sub-maintitle {\r\n        text-align:left;\r\n    }\r\n    .header-main-content {\r\n      -webkit-box-pack: center !important;\r\n          -ms-flex-pack: center !important;\r\n              justify-content: center !important;\r\n    }\r\n}\r\n\r\n/* sm */\r\n@media screen and (min-width: 577px) {\r\n    .maintitle {\r\n        font-size: 1.35em;\r\n\r\n    }\r\n}\r\n\r\n/* md */\r\n@media screen and (min-width: 768px) {\r\n    .maintitle {\r\n        font-size: 1.35em;\r\n    }\r\n}\r\n\r\n/* lg */\r\n@media screen and (min-width: 960px) {\r\n    .maintitle {\r\n        font-size: 1.35em;\r\n    }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center header-container\">\r\n  <div class=\"col-sm-10 col-12 header\">\r\n    <div class=\"row justify-content-start align-items-center header-main-content\">\r\n      <div class=\"col-lg-auto\">\r\n        <img class=\"img-fluid img-thumbnail mainlogo\" src=\"img/logo.png\" />\r\n      </div>\r\n      <div class=\"col-sm-5 hidden-sm-down\">\r\n        <div class = \"row justify-content-center align-items-center\">\r\n          <div class=\"col-12 col-sm-12\">\r\n            <div class = \"row align-items-center\">\r\n              <div class=\"col-12 col-sm-10 maintitle\">\r\n                    {{siteTitle}}\r\n              </div>\r\n            </div>\r\n            <div class = \"row align-items-center\">\r\n              <div class=\"col-12 col-sm-12 sub-maintitle\">\r\n                    {{subTitle}}\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-4 col-sm-8 col-8 search-header\">\r\n      </div>\r\n      <div class=\"col-sm-1 col-1 search-header\">\r\n        <span class=\".navbar-light .navbar-toggler-icon\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i></span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"row results-container\">\r\n<div class=\"col-12\">\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
        this.siteTitle = 'Gestionale Magazzino';
        this.subTitle = '';
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/magazzino/magazzino.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/magazzino/magazzino.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  magazzino works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/magazzino/magazzino.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MagazzinoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MagazzinoComponent = (function () {
    function MagazzinoComponent() {
    }
    MagazzinoComponent.prototype.ngOnInit = function () {
    };
    MagazzinoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-magazzino',
            template: __webpack_require__("../../../../../src/app/magazzino/magazzino.component.html"),
            styles: [__webpack_require__("../../../../../src/app/magazzino/magazzino.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MagazzinoComponent);
    return MagazzinoComponent;
}());



/***/ }),

/***/ "../../../../../src/app/materiali/materiali.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".custom-form-control {\r\n  width:100px;\r\n  display:inline-block;\r\n}\r\n\r\n#searchForm {\r\n  display: inline;\r\n}\r\n\r\n#searchForm > input {\r\n  width:100px;\r\n  display:inline-block;\r\n}\r\n\r\n#insertMaterialiForm .ng-invalid:not(.ng-untouched) {\r\n  background-color:#ff00004f;\r\n  border-color: red;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/materiali/materiali.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row maincontent justify-content-center\">\n  <div class=\"col-10\">\n    <div>Ricerca o inserisci nuovo oggetto</div>\n    <div>\n        <form id=\"searchForm\" [formGroup] = \"searchForm\" class = \"search-form\" (ngSubmit)=\"search(searchForm)\">\n          Codice oggetto : <input class=\"form-control\"\n          formControlName=\"code\"\n          autocorrect=\"off\"\n          autocapitalize=\"off\"\n          spellcheck=\"off\" type=\"text\"\n          value=\"\">\n          Nome : <input class=\"form-control\"\n          formControlName=\"name\"\n          autocorrect=\"off\"\n          autocapitalize=\"off\"\n          spellcheck=\"off\" type=\"text\"\n          value=\"\">\n          <button type=\"submit\" class=\"btn submit-btn\">Cerca</button>\n        </form>\n      <span style=\"margin-left:140px;\"><button type=\"button\" class=\"btn btn-primary\" (click)=\"toggleInsert()\">Nuovo articolo</button></span>\n    </div>\n  </div>\n  <div class=\"col-10\" *ngIf=\"insertMode\">\n    <form id=\"insertMaterialiForm\" [formGroup] = \"insertMaterialiForm\" (ngSubmit)=\"insert(insertMaterialiForm)\">\n      Codice articolo: <input class = \"form-control code\"\n      formControlName=\"code\"\n      autocorrect=\"off\"\n      autocapitalize=\"off\"\n      spellcheck=\"off\" type=\"text\"\n      value=\"\">\n      Nome: <input class = \"form-control name\"\n      formControlName=\"name\"\n      autocorrect=\"off\"\n      autocapitalize=\"off\"\n      spellcheck=\"off\" type=\"text\"\n      value=\"\">\n      Fornitore: <input class = \"form-control forn\"\n      formControlName=\"fornitore\"\n      autocorrect=\"off\"\n      autocapitalize=\"off\"\n      spellcheck=\"off\" type=\"text\"\n      value=\"\">\n      Prezzo per collo: <input class = \"form-control price\"\n      formControlName=\"price\"\n      autocorrect=\"off\"\n      autocapitalize=\"off\"\n      spellcheck=\"off\" type=\"text\"\n      value=\"\">\n      Numero di articoli per collo: <input class = \"form-control collobj\"\n      formControlName=\"collobj\"\n      autocorrect=\"off\"\n      autocapitalize=\"off\"\n      spellcheck=\"off\" type=\"text\"\n      value=\"\">\n      Note: <input class = \"form-control note\"\n      formControlName=\"note\"\n      autocorrect=\"off\"\n      autocapitalize=\"off\"\n      spellcheck=\"off\" type=\"text\"\n      value=\"\">\n      <button type=\"submit\" class=\"btn submit-btn\">Inserisci</button>\n    </form>\n  </div>\n  <div *ngIf=\"!insertMode\">\n    <table>\n      <tr *ngFor=\"let searchRes of searchResults\">\n        <td>\n          {{searchRes.code}}\n        </td>\n        <td>\n          {{searchRes.name}}\n        </td>\n        <td>\n          {{searchRes.fornitore}}\n        </td>\n        <td>\n          {{searchRes.price}}\n        </td>\n        <td>\n          {{searchRes.collobj}}\n        </td>\n        <td>\n          {{searchRes.note}}\n        </td>\n      </tr>\n    </table>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/materiali/materiali.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialiComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_materiali_service__ = __webpack_require__("../../../../../src/app/services/materiali.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MaterialiComponent = (function () {
    function MaterialiComponent(matService, _fb) {
        this.matService = matService;
        this._fb = _fb;
        this.insertMode = false;
        this.searchResults = [];
    }
    MaterialiComponent.prototype.ngOnInit = function () {
        //init della form
        this.insertMaterialiForm = this._fb.group({
            code: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            fornitore: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            price: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            collobj: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required],
            note: ''
        });
        this.searchForm = this._fb.group({
            code: null,
            name: null
        });
    };
    MaterialiComponent.prototype.toggleInsert = function () {
        return this.insertMode = !this.insertMode;
    };
    MaterialiComponent.prototype.insert = function (form) {
        console.log('submit');
        if (form.status == "INVALID")
            return;
        else
            return this.matService.insert(form).subscribe(function (res) {
                console.log(res);
            });
    };
    MaterialiComponent.prototype.search = function (form) {
        var _this = this;
        this.insertMode = false;
        var code = form.controls.code.value;
        var name = form.controls.name.value;
        if (!code && !name)
            return;
        else
            return this.matService.search(code, name).subscribe(function (res) {
                if (res.length)
                    _this.searchResults = res;
                console.log(res);
            });
    };
    MaterialiComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-materiali',
            template: __webpack_require__("../../../../../src/app/materiali/materiali.component.html"),
            styles: [__webpack_require__("../../../../../src/app/materiali/materiali.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_materiali_service__["a" /* MaterialiService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_materiali_service__["a" /* MaterialiService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
    ], MaterialiComponent);
    return MaterialiComponent;
}());



/***/ }),

/***/ "../../../../../src/app/ordini/ordini.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ordini/ordini.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  ordini works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/ordini/ordini.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdiniComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrdiniComponent = (function () {
    function OrdiniComponent() {
    }
    OrdiniComponent.prototype.ngOnInit = function () {
    };
    OrdiniComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-ordini',
            template: __webpack_require__("../../../../../src/app/ordini/ordini.component.html"),
            styles: [__webpack_require__("../../../../../src/app/ordini/ordini.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], OrdiniComponent);
    return OrdiniComponent;
}());



/***/ }),

/***/ "../../../../../src/app/services/materiali.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MaterialiService = (function () {
    function MaterialiService(http) {
        this.http = http;
    }
    MaterialiService.prototype.insert = function (form) {
        var body = {};
        body = form.getRawValue();
        var code = form.controls.code.value;
        var name = form.controls.name.value;
        var price = form.controls.price.value;
        var fornitore = form.controls.fornitore.value;
        var collobj = form.controls.collobj.value;
        var note = form.controls.note.value;
        return this.http.post('/mat/insert', body);
    };
    MaterialiService.prototype.search = function (code, name) {
        return this.http.get("/mat?code=" + code + "&name=" + name);
    };
    MaterialiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], MaterialiService);
    return MaterialiService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__magazzino_magazzino_component__ = __webpack_require__("../../../../../src/app/magazzino/magazzino.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ordini_ordini_component__ = __webpack_require__("../../../../../src/app/ordini/ordini.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__costi_costi_component__ = __webpack_require__("../../../../../src/app/costi/costi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__materiali_materiali_component__ = __webpack_require__("../../../../../src/app/materiali/materiali.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var appRoutes = [
    { path: 'magazzino', component: __WEBPACK_IMPORTED_MODULE_2__magazzino_magazzino_component__["a" /* MagazzinoComponent */] },
    { path: 'materiali', component: __WEBPACK_IMPORTED_MODULE_5__materiali_materiali_component__["a" /* MaterialiComponent */] },
    { path: 'ordini', component: __WEBPACK_IMPORTED_MODULE_3__ordini_ordini_component__["a" /* OrdiniComponent */] },
    { path: 'costi', component: __WEBPACK_IMPORTED_MODULE_4__costi_costi_component__["a" /* CostiComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(appRoutes)],
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map