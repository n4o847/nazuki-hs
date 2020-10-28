/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 122:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => /* binding */ _extends
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ 756:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => /* binding */ _objectWithoutPropertiesLoose
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ 184:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ 675:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "215854c4c6cc11e5716f8d1d3d0ce20a.wasm");

/***/ }),

/***/ 143:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 418:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 391:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = all;

var _createChainableTypeChecker = __webpack_require__(613);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function all() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  function allPropTypes() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var error = null;

    validators.forEach(function (validator) {
      if (error != null) {
        return;
      }

      var result = validator.apply(undefined, args);
      if (result != null) {
        error = result;
      }
    });

    return error;
  }

  return (0, _createChainableTypeChecker2.default)(allPropTypes);
}
module.exports = exports['default'];

/***/ }),

/***/ 613:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
module.exports = exports['default'];

/***/ }),

/***/ 703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(703)();
}


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 236:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ esm_Alert
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(122);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(756);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(294);
// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(143);
// CONCATENATED MODULE: ./node_modules/uncontrollable/esm/utils.js


var noop = function noop() {};

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes = {};
  Object.keys(controlledValues).forEach(function (prop) {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop;

    if (false) { var handler; }
  });
  return propTypes;
}
function isProp(props, prop) {
  return props[prop] !== undefined;
}
function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function canAcceptRef(component) {
  return !!component && (typeof component !== 'function' || component.prototype && component.prototype.isReactComponent);
}
// CONCATENATED MODULE: ./node_modules/uncontrollable/esm/hook.js



function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




function useUncontrolledProp(propValue, defaultValue, handler) {
  var wasPropRef = (0,react.useRef)(propValue !== undefined);

  var _useState = (0,react.useState)(defaultValue),
      stateValue = _useState[0],
      setState = _useState[1];

  var isProp = propValue !== undefined;
  var wasProp = wasPropRef.current;
  wasPropRef.current = isProp;
  /**
   * If a prop switches from controlled to Uncontrolled
   * reset its value to the defaultValue
   */

  if (!isProp && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }

  return [isProp ? propValue : stateValue, (0,react.useCallback)(function (value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (handler) handler.apply(void 0, [value].concat(args));
    setState(value);
  }, [handler])];
}


function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function (result, fieldName) {
    var _extends2;

    var _ref = result,
        defaultValue = _ref[defaultKey(fieldName)],
        propsValue = _ref[fieldName],
        rest = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, [defaultKey(fieldName), fieldName].map(_toPropertyKey));

    var handlerName = config[fieldName];

    var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]),
        value = _useUncontrolledProp[0],
        handler = _useUncontrolledProp[1];

    return (0,esm_extends/* default */.Z)({}, rest, (_extends2 = {}, _extends2[fieldName] = value, _extends2[handlerName] = handler, _extends2));
  }, props);
}
// CONCATENATED MODULE: ./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function react_lifecycles_compat_es_polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}



// CONCATENATED MODULE: ./node_modules/uncontrollable/esm/uncontrollable.js







function uncontrollable(Component, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }

  var displayName = Component.displayName || Component.name || 'Component';
  var canAcceptRef = Utils.canAcceptRef(Component);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(Utils.defaultKey);
  !(canAcceptRef || !methods.length) ?  false ? 0 : invariant(false) : void 0;

  var UncontrolledComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(UncontrolledComponent, _React$Component);

    function UncontrolledComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handlers = Object.create(null);
      controlledProps.forEach(function (propName) {
        var handlerName = controlledValues[propName];

        var handleChange = function handleChange(value) {
          if (_this.props[handlerName]) {
            var _this$props;

            _this._notifying = true;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            (_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));

            _this._notifying = false;
          }

          if (!_this.unmounted) _this.setState(function (_ref) {
            var _extends2;

            var values = _ref.values;
            return {
              values: _extends(Object.create(null), values, (_extends2 = {}, _extends2[propName] = value, _extends2))
            };
          });
        };

        _this.handlers[handlerName] = handleChange;
      });
      if (methods.length) _this.attachRef = function (ref) {
        _this.inner = ref;
      };
      var values = Object.create(null);
      controlledProps.forEach(function (key) {
        values[key] = _this.props[Utils.defaultKey(key)];
      });
      _this.state = {
        values: values,
        prevProps: {}
      };
      return _this;
    }

    var _proto = UncontrolledComponent.prototype;

    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      //let setState trigger the update
      return !this._notifying;
    };

    UncontrolledComponent.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref2) {
      var values = _ref2.values,
          prevProps = _ref2.prevProps;
      var nextState = {
        values: _extends(Object.create(null), values),
        prevProps: {}
      };
      controlledProps.forEach(function (key) {
        /**
         * If a prop switches from controlled to Uncontrolled
         * reset its value to the defaultValue
         */
        nextState.prevProps[key] = props[key];

        if (!Utils.isProp(props, key) && Utils.isProp(prevProps, key)) {
          nextState.values[key] = props[Utils.defaultKey(key)];
        }
      });
      return nextState;
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          innerRef = _this$props2.innerRef,
          props = _objectWithoutPropertiesLoose(_this$props2, ["innerRef"]);

      PROPS_TO_OMIT.forEach(function (prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function (propName) {
        var propValue = _this2.props[propName];
        newProps[propName] = propValue !== undefined ? propValue : _this2.state.values[propName];
      });
      return React.createElement(Component, _extends({}, props, newProps, this.handlers, {
        ref: innerRef || this.attachRef
      }));
    };

    return UncontrolledComponent;
  }(React.Component);

  polyfill(UncontrolledComponent);
  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = _extends({
    innerRef: function innerRef() {}
  }, Utils.uncontrolledPropTypes(controlledValues, displayName));
  methods.forEach(function (method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _this$inner;

      return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
    };
  });
  var WrappedComponent = UncontrolledComponent;

  if (React.forwardRef) {
    WrappedComponent = React.forwardRef(function (props, ref) {
      return React.createElement(UncontrolledComponent, _extends({}, props, {
        innerRef: ref
      }));
    });
    WrappedComponent.propTypes = UncontrolledComponent.propTypes;
  }

  WrappedComponent.ControlledComponent = Component;
  /**
   * useful when wrapping a Component and you want to control
   * everything
   */

  WrappedComponent.deferControlTo = function (newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }

    return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
  };

  return WrappedComponent;
}
// CONCATENATED MODULE: ./node_modules/uncontrollable/esm/index.js


// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useCommittedRef.js

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded befor being used.
 *
 * This is safe to access in an event handler.
 *
 * @param value The `Ref` value
 */

function useCommittedRef(value) {
  var ref = (0,react.useRef)(value);
  (0,react.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref;
}

/* harmony default export */ const esm_useCommittedRef = (useCommittedRef);
// CONCATENATED MODULE: ./node_modules/@restart/hooks/esm/useEventCallback.js


function useEventCallback(fn) {
  var ref = esm_useCommittedRef(fn);
  return (0,react.useCallback)(function () {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__(792);
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/ownerWindow.js

function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/getComputedStyle.js

function getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/hyphenateStyle.js
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */

var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/css.js




function style(node, property) {
  var css = '';
  var transforms = '';

  if (typeof property === 'string') {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
  }

  Object.keys(property).forEach(function (key) {
    var value = property[key];

    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });

  if (transforms) {
    css += "transform: " + transforms + ";";
  }

  node.style.cssText += ";" + css;
}

/* harmony default export */ const css = (style);
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/canUseDOM.js
/* harmony default export */ const canUseDOM = (!!(typeof window !== 'undefined' && window.document && window.document.createElement));
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/addEventListener.js
/* eslint-disable no-return-assign */

var optionsSupported = false;
var onceSupported = false;

try {
  var options = {
    get passive() {
      return optionsSupported = true;
    },

    get once() {
      // eslint-disable-next-line no-multi-assign
      return onceSupported = optionsSupported = true;
    }

  };

  if (canUseDOM) {
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, true);
  }
} catch (e) {
  /* */
}

/**
 * An `addEventListener` ponyfill, supports the `once` option
 */
function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== 'boolean' && !onceSupported) {
    var once = options.once,
        capture = options.capture;
    var wrappedHandler = handler;

    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };

      handler.__once = wrappedHandler;
    }

    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }

  node.addEventListener(eventName, handler, options);
}

/* harmony default export */ const esm_addEventListener = (addEventListener);
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/removeEventListener.js
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== 'boolean' ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);

  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}

/* harmony default export */ const esm_removeEventListener = (removeEventListener);
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/listen.js



function listen(node, eventName, handler, options) {
  esm_addEventListener(node, eventName, handler, options);
  return function () {
    esm_removeEventListener(node, eventName, handler, options);
  };
}

/* harmony default export */ const esm_listen = (listen);
// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/transitionEnd.js



function parseDuration(node) {
  var str = css(node, 'transitionDuration') || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function triggerTransitionEnd(element) {
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('transitionend', true, true);
  element.dispatchEvent(evt);
}

function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }

  var called = false;
  var handle = setTimeout(function () {
    if (!called) triggerTransitionEnd(element);
  }, duration + padding);
  var remove = esm_listen(element, 'transitionend', function () {
    called = true;
  }, {
    once: true
  });
  return function () {
    clearTimeout(handle);
    remove();
  };
}

function transitionEnd(element, handler, duration, padding) {
  if (duration == null) duration = parseDuration(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = esm_listen(element, 'transitionend', handler);
  return function () {
    removeEmulate();
    remove();
  };
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function inheritsLoose_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(935);
// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/config.js
/* harmony default export */ const config = ({
  disabled: false
});
// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/TransitionGroupContext.js

/* harmony default export */ const TransitionGroupContext = (react.createContext(null));
// CONCATENATED MODULE: ./node_modules/react-transition-group/esm/Transition.js








var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  inheritsLoose_inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [react_dom.findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : react_dom.findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : react_dom.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        _in = _this$props.in,
        _mountOnEnter = _this$props.mountOnEnter,
        _unmountOnExit = _this$props.unmountOnExit,
        _appear = _this$props.appear,
        _enter = _this$props.enter,
        _exit = _this$props.exit,
        _timeout = _this$props.timeout,
        _addEndListener = _this$props.addEndListener,
        _onEnter = _this$props.onEnter,
        _onEntering = _this$props.onEntering,
        _onEntered = _this$props.onEntered,
        _onExit = _this$props.onExit,
        _onExiting = _this$props.onExiting,
        _onExited = _this$props.onExited,
        _nodeRef = _this$props.nodeRef,
        childProps = (0,objectWithoutPropertiesLoose/* default */.Z)(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      react.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : react.cloneElement(react.Children.only(children), childProps))
    );
  };

  return Transition;
}(react.Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes =  false ? 0 : {}; // Name the function so it is clearer in the documentation

function Transition_noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: Transition_noop,
  onEntering: Transition_noop,
  onEntered: Transition_noop,
  onExit: Transition_noop,
  onExiting: Transition_noop,
  onExited: Transition_noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
/* harmony default export */ const esm_Transition = (Transition);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/triggerBrowserReflow.js
// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;
}
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Fade.js



var _fadeStyles;






var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[ENTERING] = 'show', _fadeStyles[ENTERED] = 'show', _fadeStyles);
var Fade = react.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["className", "children"]);

  var handleEnter = (0,react.useCallback)(function (node) {
    triggerBrowserReflow(node);
    if (props.onEnter) props.onEnter(node);
  }, [props]);
  return /*#__PURE__*/react.createElement(esm_Transition, (0,esm_extends/* default */.Z)({
    ref: ref,
    addEndListener: transitionEnd
  }, props, {
    onEnter: handleEnter
  }), function (status, innerProps) {
    return react.cloneElement(children, (0,esm_extends/* default */.Z)({}, innerProps, {
      className: classnames_default()('fade', className, children.props.className, fadeStyles[status])
    }));
  });
});
Fade.defaultProps = defaultProps;
Fade.displayName = 'Fade';
/* harmony default export */ const esm_Fade = (Fade);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/CloseButton.js





var propTypes = {
  label: (prop_types_default()).string.isRequired,
  onClick: (prop_types_default()).func
};
var CloseButton_defaultProps = {
  label: 'Close'
};
var CloseButton = react.forwardRef(function (_ref, ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      className = _ref.className,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["label", "onClick", "className"]);

  return /*#__PURE__*/react.createElement("button", (0,esm_extends/* default */.Z)({
    ref: ref,
    type: "button",
    className: classnames_default()('close', className),
    onClick: onClick
  }, props), /*#__PURE__*/react.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), /*#__PURE__*/react.createElement("span", {
    className: "sr-only"
  }, label));
});
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = CloseButton_defaultProps;
/* harmony default export */ const esm_CloseButton = (CloseButton);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/divWithClassName.js



/* harmony default export */ const divWithClassName = (function (className) {
  return react.forwardRef(function (p, ref) {
    return /*#__PURE__*/react.createElement("div", (0,esm_extends/* default */.Z)({}, p, {
      ref: ref,
      className: classnames_default()(p.className, className)
    }));
  });
});
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/createWithBsPrefix.js + 1 modules
var createWithBsPrefix = __webpack_require__(680);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/createChainedFunction.js
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) return f;
    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      // @ts-ignore
      acc.apply(this, args); // @ts-ignore

      f.apply(this, args);
    };
  }, null);
}

/* harmony default export */ const esm_createChainedFunction = (createChainedFunction);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/SafeAnchor.js





function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */


var SafeAnchor = react.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'a' : _ref$as,
      disabled = _ref.disabled,
      onKeyDown = _ref.onKeyDown,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["as", "disabled", "onKeyDown"]);

  var handleClick = function handleClick(event) {
    var href = props.href,
        onClick = props.onClick;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  if (isTrivialHref(props.href)) {
    props.role = props.role || 'button'; // we want to make sure there is a href attribute on the node
    // otherwise, the cursor incorrectly styled (except with role='button')

    props.href = props.href || '#';
  }

  if (disabled) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({
    ref: ref
  }, props, {
    onClick: handleClick,
    onKeyDown: esm_createChainedFunction(handleKeyDown, onKeyDown)
  }));
});
SafeAnchor.displayName = 'SafeAnchor';
/* harmony default export */ const esm_SafeAnchor = (SafeAnchor);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Alert.js












var DivStyledAsH4 = divWithClassName('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
var AlertHeading = (0,createWithBsPrefix/* default */.Z)('alert-heading', {
  Component: DivStyledAsH4
});
var AlertLink = (0,createWithBsPrefix/* default */.Z)('alert-link', {
  Component: esm_SafeAnchor
});
var Alert_defaultProps = {
  show: true,
  transition: esm_Fade,
  closeLabel: 'Close alert'
};
var Alert = react.forwardRef(function (uncontrolledProps, ref) {
  var _useUncontrolled = useUncontrolled(uncontrolledProps, {
    show: 'onClose'
  }),
      bsPrefix = _useUncontrolled.bsPrefix,
      show = _useUncontrolled.show,
      closeLabel = _useUncontrolled.closeLabel,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      variant = _useUncontrolled.variant,
      onClose = _useUncontrolled.onClose,
      dismissible = _useUncontrolled.dismissible,
      transition = _useUncontrolled.transition,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_useUncontrolled, ["bsPrefix", "show", "closeLabel", "className", "children", "variant", "onClose", "dismissible", "transition"]);

  var prefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(bsPrefix, 'alert');
  var handleClose = useEventCallback(function (e) {
    if (onClose) {
      onClose(false, e);
    }
  });
  var Transition = transition === true ? esm_Fade : transition;
  var alert = /*#__PURE__*/react.createElement("div", (0,esm_extends/* default */.Z)({
    role: "alert"
  }, Transition ? props : undefined, {
    ref: ref,
    className: classnames_default()(className, prefix, variant && prefix + "-" + variant, dismissible && prefix + "-dismissible")
  }), dismissible && /*#__PURE__*/react.createElement(esm_CloseButton, {
    onClick: handleClose,
    label: closeLabel
  }), children);
  if (!Transition) return show ? alert : null;
  return /*#__PURE__*/react.createElement(Transition, (0,esm_extends/* default */.Z)({
    unmountOnExit: true
  }, props, {
    ref: undefined,
    in: show
  }), alert);
});
Alert.displayName = 'Alert';
Alert.defaultProps = Alert_defaultProps;
Alert.Link = AlertLink;
Alert.Heading = AlertHeading;
/* harmony default export */ const esm_Alert = (Alert);

/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(122);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(756);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(294);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(792);





var defaultProps = {
  fluid: false
};
var Container = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      fluid = _ref.fluid,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(_ref, ["bsPrefix", "fluid", "as", "className"]);

  var prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__/* .useBootstrapPrefix */ .vE)(bsPrefix, 'container');
  var suffix = typeof fluid === 'string' ? "-" + fluid : '-fluid';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, fluid ? "" + prefix + suffix : prefix)
  }));
});
Container.displayName = 'Container';
Container.defaultProps = defaultProps;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);

/***/ }),

/***/ 548:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ Form
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(122);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(756);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(294);
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/all.js
var lib_all = __webpack_require__(391);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Feedback.js





var propTypes = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: (prop_types_default()).string,

  /** Display feedback as a tooltip. */
  tooltip: (prop_types_default()).bool,
  as: (prop_types_default()).elementType
};
var Feedback = react.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'valid' : _ref$type,
      _ref$tooltip = _ref.tooltip,
      tooltip = _ref$tooltip === void 0 ? false : _ref$tooltip,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["as", "className", "type", "tooltip"]);

  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    className: classnames_default()(className, type + "-" + (tooltip ? 'tooltip' : 'feedback'))
  }));
});
Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes;
/* harmony default export */ const esm_Feedback = (Feedback);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormContext.js
 // TODO

var FormContext = react.createContext({
  controlId: undefined
});
/* harmony default export */ const esm_FormContext = (FormContext);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__(792);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormCheckInput.js






var FormCheckInput = react.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'checkbox' : _ref$type,
      _ref$isValid = _ref.isValid,
      isValid = _ref$isValid === void 0 ? false : _ref$isValid,
      _ref$isInvalid = _ref.isInvalid,
      isInvalid = _ref$isInvalid === void 0 ? false : _ref$isInvalid,
      isStatic = _ref.isStatic,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["id", "bsPrefix", "bsCustomPrefix", "className", "type", "isValid", "isInvalid", "isStatic", "as"]);

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var _ref2 = custom ? [bsCustomPrefix, 'custom-control-input'] : [bsPrefix, 'form-check-input'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(prefix, defaultPrefix);
  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    type: type,
    id: id || controlId,
    className: classnames_default()(className, bsPrefix, isValid && 'is-valid', isInvalid && 'is-invalid', isStatic && 'position-static')
  }));
});
FormCheckInput.displayName = 'FormCheckInput';
/* harmony default export */ const esm_FormCheckInput = (FormCheckInput);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormCheckLabel.js






var FormCheckLabel = react.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["bsPrefix", "bsCustomPrefix", "className", "htmlFor"]);

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var _ref2 = custom ? [bsCustomPrefix, 'custom-control-label'] : [bsPrefix, 'form-check-label'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(prefix, defaultPrefix);
  return /*#__PURE__*/react.createElement("label", (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames_default()(className, bsPrefix)
  }));
});
FormCheckLabel.displayName = 'FormCheckLabel';
/* harmony default export */ const esm_FormCheckLabel = (FormCheckLabel);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormCheck.js










var FormCheck = react.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      _ref$inline = _ref.inline,
      inline = _ref$inline === void 0 ? false : _ref$inline,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$isValid = _ref.isValid,
      isValid = _ref$isValid === void 0 ? false : _ref$isValid,
      _ref$isInvalid = _ref.isInvalid,
      isInvalid = _ref$isInvalid === void 0 ? false : _ref$isInvalid,
      _ref$feedbackTooltip = _ref.feedbackTooltip,
      feedbackTooltip = _ref$feedbackTooltip === void 0 ? false : _ref$feedbackTooltip,
      feedback = _ref.feedback,
      className = _ref.className,
      style = _ref.style,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'checkbox' : _ref$type,
      label = _ref.label,
      children = _ref.children,
      propCustom = _ref.custom,
      _ref$as = _ref.as,
      as = _ref$as === void 0 ? 'input' : _ref$as,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["id", "bsPrefix", "bsCustomPrefix", "inline", "disabled", "isValid", "isInvalid", "feedbackTooltip", "feedback", "className", "style", "title", "type", "label", "children", "custom", "as"]);

  var custom = type === 'switch' ? true : propCustom;

  var _ref2 = custom ? [bsCustomPrefix, 'custom-control'] : [bsPrefix, 'form-check'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(prefix, defaultPrefix);

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId;

  var innerFormContext = (0,react.useMemo)(function () {
    return {
      controlId: id || controlId,
      custom: custom
    };
  }, [controlId, custom, id]);
  var hasLabel = custom || label != null && label !== false && !children;
  var input = /*#__PURE__*/react.createElement(esm_FormCheckInput, (0,esm_extends/* default */.Z)({}, props, {
    type: type === 'switch' ? 'checkbox' : type,
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    isStatic: !hasLabel,
    disabled: disabled,
    as: as
  }));
  return /*#__PURE__*/react.createElement(esm_FormContext.Provider, {
    value: innerFormContext
  }, /*#__PURE__*/react.createElement("div", {
    style: style,
    className: classnames_default()(className, bsPrefix, custom && "custom-" + type, inline && bsPrefix + "-inline")
  }, children || /*#__PURE__*/react.createElement(react.Fragment, null, input, hasLabel && /*#__PURE__*/react.createElement(esm_FormCheckLabel, {
    title: title
  }, label), (isValid || isInvalid) && /*#__PURE__*/react.createElement(esm_Feedback, {
    type: isValid ? 'valid' : 'invalid',
    tooltip: feedbackTooltip
  }, feedback))));
});
FormCheck.displayName = 'FormCheck';
FormCheck.Input = esm_FormCheckInput;
FormCheck.Label = esm_FormCheckLabel;
/* harmony default export */ const esm_FormCheck = (FormCheck);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormFileInput.js






var FormFileInput = react.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      lang = _ref.lang,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["id", "bsPrefix", "bsCustomPrefix", "className", "isValid", "isInvalid", "lang", "as"]);

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var type = 'file';

  var _ref2 = custom ? [bsCustomPrefix, 'custom-file-input'] : [bsPrefix, 'form-control-file'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(prefix, defaultPrefix);
  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    id: id || controlId,
    type: type,
    lang: lang,
    className: classnames_default()(className, bsPrefix, isValid && 'is-valid', isInvalid && 'is-invalid')
  }));
});
FormFileInput.displayName = 'FormFileInput';
/* harmony default export */ const esm_FormFileInput = (FormFileInput);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormFileLabel.js






var FormFileLabel = react.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["bsPrefix", "bsCustomPrefix", "className", "htmlFor"]);

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  var _ref2 = custom ? [bsCustomPrefix, 'custom-file-label'] : [bsPrefix, 'form-file-label'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(prefix, defaultPrefix);
  return /*#__PURE__*/react.createElement("label", (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames_default()(className, bsPrefix),
    "data-browse": props['data-browse']
  }));
});
FormFileLabel.displayName = 'FormFileLabel';
/* harmony default export */ const esm_FormFileLabel = (FormFileLabel);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormFile.js










var FormFile = react.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$isValid = _ref.isValid,
      isValid = _ref$isValid === void 0 ? false : _ref$isValid,
      _ref$isInvalid = _ref.isInvalid,
      isInvalid = _ref$isInvalid === void 0 ? false : _ref$isInvalid,
      _ref$feedbackTooltip = _ref.feedbackTooltip,
      feedbackTooltip = _ref$feedbackTooltip === void 0 ? false : _ref$feedbackTooltip,
      feedback = _ref.feedback,
      className = _ref.className,
      style = _ref.style,
      label = _ref.label,
      children = _ref.children,
      custom = _ref.custom,
      lang = _ref.lang,
      dataBrowse = _ref['data-browse'],
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      _ref$inputAs = _ref.inputAs,
      inputAs = _ref$inputAs === void 0 ? 'input' : _ref$inputAs,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["id", "bsPrefix", "bsCustomPrefix", "disabled", "isValid", "isInvalid", "feedbackTooltip", "feedback", "className", "style", "label", "children", "custom", "lang", "data-browse", "as", "inputAs"]);

  var _ref2 = custom ? [bsCustomPrefix, 'custom'] : [bsPrefix, 'form-file'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(prefix, defaultPrefix);
  var type = 'file';

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId;

  var innerFormContext = (0,react.useMemo)(function () {
    return {
      controlId: id || controlId,
      custom: custom
    };
  }, [controlId, custom, id]);
  var hasLabel = label != null && label !== false && !children;
  var input = /*#__PURE__*/react.createElement(esm_FormFileInput, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    disabled: disabled,
    as: inputAs,
    lang: lang
  }));
  return /*#__PURE__*/react.createElement(esm_FormContext.Provider, {
    value: innerFormContext
  }, /*#__PURE__*/react.createElement(Component, {
    style: style,
    className: classnames_default()(className, bsPrefix, custom && "custom-" + type)
  }, children || /*#__PURE__*/react.createElement(react.Fragment, null, custom ? /*#__PURE__*/react.createElement(react.Fragment, null, input, hasLabel && /*#__PURE__*/react.createElement(esm_FormFileLabel, {
    "data-browse": dataBrowse
  }, label)) : /*#__PURE__*/react.createElement(react.Fragment, null, hasLabel && /*#__PURE__*/react.createElement(esm_FormFileLabel, null, label), input), (isValid || isInvalid) && /*#__PURE__*/react.createElement(esm_Feedback, {
    type: isValid ? 'valid' : 'invalid',
    tooltip: feedbackTooltip
  }, feedback))));
});
FormFile.displayName = 'FormFile';
FormFile.Input = esm_FormFileInput;
FormFile.Label = esm_FormFileLabel;
/* harmony default export */ const esm_FormFile = (FormFile);
// EXTERNAL MODULE: ./node_modules/warning/warning.js
var warning = __webpack_require__(473);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormControl.js









var FormControl = react.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      bsCustomPrefix = _ref.bsCustomPrefix,
      type = _ref.type,
      size = _ref.size,
      htmlSize = _ref.htmlSize,
      id = _ref.id,
      className = _ref.className,
      _ref$isValid = _ref.isValid,
      isValid = _ref$isValid === void 0 ? false : _ref$isValid,
      _ref$isInvalid = _ref.isInvalid,
      isInvalid = _ref$isInvalid === void 0 ? false : _ref$isInvalid,
      plaintext = _ref.plaintext,
      readOnly = _ref.readOnly,
      custom = _ref.custom,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["bsPrefix", "bsCustomPrefix", "type", "size", "htmlSize", "id", "className", "isValid", "isInvalid", "plaintext", "readOnly", "custom", "as"]);

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId;

  var _ref2 = custom ? [bsCustomPrefix, 'custom'] : [bsPrefix, 'form-control'],
      prefix = _ref2[0],
      defaultPrefix = _ref2[1];

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(prefix, defaultPrefix);
  var classes;

  if (plaintext) {
    var _classes;

    classes = (_classes = {}, _classes[bsPrefix + "-plaintext"] = true, _classes);
  } else if (type === 'file') {
    var _classes2;

    classes = (_classes2 = {}, _classes2[bsPrefix + "-file"] = true, _classes2);
  } else if (type === 'range') {
    var _classes3;

    classes = (_classes3 = {}, _classes3[bsPrefix + "-range"] = true, _classes3);
  } else if (Component === 'select' && custom) {
    var _classes4;

    classes = (_classes4 = {}, _classes4[bsPrefix + "-select"] = true, _classes4[bsPrefix + "-select-" + size] = size, _classes4);
  } else {
    var _classes5;

    classes = (_classes5 = {}, _classes5[bsPrefix] = true, _classes5[bsPrefix + "-" + size] = size, _classes5);
  }

   false ? 0 : void 0;
  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    type: type,
    size: htmlSize,
    ref: ref,
    readOnly: readOnly,
    id: id || controlId,
    className: classnames_default()(className, classes, isValid && "is-valid", isInvalid && "is-invalid")
  }));
});
FormControl.displayName = 'FormControl';
/* harmony default export */ const esm_FormControl = (Object.assign(FormControl, {
  Feedback: esm_Feedback
}));
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormGroup.js






var FormGroup = react.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      controlId = _ref.controlId,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["bsPrefix", "className", "children", "controlId", "as"]);

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(bsPrefix, 'form-group');
  var context = (0,react.useMemo)(function () {
    return {
      controlId: controlId
    };
  }, [controlId]);
  return /*#__PURE__*/react.createElement(esm_FormContext.Provider, {
    value: context
  }, /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    className: classnames_default()(className, bsPrefix)
  }), children));
});
FormGroup.displayName = 'FormGroup';
/* harmony default export */ const esm_FormGroup = (FormGroup);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Col.js





var DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
var Col = react.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["bsPrefix", "className", "as"]);

  var prefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(bsPrefix, 'col');
  var spans = [];
  var classes = [];
  DEVICE_SIZES.forEach(function (brkPoint) {
    var propValue = props[brkPoint];
    delete props[brkPoint];
    var span;
    var offset;
    var order;

    if (typeof propValue === 'object' && propValue != null) {
      var _propValue$span = propValue.span;
      span = _propValue$span === void 0 ? true : _propValue$span;
      offset = propValue.offset;
      order = propValue.order;
    } else {
      span = propValue;
    }

    var infix = brkPoint !== 'xs' ? "-" + brkPoint : '';
    if (span) spans.push(span === true ? "" + prefix + infix : "" + prefix + infix + "-" + span);
    if (order != null) classes.push("order" + infix + "-" + order);
    if (offset != null) classes.push("offset" + infix + "-" + offset);
  });

  if (!spans.length) {
    spans.push(prefix); // plain 'col'
  }

  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    className: classnames_default().apply(void 0, [className].concat(spans, classes))
  }));
});
Col.displayName = 'Col';
/* harmony default export */ const esm_Col = (Col);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormLabel.js








var defaultProps = {
  column: false,
  srOnly: false
};
var FormLabel = react.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'label' : _ref$as,
      bsPrefix = _ref.bsPrefix,
      column = _ref.column,
      srOnly = _ref.srOnly,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["as", "bsPrefix", "column", "srOnly", "className", "htmlFor"]);

  var _useContext = (0,react.useContext)(esm_FormContext),
      controlId = _useContext.controlId;

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(bsPrefix, 'form-label');
  var columnClass = 'col-form-label';
  if (typeof column === 'string') columnClass = columnClass + " " + columnClass + "-" + column;
  var classes = classnames_default()(className, bsPrefix, srOnly && 'sr-only', column && columnClass);
   false ? 0 : void 0;
  htmlFor = htmlFor || controlId;
  if (column) return /*#__PURE__*/react.createElement(esm_Col, (0,esm_extends/* default */.Z)({
    as: "label",
    className: classes,
    htmlFor: htmlFor
  }, props));
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    react.createElement(Component, (0,esm_extends/* default */.Z)({
      ref: ref,
      className: classes,
      htmlFor: htmlFor
    }, props))
  );
});
FormLabel.displayName = 'FormLabel';
FormLabel.defaultProps = defaultProps;
/* harmony default export */ const esm_FormLabel = (FormLabel);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/FormText.js





var FormText = react.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'small' : _ref$as,
      muted = _ref.muted,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["bsPrefix", "className", "as", "muted"]);

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(bsPrefix, 'form-text');
  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    className: classnames_default()(className, bsPrefix, muted && 'text-muted')
  }));
});
FormText.displayName = 'FormText';
/* harmony default export */ const esm_FormText = (FormText);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Switch.js



var Switch = react.forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(esm_FormCheck, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    type: "switch"
  }));
});
Switch.displayName = 'Switch';
Switch.Input = esm_FormCheck.Input;
Switch.Label = esm_FormCheck.Label;
/* harmony default export */ const esm_Switch = (Switch);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/createWithBsPrefix.js + 1 modules
var createWithBsPrefix = __webpack_require__(680);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/Form.js













var FormRow = (0,createWithBsPrefix/* default */.Z)('form-row');
var Form_defaultProps = {
  inline: false
};
var FormImpl = react.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      inline = _ref.inline,
      className = _ref.className,
      validated = _ref.validated,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'form' : _ref$as,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["bsPrefix", "inline", "className", "validated", "as"]);

  bsPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(bsPrefix, 'form');
  return /*#__PURE__*/react.createElement(Component, (0,esm_extends/* default */.Z)({}, props, {
    ref: ref,
    className: classnames_default()(className, validated && 'was-validated', inline && bsPrefix + "-inline")
  }));
});
FormImpl.displayName = 'Form';
FormImpl.defaultProps = Form_defaultProps;
FormImpl.Row = FormRow;
FormImpl.Group = esm_FormGroup;
FormImpl.Control = esm_FormControl;
FormImpl.Check = esm_FormCheck;
FormImpl.File = esm_FormFile;
FormImpl.Switch = esm_Switch;
FormImpl.Label = esm_FormLabel;
FormImpl.Text = esm_FormText;
/* harmony default export */ const Form = (FormImpl);

/***/ }),

/***/ 151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(122);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(756);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(184);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(792);





var defaultProps = {
  fluid: false
};
var Jumbotron = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function (_ref, ref) {
  var _classes;

  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      fluid = _ref.fluid,
      bsPrefix = _ref.bsPrefix,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(_ref, ["as", "className", "fluid", "bsPrefix"]);

  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_3__/* .useBootstrapPrefix */ .vE)(bsPrefix, 'jumbotron');
  var classes = (_classes = {}, _classes[bsPrefix] = true, _classes[bsPrefix + "-fluid"] = fluid, _classes);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, classes)
  }));
});
Jumbotron.defaultProps = defaultProps;
Jumbotron.displayName = 'Jumbotron';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Jumbotron);

/***/ }),

/***/ 792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vE": () => /* binding */ useBootstrapPrefix
/* harmony export */ });
/* unused harmony exports createBootstrapComponent, ThemeConsumer */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);


var ThemeContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({});
var Consumer = ThemeContext.Consumer,
    Provider = ThemeContext.Provider;

function ThemeProvider(_ref) {
  var prefixes = _ref.prefixes,
      children = _ref.children;
  var copiedPrefixes = useMemo(function () {
    return _extends({}, prefixes);
  }, [prefixes]);
  return /*#__PURE__*/React.createElement(Provider, {
    value: copiedPrefixes
  }, children);
}

function useBootstrapPrefix(prefix, defaultPrefix) {
  var prefixes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  var isClassy = Component.prototype && Component.prototype.isReactComponent; // If it's a functional component make sure we don't break it with a ref

  var _opts = opts,
      prefix = _opts.prefix,
      _opts$forwardRefAs = _opts.forwardRefAs,
      forwardRefAs = _opts$forwardRefAs === void 0 ? isClassy ? 'ref' : 'innerRef' : _opts$forwardRefAs;
  var Wrapped = React.forwardRef(function (_ref2, ref) {
    var props = _extends({}, _ref2);

    props[forwardRefAs] = ref;
    var bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
      bsPrefix: bsPrefix
    }));
  });
  Wrapped.displayName = "Bootstrap(" + (Component.displayName || Component.name) + ")";
  return Wrapped;
}


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (ThemeProvider)));

/***/ }),

/***/ 680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => /* binding */ createWithBsPrefix
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(122);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(756);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/dom-helpers/esm/camelize.js
var rHyphen = /-(.)/g;
function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(294);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/ThemeProvider.js
var ThemeProvider = __webpack_require__(792);
// CONCATENATED MODULE: ./node_modules/react-bootstrap/esm/createWithBsPrefix.js







var pascalCase = function pascalCase(str) {
  return str[0].toUpperCase() + camelize(str).slice(1);
};

// TODO: emstricten & fix the typing here! `createWithBsPrefix<TElementType>...`
function createWithBsPrefix(prefix, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === void 0 ? pascalCase(prefix) : _ref$displayName,
      Component = _ref.Component,
      defaultProps = _ref.defaultProps;

  var BsComponent = react.forwardRef(function (_ref2, ref) {
    var className = _ref2.className,
        bsPrefix = _ref2.bsPrefix,
        _ref2$as = _ref2.as,
        Tag = _ref2$as === void 0 ? Component || 'div' : _ref2$as,
        props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref2, ["className", "bsPrefix", "as"]);

    var resolvedPrefix = (0,ThemeProvider/* useBootstrapPrefix */.vE)(bsPrefix, prefix);
    return /*#__PURE__*/react.createElement(Tag, (0,esm_extends/* default */.Z)({
      ref: ref,
      className: classnames_default()(className, resolvedPrefix)
    }, props));
  });
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}

/***/ }),

/***/ 448:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.1
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(294),m=__webpack_require__(418),r=__webpack_require__(840);function y(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(y(227));var ba=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b)}
function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba.add(b[a])}
var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
ja={},ka={};function la(a){if(ia.call(ka,a))return!0;if(ia.call(ja,a))return!1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return!1}function ma(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function B(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var D={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1,!1)});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
pa);D[b]=new B(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1,!1)});
D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0,!0)});
function qa(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
var ra=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;sa=E("react.element");ta=E("react.portal");ua=E("react.fragment");wa=E("react.strict_mode");xa=E("react.profiler");ya=E("react.provider");za=E("react.context");Aa=E("react.forward_ref");Ba=E("react.suspense");Ca=E("react.suspense_list");Da=E("react.memo");Ea=E("react.lazy");Fa=E("react.block");E("react.scope");Ga=E("react.opaque.id");Ha=E("react.debug_trace_mode");Ia=E("react.offscreen");Ja=E("react.legacy_hidden")}
var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return"function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||""}return"\n"+Ma+a}var Oa=!1;
function Pa(a,b){if(!a||Oa)return"";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(k){var d=k}Reflect.construct(a,[],b)}else{try{b.call()}catch(k){d=k}a.call(b.prototype)}else{try{throw Error();}catch(k){d=k}a()}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return"\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Na(a):""}
function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return""}}
function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return"Fragment";case ta:return"Portal";case xa:return"Profiler";case wa:return"StrictMode";case Ba:return"Suspense";case Ca:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return(a.displayName||"Context")+".Consumer";case ya:return(a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1)}
function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function db(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function lb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var nb,ob=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else{nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a]})});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y(62));}}
function wb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb()}
function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb()}}
function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(y(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb)}catch(a){Pb=!1}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(n){this.onError(n)}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments)}
function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null}else throw Error(y(198));Ub||(Ub=!0,Vb=l)}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y(188));}
function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling}throw Error(y(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(y(189));}}if(c.alternate!==d)throw Error(y(190));}if(3!==c.tag)throw Error(y(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return!0;b=b.return}return!1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a,b,c,d,e){return{blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId)}}
function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return!1}
function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r.unstable_runWithPriority(a.priority,function(){gc(c)})});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift()}return!0}function zc(a,b,c){xc(a)&&c.delete(b)}
function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift()}null===a.blockedOn&&jc.shift()}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc)}
function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ac)))}
function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift()}
function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d])}}var Qc=r.unstable_now;Qc();var F=8;
function Rc(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
F=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y(358,a));}}
function Uc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F):(h&=f,0!==h&&(d=Rc(h),e=F))}else f=c&~g,0!==f?(d=Rc(f),e=F):0!==h&&(d=Rc(h),e=F);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F)return b;F=e}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d)}finally{(Kb=f)||Mb()}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d))}
function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else{var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else{if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d)}jd(a,b,d,null,c)}}}}
function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else{var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null}else f!==e&&(e=null)}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else{Kb=!0;try{Gb(a,b)}finally{Kb=!1,Mb()}}}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
function Je(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return!1;return!0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Ke(c)}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
function G(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d))}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null)}))}
function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h))}
function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Nb(function(){var d=f,e=xb(c),g=[];
a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u)}w=null}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else{J=De;var K=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
K.controlled&&"number"===h.type&&bb(h,"number",h.value)}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
case "compositionupdate":L="onCompositionUpdate";break b}L=void 0}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q)}se(g,b)})}function ef(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function nf(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""))}
function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var tf=0;function uf(a){return{$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[wf]||a[ff];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y(33));}function Db(a){return a[xf]||null}
function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return{current:a}}function H(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--)}function I(a,b){Af++;zf[Af]=a.current;a.current=b}var Cf={},M=Bf(Cf),N=Bf(!1),Df=Cf;
function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H(N);H(M)}function Hf(a,b,c){if(M.current!==Cf)throw Error(y(168));I(M,b);I(N,c)}
function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M.current;I(M,a);I(N,N.current);return!0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H(N),H(M),I(M,a)):H(N);I(N,c)}
var Lf=null,Mf=null,Nf=r.unstable_runWithPriority,Of=r.unstable_scheduleCallback,Pf=r.unstable_cancelCallback,Qf=r.unstable_shouldYield,Rf=r.unstable_requestPaint,Sf=r.unstable_now,Tf=r.unstable_getCurrentPriorityLevel,Uf=r.unstable_ImmediatePriority,Vf=r.unstable_UserBlockingPriority,Wf=r.unstable_NormalPriority,Xf=r.unstable_LowPriority,Yf=r.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O=1E4>dg?Sf:function(){return Sf()-dg};
function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a)}jg()}
function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null}
function rg(a){var b=mg.current;H(mg);a.type._context._currentValue=b}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null)}
function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null}}else og=og.next=b}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}
function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function zg(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k)}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f))}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y(191,e));e.call(d)}}}var Fg=(new aa.Component).refs;
function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Kg={isMounted:function(a){return(a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
b);Ag(a,e);Jg(a,d,c)}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null)}
function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4)}var Pg=Array.isArray;
function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y(309));var d=c.stateNode}if(!d)throw Error(y(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y(284));if(!c._owner)throw Error(y(290,a));}return a}
function Rg(a,b){if("textarea"!==a.type)throw Error(y(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
a.mode,c,null),b.return=a,b;Rg(a,b)}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d)}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y(150));h=l.call(h);if(null==
h)throw Error(y(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h)}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=
Wg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
function dh(a){if(a===$g)throw Error(y(174));return a}function eh(a,b){I(ch,b);I(bh,a);I(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a)}H(ah);I(ah,b)}function fh(){H(ah);H(bh);H(ch)}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I(bh,a),I(ah,c))}function hh(a){bh.current===a&&(H(ah),H(bh))}var P=Bf(0);
function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var jh=null,kh=null,lh=!1;
function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c)}jh=a;kh=rf(b.firstChild)}else a.flags=a.flags&-1025|2,lh=!1,jh=a}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a}
function rh(a){if(a!==jh)return!1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}kh=null}}else kh=jh?rf(a.stateNode.nextSibling):null;return!0}
function sh(){kh=jh=null;lh=!1}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R=null,S=null,T=null,yh=!1,zh=!1;function Ah(){throw Error(y(321));}function Bh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Ch(a,b,c,d,e,f){xh=f;R=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y(301));f+=1;T=S=null;b.updateQueue=null;vh.current=Fh;a=c(d,e)}while(zh)}vh.current=Gh;b=null!==S&&null!==S.next;xh=0;T=S=R=null;yh=!1;if(b)throw Error(y(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T?R.memoizedState=T=a:T=T.next=a;return T}
function Ih(){if(null===S){var a=R.alternate;a=null!==a?a.memoizedState:null}else a=S.next;var b=null===T?R.memoizedState:T.next;if(null!==b)T=b,S=a;else{if(null===a)throw Error(y(310));S=a;a={memoizedState:S.memoizedState,baseState:S.baseState,baseQueue:S.baseQueue,queue:S.queue,next:null};null===T?R.memoizedState=T=a:T=T.next=a}return T}function Jh(a,b){return"function"===typeof b?b(a):b}
function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=S,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else{var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R.lanes|=l;Dg|=l}k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y(350));}
function Nh(a,b,c,d){var e=U;if(null===e)throw Error(y(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes}catch(q){c(function(){throw q;})}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R,a);return[b.memoizedState,a]}
function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R.updateQueue;null===b?(b={lastEffect:null},R.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d)}
function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S){var g=S.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R.flags|=a;e.memoizedState=Rh(1|b,c,f,d)}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}
function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0)});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b()}finally{wh.transition=c}})}
function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R||null!==g&&g===R)zh=yh=!0;else{if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d)}}
var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R,a);return[d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return[a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y(355));}),c=Qh(b)[1];0===(R.mode&2)&&(R.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36))},
void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d)}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128}function li(a,b,c,d,e){var f=Ff(c)?Df:M.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b)}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1)}else{g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1)}return qi(a,b,c,d,f,e)}
function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo)}
var si={dehydrated:null,retryLane:0};
function ti(a,b,c){var d=b.pendingProps,e=P.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I(P,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b)}
function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f)}
function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else{if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(P,d);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}return null}var Bi,Ci,Di,Ei;
Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Ci=function(){};
Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf)}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",
c);var l=f;if(b.updateQueue=l)b.flags|=4}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4)};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H(N);H(M);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else{if(!d){if(null===
b.stateNode)throw Error(y(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G("cancel",d);G("close",d);break;case "iframe":case "object":case "embed":G("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G(Xe[a],d);break;case "source":G("error",d);break;case "img":case "image":case "link":G("error",d);G("load",d);break;case "details":G("toggle",d);break;case "input":Za(d,f);G("invalid",d);break;case "select":d._wrapperState=
{wasMultiple:!!f.multiple};G("invalid",d);break;case "textarea":hb(d,f),G("invalid",d)}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
jf)}d=a;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G("cancel",a);G("close",a);
e=d;break;case "iframe":case "object":case "embed":G("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G(Xe[e],a);e=d;break;case "source":G("error",a);e=d;break;case "img":case "image":case "link":G("error",a);G("load",a);e=d;break;case "details":G("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G("invalid",a);break;case "textarea":hb(a,d);e=
gb(a,d);G("invalid",a);break;default:e=d}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G("scroll",a):null!=k&&qa(a,f,k,g))}switch(c){case "input":Va(a);cb(a,d,!1);
break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf)}mf(c,d)&&(b.flags|=4)}null!==b.ref&&(b.flags|=128)}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(y(166));
c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d)}return null;case 13:H(P);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P.current&1))0===V&&(V=3);else{if(0===V||3===V)V=
4;null===U||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U,W)}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H(P);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else{if(0!==V||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I(P,P.current&1|2);return b.child}a=a.sibling}null!==d.tail&&O()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432)}else{if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g)}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O(),c.sibling=null,b=P.current,I(P,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y(156,b.tag));}
function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H(N);H(M);uh();b=a.flags;if(0!==(b&64))throw Error(y(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H(P),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H(P),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b)};return c}
function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Wi(a,c)}else b.current=null}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y(163));}
function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d()}a=a.next}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Eg(c,b,a)}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y(163));}
function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e)}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return}c.sibling.return=c.return;c=c.sibling}}
function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b)}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else{d=b;try{e()}catch(f){Wi(d,f)}}c=c.next}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount()}catch(f){Wi(b,
f)}break;case 5:Vi(b);break;case 4:cj(a,b)}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return}throw Error(y(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b)}
function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling}
function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling}
function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return}d=!0}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else{if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return}k.sibling.return=k.return;k=k.sibling}f?(g=e,h=c.stateNode,
8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode)}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1)}c.sibling.return=c.return;c=c.sibling}}
function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b)}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(y(162));b.stateNode.nodeValue=
b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X=0,U=null,Y=null,W=0,qj=0,rj=Bf(0),V=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O()+500}var Z=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X&48)?O():-1!==Fj?Fj:Fj=O()}
function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U&&(Hi|=b,4===V&&Ii(a,W));var d=eg();1===b?0!==(X&8)&&0===(X&48)?Lj(a):(Mj(a,c),0===X&&(wj(),ig())):(0===(X&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1}}else l<=b&&(a.expiredLanes|=k);g&=~k}d=Uc(a,a===U?W:0);b=F;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else{if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c)}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c}}
function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X&48))throw Error(y(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U?W:0);if(0===c)return null;var d=c;var e=X;X|=16;var f=Pj();if(U!==a||W!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h)}while(1);qg();oj.current=f;X=e;null!==Y?d=0:(U=null,W=0,d=V);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O()),b;a.finishedWork=
a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f}c=e;c=O()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y(329));}}Mj(a,O());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d}}
function Lj(a){if(0!==(X&48))throw Error(y(327));Oj();if(a===U&&0!==(a.expiredLanes&W)){var b=W;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b))}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O());return null}
function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O())})}ig()}function Wj(a,b){var c=X;X|=1;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function Xj(a,b){var c=X;X&=-2;X|=8;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function ni(a,b){I(rj,qj);qj|=b;tj|=b}function Ki(){qj=rj.current;H(rj)}
function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H(N);H(M);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H(P);break;case 19:H(P);break;case 10:rg(d);break;case 23:case 24:Ki()}c=c.return}U=a;Y=Tg(a.current,null);W=qj=tj=b;V=0;sj=null;uj=Hi=Dg=0}
function Sj(a,b){do{var c=Y;try{qg();vh.current=Gh;if(yh){for(var d=R.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}yh=!1}xh=0;T=S=R=null;zh=!1;pj.current=null;if(null===c||null===c.return){V=1;sj=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
(h.updateQueue=null,h.memoizedState=null)}var A=0!==(P.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else{var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else{var t=zg(-1,1);t.tag=2;Ag(h,t)}h.lanes|=1;break a}k=
void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v)}p.flags|=4096;p.lanes=b;break a}p=p.return}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==V&&(V=2);k=Mi(k,h);p=
g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return}while(null!==p)}Zj(c)}catch(va){b=va;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}
function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X;X|=16;var d=Pj();U===a&&W===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e)}while(1);qg();X=c;oj.current=d;if(null!==Y)throw Error(y(261));U=null;W=0;return V}function ak(){for(;null!==Y;)bk(Y)}function Rj(){for(;null!==Y&&!Qf();)bk(Y)}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y=b;pj.current=null}
function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b))}else{c=Li(b);if(null!==c){c.flags&=2047;Y=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048)}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===V&&(V=5)}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
function dk(a,b){do Oj();while(null!==yj);if(0!==(X&48))throw Error(y(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l}null!==
Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U&&(Y=U=null,W=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X;X|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType}catch(va){h=null;
break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode}w=u}h=-1===A||-1===p?null:{start:A,end:p}}else h=null;h=h||{start:0,end:0}}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z=d;do try{ek()}catch(va){if(null===
Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Ij=null;Z=d;do try{for(g=a;null!==Z;){var t=Z.flags;t&16&&pb(Z.stateNode,"");if(t&128){var q=Z.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null)}}switch(t&1038){case 2:fj(Z);Z.flags&=-3;break;case 6:fj(Z);Z.flags&=-3;ij(Z.alternate,Z);break;case 1024:Z.flags&=-1025;break;case 1028:Z.flags&=-1025;ij(Z.alternate,Z);break;case 4:ij(Z.alternate,Z);break;case 8:h=Z;cj(g,h);var J=h.alternate;dj(h);null!==
J&&dj(J)}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top}fd=!!kf;lf=kf=null;a.current=c;Z=d;do try{for(t=a;null!==Z;){var K=Z.flags;K&36&&Yi(t,Z.alternate,Z);if(K&128){q=void 0;var Q=Z.ref;if(null!==Q){var L=Z.stateNode;switch(Z.tag){case 5:q=L;break;default:q=L}"function"===typeof Q?Q(q):Q.current=q}}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Z=null;$f();X=e}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z=d;null!==Z;)b=
Z.nextEffect,Z.nextEffect=null,Z.flags&8&&(K=Z,K.sibling=null,K.stateNode=null),Z=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64))}catch(va){}Mj(a,O());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X&8))return null;ig();return null}
function ek(){for(;null!==Z;){var a=Z.alternate;Jj||null===Ij||(0!==(Z.flags&8)?dc(Z,Ij)&&(Jj=!0):13===Z.tag&&mj(a,Z)&&dc(Z,Ij)&&(Jj=!0));var b=Z.flags;0!==(b&256)&&Xi(a,Z);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z=Z.nextEffect}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return!1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}
function fk(){if(null===yj)return!1;var a=yj;yj=null;if(0!==(X&48))throw Error(y(331));var b=X;X|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
null,h.stateNode=null),h=a;X=b;ig();return!0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b))}
function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a)}catch(f){}break}}c=c.return}}
function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U===a&&(W&c)===c&&(4===V||3===V&&(W&62914560)===W&&500>O()-jj?Qj(a,0):uj|=c);Mj(a,b)}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c))}var ck;
ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else{ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I(P,P.current&1);b=hi(a,b,c);return null!==
b?b.sibling:null}I(P,P.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I(P,P.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c)}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y(282));
d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else{e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling}else fi(a,b,d,c),sh();b=b.child}return b;case 5:return gh(b),null===a&&
ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=g}fi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y(156,b.tag));
};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null}
function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(y(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b)}function pk(){return null}
function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e)}this._internalRoot=c}
qk.prototype.render=function(a){lk(a,this._internalRoot,null,null)};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null})};function rk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a)}}lk(b,g,a,e)}else{f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a)}}Xj(function(){lk(b,g,a,e)})}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4)}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864)}};
gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c)}};hc=function(a,b){return b()};
yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y(90));Wa(d);ab(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Wj;
Hb=function(a,b,c,d,e){var f=X;X|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X=f,0===X&&(wj(),ig())}};Ib=function(){0===(X&49)&&(Vj(),Oj())};Jb=function(a,b){var c=X;X|=2;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.1",rendererPackageName:"react-dom"};
var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;exports.createPortal=uk;
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y(188));throw Error(y(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a,b){var c=X;if(0!==(c&48))return a(b);X|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X=c,ig()}};exports.hydrate=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!0,c)};
exports.render=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!rk(a))throw Error(y(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null})}),!0):!1};exports.unstable_batchedUpdates=Wj;exports.unstable_createPortal=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!rk(c))throw Error(y(200));if(null==a||void 0===a._reactInternals)throw Error(y(38));return tk(a,b,c,!1,d)};exports.version="17.0.1";


/***/ }),

/***/ 935:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(448);
} else {}


/***/ }),

/***/ 408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=__webpack_require__(418),n=60103,p=60106;exports.Fragment=60107;exports.StrictMode=60108;exports.Profiler=60114;var q=60109,r=60110,t=60112;exports.Suspense=60113;var u=60115,v=60116;
if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");exports.Fragment=w("react.fragment");exports.StrictMode=w("react.strict_mode");exports.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");exports.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy")}var x="function"===typeof Symbol&&Symbol.iterator;
function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return"function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState")};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return{$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
function K(a,b){return{$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return"object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d)}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
exports.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;P(a,function(){b++});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};exports.Component=C;exports.PureComponent=E;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g}return{$$typeof:n,type:a.type,
key:d,ref:k,props:e,_owner:h}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};exports.createElement=J;exports.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:t,render:a}};exports.isValidElement=L;
exports.lazy=function(a){return{$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};exports.memo=function(a,b){return{$$typeof:u,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return S().useCallback(a,b)};exports.useContext=function(a,b){return S().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return S().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return S().useMemo(a,b)};exports.useReducer=function(a,b,c){return S().useReducer(a,b,c)};exports.useRef=function(a){return S().useRef(a)};exports.useState=function(a){return S().useState(a)};exports.version="17.0.1";


/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(408);
} else {}


/***/ }),

/***/ 53:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v0.20.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}
if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0))};g=function(a,b){u=setTimeout(a,b)};h=function(){clearTimeout(u)};exports.unstable_shouldYield=function(){return!1};k=exports.unstable_forceFrameRate=function(){}}else{var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null)}catch(b){throw G.postMessage(null),b;}}else A=!1};f=function(a){B=a;A||(A=!0,G.postMessage(null))};g=function(a,b){C=
x(function(){a(exports.unstable_now())},b)};h=function(){y(C);C=-1}}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M)}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else{var b=J(M);null!==b&&g(U,b.startTime-a)}}
function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b)}else K(L);O=J(L)}if(null!==O)var m=!0;else{var n=J(M);null!==n&&g(U,n.startTime-b);m=!1}return m}finally{O=null,P=c,Q=!1}}var W=k;exports.unstable_IdlePriority=5;
exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V))};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P}var c=P;P=b;try{return a()}finally{P=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=P;P=a;try{return b()}finally{P=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c}}};


/***/ }),

/***/ 840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(53);
} else {}


/***/ }),

/***/ 735:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(__webpack_require__(294));
var Jumbotron_1 = __importDefault(__webpack_require__(151));
var Container_1 = __importDefault(__webpack_require__(682));
var Alert_1 = __importDefault(__webpack_require__(236));
var Form_1 = __importDefault(__webpack_require__(548));
function App() {
    var _this = this;
    var _a = react_1.useState(''), result = _a[0], setResult = _a[1];
    var _b = react_1.useState([]), errors = _b[0], setErrors = _b[1];
    var addError = function (error) {
        setErrors(function (errors) { return __spreadArrays(errors, [error]); });
    };
    react_1.useEffect(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var loadNazuki, nazuki, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(992)); })];
                    case 1:
                        loadNazuki = (_b.sent()).loadNazuki;
                        return [4 /*yield*/, loadNazuki()];
                    case 2:
                        nazuki = _b.sent();
                        _a = setResult;
                        return [4 /*yield*/, nazuki.generate(10)];
                    case 3:
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        }); })()["catch"](function (err) {
            addError("" + err);
        });
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Jumbotron_1["default"], null,
            react_1["default"].createElement("h1", null, "Nazuki"),
            react_1["default"].createElement("p", null, "[WIP] Compiler Infrastructure for Brainfuck")),
        react_1["default"].createElement(Container_1["default"], null,
            react_1["default"].createElement("div", null, errors.map(function (error, idx) { return (react_1["default"].createElement(Alert_1["default"], { key: idx, variant: "danger" }, error)); })),
            react_1["default"].createElement(Form_1["default"].Control, { as: "textarea", readOnly: true, className: "text-monospace", style: { wordBreak: 'break-all', height: '10rem' }, value: result }),
            react_1["default"].createElement("p", null, result.length))));
}
exports.default = App;


/***/ }),

/***/ 429:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(__webpack_require__(294));
var react_dom_1 = __importDefault(__webpack_require__(935));
__webpack_require__(318);
var App_1 = __importDefault(__webpack_require__(735));
react_dom_1["default"].render(react_1["default"].createElement(App_1["default"], null), document.getElementById('app'));


/***/ }),

/***/ 992:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loadNazuki = void 0;
// @ts-ignore
var rts = __importStar(__webpack_require__(351));
// @ts-ignore
var nazuki_wasm_1 = __importDefault(__webpack_require__(675));
// @ts-ignore
var nazuki_req_mjs_1 = __importDefault(__webpack_require__(147));
function loadNazuki() {
    return __awaiter(this, void 0, void 0, function () {
        var res, bytes, module, instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(nazuki_wasm_1["default"])];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.arrayBuffer()];
                case 2:
                    bytes = _a.sent();
                    return [4 /*yield*/, WebAssembly.compile(bytes)];
                case 3:
                    module = _a.sent();
                    return [4 /*yield*/, rts.newAsteriusInstance(Object.assign(nazuki_req_mjs_1["default"], { module: module }))];
                case 4:
                    instance = _a.sent();
                    return [2 /*return*/, {
                            generate: instance.exports.generate,
                        }];
            }
        });
    });
}
exports.loadNazuki = loadNazuki;


/***/ }),

/***/ 473:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ 147:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ nazuki_req
});

// CONCATENATED MODULE: ./out/default.mjs
/**
 * @file Implements browser-specific functionality.
 */

class Posix {
  constructor(memory, rtsConstants) {
    this.memory = memory;
    Object.seal(this);
  }
  getProgArgv(argc, argv_buf) {
    this.memory.i64Store(argc, 1);
  }
  get_errno() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: get_errno");
  }
  set_errno() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: set_errno");
  }
  open() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: open");
  }
  close() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: close");
  }
  ftruncate() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: ftruncate");
  }
  stat() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: stat");
  }
  fstat() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: fstat");
  }
  opendir() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: opendir");
  }
  readdir() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: readdir");
  }
  closedir() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: closedir");
  }
  getenv() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: getenv");
  }
  access() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: access");
  }
  getcwd() {
    throw WebAssembly.RuntimeError("Unsupported rts interface: getcwd");
  }
}

/* harmony default export */ const out_default = ({
  /**
   * A custom Time interface, used in {@link TimeCBits}.
   */
  Time: {
    /**
     * Returns the current timestamp, where 0 represents
     * the time origin of the document.
     * @returns A [seconds, nanoseconds] Array.
     */
    getCPUTime: () => {
      const ms = performance.now(),
            s = Math.floor(ms / 1000.0),
            ns = Math.floor(ms - s * 1000) * 1000000;
      return [s, ns];
    },
    /**
     * Returns the current timestamp, where 0 represents UNIX Epoch.
     * @returns A [seconds, nanoseconds] Array.
     */
    getUnixEpochTime: () => {
      const ms = Date.now(),
            s = Math.floor(ms / 1000.0),
            ns = Math.floor(ms - s * 1000) * 1000000;
      return [s, ns];
    },
    /**
     * The resolution of the timestamps in nanoseconds.
     * Note! Due to the Spectre attack, browsers do not
     * provide high-resolution timestamps anymore.
     * See https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
     * and https://spectreattack.com.
     * We fallback to a resolution of 1ms.
     */
    resolution: 1000000
  },
  posix: Posix
});

// CONCATENATED MODULE: ./out/nazuki.req.mjs

/* harmony default export */ const nazuki_req = ({progName: "Lib", jsffiFactory: __asterius_jsffi=>({jsffi: {__asterius_jsffi_basezuAsteriusziTypesziJSException_acaMS:($1)=>{$1 = __asterius_jsffi.getJSVal($1);return __asterius_jsffi.newJSVal($1.stack ? $1.stack : `${$1}`);},__asterius_jsffi_basezuAsteriusziTypesziJSString_ac7d4:($1)=>{$1 = __asterius_jsffi.getJSVal($1);return __asterius_jsffi.newJSVal($1[0]);},__asterius_jsffi_basezuAsteriusziTypesziJSString_ac7dj:($1,$2)=>{$1 = __asterius_jsffi.getJSVal($1);return ($1[0] += String.fromCodePoint($2));},__asterius_jsffi_basezuAsteriusziTypesziJSString_ac7dp:()=>{return __asterius_jsffi.newJSVal(['']);},__asterius_jsffi_basezuAsteriusziTypesziJSString_ac7dw:($1)=>{$1 = __asterius_jsffi.getJSVal($1);return ((() => { const r = $1.next(); return r.done ? 0 : (1 + r.value.codePointAt(0)); })());},__asterius_jsffi_basezuAsteriusziTypesziJSString_ac7dH:($1)=>{$1 = __asterius_jsffi.getJSVal($1);return __asterius_jsffi.newJSVal($1[Symbol.iterator]());},__asterius_jsffi_basezuAsteriusziTypesziJSVal_ac4Z5:($1)=>{return (__asterius_jsffi.freeJSVal($1));}}}), exportsStaticOffsets: [["generate",0x0002fa80,0x0000000000000006,0x0000000000000001,false]], functionsOffsetTable: Object.freeze({"barf":0xb8b}), staticsOffsetTable: Object.freeze({"MainCapability":0x0,"ghczmprim_GHCziTypes_ZC_con_info":0x480,"ghczmprim_GHCziTypes_Izh_con_info":0x500,"ghczmprim_GHCziTypes_ZMZN_closure":0x4a0,"ghczmprim_GHCziTypes_False_closure":0x700,"ghczmprim_GHCziTypes_True_closure":0x708,"base_AsteriusziTypesziJSException_mkJSException_closure":0x19228,"ghczmprim_GHCziTypes_Czh_con_info":0x1530,"base_GHCziPtr_Ptr_con_info":0x15d0,"stg_ARR_WORDS_info":0x1a5c0,"stg_WEAK_info":0x1e4e0,"stg_NO_FINALIZER_closure":0x1e4f8,"ghczmprim_GHCziTypes_Dzh_con_info":0x1610,"ghczmprim_GHCziTypes_Wzh_con_info":0x788,"stg_IND_info":0x1e598,"stg_marked_upd_frame_info":0x1eb48,"stg_WHITEHOLE_info":0x1e248,"stg_BLACKHOLE_info":0x1e5e0,"stg_raise_ret_info":0x1ec68,"base_AsteriusziTopHandler_runIO_closure":0x14770,"base_AsteriusziTopHandler_runNonIO_closure":0x147d0,"stg_DEAD_WEAK_info":0x1e520,"stg_STABLE_NAME_info":0x1eac8,"stg_raise_info":0x1ec80}), sptOffsetEntries: new Map([]), tableSlots: 5326, staticBytes: 195224, yolo: false, pic: false, defaultTableBase: 0x400, defaultMemoryBase: 0x400, consoleHistory: false, gcThreshold: 0x40, targetSpecificModule: out_default});


/***/ }),

/***/ 351:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "newAsteriusInstance": () => /* binding */ newAsteriusInstance
});

// NAMESPACE OBJECT: ./out/rts.constants.mjs
var rts_constants_namespaceObject = {};
__webpack_require__.r(rts_constants_namespaceObject);
__webpack_require__.d(rts_constants_namespaceObject, {
  "BF_PINNED": () => BF_PINNED,
  "block_size": () => block_size,
  "blocks_per_mblock": () => blocks_per_mblock,
  "clock_monotonic": () => clock_monotonic,
  "clock_realtime": () => clock_realtime,
  "dataTag": () => dataTag,
  "functionTag": () => functionTag,
  "hsTyCons": () => hsTyCons,
  "mblock_size": () => mblock_size,
  "mblock_size_log2": () => mblock_size_log2,
  "offset_Capability_r": () => offset_Capability_r,
  "offset_StgAP_STACK_fun": () => offset_StgAP_STACK_fun,
  "offset_StgAP_STACK_payload": () => offset_StgAP_STACK_payload,
  "offset_StgAP_STACK_size": () => offset_StgAP_STACK_size,
  "offset_StgAP_arity": () => offset_StgAP_arity,
  "offset_StgAP_fun": () => offset_StgAP_fun,
  "offset_StgAP_n_args": () => offset_StgAP_n_args,
  "offset_StgAP_payload": () => offset_StgAP_payload,
  "offset_StgArrBytes_bytes": () => offset_StgArrBytes_bytes,
  "offset_StgFunInfoExtraFwd_b": () => offset_StgFunInfoExtraFwd_b,
  "offset_StgFunInfoExtraFwd_fun_type": () => offset_StgFunInfoExtraFwd_fun_type,
  "offset_StgFunInfoExtraFwd_srt": () => offset_StgFunInfoExtraFwd_srt,
  "offset_StgFunInfoTable_f": () => offset_StgFunInfoTable_f,
  "offset_StgFunInfoTable_i": () => offset_StgFunInfoTable_i,
  "offset_StgIndStatic_indirectee": () => offset_StgIndStatic_indirectee,
  "offset_StgInd_indirectee": () => offset_StgInd_indirectee,
  "offset_StgInfoTable_layout": () => offset_StgInfoTable_layout,
  "offset_StgInfoTable_srt": () => offset_StgInfoTable_srt,
  "offset_StgInfoTable_type": () => offset_StgInfoTable_type,
  "offset_StgLargeBitmap_bitmap": () => offset_StgLargeBitmap_bitmap,
  "offset_StgLargeBitmap_size": () => offset_StgLargeBitmap_size,
  "offset_StgMVar_head": () => offset_StgMVar_head,
  "offset_StgMVar_tail": () => offset_StgMVar_tail,
  "offset_StgMVar_value": () => offset_StgMVar_value,
  "offset_StgMutArrPtrs_payload": () => offset_StgMutArrPtrs_payload,
  "offset_StgMutArrPtrs_ptrs": () => offset_StgMutArrPtrs_ptrs,
  "offset_StgPAP_arity": () => offset_StgPAP_arity,
  "offset_StgPAP_fun": () => offset_StgPAP_fun,
  "offset_StgPAP_n_args": () => offset_StgPAP_n_args,
  "offset_StgPAP_payload": () => offset_StgPAP_payload,
  "offset_StgRegTable_rCurrentNursery": () => offset_StgRegTable_rCurrentNursery,
  "offset_StgRegTable_rD1": () => offset_StgRegTable_rD1,
  "offset_StgRegTable_rF1": () => offset_StgRegTable_rF1,
  "offset_StgRegTable_rHpAlloc": () => offset_StgRegTable_rHpAlloc,
  "offset_StgRegTable_rR1": () => offset_StgRegTable_rR1,
  "offset_StgRegTable_rRet": () => offset_StgRegTable_rRet,
  "offset_StgRetFun_fun": () => offset_StgRetFun_fun,
  "offset_StgRetFun_payload": () => offset_StgRetFun_payload,
  "offset_StgRetFun_size": () => offset_StgRetFun_size,
  "offset_StgRetInfoTable_i": () => offset_StgRetInfoTable_i,
  "offset_StgRetInfoTable_srt": () => offset_StgRetInfoTable_srt,
  "offset_StgSelector_selectee": () => offset_StgSelector_selectee,
  "offset_StgSmallMutArrPtrs_payload": () => offset_StgSmallMutArrPtrs_payload,
  "offset_StgSmallMutArrPtrs_ptrs": () => offset_StgSmallMutArrPtrs_ptrs,
  "offset_StgStableName_header": () => offset_StgStableName_header,
  "offset_StgStableName_sn": () => offset_StgStableName_sn,
  "offset_StgStack_sp": () => offset_StgStack_sp,
  "offset_StgStack_stack": () => offset_StgStack_stack,
  "offset_StgStack_stack_size": () => offset_StgStack_stack_size,
  "offset_StgTSO_block_info": () => offset_StgTSO_block_info,
  "offset_StgTSO_id": () => offset_StgTSO_id,
  "offset_StgTSO_stackobj": () => offset_StgTSO_stackobj,
  "offset_StgTSO_what_next": () => offset_StgTSO_what_next,
  "offset_StgTSO_why_blocked": () => offset_StgTSO_why_blocked,
  "offset_StgThunkInfoTable_i": () => offset_StgThunkInfoTable_i,
  "offset_StgThunkInfoTable_srt": () => offset_StgThunkInfoTable_srt,
  "offset_StgThunk_payload": () => offset_StgThunk_payload,
  "offset_StgUpdateFrame_updatee": () => offset_StgUpdateFrame_updatee,
  "offset_StgWeak_cfinalizers": () => offset_StgWeak_cfinalizers,
  "offset_StgWeak_finalizer": () => offset_StgWeak_finalizer,
  "offset_StgWeak_key": () => offset_StgWeak_key,
  "offset_StgWeak_link": () => offset_StgWeak_link,
  "offset_StgWeak_value": () => offset_StgWeak_value,
  "offset_bdescr_blocks": () => offset_bdescr_blocks,
  "offset_bdescr_flags": () => offset_bdescr_flags,
  "offset_bdescr_free": () => offset_bdescr_free,
  "offset_bdescr_gen_no": () => offset_bdescr_gen_no,
  "offset_bdescr_link": () => offset_bdescr_link,
  "offset_bdescr_node": () => offset_bdescr_node,
  "offset_bdescr_start": () => offset_bdescr_start,
  "offset_first_bdescr": () => offset_first_bdescr,
  "offset_first_block": () => offset_first_block,
  "offset_stat_dev": () => offset_stat_dev,
  "offset_stat_ino": () => offset_stat_ino,
  "offset_stat_mode": () => offset_stat_mode,
  "offset_stat_mtime": () => offset_stat_mtime,
  "offset_stat_size": () => offset_stat_size,
  "offset_timespec_tv_nsec": () => offset_timespec_tv_nsec,
  "offset_timespec_tv_sec": () => offset_timespec_tv_sec,
  "pageSize": () => pageSize,
  "sizeof_StgAP": () => sizeof_StgAP,
  "sizeof_StgAP_STACK": () => sizeof_StgAP_STACK,
  "sizeof_StgArrBytes": () => sizeof_StgArrBytes,
  "sizeof_StgInd": () => sizeof_StgInd,
  "sizeof_StgIndStatic": () => sizeof_StgIndStatic,
  "sizeof_StgMutArrPtrs": () => sizeof_StgMutArrPtrs,
  "sizeof_StgPAP": () => sizeof_StgPAP,
  "sizeof_StgRetFun": () => sizeof_StgRetFun,
  "sizeof_StgSelector": () => sizeof_StgSelector,
  "sizeof_StgSmallMutArrPtrs": () => sizeof_StgSmallMutArrPtrs,
  "sizeof_StgStableName": () => sizeof_StgStableName,
  "sizeof_StgThunk": () => sizeof_StgThunk,
  "sizeof_bdescr": () => sizeof_bdescr,
  "sizeof_first_mblock": () => sizeof_first_mblock
});

// CONCATENATED MODULE: ./out/rts.setimmediate.mjs
// The content below is MIT licensed, adapted from
// https://github.com/YuzuJS/setImmediate

// Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic
// Denicola

(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
      return;
  }

  var nextHandle = 1; // Spec says greater than zero
  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    }
    // Copy function arguments
    var args = new Array(arguments.length - 1);
    for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i + 1];
    }
    // Store and register the task
    var task = { callback: callback, args: args };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
      delete tasksByHandle[handle];
  }

  function run(task) {
      var callback = task.callback;
      var args = task.args;
      switch (args.length) {
      case 0:
          callback();
          break;
      case 1:
          callback(args[0]);
          break;
      case 2:
          callback(args[0], args[1]);
          break;
      case 3:
          callback(args[0], args[1], args[2]);
          break;
      default:
          callback.apply(undefined, args);
          break;
      }
  }

  function runIfPresent(handle) {
      // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
      // So if we're currently running a task, we'll need to delay this invocation.
      if (currentlyRunningATask) {
          // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
          // "too much recursion" error.
          setTimeout(runIfPresent, 0, handle);
      } else {
          var task = tasksByHandle[handle];
          if (task) {
              currentlyRunningATask = true;
              try {
                  run(task);
              } finally {
                  clearImmediate(handle);
                  currentlyRunningATask = false;
              }
          }
      }
  }

  function installNextTickImplementation() {
      registerImmediate = function(handle) {
          process.nextTick(function () { runIfPresent(handle); });
      };
  }

  function canUsePostMessage() {
      // The test against `importScripts` prevents this implementation from being installed inside a web worker,
      // where `global.postMessage` means something completely different and can't be used for this purpose.
      if (global.postMessage && !global.importScripts) {
          var postMessageIsAsynchronous = true;
          var oldOnMessage = global.onmessage;
          global.onmessage = function() {
              postMessageIsAsynchronous = false;
          };
          global.postMessage("", "*");
          global.onmessage = oldOnMessage;
          return postMessageIsAsynchronous;
      }
  }

  function installPostMessageImplementation() {
      // Installs an event handler on `global` for the `message` event: see
      // * https://developer.mozilla.org/en/DOM/window.postMessage
      // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

      var messagePrefix = "setImmediate$" + Math.random() + "$";
      var onGlobalMessage = function(event) {
          if (event.source === global &&
              typeof event.data === "string" &&
              event.data.indexOf(messagePrefix) === 0) {
              runIfPresent(+event.data.slice(messagePrefix.length));
          }
      };

      if (global.addEventListener) {
          global.addEventListener("message", onGlobalMessage, false);
      } else {
          global.attachEvent("onmessage", onGlobalMessage);
      }

      registerImmediate = function(handle) {
          global.postMessage(messagePrefix + handle, "*");
      };
  }

  function installMessageChannelImplementation() {
      var channel = new MessageChannel();
      channel.port1.onmessage = function(event) {
          var handle = event.data;
          runIfPresent(handle);
      };

      registerImmediate = function(handle) {
          channel.port2.postMessage(handle);
      };
  }

  function installReadyStateChangeImplementation() {
      var html = doc.documentElement;
      registerImmediate = function(handle) {
          // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
          // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
          var script = doc.createElement("script");
          script.onreadystatechange = function () {
              runIfPresent(handle);
              script.onreadystatechange = null;
              html.removeChild(script);
              script = null;
          };
          html.appendChild(script);
      };
  }

  function installSetTimeoutImplementation() {
      registerImmediate = function(handle) {
          setTimeout(runIfPresent, 0, handle);
      };
  }

  // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

  // Don't get fooled by e.g. browserify environments.
  if ({}.toString.call(global.process) === "[object process]") {
      // For Node.js before 0.9
      installNextTickImplementation();

  } else if (canUsePostMessage()) {
      // For non-IE10 modern browsers
      installPostMessageImplementation();

  } else if (global.MessageChannel) {
      // For web workers, where supported
      installMessageChannelImplementation();

  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
      // For IE 6–8
      installReadyStateChangeImplementation();

  } else {
      // For older browsers
      installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self));

// CONCATENATED MODULE: ./out/rts.modulify.mjs
function modulify(obj) {
  return Object.entries(
    Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj))
  ).reduce(
    (acc, [k, descr]) =>
      k === "constructor" || descr.get
        ? acc
        : ((acc[k] = obj[k].bind(obj)), acc),
    {}
  );
}

// CONCATENATED MODULE: ./out/rts.reentrancy.mjs
class ReentrancyGuard {
  constructor(names) {
    this.names = names;
    this.flags = this.names.map(() => false);
    Object.freeze(this);
  }

  enter(i) {
    if (this.flags[i])
      throw new WebAssembly.RuntimeError(
        `ReentrancyGuard: ${this.names[i]} reentered!`
      );
    this.flags[i] = true;
  }

  exit(i) {
    this.flags[i] = false;
  }
}

// CONCATENATED MODULE: ./out/rts.eventlog.mjs
class Event {
  constructor(lv, ev) {
    this.time = new Date();
    this.level = lv;
    this.event = ev;
    Object.freeze(this);
  }
}

class EventLogManager {
  constructor() {
    this.events = [];
    this.enabled = true;
    this.onEvent = () => {};
    Object.seal(this);
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled(f) {
    this.enabled = Boolean(f);
  }

  log(lv, _ev) {
    if (this.enabled) {
      const ev = new Event(lv, _ev);
      this.events.push(ev);
      this.onEvent(ev);
    }
  }

  logInfo(ev) {
    this.log("INFO", ev);
  }

  logError(ev) {
    this.log("ERROR", ev);
  }

  logEvent(ev) {
    this.log("EVENT", ev);
  }
}

// CONCATENATED MODULE: ./out/rts.tracing.mjs
class Tracer {
  constructor(logger, symbol_table) {
    this.logger = logger;
    this.symbolLookupTable = {};
    for (const [k, v] of symbol_table.allEntries()) {
      this.symbolLookupTable[v] = k;
    }
    Object.freeze(this);
  }

  traceCmm(f) {
    this.logger.logInfo(["call", f, this.symbolLookupTable[f]]);
  }

  traceCmmBlock(f, lbl) {
    this.logger.logInfo(["br", f, this.symbolLookupTable[f], lbl]);
  }

  traceCmmSetLocal(f, i, v) {
    this.logger.logInfo([
      "set_local",
      f,
      this.symbolLookupTable[f],
      i,
      v,
      this.symbolLookupTable[v]
    ]);
  }
}

// CONCATENATED MODULE: ./out/rts.constants.mjs
const dataTag = 0x1ffff7;
const functionTag = 0x1fffed;
const mblock_size = 0x100000;
const mblock_size_log2 = 0x14;
const block_size = 0x1000;
const blocks_per_mblock = 0xfc;
const offset_timespec_tv_sec = 0x0;
const offset_timespec_tv_nsec = 0x8;
const sizeof_bdescr = 0x40;
const offset_first_bdescr = 0x100;
const offset_first_block = 0x4000;
const sizeof_first_mblock = 0xfc000;
const offset_bdescr_start = 0x0;
const offset_bdescr_free = 0x8;
const offset_bdescr_link = 0x10;
const offset_bdescr_gen_no = 0x28;
const offset_bdescr_node = 0x2c;
const offset_bdescr_flags = 0x2e;
const offset_bdescr_blocks = 0x30;
const BF_PINNED = 0x4;
const pageSize = 65536;
const offset_Capability_r = 0x18;
const sizeof_StgAP = 0x20;
const offset_StgAP_arity = 0x10;
const offset_StgAP_n_args = 0x14;
const offset_StgAP_fun = 0x18;
const offset_StgAP_payload = 0x20;
const sizeof_StgAP_STACK = 0x20;
const offset_StgAP_STACK_size = 0x10;
const offset_StgAP_STACK_fun = 0x18;
const offset_StgAP_STACK_payload = 0x20;
const sizeof_StgArrBytes = 0x10;
const offset_StgArrBytes_bytes = 0x8;
const offset_StgFunInfoExtraFwd_fun_type = 0x0;
const offset_StgFunInfoExtraFwd_srt = 0x8;
const offset_StgFunInfoExtraFwd_b = 0x10;
const offset_StgFunInfoTable_i = 0x0;
const offset_StgFunInfoTable_f = 0x18;
const sizeof_StgInd = 0x10;
const offset_StgInd_indirectee = 0x8;
const sizeof_StgIndStatic = 0x20;
const offset_StgIndStatic_indirectee = 0x8;
const offset_StgInfoTable_layout = 0x8;
const offset_StgInfoTable_type = 0x10;
const offset_StgInfoTable_srt = 0x14;
const offset_StgLargeBitmap_size = 0x0;
const offset_StgLargeBitmap_bitmap = 0x8;
const sizeof_StgMutArrPtrs = 0x18;
const offset_StgMutArrPtrs_ptrs = 0x8;
const offset_StgMutArrPtrs_payload = 0x18;
const offset_StgMVar_head = 0x8;
const offset_StgMVar_tail = 0x10;
const offset_StgMVar_value = 0x18;
const sizeof_StgPAP = 0x18;
const offset_StgPAP_arity = 0x8;
const offset_StgPAP_n_args = 0xc;
const offset_StgPAP_fun = 0x10;
const offset_StgPAP_payload = 0x18;
const offset_StgRegTable_rR1 = 0x0;
const offset_StgRegTable_rF1 = 0x50;
const offset_StgRegTable_rD1 = 0x68;
const offset_StgRegTable_rCurrentNursery = 0x378;
const offset_StgRegTable_rHpAlloc = 0x388;
const offset_StgRegTable_rRet = 0x390;
const sizeof_StgRetFun = 0x18;
const offset_StgRetFun_size = 0x8;
const offset_StgRetFun_fun = 0x10;
const offset_StgRetFun_payload = 0x18;
const offset_StgRetInfoTable_i = 0x0;
const offset_StgRetInfoTable_srt = 0x18;
const sizeof_StgSelector = 0x18;
const offset_StgSelector_selectee = 0x10;
const sizeof_StgSmallMutArrPtrs = 0x10;
const offset_StgSmallMutArrPtrs_ptrs = 0x8;
const offset_StgSmallMutArrPtrs_payload = 0x10;
const sizeof_StgThunk = 0x10;
const offset_StgThunk_payload = 0x10;
const offset_StgThunkInfoTable_i = 0x0;
const offset_StgThunkInfoTable_srt = 0x18;
const offset_StgTSO_id = 0x30;
const offset_StgTSO_stackobj = 0x18;
const offset_StgTSO_what_next = 0x20;
const offset_StgTSO_why_blocked = 0x22;
const offset_StgTSO_block_info = 0x28;
const offset_StgStack_stack_size = 0x8;
const offset_StgStack_sp = 0x10;
const offset_StgStack_stack = 0x18;
const offset_StgUpdateFrame_updatee = 0x8;
const offset_StgWeak_cfinalizers = 0x8;
const offset_StgWeak_key = 0x10;
const offset_StgWeak_value = 0x18;
const offset_StgWeak_finalizer = 0x20;
const offset_StgWeak_link = 0x28;
const sizeof_StgStableName = 0x10;
const offset_StgStableName_header = 0x0;
const offset_StgStableName_sn = 0x8;
const offset_stat_mtime = 0x58;
const offset_stat_size = 0x30;
const offset_stat_mode = 0x18;
const offset_stat_dev = 0x0;
const offset_stat_ino = 0x8;
const clock_monotonic = 0x1;
const clock_realtime = 0x0;
const hsTyCons = ["JSVal","Bool","Char","Double","Float","Int","Int8","Int16","Int32","Int64","Word","Word8","Word16","Word32","Word64","StablePtr","Ptr","FunPtr"];

// CONCATENATED MODULE: ./out/rts.memory.mjs


function checkNullAndTag(p) {
  if (!p) {
    throw new WebAssembly.RuntimeError(`Allocator returned NULL`);
  }
  return Memory.tagData(p);
}

/**
 * Class acting as the low-level interface to Wasm memory.
 * It mainly provides methods to load/store data in memory
 * (e.g. {@link Memory#i64Load}, {@link Memory#i64Store}),
 * static methods to handle pointer tagging (e.g. {@link Memory#getTag},
 * {@link Memory#getDynTag}), and a MBlock allocator
 * ({@link Memory#getMBlocks} and {@link Memory#freeMBlocks}).
 */
class Memory {
  constructor(components) {
    this.components = components;

    /**
     * The underlying Wasm Memory instance.
     * @name Memory#memory
     */
    this.memory = undefined;
    /**
     * The number of MBlock slots reserved for
     * the static part of memory (vs the dynamic part
     * where heap objects are allocated at runtime).
     * The static MBlocks contain the initial compiled
     * Wasm code plus auxiliary static data structures
     * like info tables.
     * @name Memory#staticMBlocks
     */
    this.staticMBlocks = undefined;
    /**
     * Low-level interfaces for reading/writing the contents
     * of {@link Memory#memory}.
     * @name Memory#i8view
     * @name Memory#dataView
     */
    Object.seal(this);
  }

  get i8View() {
    return new Uint8Array(this.memory.buffer);
  }

  get dataView() {
    return new DataView(this.memory.buffer);
  }

  /**
   * Initializes the {@link Memory} object.
   */
  init(memory, static_mblocks) {
    this.memory = memory;
    this.staticMBlocks = static_mblocks;
  }

  static unTag(p) {
    return Number(p) & 0xffffffff;
  }

  static getTag(p) {
    //return Number(BigInt(p) >> BigInt(32));
    return Math.floor(Number(p) / 2 ** 32);
  }

  static tagData(p) {
    return dataTag * 2 ** 32 + Number(p);
  }

  static tagFunction(p) {
    return functionTag * 2 ** 32 + Number(p);
  }

  static unDynTag(p) {
    const np = Number(p);
    return np - (np & 7);
  }

  static getDynTag(p) {
    return Number(p) & 7;
  }

  static setDynTag(p, t) {
    const np = Number(p);
    return np - (np & 7) + t;
  }

  i8Load(p) {
    return this.i8View[Memory.unTag(p)];
  }

  i8Store(p, v) {
    this.i8View[Memory.unTag(p)] = Number(v);
  }

  i16Load(p) {
    return this.dataView.getUint16(Memory.unTag(p), true);
  }

  i16Store(p, v) {
    this.dataView.setUint16(Memory.unTag(p), Number(v), true);
  }

  i32Load(p) {
    return this.dataView.getUint32(Memory.unTag(p), true);
  }

  i32Store(p, v) {
    this.dataView.setUint32(Memory.unTag(p), Number(v), true);
  }

  i64Load(p) {
    return this.dataView.getBigUint64(Memory.unTag(p), true);
  }

  i64Store(p, v) {
    this.dataView.setBigUint64(Memory.unTag(p), BigInt(v), true);
  }

  f32Load(p) {
    return this.dataView.getFloat32(Memory.unTag(p), true);
  }

  f32Store(p, v) {
    this.dataView.setFloat32(Memory.unTag(p), Number(v), true);
  }

  f64Load(p) {
    return this.dataView.getFloat64(Memory.unTag(p), true);
  }

  f64Store(p, v) {
    this.dataView.setFloat64(Memory.unTag(p), Number(v), true);
  }

  i32LoadS8(p) {
    return this.dataView.getInt8(Memory.unTag(p));
  }

  i32LoadU8(p) {
    return this.dataView.getUint8(Memory.unTag(p));
  }

  i32LoadS16(p) {
    return this.dataView.getInt16(Memory.unTag(p), true);
  }

  i32LoadU16(p) {
    return this.dataView.getUint16(Memory.unTag(p), true);
  }

  i64LoadS8(p) {
    return BigInt(this.dataView.getInt8(Memory.unTag(p)));
  }

  i64LoadU8(p) {
    return BigInt(this.dataView.getUint8(Memory.unTag(p)));
  }

  i64LoadS16(p) {
    return BigInt(this.dataView.getInt16(Memory.unTag(p), true));
  }

  i64LoadU16(p) {
    return BigInt(this.dataView.getUint16(Memory.unTag(p), true));
  }

  /**
   * Checks whether the object at address {@param p} is
   * heap-allocated, i.e. whether it resides in the dynamic
   * part of the memory. Used during garbage collection
   * (in {@link GC#evacuateClosure}) to avoid evacuating
   * objects in the static MBlocks.
   */
  heapAlloced(p) {
    return (
      Memory.unTag(p) >= this.staticMBlocks << mblock_size_log2
    );
  }

  /**
   * Obtains {@param n} MBlocks from {@link Memory#memory}.
   * @returns The memory address at the beginning of the
   *   requested free memory area.
   */
  getMBlocks(n) {
    return checkNullAndTag(
      this.components.exports.aligned_alloc(
        mblock_size,
        mblock_size * n
      )
    );
  }

  /**
   * Frees MBlocks starting at address {@param p}.
   */
  freeMBlocks(p) {
    this.components.exports.free(Memory.unTag(p));
  }

  expose(p, len, t) {
    return new t(this.memory.buffer, Memory.unTag(p), len);
  }

  strlen(_str) {
    return this.components.exports.strlen(Memory.unTag(_str));
  }

  strLoad(_str) {
    let p = Memory.unTag(_str);
    let s = "";
    let i = 0;

    while (1) {
      let c = this.i8View[p + i];
      if (c == 0) {
        return s;
      }
      s += String.fromCharCode(c);
      i++;
    }
  }

  memchr(_ptr, val, num) {
    return Memory.tagData(
      this.components.exports.memchr(Memory.unTag(_ptr), val, num)
    );
  }

  memcpy(_dst, _src, n) {
    return Memory.tagData(
      this.components.exports.memcpy(Memory.unTag(_dst), Memory.unTag(_src), n)
    );
  }

  memset(_dst, c, n, size = 1) {
    // We only allow 1, 2, 4, 8. Any other size should get a runtime error.
    const ty = {
      1: Uint8Array,
      2: Uint16Array,
      4: Uint32Array,
      8: BigUint64Array,
    };
    const buf = this.expose(_dst, n, ty[size]);

    if (size === 8) {
      // TODO: The conversion BigInt(c) is lossy. Numbers are represented as
      // IEEE754 double precision floating point numbers, for which the maximum
      // (representable) safe integer in JavaScript is (Number.MAX_SAFE_INTEGER
      // = 2^53 - 1).
      buf.fill(BigInt(c));
    } else {
      buf.fill(c);
    }
  }

  memsetFloat32(_dst, c, n) {
    const buf = this.expose(_dst, n, Float32Array);
    buf.fill(c);
  }

  memsetFloat64(_dst, c, n) {
    const buf = this.expose(_dst, n, Float64Array);
    buf.fill(c);
  }
}

// CONCATENATED MODULE: ./out/rts.memorytrap.mjs



function showI64(x) {
  return `0x${x.toString(16)}`;
}

class MemoryTrap {
  constructor(logger, symbol_table, memory) {
    this.logger = logger;
    this.symbolLookupTable = new Map();
    for (const [k, v] of symbol_table.allEntries()) {
      this.symbolLookupTable.set(v, k);
    }
    this.memory = memory;
    Object.freeze(this);
  }

  trap(sym, p) {
    const tag = Memory.getTag(p);
    if (tag != dataTag) {
      const err = new WebAssembly.RuntimeError(
        `Invalid address ${showI64(p)} accessed in ${this.symbolLookupTable.get(
          Number(sym)
        )}`
      );
      this.logger.logError(err);
      throw err;
    }
  }

  loadI8(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i8Load(p);
  }

  loadI16(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i16Load(p);
  }

  loadI32(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i32Load(p);
  }

  loadI64(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i64Load(p);
  }

  loadI32S8(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i32LoadS8(p);
  }

  loadI32U8(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i32LoadU8(p);
  }

  loadI32S16(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i32LoadS16(p);
  }

  loadI32U16(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i32LoadU16(p);
  }

  loadI64S8(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i64LoadS8(p);
  }

  loadI64U8(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i64LoadU8(p);
  }

  loadI64S16(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i64LoadS16(p);
  }

  loadI64U16(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.i64LoadU16(p);
  }

  loadF32(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.f32Load(p);
  }

  loadF64(sym, bp, o) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    return this.memory.f64Load(p);
  }

  storeI8(sym, bp, o, v) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    this.memory.i8Store(p, v);
  }

  storeI16(sym, bp, o, v) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    this.memory.i16Store(p, v);
  }

  storeI32(sym, bp, o, v) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    this.memory.i32Store(p, v);
  }

  storeI64(sym, bp, o, v) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    this.memory.i64Store(p, v);
  }

  storeF32(sym, bp, o, v) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    this.memory.f32Store(p, v);
  }

  storeF64(sym, bp, o, v) {
    const p = bp + BigInt(o);
    this.trap(sym, p);
    this.memory.f64Store(p, v);
  }
}

// CONCATENATED MODULE: ./out/rts.heapalloc.mjs


/**
 * Class implementing the allocation of nurseries,
 * and also individual heap objects.
 * In the asterius RTS - contrary to GHC - we don't
 * really distinguish between "blocks" and "MBlocks"
 * ("megablocks", "em-blocks"); here all blocks are
 * really MBlocks. MBlocks have a fixed size of 1MiB
 * and are allocated by {@link Memory}. Moreover,
 * MBlocks can be chained to form MegaGroups.
 * For more information on (mega)block allocation, see
 * {@link https://gitlab.haskell.org/ghc/ghc/wikis/commentary/rts/storage/block-alloc}.
 */
class HeapAlloc {
  constructor(memory) {
    /**
     * @type Memory
     * @name HeapAlloc#memory
     */
    this.memory = memory;
    /**
     * An array with two entries:
     * 1. The unpinned pool, i.e. the address of the
     *    block descriptor for the MBlock where
     *    unpinned objects are allocated,
     * 2. The pinned pool, i.e. the address of the
     *    block descriptor for the MBlock where
     *    pinned objects are allocated.
     * @name HeapAlloc#currentPools
     */
    this.currentPools = [undefined, undefined];
    /**
     * An array containing the addresses of
     * the (block descriptors of the) MBlocks
     * allocated for each generation.
     * @name HeapAlloc#generations
     */
    this.generations = new Array(2); // 2 generations
    /**
     * The set of all currently allocated MegaGroups.
     */
    this.mgroups = new Set();
    Object.freeze(this);
  }

  /**
   * Initializes the pinned & unpinned pools.
   */
  init() {
    this.setGenerationNo(0);
    this.currentPools[1] = this.allocMegaGroup(1, true);
  }
  /**
   * Sets the current generation number, so that new closures and
   * MBlocks are allocated in the right space and with correct flag.
   * @param {number} gen_no The generation number
   * @param {boolean} [forceNewAlloc=true] Force the allocation
   *   of a new MBlock.
   */
  setGenerationNo(gen_no, forceNewAlloc=true) {
    let pool = this.generations[gen_no];
    if (forceNewAlloc || !pool) {
      pool = this.allocMegaGroup(1, false, gen_no);
      this.generations[gen_no] = pool;
    }
    this.currentPools[0] = pool;
  }

  /**
   * Allocates a new MegaGroup of enough MBlocks to
   * accommodate the supplied amount of bytes.
   * @param b The number of bytes to allocate
   * @param pinned Whether the MBlocks should be pinned
   * @param gen_no The generation number
   * @returns The address of the block descriptor
   *  of the first MBlock of the MegaGroup.
   */
  hpAlloc(b, pinned=false, gen_no=0) {
    const mblocks =
        b <= sizeof_first_mblock
          ? 1
          : 1 +
            Math.ceil(
              (b - sizeof_first_mblock) / mblock_size
            ),
      bd = this.allocMegaGroup(mblocks, pinned, gen_no);
    return bd;
  }

  /**
   * Allocates enough blocks to accommodate the given number
   * of words in the appropriate pool.
   * @param n The number of (64 bit) words to allocate
   * @param pinned Whether to allocate in the pinned pool
   */
  allocate(n, pinned = false) {
    const b = n << 3; // The size in bytes
    // Large objects are forced to be pinned as well
    // (by large, we mean >= 4KiB):
    pinned = pinned || b >= block_size;
    let pool = this.currentPools[Number(pinned)],
      current_start = Number(
        this.memory.i64Load(pool + offset_bdescr_start)
      ),
      current_free = Number(
        this.memory.i64Load(pool + offset_bdescr_free)
      );
    const current_blocks = this.memory.i32Load(
        pool + offset_bdescr_blocks
      ),
      current_limit = current_start + block_size * current_blocks,
      new_free = current_free + b;

    if (new_free <= current_limit) {
      // if the pool has enough space
      this.memory.i64Store(
        pool + offset_bdescr_free,
        new_free
      );
    } else {
      // not enough space in the corresponding pool,
      // allocate a new one
      if (pinned) {
        pool = this.hpAlloc(b, true);
        this.currentPools[1] = pool;
      } else {
        const gen_no = this.memory.i16Load(pool + offset_bdescr_gen_no);
        pool = this.hpAlloc(b, false, gen_no);
        this.currentPools[0] = pool;
        this.generations[gen_no] = pool;
      }
      current_free = Number(
        this.memory.i64Load(
          pool + offset_bdescr_free
        )
      );
      this.memory.i64Store(
        pool + offset_bdescr_free,
        current_free + b
      );
    }
    return current_free;
  }

  /**
   * Allocates the given number of words in the pinned pool.
   * @param n The number of (64 bit) words to allocate
   */
  allocatePinned(n) {
    return this.allocate(n, true);
  }

  /**
   * Allocates a new MegaGroup of size the supplied number of MBlocks.
   * @param n The number of requested MBlocks
   * @param pinned Whether the MBlocks should be pinned
   * @param gen_no The generation number
   * @return The address of the block descriptor
   *  of the first MBlock of the MegaGroup
   */
  allocMegaGroup(n, pinned=false, gen_no=0) {
    const req_blocks =
        (mblock_size * n - offset_first_block) /
        block_size,
      mblock = this.memory.getMBlocks(n),
      bd = mblock + offset_first_bdescr,
      block_addr = mblock + offset_first_block;
    this.memory.i64Store(bd + offset_bdescr_start, block_addr);
    this.memory.i64Store(bd + offset_bdescr_free, block_addr);
    this.memory.i64Store(bd + offset_bdescr_link, 0);
    this.memory.i16Store(bd + offset_bdescr_node, n);
    this.memory.i32Store(bd + offset_bdescr_blocks, req_blocks);
    this.memory.i16Store(
      bd + offset_bdescr_flags,
      pinned ? BF_PINNED : 0
    );
    this.memory.i16Store(bd + offset_bdescr_gen_no, gen_no);
    this.mgroups.add(bd);
    return bd;
  }

  /**
   * Frees the garbage MBlocks by taking into account the
   * information on live and dead MBlocks passed by the
   * garbage collector. Used by {@link GC#performGC}.
   * @param live_mblocks The set of current live MBlocks
   * @param live_mblocks The set of current dead MBlocks
   * @param major Whether this info comes from a minor or major GC
   */
  handleLiveness(live_mblocks, dead_mblocks, major=true) {
    for (const bd of live_mblocks) {
      if (!this.mgroups.has(bd)) {
        throw new WebAssembly.RuntimeError(
          `Invalid live mblock 0x${bd.toString(16)}`
        );
      }
    }
    // Free MBlocks that have been copied during GC
    for (const bd of dead_mblocks) {
      if (!this.mgroups.has(bd)) {
        throw new WebAssembly.RuntimeError(
          `Invalid dead mblock 0x${bd.toString(16)}`
        );
      }
      this.mgroups.delete(bd);
      const p = bd - offset_first_bdescr;
      this.memory.freeMBlocks(p);
    }

    // Free unreachable MBlocks
    for (const bd of Array.from(this.mgroups)) {
      if (!live_mblocks.has(bd)) {
        const
          gen_no = this.memory.i16Load(bd + offset_bdescr_gen_no),
          pinned = Boolean(
            this.memory.i16Load(bd + offset_bdescr_flags) & BF_PINNED
          );
        // Note: not all unreachable MBlocks can be
        // freed during a minor collection. This is because
        // pinned MBlocks or older MBlocks may look unreachable
        // since only the pointers to younger generations
        // are stored in the remembered set.
        if(major || (!pinned && gen_no == 0)) {
          this.mgroups.delete(bd);
          const p = bd - offset_first_bdescr,
            n = this.memory.i16Load(bd + offset_bdescr_node);
          this.memory.freeMBlocks(p, n);
        }
      }
    }
    // Reallocate pinned pool if the current has been freed
    if (!this.mgroups.has(this.currentPools[1])) {
      this.currentPools[1] = this.allocMegaGroup(1, true);
    }
    // Reinitialize generations if necessary
    for (let i=0; i < this.generations.length; i++)
      if (!this.mgroups.has(this.generations[i])) {
        this.generations[i] = undefined;
      }
  }

  /**
   * Estimates the size of living objects by counting the number
   * of MBlocks that were allocated by {@link GC#getMBlocks}
   * some time ago, but have not been yet been freed by {@link GC#freeMBlocks}.
   * @returns The number of allocated MBlocks
   */
  liveSize() {
    let acc = 0;
    for (const bd of this.mgroups) {
      acc += this.memory.i16Load(bd + offset_bdescr_node);
    }
    return acc;
  }
}

// CONCATENATED MODULE: ./out/rts.stableptr.mjs
class StablePtrManager {
  constructor() {
    this.spt = new Map();
    this.lasts = [0, 0];
    Object.freeze(this);
  }

  newWithTag(v, tag) {
    const sp = (++this.lasts[tag] << 1) | tag;
    this.spt.set(sp, v);
    return sp;
  }

  newStablePtr(addr) {
    return this.newWithTag(addr, 0);
  }

  deRefStablePtr(sp) {
    return this.spt.get(sp);
  }

  freeStablePtr(sp) {
    this.spt.delete(sp);
  }

  newJSVal(v) {
    return this.newWithTag(v, 1);
  }

  getJSVal(sp) {
    return this.deRefStablePtr(sp);
  }

  freeJSVal(sp) {
    this.freeStablePtr(sp);
  }

  hasStablePtr(sp) {
    return this.spt.has(sp);
  }

  preserveJSVals(sps) {
    for (const sp of Array.from(this.spt.keys()))
      if (sp & 1 && !sps.has(sp)) this.freeJSVal(sp);
  }
}

// CONCATENATED MODULE: ./out/rts.stablename.mjs


// https://github.com/ghc/ghc/blob/bf73419518ca550e85188616f860961c7e2a336b/includes/rts/StableName.h
// https://github.com/ghc/ghc/blob/43967c0c7d2d0110cfc5f9d64a7dab3a3dda8953/rts/StableName.c
class StableNameManager {
  constructor(memory, heapalloc, symbol_table) {
    this.memory = memory;
    this.heapalloc = heapalloc;
    this.ptr2stable = new Map();
    this.SymbolTable = symbol_table;
    Object.seal(this);
  }

  makeStableName(ptr) {
    const oldstable = this.ptr2stable.get(ptr);
    if (oldstable !== undefined) return oldstable;

    const tag = this.ptr2stable.size;

    // https://github.com/ghc/ghc/blob/fe819dd637842fb564524a7cf80612a3673ce14c/includes/rts/storage/Closures.h#L197
    let stableptr = this.heapalloc.allocatePinned(
      sizeof_StgStableName
    );
    this.memory.i64Store(stableptr, this.SymbolTable.addressOf("stg_STABLE_NAME_info"));
    this.memory.i64Store(stableptr + offset_StgStableName_sn, tag);

    this.ptr2stable.set(ptr, stableptr);

    return stableptr;
  }
}

// CONCATENATED MODULE: ./out/rts.staticptr.mjs
const w0_mask = (BigInt(1) << BigInt(64)) - BigInt(1);

class StaticPtrManager {
  constructor(memory, stableptr_manager, spt_entries) {
    this.memory = memory;
    this.stablePtrManager = stableptr_manager;
    this.sptEntries = spt_entries;
    Object.freeze(this);
    for (const [, c] of this.sptEntries) {
      this.stablePtrManager.newStablePtr(c);
    }
  }

  hs_spt_lookup(w0_lo, w0_hi, w1_lo, w1_hi) {
    const r = this.sptEntries.get(
      (BigInt(w1_hi) << BigInt(96)) |
        (BigInt(w1_lo) << BigInt(64)) |
        (BigInt(w0_hi) << BigInt(32)) |
        BigInt(w0_lo)
    );
    return r ? r : 0;
  }

  hs_spt_key_count() {
    return this.sptEntries.size;
  }

  hs_spt_keys(p, n) {
    if (n !== this.hs_spt_key_count()) {
      throw new WebAssembly.RuntimeError(
        `hs_spt_keys required ${n} keys, but there are ${this.hs_spt_key_count()}`
      );
    }
    for (const [k] of this.sptEntries) {
      this.memory.i64Store(p, k & w0_mask);
      this.memory.i64Store(p + 8, k >> BigInt(64));
      p += 16;
    }
    return n;
  }
}

// CONCATENATED MODULE: ./out/rts.scheduler.mjs


/**
 * Scheduler.
 *
 * TSO stands for Thread State Object.
 *
 * @property tsos     Contains info (tid, addr, status...) about all the TSOs.
 *
 */
class Scheduler {
  constructor(memory, symbol_table, stablePtrManager) {
    this.memory = memory;
    this.symbolTable = symbol_table;
    this.lastTid = 0;
    this.tsos = new Map(); // all the TSOs
    this.exports = undefined;
    this.stablePtrManager = stablePtrManager;
    this.gc = undefined;
    this.blockingPromise = undefined;
    Object.seal(this);
  }

  setGC(gc) {
    this.gc = gc;
  }

  /**
   * Create a new TSO. Called by "createThread"
   *
   * @returns Number TSO ID.
   */
  newTSO() {
    const tid = ++this.lastTid;
    let promise_resolve, promise_reject;
    const ret_promise = new Promise((resolve, reject) => {
      promise_resolve = resolve;
      promise_reject = reject;
    });
    this.tsos.set(
      tid,
      Object.seal({
        addr: -1, // TSO struct address in Wasm memory
        ret: 0, // returned object address in Wasm memory
        retError: undefined,
        rstat: -1, // thread status
        ffiRet: undefined, // FFI returned value
        ffiRetType: undefined, // FFI returned value type
        ffiRetErr: undefined, // FFI returned error
        returnPromise: ret_promise,
        promise_resolve: promise_resolve, // Settle the promise used by user
        promise_reject: promise_reject
      })
    );
    return tid;
  }

  getTSOaddr(tid) {
    return this.tsos.get(tid).addr;
  }

  getTSOret(tid) {
    return this.tsos.get(tid).ret;
  }

  getTSOrstat(tid) {
    return this.tsos.get(tid).rstat;
  }

  setTSOaddr(tid, addr) {
    this.tsos.get(tid).addr = addr;
  }

  setTSOret(tid, ret) {
    this.tsos.get(tid).ret = ret;
  }

  setTSOrstat(tid, rstat) {
    this.tsos.get(tid).rstat = rstat;
  }

  getTSOid(tso) {
    return this.memory.i32Load(tso + offset_StgTSO_id);
  }

  /**
   * Called from a generated safe FFI import call.
   *
   * @param ffiPromise Promise executing the FFI import code asynchronously.
   */
  returnFFIPromise(ffiPromise) {
    this.blockingPromise = ffiPromise;
  }

  /**
   * Called when a thread stops for some reason.
   */
  returnedFromTSO(tid) {
    const tso_info = this.tsos.get(tid);
    const tso = tso_info.addr;
    const reason = Number(
      this.memory.i64Load(
        this.symbolTable.addressOf("MainCapability") +
          offset_Capability_r +
          offset_StgRegTable_rRet
      )
    );

    switch (reason) {
      case 1: {
        // HeapOverflow

        this.gc.performGC();

        // put the thread back into the run-queue
        // TODO: we should put it in front if it hasn't exceeded its time splice
        setImmediate(() => this.tick(tid));
        break;
      }
      case 2: {
        // StackOverflow
        const prev_stack = Number(
            this.memory.i64Load(tso + offset_StgTSO_stackobj)
          ),
          next_stack = this.exports.growStack(prev_stack);
        this.memory.i64Store(
          tso + offset_StgTSO_stackobj,
          next_stack
        );
        setImmediate(() => this.tick(tid));
        break;
      }
      case 3: {
        // ThreadYielding
        // put the thread back into the run-queue
        setImmediate(() => this.tick(tid));
        break;
      }
      case 4: {
        // ThreadBlocked

        const why_blocked = Number(
          this.memory.i16Load(tso + offset_StgTSO_why_blocked)
        );

        switch (why_blocked) {
          case Blocked.OnCCall:
          case Blocked.OnCCall_Interruptible: {
            //console.log(`Thread ${tid}: blocked on FFI`);
            // Wait for the FFI blocking promise and then requeue the TSO
            const blocking_promise = this.blockingPromise;
            this.blockingPromise = undefined;
            blocking_promise.then(
              v => {
                //console.log(`Thread ${tid}: unblocked`);
                const [retTyp, retVal] = v;
                tso_info.ffiRet = retVal;
                tso_info.ffiRetType = retTyp;
                setImmediate(() => this.tick(tid));
              },
              e => {
                tso_info.ffiRetErr = e;
                //console.log(`Thread ${tid}: blocking FFI Promise rejected with ${e.stack}`);
                setImmediate(() => this.tick(tid));
              }
            );
            break;
          }

          case Blocked.OnDelay: {
            const us_delay = Number(
              this.memory.i64Load(tso + offset_StgTSO_block_info)
            );
            const blocking_promise = new Promise((resolve, reject) => {
              setTimeout(() => resolve(), us_delay / 1000);
            });
            // Wait for the timer blocking promise and then requeue the TSO
            blocking_promise.then(
              () => {
                setImmediate(() => this.tick(tid));
              },
              e => {
                throw new WebAssembly.RuntimeError(
                  `Scheduler: blocking TSO Promise rejected with ${e}`
                );
              }
            );
            break;
          }

          case Blocked.OnBlackHole:
          case Blocked.OnMVar:
          case Blocked.OnMVarRead: {
            //console.log(`Thread ${tid}: blocked on MVar`);
            break;
          }

          default: {
            throw new WebAssembly.RuntimeError(
              `Unhandled thread blocking reason: ${why_blocked}`
            );
          }
        }

        break;
      }
      case 5: {
        // ThreadFinished
        //console.log(`Thread ${tid}: Finished`);
        const what_next = Number(
          this.memory.i16Load(tso + offset_StgTSO_what_next)
        );
        switch (what_next) {
          case 1: {
            // ThreadRunGHC
            setImmediate(() => this.tick(tid));
            break;
          }
          case 3: {
            // ThreadKilled
            tso_info.ret = 0;
            tso_info.rstat = 2; // Killed (SchedulerStatus)
            tso_info.promise_reject(tso_info.retError);
            break;
          }
          case 4: {
            // ThreadComplete
            const stackobj = Number(
              this.memory.i64Load(tso + offset_StgTSO_stackobj)
            );
            const sp = Number(
              this.memory.i64Load(stackobj + offset_StgStack_sp)
            );
            tso_info.ret = Number(this.memory.i64Load(sp + 8));
            tso_info.rstat = 1; // Success (SchedulerStatus)
            tso_info.promise_resolve(tid); // rts_eval* functions assume a TID is returned
            break;
          }
        }
        break;
      }
      default: {
        throw new WebAssembly.RuntimeError(
          `returnFFIPromise: unsupported thread stopping reason ${reason}`
        );
      }
    }
  }

  tick(tid) {
    this.exports.context.reentrancyGuard.enter(0);
    try {
      const tso_info = this.tsos.get(tid);
      const tso = tso_info.addr;

      //console.log(`Thread ${tid}: active`);

      // Returning from blocking FFI
      if (tso_info.ffiRetErr) {
        //console.log(`Thread ${tid}: FFI error`);

        const stackobj = Number(
            this.memory.i64Load(tso + offset_StgTSO_stackobj)
          ),
          sp =
            Number(
              this.memory.i64Load(stackobj + offset_StgStack_sp)
            ) - 16,
          exception_closure = this.exports.rts_apply(
            this.symbolTable.addressOf(
              "base_AsteriusziTypesziJSException_mkJSException_closure"
            ),
            this.exports.rts_mkJSVal(
              this.stablePtrManager.newJSVal(tso_info.ffiRetErr)
            )
          );
        this.memory.i64Store(stackobj + offset_StgStack_sp, sp);
        this.memory.i64Store(sp, this.symbolTable.addressOf("stg_raise_ret_info"));
        this.memory.i64Store(sp + 8, exception_closure);
      } else if (typeof tso_info.ffiRetType === "number") {
        switch (
          tso_info.ffiRetType // tag is encoded with `ffiValueTypesTag`
        ) {
          case 0: {
            // no returned value
            break;
          }
          case 1: {
            // JSVal
            const ptr = this.stablePtrManager.newJSVal(tso_info.ffiRet);
            //console.log(`Restore after FFI with value: ${tso_info.ffiRet} with type ${typeof tso_info.ffiRet} constructor ${tso_info.ffiRet.constructor} as ${ptr}`);
            this.memory.i64Store(
              this.symbolTable.addressOf("MainCapability") +
                offset_Capability_r +
                offset_StgRegTable_rR1,
              ptr
            );
            break;
          }
          case 2: {
            // I64
            this.memory.i64Store(
              this.symbolTable.addressOf("MainCapability") +
                offset_Capability_r +
                offset_StgRegTable_rR1,
              tso_info.ffiRet
            );
            break;
          }
          case 3: {
            // F32
            this.memory.f32Store(
              this.symbolTable.addressOf("MainCapability") +
                offset_Capability_r +
                offset_StgRegTable_rF1,
              tso_info.ffiRet
            );
            break;
          }
          case 4: {
            // F64
            this.memory.f64Store(
              this.symbolTable.addressOf("MainCapability") +
                offset_Capability_r +
                offset_StgRegTable_rD1,
              tso_info.ffiRet
            );
            break;
          }
          default:
            // FIXME: add support for multiple return values: the tag already
            // supports it and we get a list of values in tso_info.ffiRet
            throw new WebAssembly.RuntimeError(
              `Unsupported FFI return value type tag ${tso_info.ffiRetType} (more than one value?): ${tso_info.ffiRet}`
            );
        }
      }

      tso_info.ffiRet = undefined;
      tso_info.ffiRetType = undefined;
      tso_info.ffiRetErr = undefined;

      // execute the TSO.
      let sync_err = false;
      try {
        this.exports.scheduleTSO(tso);
      } catch (err) {
        sync_err = true;
        this.exports.stg_returnToSchedNotPaused();
        tso_info.ffiRetErr = err;
        setImmediate(() => this.tick(tid));
      }
      if (!sync_err) {
        this.returnedFromTSO(tid);
      }
    } finally {
      this.exports.context.reentrancyGuard.exit(0);
    }
  }

  tsoReportException(tso, v) {
    const err = this.stablePtrManager.getJSVal(v);
    this.stablePtrManager.freeJSVal(v);
    const tid = this.getTSOid(tso);
    this.tsos.get(tid).retError = err;
  }

  /**
   * Enqueue the TSO in the run-queue and wake-up the scheduler.
   */
  enqueueTSO(tso) {
    const tid = this.getTSOid(tso);

    // When the TSO has just been created, we need to store its address
    const tso_info = this.tsos.get(tid);
    if (tso_info.addr == -1) {
      tso_info.addr = Number(tso);
    }

    // Ensure that we wake up the scheduler at least once to execute this thread
    setImmediate(() => this.tick(tid));
  }

  /**
   * Submit a thread creation command.
   *
   * @param createThread The name of an exported function with prototype:
   *                     TSO * createThread(closure*). E.g. "createIOThread".
   * @param closure      The closure to evaluate in the thread.
   */
  submitCmdCreateThread(createThread, closure) {
    const tso = this.exports[createThread](closure),
      tid = this.getTSOid(tso),
      tso_info = this.tsos.get(tid);
    this.enqueueTSO(tso);
    return tso_info.returnPromise;
  }
}

/**
 * Blocked enum type (see rts/Constants.h)
 */
const Blocked = {
  NotBlocked: 0,
  OnMVar: 1,
  OnMVarRead: 14,
  OnBlackHole: 2,
  OnRead: 3,
  OnWrite: 4,
  OnDelay: 5,
  OnSTM: 6,
  OnDoProc: 7,
  OnCCall: 10,
  OnCCall_Interruptible: 11,
  OnMsgThrowTo: 12,
  ThreadMigrating: 13
};

// CONCATENATED MODULE: ./out/rts.integer.mjs
class IntegerManager {
  constructor() {
    // buffer of 8 bytes to hold floats/doubles
    this.view = new DataView(new ArrayBuffer(8));

    Object.freeze(this);
  }

  mul2(hi_hi, hi_lo, lo_hi, lo_lo, ipiece) {
    this.view.setInt32(/*offset=*/ 0, hi_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, hi_hi, /*littleEndian=*/ true);
    const hi = this.view.getBigUint64(/*offset=*/ 0, /*littleEndian=*/ true);

    this.view.setInt32(/*offset=*/ 0, lo_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, lo_hi, /*littleEndian=*/ true);
    const lo = this.view.getBigUint64(/*offset=*/ 0, /*littleEndian=*/ true);

    const mul = hi * lo;
    // find the correct value that is masked
    const val = Number(
      (mul >> BigInt(32 * ipiece)) & ((BigInt(1) << BigInt(32)) - BigInt(1))
    );

    return Number(val);
  }

  quotrem2_quotient(
    lhs_hi_hi,
    lhs_hi_lo,
    lhs_lo_hi,
    lhs_lo_lo,
    rhs_hi,
    rhs_lo,
    ipiece
  ) {
    this.view.setInt32(/*offset=*/ 0, lhs_hi_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, lhs_hi_hi, /*littleEndian=*/ true);
    const lhs_hi = this.view.getBigUint64(
      /*offset=*/ 0,
      /*littleEndian=*/ true
    );

    this.view.setInt32(/*offset=*/ 0, lhs_lo_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, lhs_lo_hi, /*littleEndian=*/ true);
    const lhs_lo = this.view.getBigUint64(
      /*offset=*/ 0,
      /*littleEndian=*/ true
    );
    const lhs = (lhs_hi << BigInt(64)) | lhs_lo;

    this.view.setInt32(/*offset=*/ 0, rhs_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, rhs_hi, /*littleEndian=*/ true);
    const rhs = this.view.getBigUint64(/*offset=*/ 0, /*littleEndian=*/ true);

    const quot = lhs / rhs;
    // find the correct value that is masked
    const val = Number(
      (quot >> BigInt(32 * ipiece)) & ((BigInt(1) << BigInt(32)) - BigInt(1))
    );

    return Number(val);
  }

  quotrem2_remainder(
    lhs_hi_hi,
    lhs_hi_lo,
    lhs_lo_hi,
    lhs_lo_lo,
    rhs_hi,
    rhs_lo,
    ipiece
  ) {
    this.view.setInt32(/*offset=*/ 0, lhs_hi_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, lhs_hi_hi, /*littleEndian=*/ true);
    const lhs_hi = this.view.getBigUint64(
      /*offset=*/ 0,
      /*littleEndian=*/ true
    );

    this.view.setInt32(/*offset=*/ 0, lhs_lo_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, lhs_lo_hi, /*littleEndian=*/ true);
    const lhs_lo = this.view.getBigUint64(
      /*offset=*/ 0,
      /*littleEndian=*/ true
    );
    const lhs = (lhs_hi << BigInt(64)) | lhs_lo;

    this.view.setInt32(/*offset=*/ 0, rhs_lo, /*littleEndian=*/ true);
    this.view.setInt32(/*offset=*/ 4, rhs_hi, /*littleEndian=*/ true);
    const rhs = this.view.getBigUint64(/*offset=*/ 0, /*littleEndian=*/ true);

    const rem = lhs % rhs;
    // find the correct value that is masked
    const val = Number(
      (rem >> BigInt(32 * ipiece)) & ((BigInt(1) << BigInt(32)) - BigInt(1))
    );

    return Number(val);
  }
}

// CONCATENATED MODULE: ./out/rts.time.mjs


class TimeCBits {
  constructor(memory, targetSpecificModule) {
    this.memory = memory;
    // Obtain Time API from the passed target-specific module
    this.resolution = targetSpecificModule.Time.resolution; // format: ns
    this.getCPUTime = targetSpecificModule.Time.getCPUTime; // format: [s,ns]
    this.getUnixEpochTime = targetSpecificModule.Time.getUnixEpochTime; // format: [s,ns]
    Object.freeze(this);
  }

  /**
   * Returns a (monotonic) nanoseconds timestamp.
   */
  getMonotonicNSec() {
    const time = this.getCPUTime();
    return time[0] * 1000000000 + time[1]; 
  }

  /**
   * Stores at a memory address the resolution of a given clock.
   * @param clk_id the type of requested clock
   *   ({@link rtsConstants.clock_monotonic} or {@link rtsConstants.clock_realtime})
   * @param addr the memory address 
   */
  clock_getres(clk_id, addr) {
    if (addr) {
      let sec = 0, nsec = this.resolution;
      if (nsec > 1000000000) { // more than 1s
        sec = Math.floor(this.resolution / 1000000000);
        nsec = 0;
      }
      this.memory.i64Store(addr + offset_timespec_tv_sec, sec);
      this.memory.i64Store(addr + offset_timespec_tv_nsec, nsec);
    }
    return 0;
  }

  /**
   * Stores at a memory address the time of a given clock.
   * @param clk_id the type of requested clock
   *   ({@link rtsConstants.clock_monotonic} or {@link rtsConstants.clock_realtime})
   * @param addr the memory address 
   */
  clock_gettime(clk_id, addr) {
    if (addr) {
      // fallback by default on the realtime timer
      const time = clk_id == clock_monotonic ? this.getCPUTime() : this.getUnixEpochTime();
      this.memory.i64Store(addr + offset_timespec_tv_sec, time[0]);
      this.memory.i64Store(addr + offset_timespec_tv_nsec, time[1]);
    }
    return 0;
  }
}

// CONCATENATED MODULE: ./out/rts.closuretypes.mjs
const INVALID_OBJECT = 0;
const CONSTR = 1;
const CONSTR_1_0 = 2;
const CONSTR_0_1 = 3;
const CONSTR_2_0 = 4;
const CONSTR_1_1 = 5;
const CONSTR_0_2 = 6;
const CONSTR_NOCAF = 7;
const FUN = 8;
const FUN_1_0 = 9;
const FUN_0_1 = 10;
const FUN_2_0 = 11;
const FUN_1_1 = 12;
const FUN_0_2 = 13;
const FUN_STATIC = 14;
const THUNK = 15;
const THUNK_1_0 = 16;
const THUNK_0_1 = 17;
const THUNK_2_0 = 18;
const THUNK_1_1 = 19;
const THUNK_0_2 = 20;
const THUNK_STATIC = 21;
const THUNK_SELECTOR = 22;
const BCO = 23;
const AP = 24;
const PAP = 25;
const AP_STACK = 26;
const IND = 27;
const IND_STATIC = 28;
const RET_BCO = 29;
const RET_SMALL = 30;
const RET_BIG = 31;
const RET_FUN = 32;
const UPDATE_FRAME = 33;
const CATCH_FRAME = 34;
const UNDERFLOW_FRAME = 35;
const STOP_FRAME = 36;
const BLOCKING_QUEUE = 37;
const BLACKHOLE = 38;
const MVAR_CLEAN = 39;
const MVAR_DIRTY = 40;
const TVAR = 41;
const ARR_WORDS = 42;
const MUT_ARR_PTRS_CLEAN = 43;
const MUT_ARR_PTRS_DIRTY = 44;
const MUT_ARR_PTRS_FROZEN_DIRTY = 45;
const MUT_ARR_PTRS_FROZEN_CLEAN = 46;
const MUT_VAR_CLEAN = 47;
const MUT_VAR_DIRTY = 48;
const WEAK = 49;
const PRIM = 50;
const MUT_PRIM = 51;
const TSO = 52;
const STACK = 53;
const TREC_CHUNK = 54;
const ATOMICALLY_FRAME = 55;
const CATCH_RETRY_FRAME = 56;
const CATCH_STM_FRAME = 57;
const WHITEHOLE = 58;
const SMALL_MUT_ARR_PTRS_CLEAN = 59;
const SMALL_MUT_ARR_PTRS_DIRTY = 60;
const SMALL_MUT_ARR_PTRS_FROZEN_DIRTY = 61;
const SMALL_MUT_ARR_PTRS_FROZEN_CLEAN = 62;
const COMPACT_NFDATA = 63;
const N_CLOSURE_TYPES = 64;

// CONCATENATED MODULE: ./out/rts.funtypes.mjs
const ARG_GEN = 0;
const ARG_GEN_BIG = 1;
const ARG_BCO = 2;
const ARG_NONE = 3;
const ARG_N = 4;
const ARG_P = 5;
const ARG_F = 6;
const ARG_D = 7;
const ARG_L = 8;
const ARG_V16 = 9;
const ARG_V32 = 10;
const ARG_V64 = 11;
const ARG_NN = 12;
const ARG_NP = 13;
const ARG_PN = 14;
const ARG_PP = 15;
const ARG_NNN = 16;
const ARG_NNP = 17;
const ARG_NPN = 18;
const ARG_NPP = 19;
const ARG_PNN = 20;
const ARG_PNP = 21;
const ARG_PPN = 22;
const ARG_PPP = 23;
const ARG_PPPP = 24;
const ARG_PPPPP = 25;
const ARG_PPPPPP = 26;
const ARG_PPPPPPP = 27;
const ARG_PPPPPPPP = 28;

// CONCATENATED MODULE: ./out/rts.autoapply.mjs
const stg_arg_bitmaps = [
  0,
  0,
  0,
  0,
  65,
  1,
  65,
  65,
  65,
  194,
  964,
  16328,
  194,
  66,
  130,
  2,
  451,
  195,
  323,
  67,
  387,
  131,
  259,
  3,
  4,
  5,
  6,
  7,
  8
];

// CONCATENATED MODULE: ./out/rts.gc.mjs






/**
 * Returns the address of the block descriptor
 * of the given closure.
 * @param c The closure address
 */
function bdescr(c) {
  const nc = Number(c);
  return nc - (nc & (mblock_size - 1)) + offset_first_bdescr;
}

/**
 * Class implementing copying garbage collection.
 */
class GC {
  constructor(
    memory,
    heapalloc,
    stableptr_manager,
    stablename_manager,
    scheduler,
    info_tables,
    symbol_table,
    reentrancy_guard,
    yolo,
    gcThreshold
  ) {
    this.memory = memory;
    this.heapAlloc = heapalloc;
    this.stablePtrManager = stableptr_manager;
    this.stableNameManager = stablename_manager;
    this.scheduler = scheduler;
    this.infoTables = info_tables;
    this.symbolTable = symbol_table;
    this.reentrancyGuard = reentrancy_guard;
    /**
     * 'Yolo' mode disables garbage collection altogether
     * (see {@link GC#performGC})
     * @name GC#yolo
     */
    this.yolo = yolo;
    /**
     * Garbage collection will not be performed when the
     * current number of "live" MBlocks is less than
     * {@link GC#gcThreshold} (see {@link GC#performGC}).
     * @name GC#gcThreshold
     * @default 64
     */
    this.gcThreshold = gcThreshold;
    /**
     * Set of closures encountered during garbage
     * collection but not moved: they are either
     * closures in the statis part of memory, or
     * closures in pinned MBlocks.
     * @name GC#nonMovedObjects
     */
    this.nonMovedObjects = new Set();
    /**
     * List containing the non-moved closures that
     * have not been scavenged yet.
     * @name GC#nonMovedObjectsToScavenge
     */
    this.nonMovedObjectsToScavenge = [];
    /**
     * Set containing the MBlocks in the to-space,
     * i.e. the MBlocks where reachable objects are copied
     * during garbage collection.
     * Notes:
     * 1) Pinned MBlocks are not copied during GC: they are
     *    simply set as live, and added to the liveMBlocks set.
     * 2) Static objects are not copied either, but their
     *    blocks are not even added to the liveMBlocks set.
     * @name GC#liveMBlocks
     */
    this.liveMBlocks = new Set();
    /**
     * List containing the MBlocks in the to-space
     * that have yet to be scavenged.
     * @name GC#blocksToScavenge
     */
    this.blocksToScavenge = [];
    /**
     * Set containing the MBlocks in the from-space,
     * i.e. the MBlocks containing objects that have been
     * copied into to-space. These MBlocks will be freed
     * at the end of garbage collection.
     * @name GC#deadMBlocks
     */
    this.deadMBlocks = new Set();
    /**
     * At each garbage collection, the live JSVals encountered are
     * recorded in {@link GC#liveJSVals}, and then handled separately
     * by {@link StablePtrManager}.
     * @name GC#liveJSVals
     */
    this.liveJSVals = new Set();
    Object.freeze(this);
  }

  /**
   * Checks whether the provided memory address resides
   * in a pinned MBlock. Used by {@link GC#evacuateClosure}
   * to avoid evacuating pinned objects.
   * @param addr The memory address to check
   */
  isPinned(addr) {
    const bd = bdescr(addr),
      flags = this.memory.i16Load(bd + offset_bdescr_flags);
    return Boolean(flags & BF_PINNED);
  }

  /**
   * Heap allocates a physical copy of the given closure.
   * Used during evacuation by {@link GC#evacuateClosure}.
   * @param c The source address of the closure
   * @param bytes The size in bytes of the closure
   */
  copyClosure(c, bytes) {
    const dest_c = this.heapAlloc.allocate(Math.ceil(bytes / 8));
    this.memory.memcpy(dest_c, c, bytes);
    const dest_block = bdescr(dest_c);
    if (!this.liveMBlocks.has(dest_block)) {
      this.blocksToScavenge.push(dest_block);
      this.liveMBlocks.add(dest_block);
    }
    this.deadMBlocks.add(bdescr(c));
    return dest_c;
  }

  /**
   * Performs _stingy_ evaluation, i.e. a very frugual form
   * of evaluation that is carried during garbage collection.
   * It implements the following two optimizations:
   * - Indirections short-cutting;
   * - Selector optimization: remove thunks of applications of field
   *   selectors.
   * Only the argument `c` is required: the other arguments will be
   * computed in case they are `undefined`.
   * @param {number} c - The address of the closure
   * @param {number=} untagged_c - The unDynTag-ed address
   * @param {number=} info - The info pointer of `c`
   * @param {number=} type - The closure type of `c`
   * @returns A tuple array `[res_c, res_type]` containing
   *   the resulting address and type of the closure after
   *   the optimisation.
   */
  stingyEval(c, untagged_c, info, type) {
    if (!untagged_c) {
      // If no information about c is present, compute it
      untagged_c = Memory.unDynTag(c);
      info = Number(this.memory.i64Load(untagged_c));
      if (info % 2 == 0) {
        // Obtain the closure type only if the header
        // is an info pointer and not a forwarding pointer
        type = this.memory.i32Load(
          info + offset_StgInfoTable_type
        );
      }
    }
    switch (type) {
      case IND: {
        // Whitehole
        this.memory.i64Store(
          untagged_c,
          this.symbolTable.addressOf("stg_WHITEHOLE_info")
        );
        // Follow the indirectee
        const [res_c, _] = this.stingyEval(
          Number(
            this.memory.i64Load(
              untagged_c + offset_StgInd_indirectee
            )
          ));
        this.memory.i64Store(untagged_c, this.symbolTable.addressOf("stg_IND_info")); // Undo whiteholing
        this.memory.i64Store(untagged_c + offset_StgInd_indirectee, res_c);
        return [res_c, IND];
      }
      case THUNK_SELECTOR: {
        // Whitehole
        this.memory.i64Store(
          untagged_c,
          this.symbolTable.addressOf("stg_WHITEHOLE_info")
        );
        // Follow the selectee
        const [res_c, res_type] = this.stingyEval(
          Number(
            this.memory.i64Load(
              untagged_c + offset_StgSelector_selectee
            ))
        );
        // try to perform selection
        switch (res_type) {
          case CONSTR:
          case CONSTR_2_0:
          case CONSTR_NOCAF: {
            const offset = this.memory.i32Load(
              info + offset_StgInfoTable_layout
            );
            // Warning: at this point (and in the similar point below)
            // we may be losing the dynamic tagging, fixme
            const selectee = this.memory.i64Load(
              Memory.unDynTag(res_c) + ((1 + offset) << 3)
            );
            this.memory.i64Store(untagged_c + offset_StgInd_indirectee, selectee);
            // Set the current closure as IND, but do not
            // un-whitehole for now: it will be taken care
            // of later, when propagating the result
            // (see case IND above)
            return this.stingyEval(c, untagged_c, info, IND);
          }
          case CONSTR_1_0:
          case CONSTR_1_1: {
            const selectee = this.memory.i64Load(Memory.unDynTag(res_c) + 8);
            this.memory.i64Store(
              untagged_c + offset_StgInd_indirectee,
              selectee
            );
            return this.stingyEval(c, untagged_c, info, IND);
          }
          default: {
            this.memory.i64Store(untagged_c, info); // Undo whiteholing
            this.memory.i64Store(
              untagged_c + offset_StgSelector_selectee,
              res_c
            );
            return [c, type];
          }
        }
      }
      default: {
        return [c, type];
      }
    }
  }

  /**
   * Evacuates a closure. This consists of:
   * (1) Copying the closure into to-space through {@link GC#copyClosure}
   * (2) Map the old unDynTag-ed address of the closure
   *     to its new unDynTag-ed address in {@link GC#closureIndirects}.
   * If that closure had already been evacuated, simply
   * return the forwarding pointer already present in {@link GC#closureIndirects}.
   * @param c The memory address of the closure to evacuate.
   */
  evacuateClosure(c) {
    if (!Memory.getTag(c)) {
      // c is the address of a JSVal
      if (!(Number(c) & 1))
        throw new WebAssembly.RuntimeError(`Illegal JSVal 0x${c.toString(16)}`);
      this.liveJSVals.add(Number(c));
      return c;
    }
    const tag = Memory.getDynTag(c),
      untagged_c = Memory.unDynTag(c);
    let info = Number(this.memory.i64Load(untagged_c));

    if (info % 2) {
      // The info header has already been overwritten with
      // a forwarding address: just follow it
      return Memory.setDynTag(info, tag);
    } else if (this.nonMovedObjects.has(untagged_c)) {
      // The closure is either pinned or static, and has
      // already been enqueued for scavenging: just return it
      return c;
    } else if (!this.memory.heapAlloced(untagged_c)) {
      // Object in the static part of the memory:
      // it won't be copied ...
      this.nonMovedObjects.add(untagged_c);
      // ... but it will still be scavenged
      this.nonMovedObjectsToScavenge.push(untagged_c);
      // Warning: do not set the MBlock as live,
      // because the static part of memory is not
      // tracked by HeapAlloc.mgroups and it would
      // break the checks in HeapAlloc.handleLiveness.
      return c;
    } else if (this.isPinned(untagged_c)) {
      // The object belongs to a pinned MBlock:
      // it won't be copied ...
      this.nonMovedObjects.add(untagged_c);
      // ... but it will still be scavenged
      this.nonMovedObjectsToScavenge.push(untagged_c);
      // Set the pinned MBlock as live
      this.liveMBlocks.add(bdescr(untagged_c));
      return c;
    }
    // The closure is heap-allocated and dynamic:
    // proceed to evacuate it into to-space
    if (this.infoTables && !this.infoTables.has(info))
      throw new WebAssembly.RuntimeError(
        `Invalid info table 0x${info.toString(16)}`
      );
    let dest_c = undefined;
    // Get the type of the closure from info tables
    let type = this.memory.i32Load(
      info + offset_StgInfoTable_type
    );
    if (type == THUNK_SELECTOR || type == IND) {
      // Optimize selectors and indirections
      type = this.stingyEval(Number(c), untagged_c, info, type)[1];
    }
    switch (type) {
      case CONSTR_0_1:
      case FUN_0_1:
      case FUN_1_0:
      case CONSTR_1_0: {
        dest_c = this.copyClosure(untagged_c, 16);
        break;
      }
      case THUNK_1_0:
      case THUNK_0_1: {
        dest_c = this.copyClosure(untagged_c, sizeof_StgThunk + 8);
        break;
      }
      case THUNK_1_1:
      case THUNK_2_0:
      case THUNK_0_2: {
        dest_c = this.copyClosure(
          untagged_c,
          sizeof_StgThunk + 16
        );
        break;
      }
      case FUN_1_1:
      case FUN_2_0:
      case FUN_0_2:
      case CONSTR_1_1:
      case CONSTR_2_0:
      case CONSTR_0_2: {
        dest_c = this.copyClosure(untagged_c, 24);
        break;
      }
      case THUNK: {
        const ptrs = this.memory.i32Load(
            info + offset_StgInfoTable_layout
          ),
          non_ptrs = this.memory.i32Load(
            info + offset_StgInfoTable_layout + 4
          );
        dest_c = this.copyClosure(
          untagged_c,
          sizeof_StgThunk + ((ptrs + non_ptrs) << 3)
        );
        break;
      }
      case FUN:
      case CONSTR:
      case CONSTR_NOCAF:
      case MVAR_CLEAN:
      case MVAR_DIRTY:
      case MUT_VAR_CLEAN:
      case MUT_VAR_DIRTY:
      case WEAK:
      case PRIM:
      case MUT_PRIM:
      case BLACKHOLE: {
        const ptrs = this.memory.i32Load(
            info + offset_StgInfoTable_layout
          ),
          non_ptrs = this.memory.i32Load(
            info + offset_StgInfoTable_layout + 4
          );
        dest_c = this.copyClosure(untagged_c, (1 + ptrs + non_ptrs) << 3);
        break;
      }
      case THUNK_SELECTOR: {
        dest_c = this.copyClosure(untagged_c, sizeof_StgSelector);
        break;
      }
      case IND: {
        dest_c = this.evacuateClosure(
          this.memory.i64Load(
            untagged_c + offset_StgInd_indirectee
          )
        );
        // cannot simply break here, because in the case of IND closures
        // dest_c must not be tagged with the current tag
        this.memory.i64Store(untagged_c, Memory.setDynTag(dest_c, 1));
        return dest_c;
      }
      case PAP: {
        const n_args = this.memory.i32Load(
          untagged_c + offset_StgPAP_n_args
        );
        dest_c = this.copyClosure(
          untagged_c,
          sizeof_StgPAP + (n_args << 3)
        );
        break;
      }
      case AP: {
        const n_args = this.memory.i32Load(
          untagged_c + offset_StgAP_n_args
        );
        dest_c = this.copyClosure(
          untagged_c,
          sizeof_StgAP + (n_args << 3)
        );
        break;
      }
      case AP_STACK: {
        const size = Number(
          this.memory.i64Load(untagged_c + offset_StgAP_STACK_size)
        );
        dest_c = this.copyClosure(
          untagged_c,
          sizeof_StgAP_STACK + (size << 3)
        );
        break;
      }
      case ARR_WORDS: {
        dest_c = this.copyClosure(
          untagged_c,
          Math.ceil(
            (sizeof_StgArrBytes +
              Number(
                this.memory.i64Load(
                  untagged_c + offset_StgArrBytes_bytes
                )
              )) /
              8
          ) * 8
        );
        break;
      }
      case MUT_ARR_PTRS_CLEAN:
      case MUT_ARR_PTRS_DIRTY:
      case MUT_ARR_PTRS_FROZEN_DIRTY:
      case MUT_ARR_PTRS_FROZEN_CLEAN: {
        dest_c = this.copyClosure(
          untagged_c,
          sizeof_StgMutArrPtrs +
            (Number(
              this.memory.i64Load(
                untagged_c + offset_StgMutArrPtrs_ptrs
              )
            ) <<
              3)
        );
        break;
      }
      case SMALL_MUT_ARR_PTRS_CLEAN:
      case SMALL_MUT_ARR_PTRS_DIRTY:
      case SMALL_MUT_ARR_PTRS_FROZEN_DIRTY:
      case SMALL_MUT_ARR_PTRS_FROZEN_CLEAN: {
        dest_c = this.copyClosure(
          untagged_c,
          sizeof_StgSmallMutArrPtrs +
            (Number(
              this.memory.i64Load(
                untagged_c + offset_StgSmallMutArrPtrs_ptrs
              )
            ) <<
              3)
        );
        break;
      }
      default:
        throw new WebAssembly.RuntimeError();
    }
    // Overwrite the object header with a forwarding
    // pointer (i.e. store the address with the
    // least significant bit set to 1)
    this.memory.i64Store(untagged_c, dest_c + 1);
    // Finally, return the new address
    return Memory.setDynTag(dest_c, tag);
  }

  scavengeClosureAt(p) {
    this.memory.i64Store(p, this.evacuateClosure(this.memory.i64Load(p)));
  }

  scavengePointersFirst(payload, ptrs) {
    for (let i = 0; i < ptrs; ++i) this.scavengeClosureAt(payload + (i << 3));
  }

  scavengeSmallBitmap(payload, bitmap, size) {
    for (let i = 0; i < size; ++i)
      if (!(Number(bitmap >> BigInt(i)) & 1))
        this.scavengeClosureAt(payload + (i << 3));
  }

  scavengeLargeBitmap(payload, large_bitmap, size) {
    for (let j = 0; j < size; j += 64) {
      const bitmap = this.memory.i64Load(
        large_bitmap + offset_StgLargeBitmap_bitmap + (j >> 3)
      );
      for (let i = j; i - j < 64 && i < size; ++i)
        if (!(Number(bitmap >> BigInt(i - j)) & 1))
          this.scavengeClosureAt(payload + (i << 3));
    }
  }

  scavengePAP(c, offset_fun, payload, n_args) {
    this.scavengeClosureAt(c + offset_fun);
    const fun = this.memory.i64Load(c + offset_fun),
      fun_info = Number(this.memory.i64Load(Memory.unDynTag(fun)));
    if (this.infoTables && !this.infoTables.has(fun_info))
      throw new WebAssembly.RuntimeError(
        `Invalid info table 0x${fun_info.toString(16)}`
      );
    switch (
      this.memory.i32Load(
        fun_info +
          offset_StgFunInfoTable_f +
          offset_StgFunInfoExtraFwd_fun_type
      )
    ) {
      case ARG_GEN: {
        this.scavengeSmallBitmap(
          payload,
          this.memory.i64Load(
            fun_info +
              offset_StgFunInfoTable_f +
              offset_StgFunInfoExtraFwd_b
          ) >> BigInt(6),
          n_args
        );
        break;
      }
      case ARG_GEN_BIG: {
        this.scavengeLargeBitmap(
          payload,
          Number(
            this.memory.i64Load(
              fun_info +
                offset_StgFunInfoTable_f +
                offset_StgFunInfoExtraFwd_b
            )
          ),
          n_args
        );
        break;
      }
      case ARG_BCO: {
        throw new WebAssembly.RuntimeError();
      }
      default: {
        this.scavengeSmallBitmap(
          payload,
          BigInt(
            stg_arg_bitmaps[
              this.memory.i32Load(
                fun_info +
                  offset_StgFunInfoTable_f +
                  offset_StgFunInfoExtraFwd_fun_type
              )
            ]
          ) >> BigInt(6),
          n_args
        );
        break;
      }
    }
  }

  scavengeStackChunk(sp, sp_lim) {
    let c = sp;
    while (true) {
      if (c > sp_lim) throw new WebAssembly.RuntimeError();
      if (c == sp_lim) break;
      const info = Number(this.memory.i64Load(c)),
        type = this.memory.i32Load(
          info + offset_StgInfoTable_type
        ),
        raw_layout = this.memory.i64Load(
          info + offset_StgInfoTable_layout
        );
      if (this.infoTables && !this.infoTables.has(info))
        throw new WebAssembly.RuntimeError(
          `Invalid info table 0x${info.toString(16)}`
        );
      if (this.memory.i32Load(info + offset_StgInfoTable_srt))
        this.evacuateClosure(
          this.memory.i64Load(info + offset_StgRetInfoTable_srt)
        );
      switch (type) {
        case RET_SMALL:
        case UPDATE_FRAME:
        case CATCH_FRAME:
        case UNDERFLOW_FRAME:
        case STOP_FRAME:
        case ATOMICALLY_FRAME:
        case CATCH_RETRY_FRAME:
        case CATCH_STM_FRAME: {
          const size = Number(raw_layout) & 0x3f,
            bitmap = raw_layout >> BigInt(6);
          this.scavengeSmallBitmap(c + 8, bitmap, size);
          c += (1 + size) << 3;
          break;
        }
        case RET_BIG: {
          const size = Number(
            this.memory.i64Load(
              Number(raw_layout) + offset_StgLargeBitmap_size
            )
          );
          this.scavengeLargeBitmap(c + 8, Number(raw_layout), size);
          c += (1 + size) << 3;
          break;
        }

        // https://github.com/ghc/ghc/blob/2ff77b9894eecf51fa619ed2266ca196e296cd1e/rts/Printer.c#L609
        // https://github.com/ghc/ghc/blob/2ff77b9894eecf51fa619ed2266ca196e296cd1e/rts/sm/Scav.c#L1944
        case RET_FUN: {
          const retfun = c;
          const size = Number(
            this.memory.i64Load(retfun + offset_StgRetFun_size)
          );

          // NOTE: the order is important. The scavenging will move all the
          // data inside, so that when we grab "fun", we grab the right fun
          // that has been moved.
          this.scavengeClosureAt(retfun + offset_StgRetFun_fun);
          let fun = Number(
            this.memory.i64Load(retfun + offset_StgRetFun_fun)
          );
          const fun_info_p = fun + 0;
          const fun_info = Number(
            this.memory.i64Load(Memory.unDynTag(fun_info_p))
          );

          const fun_type = this.memory.i32Load(
            fun_info +
              offset_StgFunInfoTable_f +
              offset_StgFunInfoExtraFwd_fun_type
          );

          const ret_fun_payload =
            retfun + offset_StgRetFun_payload;

          switch (fun_type) {
            case ARG_GEN: {
              this.scavengeSmallBitmap(
                c + offset_StgRetFun_payload,
                this.memory.i64Load(
                  fun_info +
                    offset_StgFunInfoTable_f +
                    offset_StgFunInfoExtraFwd_b
                ) >> BigInt(6),
                size
              );
              break;
            }
            case ARG_GEN_BIG: {
              this.scavengeLargeBitmap(
                c + offset_StgRetFun_payload,
                Number(
                  this.memory.i64Load(
                    fun_info +
                      offset_StgFunInfoTable_f +
                      offset_StgFunInfoExtraFwd_b
                  )
                ),
                size
              );
              break;
            }
            case ARG_BCO: {
              throw new WebAssembly.RuntimeError();
            }
            default: {
              // https://github.com/ghc/ghc/blob/bf73419518ca550e85188616f860961c7e2a336b/includes/rts/Constants.h#L186
              const BITMAP_SIZE_MASK = 0x3f;
              const BITMAP_BITS_SHIFT = 6;
              const bitmap = stg_arg_bitmaps[fun_type];

              // https://github.com/ghc/ghc/blob/2ff77b9894eecf51fa619ed2266ca196e296cd1e/includes/rts/storage/InfoTables.h#L116
              const bitmap_bits = BigInt(bitmap) >> BigInt(BITMAP_BITS_SHIFT);
              const bitmap_size = bitmap & BITMAP_SIZE_MASK;

              this.scavengeSmallBitmap(
                ret_fun_payload,
                bitmap_bits,
                bitmap_size
              );

              break;
            } // end case default
          } //end switch (fun_type)
          c += sizeof_StgRetFun + (size << 3);
          break;
        }
        default:
          throw new WebAssembly.RuntimeError();
      }
    }
  }

  /**
   * Loops over all reachable objects and scavenges them.
   */
  scavengeLoop() {
    const closures = this.nonMovedObjectsToScavenge,
          blocks = this.blocksToScavenge;

    let currentBlock = undefined, currentObject = undefined;

    // Note: there are various nested loops, mainly because there are
    // two kinds of objects, that must be scavenged in a different way:
    // objects that have been copied in to-space, and non-moved objects.
    // Objects copied in to-space are scavenged by traversing the
    // to-space sequentially. Non-moved objects are stored
    // in `this.nonMovedObjects` and must be handled separately.
    // Moreover, scavenging an object of either kind may introduce
    // new objects of either kind.
    while (true) {
      if (!currentBlock) {
        // We try and pick a new MBlock to scavenge
        currentBlock = blocks.pop();
        if (currentBlock)
          // If there exists a MBlock to scavenge,
          // start with the object pointed
          // by the `start` field in the block
          // descriptor
          currentObject = Number(
            this.memory.i64Load(
              currentBlock + offset_bdescr_start
            )
          );
      }
      // Iterate over the objects in the `currentBlock`,
      // but only if there's such a block
      while (currentBlock) {
        // `currentLimit` is the upper limit for `currentBlock`
        // and consists of a pointer to the free space in the
        // current block
        const currentLimit = Number(
          this.memory.i64Load(
            currentBlock + offset_bdescr_free
          )
        );
        if (currentObject >= currentLimit)
          // There are no more blocks to scavenge in the
          // `currentBlock`. Break, but do not unset
          // the current MBlock, as we are not done with
          // it yet: scavenging the non-moved closures below
          // may add new objects to `currentBlock`.
          break;
        // Scavenge the current object, and increase the
        // `currentObject` address of the amount (sizeof) provided by
        // the `scavengeClosure` function.
        currentObject += this.scavengeClosure(currentObject);
      }
      if (blocks.length > 0) {
        // There are more MBlocks to scavenge:
        // since we have completely processed the
        // current currentBlock, we can continue
        // and pick the next one
        currentBlock = currentObject = undefined;
        continue;
      } else if (closures.length == 0)
        // There are no more block to scavenge,
        // nor in the to-space nor among the non-moved
        // objects. We are done.
        return;
      // Scavenge the remaining non-moved objects
      while (closures.length > 0) {
        this.scavengeClosure(closures.pop());
      }
      // Continue scavenging the possibly newly evacuated objects
    }
  }

  /**
   * Scavenges a single object in to-space by evacuating
   * each pointer in the object, and replacing the pointer
   * with the address obtained after evacuation.
   * @param c The address of the closure to scavenge
   * @returns The size (in bytes) of the closure c
   */
  scavengeClosure(c) {
    const info = Number(this.memory.i64Load(c)),
      type = this.memory.i32Load(info + offset_StgInfoTable_type);
    if (this.infoTables && !this.infoTables.has(info))
      throw new WebAssembly.RuntimeError(
        `Invalid info table 0x${info.toString(16)}`
      );
    switch (type) {
      case CONSTR_1_0: {
        this.scavengePointersFirst(c + 8, 1);
        return 16;
      }
      case CONSTR_0_1: {
        return 16;
      }
      case CONSTR_1_1: {
        this.scavengePointersFirst(c + 8, 1);
        return 24;
      }
      case CONSTR_2_0: {
        this.scavengePointersFirst(c + 8, 2);
        return 24;
      }
      case CONSTR_0_2: {
        return 24;
      }
      case FUN:
      case FUN_1_0:
      case FUN_0_1:
      case FUN_2_0:
      case FUN_1_1:
      case FUN_0_2:
      case FUN_STATIC: {
        if (this.memory.i32Load(info + offset_StgInfoTable_srt))
          this.evacuateClosure(
            this.memory.i64Load(
              info +
                offset_StgFunInfoTable_f +
                offset_StgFunInfoExtraFwd_srt
            )
          );
        const ptrs = this.memory.i32Load(
          info + offset_StgInfoTable_layout
        ),
        non_ptrs = this.memory.i32Load(
          info + offset_StgInfoTable_layout + 4
        );
        this.scavengePointersFirst(c + 8, ptrs);
        return (1 + ptrs + non_ptrs) << 3;
      }
      case CONSTR:
      case CONSTR_NOCAF:
      case BLACKHOLE:
      case MUT_VAR_CLEAN:
      case MUT_VAR_DIRTY:
      case PRIM:
      case MUT_PRIM:
      case COMPACT_NFDATA: {
        const ptrs = this.memory.i32Load(
            info + offset_StgInfoTable_layout
          ),
          non_ptrs = this.memory.i32Load(
            info + offset_StgInfoTable_layout + 4
          );
        this.scavengePointersFirst(c + 8, ptrs);
        return (1 + ptrs + non_ptrs) << 3;
      }
      case THUNK_STATIC:
      case THUNK:
      case THUNK_1_0:
      case THUNK_0_1:
      case THUNK_2_0:
      case THUNK_1_1:
      case THUNK_0_2: {
        if (this.memory.i32Load(info + offset_StgInfoTable_srt))
          this.evacuateClosure(
            this.memory.i64Load(
              info + offset_StgThunkInfoTable_srt
            )
          );
        const ptrs = this.memory.i32Load(
          info + offset_StgInfoTable_layout
        ),
        non_ptrs = this.memory.i32Load(
          info + offset_StgInfoTable_layout + 4
        );
        this.scavengePointersFirst(
          c + offset_StgThunk_payload,
          ptrs
        );
        return sizeof_StgThunk + ((ptrs + non_ptrs) << 3);
      }
      case THUNK_SELECTOR: {
        if (this.memory.i32Load(info + offset_StgInfoTable_srt))
          this.evacuateClosure(
            this.memory.i64Load(
              info + offset_StgThunkInfoTable_srt
            )
          );
        this.scavengeClosureAt(c + offset_StgSelector_selectee);
        return sizeof_StgSelector;
      }
      case AP: {
        const n_args = this.memory.i32Load(
          c + offset_StgAP_n_args
        );
        this.scavengePAP(
          c,
          offset_StgAP_fun,
          c + offset_StgAP_payload,
          n_args
        );
        return sizeof_StgAP + (n_args << 3);
      }
      case PAP: {
        const n_args = this.memory.i32Load(
          c + offset_StgPAP_n_args
        );
        this.scavengePAP(
          c,
          offset_StgPAP_fun,
          c + offset_StgPAP_payload,
          n_args
        );
        return sizeof_StgPAP + (n_args << 3);
      }
      case AP_STACK: {
        const size = Number(
          this.memory.i64Load(
            c + offset_StgAP_STACK_size
          )
        );
        this.scavengeClosureAt(c + offset_StgAP_STACK_fun);
        this.scavengeStackChunk(
          c + offset_StgAP_STACK_payload,
          c +
            offset_StgAP_STACK_payload + size
        );
        return sizeof_StgAP_STACK + (size << 3);
      }
      case IND_STATIC: {
        this.scavengeClosureAt(c + offset_StgIndStatic_indirectee);
        return; // size not important, this object won't be moved
      }
      case MVAR_CLEAN:
      case MVAR_DIRTY: {
        this.scavengeClosureAt(c + offset_StgMVar_head);
        this.scavengeClosureAt(c + offset_StgMVar_tail);
        this.scavengeClosureAt(c + offset_StgMVar_value);
        return offset_StgMVar_value + 8;
      }
      case ARR_WORDS: {
        return (
          Math.ceil(
            (sizeof_StgArrBytes +
              Number(
                this.memory.i64Load(c + offset_StgArrBytes_bytes)
              )) /
              8
          ) * 8
        );
      }
      case MUT_ARR_PTRS_CLEAN:
      case MUT_ARR_PTRS_DIRTY:
      case MUT_ARR_PTRS_FROZEN_DIRTY:
      case MUT_ARR_PTRS_FROZEN_CLEAN: {
        const ptrs = Number(
          this.memory.i64Load(c + offset_StgMutArrPtrs_ptrs)
        );
        this.scavengePointersFirst(
          c + offset_StgMutArrPtrs_payload,
          ptrs
        );
        return sizeof_StgMutArrPtrs + (ptrs << 3);
      }
      case WEAK: {
        this.scavengeClosureAt(c + offset_StgWeak_cfinalizers);
        this.scavengeClosureAt(c + offset_StgWeak_key);
        this.scavengeClosureAt(c + offset_StgWeak_value);
        this.scavengeClosureAt(c + offset_StgWeak_finalizer);
        return offset_StgWeak_link + 8;
      }
      case TSO: {
        this.scavengeClosureAt(c + offset_StgTSO_stackobj);
        return; // size not important, this object won't be moved
      }
      case STACK: {
        const
          stack_size =
            this.memory.i32Load(c + offset_StgStack_stack_size) << 3,
          sp = Number(this.memory.i64Load(c + offset_StgStack_sp)),
          sp_lim = c + offset_StgStack_stack + stack_size;
        this.scavengeStackChunk(sp, sp_lim);
        return offset_StgStack_stack + stack_size;
      }
      case SMALL_MUT_ARR_PTRS_CLEAN:
      case SMALL_MUT_ARR_PTRS_DIRTY:
      case SMALL_MUT_ARR_PTRS_FROZEN_DIRTY:
      case SMALL_MUT_ARR_PTRS_FROZEN_CLEAN: {
        const ptrs = Number(
          this.memory.i64Load(c + offset_StgSmallMutArrPtrs_ptrs)
        );
        this.scavengePointersFirst(
          c + offset_StgSmallMutArrPtrs_payload,
          ptrs
        );
        return offset_StgSmallMutArrPtrs_payload + (ptrs << 3);
      }
      default:
        throw new WebAssembly.RuntimeError();
    }
  }

  /**
   * Allocates a new nursery and stores its address in the appropriate
   * field of the StgRegTable of the main capability.
   */
  updateNursery() {
    // Note: the 'rHpAlloc' field of the 'StgRegTable' C struct contains
    // the number of bytes allocated in the heap, or better the number of
    // bytes attempted to being allocated before the heap check fails.
    // Here, we read this field in the hp_alloc variable and
    // use it to determine the size of the newly allocated nursery.
    const base_reg =
        this.symbolTable.addressOf("MainCapability") + offset_Capability_r,
      hp_alloc = Number(
        this.memory.i64Load(base_reg + offset_StgRegTable_rHpAlloc)
      );
    // reset the number of allocated bytes in the nursery
    this.memory.i64Store(
      base_reg + offset_StgRegTable_rHpAlloc,
      0
    );
    // The address of the new nursery's block descriptor is stored
    // in the 'rCurrentNursery' field of the StgRegTable of the main capability.
    this.memory.i64Store(
      base_reg + offset_StgRegTable_rCurrentNursery,
      this.heapAlloc.hpAlloc(hp_alloc)
    );
  }

  /**
   * Performs garbage collection, using scheduler Thread State Objects (TSOs) as roots.
   */
  performGC() {
    if (this.yolo || this.heapAlloc.liveSize() < this.gcThreshold) {
      // Garbage collection is skipped. This happens in yolo mode,
      // or when the total number of "live" MBlocks is below the given threshold
      // (by "live", we mean allocated and not yet freed - see HeapAlloc.liveSize).
      // This avoids a lot of GC invocations
      // (see {@link https://github.com/tweag/asterius/pull/379}).
      this.updateNursery();
      return;
    }
    this.reentrancyGuard.enter(1);

    // Set the current generation number to 1, so that
    // closures are evacuated in the older generation.
    // Also, only major collections for now.
    this.heapAlloc.setGenerationNo(1);

    // Evacuate TSOs
    for (const [_, tso_info] of this.scheduler.tsos) {
      tso_info.addr = this.evacuateClosure(tso_info.addr);
    }

    // Evacuate stable pointers
    for (const [sp, c] of this.stablePtrManager.spt.entries())
      if (!(sp & 1)) this.stablePtrManager.spt.set(sp, this.evacuateClosure(c));

    // Stage the movement of stable pointers.
    // Step 1: Move all the pointers
    // Step 2: Update the pointer -> stablepointer mapping
    // We cannot do this at the same time, since moving the pointer while
    // we walk the ptr2stable map can yield an infinite loop:
    // eg. (ptr:0 stablename: 42) --MOVE--> (ptr:1 stablename:42) --MOVE--> (ptr:2 stablename:42) ...
    let ptr2stableMoved = new Map();
    for (const [ptr, stable] of this.stableNameManager.ptr2stable.entries()) {
      const ptrMoved = this.evacuateClosure(ptr);
      const stableMoved = this.evacuateClosure(stable);
      ptr2stableMoved.set(ptrMoved, stableMoved);
    }
    this.stableNameManager.ptr2stable = ptr2stableMoved;

    // do the rest of the scavenging work
    this.scavengeLoop();

    // update the ret pointer in the complete TSOs
    for (const [_, tso_info] of this.scheduler.tsos) {
      if (tso_info.ret) {
        const tso = tso_info.addr;
        const stackobj = Number(
          this.memory.i64Load(tso + offset_StgTSO_stackobj)
        );
        const sp = Number(
          this.memory.i64Load(stackobj + offset_StgStack_sp)
        );
        tso_info.ret = Number(this.memory.i64Load(sp + 8));
      }
    }

    // mark unused MBlocks
    this.heapAlloc.handleLiveness(this.liveMBlocks, this.deadMBlocks);
    // set current generation back to 0
    this.heapAlloc.setGenerationNo(0);
    // allocate a new nursery
    this.updateNursery();
    // garbage collect unused JSVals
    this.stablePtrManager.preserveJSVals(this.liveJSVals);
    // cleanup
    this.nonMovedObjects.clear();
    this.liveMBlocks.clear();
    this.deadMBlocks.clear();
    this.liveJSVals.clear();
    this.reentrancyGuard.exit(1);
  }
}

// CONCATENATED MODULE: ./out/rts.exception.mjs




/*
  The methods of this class are related to exception handling in Haskell.
 */
class ExceptionHelper {
  constructor(memory, heapalloc, exports, info_tables, symbol_table) {
    this.memory = memory;
    this.heapAlloc = heapalloc;
    this.exports = exports;
    this.infoTables = info_tables;
    this.symbolTable = symbol_table;
    this.decoder = new TextDecoder("utf-8", { fatal: true });
    this.errorBuffer = "";
    Object.seal(this);
  }

  /*
    This implements a subset of `raiseExceptionHelper` in `rts/Schedule.c` of
    ghc rts. The function is called by `stg_raisezh` in `Exception.cmm` in rts.

    When a Haskell exception is raised, `stg_raisezh` is entered, and it calls
    `raiseExceptionHelper` to traverse the stack from the top. For each update
    frame, the thunk is updated with the "exception closure" (which throws when
    entered). It exits when a catch frame or stop frame is encountered.

    The stack pointer is rewritten to the head of last encountered frame, and
    the frame type is returned to `stg_raisezh` for further processing.
  */
  raiseExceptionHelper(reg, tso, exception) {
    const raise_closure = this.heapAlloc.allocate(
      Math.ceil(sizeof_StgThunk / 8) + 1
    );
    this.memory.i64Store(
      raise_closure,
      this.symbolTable.addressOf("stg_raise_info")
    );
    this.memory.i64Store(
      raise_closure + offset_StgThunk_payload,
      exception
    );
    const stackobj = Number(
      this.memory.i64Load(tso + offset_StgTSO_stackobj)
    );
    let p = Number(
      this.memory.i64Load(stackobj + offset_StgStack_sp)
    );
    while (true) {
      const info = Number(this.memory.i64Load(p)),
        type = this.memory.i32Load(
          info + offset_StgInfoTable_type
        ),
        raw_layout = this.memory.i64Load(
          info + offset_StgInfoTable_layout
        );
      if (this.infoTables && !this.infoTables.has(info))
        throw new WebAssembly.RuntimeError(
          `Invalid info table 0x${info.toString(16)}`
        );
      switch (type) {
        case UPDATE_FRAME: {
          const p1 = Number(
            this.memory.i64Load(p + offset_StgUpdateFrame_updatee)
          );
          this.exports.updateThunk(
            this.symbolTable.addressOf("MainCapability"),
            tso,
            p1,
            raise_closure
          );
          const size = Number(raw_layout & BigInt(0x3f));
          p += (1 + size) << 3;
          break;
        }
        case CATCH_FRAME:
        case STOP_FRAME: {
          this.memory.i64Store(stackobj + offset_StgStack_sp, p);
          return type;
        }
        case RET_SMALL: {
          const size = Number(raw_layout & BigInt(0x3f));
          p += (1 + size) << 3;
          break;
        }
        case RET_BIG: {
          const size = Number(
            this.memory.i64Load(
              Number(raw_layout) + offset_StgLargeBitmap_size
            )
          );
          p += (1 + size) << 3;
          break;
        }
        case RET_FUN: {
          const size = Number(
            this.memory.i64Load(p + offset_StgRetFun_size)
          );
          p += sizeof_StgRetFun + (size << 3);
          break;
        }
        default:
          throw new WebAssembly.RuntimeError(
            `raiseExceptionHelper: unsupported stack frame ${type} at 0x${p.toString(
              16
            )}`
          );
      }
    }
  }

  /*
    This implements `barf` in `rts/RtsMessages.c` of ghc rts. The function is
    used to signal a fatal runtime error.

    The original `barf` is a varargs C function which takes a format string.
    Unfortunately, we don't implement handling for varargs yet, so we restrict
    our `barf` to take exactly 1 argument: a pointer to a NUL-terminated string
    which is the error message itself.

    There exists special `barf`-related logic in various parts of the asterius
    compiler:

    * In the rts builtins (`Asterius.Builtins`) module, we import `barf` as
      `__asterius_barf`, and make a `barf` function wrapper which handles the
      i64/f64 conversion workaround.

    * The rts cmm files call `barf` with either 0, 1, 2 arguments. In the
      backend we remove extra arguments, and if there isn't any, we use a
      `NULL` pointer as argument, which is interpreted as empty error message in
      our implementation.
   */
  barf(s) {
    if (s) {
      const v0 = this.memory.i8View.subarray(Memory.unTag(s)),
        len = v0.indexOf(0),
        v1 = v0.subarray(0, len),
        r = this.decoder.decode(v1);
      throw new WebAssembly.RuntimeError(`barf: ${r}`);
    } else {
      throw new WebAssembly.RuntimeError("barf");
    }
  }

  /*
    The following two functions implement a variant of `barf` that is used by
    Asterius to report missing symbols. Instead of finding the error message to
    print in a data segment (like `barf` does), this approach accumulates it
    (character by character) into an internal buffer using `barf_push`. Then, a
    call to `barf_signal` reads this buffer and throws the error.

    The related logic can be found in two places in the Asterius compiler:

    * In the rts builtins (`Asterius.Builtins`) module, we import `barf_push`
      (and `barf_signal`) as `__asterius_barf_push` (and
      `__asterius_barf_signal`), and make a `barf_push` (and `barf_signal`)
      function wrapper which handles the i64/f64 conversion workaround.

    * In `Asterius.Internals.Barf` we implement `barf`, which converts a single
      `Barf` expression to a series of calls to `barf_push`, each taking (the
      ascii code of) a single character of the error message, followed by a
      call to `barf_signal`.

    In the backend (`Asterius.Backends.Binaryen*`), when we encounter an unresolved
    symbol `sym`, if @verbose_err@ is on, we insert a `barf` call there. So
    if an execution path leads to the unresolved symbol, we're likely to get
    the symbol name from the js error message.
  */
  barf_push(c) {
    this.errorBuffer += String.fromCodePoint(c);
  }

  barf_signal(f) {
    const buf = this.errorBuffer;
    this.errorBuffer = "";
    if (f) {
      throw new WebAssembly.RuntimeError(`barf_signal: ${buf}`);
    } else {
      console.error(`[DEBUG] ${buf}`);
    }
  }
}

// CONCATENATED MODULE: ./out/rts.messages.mjs
class Messages {
  constructor(memory, fs) {
    this.memory = memory;
    this.fs = fs;
    this.encoder = new TextEncoder();
    Object.freeze(this);
  }

  debugBelch2(fmt, arg) {
    const s = `${this.memory.strLoad(arg)}\n`;
    this.fs.writeNonMemory(2, this.encoder.encode(s));
  }
}

// CONCATENATED MODULE: ./out/rts.float.mjs


// Implements primitives from primFloat.c
class FloatCBits {
  constructor(memory) {
    this.memory = memory;
    /* Constants copy-pasted by running this C program:
        #include <float.h>
        #include <stdio.h>

        #define PRINT(name) printf("this." #name " = %d;\n", name);
        int main() {
            PRINT(FLT_MIN_EXP); PRINT(FLT_MANT_DIG);
            PRINT(DBL_MIN_EXP); PRINT(DBL_MANT_DIG);
            return 0;
        }
        Other code copy-pasted from C calculations.
        */

    this.FLT_MIN_EXP = -125;
    this.FLT_MANT_DIG = 24;
    this.DBL_MIN_EXP = -1021;
    this.DBL_MANT_DIG = 53;

    this.MY_DMINEXP = this.DBL_MIN_EXP - this.DBL_MANT_DIG - 1;
    /* DMINEXP is defined in values.h on Linux (for example) */
    this.DHIGHBIT = 0x00100000;
    this.DMSBIT = 0x80000000;

    this.MY_FMINEXP = this.FLT_MIN_EXP - this.FLT_MANT_DIG - 1;
    this.FHIGHBIT = 0x00800000;
    this.FMSBIT = 0x80000000;

    this.FLT_HIDDEN = 0x800000;
    this.FLT_POWER2 = 0x1000000;

    this.DBL_HIDDEN = 0x100000;
    this.DBL_POWER2 = 0x200000;

    this.LTOP_BIT = 0x80000000;

    // buffer of 8 bytes to hold floats/doubles
    this.buffer = new ArrayBuffer(8);
    this.view = new DataView(this.buffer);

    Object.seal(this);
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  isFloatNegativeZero(x) {
    return Object.is(-0, x);
  }

  isFloatNaN(x) {
    return x != x;
  }

  isDoubleNaN(x) {
    return x != x;
  }

  isFloatFinite(x) {
    return isFinite(x);
  }

  isDoubleFinite(x) {
    return isFinite(x);
  }

  // Remember, floats have 3 states: {finite, infinite, NaN}.
  isFloatInfinite(x) {
    return !isFinite(x) && !this.isFloatNaN(x);
  }

  isDoubleInfinite(x) {
    return !isFinite(x) && !this.isDoubleNaN(x);
  }

  // extract the mantissa from the little endian representation of the bits
  // of the float.
  // little endian: <0A 0B> stored as mem[p] = 0A, mem[p + 1] = OB
  floatMantissaFromBits(bits) {
    const mask = (1 << 23) - 1;
    return bits & mask;
  }

  // extract the exponent from the little endian representation of the bits
  // of the float.
  floatExponentFromBits(bits) {
    const mask = (1 << 8) - 1;
    const sign = this.floatSignFromBits(bits);
    return ((bits ^ (sign << 31)) >>> 23) & mask;
  }

  floatSignFromBits(bits) {
    return bits >>> 31;
  }

  doubleMantissaFromBits(bits) {
    const mask = (BigInt(1) << BigInt(52)) - BigInt(1);
    return bits & mask;
  }

  doubleExponentFromBits(bits) {
    const mask = BigInt((1 << 11) - 1);
    const sign = this.doubleSignFromBits(bits);

    const bitsNoSign = bits ^ (sign << BigInt(63));
    return (bitsNoSign >> BigInt(52)) & mask;
  }

  doubleSignFromBits(bits) {
    return bits >> BigInt(63);
  }

  // Check if a double is denormal.
  isDoubleDenormalized(x) {
    const bits = this.DoubleToIEEE(x);

    const exponent = this.doubleExponentFromBits(bits);
    const mantissa = this.doubleMantissaFromBits(bits);
    return exponent === BigInt(0) && mantissa !== BigInt(0);
  }

  isFloatDenormalized(x) {
    const bits = this.FloatToIEEE(x);
    const exponent = this.floatExponentFromBits(bits);
    const mantissa = this.floatMantissaFromBits(bits);
    return exponent === 0 && mantissa !== 0;
  }

  // Does it really make sense to have two functions?  probably not...
  isDoubleNegativeZero(x) {
    return Object.is(-0, x);
  }

  FloatToIEEE(f) {
    this.view.setFloat32(0, f);
    return this.view.getUint32(0);
  }

  DoubleToIEEE(d) {
    this.view.setFloat64(0, d);
    return this.view.getBigUint64(0);
  }

  // return two 32-bit integers, [low, high] from a 64 bit double;
  DoubleTo2Int(d) {
    this.view.setFloat64(0, d);
    const low = this.view.getUint32(0);
    const high = this.view.getUint32(/*offset=*/ 4);
    return [low, high];
  }

  IEEEToFloat(ieee) {
    this.view.setInt32(0, ieee);
    return this.view.getFloat32(0);
  }

  IEEEToDouble(ieee) {
    this.view.setBigInt64(0, ieee);
    return this.view.getFloat64(0);
  }

  __decodeFloat_Int(manp, expp, f) {
    // https://github.com/ghc/ghc/blob/610ec224a49e092c802a336570fd9613ea15ef3c/rts/StgPrimFloat.c#L215
    let man, exp, sign;
    let high = this.FloatToIEEE(f);

    if ((high & ~this.FMSBIT) == 0) {
      man = 0;
      exp = 0;
    } else {
      exp = ((high >>> 23) & 0xff) + this.MY_FMINEXP;

      // [sign = high] with a [uint -> int] conversion.
      this.view.setUint32(0, high);
      sign = this.view.getInt32(0);

      high &= this.FHIGHBIT - 1;
      if (exp != this.MY_FMINEXP)
        /* don't add hidden bit to denorms */
        high |= this.FHIGHBIT;
      else {
        exp += 1;
        /* A denorm, normalize the mantissa */
        while (!(high & this.FHIGHBIT)) {
          high <<= 1;
          exp -= 1;
        }
      }

      man = high;
      if (sign < 0) {
        man = -man;
      }
    }

    // TODO: double check! Is this i32 or i64? I suspect it is i32.
    this.memory.i64Store(manp, man);
    this.memory.i64Store(expp, exp);
  }

  // https://github.com/ghc/ghc/blob/610ec224a49e092c802a336570fd9613ea15ef3c/rts/StgPrimFloat.c
  // From StgPrimFloat.c
  // returns [man_sign, man_high,  man_low, exp]
  __decodeDouble_2IntJS(dbl) {
    let sign, iexp, man_low, man_high, man_sign;
    const ints = this.DoubleTo2Int(dbl);
    let low = ints[1];
    let high = ints[0];
    let exp = 0;

    if (low == 0 && (high & ~this.DMSBIT) == 0) {
      man_low = 0;
      man_high = 0;
      man_sign = 0;
      iexp = 0;
    } else {
      iexp = ((high >>> 20) & 0x7ff) + this.MY_DMINEXP;

      // unsigned to signed conversion
      this.view.setUint32(0, high);
      sign = this.view.getInt32(0);

      high &= this.DHIGHBIT - 1;
      if (iexp != this.MY_DMINEXP)
        /* don't add hidden bit to denorms */
        high |= this.DHIGHBIT;
      else {
        iexp++;
        /* A denorm, normalize the mantissa */
        while (!(high & this.DHIGHBIT)) {
          high <<= 1;
          if (low & this.DMSBIT) high++;
          low <<= 1;
          iexp--;
        }
      }
      exp = iexp;
      man_low = low;
      man_high = high;
      man_sign = sign < 0 ? -1 : 1;
    }

    return [man_sign, man_high, man_low, exp];
  }

  __decodeDouble_2Int(p_man_sign, p_man_high, p_man_low, p_exp, dbl) {
    const [man_sign, man_high, man_low, exp] = this.__decodeDouble_2IntJS(dbl);
    this.memory.dataView.setBigInt64(Memory.unTag(p_man_sign), BigInt(man_sign), true);
    this.memory.i64Store(p_man_high, man_high);
    this.memory.i64Store(p_man_low, man_low);
    this.memory.i64Store(p_exp, exp);
  }

  // From GHC/Integer/Type.hs
  decodeDoubleInteger(d) {
    const out = this.__decodeDouble_2IntJS(d);
    const man_sign = out[0];
    const man_high = out[1];
    const man_low = out[2];
    const exp = out[3];

    const acc =
      BigInt(man_sign) *
      (BigInt(man_high) * (BigInt(1) << BigInt(32)) + BigInt(man_low));
    return [acc, exp];
  }

  // from cbits/primFloat
  rintFloat(f) {
    const bits = this.FloatToIEEE(f);
    let fexp = BigInt(this.floatExponentFromBits(bits));
    let fman = BigInt(this.floatMantissaFromBits(bits));
    let fsign = BigInt(this.floatSignFromBits(bits));

    // put back the float together
    const reconstructFloat = () => {
      return this.IEEEToFloat(
        Number((fsign << BigInt(31)) | (fexp << BigInt(23)) | fman)
      );
    };

    /* if real exponent > 22, it's already integral, infinite or nan */
    if (fexp > 149) {
      /* 22 + 127 */
      return f;
    }
    if (fexp < 126) {
      /* (-1) + 127, abs(f) < 0.5 */
      /* only used for rounding to Integral a, so don't care about -0.0 */
      return 0.0;
    }
    /* 0.5 <= abs(f) < 2^23 */
    /// let half, mask, mant, frac;
    const half = BigInt(1) << (BigInt(149) - fexp); /* bit for 0.5 */
    const mask = BigInt(2) * half - BigInt(1); /* fraction bits */
    let mant = fman | BigInt(this.FLT_HIDDEN); /* add hidden bit */
    let frac = mant & mask; /* get fraction */
    mant ^= frac; /* truncate mantissa */

    if (frac < half || (frac == half && (mant & (BigInt(2) * half)) == 0)) {
      /* this means we have to truncate */
      if (mant == 0) {
        /* f == ±0.5, return 0.0 */
        return 0.0;
      } else {
        /* remove hidden bit and set mantissa */
        // u.ieee.mantissa = mant ^ FLT_HIDDEN;
        fman = mant ^ BigInt(this.FLT_HIDDEN);
        return reconstructFloat();
      }
    } else {
      /* round away from zero, increment mantissa */
      mant += BigInt(2) * half;
      if (mant == this.FLT_POWER2) {
        /* next power of 2, increase exponent and set mantissa to 0 */
        fman = BigInt(0);
        fexp += BigInt(1);
        return reconstructFloat();
      } else {
        /* remove hidden bit and set mantissa */
        fman = mant ^ BigInt(this.FLT_HIDDEN);
        return reconstructFloat();
      }
    }
  }

  rintDouble(d) {
    // Code stolen from cbits/primFloat.
    const bits = this.DoubleToIEEE(d);
    let exp = this.doubleExponentFromBits(bits);
    let manFull = this.doubleMantissaFromBits(bits);
    this.view.setBigUint64(0, manFull, /*little endian=*/ true);
    let mant1 = BigInt(this.view.getUint32(0, /*little endian=*/ true));
    let mant0 = BigInt(this.view.getUint32(4, /*little endian=*/ true));
    let sign = this.doubleSignFromBits(bits);

    // put back the double together
    const reconstructDouble = () => {
      this.view.setInt32(0, Number(mant1), true);
      this.view.setInt32(4, Number(mant0), true);
      const mantFull = this.view.getBigUint64(0, true);

      const bits = (sign << BigInt(63)) | (exp << BigInt(52)) | mantFull;
      const n = Number(this.IEEEToDouble(bits));

      return n;
    };

    // union stg_ieee754_dbl u;
    // u.d = d;
    /* if real exponent > 51, it's already integral, infinite or nan */
    // if (u.ieee.exponent > 1074) /* 51 + 1023 */
    if (exp > 1074) {
      /* 51 + 1023 */
      return d;
    }
    // if (u.ieee.exponent < 1022)  /* (-1) + 1023, abs(d) < 0.5 */
    if (exp < 1022) {
      /* (-1) + 1023, abs(d) < 0.5 */
      /* only used for rounding to Integral a, so don't care about -0.0 */
      return 0.0;
    }
    // unsigned int half, mask, mant, frac;
    if (exp < 1043) {
      /* 20 + 1023, real exponent < 20 */
      /* the fractional part meets the higher part of the mantissa */
      const half = BigInt(1) << (BigInt(1042) - exp); /* bit for 0.5 */
      const mask = BigInt(2) * half - BigInt(1); /* fraction bits */
      let mant = mant0 | BigInt(this.DBL_HIDDEN); /* add hidden bit */
      const frac = mant & mask; /* get fraction */
      mant ^= frac; /* truncate mantissa */

      if (
        frac < half ||
        (frac == half &&
        mant1 == 0 /* a tie */ &&
          (mant & (BigInt(2) * half)) == 0)
      ) {
        /* truncate */
        if (mant == 0) {
          /* d = ±0.5, return 0.0 */
          return 0.0;
        }
        /* remove hidden bit and set mantissa */
        mant0 = mant ^ BigInt(this.DBL_HIDDEN);
        mant1 = BigInt(0);

        // reassemble double here
        // return u.d;
        return reconstructDouble();
      } /* round away from zero */ else {
        /* zero low mantissa bits */
        mant1 = BigInt(0);
        /* increment integer part of mantissa */
        mant += BigInt(2) * half;
        if (mant == this.DBL_POWER2) {
          /* power of 2, increment exponent and zero mantissa */
          mant0 = BigInt(0);
          exp += BigInt(1);
          // reassamble
          return reconstructDouble();
        }
        /* remove hidden bit */
        mant0 = mant ^ BigInt(this.DBL_HIDDEN);
        // reassemble
        return reconstructDouble();
      }
    } else {
      /* 20 <= real exponent < 52, fractional part entirely in mantissa1 */
      const half = BigInt(1) << (BigInt(1074) - exp); /* bit for 0.5 */
      const mask = BigInt(2) * half - BigInt(1); /* fraction bits */
      let mant = mant1; /* no hidden bit here */
      let frac = mant & mask; /* get fraction */
      mant ^= frac; /* truncate mantissa */

      if (
        frac < half ||
        (frac == half /* tie */ &&
          (half == this.LTOP_BIT
            ? mant0 & 1 /* yuck */
            : mant & (2 * half)) == 0)
      ) {
        /* truncate */
        mant1 = mant;
        return reconstructDouble();
      } else {
        /* round away from zero */
        /* increment mantissa */
        mant += BigInt(2) * half;
        mant1 = mant;

        // ORIGINAL CODE: if (mant == 0) { where they exploit 32-bit unsigned
        // representation.
        if (mant % (BigInt(1) << BigInt(32)) == 0) {
          /* low part of mantissa overflowed */
          /* increment high part of mantissa */
          mant = mant0 + BigInt(1);
          if (mant == this.DBL_HIDDEN) {
            /* hit power of 2 */
            /* zero mantissa */
            mant0 = BigInt(0);
            /* and increment exponent */
            exp += BigInt(1);

            return reconstructDouble();
          } else {
            u.ieee.mantissa0 = mant;
            return reconstructDouble();
          }
        } else {
          return reconstructDouble();
        }
      }
    }
  }
}

// CONCATENATED MODULE: ./out/rts.unicode.mjs
// Generated by genunicode.hs

// prettier-ignore
const _first = Uint32Array.of(0,32,33,36,37,40,41,42,43,44,45,46,48,58,60,63,65,91,92,93,94,95,96,97,123,124,125,126,127,160,161,162,166,167,168,169,170,171,172,173,174,175,176,177,178,180,181,182,184,185,186,187,188,191,192,215,216,223,224,247,248,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,428,429,430,431,432,433,435,436,437,438,439,440,441,442,443,444,445,446,447,448,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,570,571,572,573,574,575,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,600,601,602,603,604,605,608,609,610,611,612,613,614,615,616,617,618,619,620,621,623,624,625,626,627,629,630,637,638,640,641,642,643,644,647,648,649,650,652,653,658,659,660,661,669,670,671,688,706,710,722,736,741,748,749,750,751,768,837,838,880,881,882,883,884,885,886,887,890,891,894,895,900,902,903,904,908,910,912,913,940,941,944,945,962,963,972,973,975,976,977,978,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1024,1040,1072,1104,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1160,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1321,1322,1323,1324,1325,1326,1327,1329,1369,1370,1376,1377,1415,1417,1418,1421,1423,1425,1470,1471,1472,1473,1475,1476,1478,1479,1488,1523,1536,1542,1545,1547,1548,1550,1552,1563,1564,1566,1568,1600,1601,1611,1632,1642,1646,1648,1649,1748,1749,1750,1757,1758,1759,1765,1767,1769,1770,1774,1776,1786,1789,1791,1792,1807,1808,1809,1810,1840,1869,1958,1969,1984,1994,2027,2036,2038,2039,2042,2045,2046,2048,2070,2074,2075,2084,2085,2088,2089,2096,2112,2137,2142,2144,2259,2274,2275,2307,2308,2362,2363,2364,2365,2366,2369,2377,2381,2382,2384,2385,2392,2402,2404,2406,2416,2417,2418,2433,2434,2437,2492,2493,2494,2497,2503,2509,2510,2519,2524,2530,2534,2544,2546,2548,2554,2555,2556,2557,2558,2563,2565,2620,2622,2625,2649,2662,2672,2674,2677,2678,2689,2691,2693,2748,2749,2750,2753,2761,2765,2768,2786,2790,2800,2801,2809,2810,2818,2821,2876,2877,2878,2879,2880,2881,2887,2893,2903,2908,2914,2918,2928,2929,2930,2946,2947,3006,3008,3009,3021,3024,3031,3046,3056,3059,3065,3066,3072,3073,3076,3077,3134,3137,3142,3160,3170,3174,3191,3192,3199,3200,3201,3202,3204,3205,3260,3261,3262,3263,3264,3270,3271,3276,3285,3294,3298,3302,3313,3328,3330,3333,3387,3389,3390,3393,3398,3405,3406,3407,3412,3415,3416,3423,3426,3430,3440,3449,3450,3458,3461,3530,3535,3538,3544,3558,3570,3572,3585,3633,3634,3636,3647,3648,3654,3655,3663,3664,3674,3713,3761,3762,3764,3773,3782,3784,3792,3804,3841,3844,3859,3860,3861,3864,3866,3872,3882,3892,3893,3894,3895,3896,3897,3898,3899,3900,3901,3902,3904,3953,3967,3968,3973,3974,3976,3981,4030,4038,4039,4048,4053,4057,4096,4139,4141,4145,4146,4152,4153,4155,4157,4159,4160,4170,4176,4182,4184,4186,4190,4193,4194,4197,4199,4206,4209,4213,4226,4227,4229,4231,4237,4238,4239,4240,4250,4253,4254,4256,4304,4347,4348,4349,4352,4957,4960,4969,4992,5008,5024,5104,5112,5120,5121,5741,5743,5760,5761,5787,5788,5792,5867,5870,5873,5906,5920,5938,5941,5952,5970,5984,6002,6016,6068,6070,6071,6078,6086,6087,6089,6100,6103,6104,6107,6108,6109,6112,6128,6144,6150,6151,6155,6158,6160,6176,6211,6212,6277,6279,6313,6314,6432,6435,6439,6441,6450,6451,6457,6464,6468,6470,6480,6608,6618,6622,6656,6679,6681,6683,6686,6688,6741,6742,6743,6744,6753,6754,6755,6757,6765,6771,6784,6816,6823,6824,6832,6846,6912,6916,6917,6964,6965,6966,6971,6972,6973,6978,6979,6981,6992,7002,7009,7019,7028,7040,7042,7043,7073,7074,7078,7080,7082,7083,7086,7088,7098,7142,7143,7144,7146,7149,7150,7151,7154,7164,7168,7204,7212,7220,7222,7227,7232,7245,7248,7258,7288,7294,7296,7297,7298,7299,7301,7302,7303,7304,7312,7360,7376,7379,7380,7393,7394,7401,7405,7406,7412,7413,7415,7416,7418,7424,7468,7531,7544,7545,7546,7549,7550,7566,7567,7579,7616,7680,7681,7682,7683,7684,7685,7686,7687,7688,7689,7690,7691,7692,7693,7694,7695,7696,7697,7698,7699,7700,7701,7702,7703,7704,7705,7706,7707,7708,7709,7710,7711,7712,7713,7714,7715,7716,7717,7718,7719,7720,7721,7722,7723,7724,7725,7726,7727,7728,7729,7730,7731,7732,7733,7734,7735,7736,7737,7738,7739,7740,7741,7742,7743,7744,7745,7746,7747,7748,7749,7750,7751,7752,7753,7754,7755,7756,7757,7758,7759,7760,7761,7762,7763,7764,7765,7766,7767,7768,7769,7770,7771,7772,7773,7774,7775,7776,7777,7778,7779,7780,7781,7782,7783,7784,7785,7786,7787,7788,7789,7790,7791,7792,7793,7794,7795,7796,7797,7798,7799,7800,7801,7802,7803,7804,7805,7806,7807,7808,7809,7810,7811,7812,7813,7814,7815,7816,7817,7818,7819,7820,7821,7822,7823,7824,7825,7826,7827,7828,7829,7830,7835,7836,7838,7839,7840,7841,7842,7843,7844,7845,7846,7847,7848,7849,7850,7851,7852,7853,7854,7855,7856,7857,7858,7859,7860,7861,7862,7863,7864,7865,7866,7867,7868,7869,7870,7871,7872,7873,7874,7875,7876,7877,7878,7879,7880,7881,7882,7883,7884,7885,7886,7887,7888,7889,7890,7891,7892,7893,7894,7895,7896,7897,7898,7899,7900,7901,7902,7903,7904,7905,7906,7907,7908,7909,7910,7911,7912,7913,7914,7915,7916,7917,7918,7919,7920,7921,7922,7923,7924,7925,7926,7927,7928,7929,7930,7931,7932,7933,7934,7935,7936,7944,7952,7960,7968,7976,7984,7992,8000,8008,8016,8017,8018,8019,8020,8021,8022,8023,8025,8032,8040,8048,8050,8054,8056,8058,8060,8064,8072,8080,8088,8096,8104,8112,8114,8115,8116,8120,8122,8124,8125,8126,8127,8130,8131,8132,8136,8140,8141,8144,8146,8152,8154,8157,8160,8162,8165,8166,8168,8170,8172,8173,8178,8179,8180,8184,8186,8188,8189,8192,8203,8208,8214,8216,8217,8218,8219,8221,8222,8223,8224,8232,8233,8234,8239,8240,8249,8250,8251,8255,8257,8260,8261,8262,8263,8274,8275,8276,8277,8287,8288,8304,8305,8308,8314,8317,8318,8319,8320,8330,8333,8334,8336,8352,8400,8413,8417,8418,8421,8448,8450,8451,8455,8456,8458,8459,8462,8464,8467,8468,8469,8470,8472,8473,8478,8484,8485,8486,8487,8488,8489,8490,8491,8492,8494,8495,8496,8498,8499,8500,8501,8505,8506,8508,8510,8512,8517,8518,8522,8523,8524,8526,8527,8528,8544,8560,8576,8579,8580,8581,8585,8586,8592,8597,8602,8604,8608,8609,8611,8612,8614,8615,8622,8623,8654,8656,8658,8659,8660,8661,8692,8960,8968,8969,8970,8971,8972,8992,8994,9001,9002,9003,9084,9085,9115,9140,9180,9186,9312,9372,9398,9424,9450,9472,9655,9656,9665,9666,9720,9728,9839,9840,10088,10089,10090,10091,10092,10093,10094,10095,10096,10097,10098,10099,10100,10101,10102,10132,10176,10181,10182,10183,10214,10215,10216,10217,10218,10219,10220,10221,10222,10223,10224,10240,10496,10627,10628,10629,10630,10631,10632,10633,10634,10635,10636,10637,10638,10639,10640,10641,10642,10643,10644,10645,10646,10647,10648,10649,10712,10713,10714,10715,10716,10748,10749,10750,11008,11056,11077,11079,11085,11264,11312,11360,11361,11362,11363,11364,11365,11366,11367,11368,11369,11370,11371,11372,11373,11374,11375,11376,11377,11378,11379,11380,11381,11382,11383,11388,11390,11392,11393,11394,11395,11396,11397,11398,11399,11400,11401,11402,11403,11404,11405,11406,11407,11408,11409,11410,11411,11412,11413,11414,11415,11416,11417,11418,11419,11420,11421,11422,11423,11424,11425,11426,11427,11428,11429,11430,11431,11432,11433,11434,11435,11436,11437,11438,11439,11440,11441,11442,11443,11444,11445,11446,11447,11448,11449,11450,11451,11452,11453,11454,11455,11456,11457,11458,11459,11460,11461,11462,11463,11464,11465,11466,11467,11468,11469,11470,11471,11472,11473,11474,11475,11476,11477,11478,11479,11480,11481,11482,11483,11484,11485,11486,11487,11488,11489,11490,11491,11492,11493,11499,11500,11501,11502,11503,11506,11507,11513,11517,11518,11520,11568,11631,11632,11647,11648,11744,11776,11778,11779,11780,11781,11782,11785,11786,11787,11788,11789,11790,11799,11800,11802,11803,11804,11805,11806,11808,11809,11810,11811,11812,11813,11814,11815,11816,11817,11818,11823,11824,11834,11836,11840,11841,11842,11843,11904,12288,12289,12292,12293,12294,12295,12296,12297,12298,12299,12300,12301,12302,12303,12304,12305,12306,12308,12309,12310,12311,12312,12313,12314,12315,12316,12317,12318,12320,12321,12330,12334,12336,12337,12342,12344,12347,12348,12349,12350,12353,12441,12443,12445,12447,12448,12449,12539,12540,12543,12688,12690,12694,12704,12736,12784,12800,12832,12842,12872,12880,12881,12896,12928,12938,12977,12992,13312,19904,19968,40981,40982,42128,42192,42232,42238,42240,42508,42509,42512,42528,42538,42560,42561,42562,42563,42564,42565,42566,42567,42568,42569,42570,42571,42572,42573,42574,42575,42576,42577,42578,42579,42580,42581,42582,42583,42584,42585,42586,42587,42588,42589,42590,42591,42592,42593,42594,42595,42596,42597,42598,42599,42600,42601,42602,42603,42604,42605,42606,42607,42608,42611,42612,42622,42623,42624,42625,42626,42627,42628,42629,42630,42631,42632,42633,42634,42635,42636,42637,42638,42639,42640,42641,42642,42643,42644,42645,42646,42647,42648,42649,42650,42651,42652,42654,42656,42726,42736,42738,42752,42775,42784,42786,42787,42788,42789,42790,42791,42792,42793,42794,42795,42796,42797,42798,42799,42800,42802,42803,42804,42805,42806,42807,42808,42809,42810,42811,42812,42813,42814,42815,42816,42817,42818,42819,42820,42821,42822,42823,42824,42825,42826,42827,42828,42829,42830,42831,42832,42833,42834,42835,42836,42837,42838,42839,42840,42841,42842,42843,42844,42845,42846,42847,42848,42849,42850,42851,42852,42853,42854,42855,42856,42857,42858,42859,42860,42861,42862,42863,42864,42865,42873,42874,42875,42876,42877,42878,42879,42880,42881,42882,42883,42884,42885,42886,42887,42888,42889,42891,42892,42893,42894,42895,42896,42897,42898,42899,42900,42901,42902,42903,42904,42905,42906,42907,42908,42909,42910,42911,42912,42913,42914,42915,42916,42917,42918,42919,42920,42921,42922,42923,42924,42925,42926,42927,42928,42929,42930,42931,42932,42933,42934,42935,42936,42937,42938,42939,42940,42941,42942,42943,42946,42947,42948,42949,42950,42999,43000,43002,43003,43010,43011,43014,43015,43019,43020,43043,43045,43047,43048,43056,43062,43064,43065,43072,43124,43136,43138,43188,43204,43214,43216,43232,43250,43256,43259,43260,43261,43263,43264,43274,43302,43310,43312,43335,43346,43359,43360,43392,43395,43396,43443,43444,43446,43450,43452,43453,43457,43471,43472,43486,43488,43493,43494,43495,43504,43514,43561,43567,43569,43571,43573,43584,43587,43588,43596,43597,43600,43612,43616,43632,43633,43639,43642,43643,43644,43645,43646,43696,43697,43698,43701,43703,43705,43710,43712,43713,43714,43741,43742,43744,43755,43756,43758,43760,43762,43763,43765,43766,43777,43824,43859,43860,43867,43868,43872,43888,43968,44003,44005,44006,44008,44009,44011,44012,44013,44016,44032,64256,64285,64286,64287,64297,64298,64434,64467,64830,64831,64848,65020,65021,65024,65040,65047,65048,65049,65056,65072,65073,65075,65077,65078,65079,65080,65081,65082,65083,65084,65085,65086,65087,65088,65089,65090,65091,65092,65093,65095,65096,65097,65101,65104,65112,65113,65114,65115,65116,65117,65118,65119,65122,65123,65124,65128,65129,65130,65136,65279,65281,65284,65285,65288,65289,65290,65291,65292,65293,65294,65296,65306,65308,65311,65313,65339,65340,65341,65342,65343,65344,65345,65371,65372,65373,65374,65375,65376,65377,65378,65379,65380,65382,65392,65393,65438,65440,65504,65506,65507,65508,65509,65512,65513,65517,65529,65532,65536,65792,65799,65847,65856,65909,65913,65930,65932,66045,66176,66272,66273,66304,66336,66349,66369,66370,66378,66384,66422,66432,66463,66464,66512,66513,66560,66600,66640,66720,66736,66776,66816,66927,67072,67671,67672,67680,67703,67705,67712,67751,67808,67835,67840,67862,67871,67872,67903,67968,68028,68030,68032,68096,68097,68112,68152,68160,68176,68192,68221,68223,68224,68253,68288,68296,68297,68325,68331,68336,68352,68409,68416,68440,68448,68472,68480,68505,68521,68608,68736,68800,68858,68864,68900,68912,69216,69376,69405,69415,69446,69457,69461,69600,69632,69633,69634,69635,69688,69703,69714,69734,69759,69762,69763,69808,69811,69815,69817,69819,69821,69822,69837,69840,69872,69888,69891,69927,69932,69933,69942,69952,69956,69957,69968,70003,70004,70006,70016,70018,70019,70067,70070,70079,70081,70085,70089,70093,70096,70106,70107,70108,70109,70113,70144,70188,70191,70194,70196,70197,70198,70200,70206,70272,70313,70320,70367,70368,70371,70384,70400,70402,70405,70459,70461,70462,70464,70465,70480,70487,70493,70498,70502,70656,70709,70712,70720,70722,70725,70726,70727,70731,70736,70747,70750,70751,70832,70835,70841,70842,70843,70847,70849,70850,70852,70854,70855,70864,71040,71087,71090,71096,71100,71102,71103,71105,71128,71132,71168,71216,71219,71227,71229,71230,71231,71233,71236,71248,71264,71296,71339,71340,71341,71342,71344,71350,71351,71352,71360,71424,71453,71456,71458,71462,71463,71472,71482,71484,71487,71680,71724,71727,71736,71737,71739,71840,71872,71904,71914,71935,72145,72146,72147,72148,72156,72160,72161,72164,72192,72193,72203,72243,72249,72250,72251,72255,72263,72272,72273,72279,72281,72284,72330,72343,72344,72346,72349,72350,72384,72751,72752,72766,72767,72768,72769,72784,72794,72816,72818,72850,72873,72874,72881,72882,72884,72885,72960,73009,73030,73031,73040,73056,73098,73104,73107,73109,73110,73111,73112,73120,73440,73459,73461,73463,73664,73685,73693,73697,73727,73728,74752,74864,74880,78896,82944,92768,92782,92880,92912,92917,92928,92976,92983,92988,92992,92996,92997,93008,93019,93027,93760,93792,93824,93847,93952,94031,94032,94033,94095,94099,94178,94179,94208,113820,113821,113823,113824,118784,119141,119143,119146,119149,119155,119163,119171,119173,119180,119210,119214,119362,119365,119520,119552,119648,119808,119834,119860,119886,119912,119938,119964,119990,120016,120042,120068,120094,120120,120146,120172,120198,120224,120250,120276,120302,120328,120354,120380,120406,120432,120458,120488,120513,120514,120539,120540,120546,120571,120572,120597,120598,120604,120629,120630,120655,120656,120662,120687,120688,120713,120714,120720,120745,120746,120771,120772,120778,120779,120782,120832,121344,121399,121403,121453,121461,121462,121476,121477,121479,121499,123136,123184,123191,123200,123214,123628,123632,123647,124928,125127,125136,125184,125218,125252,125264,125278,126065,126124,126125,126128,126129,126254,126255,126464,126704,126976,127232,127248,127995,128000,131072,917505,917760);
// prettier-ignore
const _last = Uint32Array.of(31,32,35,36,39,40,41,42,43,44,45,47,57,59,62,64,90,91,92,93,94,95,96,122,123,124,125,126,159,160,161,165,166,167,168,169,170,171,172,173,174,175,176,177,179,180,181,183,184,185,186,187,190,191,214,215,222,223,246,247,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,427,428,429,430,431,432,434,435,436,437,438,439,440,441,442,443,444,445,446,447,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,569,570,571,572,573,574,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,599,600,601,602,603,604,607,608,609,610,611,612,613,614,615,616,617,618,619,620,622,623,624,625,626,628,629,636,637,639,640,641,642,643,646,647,648,649,651,652,657,658,659,660,668,669,670,687,705,709,721,735,740,747,748,749,750,767,836,837,879,880,881,882,883,884,885,886,887,890,893,894,895,901,902,903,906,908,911,912,939,940,943,944,961,962,971,972,974,975,976,977,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1023,1039,1071,1103,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1159,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1288,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1310,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1321,1322,1323,1324,1325,1326,1327,1366,1369,1375,1376,1414,1416,1417,1418,1422,1423,1469,1470,1471,1472,1474,1475,1477,1478,1479,1522,1524,1541,1544,1546,1547,1549,1551,1562,1563,1564,1567,1599,1600,1610,1631,1641,1645,1647,1648,1747,1748,1749,1756,1757,1758,1764,1766,1768,1769,1773,1775,1785,1788,1790,1791,1805,1807,1808,1809,1839,1866,1957,1968,1969,1993,2026,2035,2037,2038,2041,2042,2045,2047,2069,2073,2074,2083,2084,2087,2088,2093,2110,2136,2139,2142,2237,2273,2274,2306,2307,2361,2362,2363,2364,2365,2368,2376,2380,2381,2383,2384,2391,2401,2403,2405,2415,2416,2417,2432,2433,2435,2489,2492,2493,2496,2500,2508,2509,2510,2519,2529,2531,2543,2545,2547,2553,2554,2555,2556,2557,2562,2563,2617,2620,2624,2641,2654,2671,2673,2676,2677,2678,2690,2691,2745,2748,2749,2752,2760,2764,2765,2785,2787,2799,2800,2801,2809,2817,2819,2873,2876,2877,2878,2879,2880,2884,2892,2902,2903,2913,2915,2927,2928,2929,2935,2946,3001,3007,3008,3020,3021,3024,3031,3055,3058,3064,3065,3066,3072,3075,3076,3133,3136,3140,3158,3169,3171,3183,3191,3198,3199,3200,3201,3203,3204,3257,3260,3261,3262,3263,3268,3270,3275,3277,3286,3297,3299,3311,3314,3329,3331,3386,3388,3389,3392,3396,3404,3405,3406,3407,3414,3415,3422,3425,3427,3439,3448,3449,3455,3459,3526,3530,3537,3542,3551,3567,3571,3572,3632,3633,3635,3642,3647,3653,3654,3662,3663,3673,3675,3760,3761,3763,3772,3780,3782,3789,3801,3840,3843,3858,3859,3860,3863,3865,3871,3881,3891,3892,3893,3894,3895,3896,3897,3898,3899,3900,3901,3903,3948,3966,3967,3972,3973,3975,3980,4028,4037,4038,4047,4052,4056,4058,4138,4140,4144,4145,4151,4152,4154,4156,4158,4159,4169,4175,4181,4183,4185,4189,4192,4193,4196,4198,4205,4208,4212,4225,4226,4228,4230,4236,4237,4238,4239,4249,4252,4253,4255,4301,4346,4347,4348,4351,4954,4959,4968,4988,5007,5017,5103,5109,5117,5120,5740,5742,5759,5760,5786,5787,5788,5866,5869,5872,5905,5908,5937,5940,5942,5969,5971,6000,6003,6067,6069,6070,6077,6085,6086,6088,6099,6102,6103,6106,6107,6108,6109,6121,6137,6149,6150,6154,6157,6158,6169,6210,6211,6276,6278,6312,6313,6430,6434,6438,6440,6449,6450,6456,6459,6464,6469,6479,6601,6617,6618,6655,6678,6680,6682,6683,6687,6740,6741,6742,6743,6752,6753,6754,6756,6764,6770,6783,6809,6822,6823,6829,6845,6846,6915,6916,6963,6964,6965,6970,6971,6972,6977,6978,6980,6987,7001,7008,7018,7027,7036,7041,7042,7072,7073,7077,7079,7081,7082,7085,7087,7097,7141,7142,7143,7145,7148,7149,7150,7153,7155,7167,7203,7211,7219,7221,7223,7231,7241,7247,7257,7287,7293,7295,7296,7297,7298,7300,7301,7302,7303,7304,7359,7367,7378,7379,7392,7393,7400,7404,7405,7411,7412,7414,7415,7417,7418,7467,7530,7543,7544,7545,7548,7549,7565,7566,7578,7615,7679,7680,7681,7682,7683,7684,7685,7686,7687,7688,7689,7690,7691,7692,7693,7694,7695,7696,7697,7698,7699,7700,7701,7702,7703,7704,7705,7706,7707,7708,7709,7710,7711,7712,7713,7714,7715,7716,7717,7718,7719,7720,7721,7722,7723,7724,7725,7726,7727,7728,7729,7730,7731,7732,7733,7734,7735,7736,7737,7738,7739,7740,7741,7742,7743,7744,7745,7746,7747,7748,7749,7750,7751,7752,7753,7754,7755,7756,7757,7758,7759,7760,7761,7762,7763,7764,7765,7766,7767,7768,7769,7770,7771,7772,7773,7774,7775,7776,7777,7778,7779,7780,7781,7782,7783,7784,7785,7786,7787,7788,7789,7790,7791,7792,7793,7794,7795,7796,7797,7798,7799,7800,7801,7802,7803,7804,7805,7806,7807,7808,7809,7810,7811,7812,7813,7814,7815,7816,7817,7818,7819,7820,7821,7822,7823,7824,7825,7826,7827,7828,7829,7834,7835,7837,7838,7839,7840,7841,7842,7843,7844,7845,7846,7847,7848,7849,7850,7851,7852,7853,7854,7855,7856,7857,7858,7859,7860,7861,7862,7863,7864,7865,7866,7867,7868,7869,7870,7871,7872,7873,7874,7875,7876,7877,7878,7879,7880,7881,7882,7883,7884,7885,7886,7887,7888,7889,7890,7891,7892,7893,7894,7895,7896,7897,7898,7899,7900,7901,7902,7903,7904,7905,7906,7907,7908,7909,7910,7911,7912,7913,7914,7915,7916,7917,7918,7919,7920,7921,7922,7923,7924,7925,7926,7927,7928,7929,7930,7931,7932,7933,7934,7935,7943,7951,7957,7965,7975,7983,7991,7999,8005,8013,8016,8017,8018,8019,8020,8021,8022,8023,8031,8039,8047,8049,8053,8055,8057,8059,8061,8071,8079,8087,8095,8103,8111,8113,8114,8115,8119,8121,8123,8124,8125,8126,8129,8130,8131,8135,8139,8140,8143,8145,8151,8153,8155,8159,8161,8164,8165,8167,8169,8171,8172,8175,8178,8179,8183,8185,8187,8188,8190,8202,8207,8213,8215,8216,8217,8218,8220,8221,8222,8223,8231,8232,8233,8238,8239,8248,8249,8250,8254,8256,8259,8260,8261,8262,8273,8274,8275,8276,8286,8287,8303,8304,8305,8313,8316,8317,8318,8319,8329,8332,8333,8334,8348,8383,8412,8416,8417,8420,8432,8449,8450,8454,8455,8457,8458,8461,8463,8466,8467,8468,8469,8471,8472,8477,8483,8484,8485,8486,8487,8488,8489,8490,8491,8493,8494,8495,8497,8498,8499,8500,8504,8505,8507,8509,8511,8516,8517,8521,8522,8523,8525,8526,8527,8543,8559,8575,8578,8579,8580,8584,8585,8587,8596,8601,8603,8607,8608,8610,8611,8613,8614,8621,8622,8653,8655,8657,8658,8659,8660,8691,8959,8967,8968,8969,8970,8971,8991,8993,9000,9001,9002,9083,9084,9114,9139,9179,9185,9290,9371,9397,9423,9449,9471,9654,9655,9664,9665,9719,9727,9838,9839,10087,10088,10089,10090,10091,10092,10093,10094,10095,10096,10097,10098,10099,10100,10101,10131,10175,10180,10181,10182,10213,10214,10215,10216,10217,10218,10219,10220,10221,10222,10223,10239,10495,10626,10627,10628,10629,10630,10631,10632,10633,10634,10635,10636,10637,10638,10639,10640,10641,10642,10643,10644,10645,10646,10647,10648,10711,10712,10713,10714,10715,10747,10748,10749,11007,11055,11076,11078,11084,11263,11310,11358,11360,11361,11362,11363,11364,11365,11366,11367,11368,11369,11370,11371,11372,11373,11374,11375,11376,11377,11378,11379,11380,11381,11382,11387,11389,11391,11392,11393,11394,11395,11396,11397,11398,11399,11400,11401,11402,11403,11404,11405,11406,11407,11408,11409,11410,11411,11412,11413,11414,11415,11416,11417,11418,11419,11420,11421,11422,11423,11424,11425,11426,11427,11428,11429,11430,11431,11432,11433,11434,11435,11436,11437,11438,11439,11440,11441,11442,11443,11444,11445,11446,11447,11448,11449,11450,11451,11452,11453,11454,11455,11456,11457,11458,11459,11460,11461,11462,11463,11464,11465,11466,11467,11468,11469,11470,11471,11472,11473,11474,11475,11476,11477,11478,11479,11480,11481,11482,11483,11484,11485,11486,11487,11488,11489,11490,11491,11492,11498,11499,11500,11501,11502,11505,11506,11507,11516,11517,11519,11565,11623,11631,11632,11647,11742,11775,11777,11778,11779,11780,11781,11784,11785,11786,11787,11788,11789,11798,11799,11801,11802,11803,11804,11805,11807,11808,11809,11810,11811,11812,11813,11814,11815,11816,11817,11822,11823,11833,11835,11839,11840,11841,11842,11855,12283,12288,12291,12292,12293,12294,12295,12296,12297,12298,12299,12300,12301,12302,12303,12304,12305,12307,12308,12309,12310,12311,12312,12313,12314,12315,12316,12317,12319,12320,12329,12333,12335,12336,12341,12343,12346,12347,12348,12349,12351,12438,12442,12444,12446,12447,12448,12538,12539,12542,12686,12689,12693,12703,12730,12771,12799,12830,12841,12871,12879,12880,12895,12927,12937,12976,12991,13311,19893,19967,40980,40981,42124,42182,42231,42237,42239,42507,42508,42511,42527,42537,42539,42560,42561,42562,42563,42564,42565,42566,42567,42568,42569,42570,42571,42572,42573,42574,42575,42576,42577,42578,42579,42580,42581,42582,42583,42584,42585,42586,42587,42588,42589,42590,42591,42592,42593,42594,42595,42596,42597,42598,42599,42600,42601,42602,42603,42604,42605,42606,42607,42610,42611,42621,42622,42623,42624,42625,42626,42627,42628,42629,42630,42631,42632,42633,42634,42635,42636,42637,42638,42639,42640,42641,42642,42643,42644,42645,42646,42647,42648,42649,42650,42651,42653,42655,42725,42735,42737,42743,42774,42783,42785,42786,42787,42788,42789,42790,42791,42792,42793,42794,42795,42796,42797,42798,42799,42801,42802,42803,42804,42805,42806,42807,42808,42809,42810,42811,42812,42813,42814,42815,42816,42817,42818,42819,42820,42821,42822,42823,42824,42825,42826,42827,42828,42829,42830,42831,42832,42833,42834,42835,42836,42837,42838,42839,42840,42841,42842,42843,42844,42845,42846,42847,42848,42849,42850,42851,42852,42853,42854,42855,42856,42857,42858,42859,42860,42861,42862,42863,42864,42872,42873,42874,42875,42876,42877,42878,42879,42880,42881,42882,42883,42884,42885,42886,42887,42888,42890,42891,42892,42893,42894,42895,42896,42897,42898,42899,42900,42901,42902,42903,42904,42905,42906,42907,42908,42909,42910,42911,42912,42913,42914,42915,42916,42917,42918,42919,42920,42921,42922,42923,42924,42925,42926,42927,42928,42929,42930,42931,42932,42933,42934,42935,42936,42937,42938,42939,42940,42941,42942,42943,42946,42947,42948,42949,42950,42999,43001,43002,43009,43010,43013,43014,43018,43019,43042,43044,43046,43047,43051,43061,43063,43064,43065,43123,43127,43137,43187,43203,43205,43215,43225,43249,43255,43258,43259,43260,43262,43263,43273,43301,43309,43311,43334,43345,43347,43359,43388,43394,43395,43442,43443,43445,43449,43451,43452,43456,43469,43471,43481,43487,43492,43493,43494,43503,43513,43560,43566,43568,43570,43572,43574,43586,43587,43595,43596,43597,43609,43615,43631,43632,43638,43641,43642,43643,43644,43645,43695,43696,43697,43700,43702,43704,43709,43711,43712,43713,43740,43741,43743,43754,43755,43757,43759,43761,43762,43764,43765,43766,43822,43858,43859,43866,43867,43871,43879,43967,44002,44004,44005,44007,44008,44010,44011,44012,44013,44025,64217,64279,64285,64286,64296,64297,64433,64449,64829,64830,64831,65019,65020,65021,65039,65046,65047,65048,65049,65071,65072,65074,65076,65077,65078,65079,65080,65081,65082,65083,65084,65085,65086,65087,65088,65089,65090,65091,65092,65094,65095,65096,65100,65103,65111,65112,65113,65114,65115,65116,65117,65118,65121,65122,65123,65126,65128,65129,65131,65276,65279,65283,65284,65287,65288,65289,65290,65291,65292,65293,65295,65305,65307,65310,65312,65338,65339,65340,65341,65342,65343,65344,65370,65371,65372,65373,65374,65375,65376,65377,65378,65379,65381,65391,65392,65437,65439,65500,65505,65506,65507,65508,65510,65512,65516,65518,65531,65533,65786,65794,65843,65855,65908,65912,65929,65931,66044,66045,66256,66272,66299,66335,66339,66368,66369,66377,66378,66421,66426,66461,66463,66511,66512,66517,66599,66639,66717,66729,66771,66811,66915,66927,67669,67671,67679,67702,67704,67711,67742,67759,67829,67839,67861,67867,67871,67897,67903,68023,68029,68031,68095,68096,68111,68149,68159,68168,68184,68220,68222,68223,68252,68255,68295,68296,68324,68326,68335,68342,68405,68415,68437,68447,68466,68479,68497,68508,68527,68680,68786,68850,68863,68899,68903,68921,69246,69404,69414,69445,69456,69460,69465,69622,69632,69633,69634,69687,69702,69709,69733,69743,69761,69762,69807,69810,69814,69816,69818,69820,69821,69825,69837,69864,69881,69890,69926,69931,69932,69940,69951,69955,69956,69958,70002,70003,70005,70006,70017,70018,70066,70069,70078,70080,70084,70088,70092,70093,70105,70106,70107,70108,70111,70132,70187,70190,70193,70195,70196,70197,70199,70205,70206,70312,70313,70366,70367,70370,70378,70393,70401,70403,70457,70460,70461,70463,70464,70477,70480,70487,70497,70499,70516,70708,70711,70719,70721,70724,70725,70726,70730,70735,70745,70749,70750,70831,70834,70840,70841,70842,70846,70848,70849,70851,70853,70854,70855,70873,71086,71089,71093,71099,71101,71102,71104,71127,71131,71133,71215,71218,71226,71228,71229,71230,71232,71235,71236,71257,71276,71338,71339,71340,71341,71343,71349,71350,71351,71352,71369,71450,71455,71457,71461,71462,71467,71481,71483,71486,71487,71723,71726,71735,71736,71738,71739,71871,71903,71913,71922,72144,72145,72146,72147,72155,72159,72160,72163,72164,72192,72202,72242,72248,72249,72250,72254,72262,72263,72272,72278,72280,72283,72329,72342,72343,72345,72348,72349,72354,72750,72751,72765,72766,72767,72768,72773,72793,72812,72817,72847,72871,72873,72880,72881,72883,72884,72886,73008,73029,73030,73031,73049,73097,73102,73105,73108,73109,73110,73111,73112,73129,73458,73460,73462,73464,73684,73692,73696,73713,73727,74649,74862,74868,78894,78904,92766,92777,92783,92909,92916,92917,92975,92982,92987,92991,92995,92996,92997,93017,93025,93071,93791,93823,93846,93850,94026,94031,94032,94087,94098,94177,94178,94179,113817,113820,113822,113823,113827,119140,119142,119145,119148,119154,119162,119170,119172,119179,119209,119213,119361,119364,119365,119539,119638,119672,119833,119859,119885,119911,119937,119963,119989,120015,120041,120067,120092,120119,120144,120171,120197,120223,120249,120275,120301,120327,120353,120379,120405,120431,120457,120485,120512,120513,120538,120539,120545,120570,120571,120596,120597,120603,120628,120629,120654,120655,120661,120686,120687,120712,120713,120719,120744,120745,120770,120771,120777,120778,120779,120831,121343,121398,121402,121452,121460,121461,121475,121476,121478,121483,122922,123180,123190,123197,123209,123627,123631,123641,123647,125124,125135,125142,125217,125251,125258,125273,125279,126123,126124,126127,126128,126253,126254,126269,126651,126705,127221,127244,127994,127999,129685,195101,917631,917999);
// prettier-ignore
const _idx = Uint8Array.of(0,1,2,3,2,4,5,2,6,2,7,2,8,2,6,2,9,4,2,5,10,11,10,12,4,6,5,6,0,1,2,3,13,2,10,13,14,15,6,16,13,10,13,6,17,10,18,2,10,17,14,19,17,2,9,6,9,20,12,6,12,21,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,24,25,22,23,22,23,22,23,20,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,20,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,26,22,23,22,23,22,23,27,28,29,22,23,22,23,30,22,23,31,22,23,20,32,33,34,22,23,31,35,36,37,38,22,23,39,20,37,40,41,42,22,23,22,23,22,23,43,22,23,43,20,22,23,43,22,23,44,22,23,22,23,45,22,23,20,14,22,23,20,46,14,47,48,49,47,48,49,47,48,49,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,50,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,20,47,48,49,22,23,51,52,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,53,20,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,20,54,22,23,55,56,57,22,23,58,59,60,22,23,22,23,22,23,22,23,22,23,61,62,63,64,65,20,66,20,67,20,68,69,20,66,70,20,71,20,72,73,20,74,75,73,76,77,20,75,20,78,79,20,80,20,81,20,82,20,83,82,20,84,82,85,86,87,20,88,20,14,20,89,90,20,91,10,91,10,91,10,91,10,91,10,92,93,92,22,23,22,23,91,10,22,23,91,41,2,94,10,95,2,96,97,98,20,9,99,100,20,12,101,12,102,103,104,105,106,107,108,109,110,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,111,112,113,114,115,116,6,22,23,117,22,23,20,53,118,9,12,112,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,13,92,119,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,120,22,23,22,23,22,23,22,23,22,23,22,23,22,23,121,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,122,91,2,20,123,20,2,7,13,3,92,7,92,2,92,2,92,2,92,14,2,16,6,2,3,2,13,92,2,16,2,14,91,14,92,8,2,14,92,14,2,14,92,16,13,92,91,92,13,92,14,8,14,13,14,2,16,14,92,14,92,14,92,14,8,14,92,91,13,2,91,92,3,14,92,91,92,91,92,91,92,2,14,92,2,14,92,16,92,124,14,92,124,92,14,124,92,124,92,124,14,92,14,92,2,8,2,91,14,92,124,14,92,14,124,92,124,92,14,124,14,92,8,14,3,17,13,3,14,2,92,124,14,92,124,92,14,8,92,14,92,2,92,124,14,92,14,124,92,124,92,14,92,8,2,3,14,92,124,14,92,14,124,92,124,92,124,92,124,14,92,8,13,14,17,92,14,124,92,124,92,14,124,8,17,13,3,13,92,124,92,14,92,124,92,14,92,8,2,17,13,14,92,124,2,14,92,14,124,92,124,92,124,92,124,14,92,8,14,92,124,14,92,14,124,92,124,92,14,13,14,124,17,14,92,8,17,13,14,124,14,92,124,92,124,8,124,2,14,92,14,92,3,14,91,92,2,8,2,14,92,14,92,14,91,92,8,14,13,2,13,2,13,92,13,8,17,13,92,13,92,13,92,4,5,4,5,124,14,92,124,92,2,92,14,92,13,92,13,2,13,2,14,124,92,124,92,124,92,124,92,14,8,2,14,124,92,14,92,14,124,14,124,14,92,14,92,124,92,124,92,14,124,8,124,92,13,125,126,2,91,126,14,92,2,17,14,13,127,104,110,7,14,2,14,1,14,4,5,14,2,128,14,92,14,92,2,14,92,14,92,14,92,124,92,124,92,124,92,2,91,2,3,14,92,8,17,2,7,2,92,16,8,14,91,14,92,14,92,14,92,124,92,124,92,124,92,13,2,8,14,8,17,13,14,92,124,92,2,14,124,92,124,92,124,92,124,92,124,92,8,2,91,2,92,119,92,124,14,92,124,92,124,92,124,92,124,14,8,2,13,92,13,92,124,14,124,92,124,92,124,92,14,8,14,92,124,92,124,92,124,92,124,2,14,124,92,124,92,2,8,14,8,14,91,2,129,130,131,132,133,134,135,136,137,2,92,2,92,124,92,14,92,14,92,14,124,92,14,20,91,20,91,138,20,139,20,140,20,91,92,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,20,141,20,142,20,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,143,144,143,144,143,144,143,144,143,144,20,143,20,143,20,143,20,143,144,143,144,145,146,147,148,149,150,143,151,143,151,143,151,143,20,152,20,144,153,154,10,155,10,20,152,20,156,154,10,143,20,144,157,10,143,20,113,20,144,158,117,10,20,152,20,159,160,154,10,1,16,7,2,15,19,4,15,19,4,15,2,161,162,16,1,2,15,19,2,11,2,6,4,5,2,6,2,11,2,1,16,17,91,17,6,4,5,91,17,6,4,5,91,3,92,119,92,119,92,13,107,13,107,13,20,107,20,107,20,13,107,13,6,107,13,107,13,163,13,107,13,164,165,107,13,20,107,166,107,20,14,20,13,20,107,6,107,20,13,6,13,167,13,17,168,169,128,22,23,128,17,13,6,13,6,13,6,13,6,13,6,13,6,13,6,13,6,13,6,13,6,13,4,5,4,5,13,6,13,4,5,13,6,13,6,13,6,13,17,13,170,171,17,13,6,13,6,13,6,13,6,13,4,5,4,5,4,5,4,5,4,5,4,5,4,5,17,13,6,4,5,6,4,5,4,5,4,5,4,5,4,5,6,13,6,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,6,4,5,4,5,6,4,5,6,13,6,13,6,13,122,123,22,23,172,173,174,175,176,22,23,22,23,22,23,177,178,179,180,20,22,23,20,22,23,20,91,181,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,20,13,22,23,22,23,92,22,23,2,17,2,182,14,91,2,92,14,92,2,15,19,15,19,2,15,19,2,15,19,2,7,2,7,2,15,19,2,15,19,4,5,4,5,4,5,4,5,2,91,2,7,2,7,2,4,2,13,1,2,13,91,14,128,4,5,4,5,4,5,4,5,4,5,13,4,5,4,5,4,5,4,5,7,4,5,13,128,92,124,7,91,13,128,91,14,2,13,14,92,10,91,14,7,14,2,91,14,13,17,13,14,13,14,13,17,13,17,13,17,13,17,13,17,13,14,13,14,91,14,13,14,91,2,14,91,2,14,8,14,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,14,92,119,2,92,2,91,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,91,92,14,128,92,2,10,91,10,22,23,22,23,22,23,22,23,22,23,22,23,22,23,20,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,91,20,22,23,22,23,183,22,23,22,23,22,23,22,23,22,23,91,10,22,23,184,20,14,22,23,22,23,185,20,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,22,23,186,187,188,189,186,20,190,191,192,193,22,23,22,23,22,23,22,23,22,23,22,23,22,23,194,195,196,14,91,20,14,92,14,92,14,92,14,124,92,124,13,17,13,3,13,14,2,124,14,124,92,2,8,92,14,2,14,2,14,92,8,14,92,2,14,92,124,2,14,92,124,14,92,124,92,124,92,124,2,91,8,2,14,92,91,14,8,14,92,124,92,124,92,14,92,14,92,124,8,2,14,91,14,13,14,124,92,124,14,92,14,92,14,92,14,92,14,92,14,91,2,14,124,92,124,2,14,91,124,92,14,20,197,20,10,91,20,198,14,124,92,124,92,124,2,124,92,8,14,20,14,92,14,6,14,10,14,5,4,14,3,13,92,2,4,5,2,92,2,7,11,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,2,4,5,2,11,2,7,4,5,4,5,4,5,2,6,7,6,2,3,2,14,16,2,3,2,4,5,2,6,2,7,2,8,2,6,2,9,4,2,5,10,11,10,12,4,6,5,6,4,5,2,4,5,2,14,91,14,91,14,3,6,10,13,3,13,6,13,16,13,14,2,17,13,128,17,13,17,13,92,14,92,17,14,17,14,128,14,128,14,92,14,2,14,2,128,199,200,14,8,199,200,14,2,14,2,17,14,13,17,14,17,14,17,14,17,2,14,2,14,17,14,17,14,92,14,92,17,2,14,17,2,14,17,14,13,14,92,17,2,14,2,14,17,14,17,14,2,17,14,97,102,17,14,92,8,17,14,17,14,92,17,2,14,124,92,124,14,92,2,17,8,92,124,14,124,92,124,92,2,16,2,16,14,8,92,14,92,124,92,8,2,14,124,14,92,2,14,92,124,14,124,92,124,14,2,92,2,8,14,2,14,2,17,14,124,92,124,92,124,92,2,92,14,2,14,92,124,92,8,92,124,14,92,14,124,92,124,14,124,14,124,92,14,124,92,124,92,124,92,14,2,8,2,92,14,124,92,124,92,124,92,124,92,14,2,14,8,14,124,92,124,92,124,92,2,14,92,14,124,92,124,92,124,92,2,14,8,2,14,92,124,92,124,92,124,92,14,8,14,92,124,92,124,92,8,17,2,13,14,124,92,124,92,2,9,12,8,17,14,124,92,124,92,124,92,14,124,14,92,14,92,124,14,92,2,92,14,92,124,92,14,92,124,92,2,14,2,14,124,92,124,92,14,2,8,17,2,14,92,124,92,124,92,124,92,14,92,14,92,8,14,124,92,124,92,124,92,14,8,14,92,124,2,17,13,3,13,2,14,128,2,14,16,14,8,2,14,92,2,14,92,2,13,91,2,13,8,17,14,9,12,17,2,14,92,14,124,92,91,2,91,14,13,92,2,16,13,124,92,13,124,16,92,13,92,13,92,13,92,13,17,13,17,107,20,107,20,107,20,107,20,107,20,107,20,107,20,107,20,107,20,107,20,107,20,107,20,107,20,107,6,20,6,20,107,6,20,6,20,107,6,20,6,20,107,6,20,6,20,107,6,20,6,20,107,20,8,13,92,13,92,13,92,13,92,13,2,92,14,92,91,8,14,92,8,3,14,17,92,201,202,92,8,2,17,13,17,3,17,13,17,14,6,13,17,13,10,13,14,16,92);
// prettier-ignore
const _gencat = Uint8Array.of(25,22,17,19,13,14,18,12,8,0,20,11,1,21,4,15,26,10,1,16,1,1,0,1,0,1,0,1,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1,0,2,1,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,5,5,0,0,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,0,0,7,0,1,0,1,6,0,1,0,9,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,2,1,0,2,1,0,0,0,0,0,23,24,0,0,0,0,1,9,9,21,21,0,0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1);
// prettier-ignore
const _toupper = Int32Array.of(0,0,0,0,0,0,0,0,0,0,0,0,-32,0,0,0,0,0,743,0,0,121,0,-1,0,-232,0,-300,195,0,0,0,0,0,0,0,97,0,0,163,0,130,0,0,0,0,56,0,-1,-2,-79,0,0,0,0,0,0,10815,0,0,0,10783,10780,10782,-210,-206,-205,-202,-203,42319,42315,-207,42280,42308,-209,-211,10743,42305,10749,-213,-214,10727,-218,42307,42282,-69,-217,-71,-219,42261,42258,0,0,84,0,0,0,0,0,-38,-37,-31,-64,-63,0,-62,-57,0,-47,-54,-8,-86,-80,7,-116,0,-96,0,0,0,0,-15,0,-48,0,0,3008,0,0,-6254,-6253,-6244,-6242,-6243,-6236,-6181,35266,0,35332,3814,35384,-59,0,8,0,74,86,100,128,112,126,0,9,0,0,-7205,0,0,0,0,0,0,0,0,0,0,0,-28,0,-16,0,-26,0,0,0,-10795,-10792,0,0,0,0,0,-7264,0,0,48,0,0,0,0,0,0,0,0,0,0,0,-928,-38864,0,-40,0,-34);
// prettier-ignore
const _tolower = Int32Array.of(0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-199,0,-121,0,0,210,206,205,79,202,203,207,0,211,209,0,213,0,214,218,217,219,0,2,1,0,0,-97,-56,-130,10795,-163,10792,0,-195,69,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,116,38,37,64,63,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,-60,0,-7,80,0,15,0,48,0,0,7264,0,38864,0,0,0,0,0,0,0,0,0,-3008,0,0,0,0,-7615,0,-8,0,0,0,0,0,0,-8,0,-74,-9,0,-86,-100,-112,-128,-126,0,0,-7517,-8383,-8262,28,0,16,0,26,0,-10743,-3814,-10727,0,0,-10780,-10749,-10783,-10782,-10815,0,-35332,-42280,0,-42308,-42319,-42315,-42305,-42258,-42282,-42261,928,-48,-42307,-35384,0,0,40,0,34,0);
// prettier-ignore
const _totitle = Int32Array.of(0,0,0,0,0,0,0,0,0,0,0,0,-32,0,0,0,0,0,743,0,0,121,0,-1,0,-232,0,-300,195,0,0,0,0,0,0,0,97,0,0,163,0,130,0,0,0,0,56,1,0,-1,-79,0,0,0,0,0,0,10815,0,0,0,10783,10780,10782,-210,-206,-205,-202,-203,42319,42315,-207,42280,42308,-209,-211,10743,42305,10749,-213,-214,10727,-218,42307,42282,-69,-217,-71,-219,42261,42258,0,0,84,0,0,0,0,0,-38,-37,-31,-64,-63,0,-62,-57,0,-47,-54,-8,-86,-80,7,-116,0,-96,0,0,0,0,-15,0,-48,0,0,0,0,0,-6254,-6253,-6244,-6242,-6243,-6236,-6181,35266,0,35332,3814,35384,-59,0,8,0,74,86,100,128,112,126,0,9,0,0,-7205,0,0,0,0,0,0,0,0,0,0,0,-28,0,-16,0,-26,0,0,0,-10795,-10792,0,0,0,0,0,-7264,0,0,48,0,0,0,0,0,0,0,0,0,0,0,-928,-38864,0,-40,0,-34);

function _bbsearch(key, start, end) {
  const isBaseCase = start + 1 == end;
  const pivot = ~~((start + end) / 2);
  if (key < _first[pivot]) {
    return isBaseCase ? -1 : _bbsearch(key, start, pivot);
  } else if (key <= _last[pivot]) {
    return pivot;
  } else {
    return isBaseCase ? -1 : _bbsearch(key, pivot, end);
  }
}

function _property(table, c) {
  const idx = _bbsearch(c, 0, c + 1);
  return idx == -1 ? 0 : table[_idx[idx]];
}

class Unicode {
  constructor(logger) {
    Object.seal(this);
  }

  u_gencat(c) {
    return _property(_gencat, c);
  }

  u_iswupper(c) {
    return !!((1 << this.u_gencat(c)) & 5);
  }

  u_iswlower(c) {
    return !!((1 << this.u_gencat(c)) & 2);
  }

  u_iswspace(c) {
    return !!((1 << this.u_gencat(c)) & 4194304);
  }

  u_iswalpha(c) {
    return !!((1 << this.u_gencat(c)) & 31);
  }

  u_iswdigit(c) {
    return !!((1 << this.u_gencat(c)) & 256);
  }

  u_iswalnum(c) {
    return !!((1 << this.u_gencat(c)) & 1823);
  }

  u_iswprint(c) {
    return !!((1 << this.u_gencat(c)) & 8388607);
  }

  u_iswcntrl(c) {
    return !!((1 << this.u_gencat(c)) & 33554432);
  }

  u_towlower(c) {
    return c + _property(_tolower, c);
  }

  u_towupper(c) {
    return c + _property(_toupper, c);
  }

  u_towtitle(c) {
    return c + _property(_totitle, c);
  }
}

// CONCATENATED MODULE: ./out/rts.exports.mjs


function decodeTys(arr, tag) {
  const tys = [];
  while (tag) {
    const i = (tag & 0x1f) - 1;
    if (!arr[i]) {
      throw new WebAssembly.RuntimeError(`decodeTys: unsupported tag ${tag}`);
    }
    tys.push(arr[i]);
    tag >>>= 5;
  }
  return tys;
}

function decodeRtsMk(e, ty) {
  switch (ty) {
    case "JSVal": {
      return v => e.rts_mkJSVal(e.context.stablePtrManager.newJSVal(v));
    }
    default: {
      const f = `rts_mk${ty}`;
      return v => e[f](v);
    }
  }
}

function decodeRtsGet(e, ty) {
  switch (ty) {
    case "JSVal": {
      return p => e.context.stablePtrManager.getJSVal(e.rts_getJSVal(p));
    }
    default: {
      const f = `rts_get${ty}`;
      return p => e[f](p);
    }
  }
}

class Exports {
  constructor(
    memory,
    reentrancy_guard,
    symbol_table,
    scheduler,
    stableptr_manager
  ) {
    this.context = Object.freeze({
      memory: memory,
      reentrancyGuard: reentrancy_guard,
      symbolTable: symbol_table,
      scheduler: scheduler,
      stablePtrManager: stableptr_manager,
      callbackStablePtrs: new Map(),
      rtsMkFuncs: hsTyCons.map(ty => decodeRtsMk(this, ty)),
      rtsGetFuncs: hsTyCons.map(ty => decodeRtsGet(this, ty))
    });
  }

  rts_evalIO(p) {
    return this.context.scheduler.submitCmdCreateThread(
      "createStrictIOThread",
      p
    );
  }

  rts_evalLazyIO(p) {
    return this.context.scheduler.submitCmdCreateThread("createIOThread", p);
  }

  newHaskellCallback(sp, arg_tag, ret_tag, io, finalizer) {
    const arg_mk_funcs = decodeTys(this.context.rtsMkFuncs, arg_tag),
      ret_get_funcs = decodeTys(this.context.rtsGetFuncs, ret_tag),
      run_func = this.context.symbolTable.addressOf(
        io
          ? "base_AsteriusziTopHandler_runIO_closure"
          : "base_AsteriusziTopHandler_runNonIO_closure"
      ),
      eval_func = ret_get_funcs.length
        ? p => this.rts_evalIO(p)
        : p => this.rts_evalLazyIO(p);
    if (ret_get_funcs.length > 1) {
      throw new WebAssembly.RuntimeError(`Multiple returns not supported`);
    }
    const cb = async (...args) => {
      try {
        if (args.length < arg_mk_funcs.length) {
          throw new WebAssembly.RuntimeError(
            `Expected ${arg_mk_funcs.length} arguments, got ${args.length}`
          );
        }
        let p = this.context.stablePtrManager.deRefStablePtr(sp);
        for (let i = 0; i < arg_mk_funcs.length; ++i) {
          p = this.rts_apply(p, arg_mk_funcs[i](args[i]));
        }
        p = this.rts_apply(run_func, p);
        const tid = await eval_func(p);
        if (ret_get_funcs.length) {
          return ret_get_funcs[0](this.context.scheduler.getTSOret(tid));
        }
      } finally {
        finalizer();
      }
    };
    this.context.callbackStablePtrs.set(cb, sp);
    return cb;
  }

  freeHaskellCallback(sn) {
    const cb = this.context.stablePtrManager.getJSVal(sn);
    this.context.stablePtrManager.freeStablePtr(
      this.context.callbackStablePtrs.get(cb)
    );
    this.context.callbackStablePtrs.delete(cb);
    this.context.stablePtrManager.freeJSVal(sn);
  }
}

// CONCATENATED MODULE: ./out/rts.fs.mjs
class Device {
  constructor(f, console_history) {
    this.flush = f;
    this.consoleHistory = console_history;
    this.history = "";
    this.buffer = "";
    this.decoder = new TextDecoder("utf-8", { fatal: true });
    Object.seal(this);
  }

  read() {
    const r = this.history;
    this.history = "";
    return r;
  }

  write(buf) {
    const str =
      typeof buf === "string"
        ? buf
        : this.decoder.decode(buf, { stream: true });
    if (this.consoleHistory) {
      this.history += str;
    }
    this.buffer += str;
    const segs = this.buffer.split("\n");
    this.buffer = segs.pop();
    for (const seg of segs) {
      this.flush(seg);
    }
    return buf.length;
  }
}

class FS {
  constructor(components) {
    this.components = components;
    this.stdout = new Device(console.log, true);
    this.stderr = new Device(console.error, true);
  }

  read(fd, buf, count) {
    throw new WebAssembly.RuntimeError(
      `Attempting to read(${fd}, ${buf}, ${count})`
    );
  }

  write(fd, buf, count) {
    buf = this.components.memory.expose(buf, count, Uint8Array);
    switch (fd) {
      case 1: {
        return this.stdout.write(buf);
      }
      case 2: {
        return this.stderr.write(buf);
      }
      default: {
        throw new WebAssembly.RuntimeError(
          `Attempting to write(${fd}, ${buf}, ${count})`
        );
      }
    }
  }

  writeNonMemory(fd, data) {
    switch (fd) {
      case 1: {
        this.stdout.write(data);
        break;
      }
      case 2: {
        this.stderr.write(data);
        break;
      }
      default: {
        throw new WebAssembly.RuntimeError(`writeNonMemory(${fd}, ${data})`);
      }
    }
  }

  history(fd) {
    switch (fd) {
      case 1: {
        return this.stdout.read();
      }
      case 2: {
        return this.stderr.read();
      }
      default: {
        throw new WebAssembly.RuntimeError(
          `Attempting to get history of ${fd}`
        );
      }
    }
  }
}

// CONCATENATED MODULE: ./out/rts.symtable.mjs


class SymbolTable {
  constructor(
    fn_offset_table,
    ss_offset_table,
    table_base,
    memory_base
  ) {
    this.symbolTable = new Map();
    for (const [k, off] of Object.entries(fn_offset_table)) {
      this.symbolTable.set(k, Memory.tagFunction(table_base + off));
    }
    for (const [k, off] of Object.entries(ss_offset_table)) {
      this.symbolTable.set(k, Memory.tagData(memory_base + off));
    }
    Object.freeze(this);
  }

  addressOf(sym) {
    if (!this.symbolTable.has(sym)) {
      throw new WebAssembly.RuntimeError(`${sym} not in symbol table`);
    }
    return this.symbolTable.get(sym);
  }

  allEntries() {
    return this.symbolTable;
  }
}

// CONCATENATED MODULE: ./out/rts.wasi.mjs


class WASI {
  constructor() {}

  get wasiImport() {
    return modulify(this);
  }

  initialize() {}

  args_get() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: args_get");
  }

  args_sizes_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: args_sizes_get"
    );
  }

  environ_get() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: environ_get");
  }

  environ_sizes_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: environ_sizes_get"
    );
  }

  clock_res_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: clock_res_get"
    );
  }

  clock_time_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: clock_time_get"
    );
  }

  fd_advise() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_advise");
  }

  fd_allocate() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_allocate");
  }

  fd_close() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_close");
  }

  fd_datasync() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_datasync");
  }

  fd_fdstat_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_fdstat_get"
    );
  }

  fd_fdstat_set_flags() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_fdstat_set_flags"
    );
  }

  fd_fdstat_set_rights() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_fdstat_set_rights"
    );
  }

  fd_filestat_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_filestat_get"
    );
  }

  fd_filestat_set_size() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_filestat_set_size"
    );
  }

  fd_filestat_set_times() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_filestat_set_times"
    );
  }

  fd_pread() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_pread");
  }

  fd_prestat_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_prestat_get"
    );
  }

  fd_prestat_dir_name() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: fd_prestat_dir_name"
    );
  }

  fd_pwrite() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_pwrite");
  }

  fd_read() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_read");
  }

  fd_readdir() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_readdir");
  }

  fd_renumber() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_renumber");
  }

  fd_seek() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_seek");
  }

  fd_sync() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_sync");
  }

  fd_tell() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_tell");
  }

  fd_write() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: fd_write");
  }

  path_create_directory() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: path_create_directory"
    );
  }

  path_filestat_get() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: path_filestat_get"
    );
  }

  path_filestat_set_times() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: path_filestat_set_times"
    );
  }

  path_link() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: path_link");
  }

  path_open() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: path_open");
  }

  path_readlink() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: path_readlink"
    );
  }

  path_remove_directory() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: path_remove_directory"
    );
  }

  path_rename() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: path_rename");
  }

  path_symlink() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: path_symlink"
    );
  }

  path_unlink_file() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: path_unlink_file"
    );
  }

  poll_oneoff() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: poll_oneoff");
  }

  proc_exit() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: proc_exit");
  }

  proc_raise() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: proc_raise");
  }

  sched_yield() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: sched_yield");
  }

  random_get() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: random_get");
  }

  sock_recv() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: sock_recv");
  }

  sock_send() {
    throw new WebAssembly.RuntimeError("Unsupported wasi syscall: sock_send");
  }

  sock_shutdown() {
    throw new WebAssembly.RuntimeError(
      "Unsupported wasi syscall: sock_shutdown"
    );
  }
}

// CONCATENATED MODULE: ./out/rts.mjs

























async function newAsteriusInstance(req) {
  const __asterius_components = {};

  let __asterius_table_base = new WebAssembly.Global(
      { value: "i32", mutable: false },
      req.defaultTableBase // TODO: make dynamic.
    ),
    __asterius_memory_base = new WebAssembly.Global(
      { value: "i32", mutable: false },
      req.defaultMemoryBase // TODO: make dynamic.
    );

  let mkSptEntries = function (spt_offset_entries) {
    const absolute_spt_entries = new Map();
    for (const [k, off] of spt_offset_entries.entries()) {
      absolute_spt_entries.set(
        k,
        Memory.tagData(__asterius_memory_base.value + off)
      );
    }
    return absolute_spt_entries;
  };

  let mkInfoTable = function (offset_info_tables) {
    if (!(typeof offset_info_table === "undefined")) {
      const absolute_info_tables = new Set();
      for (const off of offset_info_tables.keys()) {
        absolute_info_tables.add(
          Memory.tagData(__asterius_memory_base.value + off)
        );
      }
      return absolute_info_tables;
    }
  };

  let __asterius_persistent_state = req.persistentState
      ? req.persistentState
      : {},
    __asterius_symbol_table = new SymbolTable(
      req.functionsOffsetTable,
      req.staticsOffsetTable,
      __asterius_table_base.value,
      __asterius_memory_base.value
    ),
    __asterius_spt_entries = mkSptEntries(req.sptOffsetEntries),
    __asterius_info_tables = mkInfoTable(req.offsetInfoTables),
    __asterius_reentrancy_guard = new ReentrancyGuard(["Scheduler", "GC"]),
    __asterius_fs = new FS(__asterius_components),
    __asterius_logger = new EventLogManager(),
    __asterius_tracer = new Tracer(__asterius_logger, __asterius_symbol_table),
    __asterius_static_mblocks = Math.ceil(
      (__asterius_memory_base.value + req.staticBytes) /
        mblock_size
    ),
    __asterius_memory = new Memory(__asterius_components),
    __asterius_memory_trap = new MemoryTrap(
      __asterius_logger,
      __asterius_symbol_table,
      __asterius_memory
    ),
    __asterius_heapalloc = new HeapAlloc(
      __asterius_memory
    ),
    __asterius_stableptr_manager = new StablePtrManager(),
    __asterius_stablename_manager = new StableNameManager(
      __asterius_memory,
      __asterius_heapalloc,
      __asterius_symbol_table
    ),
    __asterius_staticptr_manager = new StaticPtrManager(
      __asterius_memory,
      __asterius_stableptr_manager,
      __asterius_spt_entries
    ),
    __asterius_scheduler = new Scheduler(
      __asterius_memory,
      __asterius_symbol_table,
      __asterius_stableptr_manager
    ),
    __asterius_integer_manager = new IntegerManager(),
    __asterius_time_cbits = new TimeCBits(__asterius_memory, req.targetSpecificModule),
    __asterius_gc = new GC(
      __asterius_memory,
      __asterius_heapalloc,
      __asterius_stableptr_manager,
      __asterius_stablename_manager,
      __asterius_scheduler,
      __asterius_info_tables,
      __asterius_symbol_table,
      __asterius_reentrancy_guard,
      req.yolo,
      req.gcThreshold
    ),
    __asterius_float_cbits = new FloatCBits(__asterius_memory),
    __asterius_messages = new Messages(__asterius_memory, __asterius_fs),
    __asterius_unicode = new Unicode(),
    __asterius_exports = new Exports(
      __asterius_memory,
      __asterius_reentrancy_guard,
      __asterius_symbol_table,
      __asterius_scheduler,
      __asterius_stableptr_manager
    ),
    __asterius_exception_helper = new ExceptionHelper(
      __asterius_memory,
      __asterius_heapalloc,
      __asterius_exports,
      __asterius_info_tables,
      __asterius_symbol_table
    );
  const __asterius_wasi = new WASI(req.progName);
  __asterius_scheduler.exports = __asterius_exports;

  __asterius_components.memory = __asterius_memory;
  __asterius_components.exports = __asterius_exports;

  function __asterius_show_I64(x) {
    return `0x${x.toString(16).padStart(8, "0")}`;
  }

  const __asterius_jsffi_instance = {
    exposeMemory: (p, len, t = Uint8Array) => __asterius_memory.expose(p, len, t),
    newJSVal: v => __asterius_stableptr_manager.newJSVal(v),
    getJSVal: i => __asterius_stableptr_manager.getJSVal(i),
    freeJSVal: i => __asterius_stableptr_manager.freeJSVal(i),
    fs: __asterius_fs,
    stdio: {
      stdout: () => __asterius_fs.history(1),
      stderr: () => __asterius_fs.history(2)
    },
    returnFFIPromise: (promise) =>
      __asterius_scheduler.returnFFIPromise(promise)
  };


  const importObject = Object.assign(
    req.jsffiFactory(__asterius_jsffi_instance),
    {
      wasi_snapshot_preview1: __asterius_wasi.wasiImport,
      env: {
        __memory_base: __asterius_memory_base,
        __table_base: __asterius_table_base
      },
      rts: {
        printI64: x => __asterius_fs.writeNonMemory(1, `${__asterius_show_I64(x)}\n`),
        assertEqI64: function(x, y) {
          if (x != y) {
            throw new WebAssembly.RuntimeError(`unequal I64: ${x}, ${y}`);
          }
        },
        print: x => __asterius_fs.writeNonMemory(1, `${x}\n`)
      },
      fs: {
        read: (fd, buf, count) => __asterius_fs.read(fd, buf, count),
        write: (fd, buf, count) => __asterius_fs.write(fd, buf, count)
      },
      posix: modulify(new (req.targetSpecificModule.posix)(__asterius_memory, rts_constants_namespaceObject)),
      time: modulify(__asterius_time_cbits),
      // cannot name this float since float is a keyword.
      floatCBits: modulify(__asterius_float_cbits),
      GC: modulify(__asterius_gc),
      ExceptionHelper: modulify(__asterius_exception_helper),
      HeapAlloc: modulify(__asterius_heapalloc),
      Integer: modulify(__asterius_integer_manager),
      Memory: modulify(__asterius_memory),
      MemoryTrap: modulify(__asterius_memory_trap),
      Messages: modulify(__asterius_messages),
      StablePtr: modulify(__asterius_stableptr_manager),
      StableName: modulify(__asterius_stablename_manager),
      StaticPtr: modulify(__asterius_staticptr_manager),
      Unicode: modulify(__asterius_unicode),
      Tracing: modulify(__asterius_tracer),
      Exports: {
        newHaskellCallback: (sp, arg_tag, ret_tag, io, oneshot) => {
          let sn = [];
          let cb = __asterius_exports.newHaskellCallback(
            sp,
            arg_tag,
            ret_tag,
            io,
            oneshot
              ? () => __asterius_exports.freeHaskellCallback(sn[0])
              : () => {}
          );
          sn[0] = __asterius_stableptr_manager.newJSVal(cb);
          return sn[0];
        },
        freeHaskellCallback: sn => __asterius_exports.freeHaskellCallback(sn)
      },
      Scheduler: modulify(__asterius_scheduler)
    }
  );

  return WebAssembly.instantiate(req.module, importObject).then(i => {
    if (req.pic) {
      i.exports.__wasm_apply_relocs();
    }

    __asterius_wasi.initialize(i);

    Object.assign(__asterius_exports, i.exports);

    __asterius_memory.init(i.exports.memory, __asterius_static_mblocks);
    __asterius_heapalloc.init();
    __asterius_scheduler.setGC(__asterius_gc);

    for (const [f, off, a, r, i] of req.exportsStaticOffsets) {
      __asterius_exports[
        f
      ] = __asterius_exports.newHaskellCallback(
        __asterius_stableptr_manager.newStablePtr(
          Memory.tagData(__asterius_memory_base.value + off)
        ),
        a,
        r,
        i,
        () => {}
      );
    }

    __asterius_exports.hs_init();

    return Object.assign(__asterius_jsffi_instance, {
      exports: __asterius_exports,
      symbolTable: __asterius_symbol_table,
      persistentState: __asterius_persistent_state
    });
  });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 				() => module['default'] :
/******/ 				() => module;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(429);
/******/ })()
;