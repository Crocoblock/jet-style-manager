/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseControl; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class BaseControl
 */
var _wp$components = wp.components,
    Button = _wp$components.Button,
    ButtonGroup = _wp$components.ButtonGroup,
    Dropdown = _wp$components.Dropdown,
    WpBaseControl = _wp$components.BaseControl;

var BaseControl = function () {
	function BaseControl(args) {
		_classCallCheck(this, BaseControl);

		this.setDefaultArgs();
		this.setDefaultAttribut();
		this.setVars(args);
	}

	_createClass(BaseControl, [{
		key: 'setDefaultArgs',
		value: function setDefaultArgs() {
			var _args;

			this.args = (_args = {
				id: '',
				type: '',
				separator: 'none',
				condition: '',
				css_selector: '',
				not_wrap: false,
				default_intervals: { step: 0.1, min: -2, max: 20, initialPosition: 0 },
				conditions: [],
				class_name: '',
				label: ''
			}, _defineProperty(_args, 'separator', 'none'), _defineProperty(_args, 'hide_label_from_vision', false), _defineProperty(_args, 'help', ''), _args);
		}
	}, {
		key: 'defaultEventDetail',
		value: function defaultEventDetail() {
			return ['unit', 'min', 'max', 'step', 'return_value'];
		}
	}, {
		key: 'setDefaultAttribut',
		value: function setDefaultAttribut() {
			this.attributes = {};
		}
	}, {
		key: 'setVars',
		value: function setVars(args) {
			this.args = Object.assign({}, this.args, args);

			var innerAttributes = args['attributes'] ? args['attributes'] : {};
			this.attributes = Object.assign({}, this.attributes, innerAttributes);
		}
	}, {
		key: 'init',
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
		key: 'beforeGetValue',
		value: function beforeGetValue(value, id) {
			return value;
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var blockID = this.blockProps.attributes.blockID,
			    id = this.args.id,
			    optionName = !this.args.breakpoints || !this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints,
			    valueObject = void 0,
			    value = void 0;

			valueObject = !this.args.css_selector ? this.getAtributValue(id, blockID) : this.getMetaValue(id, blockID);

			if (undefined === valueObject || undefined === valueObject.value) {
				valueObject = this.attributes.default;
			}

			if (valueObject) {
				value = valueObject[optionName];
			}

			return this.beforeGetValue(value, id);
		}
	}, {
		key: 'getMetaValue',
		value: function getMetaValue(id, blockID) {
			if (!window.jetSmControlsValues || !window.jetSmControlsValues[blockID] || !window.jetSmControlsValues[blockID][id]) {
				return undefined;
			}
			return window.jetSmControlsValues[blockID][id];
		}
	}, {
		key: 'getAtributValue',
		value: function getAtributValue(id, blockID) {
			return this.blockProps.attributes[id];
		}
	}, {
		key: 'beforeSetValue',
		value: function beforeSetValue(value, id) {
			switch (this.attributes.type.toLowerCase()) {
				case 'string':
					value = String(value);
					break;
				case 'number':
					value = Number(value);
					break;
				case 'int' || 'integer':
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
		key: 'setValue',
		value: function setValue(value) {
			var id = this.args.id,
			    blockID = this.blockProps.attributes.blockID,
			    valueObject = this.getAtributValue(id, blockID) || this.attributes.default,
			    updValueObject = void 0,
			    optionName = !this.args.breakpoints || !this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints;

			if ('object' === (typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
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
		key: 'setMetaValue',
		value: function setMetaValue(value, blockID, args) {
			var isInitSet = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

			var id = args.id,
			    detail = {
				id: id,
				value: value,
				blockID: blockID,
				css_selector: args.css_selector || null,
				breakpoints: args.breakpoints || null,
				isInitSet: isInitSet
			};

			if (!window.jetSmControlsValues[blockID]) {
				window.jetSmControlsValues[blockID] = {};
			}

			window.jetSmControlsValues[blockID][id] = value;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.defaultEventDetail()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var key = _step.value;

					if (args[key]) {
						detail[key] = args[key];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			var event = new CustomEvent('jet-sm-update-meta', {
				detail: detail
			});

			document.dispatchEvent(event);
		}
	}, {
		key: 'setAtributValue',
		value: function setAtributValue(value, id, blockID) {
			this.blockProps.setAttributes(_defineProperty({}, id, value));
		}
	}, {
		key: 'renderUnitsControl',
		value: function renderUnitsControl(units, id, valueCuretn, valuesStack) {
			var _this = this;

			var untisOptions = [];

			var _loop = function _loop(key) {
				var args = units[key],
				    disabled = units.length === 1 ? true : false,
				    buttonType = args.value === valueCuretn[id] && !disabled ? true : false,
				    lable = args.label ? args.label : args.value;

				untisOptions.push(wp.element.createElement(
					Button,
					{
						isPrimary: buttonType,
						isSecondary: !buttonType,
						disabled: disabled,
						isSmall: true,
						key: key,
						onClick: function onClick(e) {
							valuesStack[id] = args.value;
							_this.setValue(valuesStack);
						}
					},
					lable.toUpperCase()
				));
			};

			for (var key in units) {
				_loop(key);
			}

			return wp.element.createElement(
				ButtonGroup,
				{ className: 'jet-st-control-units' },
				untisOptions
			);
		}
	}, {
		key: 'renderBreakpointsControl',
		value: function renderBreakpointsControl() {
			var _this2 = this;

			if (!this.args.breakpoints) {
				return null;
			}

			var breakpoints = this.args.breakpoints;

			return wp.element.createElement(Dropdown, {
				className: 'jet-st-breakpoints-control',
				contentClassName: 'jet-st-breakpoint-dropdown',
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
								_this2.blockProps.setAttributes({ curentBreakpoints: key });
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
		key: 'getIntervals',
		value: function getIntervals(units, curentUnit) {
			if (!units[0]) {
				return this.args.default_intervals;
			}

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = units[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'conditionRules',
		value: function conditionRules(condition) {
			var conditionState = true,
			    blockID = this.blockProps.attributes.blockID;

			if ('object' !== (typeof condition === 'undefined' ? 'undefined' : _typeof(condition)) || !Object.keys(condition)[0]) {
				return conditionState;
			}

			for (var option in condition) {
				var value = this.getMetaValue(option, blockID) || this.getAtributValue(option, blockID),
				    conditionValue = condition[option],
				    optionName = void 0;

				if ('object' === (typeof value === 'undefined' ? 'undefined' : _typeof(value)) && undefined !== value.value) {
					optionName = !this.args.breakpoints || !this.curent_breakpoints || 'desktop' === this.curent_breakpoints ? 'value' : this.curent_breakpoints;
					value = value[optionName];
				}

				switch (typeof conditionValue === 'undefined' ? 'undefined' : _typeof(conditionValue)) {
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
		key: 'renderControl',
		value: function renderControl() {
			return null;
		}
	}, {
		key: 'render',
		value: function render() {
			var HorizontalRule = wp.components.HorizontalRule;
			var _args2 = this.args,
			    id = _args2.id,
			    separator = _args2.separator,
			    label = _args2.label,
			    hide_label_from_vision = _args2.hide_label_from_vision,
			    help = _args2.help,
			    class_name = _args2.class_name,
			    condition = _args2.condition;


			if (!this.conditionRules(condition)) {
				return null;
			}

			return wp.element.createElement(
				'div',
				{ key: id },
				('before' === separator || 'both' === separator) && wp.element.createElement(HorizontalRule, null),
				wp.element.createElement(
					WpBaseControl,
					{
						hideLabelFromVision: hide_label_from_vision,
						help: help,
						className: class_name + ' jet-sm-gb-control-wrapper'
					},
					wp.element.createElement(
						'div',
						{ className: 'jet-sm-gb-control-header' },
						label && wp.element.createElement(
							WpBaseControl.VisualLabel,
							null,
							label
						),
						this.renderBreakpointsControl()
					),
					wp.element.createElement(
						'div',
						{ className: 'jet-sm-gb-control-inner' },
						this.renderControl()
					)
				),
				('after' === separator || 'both' === separator) && wp.element.createElement(HorizontalRule, null)
			);
		}
	}]);

	return BaseControl;
}();



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_block_manager__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_style_manager__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_style_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modules_style_manager__);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controls_section__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controls_tabs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controls_input__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controls_toggle__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controls_color_picker__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controls_range__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controls_choose__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controls_dimensions__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controls_border__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__controls_typography__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__controls_select__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__controls_text__ = __webpack_require__(14);


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }














var addFilter = wp.hooks.addFilter;

var JetBlockManager = function () {
	function JetBlockManager() {
		_classCallCheck(this, JetBlockManager);

		var self = this;

		self.setControlsInstance();
		self.setBlockID();
		self.registerBlockStyle();
		self.registerBlocks();
	}

	_createClass(JetBlockManager, [{
		key: "setControlsInstance",
		value: function setControlsInstance() {
			window.jetSmControlCallback = {
				StartSection: __WEBPACK_IMPORTED_MODULE_0__controls_section__["a" /* StartSection */],
				StartTabs: __WEBPACK_IMPORTED_MODULE_1__controls_tabs__["b" /* StartTabs */],
				StartTab: __WEBPACK_IMPORTED_MODULE_1__controls_tabs__["a" /* StartTab */],
				Input: __WEBPACK_IMPORTED_MODULE_2__controls_input__["a" /* Input */],
				ColorPicker: __WEBPACK_IMPORTED_MODULE_4__controls_color_picker__["a" /* ColorPicker */],
				Toggle: __WEBPACK_IMPORTED_MODULE_3__controls_toggle__["a" /* Toggle */],
				Range: __WEBPACK_IMPORTED_MODULE_5__controls_range__["a" /* Range */],
				Choose: __WEBPACK_IMPORTED_MODULE_6__controls_choose__["a" /* Choose */],
				Dimensions: __WEBPACK_IMPORTED_MODULE_7__controls_dimensions__["a" /* Dimensions */],
				Border: __WEBPACK_IMPORTED_MODULE_8__controls_border__["a" /* Border */],
				Typography: __WEBPACK_IMPORTED_MODULE_9__controls_typography__["a" /* Typography */],
				Select: __WEBPACK_IMPORTED_MODULE_10__controls_select__["a" /* Select */],
				Text: __WEBPACK_IMPORTED_MODULE_11__controls_text__["a" /* Text */]
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
				    controlStack = void 0;

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

					return [props.isSelected && controlStack && wp.element.createElement(
						InspectorControls,
						{ key: 'inspector' },
						controlStack
					), wp.element.createElement(
						"div",
						{ key: props.clientId },
						blockArgs['save'](props)
					)];
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
						return wp.element.createElement(BlockEdit, props);
					}

					var controlStack = self.renderControls(window.jetSmBlockStyleControl[props.name], props);

					return [wp.element.createElement(BlockEdit, _extends({}, props, { key: props.clientId })), props.isSelected && controlStack && wp.element.createElement(
						Fragment,
						null,
						wp.element.createElement(
							PluginSidebarMoreMenuItem,
							{ target: 'jet-sm-style-sidebar', key: 'style-sidebar-link' },
							__('Block Style', 'jet-styles-manager')
						),
						wp.element.createElement(
							PluginSidebar,
							{ className: 'jet-sm-style-sidebar', name: 'jet-sm-style-sidebar', icon: 'admin-customizer', title: __('Block Style', 'jet-styles-manager'), key: 'style-sidebar' },
							controlStack
						)
					)];
				};
			});
		}

		//Add wrapper to blocks.

	}, {
		key: "setBlockID",
		value: function setBlockID() {
			var allBlocks = this.getAllBlockSteck();

			if (!allBlocks) {
				return;
			}

			addFilter('editor.BlockEdit', 'jet-styles-manager', function (BlockEdit) {
				return function (props) {
					//Set block ID
					if (-1 !== allBlocks.indexOf(props.name) && props.attributes && !props.attributes.blockID && props.isSelected) {
						var id = 'jet-sm-gb-' + props.clientId,
						    className = (props.className || '') + " jet-sm-gb-wrapper " + id;

						props.setAttributes({ blockID: id, className: className });
					}

					return wp.element.createElement(BlockEdit, props);
				};
			});

			addFilter('editor.BlockListBlock', 'jet-styles-manager', function (BlockListBlock) {
				return function (props) {
					if (-1 === allBlocks.indexOf(props.name)) {
						return wp.element.createElement(BlockListBlock, props);
					}

					var id = props.attributes.blockID,
					    className = (props.className || '') + " jet-sm-gb-wrapper " + id;

					return wp.element.createElement(BlockListBlock, _extends({}, props, { id: id, className: className }));
				};
			});
		}

		///function return class instance

	}, {
		key: "getControlsInstant",
		value: function getControlsInstant(controlsStack) {
			if (!controlsStack) {
				return null;
			};

			var controls = [],
			    args = void 0,
			    className = void 0,
			    newControl = void 0;

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

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = controlsStack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var control = _step.value;

					if (!control.attributes && !control.args.attributes) {
						continue;
					}

					atributes[control.args.id] = control.args.css_selector ? Object.assign({ source: 'children' }, control.attributes) : control.attributes;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (!atributes.blockID) {
				atributes = Object.assign({}, atributes, {
					blockID: {
						type: 'string',
						default: ''
					},
					curentBreakpoints: {
						type: 'string',
						default: 'desktop'
					}
				});
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

			allBlocks = [].concat(_toConsumableArray(allBlocks));

			if (0 === allBlocks.length) {
				return false;
			}

			return allBlocks;
		}
	}]);

	return JetBlockManager;
}();

new JetBlockManager();
/*window.onload = function(e){
	setTimeout( () => { new JetBlockManager() }, 700 );
};*/

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartSection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * WordPress dependencies
 */



var PanelBody = wp.components.PanelBody;

var StartSection = function (_BaseControl) {
	_inherits(StartSection, _BaseControl);

	function StartSection(args) {
		_classCallCheck(this, StartSection);

		return _possibleConstructorReturn(this, (StartSection.__proto__ || Object.getPrototypeOf(StartSection)).call(this, args));
	}

	_createClass(StartSection, [{
		key: 'setDefaultArgs',
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
		key: 'renderControl',
		value: function renderControl() {
			var _args = this.args,
			    id = _args.id,
			    title = _args.title,
			    icon = _args.icon,
			    initial_open = _args.initial_open,
			    class_name = _args.class_name,
			    _child = _args._child;


			return wp.element.createElement(
				PanelBody,
				{ title: title, className: class_name, icon: icon, initialOpen: initial_open, key: id },
				_child
			);
		}
	}]);

	return StartSection;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StartTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartTab; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * WordPress dependencies
 */



var TabPanel = wp.components.TabPanel;

var StartTabs = function (_BaseControl) {
	_inherits(StartTabs, _BaseControl);

	function StartTabs(args) {
		var _ret;

		_classCallCheck(this, StartTabs);

		var _this = _possibleConstructorReturn(this, (StartTabs.__proto__ || Object.getPrototypeOf(StartTabs)).call(this, args));

		return _ret = args.id, _possibleConstructorReturn(_this, _ret);
	}

	_createClass(StartTabs, [{
		key: 'setDefaultArgs',
		value: function setDefaultArgs() {
			this.args = {
				class_name: 'jet-st-tabs',
				active_class: 'jet-st-active-tab',
				orientation: 'horizontal', // vertical or horizontal
				initialTabName: '',
				type: 'start-tabs',
				attributes: false
			};
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _args = this.args,
			    id = _args.id,
			    class_name = _args.class_name,
			    active_class = _args.active_class,
			    orientation = _args.orientation,
			    _child = _args._child;


			return wp.element.createElement(
				TabPanel,
				{
					className: class_name,
					activeClass: active_class,
					orientation: orientation,
					tabs: _child },
				function (tab) {
					return wp.element.createElement(
						'div',
						{ key: tab.id, name: tab.name },
						tab.content
					);
				}
			);
		}
	}]);

	return StartTabs;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);

var StartTab = function (_BaseControl2) {
	_inherits(StartTab, _BaseControl2);

	function StartTab(args) {
		_classCallCheck(this, StartTab);

		return _possibleConstructorReturn(this, (StartTab.__proto__ || Object.getPrototypeOf(StartTab)).call(this, args));
	}

	_createClass(StartTab, [{
		key: 'setDefaultArgs',
		value: function setDefaultArgs() {
			this.args = {
				title: '',
				type: 'start-tab',
				attributes: false
			};
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			return {
				id: this.args.id,
				name: this.args.id,
				title: this.args.title,
				content: this.args._child
			};
		}
	}, {
		key: 'render',
		value: function render() {
			return this.renderControl();
		}
	}]);

	return StartTab;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Input; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var TextControl = wp.components.TextControl;

var Input = function (_BaseControl) {
	_inherits(Input, _BaseControl);

	function Input(args) {
		_classCallCheck(this, Input);

		return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, args));
	}

	_createClass(Input, [{
		key: 'setDefaultArgs',
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
		key: 'setDefaultAttribut',
		value: function setDefaultAttribut() {
			this.attributes = {
				default: { value: '' },
				type: 'object'
			};
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			return wp.element.createElement(TextControl, {
				value: this.getValue(),
				type: 'text',
				onChange: function onChange(newValue) {
					return _this2.setValue(newValue);
				}
			});
		}
	}]);

	return Input;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toggle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var ToggleControl = wp.components.ToggleControl;

var Toggle = function (_BaseControl) {
	_inherits(Toggle, _BaseControl);

	function Toggle(args) {
		_classCallCheck(this, Toggle);

		return _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, args));
	}

	_createClass(Toggle, [{
		key: 'setDefaultArgs',
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
		key: 'setDefaultAttribut',
		value: function setDefaultAttribut() {
			this.attributes = {
				default: { value: false },
				type: 'object'
			};
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var value = this.getValue();

			return wp.element.createElement(ToggleControl, {
				checked: value,
				onChange: function onChange(newValue) {
					_this2.setValue(newValue);
				}
			});
		}
	}]);

	return Toggle;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorPicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var ColorPalette = wp.components.ColorPalette;
var select = wp.data.select;

var ColorPicker = function (_BaseControl) {
	_inherits(ColorPicker, _BaseControl);

	function ColorPicker(args) {
		_classCallCheck(this, ColorPicker);

		return _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, args));
	}

	_createClass(ColorPicker, [{
		key: 'setDefaultArgs',
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
		key: 'setDefaultAttribut',
		value: function setDefaultAttribut() {
			this.attributes = {
				default: { value: '' },
				type: 'object'
			};
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var _args = this.args,
			    id = _args.id,
			    colors = _args.colors,
			    disable_custom_colors = _args.disable_custom_colors,
			    clearable = _args.clearable;


			return wp.element.createElement(ColorPalette, {
				colors: colors,
				disableCustomColors: disable_custom_colors,
				clearable: clearable,
				value: this.getValue(),
				onChange: function onChange(newValue) {
					return _this2.setValue(newValue);
				}
			});
		}
	}]);

	return ColorPicker;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Range; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var RangeControl = wp.components.RangeControl;

var Range = function (_BaseControl) {
	_inherits(Range, _BaseControl);

	function Range(args) {
		_classCallCheck(this, Range);

		return _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, args));
	}

	_createClass(Range, [{
		key: 'setDefaultArgs',
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
				separator_type: 'none', // none | fullWidth | topFullWidth
				type: 'number',
				units: [{ value: 'px', label: 'PX', intervals: { step: 1, min: 0, max: 200, initialPosition: 14 } }]
			};
		}
	}, {
		key: 'setDefaultAttribut',
		value: function setDefaultAttribut() {
			this.attributes = {
				default: { value: {
						value: 0,
						unit: 'px'
					} },
				type: 'object'
			};
		}
	}, {
		key: 'beforeGetValue',
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
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var _args = this.args,
			    beforeIcon = _args.beforeIcon,
			    afterIcon = _args.afterIcon,
			    icon = _args.icon,
			    disabled = _args.disabled,
			    initial_position = _args.initial_position,
			    is_shift_step_enabled = _args.is_shift_step_enabled,
			    allow_reset = _args.allow_reset,
			    marks = _args.marks,
			    min = _args.min,
			    max = _args.max,
			    step = _args.step,
			    rail_color = _args.rail_color,
			    track_color = _args.track_color,
			    render_tooltip_content = _args.render_tooltip_content,
			    show_tooltip = _args.show_tooltip,
			    with_input_field = _args.with_input_field,
			    separator_type = _args.separator_type,
			    units = _args.units;


			var valueObject = Object.assign({}, this.attributes.default.value, this.getValue());

			return wp.element.createElement(
				'div',
				{ className: 'jet-st-range-wrapper' },
				wp.element.createElement(RangeControl, _extends({
					value: valueObject.value,
					onChange: function onChange(newValue) {
						valueObject.value = newValue;
						_this2.setValue(valueObject);
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
				}, this.getIntervals(units, valueObject.unit))),
				this.renderUnitsControl(units, 'unit', valueObject, valueObject)
			);
		}
	}]);

	return Range;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Choose; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var ToolbarButton = wp.components.ToolbarButton;

var Choose = function (_BaseControl) {
	_inherits(Choose, _BaseControl);

	function Choose(args) {
		_classCallCheck(this, Choose);

		return _possibleConstructorReturn(this, (Choose.__proto__ || Object.getPrototypeOf(Choose)).call(this, args));
	}

	_createClass(Choose, [{
		key: 'setDefaultArgs',
		value: function setDefaultArgs() {
			this.args = {
				class_name: 'jet-st-choose-control',
				label: '',
				separator: 'none',
				hide_label_from_vision: false,
				help: '',
				options: {
					alignleft: { icon: 'dashicons-editor-alignleft', label: 'alignleft', shortcut: 'alignleft' },
					aligncenter: { icon: 'dashicons-editor-aligncenter', label: 'aligncenter', shortcut: 'aligncenter' },
					alignright: { icon: 'dashicons-editor-alignright', label: 'alignright', shortcut: 'alignright' },
					justify: { icon: 'dashicons-editor-justify', label: 'justify', shortcut: 'justify' }
				},
				icon_size: 20,
				show_tooltip: true,
				tooltip_position: 'top center'
			};
		}
	}, {
		key: 'setDefaultAttribut',
		value: function setDefaultAttribut() {
			this.attributes = {
				default: { value: '' },
				type: 'object'
			};
		}
	}, {
		key: 'chooseOption',
		value: function chooseOption() {
			var output = [];

			return output;
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var _args = this.args,
			    id = _args.id,
			    class_name = _args.class_name,
			    options = _args.options,
			    icon_size = _args.icon_size,
			    show_tooltip = _args.show_tooltip,
			    tooltip_position = _args.tooltip_position,
			    value = this.getValue(),
			    outputOptions = [];

			var _loop = function _loop(key) {
				var option = options[key],
				    icon = void 0;

				if (-1 !== option.icon.search('dashicons-')) {
					icon = option.icon.replace('dashicons-', '');
				} else if (-1 !== option.icon.search('fa-')) {
					icon = wp.element.createElement('i', { className: option.icon });
				} else {
					icon = option.icon;
				}

				outputOptions.push(wp.element.createElement(ToolbarButton, {
					key: key,
					icon: icon,
					label: option.label,
					shortcut: option.shortcut,
					iconSize: icon_size,
					showTooltip: show_tooltip,
					tooltipPosition: tooltip_position,
					onClick: function onClick() {
						_this2.setValue(key);
					},
					className: key === value ? 'is-active-option' : ''
				}));
			};

			for (var key in options) {
				_loop(key);
			}

			return wp.element.createElement(
				'div',
				{ className: class_name + '-options' },
				outputOptions
			);
		}
	}]);

	return Choose;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dimensions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class Dimensions
 */



var BoxControl = wp.components.__experimentalBoxControl;

var Dimensions = function (_BaseControl) {
	_inherits(Dimensions, _BaseControl);

	function Dimensions(args) {
		_classCallCheck(this, Dimensions);

		return _possibleConstructorReturn(this, (Dimensions.__proto__ || Object.getPrototypeOf(Dimensions)).call(this, args));
	}

	_createClass(Dimensions, [{
		key: 'setDefaultArgs',
		value: function setDefaultArgs() {
			this.args = {
				class_name: 'jet-st-dimensions-control',
				label: '',
				separator: 'none',
				hide_label_from_vision: false,
				help: '',
				units: [{ value: 'px', label: 'px', default: 0 }, { value: '%', label: '%', default: 0 }, { value: 'em', label: 'em', default: 0 }, { value: 'rem', label: 'rem', default: 0 }]
			};
		}
	}, {
		key: 'setDefaultAttribut',
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
		key: 'beforeSetValue',
		value: function beforeSetValue(value, id) {
			for (var key in value) {
				if (null === value[key]) {
					value[key] = '0px';
				}
			}

			return value;
		}
	}, {
		key: 'parseUnits',
		value: function parseUnits(units) {
			if (0 !== units.length) {
				var outputUnits = [];

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = units[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var unit = _step.value;

						if ('object' === (typeof unit === 'undefined' ? 'undefined' : _typeof(unit)) && unit.value) {
							continue;
						}

						outputUnits.push({
							value: unit,
							label: unit,
							default: 0
						});
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return outputUnits;
			}

			return units;
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var units = this.args.units;


			var value = Object.assign({}, this.attributes.default.value, this.getValue());

			units = this.parseUnits(units);

			return wp.element.createElement(BoxControl, {
				values: value,
				units: units,
				label: "",
				onChange: function onChange(newValue) {
					_this2.setValue(newValue);
				}
			});
		}
	}]);

	return Dimensions;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Border; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var _wp$components = wp.components,
    ColorPalette = _wp$components.ColorPalette,
    SelectControl = _wp$components.SelectControl,
    BoxControl = _wp$components.__experimentalBoxControl;
var __ = wp.i18n.__;
var select = wp.data.select;

var Border = function (_BaseControl) {
	_inherits(Border, _BaseControl);

	function Border(args) {
		_classCallCheck(this, Border);

		return _possibleConstructorReturn(this, (Border.__proto__ || Object.getPrototypeOf(Border)).call(this, args));
	}

	_createClass(Border, [{
		key: 'setDefaultArgs',
		value: function setDefaultArgs() {
			var settings = select('core/block-editor').getSettings();

			this.args = {
				class_name: 'jet-st-border-control',
				label: '',
				separator: 'none',
				hide_label_from_vision: false,
				help: '',
				style: [{ label: __('None', 'jet-styles-manager'), value: 'none' }, { label: __('Solid', 'jet-styles-manager'), value: 'solid' }, { label: __('Double', 'jet-styles-manager'), value: 'double' }, { label: __('Dotted', 'jet-styles-manager'), value: 'dotted' }, { label: __('Dashed', 'jet-styles-manager'), value: 'dashed' }, { label: __('Groove', 'jet-styles-manager'), value: 'groove' }],
				width_unit: [{ value: 'px', label: 'PX', default: 0 }],
				radius_unit: [{ value: 'px', label: 'PX', default: 0 }, { value: '%', label: '%', default: 0 }],
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
		key: 'setDefaultAttribut',
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
		key: 'beforeSetValue',
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
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var _args = this.args,
			    style = _args.style,
			    width_unit = _args.width_unit,
			    radius_unit = _args.radius_unit,
			    colors = _args.colors,
			    disable_custom_colors = _args.disable_custom_colors,
			    clearable = _args.clearable,
			    disable_style = _args.disable_style,
			    disable_radius = _args.disable_radius,
			    disable_width = _args.disable_width,
			    disable_color = _args.disable_color;


			var value = Object.assign({}, this.defaultValue, this.getValue());

			return wp.element.createElement(
				'div',
				{ className: 'jet-st-border-options' },
				!disable_style && wp.element.createElement(
					'div',
					{ key: 'border-type', className: 'jet-st-border-type' },
					wp.element.createElement(SelectControl, {
						value: value.style,
						onChange: function onChange(newValue) {
							_this2.setValue({ style: newValue });
						},
						options: style,
						label: __('Border Type', 'jet-styles-manager'),
						labelPosition: 'side'
					})
				),
				'none' !== value.style && !disable_width && wp.element.createElement(
					'div',
					{ key: 'border-width', className: 'jet-st-border-width' },
					wp.element.createElement(BoxControl, {
						values: value.width,
						units: width_unit,
						onChange: function onChange(newValue) {
							_this2.setValue({ width: newValue });
						},
						labelPosition: 'side',
						type: 'number',
						label: __('Border Width', 'jet-styles-manager')
					})
				),
				'none' !== value.style && !disable_radius && wp.element.createElement(
					'div',
					{ key: 'border-radius', className: 'jet-st-border-radius' },
					wp.element.createElement(BoxControl, {
						values: value.radius,
						units: radius_unit,
						onChange: function onChange(newValue) {
							_this2.setValue({ radius: newValue });
						},
						labelPosition: 'side',
						label: __('Border Radius', 'jet-styles-manager')
					})
				),
				'none' !== value.style && !disable_color && wp.element.createElement(
					'div',
					{ key: 'border-color', className: 'jet-st-border-color' },
					wp.element.createElement(
						'p',
						{ className: 'component-box-control__label' },
						__('Border Color', 'jet-styles-manager')
					),
					wp.element.createElement(ColorPalette, {
						value: value.color,
						colors: colors,
						disableCustomColors: disable_custom_colors,
						clearable: clearable,
						onChange: function onChange(newValue) {
							_this2.setValue({ color: newValue });
						}
					})
				)
			);
		}
	}]);

	return Border;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Typography; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Typography = function (_BaseControl) {
	_inherits(Typography, _BaseControl);

	function Typography(args) {
		_classCallCheck(this, Typography);

		return _possibleConstructorReturn(this, (Typography.__proto__ || Object.getPrototypeOf(Typography)).call(this, args));
	}

	_createClass(Typography, [{
		key: 'setDefaultArgs',
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

				family: [{ label: 'Default', value: 'inherit' }, { label: 'Arial', value: '"Arial", sans-serif' }, { label: 'Tahoma', value: '"Tahoma"' }, { label: 'Verdana', value: '"Verdana"' }, { label: 'Helvetica', value: '"Helvetica"' }, { label: 'Times New Roman', value: '"Times New Roman"' }, { label: 'Trebuchet MS', value: '"Trebuchet MS"' }, { label: 'Georgia', value: '"Georgia"' }],
				weight: [{ label: '100', value: '100' }, { label: '200', value: '200' }, { label: '300', value: '300' }, { label: '400', value: '400' }, { label: '500', value: '500' }, { label: '600', value: '600' }, { label: '700', value: '700' }, { label: '800', value: '800' }, { label: '900', value: '900' }, { label: 'Default', value: '' }, { label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }],
				transform: [{ label: 'Default', value: 'inherit' }, { label: 'Uppercase', value: 'uppercase' }, { label: 'Lowercase', value: 'lowercase' }, { label: 'Capitalize', value: 'capitalize' }, { label: 'Normal', value: 'none' }],
				style: [{ label: 'Default', value: 'inherit' }, { label: 'Normal', value: 'normal' }, { label: 'Italic', value: 'italic' }, { label: 'Oblique', value: 'oblique' }],
				decoration: [{ label: 'Default', value: 'inherit' }, { label: 'Underline', value: 'underline' }, { label: 'Overline', value: 'overline' }, { label: 'Line Through', value: 'line-through' }, { label: 'None', value: 'none' }],
				s_units: [{ value: 'px', label: 'PX', intervals: { step: 1, min: 1, max: 200, initialPosition: 14 } }, { value: 'em', label: 'EM', intervals: { step: 0.1, min: 0.1, max: 10, initialPosition: 1 } }, { value: 'rem', label: 'REM', intervals: { step: 0.1, min: 0.1, max: 10, initialPosition: 1 } }, { value: 'vw', label: 'VW', intervals: { step: 0.1, min: 0.1, max: 10, initialPosition: 1 } }],
				lh_units: [{ value: '', label: 'None', intervals: { step: 0.1, min: 0.1, max: 10, initialPosition: 1 } }, { value: 'px', label: 'PX', intervals: { step: 1, min: 1, max: 200, initialPosition: 14 } }, { value: 'em', label: 'EM', intervals: { step: 0.1, min: 0.1, max: 10, initialPosition: 1 } }],
				ls_units: [],
				default_intervals: { step: 0.1, min: -2, max: 20, initialPosition: 0 }
			};
		}
	}, {
		key: 'setDefaultAttribut',
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
						letterSpacing: 1,
						ls_unit: 'px'
					}
				},
				type: 'object'
			};
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var _args = this.args,
			    family = _args.family,
			    weight = _args.weight,
			    transform = _args.transform,
			    style = _args.style,
			    decoration = _args.decoration,
			    s_units = _args.s_units,
			    lh_units = _args.lh_units,
			    ls_units = _args.ls_units,
			    disable_family = _args.disable_family,
			    disable_size = _args.disable_size,
			    disable_weight = _args.disable_weight,
			    disable_transform = _args.disable_transform,
			    disable_style = _args.disable_style,
			    disable_decoration = _args.disable_decoration,
			    disable_line_height = _args.disable_line_height,
			    disable_letter_spacing = _args.disable_letter_spacing;


			var controlValue = Object.assign({}, this.attributes.default.value, this.getValue()),
			    value = controlValue;

			return wp.element.createElement(
				'div',
				null,
				!disable_size && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-size' },
					wp.element.createElement(RangeControl, _extends({
						beforeIcon: 'editor-textcolor',
						label: __('Size', 'jet-styles-manager'),
						value: value.size,
						onChange: function onChange(newValue) {
							controlValue.size = newValue;
							_this2.setValue(controlValue);
						},
						initialPosition: '2'
					}, this.getIntervals(s_units, controlValue.s_unit))),
					this.renderUnitsControl(s_units, 's_unit', value, controlValue)
				),
				!disable_line_height && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-size' },
					wp.element.createElement(RangeControl, _extends({
						beforeIcon: 'image-flip-vertical',
						label: __('Line Height', 'jet-styles-manager'),
						value: value.lineHeight,
						onChange: function onChange(newValue) {
							controlValue.lineHeight = newValue;
							_this2.setValue(controlValue);
						}
					}, this.getIntervals(lh_units, controlValue.lh_unit))),
					this.renderUnitsControl(lh_units, 'lh_unit', value, controlValue)
				),
				!disable_letter_spacing && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-size' },
					wp.element.createElement(RangeControl, _extends({
						beforeIcon: 'image-flip-horizontal',
						label: __('Letter Spacing', 'jet-styles-manager'),
						value: value.letterSpacing,
						onChange: function onChange(newValue) {
							controlValue.letterSpacing = newValue;
							_this2.setValue(controlValue);
						}
					}, this.getIntervals(ls_units, controlValue.ls_unit))),
					this.renderUnitsControl(ls_units, 'ls_unit', value, controlValue)
				),
				!disable_family && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-select' },
					wp.element.createElement(SelectControl, {
						value: value.family,
						onChange: function onChange(newValue) {
							controlValue.family = newValue;
							_this2.setValue(controlValue);
						},
						options: family,
						label: __('Family', 'jet-styles-manager'),
						labelPosition: 'side'
					})
				),
				!disable_weight && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-select' },
					wp.element.createElement(SelectControl, {
						value: value.weight,
						onChange: function onChange(newValue) {
							controlValue.weight = newValue;
							_this2.setValue(controlValue);
						},
						options: weight,
						label: __('Weight', 'jet-styles-manager'),
						labelPosition: 'side'
					})
				),
				!disable_transform && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-select' },
					wp.element.createElement(SelectControl, {
						value: value.transform,
						onChange: function onChange(newValue) {
							controlValue.transform = newValue;
							_this2.setValue(controlValue);
						},
						options: transform,
						label: __('Transform', 'jet-styles-manager'),
						labelPosition: 'side'
					})
				),
				!disable_style && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-select' },
					wp.element.createElement(SelectControl, {
						value: value.style,
						onChange: function onChange(newValue) {
							controlValue.style = newValue;
							_this2.setValue(controlValue);
						},
						options: style,
						label: __('Style', 'jet-styles-manager'),
						labelPosition: 'side'
					})
				),
				!disable_decoration && wp.element.createElement(
					'div',
					{ className: 'jet-st-typography-control-select' },
					wp.element.createElement(SelectControl, {
						value: value.decoration,
						onChange: function onChange(newValue) {
							controlValue.decoration = newValue;
							_this2.setValue(controlValue);
						},
						options: decoration,
						label: __('Decoration', 'jet-styles-manager'),
						labelPosition: 'side'
					})
				)
			);
		}
	}]);

	return Typography;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Select; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var SelectControl = wp.components.SelectControl;
var __ = wp.i18n.__;

var Select = function (_BaseControl) {
	_inherits(Select, _BaseControl);

	function Select(args) {
		_classCallCheck(this, Select);

		return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, args));
	}

	_createClass(Select, [{
		key: 'setDefaultArgs',
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
		key: 'setDefaultAttribut',
		value: function setDefaultAttribut() {
			this.attributes = {
				default: { value: '' },
				type: 'object'
			};

			this.placeholderOption = { value: '', label: this.args.placeholder, disabled: true };
		}
	}, {
		key: 'renderControl',
		value: function renderControl() {
			var _this2 = this;

			var _args = this.args,
			    multiple = _args.multiple,
			    options = _args.options,
			    placeholder = _args.placeholder,
			    disablePlaceholder = _args.disablePlaceholder;


			if (placeholder && '' !== options[0].value) {
				options.unshift(this.placeholderOption);
			}

			return wp.element.createElement(SelectControl, {
				value: this.getValue(),
				onChange: function onChange(newValue) {
					return _this2.setValue(newValue);
				},
				multiple: multiple,
				options: options
			});
		}
	}]);

	return Select;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Text; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_control__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class InputControl
 */



var TextControl = wp.components.__experimentalText;

var Text = function (_BaseControl) {
	_inherits(Text, _BaseControl);

	function Text(args) {
		_classCallCheck(this, Text);

		return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, args));
	}

	_createClass(Text, [{
		key: 'setDefaultArgs',
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
		key: 'renderControl',
		value: function renderControl() {
			var _args = this.args,
			    variant = _args.variant,
			    as = _args.as,
			    content = _args.content;


			return wp.element.createElement(
				TextControl,
				{
					variant: variant,
					as: as
				},
				content
			);
		}
	}]);

	return Text;
}(__WEBPACK_IMPORTED_MODULE_0__base_control__["a" /* BaseControl */]);



/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function JetStyleManagerMeta() {
	var _ref;

	var _wp = wp,
	    _wp$data = _wp.data,
	    dispatch = _wp$data.dispatch,
	    select = _wp$data.select;


	var styleSlug = '_jet_sm_style',
	    readyStyleSlug = '_jet_sm_ready_style',
	    controlsValues = '_jet_sm_controls_values';

	var postMeta = select('core/editor').getEditedPostAttribute('meta') || (_ref = {}, _defineProperty(_ref, styleSlug, ''), _defineProperty(_ref, readyStyleSlug, ''), _defineProperty(_ref, controlsValues, ''), _ref),
	    blockStyle = postMeta[styleSlug] ? JSON.parse(postMeta[styleSlug]) : {},
	    blocksOption = {},
	    updPostMeta = {};

	window.jetSmControlsValues = postMeta[controlsValues] ? JSON.parse(postMeta[controlsValues]) : {};

	if (Object.keys(blockStyle)[0]) {
		renderStyle(blockStyle);
		select('core/editor').isEditedPostAutosaveable = function () {
			return false;
		};
	}

	document.addEventListener('jet-sm-update-meta', debounce(setMeta, 50));
	function debounce(func, wait, immediate) {
		var timeout = void 0;

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
	};

	function setMeta(event) {
		var _event$detail = event.detail,
		    id = _event$detail.id,
		    blockID = _event$detail.blockID;


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
		collectStyle(blockID);
	}

	function clearMeta() {
		var blockIDs = getBlockList(select('core/block-editor').getBlocks());

		for (var blockStyleId in blockStyle) {
			if (-1 === blockIDs.indexOf(blockStyleId)) {
				delete blockStyle[blockStyleId];
				delete window.jetSmControlsValues[blockStyleId];
			}
		}
	}

	function getBlockList(blockList) {
		var blockIDs = [];

		for (var block in blockList) {
			var innerBlocks = blockList[block].innerBlocks;

			if (innerBlocks && innerBlocks[0]) {
				blockIDs.push.apply(blockIDs, _toConsumableArray(getBlockList(innerBlocks)));
			}

			if (!blockList[block].attributes.blockID) {
				continue;
			}

			blockIDs.push(blockList[block].attributes.blockID);
		}

		return blockIDs;
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
				    optionMedia = -1 !== max ? '@media only screen and (max-width: ' + max + 'px)' : '@media only screen and (min-width: ' + min + 'px)';


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

		switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
			case 'object':

				for (var key in value) {
					var macrosReg = new RegExp('{{' + key.toUpperCase() + '}}', 'gmi'),
					    deepValue = value[key];

					if ('object' === (typeof deepValue === 'undefined' ? 'undefined' : _typeof(deepValue))) {
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

					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = valuesArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var value = _step.value;

							if ('object' !== (typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
								continue;
							}

							var mediaQuery = value.mediaQuery,
							    option = value.option;


							breakpointsCss += mediaQuery + '{ ' + selector + ' { ' + option + ' } }';
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				}

				outputCSS += selector + '{' + desktopCss + '} ' + breakpointsCss;
			}
		}

		updPostMeta = (_updPostMeta = {}, _defineProperty(_updPostMeta, readyStyleSlug, outputCSS), _defineProperty(_updPostMeta, styleSlug, JSON.stringify(blocks)), _defineProperty(_updPostMeta, controlsValues, JSON.stringify(window.jetSmControlsValues)), _updPostMeta);

		ReactDOM.render(wp.element.createElement(
			'style',
			null,
			outputCSS
		), document.getElementById('jet-sm-gb-style'));

		dispatch('core/editor').editPost({ meta: Object.assign({}, postMeta, updPostMeta) });
	}
}

window.onload = function (e) {
	setTimeout(JetStyleManagerMeta, 500);
};

/***/ })
/******/ ]);