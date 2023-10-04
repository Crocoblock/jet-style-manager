/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/block-manager.js":
/*!**********************************!*\
  !*** ./modules/block-manager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controls_extra_atributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls/extra-atributes */ "./modules/controls/extra-atributes.js");
/* harmony import */ var _controls_section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls/section */ "./modules/controls/section.js");
/* harmony import */ var _controls_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls/tabs */ "./modules/controls/tabs.js");
/* harmony import */ var _controls_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls/input */ "./modules/controls/input.js");
/* harmony import */ var _controls_toggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls/toggle */ "./modules/controls/toggle.js");
/* harmony import */ var _controls_color_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls/color-picker */ "./modules/controls/color-picker.js");
/* harmony import */ var _controls_range__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controls/range */ "./modules/controls/range.js");
/* harmony import */ var _controls_choose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controls/choose */ "./modules/controls/choose.js");
/* harmony import */ var _controls_dimensions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controls/dimensions */ "./modules/controls/dimensions.js");
/* harmony import */ var _controls_border__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./controls/border */ "./modules/controls/border.js");
/* harmony import */ var _controls_typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./controls/typography */ "./modules/controls/typography.js");
/* harmony import */ var _controls_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./controls/select */ "./modules/controls/select.js");
/* harmony import */ var _controls_text__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./controls/text */ "./modules/controls/text.js");


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }













var addFilter = wp.hooks.addFilter;
var JetBlockManager = /*#__PURE__*/function () {
  function JetBlockManager() {
    _classCallCheck(this, JetBlockManager);
    var self = this;
    self.setControlsInstance();
    self.addAttributes();
    self.registerBlocks();
    self.registerBlockStyle();
  }
  _createClass(JetBlockManager, [{
    key: "setControlsInstance",
    value: function setControlsInstance() {
      window.jetSmControlCallback = {
        ExtraAtributes: _controls_extra_atributes__WEBPACK_IMPORTED_MODULE_0__.ExtraAtributes,
        StartSection: _controls_section__WEBPACK_IMPORTED_MODULE_1__.StartSection,
        StartTabs: _controls_tabs__WEBPACK_IMPORTED_MODULE_2__.StartTabs,
        StartTab: _controls_tabs__WEBPACK_IMPORTED_MODULE_2__.StartTab,
        Input: _controls_input__WEBPACK_IMPORTED_MODULE_3__.Input,
        ColorPicker: _controls_color_picker__WEBPACK_IMPORTED_MODULE_5__.ColorPicker,
        Toggle: _controls_toggle__WEBPACK_IMPORTED_MODULE_4__.Toggle,
        Range: _controls_range__WEBPACK_IMPORTED_MODULE_6__.Range,
        Choose: _controls_choose__WEBPACK_IMPORTED_MODULE_7__.Choose,
        Dimensions: _controls_dimensions__WEBPACK_IMPORTED_MODULE_8__.Dimensions,
        Border: _controls_border__WEBPACK_IMPORTED_MODULE_9__.Border,
        Typography: _controls_typography__WEBPACK_IMPORTED_MODULE_10__.Typography,
        Select: _controls_select__WEBPACK_IMPORTED_MODULE_11__.Select,
        Text: _controls_text__WEBPACK_IMPORTED_MODULE_12__.Text
      };
    }
  }, {
    key: "registerBlocks",
    value: function registerBlocks() {
      if (!window.jetSmGutenbergBlocks || 0 === window.jetSmGutenbergBlocks.blocks.length) {
        return;
      }
      var registerBlockType = wp.blocks.registerBlockType,
        InspectorControls = wp.blockEditor.InspectorControls;
      var self = this,
        blocks = window.jetSmGutenbergBlocks.blocks,
        blockControls = [];
      var _loop = function _loop(block) {
        var blockArgs = blocks[block],
          blockControls = {},
          controlStack;
        blockControls[block] = window.jetSmBlockControl && window.jetSmBlockControl[block] ? window.jetSmBlockControl[block] : [];
        blockArgs['save'] = function (props) {
          if (undefined !== blockArgs['save_callback']) {
            if ("function" !== typeof jetSmGutenbergBlocks[blockArgs['save_callback']]) {
              console.error('The "save_callback" attribute function was not found in the jetSmGutenbergBlocks object. ');
            } else {
              return jetSmGutenbergBlocks[blockArgs['save_callback']](props);
            }
          } else {
            return null;
          }
        };
        blockArgs['edit'] = function (props) {
          controlStack = self.renderControls(blockControls[block], props);
          return [props.isSelected && controlStack && wp.element.createElement(InspectorControls, {
            key: 'inspector'
          }, controlStack), wp.element.createElement("div", {
            key: props.clientId
          }, blockArgs['save'](props))];
        };

        //Set block atributes
        blockArgs['attributes'] = Object.assign({}, blockArgs['attributes'], self.getAtributes(self.getControlsInstant(blockControls[block])));
        registerBlockType(block, blockArgs);
      };
      for (var block in blocks) {
        _loop(block);
      }
    }
  }, {
    key: "registerBlockStyle",
    value: function registerBlockStyle() {
      if (!window.jetSmBlockStyleControl || 0 === window.jetSmBlockStyleControl.length) {
        return;
      }
      var __ = wp.i18n.__,
        _wp$editPost = wp.editPost,
        PluginSidebar = _wp$editPost.PluginSidebar,
        PluginSidebarMoreMenuItem = _wp$editPost.PluginSidebarMoreMenuItem,
        Fragment = wp.element.Fragment;
      var self = this,
        blocks = window.jetSmBlockStyleControl,
        blockNames = Object.keys(blocks),
        blockArgs = [];
      for (var block in blocks) {
        blockArgs[block] = [];
        blockArgs[block]['attributes'] = self.getAtributes(self.getControlsInstant(blocks[block]));
      }
      addFilter('blocks.registerBlockType', 'jet-styles-manager', function (props, name) {
        if (-1 === blockNames.indexOf(name)) {
          return props;
        }
        props.attributes = Object.assign({}, props.attributes, blockArgs[name].attributes);
        return props;
      });
      addFilter('editor.BlockEdit', 'jet-styles-manager', function (BlockEdit) {
        return function (props) {
          if (-1 === blockNames.indexOf(props.name)) {
            return wp.element.createElement(BlockEdit, _extends({}, props, {
              key: props.clientId
            }));
          }
          var controlStack = self.renderControls(window.jetSmBlockStyleControl[props.name], props);
          return [wp.element.createElement(BlockEdit, _extends({}, props, {
            key: props.clientId
          })), props.isSelected && controlStack && wp.element.createElement(Fragment, null, wp.element.createElement(PluginSidebarMoreMenuItem, {
            target: 'jet-sm-style-sidebar',
            key: 'style-sidebar-link'
          }, __('Block Style', 'jet-styles-manager')), wp.element.createElement(PluginSidebar, {
            className: 'jet-sm-style-sidebar',
            name: 'jet-sm-style-sidebar',
            icon: 'admin-customizer',
            title: __('Block Style', 'jet-styles-manager'),
            key: 'style-sidebar'
          }, controlStack))];
        };
      });
    }
  }, {
    key: "addAttributes",
    value: function addAttributes() {
      var allBlocks = this.getAllBlockSteck();
      if (!allBlocks) {
        return;
      }
      addFilter('editor.BlockListBlock', 'jet-styles-manager', function (BlockListBlock) {
        return function (props) {
          if (-1 === allBlocks.indexOf(props.name)) {
            return wp.element.createElement(BlockListBlock, props);
          }
          var id = props.attributes.blockID,
            className = props.attributes.className;
          return wp.element.createElement(BlockListBlock, _extends({}, props, {
            id: id,
            className: className
          }));
        };
      });
    }

    /// Function return class instance
  }, {
    key: "getControlsInstant",
    value: function getControlsInstant(controlsStack) {
      if (!controlsStack) {
        return null;
      }
      ;
      var controls = [],
        args,
        className,
        newControl;
      for (var key in controlsStack) {
        if (controlsStack.hasOwnProperty(key)) {
          args = controlsStack[key];
          className = this.getClassNameByType(args['type']);
          if (!jetSmControlCallback[className]) {
            continue;
          }
          newControl = new jetSmControlCallback[className](args);
          if (newControl) {
            controls.push(newControl);
          }
          if (args['child']) {
            var child = this.getControlsInstant(args['child']);
            controls.push.apply(controls, _toConsumableArray(child));
          }
        }
      }
      return controls;
    }
  }, {
    key: "getAtributes",
    value: function getAtributes(controlsStack) {
      var atributes = {};
      if (!controlsStack) {
        return atributes;
      }
      var _iterator = _createForOfIteratorHelper(controlsStack),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var control = _step.value;
          if (!control.attributes && !control.args.attributes) {
            continue;
          }
          if ('extra-atributes' === control.attributes.type) {
            atributes = Object.assign({}, atributes, control.attributes);
            delete atributes['id'];
            delete atributes['type'];
          } else {
            atributes[control.args.id] = control.args.css_selector ? Object.assign({
              source: 'children'
            }, control.attributes) : control.attributes;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return atributes;
    }
  }, {
    key: "renderControls",
    value: function renderControls(controlsStack, props) {
      var reactControls = [];
      if (!controlsStack) {
        return reactControls;
      }
      for (var key in controlsStack) {
        var args = controlsStack[key],
          className = this.getClassNameByType(args['type']),
          controlBuild = void 0,
          newControl = void 0;
        if (!jetSmControlCallback[className]) {
          continue;
        }
        if (args['child'] /*&& ! args['_child']*/) {
          args['_child'] = this.renderControls(args['child'], props);
        }
        newControl = new jetSmControlCallback[className](args);
        newControl.init(props);
        controlBuild = newControl.render();
        if (controlBuild) {
          reactControls.push(controlBuild);
        }
      }
      return reactControls;
    }
  }, {
    key: "getClassNameByType",
    value: function getClassNameByType() {
      var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      className = className.replace(/_|-/g, ' ');
      className = className.replace(/^(.)|\s+(.)/g, function ($1) {
        return $1.toUpperCase();
      });
      className = className.replace(' ', '');
      return className;
    }
  }, {
    key: "getAllBlockSteck",
    value: function getAllBlockSteck() {
      if (!window.jetSmBlockStyleControl && !window.jetSmBlockControl) {
        return false;
      }
      var blockStyle = window.jetSmBlockStyleControl ? Object.keys(jetSmBlockStyleControl) : [],
        registerBlock = window.jetSmBlockControl ? Object.keys(jetSmBlockControl) : [],
        allBlocks = new Set([].concat(_toConsumableArray(blockStyle), _toConsumableArray(registerBlock)));
      allBlocks = _toConsumableArray(allBlocks);
      if (0 === allBlocks.length) {
        return false;
      }
      return allBlocks;
    }
  }]);
  return JetBlockManager;
}();
new JetBlockManager();

/***/ }),

/***/ "./modules/controls/base-control.js":
/*!******************************************!*\
  !*** ./modules/controls/base-control.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseControl: () => (/* binding */ BaseControl)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * class BaseControl
 */
var _wp$components = wp.components,
  Button = _wp$components.Button,
  ButtonGroup = _wp$components.ButtonGroup,
  Dropdown = _wp$components.Dropdown,
  WpBaseControl = _wp$components.BaseControl;
var BaseControl = /*#__PURE__*/function () {
  function BaseControl(args) {
    _classCallCheck(this, BaseControl);
    this.setDefaultArgs();
    this.setDefaultAttribut();
    this.setVars(args);
  }
  _createClass(BaseControl, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        id: '',
        type: '',
        separator: 'none',
        condition: '',
        css_selector: '',
        not_wrap: false,
        default_intervals: {
          step: 0.1,
          min: -2,
          max: 20,
          initialPosition: 0
        },
        //conditions: [],
        class_name: '',
        label: '',
        hide_label_from_vision: false,
        help: ''
      };
    }
  }, {
    key: "defaultEventDetail",
    value: function defaultEventDetail() {
      return ['unit', 'min', 'max', 'step', 'return_value'];
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {};
    }
  }, {
    key: "setVars",
    value: function setVars(args) {
      this.args = Object.assign({}, this.args, args);
      var innerAttributes = args['attributes'] ? args['attributes'] : {};
      this.attributes = Object.assign({}, this.attributes, innerAttributes);
    }
  }, {
    key: "init",
    value: function init(props) {
      this.blockProps = props;
      this.curent_breakpoints = this.blockProps.attributes['curentBreakpoints'] || 'desktop';
      if (this.blockProps.isSelected) {
        var value = this.attributes.default,
          id = this.args.id,
          blockID = this.blockProps.attributes.blockID;
        if (this.args.css_selector && blockID && !this.getMetaValue(id, blockID) && value) {
          //If the last value is set true, the default values will be applied
          this.setMetaValue(value, blockID, this.args, false);
        }
        if (!this.args.css_selector && blockID && !this.getAtributValue(id, blockID) && value) {
          this.setAtributValue(value, id, blockID);
        }
      }
    }
  }, {
    key: "beforeGetValue",
    value: function beforeGetValue(value, id) {
      return value;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var blockID = this.blockProps.attributes.blockID,
        id = this.args.id,
        optionName = !this.args.breakpoints || !this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints,
        valueObject,
        value;
      valueObject = !this.args.css_selector ? this.getAtributValue(id, blockID) : this.getMetaValue(id, blockID) || this.getAtributValue(id, blockID);

      /*if( undefined === valueObject || undefined === valueObject.value ){
      	valueObject = this.attributes.default;
      }*/

      if (valueObject) {
        value = valueObject[optionName];
      }
      return this.beforeGetValue(value, id);
    }
  }, {
    key: "getMetaValue",
    value: function getMetaValue(id, blockID) {
      if (!window.jetSmControlsValues || !window.jetSmControlsValues[blockID] || !window.jetSmControlsValues[blockID][id]) {
        return undefined;
      }
      return window.jetSmControlsValues[blockID][id];
    }
  }, {
    key: "getAtributValue",
    value: function getAtributValue(id, blockID) {
      return this.blockProps.attributes[id];
    }
  }, {
    key: "beforeSetValue",
    value: function beforeSetValue(value, id) {
      switch (this.attributes.type.toLowerCase()) {
        case 'string':
          value = String(value);
          break;
        case 'number':
          value = Number(value);
          break;
        case 'int' || 0:
          value = parseInt(value);
          break;
        case 'boolean':
          value = Boolean(value);
          break;
        case 'array':
          value = value;
          break;
        case 'object':
          value = value;
          break;
        default:
          value = value;
          break;
      }
      return value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var id = this.args.id,
        blockID = this.blockProps.attributes.blockID,
        valueObject = this.getAtributValue(id, blockID) || this.attributes.default,
        updValueObject,
        optionName = !this.args.breakpoints || !this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints;
      if ('object' === _typeof(value)) {
        value = Object.assign({}, valueObject[optionName], value);
      }
      value = this.beforeSetValue(value, id);
      updValueObject = Object.assign({}, valueObject, _defineProperty({}, optionName, value));
      if (this.args.css_selector) {
        this.setMetaValue(updValueObject, blockID, this.args);
      } //else{
      this.setAtributValue(updValueObject, id, blockID);
      //}
    }
  }, {
    key: "setMetaValue",
    value: function setMetaValue(value, blockID, args) {
      var isInitSet = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var id = args.id,
        detail = {
          id: id,
          value: value,
          blockID: blockID,
          css_selector: args.css_selector || null,
          breakpoints: args.breakpoints || 'desktop',
          isInitSet: isInitSet,
          controlType: args.type
        };
      if (!window.jetSmControlsValues) {
        window.jetSmControlsValues = {};
      }
      if (!window.jetSmControlsValues[blockID]) {
        window.jetSmControlsValues[blockID] = {};
      }
      window.jetSmControlsValues[blockID][id] = value;
      var _iterator = _createForOfIteratorHelper(this.defaultEventDetail()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          if (args[key]) {
            detail[key] = args[key];
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var event = new CustomEvent('jet-sm-update-meta', {
        detail: detail
      });
      document.dispatchEvent(event);
    }
  }, {
    key: "setAtributValue",
    value: function setAtributValue(value, id, blockID) {
      this.blockProps.setAttributes(_defineProperty({}, id, value));
    }
  }, {
    key: "renderUnitsControl",
    value: function renderUnitsControl(units, id, valueCuretn, valuesStack) {
      var _this = this;
      var untisOptions = [];
      var _loop = function _loop() {
        var args = units[key],
          disabled = units.length === 1 ? true : false,
          buttonType = args.value === valueCuretn[id] && !disabled ? true : false,
          lable = args.label ? args.label : args.value;
        untisOptions.push(wp.element.createElement(Button, {
          isPrimary: buttonType,
          isSecondary: !buttonType,
          disabled: disabled,
          isSmall: true,
          key: key,
          onClick: function onClick(e) {
            valuesStack[id] = args.value;
            _this.setValue(valuesStack);
          }
        }, lable.toUpperCase()));
      };
      for (var key in units) {
        _loop();
      }
      return wp.element.createElement(ButtonGroup, {
        className: 'jet-st-control-units'
      }, untisOptions);
    }
  }, {
    key: "renderBreakpointsControl",
    value: function renderBreakpointsControl() {
      var _this2 = this;
      if (!this.args.breakpoints) {
        return null;
      }
      var breakpoints = this.args.breakpoints;
      return wp.element.createElement(Dropdown, {
        className: "jet-st-breakpoints-control",
        contentClassName: "jet-st-breakpoint-dropdown",
        renderContent: function renderContent(_ref) {
          var isOpen = _ref.isOpen,
            onToggle = _ref.onToggle,
            onClose = _ref.onClose;
          var breakpointsControl = [];
          var _loop2 = function _loop2(key) {
            var args = breakpoints[key],
              buttonType = _this2.curent_breakpoints === key ? true : false;
            breakpointsControl.push(wp.element.createElement(Button, {
              isSmall: true,
              isPrimary: buttonType,
              isSecondary: !buttonType,
              showTooltip: true,
              tooltipPosition: 'center',
              shortcut: args.label,
              icon: args.icon,
              className: args.class_name,
              key: key,
              onClick: function onClick(e) {
                _this2.blockProps.setAttributes({
                  curentBreakpoints: key
                });
                onClose();
              }
            }));
          };
          for (var key in breakpoints) {
            _loop2(key);
          }
          return breakpointsControl;
        },
        renderToggle: function renderToggle(_ref2) {
          var isOpen = _ref2.isOpen,
            onToggle = _ref2.onToggle,
            onClose = _ref2.onClose;
          return wp.element.createElement(Button, {
            isSmall: true,
            onClick: onToggle,
            showTooltip: true,
            tooltipPosition: 'center',
            shortcut: breakpoints[_this2.curent_breakpoints].label,
            icon: breakpoints[_this2.curent_breakpoints].icon,
            className: "jet-st-curent-breakpoint " + breakpoints[_this2.curent_breakpoints].class_name
          });
        }
      });
    }
  }, {
    key: "getIntervals",
    value: function getIntervals(units, curentUnit) {
      if (!units[0]) {
        return this.args.default_intervals;
      }
      var _iterator2 = _createForOfIteratorHelper(units),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var unit = _step2.value;
          if (unit.value === curentUnit) {
            if (unit.intervals) {
              return unit.intervals;
            } else {
              return this.args.default_intervals;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "conditionRules",
    value: function conditionRules(condition) {
      var conditionState = true,
        blockID = this.blockProps.attributes.blockID;
      if ('object' !== _typeof(condition) || !Object.keys(condition)[0]) {
        return conditionState;
      }
      for (var option in condition) {
        var value = this.getMetaValue(option, blockID) || this.getAtributValue(option, blockID),
          conditionValue = condition[option],
          optionName = void 0;
        if ('object' === _typeof(value) && undefined !== value.value) {
          optionName = !this.args.breakpoints || !this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints;
          value = value[optionName];
        }
        switch (_typeof(conditionValue)) {
          case "object":
            if (!conditionValue.includes(value)) {
              conditionState = false;
            }
            break;
          default:
            if (value !== conditionValue) {
              conditionState = false;
            }
        }
      }
      return conditionState;
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var HorizontalRule = wp.components.HorizontalRule;
      var _this$args = this.args,
        id = _this$args.id,
        separator = _this$args.separator,
        label = _this$args.label,
        hide_label_from_vision = _this$args.hide_label_from_vision,
        help = _this$args.help,
        class_name = _this$args.class_name,
        condition = _this$args.condition;
      if (!this.conditionRules(condition)) {
        return null;
      }
      return wp.element.createElement("div", {
        key: id
      }, ('before' === separator || 'both' === separator) && wp.element.createElement(HorizontalRule, null), wp.element.createElement(WpBaseControl, {
        hideLabelFromVision: hide_label_from_vision,
        help: help,
        className: "".concat(class_name, " jet-sm-gb-control-wrapper")
      }, wp.element.createElement("div", {
        className: 'jet-sm-gb-control-header'
      }, label && wp.element.createElement(WpBaseControl.VisualLabel, null, label), this.renderBreakpointsControl()), wp.element.createElement("div", {
        className: 'jet-sm-gb-control-inner'
      }, this.renderControl())), ('after' === separator || 'both' === separator) && wp.element.createElement(HorizontalRule, null));
    }
  }]);
  return BaseControl;
}();


/***/ }),

/***/ "./modules/controls/border.js":
/*!************************************!*\
  !*** ./modules/controls/border.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Border: () => (/* binding */ Border)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var _wp$components = wp.components,
  ColorPalette = _wp$components.ColorPalette,
  SelectControl = _wp$components.SelectControl,
  BoxControl = _wp$components.__experimentalBoxControl;
var __ = wp.i18n.__;
var select = wp.data.select;
var Border = /*#__PURE__*/function (_BaseControl) {
  _inherits(Border, _BaseControl);
  var _super = _createSuper(Border);
  function Border(args) {
    _classCallCheck(this, Border);
    return _super.call(this, args);
  }
  _createClass(Border, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      var settings = select('core/block-editor').getSettings();
      this.args = {
        class_name: 'jet-st-border-control',
        label: '',
        separator: 'none',
        hide_label_from_vision: false,
        help: '',
        style: [{
          label: __('None', 'jet-styles-manager'),
          value: 'none'
        }, {
          label: __('Solid', 'jet-styles-manager'),
          value: 'solid'
        }, {
          label: __('Double', 'jet-styles-manager'),
          value: 'double'
        }, {
          label: __('Dotted', 'jet-styles-manager'),
          value: 'dotted'
        }, {
          label: __('Dashed', 'jet-styles-manager'),
          value: 'dashed'
        }, {
          label: __('Groove', 'jet-styles-manager'),
          value: 'groove'
        }],
        width_unit: [{
          value: 'px',
          label: 'PX',
          default: 0
        }],
        radius_unit: [{
          value: 'px',
          label: 'PX',
          default: 0
        }, {
          value: '%',
          label: '%',
          default: 0
        }],
        colors: settings.colors,
        disable_custom_colors: false,
        clearable: true,
        disable_style: false,
        disable_radius: false,
        disable_width: false,
        disable_color: false
      };
      this.defaultValue = {
        style: 'none',
        radius: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        },
        width: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        },
        color: '#000000'
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: {
            style: 'none',
            radius: {
              top: '1px',
              right: '1px',
              bottom: '1px',
              left: '1px'
            },
            width: {
              top: '1px',
              right: '1px',
              bottom: '1px',
              left: '1px'
            },
            color: '#000000'
          }
        },
        type: 'object'
      };
    }
  }, {
    key: "beforeSetValue",
    value: function beforeSetValue(value, id) {
      for (var key in value) {
        switch (key) {
          case "width":
          case "radius":
            for (var option in value[key]) {
              if (null === value[key][option]) {
                value[key][option] = '0px';
              }
            }
            break;
        }
      }
      return value;
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var _this$args = this.args,
        style = _this$args.style,
        width_unit = _this$args.width_unit,
        radius_unit = _this$args.radius_unit,
        colors = _this$args.colors,
        disable_custom_colors = _this$args.disable_custom_colors,
        clearable = _this$args.clearable,
        disable_style = _this$args.disable_style,
        disable_radius = _this$args.disable_radius,
        disable_width = _this$args.disable_width,
        disable_color = _this$args.disable_color;
      var value = Object.assign({}, this.defaultValue, this.getValue());
      return wp.element.createElement("div", {
        className: 'jet-st-border-options'
      }, !disable_style && wp.element.createElement("div", {
        key: 'border-type',
        className: 'jet-st-border-type'
      }, wp.element.createElement(SelectControl, {
        value: value.style,
        onChange: function onChange(newValue) {
          _this.setValue({
            style: newValue
          });
        },
        options: style,
        label: __('Border Type', 'jet-styles-manager'),
        labelPosition: 'side'
      })), 'none' !== value.style && !disable_width && wp.element.createElement("div", {
        key: 'border-width',
        className: 'jet-st-border-width'
      }, wp.element.createElement(BoxControl, {
        values: value.width,
        units: width_unit,
        onChange: function onChange(newValue) {
          _this.setValue({
            width: newValue
          });
        },
        labelPosition: "side",
        type: "number",
        label: __('Border Width', 'jet-styles-manager')
      })), 'none' !== value.style && !disable_radius && wp.element.createElement("div", {
        key: 'border-radius',
        className: 'jet-st-border-radius'
      }, wp.element.createElement(BoxControl, {
        values: value.radius,
        units: radius_unit,
        onChange: function onChange(newValue) {
          _this.setValue({
            radius: newValue
          });
        },
        labelPosition: "side",
        label: __('Border Radius', 'jet-styles-manager')
      })), 'none' !== value.style && !disable_color && wp.element.createElement("div", {
        key: 'border-color',
        className: 'jet-st-border-color'
      }, wp.element.createElement("p", {
        className: "component-box-control__label"
      }, __('Border Color', 'jet-styles-manager')), wp.element.createElement(ColorPalette, {
        value: value.color,
        colors: colors,
        disableCustomColors: disable_custom_colors,
        clearable: clearable,
        onChange: function onChange(newValue) {
          _this.setValue({
            color: newValue
          });
        }
      })));
    }
  }]);
  return Border;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/choose.js":
/*!************************************!*\
  !*** ./modules/controls/choose.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Choose: () => (/* binding */ Choose)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var ToolbarButton = wp.components.ToolbarButton;
var Choose = /*#__PURE__*/function (_BaseControl) {
  _inherits(Choose, _BaseControl);
  var _super = _createSuper(Choose);
  function Choose(args) {
    _classCallCheck(this, Choose);
    return _super.call(this, args);
  }
  _createClass(Choose, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-choose-control',
        label: '',
        separator: 'none',
        hide_label_from_vision: false,
        help: '',
        options: {
          alignleft: {
            icon: 'dashicons-editor-alignleft',
            label: 'alignleft',
            shortcut: 'alignleft'
          },
          aligncenter: {
            icon: 'dashicons-editor-aligncenter',
            label: 'aligncenter',
            shortcut: 'aligncenter'
          },
          alignright: {
            icon: 'dashicons-editor-alignright',
            label: 'alignright',
            shortcut: 'alignright'
          },
          justify: {
            icon: 'dashicons-editor-justify',
            label: 'justify',
            shortcut: 'justify'
          }
        },
        icon_size: 20,
        show_tooltip: true,
        tooltip_position: 'top center'
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: ''
        },
        type: 'object'
      };
    }
  }, {
    key: "chooseOption",
    value: function chooseOption() {
      var output = [];
      return output;
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var _this$args = this.args,
        id = _this$args.id,
        class_name = _this$args.class_name,
        options = _this$args.options,
        icon_size = _this$args.icon_size,
        show_tooltip = _this$args.show_tooltip,
        tooltip_position = _this$args.tooltip_position,
        value = this.getValue(),
        outputOptions = [];
      var _loop = function _loop(key) {
        var option = options[key],
          icon;
        if (option.icon) {
          if (-1 !== option.icon.search('dashicons-')) {
            icon = option.icon.replace('dashicons-', '');
          } else if (-1 !== option.icon.search('fa-')) {
            icon = wp.element.createElement("i", {
              className: option.icon
            });
          } else {
            icon = option.icon;
          }
        }
        outputOptions.push(wp.element.createElement(ToolbarButton, {
          key: key,
          icon: icon,
          shortcut: option.shortcut,
          iconSize: icon_size,
          showTooltip: show_tooltip,
          tooltipPosition: tooltip_position,
          onClick: function onClick() {
            _this.setValue(key);
          },
          className: key === value ? 'is-active-option' : ''
        }, option.label));
      };
      for (var key in options) {
        _loop(key);
      }
      return wp.element.createElement("div", {
        className: class_name + '-options'
      }, outputOptions);
    }
  }]);
  return Choose;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/color-picker.js":
/*!******************************************!*\
  !*** ./modules/controls/color-picker.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorPicker: () => (/* binding */ ColorPicker)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var ColorPalette = wp.components.ColorPalette;
var select = wp.data.select;
var ColorPicker = /*#__PURE__*/function (_BaseControl) {
  _inherits(ColorPicker, _BaseControl);
  var _super = _createSuper(ColorPicker);
  function ColorPicker(args) {
    _classCallCheck(this, ColorPicker);
    return _super.call(this, args);
  }
  _createClass(ColorPicker, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      var settings = select('core/block-editor').getSettings();
      this.args = {
        class_name: 'jet-st-color-picker',
        label: '',
        separator: 'none',
        colors: settings.colors,
        disable_custom_colors: false,
        clearable: true,
        hide_label_from_vision: false,
        help: ''
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: ''
        },
        type: 'object'
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var _this$args = this.args,
        id = _this$args.id,
        colors = _this$args.colors,
        disable_custom_colors = _this$args.disable_custom_colors,
        clearable = _this$args.clearable;
      return wp.element.createElement(ColorPalette, {
        colors: colors,
        disableCustomColors: disable_custom_colors,
        clearable: clearable,
        value: this.getValue(),
        onChange: function onChange(newValue) {
          return _this.setValue(newValue);
        }
      });
    }
  }]);
  return ColorPicker;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/dimensions.js":
/*!****************************************!*\
  !*** ./modules/controls/dimensions.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dimensions: () => (/* binding */ Dimensions)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class Dimensions
 */


var BoxControl = wp.components.__experimentalBoxControl;
var Dimensions = /*#__PURE__*/function (_BaseControl) {
  _inherits(Dimensions, _BaseControl);
  var _super = _createSuper(Dimensions);
  function Dimensions(args) {
    _classCallCheck(this, Dimensions);
    return _super.call(this, args);
  }
  _createClass(Dimensions, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-dimensions-control',
        label: '',
        separator: 'none',
        hide_label_from_vision: false,
        input_props: {},
        help: '',
        units: [{
          value: 'px',
          label: 'px',
          default: 0
        }, {
          value: '%',
          label: '%',
          default: 0
        }, {
          value: 'em',
          label: 'em',
          default: 0
        }, {
          value: 'rem',
          label: 'rem',
          default: 0
        }]
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: {
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px"
          }
        },
        type: 'object'
      };
    }
  }, {
    key: "beforeSetValue",
    value: function beforeSetValue(value, id) {
      for (var key in value) {
        if (null === value[key]) {
          value[key] = '0px';
        }
      }
      return value;
    }
  }, {
    key: "parseUnits",
    value: function parseUnits(units) {
      if (0 !== units.length) {
        var outputUnits = [];
        var _iterator = _createForOfIteratorHelper(units),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var unit = _step.value;
            if ('object' === _typeof(unit) && unit.value) {
              continue;
            }
            outputUnits.push({
              value: unit,
              label: unit,
              default: 0
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return outputUnits;
      }
      return units;
    }
  }, {
    key: "sanitizeProps",
    value: function sanitizeProps(props) {
      if (props.min) {
        props.min = this.filterNum(props.min);
      }
      if (props.max) {
        props.max = this.filterNum(props.max);
      }
      return props;
    }
  }, {
    key: "filterNum",
    value: function filterNum(value) {
      if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value);
      } else {
        return 0;
      }
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var _this$args = this.args,
        units = _this$args.units,
        input_props = _this$args.input_props;
      var value = Object.assign({}, this.attributes.default.value, this.getValue());
      units = this.parseUnits(units);
      input_props = this.sanitizeProps(input_props);
      return wp.element.createElement(BoxControl, {
        values: value,
        units: units,
        label: "",
        inputProps: input_props,
        onChange: function onChange(newValue) {
          _this.setValue(newValue);
        }
      });
    }
  }]);
  return Dimensions;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/extra-atributes.js":
/*!*********************************************!*\
  !*** ./modules/controls/extra-atributes.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExtraAtributes: () => (/* binding */ ExtraAtributes)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Class InputControl
 */

var TextControl = wp.components.TextControl;
var __ = wp.i18n.__;
var ExtraAtributes = /*#__PURE__*/function () {
  function ExtraAtributes(args) {
    _classCallCheck(this, ExtraAtributes);
    this.setDefaultAttribut();
    this.args = args;
    this.attributes = Object.assign({}, this.attributes, this.args);
  }
  _createClass(ExtraAtributes, [{
    key: "init",
    value: function init(props) {
      if (props.isSelected && props.attributes && !props.attributes.blockID) {
        var id = "jet-sm-gb-".concat(props.clientId),
          className;
        if (props.attributes.className) {
          className = props.attributes.className;
        } else {
          className = "".concat(props.className || '', " jet-sm-gb-wrapper ").concat(id);
        }
        props.setAttributes({
          blockID: id,
          className: className
        });
      }
      this.blockProps = props;
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        blockID: {
          default: '',
          type: 'string'
        },
        curentBreakpoints: {
          default: 'desktop',
          type: 'string'
        }
      };
    }
  }, {
    key: "render",
    value: function render(props) {
      var output = [wp.element.createElement("h3", null, __('Debag info', 'jet-styles-manager')), wp.element.createElement("p", null, __('Displayed only in debug mode.', 'jet-styles-manager'))];
      for (var key in this.attributes) {
        if ('object' !== _typeof(this.attributes[key])) {
          continue;
        }
        var value = this.blockProps.attributes[key] || this.attributes[key].default;
        output.push(wp.element.createElement(TextControl, {
          label: key,
          value: value,
          disabled: true
        }));
      }
      return wp.element.createElement("div", {
        className: 'jet-sm-gb-block-info'
      }, output);
    }
  }]);
  return ExtraAtributes;
}();


/***/ }),

/***/ "./modules/controls/input.js":
/*!***********************************!*\
  !*** ./modules/controls/input.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var TextControl = wp.components.TextControl;
var Input = /*#__PURE__*/function (_BaseControl) {
  _inherits(Input, _BaseControl);
  var _super = _createSuper(Input);
  function Input(args) {
    _classCallCheck(this, Input);
    return _super.call(this, args);
  }
  _createClass(Input, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-input-control',
        separator: 'none',
        label: '',
        hide_label_from_vision: false,
        help: ''
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: ''
        },
        type: 'object'
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      return wp.element.createElement(TextControl, {
        value: this.getValue(),
        type: 'text',
        onChange: function onChange(newValue) {
          return _this.setValue(newValue);
        }
      });
    }
  }]);
  return Input;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/range.js":
/*!***********************************!*\
  !*** ./modules/controls/range.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Range: () => (/* binding */ Range)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var RangeControl = wp.components.RangeControl;
var Range = /*#__PURE__*/function (_BaseControl) {
  _inherits(Range, _BaseControl);
  var _super = _createSuper(Range);
  function Range(args) {
    _classCallCheck(this, Range);
    return _super.call(this, args);
  }
  _createClass(Range, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-range-control',
        label: '',
        separator: 'none',
        hide_label_from_vision: false,
        help: '',
        beforeIcon: '',
        afterIcon: '',
        icon: '',
        disabled: false,
        initial_position: 0,
        is_shift_step_enabled: true,
        allow_reset: false,
        marks: [],
        min: 0,
        max: 100,
        step: 1,
        rail_color: '',
        track_color: '',
        render_tooltip_content: '',
        show_tooltip: false,
        with_input_field: true,
        separator_type: 'none',
        // none | fullWidth | topFullWidth
        units: [{
          value: 'px',
          label: 'PX',
          intervals: {
            step: 1,
            min: 0,
            max: 200,
            initialPosition: 14
          }
        }]
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: {
            value: 0,
            unit: 'px'
          }
        },
        type: 'object'
      };
    }
  }, {
    key: "beforeGetValue",
    value: function beforeGetValue(value, id) {
      if ('number' === typeof value) {
        value = {
          value: value,
          unit: 'px'
        };
      }
      return value;
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var _this$args = this.args,
        beforeIcon = _this$args.beforeIcon,
        afterIcon = _this$args.afterIcon,
        icon = _this$args.icon,
        disabled = _this$args.disabled,
        initial_position = _this$args.initial_position,
        is_shift_step_enabled = _this$args.is_shift_step_enabled,
        allow_reset = _this$args.allow_reset,
        marks = _this$args.marks,
        min = _this$args.min,
        max = _this$args.max,
        step = _this$args.step,
        rail_color = _this$args.rail_color,
        track_color = _this$args.track_color,
        render_tooltip_content = _this$args.render_tooltip_content,
        show_tooltip = _this$args.show_tooltip,
        with_input_field = _this$args.with_input_field,
        separator_type = _this$args.separator_type,
        units = _this$args.units;
      var valueObject = Object.assign({}, this.attributes.default.value, this.getValue());
      return wp.element.createElement("div", {
        className: 'jet-st-range-wrapper'
      }, wp.element.createElement(RangeControl, _extends({
        value: valueObject.value,
        onChange: function onChange(newValue) {
          valueObject.value = newValue;
          _this.setValue(valueObject);
        },
        marks: marks,
        beforeIcon: beforeIcon,
        afterIcon: afterIcon,
        icon: icon,
        disabled: disabled,
        initialPosition: initial_position,
        isShiftStepEnabled: is_shift_step_enabled,
        allowReset: allow_reset,
        railColor: rail_color,
        trackColor: track_color,
        renderTooltipContent: render_tooltip_content,
        showTooltip: show_tooltip,
        withInputField: with_input_field,
        separatorType: separator_type
      }, this.getIntervals(units, valueObject.unit))), this.renderUnitsControl(units, 'unit', valueObject, valueObject));
    }
  }]);
  return Range;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/section.js":
/*!*************************************!*\
  !*** ./modules/controls/section.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StartSection: () => (/* binding */ StartSection)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * WordPress dependencies
 */


var PanelBody = wp.components.PanelBody;
var StartSection = /*#__PURE__*/function (_BaseControl) {
  _inherits(StartSection, _BaseControl);
  var _super = _createSuper(StartSection);
  function StartSection(args) {
    _classCallCheck(this, StartSection);
    return _super.call(this, args);
  }
  _createClass(StartSection, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-section',
        title: '',
        icon: '',
        initial_open: false,
        type: 'end-section',
        attributes: false
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this$args = this.args,
        id = _this$args.id,
        title = _this$args.title,
        icon = _this$args.icon,
        initial_open = _this$args.initial_open,
        class_name = _this$args.class_name,
        _child = _this$args._child;
      return wp.element.createElement(PanelBody, {
        title: title,
        className: class_name,
        icon: icon,
        initialOpen: initial_open,
        key: id
      }, _child);
    }
  }]);
  return StartSection;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/select.js":
/*!************************************!*\
  !*** ./modules/controls/select.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Select: () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var SelectControl = wp.components.SelectControl;
var __ = wp.i18n.__;
var Select = /*#__PURE__*/function (_BaseControl) {
  _inherits(Select, _BaseControl);
  var _super = _createSuper(Select);
  function Select() {
    _classCallCheck(this, Select);
    return _super.apply(this, arguments);
  }
  _createClass(Select, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-select-control',
        label: '',
        separator: 'none',
        hide_label_from_vision: false,
        help: '',
        multiple: false,
        placeholder: __('Select Option', 'jet-styles-manager'),
        options: []
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: ''
        },
        type: 'object'
      };
      this.placeholderOption = {
        value: '',
        label: this.args.placeholder,
        disabled: true
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var _this$args = this.args,
        multiple = _this$args.multiple,
        options = _this$args.options,
        placeholder = _this$args.placeholder,
        disablePlaceholder = _this$args.disablePlaceholder;
      if (placeholder && '' !== options[0].value) {
        options.unshift(this.placeholderOption);
      }
      return wp.element.createElement(SelectControl, {
        value: this.getValue(),
        onChange: function onChange(newValue) {
          return _this.setValue(newValue);
        },
        multiple: multiple,
        options: options
      });
    }
  }]);
  return Select;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/tabs.js":
/*!**********************************!*\
  !*** ./modules/controls/tabs.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StartTab: () => (/* binding */ StartTab),
/* harmony export */   StartTabs: () => (/* binding */ StartTabs)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * WordPress dependencies
 */


var TabPanel = wp.components.TabPanel;
var StartTabs = /*#__PURE__*/function (_BaseControl) {
  _inherits(StartTabs, _BaseControl);
  var _super = _createSuper(StartTabs);
  function StartTabs() {
    _classCallCheck(this, StartTabs);
    return _super.apply(this, arguments);
  }
  _createClass(StartTabs, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-tabs',
        active_class: 'jet-st-active-tab',
        orientation: 'horizontal',
        // vertical or horizontal
        initialTabName: '',
        type: 'start-tabs',
        attributes: false
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this$args = this.args,
        id = _this$args.id,
        class_name = _this$args.class_name,
        active_class = _this$args.active_class,
        orientation = _this$args.orientation,
        _child = _this$args._child;
      return wp.element.createElement(TabPanel, {
        className: class_name,
        activeClass: active_class,
        orientation: orientation,
        tabs: _child
      }, function (tab) {
        return wp.element.createElement("div", {
          key: tab.id,
          name: tab.name
        }, tab.content);
      });
    }
  }]);
  return StartTabs;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);
var StartTab = /*#__PURE__*/function (_BaseControl2) {
  _inherits(StartTab, _BaseControl2);
  var _super2 = _createSuper(StartTab);
  function StartTab(args) {
    _classCallCheck(this, StartTab);
    return _super2.call(this, args);
  }
  _createClass(StartTab, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        title: '',
        type: 'start-tab',
        attributes: false
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      return {
        id: this.args.id,
        name: this.args.id,
        title: this.args.title,
        content: this.args._child
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderControl();
    }
  }]);
  return StartTab;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/text.js":
/*!**********************************!*\
  !*** ./modules/controls/text.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Text: () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var TextControl = wp.components.__experimentalText;
var Text = /*#__PURE__*/function (_BaseControl) {
  _inherits(Text, _BaseControl);
  var _super = _createSuper(Text);
  function Text(args) {
    _classCallCheck(this, Text);
    return _super.call(this, args);
  }
  _createClass(Text, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-text',
        variant: 'title',
        as: 'h3',
        content: '',
        not_wrap: true,
        separator: 'both'
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this$args = this.args,
        variant = _this$args.variant,
        as = _this$args.as,
        content = _this$args.content;
      return wp.element.createElement(TextControl, {
        variant: variant,
        as: as
      }, content);
    }
  }]);
  return Text;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/toggle.js":
/*!************************************!*\
  !*** ./modules/controls/toggle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toggle: () => (/* binding */ Toggle)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var ToggleControl = wp.components.ToggleControl;
var Toggle = /*#__PURE__*/function (_BaseControl) {
  _inherits(Toggle, _BaseControl);
  var _super = _createSuper(Toggle);
  function Toggle(args) {
    _classCallCheck(this, Toggle);
    return _super.call(this, args);
  }
  _createClass(Toggle, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-toggle-control',
        label: '',
        separator: 'none',
        hide_label_from_vision: false,
        help: ''
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: false
        },
        type: 'object'
      };
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var value = this.getValue();
      return wp.element.createElement(ToggleControl, {
        checked: value,
        onChange: function onChange(newValue) {
          _this.setValue(newValue);
        }
      });
    }
  }]);
  return Toggle;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/controls/typography.js":
/*!****************************************!*\
  !*** ./modules/controls/typography.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Typography: () => (/* binding */ Typography)
/* harmony export */ });
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./modules/controls/base-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Class InputControl
 */


var _wp$components = wp.components,
  FontSizePicker = _wp$components.FontSizePicker,
  SelectControl = _wp$components.SelectControl,
  RangeControl = _wp$components.RangeControl,
  HorizontalRule = _wp$components.HorizontalRule,
  WpBaseControl = _wp$components.BaseControl;
var __ = wp.i18n.__;
var Typography = /*#__PURE__*/function (_BaseControl) {
  _inherits(Typography, _BaseControl);
  var _super = _createSuper(Typography);
  function Typography(args) {
    _classCallCheck(this, Typography);
    return _super.call(this, args);
  }
  _createClass(Typography, [{
    key: "setDefaultArgs",
    value: function setDefaultArgs() {
      this.args = {
        class_name: 'jet-st-typography-control',
        label: __('Typography', 'jet-styles-manager'),
        separator: 'none',
        hide_label_from_vision: false,
        help: '',
        disable_family: false,
        disable_size: false,
        disable_weight: false,
        disable_transform: false,
        disable_style: false,
        disable_decoration: false,
        disable_line_height: false,
        disable_letter_spacing: false,
        family: [{
          label: 'Default',
          value: 'inherit'
        }, {
          label: 'Arial',
          value: '"Arial", sans-serif'
        }, {
          label: 'Tahoma',
          value: '"Tahoma"'
        }, {
          label: 'Verdana',
          value: '"Verdana"'
        }, {
          label: 'Helvetica',
          value: '"Helvetica"'
        }, {
          label: 'Times New Roman',
          value: '"Times New Roman"'
        }, {
          label: 'Trebuchet MS',
          value: '"Trebuchet MS"'
        }, {
          label: 'Georgia',
          value: '"Georgia"'
        }],
        weight: [{
          label: '100',
          value: '100'
        }, {
          label: '200',
          value: '200'
        }, {
          label: '300',
          value: '300'
        }, {
          label: '400',
          value: '400'
        }, {
          label: '500',
          value: '500'
        }, {
          label: '600',
          value: '600'
        }, {
          label: '700',
          value: '700'
        }, {
          label: '800',
          value: '800'
        }, {
          label: '900',
          value: '900'
        }, {
          label: 'Default',
          value: ''
        }, {
          label: 'Normal',
          value: 'normal'
        }, {
          label: 'Bold',
          value: 'bold'
        }],
        transform: [{
          label: 'Default',
          value: 'inherit'
        }, {
          label: 'Uppercase',
          value: 'uppercase'
        }, {
          label: 'Lowercase',
          value: 'lowercase'
        }, {
          label: 'Capitalize',
          value: 'capitalize'
        }, {
          label: 'Normal',
          value: 'none'
        }],
        style: [{
          label: 'Default',
          value: 'inherit'
        }, {
          label: 'Normal',
          value: 'normal'
        }, {
          label: 'Italic',
          value: 'italic'
        }, {
          label: 'Oblique',
          value: 'oblique'
        }],
        decoration: [{
          label: 'Default',
          value: 'inherit'
        }, {
          label: 'Underline',
          value: 'underline'
        }, {
          label: 'Overline',
          value: 'overline'
        }, {
          label: 'Line Through',
          value: 'line-through'
        }, {
          label: 'None',
          value: 'none'
        }],
        s_units: [{
          label: 'PX',
          value: 'px',
          intervals: {
            step: 1,
            min: 1,
            max: 200,
            initialPosition: 14
          }
        }, {
          label: 'EM',
          value: 'em',
          intervals: {
            step: 0.1,
            min: 0.1,
            max: 10,
            initialPosition: 1
          }
        }, {
          label: 'REM',
          value: 'rem',
          intervals: {
            step: 0.1,
            min: 0.1,
            max: 10,
            initialPosition: 1
          }
        }, {
          label: 'VW',
          value: 'vw',
          intervals: {
            step: 0.1,
            min: 0.1,
            max: 10,
            initialPosition: 1
          }
        }],
        lh_units: [{
          label: 'None',
          value: '',
          intervals: {
            step: 0.1,
            min: 0.1,
            max: 10,
            initialPosition: 1
          }
        }, {
          label: 'PX',
          value: 'px',
          intervals: {
            step: 1,
            min: 1,
            max: 200,
            initialPosition: 14
          }
        }, {
          label: 'EM',
          value: 'em',
          intervals: {
            step: 0.1,
            min: 0.1,
            max: 10,
            initialPosition: 1
          }
        }],
        ls_units: [],
        default_intervals: {
          step: 0.1,
          min: -2,
          max: 20,
          initialPosition: 0
        }
      };
    }
  }, {
    key: "setDefaultAttribut",
    value: function setDefaultAttribut() {
      this.attributes = {
        default: {
          value: {
            family: 'inherit',
            size: 14,
            s_unit: 'px',
            weight: '400',
            transform: 'inherit',
            style: 'inherit',
            decoration: 'inherit',
            lineHeight: 1.2,
            lh_unit: '',
            letterSpacing: 0,
            ls_unit: 'px'
          }
        },
        type: 'object'
      };
    }
  }, {
    key: "parseFontFamily",
    value: function parseFontFamily(family) {
      var output = [{
        label: 'Default',
        value: 'inherit'
      }];
      for (var _i = 0, _Object$entries = Object.entries(family); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        output.push({
          label: value.family,
          value: key
        });
      }
      return output;
    }
  }, {
    key: "parseFontWeight",
    value: function parseFontWeight(weight) {
      var output = [{
        label: 'Normal',
        value: ''
      }];
      var _iterator = _createForOfIteratorHelper(weight),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          if ('regular' === value) {
            continue;
          }
          output.push({
            label: value,
            value: value
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return output;
    }
  }, {
    key: "renderControl",
    value: function renderControl() {
      var _this = this;
      var _this$args = this.args,
        family = _this$args.family,
        weight = _this$args.weight,
        transform = _this$args.transform,
        style = _this$args.style,
        decoration = _this$args.decoration,
        s_units = _this$args.s_units,
        lh_units = _this$args.lh_units,
        ls_units = _this$args.ls_units,
        disable_family = _this$args.disable_family,
        disable_size = _this$args.disable_size,
        disable_weight = _this$args.disable_weight,
        disable_transform = _this$args.disable_transform,
        disable_style = _this$args.disable_style,
        disable_decoration = _this$args.disable_decoration,
        disable_line_height = _this$args.disable_line_height,
        disable_letter_spacing = _this$args.disable_letter_spacing;
      var controlValue = Object.assign({}, this.attributes.default.value, this.getValue()),
        value = controlValue,
        curentFont = window.jetSmFonts && value.family ? window.jetSmFonts[value.family] : '';
      family = window.jetSmFonts ? this.parseFontFamily(window.jetSmFonts) : family;

      /* to be or not to be ????
      weight = curentFont ? this.parseFontWeight( curentFont.variants ) : weight ;
      value.weight = curentFont && curentFont.variants.includes( value.weight ) ? value.weight : 'normal' ;*/

      return wp.element.createElement("div", null, !disable_size && wp.element.createElement("div", {
        className: 'jet-st-typography-control-size'
      }, wp.element.createElement(RangeControl, _extends({
        beforeIcon: 'editor-textcolor',
        label: __('Size', 'jet-styles-manager'),
        value: value.size,
        onChange: function onChange(newValue) {
          controlValue.size = newValue;
          _this.setValue(controlValue);
        },
        initialPosition: "2"
      }, this.getIntervals(s_units, controlValue.s_unit))), this.renderUnitsControl(s_units, 's_unit', value, controlValue)), !disable_line_height && wp.element.createElement("div", {
        className: 'jet-st-typography-control-size'
      }, wp.element.createElement(RangeControl, _extends({
        beforeIcon: 'image-flip-vertical',
        label: __('Line Height', 'jet-styles-manager'),
        value: value.lineHeight,
        onChange: function onChange(newValue) {
          controlValue.lineHeight = newValue;
          _this.setValue(controlValue);
        }
      }, this.getIntervals(lh_units, controlValue.lh_unit))), this.renderUnitsControl(lh_units, 'lh_unit', value, controlValue)), !disable_letter_spacing && wp.element.createElement("div", {
        className: 'jet-st-typography-control-size'
      }, wp.element.createElement(RangeControl, _extends({
        beforeIcon: 'image-flip-horizontal',
        label: __('Letter Spacing', 'jet-styles-manager'),
        value: value.letterSpacing,
        onChange: function onChange(newValue) {
          controlValue.letterSpacing = newValue;
          _this.setValue(controlValue);
        }
      }, this.getIntervals(ls_units, controlValue.ls_unit))), this.renderUnitsControl(ls_units, 'ls_unit', value, controlValue)), !disable_family && wp.element.createElement("div", {
        className: 'jet-st-typography-control-select'
      }, wp.element.createElement(SelectControl, {
        value: value.family,
        onChange: function onChange(newValue) {
          controlValue.family = newValue;
          _this.setValue(controlValue);
        },
        options: family,
        label: __('Family', 'jet-styles-manager'),
        labelPosition: 'side'
      })), !disable_weight && wp.element.createElement("div", {
        className: 'jet-st-typography-control-select'
      }, wp.element.createElement(SelectControl, {
        value: value.weight,
        onChange: function onChange(newValue) {
          controlValue.weight = newValue;
          _this.setValue(controlValue);
        },
        options: weight,
        label: __('Weight', 'jet-styles-manager'),
        labelPosition: 'side'
      })), !disable_transform && wp.element.createElement("div", {
        className: 'jet-st-typography-control-select'
      }, wp.element.createElement(SelectControl, {
        value: value.transform,
        onChange: function onChange(newValue) {
          controlValue.transform = newValue;
          _this.setValue(controlValue);
        },
        options: transform,
        label: __('Transform', 'jet-styles-manager'),
        labelPosition: 'side'
      })), !disable_style && wp.element.createElement("div", {
        className: 'jet-st-typography-control-select'
      }, wp.element.createElement(SelectControl, {
        value: value.style,
        onChange: function onChange(newValue) {
          controlValue.style = newValue;
          _this.setValue(controlValue);
        },
        options: style,
        label: __('Style', 'jet-styles-manager'),
        labelPosition: 'side'
      })), !disable_decoration && wp.element.createElement("div", {
        className: 'jet-st-typography-control-select'
      }, wp.element.createElement(SelectControl, {
        value: value.decoration,
        onChange: function onChange(newValue) {
          controlValue.decoration = newValue;
          _this.setValue(controlValue);
        },
        options: decoration,
        label: __('Decoration', 'jet-styles-manager'),
        labelPosition: 'side'
      })));
    }
  }]);
  return Typography;
}(_base_control__WEBPACK_IMPORTED_MODULE_0__.BaseControl);


/***/ }),

/***/ "./modules/style-manager.js":
/*!**********************************!*\
  !*** ./modules/style-manager.js ***!
  \**********************************/
/***/ (() => {



function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function JetStyleManagerMeta() {
  var _ref;
  var _wp = wp,
    _wp$data = _wp.data,
    dispatch = _wp$data.dispatch,
    select = _wp$data.select;
  var styleSlug = '_jet_sm_style',
    readyStyleSlug = '_jet_sm_ready_style',
    controlsValues = '_jet_sm_controls_values',
    fontCollectionSlug = '_jet_sm_fonts_collection',
    fontLinks = '_jet_sm_fonts_links',
    fontsAPIlink = 'https://fonts.googleapis.com/css2?';
  var postMeta = select('core/editor').getEditedPostAttribute('meta') || (_ref = {}, _defineProperty(_ref, styleSlug, ''), _defineProperty(_ref, readyStyleSlug, ''), _defineProperty(_ref, controlsValues, ''), _ref),
    blockStyle = postMeta[styleSlug] ? JSON.parse(postMeta[styleSlug]) : {},
    fontsCollection = postMeta[fontCollectionSlug] ? JSON.parse(postMeta[fontCollectionSlug]) : {},
    blocksOption = {},
    updPostMeta = {},
    readyFontLinks = '';
  window.jetSmControlsValues = postMeta[controlsValues] ? JSON.parse(postMeta[controlsValues]) : {};
  if (Object.keys(blockStyle)[0]) {
    parsedFontsCollection(fontsCollection);
    renderStyle(blockStyle);
  }
  document.addEventListener('jet-sm-update-meta', debounce(setMeta, 50));
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments,
        later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        },
        callNow = args[0].detail.isInitSet || immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  ;
  function setMeta(event) {
    var _event$detail = event.detail,
      id = _event$detail.id,
      blockID = _event$detail.blockID,
      controlType = _event$detail.controlType;
    if (!blockStyle[blockID]) {
      blockStyle[blockID] = {};
    }
    if (!blocksOption[blockID]) {
      blocksOption[blockID] = {};
    }
    var value = event.detail.value.value;

    /*if( undefined === value ){
    	delete blocksOption[ blockID ][ id ];
    } else {*/
    blocksOption[blockID][id] = event.detail;
    //}
    clearMeta();
    if ('typography' === controlType) {
      collectFonts(event.detail);
    }
    collectStyle(blockID);
  }
  function clearMeta() {
    var blockIDs = getBlockList(select('core/block-editor').getBlocks());
    for (var blockStyleId in blockStyle) {
      if (-1 === blockIDs.indexOf(blockStyleId)) {
        delete blockStyle[blockStyleId];
        delete fontsCollection[blockStyleId];
        delete window.jetSmControlsValues[blockStyleId];
      }
    }
  }
  function getBlockList(blockList) {
    var blockIDs = [];
    for (var block in blockList) {
      var innerBlocks = blockList[block].innerBlocks,
        blockID = blockList[block].attributes.blockID;
      if (innerBlocks && innerBlocks[0]) {
        blockIDs.push.apply(blockIDs, _toConsumableArray(getBlockList(innerBlocks)));
      }
      if (!blockID) {
        continue;
      }
      blockIDs.push(blockID);
    }
    return blockIDs;
  }
  function collectFonts(_ref2) {
    var blockID = _ref2.blockID,
      id = _ref2.id,
      value = _ref2.value,
      breakpoints = _ref2.breakpoints;
    var _ref3 = !breakpoints || 'desktop' === breakpoints ? value.value : value[breakpoints],
      family = _ref3.family,
      weight = _ref3.weight,
      style = _ref3.style,
      fontFamily = family.replace(/,\s*[\S\s]*/gm, '');
    if (!window.jetSmFonts[family] || "google" !== window.jetSmFonts[family].type) {
      return;
    }
    if (!fontsCollection[blockID]) {
      fontsCollection[blockID] = {};
    }
    if (!fontsCollection[blockID][id]) {
      fontsCollection[blockID][id] = {};
    }
    fontsCollection[blockID][id][breakpoints] = {
      fontFamily: fontFamily,
      fontWeight: weight,
      fontStyle: style
    };
    parsedFontsCollection(fontsCollection);
  }
  function parsedFontsCollection() {
    var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!collection) {
      return false;
    }
    var parsedFontsCollection = {};
    for (var block in collection) {
      if (!collection.hasOwnProperty(block)) {
        continue;
      }
      var controls = collection[block];
      for (var control in controls) {
        if (!controls.hasOwnProperty(control)) {
          continue;
        }
        var breakpoints = controls[control];
        for (var font in breakpoints) {
          if (!breakpoints.hasOwnProperty(font)) {
            continue;
          }
          var _breakpoints$font = breakpoints[font],
            fontFamily = _breakpoints$font.fontFamily,
            fontWeight = _breakpoints$font.fontWeight,
            fontStyle = _breakpoints$font.fontStyle;
          if (!parsedFontsCollection[fontFamily]) {
            parsedFontsCollection[fontFamily] = {
              family: fontFamily,
              weight: [],
              style: []
            };
          }
          if (!parsedFontsCollection[fontFamily].weight.includes(fontWeight)) {
            parsedFontsCollection[fontFamily].weight.push(fontWeight);
          }
          if (!parsedFontsCollection[fontFamily].style.includes(fontStyle)) {
            parsedFontsCollection[fontFamily].style.push(fontStyle);
          }
        }
      }
    }
    createFontLinks(parsedFontsCollection);
  }
  function createFontLinks() {
    var fonts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!fonts) {
      return false;
    }
    readyFontLinks = '<link rel="preconnect" href="https://fonts.gstatic.com">';
    for (var font in fonts) {
      if (!fonts.hasOwnProperty(font)) {
        continue;
      }
      var _fonts$font = fonts[font],
        family = _fonts$font.family,
        weight = _fonts$font.weight,
        style = _fonts$font.style,
        weightDelimiter = weight.length > 1 ? ':' : '&';
      family = family.replace(/\s+/gm, '+');
      weight = weight.sort().join(';');
      style = style.join(';');
      readyFontLinks += "<link href=\"".concat(fontsAPIlink, "family=").concat(family).concat(weightDelimiter, "wght@").concat(weight, "&display=swap\" rel=\"stylesheet\">");
    }
  }
  function collectStyle(blockID) {
    for (var control in blocksOption[blockID]) {
      var controlObject = blocksOption[blockID][control],
        selectors = controlObject.css_selector;
      for (var style in selectors) {
        var styleOption = selectors[style],
          styleSelector = replaceSelectorMacros(controlObject, style),
          readyStyleOption = replaceOptionMacros(controlObject, styleOption);
        readyStyleOption = replaceValueMacros(controlObject, readyStyleOption, styleSelector);
        if (!blockStyle[blockID][styleSelector]) {
          blockStyle[blockID][styleSelector] = {};
        }
        if (!readyStyleOption) {
          delete blockStyle[blockID][styleSelector][control];
        } else {
          blockStyle[blockID][styleSelector][control] = readyStyleOption;
        }
      }
    }
    renderStyle(blockStyle);
  }
  function replaceSelectorMacros(controlObject, cssSelector) {
    var blockID = controlObject.blockID;
    cssSelector = cssSelector.replace(/{{WRAPPER}}/gmi, '.' + blockID).replace(/{{ID}}/gmi, blockID);
    return cssSelector;
  }
  function replaceOptionMacros(controlObject, cssOptions) {
    for (var key in controlObject) {
      if ('value' !== key) {
        var macrosReg = new RegExp('{{' + key.toUpperCase() + '}}', 'gmi');
        if (-1 !== cssOptions.search(macrosReg)) {
          cssOptions = cssOptions.replace(macrosReg, controlObject[key]);
        }
      }
    }
    cssOptions += ';';
    cssOptions = cssOptions.replace(';;', ';').replace(/\s{2}/gm, '');
    return cssOptions;
  }
  function replaceValueMacros(controlObject, cssOptions, cssSelector) {
    var value = controlObject.value,
      breakpoints = controlObject.breakpoints;
    if (undefined === value) {
      return false;
    }
    var outputCssOptions = {};
    for (var item in value) {
      var breakpointValue = value[item];
      if (undefined === breakpointValue) {
        return false;
      }
      if (breakpoints && breakpoints[item]) {
        var _breakpoints$item = breakpoints[item],
          min = _breakpoints$item.min,
          max = _breakpoints$item.max,
          optionMedia = -1 !== max ? "@media only screen and (max-width: ".concat(max, "px)") : "@media only screen and (min-width: ".concat(min, "px)");
        outputCssOptions[item] = {
          max: -1 !== max ? max : min,
          mediaQuery: optionMedia,
          option: parseValue(controlObject, cssOptions, breakpointValue)
        };
      } else {
        outputCssOptions[item] = parseValue(controlObject, cssOptions, breakpointValue);
      }
    }
    return outputCssOptions;
  }
  function parseValue(controlObject, cssOptions, value) {
    switch (_typeof(value)) {
      case 'object':
        for (var key in value) {
          var macrosReg = new RegExp('{{' + key.toUpperCase() + '}}', 'gmi'),
            deepValue = value[key];
          if ('object' === _typeof(deepValue)) {
            deepValue = Object.values(deepValue).join(' ');
          }
          cssOptions = cssOptions.replace(macrosReg, deepValue);
        }
        break;
      default:
        value = controlObject.return_value ? controlObject.return_value[value] : value;
        cssOptions = cssOptions.replace(/{{VALUE}}/gmi, value);
        break;
    }
    cssOptions += ';';
    cssOptions = cssOptions.replace(';;', ';').replace(/\s{2}/gm, ' ');
    return cssOptions;
  }
  function renderStyle(blocks) {
    var _updPostMeta;
    var outputCSS = '';
    for (var blockID in blocks) {
      if (!blocks.hasOwnProperty(blockID)) {
        continue;
      }
      var block = blocks[blockID];
      for (var selector in block) {
        if (!block.hasOwnProperty(selector)) {
          continue;
        }
        var control = block[selector],
          desktopCss = '',
          breakpointsCss = '';
        for (var options in control) {
          if (!control.hasOwnProperty(options)) {
            continue;
          }
          var values = control[options],
            valuesArray = void 0;
          if (values.value) {
            desktopCss += values.value;
          }
          if (!Object.keys(values)[0]) {
            continue;
          }
          valuesArray = Object.values(values).sort(function (a, b) {
            if (a.max > b.max) {
              return -1;
            } else {
              return 1;
            }
          });
          var _iterator = _createForOfIteratorHelper(valuesArray),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var value = _step.value;
              if ('object' !== _typeof(value)) {
                continue;
              }
              var mediaQuery = value.mediaQuery,
                option = value.option;
              breakpointsCss += "".concat(mediaQuery, "{ ").concat(selector, " { ").concat(option, " } }");
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        outputCSS += "".concat(selector, "{").concat(desktopCss, "} ").concat(breakpointsCss);
      }
    }
    updPostMeta = (_updPostMeta = {}, _defineProperty(_updPostMeta, readyStyleSlug, outputCSS), _defineProperty(_updPostMeta, styleSlug, JSON.stringify(blocks)), _defineProperty(_updPostMeta, controlsValues, JSON.stringify(window.jetSmControlsValues)), _defineProperty(_updPostMeta, fontCollectionSlug, JSON.stringify(fontsCollection)), _defineProperty(_updPostMeta, fontLinks, JSON.stringify(readyFontLinks)), _updPostMeta);
    ReactDOM.render(wp.element.createElement("style", null, outputCSS), document.getElementById('jet-sm-gb-style'));
    if (readyFontLinks) {
      ReactDOM.render(wp.element.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: readyFontLinks
        }
      }), document.getElementById('jet-sm-gb-fonts'));
    }

    // const oldMeta = select('core/editor').getEditedPostAttribute('meta');
    // dispatch('core/editor').editPost( { meta: Object.assign( {}, oldMeta, updPostMeta ) } );
  }
}

window.onload = function (e) {
  setTimeout(JetStyleManagerMeta, 500);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_style_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/style-manager */ "./modules/style-manager.js");
/* harmony import */ var _modules_style_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_style_manager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_block_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/block-manager */ "./modules/block-manager.js");


})();

/******/ })()
;
//# sourceMappingURL=jet-sm-gb.js.map