import {
  __commonJS
} from "./chunk-BUSYA2B4.js";

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/now.js
var require_now = __commonJS({
  "node_modules/lodash/now.js"(exports, module) {
    var root = require_root();
    var now = function() {
      return root.Date.now();
    };
    module.exports = now;
  }
});

// node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    module.exports = trimmedEndIndex;
  }
});

// node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "node_modules/lodash/_baseTrim.js"(exports, module) {
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "node_modules/lodash/toNumber.js"(exports, module) {
    var baseTrim = require_baseTrim();
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// node_modules/lodash/debounce.js
var require_debounce = __commonJS({
  "node_modules/lodash/debounce.js"(exports, module) {
    var isObject = require_isObject();
    var now = require_now();
    var toNumber = require_toNumber();
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    module.exports = debounce;
  }
});

// node_modules/heap/lib/heap.js
var require_heap = __commonJS({
  "node_modules/heap/lib/heap.js"(exports, module) {
    (function() {
      var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;
      floor = Math.floor, min = Math.min;
      defaultCmp = function(x, y) {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      };
      insort = function(a, x, lo, hi, cmp) {
        var mid;
        if (lo == null) {
          lo = 0;
        }
        if (cmp == null) {
          cmp = defaultCmp;
        }
        if (lo < 0) {
          throw new Error("lo must be non-negative");
        }
        if (hi == null) {
          hi = a.length;
        }
        while (lo < hi) {
          mid = floor((lo + hi) / 2);
          if (cmp(x, a[mid]) < 0) {
            hi = mid;
          } else {
            lo = mid + 1;
          }
        }
        return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
      };
      heappush = function(array, item, cmp) {
        if (cmp == null) {
          cmp = defaultCmp;
        }
        array.push(item);
        return _siftdown(array, 0, array.length - 1, cmp);
      };
      heappop = function(array, cmp) {
        var lastelt, returnitem;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        lastelt = array.pop();
        if (array.length) {
          returnitem = array[0];
          array[0] = lastelt;
          _siftup(array, 0, cmp);
        } else {
          returnitem = lastelt;
        }
        return returnitem;
      };
      heapreplace = function(array, item, cmp) {
        var returnitem;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        returnitem = array[0];
        array[0] = item;
        _siftup(array, 0, cmp);
        return returnitem;
      };
      heappushpop = function(array, item, cmp) {
        var _ref;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        if (array.length && cmp(array[0], item) < 0) {
          _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
          _siftup(array, 0, cmp);
        }
        return item;
      };
      heapify = function(array, cmp) {
        var i, _i, _j, _len, _ref, _ref1, _results, _results1;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        _ref1 = (function() {
          _results1 = [];
          for (var _j2 = 0, _ref2 = floor(array.length / 2); 0 <= _ref2 ? _j2 < _ref2 : _j2 > _ref2; 0 <= _ref2 ? _j2++ : _j2--) {
            _results1.push(_j2);
          }
          return _results1;
        }).apply(this).reverse();
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          i = _ref1[_i];
          _results.push(_siftup(array, i, cmp));
        }
        return _results;
      };
      updateItem = function(array, item, cmp) {
        var pos;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        pos = array.indexOf(item);
        if (pos === -1) {
          return;
        }
        _siftdown(array, 0, pos, cmp);
        return _siftup(array, pos, cmp);
      };
      nlargest = function(array, n, cmp) {
        var elem, result, _i, _len, _ref;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        result = array.slice(0, n);
        if (!result.length) {
          return result;
        }
        heapify(result, cmp);
        _ref = array.slice(n);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          heappushpop(result, elem, cmp);
        }
        return result.sort(cmp).reverse();
      };
      nsmallest = function(array, n, cmp) {
        var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        if (n * 10 <= array.length) {
          result = array.slice(0, n).sort(cmp);
          if (!result.length) {
            return result;
          }
          los = result[result.length - 1];
          _ref = array.slice(n);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elem = _ref[_i];
            if (cmp(elem, los) < 0) {
              insort(result, elem, 0, null, cmp);
              result.pop();
              los = result[result.length - 1];
            }
          }
          return result;
        }
        heapify(array, cmp);
        _results = [];
        for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          _results.push(heappop(array, cmp));
        }
        return _results;
      };
      _siftdown = function(array, startpos, pos, cmp) {
        var newitem, parent, parentpos;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        newitem = array[pos];
        while (pos > startpos) {
          parentpos = pos - 1 >> 1;
          parent = array[parentpos];
          if (cmp(newitem, parent) < 0) {
            array[pos] = parent;
            pos = parentpos;
            continue;
          }
          break;
        }
        return array[pos] = newitem;
      };
      _siftup = function(array, pos, cmp) {
        var childpos, endpos, newitem, rightpos, startpos;
        if (cmp == null) {
          cmp = defaultCmp;
        }
        endpos = array.length;
        startpos = pos;
        newitem = array[pos];
        childpos = 2 * pos + 1;
        while (childpos < endpos) {
          rightpos = childpos + 1;
          if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
            childpos = rightpos;
          }
          array[pos] = array[childpos];
          pos = childpos;
          childpos = 2 * pos + 1;
        }
        array[pos] = newitem;
        return _siftdown(array, startpos, pos, cmp);
      };
      Heap = function() {
        Heap2.push = heappush;
        Heap2.pop = heappop;
        Heap2.replace = heapreplace;
        Heap2.pushpop = heappushpop;
        Heap2.heapify = heapify;
        Heap2.updateItem = updateItem;
        Heap2.nlargest = nlargest;
        Heap2.nsmallest = nsmallest;
        function Heap2(cmp) {
          this.cmp = cmp != null ? cmp : defaultCmp;
          this.nodes = [];
        }
        Heap2.prototype.push = function(x) {
          return heappush(this.nodes, x, this.cmp);
        };
        Heap2.prototype.pop = function() {
          return heappop(this.nodes, this.cmp);
        };
        Heap2.prototype.peek = function() {
          return this.nodes[0];
        };
        Heap2.prototype.contains = function(x) {
          return this.nodes.indexOf(x) !== -1;
        };
        Heap2.prototype.replace = function(x) {
          return heapreplace(this.nodes, x, this.cmp);
        };
        Heap2.prototype.pushpop = function(x) {
          return heappushpop(this.nodes, x, this.cmp);
        };
        Heap2.prototype.heapify = function() {
          return heapify(this.nodes, this.cmp);
        };
        Heap2.prototype.updateItem = function(x) {
          return updateItem(this.nodes, x, this.cmp);
        };
        Heap2.prototype.clear = function() {
          return this.nodes = [];
        };
        Heap2.prototype.empty = function() {
          return this.nodes.length === 0;
        };
        Heap2.prototype.size = function() {
          return this.nodes.length;
        };
        Heap2.prototype.clone = function() {
          var heap;
          heap = new Heap2();
          heap.nodes = this.nodes.slice(0);
          return heap;
        };
        Heap2.prototype.toArray = function() {
          return this.nodes.slice(0);
        };
        Heap2.prototype.insert = Heap2.prototype.push;
        Heap2.prototype.top = Heap2.prototype.peek;
        Heap2.prototype.front = Heap2.prototype.peek;
        Heap2.prototype.has = Heap2.prototype.contains;
        Heap2.prototype.copy = Heap2.prototype.clone;
        return Heap2;
      }();
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          return define([], factory);
        } else if (typeof exports === "object") {
          return module.exports = factory();
        } else {
          return root.Heap = factory();
        }
      })(this, function() {
        return Heap;
      });
    }).call(exports);
  }
});

// node_modules/heap/index.js
var require_heap2 = __commonJS({
  "node_modules/heap/index.js"(exports, module) {
    module.exports = require_heap();
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports, module) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports, module) {
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get;
  }
});

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    module.exports = defineProperty;
  }
});

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/_baseSet.js
var require_baseSet = __commonJS({
  "node_modules/lodash/_baseSet.js"(exports, module) {
    var assignValue = require_assignValue();
    var castPath = require_castPath();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    var toKey = require_toKey();
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);
      var index = -1, length = path.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index < length) {
        var key = toKey(path[index]), newValue = value;
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
          return object;
        }
        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    module.exports = baseSet;
  }
});

// node_modules/lodash/set.js
var require_set = __commonJS({
  "node_modules/lodash/set.js"(exports, module) {
    var baseSet = require_baseSet();
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }
    module.exports = set;
  }
});

// node_modules/lodash/_copyArray.js
var require_copyArray = __commonJS({
  "node_modules/lodash/_copyArray.js"(exports, module) {
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    module.exports = copyArray;
  }
});

// node_modules/lodash/toPath.js
var require_toPath = __commonJS({
  "node_modules/lodash/toPath.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var copyArray = require_copyArray();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var stringToPath = require_stringToPath();
    var toKey = require_toKey();
    var toString = require_toString();
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }
    module.exports = toPath;
  }
});

// node_modules/cytoscape/dist/cytoscape.cjs.js
var require_cytoscape_cjs = __commonJS({
  "node_modules/cytoscape/dist/cytoscape.cjs.js"(exports, module) {
    var debounce = require_debounce();
    var Heap = require_heap2();
    var get = require_get();
    var set = require_set();
    var toPath = require_toPath();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var debounce__default = _interopDefaultLegacy(debounce);
    var Heap__default = _interopDefaultLegacy(Heap);
    var get__default = _interopDefaultLegacy(get);
    var set__default = _interopDefaultLegacy(set);
    var toPath__default = _interopDefaultLegacy(toPath);
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _slicedToArray(arr, i2) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _iterableToArrayLimit(arr, i2) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i2 && _arr.length === i2) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
      return arr2;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var _window = typeof window === "undefined" ? null : window;
    var navigator = _window ? _window.navigator : null;
    _window ? _window.document : null;
    var typeofstr = _typeof("");
    var typeofobj = _typeof({});
    var typeoffn = _typeof(function() {
    });
    var typeofhtmlele = typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement);
    var instanceStr = function instanceStr2(obj) {
      return obj && obj.instanceString && fn$6(obj.instanceString) ? obj.instanceString() : null;
    };
    var string = function string2(obj) {
      return obj != null && _typeof(obj) == typeofstr;
    };
    var fn$6 = function fn2(obj) {
      return obj != null && _typeof(obj) === typeoffn;
    };
    var array = function array2(obj) {
      return !elementOrCollection(obj) && (Array.isArray ? Array.isArray(obj) : obj != null && obj instanceof Array);
    };
    var plainObject = function plainObject2(obj) {
      return obj != null && _typeof(obj) === typeofobj && !array(obj) && obj.constructor === Object;
    };
    var object = function object2(obj) {
      return obj != null && _typeof(obj) === typeofobj;
    };
    var number$1 = function number2(obj) {
      return obj != null && _typeof(obj) === _typeof(1) && !isNaN(obj);
    };
    var integer = function integer2(obj) {
      return number$1(obj) && Math.floor(obj) === obj;
    };
    var htmlElement = function htmlElement2(obj) {
      if ("undefined" === typeofhtmlele) {
        return void 0;
      } else {
        return null != obj && obj instanceof HTMLElement;
      }
    };
    var elementOrCollection = function elementOrCollection2(obj) {
      return element(obj) || collection(obj);
    };
    var element = function element2(obj) {
      return instanceStr(obj) === "collection" && obj._private.single;
    };
    var collection = function collection2(obj) {
      return instanceStr(obj) === "collection" && !obj._private.single;
    };
    var core = function core2(obj) {
      return instanceStr(obj) === "core";
    };
    var stylesheet = function stylesheet2(obj) {
      return instanceStr(obj) === "stylesheet";
    };
    var event = function event2(obj) {
      return instanceStr(obj) === "event";
    };
    var emptyString = function emptyString2(obj) {
      if (obj === void 0 || obj === null) {
        return true;
      } else if (obj === "" || obj.match(/^\s+$/)) {
        return true;
      }
      return false;
    };
    var domElement = function domElement2(obj) {
      if (typeof HTMLElement === "undefined") {
        return false;
      } else {
        return obj instanceof HTMLElement;
      }
    };
    var boundingBox = function boundingBox2(obj) {
      return plainObject(obj) && number$1(obj.x1) && number$1(obj.x2) && number$1(obj.y1) && number$1(obj.y2);
    };
    var promise = function promise2(obj) {
      return object(obj) && fn$6(obj.then);
    };
    var ms = function ms2() {
      return navigator && navigator.userAgent.match(/msie|trident|edge/i);
    };
    var memoize = function memoize2(fn2, keyFn) {
      if (!keyFn) {
        keyFn = function keyFn2() {
          if (arguments.length === 1) {
            return arguments[0];
          } else if (arguments.length === 0) {
            return "undefined";
          }
          var args = [];
          for (var i2 = 0; i2 < arguments.length; i2++) {
            args.push(arguments[i2]);
          }
          return args.join("$");
        };
      }
      var memoizedFn = function memoizedFn2() {
        var self2 = this;
        var args = arguments;
        var ret;
        var k = keyFn.apply(self2, args);
        var cache2 = memoizedFn2.cache;
        if (!(ret = cache2[k])) {
          ret = cache2[k] = fn2.apply(self2, args);
        }
        return ret;
      };
      memoizedFn.cache = {};
      return memoizedFn;
    };
    var camel2dash = memoize(function(str) {
      return str.replace(/([A-Z])/g, function(v) {
        return "-" + v.toLowerCase();
      });
    });
    var dash2camel = memoize(function(str) {
      return str.replace(/(-\w)/g, function(v) {
        return v[1].toUpperCase();
      });
    });
    var prependCamel = memoize(function(prefix, str) {
      return prefix + str[0].toUpperCase() + str.substring(1);
    }, function(prefix, str) {
      return prefix + "$" + str;
    });
    var capitalize = function capitalize2(str) {
      if (emptyString(str)) {
        return str;
      }
      return str.charAt(0).toUpperCase() + str.substring(1);
    };
    var number = "(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))";
    var rgba = "rgb[a]?\\((" + number + "[%]?)\\s*,\\s*(" + number + "[%]?)\\s*,\\s*(" + number + "[%]?)(?:\\s*,\\s*(" + number + "))?\\)";
    var rgbaNoBackRefs = "rgb[a]?\\((?:" + number + "[%]?)\\s*,\\s*(?:" + number + "[%]?)\\s*,\\s*(?:" + number + "[%]?)(?:\\s*,\\s*(?:" + number + "))?\\)";
    var hsla = "hsl[a]?\\((" + number + ")\\s*,\\s*(" + number + "[%])\\s*,\\s*(" + number + "[%])(?:\\s*,\\s*(" + number + "))?\\)";
    var hslaNoBackRefs = "hsl[a]?\\((?:" + number + ")\\s*,\\s*(?:" + number + "[%])\\s*,\\s*(?:" + number + "[%])(?:\\s*,\\s*(?:" + number + "))?\\)";
    var hex3 = "\\#[0-9a-fA-F]{3}";
    var hex6 = "\\#[0-9a-fA-F]{6}";
    var ascending = function ascending2(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    };
    var descending = function descending2(a, b) {
      return -1 * ascending(a, b);
    };
    var extend = Object.assign != null ? Object.assign.bind(Object) : function(tgt) {
      var args = arguments;
      for (var i2 = 1; i2 < args.length; i2++) {
        var obj = args[i2];
        if (obj == null) {
          continue;
        }
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; j++) {
          var k = keys[j];
          tgt[k] = obj[k];
        }
      }
      return tgt;
    };
    var hex2tuple = function hex2tuple2(hex) {
      if (!(hex.length === 4 || hex.length === 7) || hex[0] !== "#") {
        return;
      }
      var shortHex = hex.length === 4;
      var r, g, b;
      var base = 16;
      if (shortHex) {
        r = parseInt(hex[1] + hex[1], base);
        g = parseInt(hex[2] + hex[2], base);
        b = parseInt(hex[3] + hex[3], base);
      } else {
        r = parseInt(hex[1] + hex[2], base);
        g = parseInt(hex[3] + hex[4], base);
        b = parseInt(hex[5] + hex[6], base);
      }
      return [r, g, b];
    };
    var hsl2tuple = function hsl2tuple2(hsl) {
      var ret;
      var h, s, l, a, r, g, b;
      function hue2rgb(p3, q2, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p3 + (q2 - p3) * 6 * t;
        if (t < 1 / 2) return q2;
        if (t < 2 / 3) return p3 + (q2 - p3) * (2 / 3 - t) * 6;
        return p3;
      }
      var m = new RegExp("^" + hsla + "$").exec(hsl);
      if (m) {
        h = parseInt(m[1]);
        if (h < 0) {
          h = (360 - -1 * h % 360) % 360;
        } else if (h > 360) {
          h = h % 360;
        }
        h /= 360;
        s = parseFloat(m[2]);
        if (s < 0 || s > 100) {
          return;
        }
        s = s / 100;
        l = parseFloat(m[3]);
        if (l < 0 || l > 100) {
          return;
        }
        l = l / 100;
        a = m[4];
        if (a !== void 0) {
          a = parseFloat(a);
          if (a < 0 || a > 1) {
            return;
          }
        }
        if (s === 0) {
          r = g = b = Math.round(l * 255);
        } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p2 = 2 * l - q;
          r = Math.round(255 * hue2rgb(p2, q, h + 1 / 3));
          g = Math.round(255 * hue2rgb(p2, q, h));
          b = Math.round(255 * hue2rgb(p2, q, h - 1 / 3));
        }
        ret = [r, g, b, a];
      }
      return ret;
    };
    var rgb2tuple = function rgb2tuple2(rgb) {
      var ret;
      var m = new RegExp("^" + rgba + "$").exec(rgb);
      if (m) {
        ret = [];
        var isPct = [];
        for (var i2 = 1; i2 <= 3; i2++) {
          var channel = m[i2];
          if (channel[channel.length - 1] === "%") {
            isPct[i2] = true;
          }
          channel = parseFloat(channel);
          if (isPct[i2]) {
            channel = channel / 100 * 255;
          }
          if (channel < 0 || channel > 255) {
            return;
          }
          ret.push(Math.floor(channel));
        }
        var atLeastOneIsPct = isPct[1] || isPct[2] || isPct[3];
        var allArePct = isPct[1] && isPct[2] && isPct[3];
        if (atLeastOneIsPct && !allArePct) {
          return;
        }
        var alpha = m[4];
        if (alpha !== void 0) {
          alpha = parseFloat(alpha);
          if (alpha < 0 || alpha > 1) {
            return;
          }
          ret.push(alpha);
        }
      }
      return ret;
    };
    var colorname2tuple = function colorname2tuple2(color) {
      return colors[color.toLowerCase()];
    };
    var color2tuple = function color2tuple2(color) {
      return (array(color) ? color : null) || colorname2tuple(color) || hex2tuple(color) || rgb2tuple(color) || hsl2tuple(color);
    };
    var colors = {
      // special colour names
      transparent: [0, 0, 0, 0],
      // NB alpha === 0
      // regular colours
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      grey: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50]
    };
    var setMap = function setMap2(options) {
      var obj = options.map;
      var keys = options.keys;
      var l = keys.length;
      for (var i2 = 0; i2 < l; i2++) {
        var key = keys[i2];
        if (plainObject(key)) {
          throw Error("Tried to set map with object key");
        }
        if (i2 < keys.length - 1) {
          if (obj[key] == null) {
            obj[key] = {};
          }
          obj = obj[key];
        } else {
          obj[key] = options.value;
        }
      }
    };
    var getMap = function getMap2(options) {
      var obj = options.map;
      var keys = options.keys;
      var l = keys.length;
      for (var i2 = 0; i2 < l; i2++) {
        var key = keys[i2];
        if (plainObject(key)) {
          throw Error("Tried to get map with object key");
        }
        obj = obj[key];
        if (obj == null) {
          return obj;
        }
      }
      return obj;
    };
    var performance = _window ? _window.performance : null;
    var pnow = performance && performance.now ? function() {
      return performance.now();
    } : function() {
      return Date.now();
    };
    var raf = function() {
      if (_window) {
        if (_window.requestAnimationFrame) {
          return function(fn2) {
            _window.requestAnimationFrame(fn2);
          };
        } else if (_window.mozRequestAnimationFrame) {
          return function(fn2) {
            _window.mozRequestAnimationFrame(fn2);
          };
        } else if (_window.webkitRequestAnimationFrame) {
          return function(fn2) {
            _window.webkitRequestAnimationFrame(fn2);
          };
        } else if (_window.msRequestAnimationFrame) {
          return function(fn2) {
            _window.msRequestAnimationFrame(fn2);
          };
        }
      }
      return function(fn2) {
        if (fn2) {
          setTimeout(function() {
            fn2(pnow());
          }, 1e3 / 60);
        }
      };
    }();
    var requestAnimationFrame = function requestAnimationFrame2(fn2) {
      return raf(fn2);
    };
    var performanceNow = pnow;
    var DEFAULT_HASH_SEED = 9261;
    var K = 65599;
    var DEFAULT_HASH_SEED_ALT = 5381;
    var hashIterableInts = function hashIterableInts2(iterator) {
      var seed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_HASH_SEED;
      var hash = seed;
      var entry;
      for (; ; ) {
        entry = iterator.next();
        if (entry.done) {
          break;
        }
        hash = hash * K + entry.value | 0;
      }
      return hash;
    };
    var hashInt = function hashInt2(num) {
      var seed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_HASH_SEED;
      return seed * K + num | 0;
    };
    var hashIntAlt = function hashIntAlt2(num) {
      var seed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_HASH_SEED_ALT;
      return (seed << 5) + seed + num | 0;
    };
    var combineHashes = function combineHashes2(hash1, hash2) {
      return hash1 * 2097152 + hash2;
    };
    var combineHashesArray = function combineHashesArray2(hashes) {
      return hashes[0] * 2097152 + hashes[1];
    };
    var hashArrays = function hashArrays2(hashes1, hashes2) {
      return [hashInt(hashes1[0], hashes2[0]), hashIntAlt(hashes1[1], hashes2[1])];
    };
    var hashIntsArray = function hashIntsArray2(ints, seed) {
      var entry = {
        value: 0,
        done: false
      };
      var i2 = 0;
      var length = ints.length;
      var iterator = {
        next: function next() {
          if (i2 < length) {
            entry.value = ints[i2++];
          } else {
            entry.done = true;
          }
          return entry;
        }
      };
      return hashIterableInts(iterator, seed);
    };
    var hashString = function hashString2(str, seed) {
      var entry = {
        value: 0,
        done: false
      };
      var i2 = 0;
      var length = str.length;
      var iterator = {
        next: function next() {
          if (i2 < length) {
            entry.value = str.charCodeAt(i2++);
          } else {
            entry.done = true;
          }
          return entry;
        }
      };
      return hashIterableInts(iterator, seed);
    };
    var hashStrings = function hashStrings2() {
      return hashStringsArray(arguments);
    };
    var hashStringsArray = function hashStringsArray2(strs) {
      var hash;
      for (var i2 = 0; i2 < strs.length; i2++) {
        var str = strs[i2];
        if (i2 === 0) {
          hash = hashString(str);
        } else {
          hash = hashString(str, hash);
        }
      }
      return hash;
    };
    var warningsEnabled = true;
    var warnSupported = console.warn != null;
    var traceSupported = console.trace != null;
    var MAX_INT$1 = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var trueify = function trueify2() {
      return true;
    };
    var falsify = function falsify2() {
      return false;
    };
    var zeroify = function zeroify2() {
      return 0;
    };
    var noop$1 = function noop2() {
    };
    var error = function error2(msg) {
      throw new Error(msg);
    };
    var warnings = function warnings2(enabled) {
      if (enabled !== void 0) {
        warningsEnabled = !!enabled;
      } else {
        return warningsEnabled;
      }
    };
    var warn = function warn2(msg) {
      if (!warnings()) {
        return;
      }
      if (warnSupported) {
        console.warn(msg);
      } else {
        console.log(msg);
        if (traceSupported) {
          console.trace();
        }
      }
    };
    var clone = function clone2(obj) {
      return extend({}, obj);
    };
    var copy = function copy2(obj) {
      if (obj == null) {
        return obj;
      }
      if (array(obj)) {
        return obj.slice();
      } else if (plainObject(obj)) {
        return clone(obj);
      } else {
        return obj;
      }
    };
    var copyArray = function copyArray2(arr) {
      return arr.slice();
    };
    var uuid = function uuid2(a, b) {
      for (
        // loop :)
        b = a = "";
        // b - result , a - numeric letiable
        a++ < 36;
        //
        b += a * 51 & 52 ? (
          //  return a random number or 4
          (a ^ 15 ? (
            // generate a random number from 0 to 15
            8 ^ Math.random() * (a ^ 20 ? 16 : 4)
          ) : 4).toString(16)
        ) : "-"
      ) {
      }
      return b;
    };
    var _staticEmptyObject = {};
    var staticEmptyObject = function staticEmptyObject2() {
      return _staticEmptyObject;
    };
    var defaults$g = function defaults2(_defaults) {
      var keys = Object.keys(_defaults);
      return function(opts) {
        var filledOpts = {};
        for (var i2 = 0; i2 < keys.length; i2++) {
          var key = keys[i2];
          var optVal = opts == null ? void 0 : opts[key];
          filledOpts[key] = optVal === void 0 ? _defaults[key] : optVal;
        }
        return filledOpts;
      };
    };
    var removeFromArray = function removeFromArray2(arr, ele, oneCopy) {
      for (var i2 = arr.length - 1; i2 >= 0; i2--) {
        if (arr[i2] === ele) {
          arr.splice(i2, 1);
          if (oneCopy) {
            break;
          }
        }
      }
    };
    var clearArray = function clearArray2(arr) {
      arr.splice(0, arr.length);
    };
    var push = function push2(arr, otherArr) {
      for (var i2 = 0; i2 < otherArr.length; i2++) {
        var el = otherArr[i2];
        arr.push(el);
      }
    };
    var getPrefixedProperty = function getPrefixedProperty2(obj, propName, prefix) {
      if (prefix) {
        propName = prependCamel(prefix, propName);
      }
      return obj[propName];
    };
    var setPrefixedProperty = function setPrefixedProperty2(obj, propName, prefix, value) {
      if (prefix) {
        propName = prependCamel(prefix, propName);
      }
      obj[propName] = value;
    };
    var ObjectMap = function() {
      function ObjectMap2() {
        _classCallCheck(this, ObjectMap2);
        this._obj = {};
      }
      _createClass(ObjectMap2, [{
        key: "set",
        value: function set2(key, val) {
          this._obj[key] = val;
          return this;
        }
      }, {
        key: "delete",
        value: function _delete(key) {
          this._obj[key] = void 0;
          return this;
        }
      }, {
        key: "clear",
        value: function clear() {
          this._obj = {};
        }
      }, {
        key: "has",
        value: function has(key) {
          return this._obj[key] !== void 0;
        }
      }, {
        key: "get",
        value: function get2(key) {
          return this._obj[key];
        }
      }]);
      return ObjectMap2;
    }();
    var Map$1 = typeof Map !== "undefined" ? Map : ObjectMap;
    var undef = "undefined";
    var ObjectSet = function() {
      function ObjectSet2(arrayOrObjectSet) {
        _classCallCheck(this, ObjectSet2);
        this._obj = /* @__PURE__ */ Object.create(null);
        this.size = 0;
        if (arrayOrObjectSet != null) {
          var arr;
          if (arrayOrObjectSet.instanceString != null && arrayOrObjectSet.instanceString() === this.instanceString()) {
            arr = arrayOrObjectSet.toArray();
          } else {
            arr = arrayOrObjectSet;
          }
          for (var i2 = 0; i2 < arr.length; i2++) {
            this.add(arr[i2]);
          }
        }
      }
      _createClass(ObjectSet2, [{
        key: "instanceString",
        value: function instanceString() {
          return "set";
        }
      }, {
        key: "add",
        value: function add(val) {
          var o = this._obj;
          if (o[val] !== 1) {
            o[val] = 1;
            this.size++;
          }
        }
      }, {
        key: "delete",
        value: function _delete(val) {
          var o = this._obj;
          if (o[val] === 1) {
            o[val] = 0;
            this.size--;
          }
        }
      }, {
        key: "clear",
        value: function clear() {
          this._obj = /* @__PURE__ */ Object.create(null);
        }
      }, {
        key: "has",
        value: function has(val) {
          return this._obj[val] === 1;
        }
      }, {
        key: "toArray",
        value: function toArray() {
          var _this = this;
          return Object.keys(this._obj).filter(function(key) {
            return _this.has(key);
          });
        }
      }, {
        key: "forEach",
        value: function forEach(callback, thisArg) {
          return this.toArray().forEach(callback, thisArg);
        }
      }]);
      return ObjectSet2;
    }();
    var Set$1 = (typeof Set === "undefined" ? "undefined" : _typeof(Set)) !== undef ? Set : ObjectSet;
    var Element = function Element2(cy, params) {
      var restore = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      if (cy === void 0 || params === void 0 || !core(cy)) {
        error("An element must have a core reference and parameters set");
        return;
      }
      var group = params.group;
      if (group == null) {
        if (params.data && params.data.source != null && params.data.target != null) {
          group = "edges";
        } else {
          group = "nodes";
        }
      }
      if (group !== "nodes" && group !== "edges") {
        error("An element must be of type `nodes` or `edges`; you specified `" + group + "`");
        return;
      }
      this.length = 1;
      this[0] = this;
      var _p = this._private = {
        cy,
        single: true,
        // indicates this is an element
        data: params.data || {},
        // data object
        position: params.position || {
          x: 0,
          y: 0
        },
        // (x, y) position pair
        autoWidth: void 0,
        // width and height of nodes calculated by the renderer when set to special 'auto' value
        autoHeight: void 0,
        autoPadding: void 0,
        compoundBoundsClean: false,
        // whether the compound dimensions need to be recalculated the next time dimensions are read
        listeners: [],
        // array of bound listeners
        group,
        // string; 'nodes' or 'edges'
        style: {},
        // properties as set by the style
        rstyle: {},
        // properties for style sent from the renderer to the core
        styleCxts: [],
        // applied style contexts from the styler
        styleKeys: {},
        // per-group keys of style property values
        removed: true,
        // whether it's inside the vis; true if removed (set true here since we call restore)
        selected: params.selected ? true : false,
        // whether it's selected
        selectable: params.selectable === void 0 ? true : params.selectable ? true : false,
        // whether it's selectable
        locked: params.locked ? true : false,
        // whether the element is locked (cannot be moved)
        grabbed: false,
        // whether the element is grabbed by the mouse; renderer sets this privately
        grabbable: params.grabbable === void 0 ? true : params.grabbable ? true : false,
        // whether the element can be grabbed
        pannable: params.pannable === void 0 ? group === "edges" ? true : false : params.pannable ? true : false,
        // whether the element has passthrough panning enabled
        active: false,
        // whether the element is active from user interaction
        classes: new Set$1(),
        // map ( className => true )
        animation: {
          // object for currently-running animations
          current: [],
          queue: []
        },
        rscratch: {},
        // object in which the renderer can store information
        scratch: params.scratch || {},
        // scratch objects
        edges: [],
        // array of connected edges
        children: [],
        // array of children
        parent: params.parent && params.parent.isNode() ? params.parent : null,
        // parent ref
        traversalCache: {},
        // cache of output of traversal functions
        backgrounding: false,
        // whether background images are loading
        bbCache: null,
        // cache of the current bounding box
        bbCacheShift: {
          x: 0,
          y: 0
        },
        // shift applied to cached bb to be applied on next get
        bodyBounds: null,
        // bounds cache of element body, w/o overlay
        overlayBounds: null,
        // bounds cache of element body, including overlay
        labelBounds: {
          // bounds cache of labels
          all: null,
          source: null,
          target: null,
          main: null
        },
        arrowBounds: {
          // bounds cache of edge arrows
          source: null,
          target: null,
          "mid-source": null,
          "mid-target": null
        }
      };
      if (_p.position.x == null) {
        _p.position.x = 0;
      }
      if (_p.position.y == null) {
        _p.position.y = 0;
      }
      if (params.renderedPosition) {
        var rpos = params.renderedPosition;
        var pan = cy.pan();
        var zoom = cy.zoom();
        _p.position = {
          x: (rpos.x - pan.x) / zoom,
          y: (rpos.y - pan.y) / zoom
        };
      }
      var classes = [];
      if (array(params.classes)) {
        classes = params.classes;
      } else if (string(params.classes)) {
        classes = params.classes.split(/\s+/);
      }
      for (var i2 = 0, l = classes.length; i2 < l; i2++) {
        var cls = classes[i2];
        if (!cls || cls === "") {
          continue;
        }
        _p.classes.add(cls);
      }
      this.createEmitter();
      var bypass = params.style || params.css;
      if (bypass) {
        warn("Setting a `style` bypass at element creation should be done only when absolutely necessary.  Try to use the stylesheet instead.");
        this.style(bypass);
      }
      if (restore === void 0 || restore) {
        this.restore();
      }
    };
    var defineSearch = function defineSearch2(params) {
      params = {
        bfs: params.bfs || !params.dfs,
        dfs: params.dfs || !params.bfs
      };
      return function searchFn(roots, fn2, directed) {
        var options;
        if (plainObject(roots) && !elementOrCollection(roots)) {
          options = roots;
          roots = options.roots || options.root;
          fn2 = options.visit;
          directed = options.directed;
        }
        directed = arguments.length === 2 && !fn$6(fn2) ? fn2 : directed;
        fn2 = fn$6(fn2) ? fn2 : function() {
        };
        var cy = this._private.cy;
        var v = roots = string(roots) ? this.filter(roots) : roots;
        var Q = [];
        var connectedNodes = [];
        var connectedBy = {};
        var id2depth = {};
        var V = {};
        var j = 0;
        var found;
        var _this$byGroup = this.byGroup(), nodes = _this$byGroup.nodes, edges = _this$byGroup.edges;
        for (var i2 = 0; i2 < v.length; i2++) {
          var vi = v[i2];
          var viId = vi.id();
          if (vi.isNode()) {
            Q.unshift(vi);
            if (params.bfs) {
              V[viId] = true;
              connectedNodes.push(vi);
            }
            id2depth[viId] = 0;
          }
        }
        var _loop = function _loop2() {
          var v2 = params.bfs ? Q.shift() : Q.pop();
          var vId = v2.id();
          if (params.dfs) {
            if (V[vId]) {
              return "continue";
            }
            V[vId] = true;
            connectedNodes.push(v2);
          }
          var depth = id2depth[vId];
          var prevEdge = connectedBy[vId];
          var src = prevEdge != null ? prevEdge.source() : null;
          var tgt = prevEdge != null ? prevEdge.target() : null;
          var prevNode = prevEdge == null ? void 0 : v2.same(src) ? tgt[0] : src[0];
          var ret = void 0;
          ret = fn2(v2, prevEdge, prevNode, j++, depth);
          if (ret === true) {
            found = v2;
            return "break";
          }
          if (ret === false) {
            return "break";
          }
          var vwEdges = v2.connectedEdges().filter(function(e2) {
            return (!directed || e2.source().same(v2)) && edges.has(e2);
          });
          for (var _i2 = 0; _i2 < vwEdges.length; _i2++) {
            var e = vwEdges[_i2];
            var w = e.connectedNodes().filter(function(n) {
              return !n.same(v2) && nodes.has(n);
            });
            var wId = w.id();
            if (w.length !== 0 && !V[wId]) {
              w = w[0];
              Q.push(w);
              if (params.bfs) {
                V[wId] = true;
                connectedNodes.push(w);
              }
              connectedBy[wId] = e;
              id2depth[wId] = id2depth[vId] + 1;
            }
          }
        };
        while (Q.length !== 0) {
          var _ret = _loop();
          if (_ret === "continue") continue;
          if (_ret === "break") break;
        }
        var connectedEles = cy.collection();
        for (var _i = 0; _i < connectedNodes.length; _i++) {
          var node = connectedNodes[_i];
          var edge = connectedBy[node.id()];
          if (edge != null) {
            connectedEles.push(edge);
          }
          connectedEles.push(node);
        }
        return {
          path: cy.collection(connectedEles),
          found: cy.collection(found)
        };
      };
    };
    var elesfn$v = {
      breadthFirstSearch: defineSearch({
        bfs: true
      }),
      depthFirstSearch: defineSearch({
        dfs: true
      })
    };
    elesfn$v.bfs = elesfn$v.breadthFirstSearch;
    elesfn$v.dfs = elesfn$v.depthFirstSearch;
    var dijkstraDefaults = defaults$g({
      root: null,
      weight: function weight(edge) {
        return 1;
      },
      directed: false
    });
    var elesfn$u = {
      dijkstra: function dijkstra(options) {
        if (!plainObject(options)) {
          var args = arguments;
          options = {
            root: args[0],
            weight: args[1],
            directed: args[2]
          };
        }
        var _dijkstraDefaults = dijkstraDefaults(options), root = _dijkstraDefaults.root, weight = _dijkstraDefaults.weight, directed = _dijkstraDefaults.directed;
        var eles = this;
        var weightFn = weight;
        var source = string(root) ? this.filter(root)[0] : root[0];
        var dist2 = {};
        var prev = {};
        var knownDist = {};
        var _this$byGroup = this.byGroup(), nodes = _this$byGroup.nodes, edges = _this$byGroup.edges;
        edges.unmergeBy(function(ele) {
          return ele.isLoop();
        });
        var getDist2 = function getDist3(node2) {
          return dist2[node2.id()];
        };
        var setDist = function setDist2(node2, d) {
          dist2[node2.id()] = d;
          Q.updateItem(node2);
        };
        var Q = new Heap__default["default"](function(a, b) {
          return getDist2(a) - getDist2(b);
        });
        for (var i2 = 0; i2 < nodes.length; i2++) {
          var node = nodes[i2];
          dist2[node.id()] = node.same(source) ? 0 : Infinity;
          Q.push(node);
        }
        var distBetween = function distBetween2(u2, v2) {
          var uvs = (directed ? u2.edgesTo(v2) : u2.edgesWith(v2)).intersect(edges);
          var smallestDistance = Infinity;
          var smallestEdge;
          for (var _i = 0; _i < uvs.length; _i++) {
            var edge = uvs[_i];
            var _weight = weightFn(edge);
            if (_weight < smallestDistance || !smallestEdge) {
              smallestDistance = _weight;
              smallestEdge = edge;
            }
          }
          return {
            edge: smallestEdge,
            dist: smallestDistance
          };
        };
        while (Q.size() > 0) {
          var u = Q.pop();
          var smalletsDist = getDist2(u);
          var uid = u.id();
          knownDist[uid] = smalletsDist;
          if (smalletsDist === Infinity) {
            continue;
          }
          var neighbors = u.neighborhood().intersect(nodes);
          for (var _i2 = 0; _i2 < neighbors.length; _i2++) {
            var v = neighbors[_i2];
            var vid = v.id();
            var vDist = distBetween(u, v);
            var alt = smalletsDist + vDist.dist;
            if (alt < getDist2(v)) {
              setDist(v, alt);
              prev[vid] = {
                node: u,
                edge: vDist.edge
              };
            }
          }
        }
        return {
          distanceTo: function distanceTo(node2) {
            var target = string(node2) ? nodes.filter(node2)[0] : node2[0];
            return knownDist[target.id()];
          },
          pathTo: function pathTo(node2) {
            var target = string(node2) ? nodes.filter(node2)[0] : node2[0];
            var S = [];
            var u2 = target;
            var uid2 = u2.id();
            if (target.length > 0) {
              S.unshift(target);
              while (prev[uid2]) {
                var p2 = prev[uid2];
                S.unshift(p2.edge);
                S.unshift(p2.node);
                u2 = p2.node;
                uid2 = u2.id();
              }
            }
            return eles.spawn(S);
          }
        };
      }
    };
    var elesfn$t = {
      // kruskal's algorithm (finds min spanning tree, assuming undirected graph)
      // implemented from pseudocode from wikipedia
      kruskal: function kruskal(weightFn) {
        weightFn = weightFn || function(edge2) {
          return 1;
        };
        var _this$byGroup = this.byGroup(), nodes = _this$byGroup.nodes, edges = _this$byGroup.edges;
        var numNodes = nodes.length;
        var forest = new Array(numNodes);
        var A = nodes;
        var findSetIndex = function findSetIndex2(ele) {
          for (var i3 = 0; i3 < forest.length; i3++) {
            var eles = forest[i3];
            if (eles.has(ele)) {
              return i3;
            }
          }
        };
        for (var i2 = 0; i2 < numNodes; i2++) {
          forest[i2] = this.spawn(nodes[i2]);
        }
        var S = edges.sort(function(a, b) {
          return weightFn(a) - weightFn(b);
        });
        for (var _i = 0; _i < S.length; _i++) {
          var edge = S[_i];
          var u = edge.source()[0];
          var v = edge.target()[0];
          var setUIndex = findSetIndex(u);
          var setVIndex = findSetIndex(v);
          var setU = forest[setUIndex];
          var setV = forest[setVIndex];
          if (setUIndex !== setVIndex) {
            A.merge(edge);
            setU.merge(setV);
            forest.splice(setVIndex, 1);
          }
        }
        return A;
      }
    };
    var aStarDefaults = defaults$g({
      root: null,
      goal: null,
      weight: function weight(edge) {
        return 1;
      },
      heuristic: function heuristic(edge) {
        return 0;
      },
      directed: false
    });
    var elesfn$s = {
      // Implemented from pseudocode from wikipedia
      aStar: function aStar(options) {
        var cy = this.cy();
        var _aStarDefaults = aStarDefaults(options), root = _aStarDefaults.root, goal = _aStarDefaults.goal, heuristic = _aStarDefaults.heuristic, directed = _aStarDefaults.directed, weight = _aStarDefaults.weight;
        root = cy.collection(root)[0];
        goal = cy.collection(goal)[0];
        var sid = root.id();
        var tid = goal.id();
        var gScore = {};
        var fScore = {};
        var closedSetIds = {};
        var openSet = new Heap__default["default"](function(a, b) {
          return fScore[a.id()] - fScore[b.id()];
        });
        var openSetIds = new Set$1();
        var cameFrom = {};
        var cameFromEdge = {};
        var addToOpenSet = function addToOpenSet2(ele, id) {
          openSet.push(ele);
          openSetIds.add(id);
        };
        var cMin, cMinId;
        var popFromOpenSet = function popFromOpenSet2() {
          cMin = openSet.pop();
          cMinId = cMin.id();
          openSetIds["delete"](cMinId);
        };
        var isInOpenSet = function isInOpenSet2(id) {
          return openSetIds.has(id);
        };
        addToOpenSet(root, sid);
        gScore[sid] = 0;
        fScore[sid] = heuristic(root);
        var steps = 0;
        while (openSet.size() > 0) {
          popFromOpenSet();
          steps++;
          if (cMinId === tid) {
            var path = [];
            var pathNode = goal;
            var pathNodeId = tid;
            var pathEdge = cameFromEdge[pathNodeId];
            for (; ; ) {
              path.unshift(pathNode);
              if (pathEdge != null) {
                path.unshift(pathEdge);
              }
              pathNode = cameFrom[pathNodeId];
              if (pathNode == null) {
                break;
              }
              pathNodeId = pathNode.id();
              pathEdge = cameFromEdge[pathNodeId];
            }
            return {
              found: true,
              distance: gScore[cMinId],
              path: this.spawn(path),
              steps
            };
          }
          closedSetIds[cMinId] = true;
          var vwEdges = cMin._private.edges;
          for (var i2 = 0; i2 < vwEdges.length; i2++) {
            var e = vwEdges[i2];
            if (!this.hasElementWithId(e.id())) {
              continue;
            }
            if (directed && e.data("source") !== cMinId) {
              continue;
            }
            var wSrc = e.source();
            var wTgt = e.target();
            var w = wSrc.id() !== cMinId ? wSrc : wTgt;
            var wid = w.id();
            if (!this.hasElementWithId(wid)) {
              continue;
            }
            if (closedSetIds[wid]) {
              continue;
            }
            var tempScore = gScore[cMinId] + weight(e);
            if (!isInOpenSet(wid)) {
              gScore[wid] = tempScore;
              fScore[wid] = tempScore + heuristic(w);
              addToOpenSet(w, wid);
              cameFrom[wid] = cMin;
              cameFromEdge[wid] = e;
              continue;
            }
            if (tempScore < gScore[wid]) {
              gScore[wid] = tempScore;
              fScore[wid] = tempScore + heuristic(w);
              cameFrom[wid] = cMin;
              cameFromEdge[wid] = e;
            }
          }
        }
        return {
          found: false,
          distance: void 0,
          path: void 0,
          steps
        };
      }
    };
    var floydWarshallDefaults = defaults$g({
      weight: function weight(edge) {
        return 1;
      },
      directed: false
    });
    var elesfn$r = {
      // Implemented from pseudocode from wikipedia
      floydWarshall: function floydWarshall(options) {
        var cy = this.cy();
        var _floydWarshallDefault = floydWarshallDefaults(options), weight = _floydWarshallDefault.weight, directed = _floydWarshallDefault.directed;
        var weightFn = weight;
        var _this$byGroup = this.byGroup(), nodes = _this$byGroup.nodes, edges = _this$byGroup.edges;
        var N = nodes.length;
        var Nsq = N * N;
        var indexOf = function indexOf2(node) {
          return nodes.indexOf(node);
        };
        var atIndex = function atIndex2(i3) {
          return nodes[i3];
        };
        var dist2 = new Array(Nsq);
        for (var n = 0; n < Nsq; n++) {
          var j = n % N;
          var i2 = (n - j) / N;
          if (i2 === j) {
            dist2[n] = 0;
          } else {
            dist2[n] = Infinity;
          }
        }
        var next = new Array(Nsq);
        var edgeNext = new Array(Nsq);
        for (var _i = 0; _i < edges.length; _i++) {
          var edge = edges[_i];
          var src = edge.source()[0];
          var tgt = edge.target()[0];
          if (src === tgt) {
            continue;
          }
          var s = indexOf(src);
          var t = indexOf(tgt);
          var st = s * N + t;
          var _weight = weightFn(edge);
          if (dist2[st] > _weight) {
            dist2[st] = _weight;
            next[st] = t;
            edgeNext[st] = edge;
          }
          if (!directed) {
            var ts = t * N + s;
            if (!directed && dist2[ts] > _weight) {
              dist2[ts] = _weight;
              next[ts] = s;
              edgeNext[ts] = edge;
            }
          }
        }
        for (var k = 0; k < N; k++) {
          for (var _i2 = 0; _i2 < N; _i2++) {
            var ik = _i2 * N + k;
            for (var _j = 0; _j < N; _j++) {
              var ij = _i2 * N + _j;
              var kj = k * N + _j;
              if (dist2[ik] + dist2[kj] < dist2[ij]) {
                dist2[ij] = dist2[ik] + dist2[kj];
                next[ij] = next[ik];
              }
            }
          }
        }
        var getArgEle = function getArgEle2(ele) {
          return (string(ele) ? cy.filter(ele) : ele)[0];
        };
        var indexOfArgEle = function indexOfArgEle2(ele) {
          return indexOf(getArgEle(ele));
        };
        var res = {
          distance: function distance(from, to) {
            var i3 = indexOfArgEle(from);
            var j2 = indexOfArgEle(to);
            return dist2[i3 * N + j2];
          },
          path: function path(from, to) {
            var i3 = indexOfArgEle(from);
            var j2 = indexOfArgEle(to);
            var fromNode = atIndex(i3);
            if (i3 === j2) {
              return fromNode.collection();
            }
            if (next[i3 * N + j2] == null) {
              return cy.collection();
            }
            var path2 = cy.collection();
            var prev = i3;
            var edge2;
            path2.merge(fromNode);
            while (i3 !== j2) {
              prev = i3;
              i3 = next[i3 * N + j2];
              edge2 = edgeNext[prev * N + i3];
              path2.merge(edge2);
              path2.merge(atIndex(i3));
            }
            return path2;
          }
        };
        return res;
      }
      // floydWarshall
    };
    var bellmanFordDefaults = defaults$g({
      weight: function weight(edge) {
        return 1;
      },
      directed: false,
      root: null
    });
    var elesfn$q = {
      // Implemented from pseudocode from wikipedia
      bellmanFord: function bellmanFord(options) {
        var _this = this;
        var _bellmanFordDefaults = bellmanFordDefaults(options), weight = _bellmanFordDefaults.weight, directed = _bellmanFordDefaults.directed, root = _bellmanFordDefaults.root;
        var weightFn = weight;
        var eles = this;
        var cy = this.cy();
        var _this$byGroup = this.byGroup(), edges = _this$byGroup.edges, nodes = _this$byGroup.nodes;
        var numNodes = nodes.length;
        var infoMap = new Map$1();
        var hasNegativeWeightCycle = false;
        var negativeWeightCycles = [];
        root = cy.collection(root)[0];
        edges.unmergeBy(function(edge2) {
          return edge2.isLoop();
        });
        var numEdges = edges.length;
        var getInfo2 = function getInfo3(node2) {
          var obj = infoMap.get(node2.id());
          if (!obj) {
            obj = {};
            infoMap.set(node2.id(), obj);
          }
          return obj;
        };
        var getNodeFromTo = function getNodeFromTo2(to) {
          return (string(to) ? cy.$(to) : to)[0];
        };
        var distanceTo = function distanceTo2(to) {
          return getInfo2(getNodeFromTo(to)).dist;
        };
        var pathTo = function pathTo2(to) {
          var thisStart = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : root;
          var end = getNodeFromTo(to);
          var path = [];
          var node2 = end;
          for (; ; ) {
            if (node2 == null) {
              return _this.spawn();
            }
            var _getInfo = getInfo2(node2), edge2 = _getInfo.edge, pred = _getInfo.pred;
            path.unshift(node2[0]);
            if (node2.same(thisStart) && path.length > 0) {
              break;
            }
            if (edge2 != null) {
              path.unshift(edge2);
            }
            node2 = pred;
          }
          return eles.spawn(path);
        };
        for (var i2 = 0; i2 < numNodes; i2++) {
          var node = nodes[i2];
          var info = getInfo2(node);
          if (node.same(root)) {
            info.dist = 0;
          } else {
            info.dist = Infinity;
          }
          info.pred = null;
          info.edge = null;
        }
        var replacedEdge = false;
        var checkForEdgeReplacement = function checkForEdgeReplacement2(node1, node2, edge2, info1, info2, weight2) {
          var dist2 = info1.dist + weight2;
          if (dist2 < info2.dist && !edge2.same(info1.edge)) {
            info2.dist = dist2;
            info2.pred = node1;
            info2.edge = edge2;
            replacedEdge = true;
          }
        };
        for (var _i = 1; _i < numNodes; _i++) {
          replacedEdge = false;
          for (var e = 0; e < numEdges; e++) {
            var edge = edges[e];
            var src = edge.source();
            var tgt = edge.target();
            var _weight = weightFn(edge);
            var srcInfo = getInfo2(src);
            var tgtInfo = getInfo2(tgt);
            checkForEdgeReplacement(src, tgt, edge, srcInfo, tgtInfo, _weight);
            if (!directed) {
              checkForEdgeReplacement(tgt, src, edge, tgtInfo, srcInfo, _weight);
            }
          }
          if (!replacedEdge) {
            break;
          }
        }
        if (replacedEdge) {
          var negativeWeightCycleIds = [];
          for (var _e = 0; _e < numEdges; _e++) {
            var _edge = edges[_e];
            var _src = _edge.source();
            var _tgt = _edge.target();
            var _weight2 = weightFn(_edge);
            var srcDist = getInfo2(_src).dist;
            var tgtDist = getInfo2(_tgt).dist;
            if (srcDist + _weight2 < tgtDist || !directed && tgtDist + _weight2 < srcDist) {
              if (!hasNegativeWeightCycle) {
                warn("Graph contains a negative weight cycle for Bellman-Ford");
                hasNegativeWeightCycle = true;
              }
              if (options.findNegativeWeightCycles !== false) {
                var negativeNodes = [];
                if (srcDist + _weight2 < tgtDist) {
                  negativeNodes.push(_src);
                }
                if (!directed && tgtDist + _weight2 < srcDist) {
                  negativeNodes.push(_tgt);
                }
                var numNegativeNodes = negativeNodes.length;
                for (var n = 0; n < numNegativeNodes; n++) {
                  var start = negativeNodes[n];
                  var cycle = [start];
                  cycle.push(getInfo2(start).edge);
                  var _node = getInfo2(start).pred;
                  while (cycle.indexOf(_node) === -1) {
                    cycle.push(_node);
                    cycle.push(getInfo2(_node).edge);
                    _node = getInfo2(_node).pred;
                  }
                  cycle = cycle.slice(cycle.indexOf(_node));
                  var smallestId = cycle[0].id();
                  var smallestIndex = 0;
                  for (var c = 2; c < cycle.length; c += 2) {
                    if (cycle[c].id() < smallestId) {
                      smallestId = cycle[c].id();
                      smallestIndex = c;
                    }
                  }
                  cycle = cycle.slice(smallestIndex).concat(cycle.slice(0, smallestIndex));
                  cycle.push(cycle[0]);
                  var cycleId = cycle.map(function(el) {
                    return el.id();
                  }).join(",");
                  if (negativeWeightCycleIds.indexOf(cycleId) === -1) {
                    negativeWeightCycles.push(eles.spawn(cycle));
                    negativeWeightCycleIds.push(cycleId);
                  }
                }
              } else {
                break;
              }
            }
          }
        }
        return {
          distanceTo,
          pathTo,
          hasNegativeWeightCycle,
          negativeWeightCycles
        };
      }
      // bellmanFord
    };
    var sqrt2 = Math.sqrt(2);
    var collapse = function collapse2(edgeIndex, nodeMap, remainingEdges) {
      if (remainingEdges.length === 0) {
        error("Karger-Stein must be run on a connected (sub)graph");
      }
      var edgeInfo = remainingEdges[edgeIndex];
      var sourceIn = edgeInfo[1];
      var targetIn = edgeInfo[2];
      var partition1 = nodeMap[sourceIn];
      var partition2 = nodeMap[targetIn];
      var newEdges = remainingEdges;
      for (var i2 = newEdges.length - 1; i2 >= 0; i2--) {
        var edge = newEdges[i2];
        var src = edge[1];
        var tgt = edge[2];
        if (nodeMap[src] === partition1 && nodeMap[tgt] === partition2 || nodeMap[src] === partition2 && nodeMap[tgt] === partition1) {
          newEdges.splice(i2, 1);
        }
      }
      for (var _i = 0; _i < newEdges.length; _i++) {
        var _edge = newEdges[_i];
        if (_edge[1] === partition2) {
          newEdges[_i] = _edge.slice();
          newEdges[_i][1] = partition1;
        } else if (_edge[2] === partition2) {
          newEdges[_i] = _edge.slice();
          newEdges[_i][2] = partition1;
        }
      }
      for (var _i2 = 0; _i2 < nodeMap.length; _i2++) {
        if (nodeMap[_i2] === partition2) {
          nodeMap[_i2] = partition1;
        }
      }
      return newEdges;
    };
    var contractUntil = function contractUntil2(metaNodeMap, remainingEdges, size, sizeLimit) {
      while (size > sizeLimit) {
        var edgeIndex = Math.floor(Math.random() * remainingEdges.length);
        remainingEdges = collapse(edgeIndex, metaNodeMap, remainingEdges);
        size--;
      }
      return remainingEdges;
    };
    var elesfn$p = {
      // Computes the minimum cut of an undirected graph
      // Returns the correct answer with high probability
      kargerStein: function kargerStein() {
        var _this = this;
        var _this$byGroup = this.byGroup(), nodes = _this$byGroup.nodes, edges = _this$byGroup.edges;
        edges.unmergeBy(function(edge) {
          return edge.isLoop();
        });
        var numNodes = nodes.length;
        var numEdges = edges.length;
        var numIter = Math.ceil(Math.pow(Math.log(numNodes) / Math.LN2, 2));
        var stopSize = Math.floor(numNodes / sqrt2);
        if (numNodes < 2) {
          error("At least 2 nodes are required for Karger-Stein algorithm");
          return void 0;
        }
        var edgeIndexes = [];
        for (var i2 = 0; i2 < numEdges; i2++) {
          var e = edges[i2];
          edgeIndexes.push([i2, nodes.indexOf(e.source()), nodes.indexOf(e.target())]);
        }
        var minCutSize = Infinity;
        var minCutEdgeIndexes = [];
        var minCutNodeMap = new Array(numNodes);
        var metaNodeMap = new Array(numNodes);
        var metaNodeMap2 = new Array(numNodes);
        var copyNodesMap = function copyNodesMap2(from, to) {
          for (var _i3 = 0; _i3 < numNodes; _i3++) {
            to[_i3] = from[_i3];
          }
        };
        for (var iter = 0; iter <= numIter; iter++) {
          for (var _i4 = 0; _i4 < numNodes; _i4++) {
            metaNodeMap[_i4] = _i4;
          }
          var edgesState = contractUntil(metaNodeMap, edgeIndexes.slice(), numNodes, stopSize);
          var edgesState2 = edgesState.slice();
          copyNodesMap(metaNodeMap, metaNodeMap2);
          var res1 = contractUntil(metaNodeMap, edgesState, stopSize, 2);
          var res2 = contractUntil(metaNodeMap2, edgesState2, stopSize, 2);
          if (res1.length <= res2.length && res1.length < minCutSize) {
            minCutSize = res1.length;
            minCutEdgeIndexes = res1;
            copyNodesMap(metaNodeMap, minCutNodeMap);
          } else if (res2.length <= res1.length && res2.length < minCutSize) {
            minCutSize = res2.length;
            minCutEdgeIndexes = res2;
            copyNodesMap(metaNodeMap2, minCutNodeMap);
          }
        }
        var cut = this.spawn(minCutEdgeIndexes.map(function(e2) {
          return edges[e2[0]];
        }));
        var partition1 = this.spawn();
        var partition2 = this.spawn();
        var witnessNodePartition = minCutNodeMap[0];
        for (var _i5 = 0; _i5 < minCutNodeMap.length; _i5++) {
          var partitionId = minCutNodeMap[_i5];
          var node = nodes[_i5];
          if (partitionId === witnessNodePartition) {
            partition1.merge(node);
          } else {
            partition2.merge(node);
          }
        }
        var constructComponent = function constructComponent2(subset) {
          var component = _this.spawn();
          subset.forEach(function(node2) {
            component.merge(node2);
            node2.connectedEdges().forEach(function(edge) {
              if (_this.contains(edge) && !cut.contains(edge)) {
                component.merge(edge);
              }
            });
          });
          return component;
        };
        var components = [constructComponent(partition1), constructComponent(partition2)];
        var ret = {
          cut,
          components,
          // n.b. partitions are included to be compatible with the old api spec
          // (could be removed in a future major version)
          partition1,
          partition2
        };
        return ret;
      }
    };
    var copyPosition = function copyPosition2(p2) {
      return {
        x: p2.x,
        y: p2.y
      };
    };
    var modelToRenderedPosition = function modelToRenderedPosition2(p2, zoom, pan) {
      return {
        x: p2.x * zoom + pan.x,
        y: p2.y * zoom + pan.y
      };
    };
    var renderedToModelPosition = function renderedToModelPosition2(p2, zoom, pan) {
      return {
        x: (p2.x - pan.x) / zoom,
        y: (p2.y - pan.y) / zoom
      };
    };
    var array2point = function array2point2(arr) {
      return {
        x: arr[0],
        y: arr[1]
      };
    };
    var min = function min2(arr) {
      var begin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : arr.length;
      var min3 = Infinity;
      for (var i2 = begin; i2 < end; i2++) {
        var val = arr[i2];
        if (isFinite(val)) {
          min3 = Math.min(val, min3);
        }
      }
      return min3;
    };
    var max = function max2(arr) {
      var begin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : arr.length;
      var max3 = -Infinity;
      for (var i2 = begin; i2 < end; i2++) {
        var val = arr[i2];
        if (isFinite(val)) {
          max3 = Math.max(val, max3);
        }
      }
      return max3;
    };
    var mean = function mean2(arr) {
      var begin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : arr.length;
      var total = 0;
      var n = 0;
      for (var i2 = begin; i2 < end; i2++) {
        var val = arr[i2];
        if (isFinite(val)) {
          total += val;
          n++;
        }
      }
      return total / n;
    };
    var median = function median2(arr) {
      var begin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : arr.length;
      var copy2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      var sort = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
      var includeHoles = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true;
      if (copy2) {
        arr = arr.slice(begin, end);
      } else {
        if (end < arr.length) {
          arr.splice(end, arr.length - end);
        }
        if (begin > 0) {
          arr.splice(0, begin);
        }
      }
      var off = 0;
      for (var i2 = arr.length - 1; i2 >= 0; i2--) {
        var v = arr[i2];
        if (includeHoles) {
          if (!isFinite(v)) {
            arr[i2] = -Infinity;
            off++;
          }
        } else {
          arr.splice(i2, 1);
        }
      }
      if (sort) {
        arr.sort(function(a, b) {
          return a - b;
        });
      }
      var len = arr.length;
      var mid = Math.floor(len / 2);
      if (len % 2 !== 0) {
        return arr[mid + 1 + off];
      } else {
        return (arr[mid - 1 + off] + arr[mid + off]) / 2;
      }
    };
    var deg2rad = function deg2rad2(deg) {
      return Math.PI * deg / 180;
    };
    var getAngleFromDisp = function getAngleFromDisp2(dispX, dispY) {
      return Math.atan2(dispY, dispX) - Math.PI / 2;
    };
    var log2 = Math.log2 || function(n) {
      return Math.log(n) / Math.log(2);
    };
    var signum = function signum2(x) {
      if (x > 0) {
        return 1;
      } else if (x < 0) {
        return -1;
      } else {
        return 0;
      }
    };
    var dist = function dist2(p1, p2) {
      return Math.sqrt(sqdist(p1, p2));
    };
    var sqdist = function sqdist2(p1, p2) {
      var dx = p2.x - p1.x;
      var dy = p2.y - p1.y;
      return dx * dx + dy * dy;
    };
    var inPlaceSumNormalize = function inPlaceSumNormalize2(v) {
      var length = v.length;
      var total = 0;
      for (var i2 = 0; i2 < length; i2++) {
        total += v[i2];
      }
      for (var _i = 0; _i < length; _i++) {
        v[_i] = v[_i] / total;
      }
      return v;
    };
    var qbezierAt = function qbezierAt2(p0, p1, p2, t) {
      return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
    };
    var qbezierPtAt = function qbezierPtAt2(p0, p1, p2, t) {
      return {
        x: qbezierAt(p0.x, p1.x, p2.x, t),
        y: qbezierAt(p0.y, p1.y, p2.y, t)
      };
    };
    var lineAt = function lineAt2(p0, p1, t, d) {
      var vec = {
        x: p1.x - p0.x,
        y: p1.y - p0.y
      };
      var vecDist = dist(p0, p1);
      var normVec = {
        x: vec.x / vecDist,
        y: vec.y / vecDist
      };
      t = t == null ? 0 : t;
      d = d != null ? d : t * vecDist;
      return {
        x: p0.x + normVec.x * d,
        y: p0.y + normVec.y * d
      };
    };
    var bound = function bound2(min2, val, max2) {
      return Math.max(min2, Math.min(max2, val));
    };
    var makeBoundingBox = function makeBoundingBox2(bb) {
      if (bb == null) {
        return {
          x1: Infinity,
          y1: Infinity,
          x2: -Infinity,
          y2: -Infinity,
          w: 0,
          h: 0
        };
      } else if (bb.x1 != null && bb.y1 != null) {
        if (bb.x2 != null && bb.y2 != null && bb.x2 >= bb.x1 && bb.y2 >= bb.y1) {
          return {
            x1: bb.x1,
            y1: bb.y1,
            x2: bb.x2,
            y2: bb.y2,
            w: bb.x2 - bb.x1,
            h: bb.y2 - bb.y1
          };
        } else if (bb.w != null && bb.h != null && bb.w >= 0 && bb.h >= 0) {
          return {
            x1: bb.x1,
            y1: bb.y1,
            x2: bb.x1 + bb.w,
            y2: bb.y1 + bb.h,
            w: bb.w,
            h: bb.h
          };
        }
      }
    };
    var copyBoundingBox = function copyBoundingBox2(bb) {
      return {
        x1: bb.x1,
        x2: bb.x2,
        w: bb.w,
        y1: bb.y1,
        y2: bb.y2,
        h: bb.h
      };
    };
    var clearBoundingBox = function clearBoundingBox2(bb) {
      bb.x1 = Infinity;
      bb.y1 = Infinity;
      bb.x2 = -Infinity;
      bb.y2 = -Infinity;
      bb.w = 0;
      bb.h = 0;
    };
    var shiftBoundingBox = function shiftBoundingBox2(bb, dx, dy) {
      return {
        x1: bb.x1 + dx,
        x2: bb.x2 + dx,
        y1: bb.y1 + dy,
        y2: bb.y2 + dy,
        w: bb.w,
        h: bb.h
      };
    };
    var updateBoundingBox = function updateBoundingBox2(bb1, bb2) {
      bb1.x1 = Math.min(bb1.x1, bb2.x1);
      bb1.x2 = Math.max(bb1.x2, bb2.x2);
      bb1.w = bb1.x2 - bb1.x1;
      bb1.y1 = Math.min(bb1.y1, bb2.y1);
      bb1.y2 = Math.max(bb1.y2, bb2.y2);
      bb1.h = bb1.y2 - bb1.y1;
    };
    var expandBoundingBoxByPoint = function expandBoundingBoxByPoint2(bb, x, y) {
      bb.x1 = Math.min(bb.x1, x);
      bb.x2 = Math.max(bb.x2, x);
      bb.w = bb.x2 - bb.x1;
      bb.y1 = Math.min(bb.y1, y);
      bb.y2 = Math.max(bb.y2, y);
      bb.h = bb.y2 - bb.y1;
    };
    var expandBoundingBox = function expandBoundingBox2(bb) {
      var padding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      bb.x1 -= padding;
      bb.x2 += padding;
      bb.y1 -= padding;
      bb.y2 += padding;
      bb.w = bb.x2 - bb.x1;
      bb.h = bb.y2 - bb.y1;
      return bb;
    };
    var expandBoundingBoxSides = function expandBoundingBoxSides2(bb) {
      var padding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0];
      var top, right, bottom, left;
      if (padding.length === 1) {
        top = right = bottom = left = padding[0];
      } else if (padding.length === 2) {
        top = bottom = padding[0];
        left = right = padding[1];
      } else if (padding.length === 4) {
        var _padding = _slicedToArray(padding, 4);
        top = _padding[0];
        right = _padding[1];
        bottom = _padding[2];
        left = _padding[3];
      }
      bb.x1 -= left;
      bb.x2 += right;
      bb.y1 -= top;
      bb.y2 += bottom;
      bb.w = bb.x2 - bb.x1;
      bb.h = bb.y2 - bb.y1;
      return bb;
    };
    var assignBoundingBox = function assignBoundingBox2(bb1, bb2) {
      bb1.x1 = bb2.x1;
      bb1.y1 = bb2.y1;
      bb1.x2 = bb2.x2;
      bb1.y2 = bb2.y2;
      bb1.w = bb1.x2 - bb1.x1;
      bb1.h = bb1.y2 - bb1.y1;
    };
    var boundingBoxesIntersect = function boundingBoxesIntersect2(bb1, bb2) {
      if (bb1.x1 > bb2.x2) {
        return false;
      }
      if (bb2.x1 > bb1.x2) {
        return false;
      }
      if (bb1.x2 < bb2.x1) {
        return false;
      }
      if (bb2.x2 < bb1.x1) {
        return false;
      }
      if (bb1.y2 < bb2.y1) {
        return false;
      }
      if (bb2.y2 < bb1.y1) {
        return false;
      }
      if (bb1.y1 > bb2.y2) {
        return false;
      }
      if (bb2.y1 > bb1.y2) {
        return false;
      }
      return true;
    };
    var inBoundingBox = function inBoundingBox2(bb, x, y) {
      return bb.x1 <= x && x <= bb.x2 && bb.y1 <= y && y <= bb.y2;
    };
    var pointInBoundingBox = function pointInBoundingBox2(bb, pt) {
      return inBoundingBox(bb, pt.x, pt.y);
    };
    var boundingBoxInBoundingBox = function boundingBoxInBoundingBox2(bb1, bb2) {
      return inBoundingBox(bb1, bb2.x1, bb2.y1) && inBoundingBox(bb1, bb2.x2, bb2.y2);
    };
    var roundRectangleIntersectLine = function roundRectangleIntersectLine2(x, y, nodeX, nodeY, width, height, padding) {
      var cornerRadius = getRoundRectangleRadius(width, height);
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var straightLineIntersections;
      {
        var topStartX = nodeX - halfWidth + cornerRadius - padding;
        var topStartY = nodeY - halfHeight - padding;
        var topEndX = nodeX + halfWidth - cornerRadius + padding;
        var topEndY = topStartY;
        straightLineIntersections = finiteLinesIntersect(x, y, nodeX, nodeY, topStartX, topStartY, topEndX, topEndY, false);
        if (straightLineIntersections.length > 0) {
          return straightLineIntersections;
        }
      }
      {
        var rightStartX = nodeX + halfWidth + padding;
        var rightStartY = nodeY - halfHeight + cornerRadius - padding;
        var rightEndX = rightStartX;
        var rightEndY = nodeY + halfHeight - cornerRadius + padding;
        straightLineIntersections = finiteLinesIntersect(x, y, nodeX, nodeY, rightStartX, rightStartY, rightEndX, rightEndY, false);
        if (straightLineIntersections.length > 0) {
          return straightLineIntersections;
        }
      }
      {
        var bottomStartX = nodeX - halfWidth + cornerRadius - padding;
        var bottomStartY = nodeY + halfHeight + padding;
        var bottomEndX = nodeX + halfWidth - cornerRadius + padding;
        var bottomEndY = bottomStartY;
        straightLineIntersections = finiteLinesIntersect(x, y, nodeX, nodeY, bottomStartX, bottomStartY, bottomEndX, bottomEndY, false);
        if (straightLineIntersections.length > 0) {
          return straightLineIntersections;
        }
      }
      {
        var leftStartX = nodeX - halfWidth - padding;
        var leftStartY = nodeY - halfHeight + cornerRadius - padding;
        var leftEndX = leftStartX;
        var leftEndY = nodeY + halfHeight - cornerRadius + padding;
        straightLineIntersections = finiteLinesIntersect(x, y, nodeX, nodeY, leftStartX, leftStartY, leftEndX, leftEndY, false);
        if (straightLineIntersections.length > 0) {
          return straightLineIntersections;
        }
      }
      var arcIntersections;
      {
        var topLeftCenterX = nodeX - halfWidth + cornerRadius;
        var topLeftCenterY = nodeY - halfHeight + cornerRadius;
        arcIntersections = intersectLineCircle(x, y, nodeX, nodeY, topLeftCenterX, topLeftCenterY, cornerRadius + padding);
        if (arcIntersections.length > 0 && arcIntersections[0] <= topLeftCenterX && arcIntersections[1] <= topLeftCenterY) {
          return [arcIntersections[0], arcIntersections[1]];
        }
      }
      {
        var topRightCenterX = nodeX + halfWidth - cornerRadius;
        var topRightCenterY = nodeY - halfHeight + cornerRadius;
        arcIntersections = intersectLineCircle(x, y, nodeX, nodeY, topRightCenterX, topRightCenterY, cornerRadius + padding);
        if (arcIntersections.length > 0 && arcIntersections[0] >= topRightCenterX && arcIntersections[1] <= topRightCenterY) {
          return [arcIntersections[0], arcIntersections[1]];
        }
      }
      {
        var bottomRightCenterX = nodeX + halfWidth - cornerRadius;
        var bottomRightCenterY = nodeY + halfHeight - cornerRadius;
        arcIntersections = intersectLineCircle(x, y, nodeX, nodeY, bottomRightCenterX, bottomRightCenterY, cornerRadius + padding);
        if (arcIntersections.length > 0 && arcIntersections[0] >= bottomRightCenterX && arcIntersections[1] >= bottomRightCenterY) {
          return [arcIntersections[0], arcIntersections[1]];
        }
      }
      {
        var bottomLeftCenterX = nodeX - halfWidth + cornerRadius;
        var bottomLeftCenterY = nodeY + halfHeight - cornerRadius;
        arcIntersections = intersectLineCircle(x, y, nodeX, nodeY, bottomLeftCenterX, bottomLeftCenterY, cornerRadius + padding);
        if (arcIntersections.length > 0 && arcIntersections[0] <= bottomLeftCenterX && arcIntersections[1] >= bottomLeftCenterY) {
          return [arcIntersections[0], arcIntersections[1]];
        }
      }
      return [];
    };
    var inLineVicinity = function inLineVicinity2(x, y, lx1, ly1, lx2, ly2, tolerance) {
      var t = tolerance;
      var x1 = Math.min(lx1, lx2);
      var x2 = Math.max(lx1, lx2);
      var y1 = Math.min(ly1, ly2);
      var y2 = Math.max(ly1, ly2);
      return x1 - t <= x && x <= x2 + t && y1 - t <= y && y <= y2 + t;
    };
    var inBezierVicinity = function inBezierVicinity2(x, y, x1, y1, x2, y2, x3, y3, tolerance) {
      var bb = {
        x1: Math.min(x1, x3, x2) - tolerance,
        x2: Math.max(x1, x3, x2) + tolerance,
        y1: Math.min(y1, y3, y2) - tolerance,
        y2: Math.max(y1, y3, y2) + tolerance
      };
      if (x < bb.x1 || x > bb.x2 || y < bb.y1 || y > bb.y2) {
        return false;
      } else {
        return true;
      }
    };
    var solveQuadratic = function solveQuadratic2(a, b, c, val) {
      c -= val;
      var r = b * b - 4 * a * c;
      if (r < 0) {
        return [];
      }
      var sqrtR = Math.sqrt(r);
      var denom = 2 * a;
      var root1 = (-b + sqrtR) / denom;
      var root2 = (-b - sqrtR) / denom;
      return [root1, root2];
    };
    var solveCubic = function solveCubic2(a, b, c, d, result) {
      var epsilon = 1e-5;
      if (a === 0) {
        a = epsilon;
      }
      b /= a;
      c /= a;
      d /= a;
      var discriminant, q, r, dum1, s, t, term1, r13;
      q = (3 * c - b * b) / 9;
      r = -(27 * d) + b * (9 * c - 2 * (b * b));
      r /= 54;
      discriminant = q * q * q + r * r;
      result[1] = 0;
      term1 = b / 3;
      if (discriminant > 0) {
        s = r + Math.sqrt(discriminant);
        s = s < 0 ? -Math.pow(-s, 1 / 3) : Math.pow(s, 1 / 3);
        t = r - Math.sqrt(discriminant);
        t = t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
        result[0] = -term1 + s + t;
        term1 += (s + t) / 2;
        result[4] = result[2] = -term1;
        term1 = Math.sqrt(3) * (-t + s) / 2;
        result[3] = term1;
        result[5] = -term1;
        return;
      }
      result[5] = result[3] = 0;
      if (discriminant === 0) {
        r13 = r < 0 ? -Math.pow(-r, 1 / 3) : Math.pow(r, 1 / 3);
        result[0] = -term1 + 2 * r13;
        result[4] = result[2] = -(r13 + term1);
        return;
      }
      q = -q;
      dum1 = q * q * q;
      dum1 = Math.acos(r / Math.sqrt(dum1));
      r13 = 2 * Math.sqrt(q);
      result[0] = -term1 + r13 * Math.cos(dum1 / 3);
      result[2] = -term1 + r13 * Math.cos((dum1 + 2 * Math.PI) / 3);
      result[4] = -term1 + r13 * Math.cos((dum1 + 4 * Math.PI) / 3);
      return;
    };
    var sqdistToQuadraticBezier = function sqdistToQuadraticBezier2(x, y, x1, y1, x2, y2, x3, y3) {
      var a = 1 * x1 * x1 - 4 * x1 * x2 + 2 * x1 * x3 + 4 * x2 * x2 - 4 * x2 * x3 + x3 * x3 + y1 * y1 - 4 * y1 * y2 + 2 * y1 * y3 + 4 * y2 * y2 - 4 * y2 * y3 + y3 * y3;
      var b = 1 * 9 * x1 * x2 - 3 * x1 * x1 - 3 * x1 * x3 - 6 * x2 * x2 + 3 * x2 * x3 + 9 * y1 * y2 - 3 * y1 * y1 - 3 * y1 * y3 - 6 * y2 * y2 + 3 * y2 * y3;
      var c = 1 * 3 * x1 * x1 - 6 * x1 * x2 + x1 * x3 - x1 * x + 2 * x2 * x2 + 2 * x2 * x - x3 * x + 3 * y1 * y1 - 6 * y1 * y2 + y1 * y3 - y1 * y + 2 * y2 * y2 + 2 * y2 * y - y3 * y;
      var d = 1 * x1 * x2 - x1 * x1 + x1 * x - x2 * x + y1 * y2 - y1 * y1 + y1 * y - y2 * y;
      var roots = [];
      solveCubic(a, b, c, d, roots);
      var zeroThreshold = 1e-7;
      var params = [];
      for (var index = 0; index < 6; index += 2) {
        if (Math.abs(roots[index + 1]) < zeroThreshold && roots[index] >= 0 && roots[index] <= 1) {
          params.push(roots[index]);
        }
      }
      params.push(1);
      params.push(0);
      var minDistanceSquared = -1;
      var curX, curY, distSquared;
      for (var i2 = 0; i2 < params.length; i2++) {
        curX = Math.pow(1 - params[i2], 2) * x1 + 2 * (1 - params[i2]) * params[i2] * x2 + params[i2] * params[i2] * x3;
        curY = Math.pow(1 - params[i2], 2) * y1 + 2 * (1 - params[i2]) * params[i2] * y2 + params[i2] * params[i2] * y3;
        distSquared = Math.pow(curX - x, 2) + Math.pow(curY - y, 2);
        if (minDistanceSquared >= 0) {
          if (distSquared < minDistanceSquared) {
            minDistanceSquared = distSquared;
          }
        } else {
          minDistanceSquared = distSquared;
        }
      }
      return minDistanceSquared;
    };
    var sqdistToFiniteLine = function sqdistToFiniteLine2(x, y, x1, y1, x2, y2) {
      var offset = [x - x1, y - y1];
      var line = [x2 - x1, y2 - y1];
      var lineSq = line[0] * line[0] + line[1] * line[1];
      var hypSq = offset[0] * offset[0] + offset[1] * offset[1];
      var dotProduct = offset[0] * line[0] + offset[1] * line[1];
      var adjSq = dotProduct * dotProduct / lineSq;
      if (dotProduct < 0) {
        return hypSq;
      }
      if (adjSq > lineSq) {
        return (x - x2) * (x - x2) + (y - y2) * (y - y2);
      }
      return hypSq - adjSq;
    };
    var pointInsidePolygonPoints = function pointInsidePolygonPoints2(x, y, points) {
      var x1, y1, x2, y2;
      var y3;
      var up = 0;
      for (var i2 = 0; i2 < points.length / 2; i2++) {
        x1 = points[i2 * 2];
        y1 = points[i2 * 2 + 1];
        if (i2 + 1 < points.length / 2) {
          x2 = points[(i2 + 1) * 2];
          y2 = points[(i2 + 1) * 2 + 1];
        } else {
          x2 = points[(i2 + 1 - points.length / 2) * 2];
          y2 = points[(i2 + 1 - points.length / 2) * 2 + 1];
        }
        if (x1 == x && x2 == x) ;
        else if (x1 >= x && x >= x2 || x1 <= x && x <= x2) {
          y3 = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
          if (y3 > y) {
            up++;
          }
        } else {
          continue;
        }
      }
      if (up % 2 === 0) {
        return false;
      } else {
        return true;
      }
    };
    var pointInsidePolygon = function pointInsidePolygon2(x, y, basePoints, centerX, centerY, width, height, direction, padding) {
      var transformedPoints = new Array(basePoints.length);
      var angle;
      if (direction[0] != null) {
        angle = Math.atan(direction[1] / direction[0]);
        if (direction[0] < 0) {
          angle = angle + Math.PI / 2;
        } else {
          angle = -angle - Math.PI / 2;
        }
      } else {
        angle = direction;
      }
      var cos2 = Math.cos(-angle);
      var sin2 = Math.sin(-angle);
      for (var i2 = 0; i2 < transformedPoints.length / 2; i2++) {
        transformedPoints[i2 * 2] = width / 2 * (basePoints[i2 * 2] * cos2 - basePoints[i2 * 2 + 1] * sin2);
        transformedPoints[i2 * 2 + 1] = height / 2 * (basePoints[i2 * 2 + 1] * cos2 + basePoints[i2 * 2] * sin2);
        transformedPoints[i2 * 2] += centerX;
        transformedPoints[i2 * 2 + 1] += centerY;
      }
      var points;
      if (padding > 0) {
        var expandedLineSet = expandPolygon(transformedPoints, -padding);
        points = joinLines(expandedLineSet);
      } else {
        points = transformedPoints;
      }
      return pointInsidePolygonPoints(x, y, points);
    };
    var pointInsideRoundPolygon = function pointInsideRoundPolygon2(x, y, basePoints, centerX, centerY, width, height) {
      var cutPolygonPoints = new Array(basePoints.length);
      var halfW = width / 2;
      var halfH = height / 2;
      var cornerRadius = getRoundPolygonRadius(width, height);
      var squaredCornerRadius = cornerRadius * cornerRadius;
      for (var i2 = 0; i2 < basePoints.length / 4; i2++) {
        var sourceUv = void 0, destUv = void 0;
        if (i2 === 0) {
          sourceUv = basePoints.length - 2;
        } else {
          sourceUv = i2 * 4 - 2;
        }
        destUv = i2 * 4 + 2;
        var px = centerX + halfW * basePoints[i2 * 4];
        var py = centerY + halfH * basePoints[i2 * 4 + 1];
        var cosTheta = -basePoints[sourceUv] * basePoints[destUv] - basePoints[sourceUv + 1] * basePoints[destUv + 1];
        var offset = cornerRadius / Math.tan(Math.acos(cosTheta) / 2);
        var cp0x = px - offset * basePoints[sourceUv];
        var cp0y = py - offset * basePoints[sourceUv + 1];
        var cp1x = px + offset * basePoints[destUv];
        var cp1y = py + offset * basePoints[destUv + 1];
        cutPolygonPoints[i2 * 4] = cp0x;
        cutPolygonPoints[i2 * 4 + 1] = cp0y;
        cutPolygonPoints[i2 * 4 + 2] = cp1x;
        cutPolygonPoints[i2 * 4 + 3] = cp1y;
        var orthx = basePoints[sourceUv + 1];
        var orthy = -basePoints[sourceUv];
        var cosAlpha = orthx * basePoints[destUv] + orthy * basePoints[destUv + 1];
        if (cosAlpha < 0) {
          orthx *= -1;
          orthy *= -1;
        }
        var cx = cp0x + orthx * cornerRadius;
        var cy = cp0y + orthy * cornerRadius;
        var squaredDistance = Math.pow(cx - x, 2) + Math.pow(cy - y, 2);
        if (squaredDistance <= squaredCornerRadius) {
          return true;
        }
      }
      return pointInsidePolygonPoints(x, y, cutPolygonPoints);
    };
    var joinLines = function joinLines2(lineSet) {
      var vertices = new Array(lineSet.length / 2);
      var currentLineStartX, currentLineStartY, currentLineEndX, currentLineEndY;
      var nextLineStartX, nextLineStartY, nextLineEndX, nextLineEndY;
      for (var i2 = 0; i2 < lineSet.length / 4; i2++) {
        currentLineStartX = lineSet[i2 * 4];
        currentLineStartY = lineSet[i2 * 4 + 1];
        currentLineEndX = lineSet[i2 * 4 + 2];
        currentLineEndY = lineSet[i2 * 4 + 3];
        if (i2 < lineSet.length / 4 - 1) {
          nextLineStartX = lineSet[(i2 + 1) * 4];
          nextLineStartY = lineSet[(i2 + 1) * 4 + 1];
          nextLineEndX = lineSet[(i2 + 1) * 4 + 2];
          nextLineEndY = lineSet[(i2 + 1) * 4 + 3];
        } else {
          nextLineStartX = lineSet[0];
          nextLineStartY = lineSet[1];
          nextLineEndX = lineSet[2];
          nextLineEndY = lineSet[3];
        }
        var intersection = finiteLinesIntersect(currentLineStartX, currentLineStartY, currentLineEndX, currentLineEndY, nextLineStartX, nextLineStartY, nextLineEndX, nextLineEndY, true);
        vertices[i2 * 2] = intersection[0];
        vertices[i2 * 2 + 1] = intersection[1];
      }
      return vertices;
    };
    var expandPolygon = function expandPolygon2(points, pad) {
      var expandedLineSet = new Array(points.length * 2);
      var currentPointX, currentPointY, nextPointX, nextPointY;
      for (var i2 = 0; i2 < points.length / 2; i2++) {
        currentPointX = points[i2 * 2];
        currentPointY = points[i2 * 2 + 1];
        if (i2 < points.length / 2 - 1) {
          nextPointX = points[(i2 + 1) * 2];
          nextPointY = points[(i2 + 1) * 2 + 1];
        } else {
          nextPointX = points[0];
          nextPointY = points[1];
        }
        var offsetX = nextPointY - currentPointY;
        var offsetY = -(nextPointX - currentPointX);
        var offsetLength = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        var normalizedOffsetX = offsetX / offsetLength;
        var normalizedOffsetY = offsetY / offsetLength;
        expandedLineSet[i2 * 4] = currentPointX + normalizedOffsetX * pad;
        expandedLineSet[i2 * 4 + 1] = currentPointY + normalizedOffsetY * pad;
        expandedLineSet[i2 * 4 + 2] = nextPointX + normalizedOffsetX * pad;
        expandedLineSet[i2 * 4 + 3] = nextPointY + normalizedOffsetY * pad;
      }
      return expandedLineSet;
    };
    var intersectLineEllipse = function intersectLineEllipse2(x, y, centerX, centerY, ellipseWradius, ellipseHradius) {
      var dispX = centerX - x;
      var dispY = centerY - y;
      dispX /= ellipseWradius;
      dispY /= ellipseHradius;
      var len = Math.sqrt(dispX * dispX + dispY * dispY);
      var newLength = len - 1;
      if (newLength < 0) {
        return [];
      }
      var lenProportion = newLength / len;
      return [(centerX - x) * lenProportion + x, (centerY - y) * lenProportion + y];
    };
    var checkInEllipse = function checkInEllipse2(x, y, width, height, centerX, centerY, padding) {
      x -= centerX;
      y -= centerY;
      x /= width / 2 + padding;
      y /= height / 2 + padding;
      return x * x + y * y <= 1;
    };
    var intersectLineCircle = function intersectLineCircle2(x1, y1, x2, y2, centerX, centerY, radius) {
      var d = [x2 - x1, y2 - y1];
      var f = [x1 - centerX, y1 - centerY];
      var a = d[0] * d[0] + d[1] * d[1];
      var b = 2 * (f[0] * d[0] + f[1] * d[1]);
      var c = f[0] * f[0] + f[1] * f[1] - radius * radius;
      var discriminant = b * b - 4 * a * c;
      if (discriminant < 0) {
        return [];
      }
      var t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      var t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      var tMin = Math.min(t1, t2);
      var tMax = Math.max(t1, t2);
      var inRangeParams = [];
      if (tMin >= 0 && tMin <= 1) {
        inRangeParams.push(tMin);
      }
      if (tMax >= 0 && tMax <= 1) {
        inRangeParams.push(tMax);
      }
      if (inRangeParams.length === 0) {
        return [];
      }
      var nearIntersectionX = inRangeParams[0] * d[0] + x1;
      var nearIntersectionY = inRangeParams[0] * d[1] + y1;
      if (inRangeParams.length > 1) {
        if (inRangeParams[0] == inRangeParams[1]) {
          return [nearIntersectionX, nearIntersectionY];
        } else {
          var farIntersectionX = inRangeParams[1] * d[0] + x1;
          var farIntersectionY = inRangeParams[1] * d[1] + y1;
          return [nearIntersectionX, nearIntersectionY, farIntersectionX, farIntersectionY];
        }
      } else {
        return [nearIntersectionX, nearIntersectionY];
      }
    };
    var midOfThree = function midOfThree2(a, b, c) {
      if (b <= a && a <= c || c <= a && a <= b) {
        return a;
      } else if (a <= b && b <= c || c <= b && b <= a) {
        return b;
      } else {
        return c;
      }
    };
    var finiteLinesIntersect = function finiteLinesIntersect2(x1, y1, x2, y2, x3, y3, x4, y4, infiniteLines) {
      var dx13 = x1 - x3;
      var dx21 = x2 - x1;
      var dx43 = x4 - x3;
      var dy13 = y1 - y3;
      var dy21 = y2 - y1;
      var dy43 = y4 - y3;
      var ua_t = dx43 * dy13 - dy43 * dx13;
      var ub_t = dx21 * dy13 - dy21 * dx13;
      var u_b = dy43 * dx21 - dx43 * dy21;
      if (u_b !== 0) {
        var ua = ua_t / u_b;
        var ub = ub_t / u_b;
        var flptThreshold = 1e-3;
        var _min = 0 - flptThreshold;
        var _max = 1 + flptThreshold;
        if (_min <= ua && ua <= _max && _min <= ub && ub <= _max) {
          return [x1 + ua * dx21, y1 + ua * dy21];
        } else {
          if (!infiniteLines) {
            return [];
          } else {
            return [x1 + ua * dx21, y1 + ua * dy21];
          }
        }
      } else {
        if (ua_t === 0 || ub_t === 0) {
          if (midOfThree(x1, x2, x4) === x4) {
            return [x4, y4];
          }
          if (midOfThree(x1, x2, x3) === x3) {
            return [x3, y3];
          }
          if (midOfThree(x3, x4, x2) === x2) {
            return [x2, y2];
          }
          return [];
        } else {
          return [];
        }
      }
    };
    var polygonIntersectLine = function polygonIntersectLine2(x, y, basePoints, centerX, centerY, width, height, padding) {
      var intersections = [];
      var intersection;
      var transformedPoints = new Array(basePoints.length);
      var doTransform = true;
      if (width == null) {
        doTransform = false;
      }
      var points;
      if (doTransform) {
        for (var i2 = 0; i2 < transformedPoints.length / 2; i2++) {
          transformedPoints[i2 * 2] = basePoints[i2 * 2] * width + centerX;
          transformedPoints[i2 * 2 + 1] = basePoints[i2 * 2 + 1] * height + centerY;
        }
        if (padding > 0) {
          var expandedLineSet = expandPolygon(transformedPoints, -padding);
          points = joinLines(expandedLineSet);
        } else {
          points = transformedPoints;
        }
      } else {
        points = basePoints;
      }
      var currentX, currentY, nextX, nextY;
      for (var _i2 = 0; _i2 < points.length / 2; _i2++) {
        currentX = points[_i2 * 2];
        currentY = points[_i2 * 2 + 1];
        if (_i2 < points.length / 2 - 1) {
          nextX = points[(_i2 + 1) * 2];
          nextY = points[(_i2 + 1) * 2 + 1];
        } else {
          nextX = points[0];
          nextY = points[1];
        }
        intersection = finiteLinesIntersect(x, y, centerX, centerY, currentX, currentY, nextX, nextY);
        if (intersection.length !== 0) {
          intersections.push(intersection[0], intersection[1]);
        }
      }
      return intersections;
    };
    var roundPolygonIntersectLine = function roundPolygonIntersectLine2(x, y, basePoints, centerX, centerY, width, height, padding) {
      var intersections = [];
      var intersection;
      var lines = new Array(basePoints.length);
      var halfW = width / 2;
      var halfH = height / 2;
      var cornerRadius = getRoundPolygonRadius(width, height);
      for (var i2 = 0; i2 < basePoints.length / 4; i2++) {
        var sourceUv = void 0, destUv = void 0;
        if (i2 === 0) {
          sourceUv = basePoints.length - 2;
        } else {
          sourceUv = i2 * 4 - 2;
        }
        destUv = i2 * 4 + 2;
        var px = centerX + halfW * basePoints[i2 * 4];
        var py = centerY + halfH * basePoints[i2 * 4 + 1];
        var cosTheta = -basePoints[sourceUv] * basePoints[destUv] - basePoints[sourceUv + 1] * basePoints[destUv + 1];
        var offset = cornerRadius / Math.tan(Math.acos(cosTheta) / 2);
        var cp0x = px - offset * basePoints[sourceUv];
        var cp0y = py - offset * basePoints[sourceUv + 1];
        var cp1x = px + offset * basePoints[destUv];
        var cp1y = py + offset * basePoints[destUv + 1];
        if (i2 === 0) {
          lines[basePoints.length - 2] = cp0x;
          lines[basePoints.length - 1] = cp0y;
        } else {
          lines[i2 * 4 - 2] = cp0x;
          lines[i2 * 4 - 1] = cp0y;
        }
        lines[i2 * 4] = cp1x;
        lines[i2 * 4 + 1] = cp1y;
        var orthx = basePoints[sourceUv + 1];
        var orthy = -basePoints[sourceUv];
        var cosAlpha = orthx * basePoints[destUv] + orthy * basePoints[destUv + 1];
        if (cosAlpha < 0) {
          orthx *= -1;
          orthy *= -1;
        }
        var cx = cp0x + orthx * cornerRadius;
        var cy = cp0y + orthy * cornerRadius;
        intersection = intersectLineCircle(x, y, centerX, centerY, cx, cy, cornerRadius);
        if (intersection.length !== 0) {
          intersections.push(intersection[0], intersection[1]);
        }
      }
      for (var _i3 = 0; _i3 < lines.length / 4; _i3++) {
        intersection = finiteLinesIntersect(x, y, centerX, centerY, lines[_i3 * 4], lines[_i3 * 4 + 1], lines[_i3 * 4 + 2], lines[_i3 * 4 + 3], false);
        if (intersection.length !== 0) {
          intersections.push(intersection[0], intersection[1]);
        }
      }
      if (intersections.length > 2) {
        var lowestIntersection = [intersections[0], intersections[1]];
        var lowestSquaredDistance = Math.pow(lowestIntersection[0] - x, 2) + Math.pow(lowestIntersection[1] - y, 2);
        for (var _i4 = 1; _i4 < intersections.length / 2; _i4++) {
          var squaredDistance = Math.pow(intersections[_i4 * 2] - x, 2) + Math.pow(intersections[_i4 * 2 + 1] - y, 2);
          if (squaredDistance <= lowestSquaredDistance) {
            lowestIntersection[0] = intersections[_i4 * 2];
            lowestIntersection[1] = intersections[_i4 * 2 + 1];
            lowestSquaredDistance = squaredDistance;
          }
        }
        return lowestIntersection;
      }
      return intersections;
    };
    var shortenIntersection = function shortenIntersection2(intersection, offset, amount) {
      var disp = [intersection[0] - offset[0], intersection[1] - offset[1]];
      var length = Math.sqrt(disp[0] * disp[0] + disp[1] * disp[1]);
      var lenRatio = (length - amount) / length;
      if (lenRatio < 0) {
        lenRatio = 1e-5;
      }
      return [offset[0] + lenRatio * disp[0], offset[1] + lenRatio * disp[1]];
    };
    var generateUnitNgonPointsFitToSquare = function generateUnitNgonPointsFitToSquare2(sides, rotationRadians) {
      var points = generateUnitNgonPoints(sides, rotationRadians);
      points = fitPolygonToSquare(points);
      return points;
    };
    var fitPolygonToSquare = function fitPolygonToSquare2(points) {
      var x, y;
      var sides = points.length / 2;
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (var i2 = 0; i2 < sides; i2++) {
        x = points[2 * i2];
        y = points[2 * i2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      var sx = 2 / (maxX - minX);
      var sy = 2 / (maxY - minY);
      for (var _i5 = 0; _i5 < sides; _i5++) {
        x = points[2 * _i5] = points[2 * _i5] * sx;
        y = points[2 * _i5 + 1] = points[2 * _i5 + 1] * sy;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      if (minY < -1) {
        for (var _i6 = 0; _i6 < sides; _i6++) {
          y = points[2 * _i6 + 1] = points[2 * _i6 + 1] + (-1 - minY);
        }
      }
      return points;
    };
    var generateUnitNgonPoints = function generateUnitNgonPoints2(sides, rotationRadians) {
      var increment = 1 / sides * 2 * Math.PI;
      var startAngle = sides % 2 === 0 ? Math.PI / 2 + increment / 2 : Math.PI / 2;
      startAngle += rotationRadians;
      var points = new Array(sides * 2);
      var currentAngle;
      for (var i2 = 0; i2 < sides; i2++) {
        currentAngle = i2 * increment + startAngle;
        points[2 * i2] = Math.cos(currentAngle);
        points[2 * i2 + 1] = Math.sin(-currentAngle);
      }
      return points;
    };
    var getRoundRectangleRadius = function getRoundRectangleRadius2(width, height) {
      return Math.min(width / 4, height / 4, 8);
    };
    var getRoundPolygonRadius = function getRoundPolygonRadius2(width, height) {
      return Math.min(width / 10, height / 10, 8);
    };
    var getCutRectangleCornerLength = function getCutRectangleCornerLength2() {
      return 8;
    };
    var bezierPtsToQuadCoeff = function bezierPtsToQuadCoeff2(p0, p1, p2) {
      return [p0 - 2 * p1 + p2, 2 * (p1 - p0), p0];
    };
    var getBarrelCurveConstants = function getBarrelCurveConstants2(width, height) {
      return {
        heightOffset: Math.min(15, 0.05 * height),
        widthOffset: Math.min(100, 0.25 * width),
        ctrlPtOffsetPct: 0.05
      };
    };
    var pageRankDefaults = defaults$g({
      dampingFactor: 0.8,
      precision: 1e-6,
      iterations: 200,
      weight: function weight(edge) {
        return 1;
      }
    });
    var elesfn$o = {
      pageRank: function pageRank(options) {
        var _pageRankDefaults = pageRankDefaults(options), dampingFactor = _pageRankDefaults.dampingFactor, precision = _pageRankDefaults.precision, iterations = _pageRankDefaults.iterations, weight = _pageRankDefaults.weight;
        var cy = this._private.cy;
        var _this$byGroup = this.byGroup(), nodes = _this$byGroup.nodes, edges = _this$byGroup.edges;
        var numNodes = nodes.length;
        var numNodesSqd = numNodes * numNodes;
        var numEdges = edges.length;
        var matrix = new Array(numNodesSqd);
        var columnSum = new Array(numNodes);
        var additionalProb = (1 - dampingFactor) / numNodes;
        for (var i2 = 0; i2 < numNodes; i2++) {
          for (var j = 0; j < numNodes; j++) {
            var n = i2 * numNodes + j;
            matrix[n] = 0;
          }
          columnSum[i2] = 0;
        }
        for (var _i = 0; _i < numEdges; _i++) {
          var edge = edges[_i];
          var srcId = edge.data("source");
          var tgtId = edge.data("target");
          if (srcId === tgtId) {
            continue;
          }
          var s = nodes.indexOfId(srcId);
          var t = nodes.indexOfId(tgtId);
          var w = weight(edge);
          var _n = t * numNodes + s;
          matrix[_n] += w;
          columnSum[s] += w;
        }
        var p2 = 1 / numNodes + additionalProb;
        for (var _j = 0; _j < numNodes; _j++) {
          if (columnSum[_j] === 0) {
            for (var _i2 = 0; _i2 < numNodes; _i2++) {
              var _n2 = _i2 * numNodes + _j;
              matrix[_n2] = p2;
            }
          } else {
            for (var _i3 = 0; _i3 < numNodes; _i3++) {
              var _n3 = _i3 * numNodes + _j;
              matrix[_n3] = matrix[_n3] / columnSum[_j] + additionalProb;
            }
          }
        }
        var eigenvector = new Array(numNodes);
        var temp = new Array(numNodes);
        var previous;
        for (var _i4 = 0; _i4 < numNodes; _i4++) {
          eigenvector[_i4] = 1;
        }
        for (var iter = 0; iter < iterations; iter++) {
          for (var _i5 = 0; _i5 < numNodes; _i5++) {
            temp[_i5] = 0;
          }
          for (var _i6 = 0; _i6 < numNodes; _i6++) {
            for (var _j2 = 0; _j2 < numNodes; _j2++) {
              var _n4 = _i6 * numNodes + _j2;
              temp[_i6] += matrix[_n4] * eigenvector[_j2];
            }
          }
          inPlaceSumNormalize(temp);
          previous = eigenvector;
          eigenvector = temp;
          temp = previous;
          var diff = 0;
          for (var _i7 = 0; _i7 < numNodes; _i7++) {
            var delta = previous[_i7] - eigenvector[_i7];
            diff += delta * delta;
          }
          if (diff < precision) {
            break;
          }
        }
        var res = {
          rank: function rank(node) {
            node = cy.collection(node)[0];
            return eigenvector[nodes.indexOf(node)];
          }
        };
        return res;
      }
      // pageRank
    };
    var defaults$f = defaults$g({
      root: null,
      weight: function weight(edge) {
        return 1;
      },
      directed: false,
      alpha: 0
    });
    var elesfn$n = {
      degreeCentralityNormalized: function degreeCentralityNormalized(options) {
        options = defaults$f(options);
        var cy = this.cy();
        var nodes = this.nodes();
        var numNodes = nodes.length;
        if (!options.directed) {
          var degrees = {};
          var maxDegree = 0;
          for (var i2 = 0; i2 < numNodes; i2++) {
            var node = nodes[i2];
            options.root = node;
            var currDegree = this.degreeCentrality(options);
            if (maxDegree < currDegree.degree) {
              maxDegree = currDegree.degree;
            }
            degrees[node.id()] = currDegree.degree;
          }
          return {
            degree: function degree(node2) {
              if (maxDegree === 0) {
                return 0;
              }
              if (string(node2)) {
                node2 = cy.filter(node2);
              }
              return degrees[node2.id()] / maxDegree;
            }
          };
        } else {
          var indegrees = {};
          var outdegrees = {};
          var maxIndegree = 0;
          var maxOutdegree = 0;
          for (var _i = 0; _i < numNodes; _i++) {
            var _node = nodes[_i];
            var id = _node.id();
            options.root = _node;
            var _currDegree = this.degreeCentrality(options);
            if (maxIndegree < _currDegree.indegree) maxIndegree = _currDegree.indegree;
            if (maxOutdegree < _currDegree.outdegree) maxOutdegree = _currDegree.outdegree;
            indegrees[id] = _currDegree.indegree;
            outdegrees[id] = _currDegree.outdegree;
          }
          return {
            indegree: function indegree(node2) {
              if (maxIndegree == 0) {
                return 0;
              }
              if (string(node2)) {
                node2 = cy.filter(node2);
              }
              return indegrees[node2.id()] / maxIndegree;
            },
            outdegree: function outdegree(node2) {
              if (maxOutdegree === 0) {
                return 0;
              }
              if (string(node2)) {
                node2 = cy.filter(node2);
              }
              return outdegrees[node2.id()] / maxOutdegree;
            }
          };
        }
      },
      // degreeCentralityNormalized
      // Implemented from the algorithm in Opsahl's paper
      // "Node centrality in weighted networks: Generalizing degree and shortest paths"
      // check the heading 2 "Degree"
      degreeCentrality: function degreeCentrality(options) {
        options = defaults$f(options);
        var cy = this.cy();
        var callingEles = this;
        var _options = options, root = _options.root, weight = _options.weight, directed = _options.directed, alpha = _options.alpha;
        root = cy.collection(root)[0];
        if (!directed) {
          var connEdges = root.connectedEdges().intersection(callingEles);
          var k = connEdges.length;
          var s = 0;
          for (var i2 = 0; i2 < connEdges.length; i2++) {
            s += weight(connEdges[i2]);
          }
          return {
            degree: Math.pow(k, 1 - alpha) * Math.pow(s, alpha)
          };
        } else {
          var edges = root.connectedEdges();
          var incoming = edges.filter(function(edge) {
            return edge.target().same(root) && callingEles.has(edge);
          });
          var outgoing = edges.filter(function(edge) {
            return edge.source().same(root) && callingEles.has(edge);
          });
          var k_in = incoming.length;
          var k_out = outgoing.length;
          var s_in = 0;
          var s_out = 0;
          for (var _i2 = 0; _i2 < incoming.length; _i2++) {
            s_in += weight(incoming[_i2]);
          }
          for (var _i3 = 0; _i3 < outgoing.length; _i3++) {
            s_out += weight(outgoing[_i3]);
          }
          return {
            indegree: Math.pow(k_in, 1 - alpha) * Math.pow(s_in, alpha),
            outdegree: Math.pow(k_out, 1 - alpha) * Math.pow(s_out, alpha)
          };
        }
      }
      // degreeCentrality
    };
    elesfn$n.dc = elesfn$n.degreeCentrality;
    elesfn$n.dcn = elesfn$n.degreeCentralityNormalised = elesfn$n.degreeCentralityNormalized;
    var defaults$e = defaults$g({
      harmonic: true,
      weight: function weight() {
        return 1;
      },
      directed: false,
      root: null
    });
    var elesfn$m = {
      closenessCentralityNormalized: function closenessCentralityNormalized(options) {
        var _defaults = defaults$e(options), harmonic = _defaults.harmonic, weight = _defaults.weight, directed = _defaults.directed;
        var cy = this.cy();
        var closenesses = {};
        var maxCloseness = 0;
        var nodes = this.nodes();
        var fw = this.floydWarshall({
          weight,
          directed
        });
        for (var i2 = 0; i2 < nodes.length; i2++) {
          var currCloseness = 0;
          var node_i = nodes[i2];
          for (var j = 0; j < nodes.length; j++) {
            if (i2 !== j) {
              var d = fw.distance(node_i, nodes[j]);
              if (harmonic) {
                currCloseness += 1 / d;
              } else {
                currCloseness += d;
              }
            }
          }
          if (!harmonic) {
            currCloseness = 1 / currCloseness;
          }
          if (maxCloseness < currCloseness) {
            maxCloseness = currCloseness;
          }
          closenesses[node_i.id()] = currCloseness;
        }
        return {
          closeness: function closeness(node) {
            if (maxCloseness == 0) {
              return 0;
            }
            if (string(node)) {
              node = cy.filter(node)[0].id();
            } else {
              node = node.id();
            }
            return closenesses[node] / maxCloseness;
          }
        };
      },
      // Implemented from pseudocode from wikipedia
      closenessCentrality: function closenessCentrality(options) {
        var _defaults2 = defaults$e(options), root = _defaults2.root, weight = _defaults2.weight, directed = _defaults2.directed, harmonic = _defaults2.harmonic;
        root = this.filter(root)[0];
        var dijkstra = this.dijkstra({
          root,
          weight,
          directed
        });
        var totalDistance = 0;
        var nodes = this.nodes();
        for (var i2 = 0; i2 < nodes.length; i2++) {
          var n = nodes[i2];
          if (!n.same(root)) {
            var d = dijkstra.distanceTo(n);
            if (harmonic) {
              totalDistance += 1 / d;
            } else {
              totalDistance += d;
            }
          }
        }
        return harmonic ? totalDistance : 1 / totalDistance;
      }
      // closenessCentrality
    };
    elesfn$m.cc = elesfn$m.closenessCentrality;
    elesfn$m.ccn = elesfn$m.closenessCentralityNormalised = elesfn$m.closenessCentralityNormalized;
    var defaults$d = defaults$g({
      weight: null,
      directed: false
    });
    var elesfn$l = {
      // Implemented from the algorithm in the paper "On Variants of Shortest-Path Betweenness Centrality and their Generic Computation" by Ulrik Brandes
      betweennessCentrality: function betweennessCentrality(options) {
        var _defaults = defaults$d(options), directed = _defaults.directed, weight = _defaults.weight;
        var weighted = weight != null;
        var cy = this.cy();
        var V = this.nodes();
        var A = {};
        var _C = {};
        var max2 = 0;
        var C = {
          set: function set2(key, val) {
            _C[key] = val;
            if (val > max2) {
              max2 = val;
            }
          },
          get: function get2(key) {
            return _C[key];
          }
        };
        for (var i2 = 0; i2 < V.length; i2++) {
          var v = V[i2];
          var vid = v.id();
          if (directed) {
            A[vid] = v.outgoers().nodes();
          } else {
            A[vid] = v.openNeighborhood().nodes();
          }
          C.set(vid, 0);
        }
        var _loop = function _loop2(s2) {
          var sid = V[s2].id();
          var S = [];
          var P = {};
          var g = {};
          var d = {};
          var Q = new Heap__default["default"](function(a, b) {
            return d[a] - d[b];
          });
          for (var _i = 0; _i < V.length; _i++) {
            var _vid = V[_i].id();
            P[_vid] = [];
            g[_vid] = 0;
            d[_vid] = Infinity;
          }
          g[sid] = 1;
          d[sid] = 0;
          Q.push(sid);
          while (!Q.empty()) {
            var _v = Q.pop();
            S.push(_v);
            if (weighted) {
              for (var j = 0; j < A[_v].length; j++) {
                var w = A[_v][j];
                var vEle = cy.getElementById(_v);
                var edge = void 0;
                if (vEle.edgesTo(w).length > 0) {
                  edge = vEle.edgesTo(w)[0];
                } else {
                  edge = w.edgesTo(vEle)[0];
                }
                var edgeWeight = weight(edge);
                w = w.id();
                if (d[w] > d[_v] + edgeWeight) {
                  d[w] = d[_v] + edgeWeight;
                  if (Q.nodes.indexOf(w) < 0) {
                    Q.push(w);
                  } else {
                    Q.updateItem(w);
                  }
                  g[w] = 0;
                  P[w] = [];
                }
                if (d[w] == d[_v] + edgeWeight) {
                  g[w] = g[w] + g[_v];
                  P[w].push(_v);
                }
              }
            } else {
              for (var _j = 0; _j < A[_v].length; _j++) {
                var _w = A[_v][_j].id();
                if (d[_w] == Infinity) {
                  Q.push(_w);
                  d[_w] = d[_v] + 1;
                }
                if (d[_w] == d[_v] + 1) {
                  g[_w] = g[_w] + g[_v];
                  P[_w].push(_v);
                }
              }
            }
          }
          var e = {};
          for (var _i2 = 0; _i2 < V.length; _i2++) {
            e[V[_i2].id()] = 0;
          }
          while (S.length > 0) {
            var _w2 = S.pop();
            for (var _j2 = 0; _j2 < P[_w2].length; _j2++) {
              var _v2 = P[_w2][_j2];
              e[_v2] = e[_v2] + g[_v2] / g[_w2] * (1 + e[_w2]);
            }
            if (_w2 != V[s2].id()) {
              C.set(_w2, C.get(_w2) + e[_w2]);
            }
          }
        };
        for (var s = 0; s < V.length; s++) {
          _loop(s);
        }
        var ret = {
          betweenness: function betweenness(node) {
            var id = cy.collection(node).id();
            return C.get(id);
          },
          betweennessNormalized: function betweennessNormalized(node) {
            if (max2 == 0) {
              return 0;
            }
            var id = cy.collection(node).id();
            return C.get(id) / max2;
          }
        };
        ret.betweennessNormalised = ret.betweennessNormalized;
        return ret;
      }
      // betweennessCentrality
    };
    elesfn$l.bc = elesfn$l.betweennessCentrality;
    var defaults$c = defaults$g({
      expandFactor: 2,
      // affects time of computation and cluster granularity to some extent: M * M
      inflateFactor: 2,
      // affects cluster granularity (the greater the value, the more clusters): M(i,j) / E(j)
      multFactor: 1,
      // optional self loops for each node. Use a neutral value to improve cluster computations.
      maxIterations: 20,
      // maximum number of iterations of the MCL algorithm in a single run
      attributes: [
        // attributes/features used to group nodes, ie. similarity values between nodes
        function(edge) {
          return 1;
        }
      ]
    });
    var setOptions$3 = function setOptions2(options) {
      return defaults$c(options);
    };
    var getSimilarity$1 = function getSimilarity2(edge, attributes) {
      var total = 0;
      for (var i2 = 0; i2 < attributes.length; i2++) {
        total += attributes[i2](edge);
      }
      return total;
    };
    var addLoops = function addLoops2(M, n, val) {
      for (var i2 = 0; i2 < n; i2++) {
        M[i2 * n + i2] = val;
      }
    };
    var normalize = function normalize2(M, n) {
      var sum;
      for (var col = 0; col < n; col++) {
        sum = 0;
        for (var row = 0; row < n; row++) {
          sum += M[row * n + col];
        }
        for (var _row = 0; _row < n; _row++) {
          M[_row * n + col] = M[_row * n + col] / sum;
        }
      }
    };
    var mmult = function mmult2(A, B, n) {
      var C = new Array(n * n);
      for (var i2 = 0; i2 < n; i2++) {
        for (var j = 0; j < n; j++) {
          C[i2 * n + j] = 0;
        }
        for (var k = 0; k < n; k++) {
          for (var _j = 0; _j < n; _j++) {
            C[i2 * n + _j] += A[i2 * n + k] * B[k * n + _j];
          }
        }
      }
      return C;
    };
    var expand = function expand2(M, n, expandFactor) {
      var _M = M.slice(0);
      for (var p2 = 1; p2 < expandFactor; p2++) {
        M = mmult(M, _M, n);
      }
      return M;
    };
    var inflate = function inflate2(M, n, inflateFactor) {
      var _M = new Array(n * n);
      for (var i2 = 0; i2 < n * n; i2++) {
        _M[i2] = Math.pow(M[i2], inflateFactor);
      }
      normalize(_M, n);
      return _M;
    };
    var hasConverged = function hasConverged2(M, _M, n2, roundFactor) {
      for (var i2 = 0; i2 < n2; i2++) {
        var v1 = Math.round(M[i2] * Math.pow(10, roundFactor)) / Math.pow(10, roundFactor);
        var v2 = Math.round(_M[i2] * Math.pow(10, roundFactor)) / Math.pow(10, roundFactor);
        if (v1 !== v2) {
          return false;
        }
      }
      return true;
    };
    var assign$2 = function assign2(M, n, nodes, cy) {
      var clusters = [];
      for (var i2 = 0; i2 < n; i2++) {
        var cluster = [];
        for (var j = 0; j < n; j++) {
          if (Math.round(M[i2 * n + j] * 1e3) / 1e3 > 0) {
            cluster.push(nodes[j]);
          }
        }
        if (cluster.length !== 0) {
          clusters.push(cy.collection(cluster));
        }
      }
      return clusters;
    };
    var isDuplicate = function isDuplicate2(c1, c2) {
      for (var i2 = 0; i2 < c1.length; i2++) {
        if (!c2[i2] || c1[i2].id() !== c2[i2].id()) {
          return false;
        }
      }
      return true;
    };
    var removeDuplicates = function removeDuplicates2(clusters) {
      for (var i2 = 0; i2 < clusters.length; i2++) {
        for (var j = 0; j < clusters.length; j++) {
          if (i2 != j && isDuplicate(clusters[i2], clusters[j])) {
            clusters.splice(j, 1);
          }
        }
      }
      return clusters;
    };
    var markovClustering = function markovClustering2(options) {
      var nodes = this.nodes();
      var edges = this.edges();
      var cy = this.cy();
      var opts = setOptions$3(options);
      var id2position = {};
      for (var i2 = 0; i2 < nodes.length; i2++) {
        id2position[nodes[i2].id()] = i2;
      }
      var n = nodes.length, n2 = n * n;
      var M = new Array(n2), _M;
      for (var _i = 0; _i < n2; _i++) {
        M[_i] = 0;
      }
      for (var e = 0; e < edges.length; e++) {
        var edge = edges[e];
        var _i2 = id2position[edge.source().id()];
        var j = id2position[edge.target().id()];
        var sim = getSimilarity$1(edge, opts.attributes);
        M[_i2 * n + j] += sim;
        M[j * n + _i2] += sim;
      }
      addLoops(M, n, opts.multFactor);
      normalize(M, n);
      var isStillMoving = true;
      var iterations = 0;
      while (isStillMoving && iterations < opts.maxIterations) {
        isStillMoving = false;
        _M = expand(M, n, opts.expandFactor);
        M = inflate(_M, n, opts.inflateFactor);
        if (!hasConverged(M, _M, n2, 4)) {
          isStillMoving = true;
        }
        iterations++;
      }
      var clusters = assign$2(M, n, nodes, cy);
      clusters = removeDuplicates(clusters);
      return clusters;
    };
    var markovClustering$1 = {
      markovClustering,
      mcl: markovClustering
    };
    var identity = function identity2(x) {
      return x;
    };
    var absDiff = function absDiff2(p2, q) {
      return Math.abs(q - p2);
    };
    var addAbsDiff = function addAbsDiff2(total, p2, q) {
      return total + absDiff(p2, q);
    };
    var addSquaredDiff = function addSquaredDiff2(total, p2, q) {
      return total + Math.pow(q - p2, 2);
    };
    var sqrt = function sqrt3(x) {
      return Math.sqrt(x);
    };
    var maxAbsDiff = function maxAbsDiff2(currentMax, p2, q) {
      return Math.max(currentMax, absDiff(p2, q));
    };
    var getDistance = function getDistance2(length, getP, getQ, init, visit) {
      var post = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : identity;
      var ret = init;
      var p2, q;
      for (var dim = 0; dim < length; dim++) {
        p2 = getP(dim);
        q = getQ(dim);
        ret = visit(ret, p2, q);
      }
      return post(ret);
    };
    var distances = {
      euclidean: function euclidean(length, getP, getQ) {
        if (length >= 2) {
          return getDistance(length, getP, getQ, 0, addSquaredDiff, sqrt);
        } else {
          return getDistance(length, getP, getQ, 0, addAbsDiff);
        }
      },
      squaredEuclidean: function squaredEuclidean(length, getP, getQ) {
        return getDistance(length, getP, getQ, 0, addSquaredDiff);
      },
      manhattan: function manhattan(length, getP, getQ) {
        return getDistance(length, getP, getQ, 0, addAbsDiff);
      },
      max: function max2(length, getP, getQ) {
        return getDistance(length, getP, getQ, -Infinity, maxAbsDiff);
      }
    };
    distances["squared-euclidean"] = distances["squaredEuclidean"];
    distances["squaredeuclidean"] = distances["squaredEuclidean"];
    function clusteringDistance(method, length, getP, getQ, nodeP, nodeQ) {
      var impl2;
      if (fn$6(method)) {
        impl2 = method;
      } else {
        impl2 = distances[method] || distances.euclidean;
      }
      if (length === 0 && fn$6(method)) {
        return impl2(nodeP, nodeQ);
      } else {
        return impl2(length, getP, getQ, nodeP, nodeQ);
      }
    }
    var defaults$b = defaults$g({
      k: 2,
      m: 2,
      sensitivityThreshold: 1e-4,
      distance: "euclidean",
      maxIterations: 10,
      attributes: [],
      testMode: false,
      testCentroids: null
    });
    var setOptions$2 = function setOptions2(options) {
      return defaults$b(options);
    };
    var getDist = function getDist2(type, node, centroid, attributes, mode) {
      var noNodeP = mode !== "kMedoids";
      var getP = noNodeP ? function(i2) {
        return centroid[i2];
      } : function(i2) {
        return attributes[i2](centroid);
      };
      var getQ = function getQ2(i2) {
        return attributes[i2](node);
      };
      var nodeP = centroid;
      var nodeQ = node;
      return clusteringDistance(type, attributes.length, getP, getQ, nodeP, nodeQ);
    };
    var randomCentroids = function randomCentroids2(nodes, k, attributes) {
      var ndim = attributes.length;
      var min2 = new Array(ndim);
      var max2 = new Array(ndim);
      var centroids = new Array(k);
      var centroid = null;
      for (var i2 = 0; i2 < ndim; i2++) {
        min2[i2] = nodes.min(attributes[i2]).value;
        max2[i2] = nodes.max(attributes[i2]).value;
      }
      for (var c = 0; c < k; c++) {
        centroid = [];
        for (var _i = 0; _i < ndim; _i++) {
          centroid[_i] = Math.random() * (max2[_i] - min2[_i]) + min2[_i];
        }
        centroids[c] = centroid;
      }
      return centroids;
    };
    var classify = function classify2(node, centroids, distance, attributes, type) {
      var min2 = Infinity;
      var index = 0;
      for (var i2 = 0; i2 < centroids.length; i2++) {
        var dist2 = getDist(distance, node, centroids[i2], attributes, type);
        if (dist2 < min2) {
          min2 = dist2;
          index = i2;
        }
      }
      return index;
    };
    var buildCluster = function buildCluster2(centroid, nodes, assignment) {
      var cluster = [];
      var node = null;
      for (var n = 0; n < nodes.length; n++) {
        node = nodes[n];
        if (assignment[node.id()] === centroid) {
          cluster.push(node);
        }
      }
      return cluster;
    };
    var haveValuesConverged = function haveValuesConverged2(v1, v2, sensitivityThreshold) {
      return Math.abs(v2 - v1) <= sensitivityThreshold;
    };
    var haveMatricesConverged = function haveMatricesConverged2(v1, v2, sensitivityThreshold) {
      for (var i2 = 0; i2 < v1.length; i2++) {
        for (var j = 0; j < v1[i2].length; j++) {
          var diff = Math.abs(v1[i2][j] - v2[i2][j]);
          if (diff > sensitivityThreshold) {
            return false;
          }
        }
      }
      return true;
    };
    var seenBefore = function seenBefore2(node, medoids, n) {
      for (var i2 = 0; i2 < n; i2++) {
        if (node === medoids[i2]) return true;
      }
      return false;
    };
    var randomMedoids = function randomMedoids2(nodes, k) {
      var medoids = new Array(k);
      if (nodes.length < 50) {
        for (var i2 = 0; i2 < k; i2++) {
          var node = nodes[Math.floor(Math.random() * nodes.length)];
          while (seenBefore(node, medoids, i2)) {
            node = nodes[Math.floor(Math.random() * nodes.length)];
          }
          medoids[i2] = node;
        }
      } else {
        for (var _i2 = 0; _i2 < k; _i2++) {
          medoids[_i2] = nodes[Math.floor(Math.random() * nodes.length)];
        }
      }
      return medoids;
    };
    var findCost = function findCost2(potentialNewMedoid, cluster, attributes) {
      var cost = 0;
      for (var n = 0; n < cluster.length; n++) {
        cost += getDist("manhattan", cluster[n], potentialNewMedoid, attributes, "kMedoids");
      }
      return cost;
    };
    var kMeans = function kMeans2(options) {
      var cy = this.cy();
      var nodes = this.nodes();
      var node = null;
      var opts = setOptions$2(options);
      var clusters = new Array(opts.k);
      var assignment = {};
      var centroids;
      if (opts.testMode) {
        if (typeof opts.testCentroids === "number") {
          opts.testCentroids;
          centroids = randomCentroids(nodes, opts.k, opts.attributes);
        } else if (_typeof(opts.testCentroids) === "object") {
          centroids = opts.testCentroids;
        } else {
          centroids = randomCentroids(nodes, opts.k, opts.attributes);
        }
      } else {
        centroids = randomCentroids(nodes, opts.k, opts.attributes);
      }
      var isStillMoving = true;
      var iterations = 0;
      while (isStillMoving && iterations < opts.maxIterations) {
        for (var n = 0; n < nodes.length; n++) {
          node = nodes[n];
          assignment[node.id()] = classify(node, centroids, opts.distance, opts.attributes, "kMeans");
        }
        isStillMoving = false;
        for (var c = 0; c < opts.k; c++) {
          var cluster = buildCluster(c, nodes, assignment);
          if (cluster.length === 0) {
            continue;
          }
          var ndim = opts.attributes.length;
          var centroid = centroids[c];
          var newCentroid = new Array(ndim);
          var sum = new Array(ndim);
          for (var d = 0; d < ndim; d++) {
            sum[d] = 0;
            for (var i2 = 0; i2 < cluster.length; i2++) {
              node = cluster[i2];
              sum[d] += opts.attributes[d](node);
            }
            newCentroid[d] = sum[d] / cluster.length;
            if (!haveValuesConverged(newCentroid[d], centroid[d], opts.sensitivityThreshold)) {
              isStillMoving = true;
            }
          }
          centroids[c] = newCentroid;
          clusters[c] = cy.collection(cluster);
        }
        iterations++;
      }
      return clusters;
    };
    var kMedoids = function kMedoids2(options) {
      var cy = this.cy();
      var nodes = this.nodes();
      var node = null;
      var opts = setOptions$2(options);
      var clusters = new Array(opts.k);
      var medoids;
      var assignment = {};
      var curCost;
      var minCosts = new Array(opts.k);
      if (opts.testMode) {
        if (typeof opts.testCentroids === "number") ;
        else if (_typeof(opts.testCentroids) === "object") {
          medoids = opts.testCentroids;
        } else {
          medoids = randomMedoids(nodes, opts.k);
        }
      } else {
        medoids = randomMedoids(nodes, opts.k);
      }
      var isStillMoving = true;
      var iterations = 0;
      while (isStillMoving && iterations < opts.maxIterations) {
        for (var n = 0; n < nodes.length; n++) {
          node = nodes[n];
          assignment[node.id()] = classify(node, medoids, opts.distance, opts.attributes, "kMedoids");
        }
        isStillMoving = false;
        for (var m = 0; m < medoids.length; m++) {
          var cluster = buildCluster(m, nodes, assignment);
          if (cluster.length === 0) {
            continue;
          }
          minCosts[m] = findCost(medoids[m], cluster, opts.attributes);
          for (var _n = 0; _n < cluster.length; _n++) {
            curCost = findCost(cluster[_n], cluster, opts.attributes);
            if (curCost < minCosts[m]) {
              minCosts[m] = curCost;
              medoids[m] = cluster[_n];
              isStillMoving = true;
            }
          }
          clusters[m] = cy.collection(cluster);
        }
        iterations++;
      }
      return clusters;
    };
    var updateCentroids = function updateCentroids2(centroids, nodes, U, weight, opts) {
      var numerator, denominator;
      for (var n = 0; n < nodes.length; n++) {
        for (var c = 0; c < centroids.length; c++) {
          weight[n][c] = Math.pow(U[n][c], opts.m);
        }
      }
      for (var _c = 0; _c < centroids.length; _c++) {
        for (var dim = 0; dim < opts.attributes.length; dim++) {
          numerator = 0;
          denominator = 0;
          for (var _n2 = 0; _n2 < nodes.length; _n2++) {
            numerator += weight[_n2][_c] * opts.attributes[dim](nodes[_n2]);
            denominator += weight[_n2][_c];
          }
          centroids[_c][dim] = numerator / denominator;
        }
      }
    };
    var updateMembership = function updateMembership2(U, _U, centroids, nodes, opts) {
      for (var i2 = 0; i2 < U.length; i2++) {
        _U[i2] = U[i2].slice();
      }
      var sum, numerator, denominator;
      var pow = 2 / (opts.m - 1);
      for (var c = 0; c < centroids.length; c++) {
        for (var n = 0; n < nodes.length; n++) {
          sum = 0;
          for (var k = 0; k < centroids.length; k++) {
            numerator = getDist(opts.distance, nodes[n], centroids[c], opts.attributes, "cmeans");
            denominator = getDist(opts.distance, nodes[n], centroids[k], opts.attributes, "cmeans");
            sum += Math.pow(numerator / denominator, pow);
          }
          U[n][c] = 1 / sum;
        }
      }
    };
    var assign$1 = function assign2(nodes, U, opts, cy) {
      var clusters = new Array(opts.k);
      for (var c = 0; c < clusters.length; c++) {
        clusters[c] = [];
      }
      var max2;
      var index;
      for (var n = 0; n < U.length; n++) {
        max2 = -Infinity;
        index = -1;
        for (var _c2 = 0; _c2 < U[0].length; _c2++) {
          if (U[n][_c2] > max2) {
            max2 = U[n][_c2];
            index = _c2;
          }
        }
        clusters[index].push(nodes[n]);
      }
      for (var _c3 = 0; _c3 < clusters.length; _c3++) {
        clusters[_c3] = cy.collection(clusters[_c3]);
      }
      return clusters;
    };
    var fuzzyCMeans = function fuzzyCMeans2(options) {
      var cy = this.cy();
      var nodes = this.nodes();
      var opts = setOptions$2(options);
      var clusters;
      var centroids;
      var U;
      var _U;
      var weight;
      _U = new Array(nodes.length);
      for (var i2 = 0; i2 < nodes.length; i2++) {
        _U[i2] = new Array(opts.k);
      }
      U = new Array(nodes.length);
      for (var _i3 = 0; _i3 < nodes.length; _i3++) {
        U[_i3] = new Array(opts.k);
      }
      for (var _i4 = 0; _i4 < nodes.length; _i4++) {
        var total = 0;
        for (var j = 0; j < opts.k; j++) {
          U[_i4][j] = Math.random();
          total += U[_i4][j];
        }
        for (var _j = 0; _j < opts.k; _j++) {
          U[_i4][_j] = U[_i4][_j] / total;
        }
      }
      centroids = new Array(opts.k);
      for (var _i5 = 0; _i5 < opts.k; _i5++) {
        centroids[_i5] = new Array(opts.attributes.length);
      }
      weight = new Array(nodes.length);
      for (var _i6 = 0; _i6 < nodes.length; _i6++) {
        weight[_i6] = new Array(opts.k);
      }
      var isStillMoving = true;
      var iterations = 0;
      while (isStillMoving && iterations < opts.maxIterations) {
        isStillMoving = false;
        updateCentroids(centroids, nodes, U, weight, opts);
        updateMembership(U, _U, centroids, nodes, opts);
        if (!haveMatricesConverged(U, _U, opts.sensitivityThreshold)) {
          isStillMoving = true;
        }
        iterations++;
      }
      clusters = assign$1(nodes, U, opts, cy);
      return {
        clusters,
        degreeOfMembership: U
      };
    };
    var kClustering = {
      kMeans,
      kMedoids,
      fuzzyCMeans,
      fcm: fuzzyCMeans
    };
    var defaults$a = defaults$g({
      distance: "euclidean",
      // distance metric to compare nodes
      linkage: "min",
      // linkage criterion : how to determine the distance between clusters of nodes
      mode: "threshold",
      // mode:'threshold' => clusters must be threshold distance apart
      threshold: Infinity,
      // the distance threshold
      // mode:'dendrogram' => the nodes are organised as leaves in a tree (siblings are close), merging makes clusters
      addDendrogram: false,
      // whether to add the dendrogram to the graph for viz
      dendrogramDepth: 0,
      // depth at which dendrogram branches are merged into the returned clusters
      attributes: []
      // array of attr functions
    });
    var linkageAliases = {
      "single": "min",
      "complete": "max"
    };
    var setOptions$1 = function setOptions2(options) {
      var opts = defaults$a(options);
      var preferredAlias = linkageAliases[opts.linkage];
      if (preferredAlias != null) {
        opts.linkage = preferredAlias;
      }
      return opts;
    };
    var mergeClosest = function mergeClosest2(clusters, index, dists, mins, opts) {
      var minKey = 0;
      var min2 = Infinity;
      var dist2;
      var attrs = opts.attributes;
      var getDist2 = function getDist3(n1, n2) {
        return clusteringDistance(opts.distance, attrs.length, function(i3) {
          return attrs[i3](n1);
        }, function(i3) {
          return attrs[i3](n2);
        }, n1, n2);
      };
      for (var i2 = 0; i2 < clusters.length; i2++) {
        var key = clusters[i2].key;
        var _dist = dists[key][mins[key]];
        if (_dist < min2) {
          minKey = key;
          min2 = _dist;
        }
      }
      if (opts.mode === "threshold" && min2 >= opts.threshold || opts.mode === "dendrogram" && clusters.length === 1) {
        return false;
      }
      var c1 = index[minKey];
      var c2 = index[mins[minKey]];
      var merged;
      if (opts.mode === "dendrogram") {
        merged = {
          left: c1,
          right: c2,
          key: c1.key
        };
      } else {
        merged = {
          value: c1.value.concat(c2.value),
          key: c1.key
        };
      }
      clusters[c1.index] = merged;
      clusters.splice(c2.index, 1);
      index[c1.key] = merged;
      for (var _i = 0; _i < clusters.length; _i++) {
        var cur = clusters[_i];
        if (c1.key === cur.key) {
          dist2 = Infinity;
        } else if (opts.linkage === "min") {
          dist2 = dists[c1.key][cur.key];
          if (dists[c1.key][cur.key] > dists[c2.key][cur.key]) {
            dist2 = dists[c2.key][cur.key];
          }
        } else if (opts.linkage === "max") {
          dist2 = dists[c1.key][cur.key];
          if (dists[c1.key][cur.key] < dists[c2.key][cur.key]) {
            dist2 = dists[c2.key][cur.key];
          }
        } else if (opts.linkage === "mean") {
          dist2 = (dists[c1.key][cur.key] * c1.size + dists[c2.key][cur.key] * c2.size) / (c1.size + c2.size);
        } else {
          if (opts.mode === "dendrogram") dist2 = getDist2(cur.value, c1.value);
          else dist2 = getDist2(cur.value[0], c1.value[0]);
        }
        dists[c1.key][cur.key] = dists[cur.key][c1.key] = dist2;
      }
      for (var _i2 = 0; _i2 < clusters.length; _i2++) {
        var key1 = clusters[_i2].key;
        if (mins[key1] === c1.key || mins[key1] === c2.key) {
          var _min = key1;
          for (var j = 0; j < clusters.length; j++) {
            var key2 = clusters[j].key;
            if (dists[key1][key2] < dists[key1][_min]) {
              _min = key2;
            }
          }
          mins[key1] = _min;
        }
        clusters[_i2].index = _i2;
      }
      c1.key = c2.key = c1.index = c2.index = null;
      return true;
    };
    var getAllChildren = function getAllChildren2(root, arr, cy) {
      if (!root) return;
      if (root.value) {
        arr.push(root.value);
      } else {
        if (root.left) getAllChildren2(root.left, arr);
        if (root.right) getAllChildren2(root.right, arr);
      }
    };
    var buildDendrogram = function buildDendrogram2(root, cy) {
      if (!root) return "";
      if (root.left && root.right) {
        var leftStr = buildDendrogram2(root.left, cy);
        var rightStr = buildDendrogram2(root.right, cy);
        var node = cy.add({
          group: "nodes",
          data: {
            id: leftStr + "," + rightStr
          }
        });
        cy.add({
          group: "edges",
          data: {
            source: leftStr,
            target: node.id()
          }
        });
        cy.add({
          group: "edges",
          data: {
            source: rightStr,
            target: node.id()
          }
        });
        return node.id();
      } else if (root.value) {
        return root.value.id();
      }
    };
    var buildClustersFromTree = function buildClustersFromTree2(root, k, cy) {
      if (!root) return [];
      var left = [], right = [], leaves = [];
      if (k === 0) {
        if (root.left) getAllChildren(root.left, left);
        if (root.right) getAllChildren(root.right, right);
        leaves = left.concat(right);
        return [cy.collection(leaves)];
      } else if (k === 1) {
        if (root.value) {
          return [cy.collection(root.value)];
        } else {
          if (root.left) getAllChildren(root.left, left);
          if (root.right) getAllChildren(root.right, right);
          return [cy.collection(left), cy.collection(right)];
        }
      } else {
        if (root.value) {
          return [cy.collection(root.value)];
        } else {
          if (root.left) left = buildClustersFromTree2(root.left, k - 1, cy);
          if (root.right) right = buildClustersFromTree2(root.right, k - 1, cy);
          return left.concat(right);
        }
      }
    };
    var hierarchicalClustering = function hierarchicalClustering2(options) {
      var cy = this.cy();
      var nodes = this.nodes();
      var opts = setOptions$1(options);
      var attrs = opts.attributes;
      var getDist2 = function getDist3(n1, n2) {
        return clusteringDistance(opts.distance, attrs.length, function(i3) {
          return attrs[i3](n1);
        }, function(i3) {
          return attrs[i3](n2);
        }, n1, n2);
      };
      var clusters = [];
      var dists = [];
      var mins = [];
      var index = [];
      for (var n = 0; n < nodes.length; n++) {
        var cluster = {
          value: opts.mode === "dendrogram" ? nodes[n] : [nodes[n]],
          key: n,
          index: n
        };
        clusters[n] = cluster;
        index[n] = cluster;
        dists[n] = [];
        mins[n] = 0;
      }
      for (var i2 = 0; i2 < clusters.length; i2++) {
        for (var j = 0; j <= i2; j++) {
          var dist2 = void 0;
          if (opts.mode === "dendrogram") {
            dist2 = i2 === j ? Infinity : getDist2(clusters[i2].value, clusters[j].value);
          } else {
            dist2 = i2 === j ? Infinity : getDist2(clusters[i2].value[0], clusters[j].value[0]);
          }
          dists[i2][j] = dist2;
          dists[j][i2] = dist2;
          if (dist2 < dists[i2][mins[i2]]) {
            mins[i2] = j;
          }
        }
      }
      var merged = mergeClosest(clusters, index, dists, mins, opts);
      while (merged) {
        merged = mergeClosest(clusters, index, dists, mins, opts);
      }
      var retClusters;
      if (opts.mode === "dendrogram") {
        retClusters = buildClustersFromTree(clusters[0], opts.dendrogramDepth, cy);
        if (opts.addDendrogram) buildDendrogram(clusters[0], cy);
      } else {
        retClusters = new Array(clusters.length);
        clusters.forEach(function(cluster2, i3) {
          cluster2.key = cluster2.index = null;
          retClusters[i3] = cy.collection(cluster2.value);
        });
      }
      return retClusters;
    };
    var hierarchicalClustering$1 = {
      hierarchicalClustering,
      hca: hierarchicalClustering
    };
    var defaults$9 = defaults$g({
      distance: "euclidean",
      // distance metric to compare attributes between two nodes
      preference: "median",
      // suitability of a data point to serve as an exemplar
      damping: 0.8,
      // damping factor between [0.5, 1)
      maxIterations: 1e3,
      // max number of iterations to run
      minIterations: 100,
      // min number of iterations to run in order for clustering to stop
      attributes: [
        // functions to quantify the similarity between any two points
        // e.g. node => node.data('weight')
      ]
    });
    var setOptions = function setOptions2(options) {
      var dmp = options.damping;
      var pref = options.preference;
      if (!(0.5 <= dmp && dmp < 1)) {
        error("Damping must range on [0.5, 1).  Got: ".concat(dmp));
      }
      var validPrefs = ["median", "mean", "min", "max"];
      if (!(validPrefs.some(function(v) {
        return v === pref;
      }) || number$1(pref))) {
        error("Preference must be one of [".concat(validPrefs.map(function(p2) {
          return "'".concat(p2, "'");
        }).join(", "), "] or a number.  Got: ").concat(pref));
      }
      return defaults$9(options);
    };
    var getSimilarity = function getSimilarity2(type, n1, n2, attributes) {
      var attr = function attr2(n, i2) {
        return attributes[i2](n);
      };
      return -clusteringDistance(type, attributes.length, function(i2) {
        return attr(n1, i2);
      }, function(i2) {
        return attr(n2, i2);
      }, n1, n2);
    };
    var getPreference = function getPreference2(S, preference) {
      var p2 = null;
      if (preference === "median") {
        p2 = median(S);
      } else if (preference === "mean") {
        p2 = mean(S);
      } else if (preference === "min") {
        p2 = min(S);
      } else if (preference === "max") {
        p2 = max(S);
      } else {
        p2 = preference;
      }
      return p2;
    };
    var findExemplars = function findExemplars2(n, R, A) {
      var indices = [];
      for (var i2 = 0; i2 < n; i2++) {
        if (R[i2 * n + i2] + A[i2 * n + i2] > 0) {
          indices.push(i2);
        }
      }
      return indices;
    };
    var assignClusters = function assignClusters2(n, S, exemplars) {
      var clusters = [];
      for (var i2 = 0; i2 < n; i2++) {
        var index = -1;
        var max2 = -Infinity;
        for (var ei = 0; ei < exemplars.length; ei++) {
          var e = exemplars[ei];
          if (S[i2 * n + e] > max2) {
            index = e;
            max2 = S[i2 * n + e];
          }
        }
        if (index > 0) {
          clusters.push(index);
        }
      }
      for (var _ei = 0; _ei < exemplars.length; _ei++) {
        clusters[exemplars[_ei]] = exemplars[_ei];
      }
      return clusters;
    };
    var assign = function assign2(n, S, exemplars) {
      var clusters = assignClusters(n, S, exemplars);
      for (var ei = 0; ei < exemplars.length; ei++) {
        var ii = [];
        for (var c = 0; c < clusters.length; c++) {
          if (clusters[c] === exemplars[ei]) {
            ii.push(c);
          }
        }
        var maxI = -1;
        var maxSum = -Infinity;
        for (var i2 = 0; i2 < ii.length; i2++) {
          var sum = 0;
          for (var j = 0; j < ii.length; j++) {
            sum += S[ii[j] * n + ii[i2]];
          }
          if (sum > maxSum) {
            maxI = i2;
            maxSum = sum;
          }
        }
        exemplars[ei] = ii[maxI];
      }
      clusters = assignClusters(n, S, exemplars);
      return clusters;
    };
    var affinityPropagation = function affinityPropagation2(options) {
      var cy = this.cy();
      var nodes = this.nodes();
      var opts = setOptions(options);
      var id2position = {};
      for (var i2 = 0; i2 < nodes.length; i2++) {
        id2position[nodes[i2].id()] = i2;
      }
      var n;
      var n2;
      var S;
      var p2;
      var R;
      var A;
      n = nodes.length;
      n2 = n * n;
      S = new Array(n2);
      for (var _i = 0; _i < n2; _i++) {
        S[_i] = -Infinity;
      }
      for (var _i2 = 0; _i2 < n; _i2++) {
        for (var j = 0; j < n; j++) {
          if (_i2 !== j) {
            S[_i2 * n + j] = getSimilarity(opts.distance, nodes[_i2], nodes[j], opts.attributes);
          }
        }
      }
      p2 = getPreference(S, opts.preference);
      for (var _i3 = 0; _i3 < n; _i3++) {
        S[_i3 * n + _i3] = p2;
      }
      R = new Array(n2);
      for (var _i4 = 0; _i4 < n2; _i4++) {
        R[_i4] = 0;
      }
      A = new Array(n2);
      for (var _i5 = 0; _i5 < n2; _i5++) {
        A[_i5] = 0;
      }
      var old = new Array(n);
      var Rp = new Array(n);
      var se = new Array(n);
      for (var _i6 = 0; _i6 < n; _i6++) {
        old[_i6] = 0;
        Rp[_i6] = 0;
        se[_i6] = 0;
      }
      var e = new Array(n * opts.minIterations);
      for (var _i7 = 0; _i7 < e.length; _i7++) {
        e[_i7] = 0;
      }
      var iter;
      for (iter = 0; iter < opts.maxIterations; iter++) {
        for (var _i8 = 0; _i8 < n; _i8++) {
          var max2 = -Infinity, max22 = -Infinity, maxI = -1, AS = 0;
          for (var _j = 0; _j < n; _j++) {
            old[_j] = R[_i8 * n + _j];
            AS = A[_i8 * n + _j] + S[_i8 * n + _j];
            if (AS >= max2) {
              max22 = max2;
              max2 = AS;
              maxI = _j;
            } else if (AS > max22) {
              max22 = AS;
            }
          }
          for (var _j2 = 0; _j2 < n; _j2++) {
            R[_i8 * n + _j2] = (1 - opts.damping) * (S[_i8 * n + _j2] - max2) + opts.damping * old[_j2];
          }
          R[_i8 * n + maxI] = (1 - opts.damping) * (S[_i8 * n + maxI] - max22) + opts.damping * old[maxI];
        }
        for (var _i9 = 0; _i9 < n; _i9++) {
          var sum = 0;
          for (var _j3 = 0; _j3 < n; _j3++) {
            old[_j3] = A[_j3 * n + _i9];
            Rp[_j3] = Math.max(0, R[_j3 * n + _i9]);
            sum += Rp[_j3];
          }
          sum -= Rp[_i9];
          Rp[_i9] = R[_i9 * n + _i9];
          sum += Rp[_i9];
          for (var _j4 = 0; _j4 < n; _j4++) {
            A[_j4 * n + _i9] = (1 - opts.damping) * Math.min(0, sum - Rp[_j4]) + opts.damping * old[_j4];
          }
          A[_i9 * n + _i9] = (1 - opts.damping) * (sum - Rp[_i9]) + opts.damping * old[_i9];
        }
        var K2 = 0;
        for (var _i10 = 0; _i10 < n; _i10++) {
          var E = A[_i10 * n + _i10] + R[_i10 * n + _i10] > 0 ? 1 : 0;
          e[iter % opts.minIterations * n + _i10] = E;
          K2 += E;
        }
        if (K2 > 0 && (iter >= opts.minIterations - 1 || iter == opts.maxIterations - 1)) {
          var _sum = 0;
          for (var _i11 = 0; _i11 < n; _i11++) {
            se[_i11] = 0;
            for (var _j5 = 0; _j5 < opts.minIterations; _j5++) {
              se[_i11] += e[_j5 * n + _i11];
            }
            if (se[_i11] === 0 || se[_i11] === opts.minIterations) {
              _sum++;
            }
          }
          if (_sum === n) {
            break;
          }
        }
      }
      var exemplarsIndices = findExemplars(n, R, A);
      var clusterIndices = assign(n, S, exemplarsIndices);
      var clusters = {};
      for (var c = 0; c < exemplarsIndices.length; c++) {
        clusters[exemplarsIndices[c]] = [];
      }
      for (var _i12 = 0; _i12 < nodes.length; _i12++) {
        var pos = id2position[nodes[_i12].id()];
        var clusterIndex = clusterIndices[pos];
        if (clusterIndex != null) {
          clusters[clusterIndex].push(nodes[_i12]);
        }
      }
      var retClusters = new Array(exemplarsIndices.length);
      for (var _c = 0; _c < exemplarsIndices.length; _c++) {
        retClusters[_c] = cy.collection(clusters[exemplarsIndices[_c]]);
      }
      return retClusters;
    };
    var affinityPropagation$1 = {
      affinityPropagation,
      ap: affinityPropagation
    };
    var hierholzerDefaults = defaults$g({
      root: void 0,
      directed: false
    });
    var elesfn$k = {
      hierholzer: function hierholzer(options) {
        if (!plainObject(options)) {
          var args = arguments;
          options = {
            root: args[0],
            directed: args[1]
          };
        }
        var _hierholzerDefaults = hierholzerDefaults(options), root = _hierholzerDefaults.root, directed = _hierholzerDefaults.directed;
        var eles = this;
        var dflag = false;
        var oddIn;
        var oddOut;
        var startVertex;
        if (root) startVertex = string(root) ? this.filter(root)[0].id() : root[0].id();
        var nodes = {};
        var edges = {};
        if (directed) {
          eles.forEach(function(ele) {
            var id = ele.id();
            if (ele.isNode()) {
              var ind = ele.indegree(true);
              var outd = ele.outdegree(true);
              var d1 = ind - outd;
              var d2 = outd - ind;
              if (d1 == 1) {
                if (oddIn) dflag = true;
                else oddIn = id;
              } else if (d2 == 1) {
                if (oddOut) dflag = true;
                else oddOut = id;
              } else if (d2 > 1 || d1 > 1) {
                dflag = true;
              }
              nodes[id] = [];
              ele.outgoers().forEach(function(e) {
                if (e.isEdge()) nodes[id].push(e.id());
              });
            } else {
              edges[id] = [void 0, ele.target().id()];
            }
          });
        } else {
          eles.forEach(function(ele) {
            var id = ele.id();
            if (ele.isNode()) {
              var d2 = ele.degree(true);
              if (d2 % 2) {
                if (!oddIn) oddIn = id;
                else if (!oddOut) oddOut = id;
                else dflag = true;
              }
              nodes[id] = [];
              ele.connectedEdges().forEach(function(e) {
                return nodes[id].push(e.id());
              });
            } else {
              edges[id] = [ele.source().id(), ele.target().id()];
            }
          });
        }
        var result = {
          found: false,
          trail: void 0
        };
        if (dflag) return result;
        else if (oddOut && oddIn) {
          if (directed) {
            if (startVertex && oddOut != startVertex) {
              return result;
            }
            startVertex = oddOut;
          } else {
            if (startVertex && oddOut != startVertex && oddIn != startVertex) {
              return result;
            } else if (!startVertex) {
              startVertex = oddOut;
            }
          }
        } else {
          if (!startVertex) startVertex = eles[0].id();
        }
        var walk = function walk2(v) {
          var currentNode = v;
          var subtour2 = [v];
          var adj, adjTail, adjHead;
          while (nodes[currentNode].length) {
            adj = nodes[currentNode].shift();
            adjTail = edges[adj][0];
            adjHead = edges[adj][1];
            if (currentNode != adjHead) {
              nodes[adjHead] = nodes[adjHead].filter(function(e) {
                return e != adj;
              });
              currentNode = adjHead;
            } else if (!directed && currentNode != adjTail) {
              nodes[adjTail] = nodes[adjTail].filter(function(e) {
                return e != adj;
              });
              currentNode = adjTail;
            }
            subtour2.unshift(adj);
            subtour2.unshift(currentNode);
          }
          return subtour2;
        };
        var trail = [];
        var subtour = [];
        subtour = walk(startVertex);
        while (subtour.length != 1) {
          if (nodes[subtour[0]].length == 0) {
            trail.unshift(eles.getElementById(subtour.shift()));
            trail.unshift(eles.getElementById(subtour.shift()));
          } else {
            subtour = walk(subtour.shift()).concat(subtour);
          }
        }
        trail.unshift(eles.getElementById(subtour.shift()));
        for (var d in nodes) {
          if (nodes[d].length) {
            return result;
          }
        }
        result.found = true;
        result.trail = this.spawn(trail, true);
        return result;
      }
    };
    var hopcroftTarjanBiconnected = function hopcroftTarjanBiconnected2() {
      var eles = this;
      var nodes = {};
      var id = 0;
      var edgeCount = 0;
      var components = [];
      var stack = [];
      var visitedEdges = {};
      var buildComponent = function buildComponent2(x, y) {
        var i2 = stack.length - 1;
        var cutset = [];
        var component = eles.spawn();
        while (stack[i2].x != x || stack[i2].y != y) {
          cutset.push(stack.pop().edge);
          i2--;
        }
        cutset.push(stack.pop().edge);
        cutset.forEach(function(edge) {
          var connectedNodes = edge.connectedNodes().intersection(eles);
          component.merge(edge);
          connectedNodes.forEach(function(node) {
            var nodeId = node.id();
            var connectedEdges = node.connectedEdges().intersection(eles);
            component.merge(node);
            if (!nodes[nodeId].cutVertex) {
              component.merge(connectedEdges);
            } else {
              component.merge(connectedEdges.filter(function(edge2) {
                return edge2.isLoop();
              }));
            }
          });
        });
        components.push(component);
      };
      var biconnectedSearch = function biconnectedSearch2(root, currentNode, parent) {
        if (root === parent) edgeCount += 1;
        nodes[currentNode] = {
          id,
          low: id++,
          cutVertex: false
        };
        var edges = eles.getElementById(currentNode).connectedEdges().intersection(eles);
        if (edges.size() === 0) {
          components.push(eles.spawn(eles.getElementById(currentNode)));
        } else {
          var sourceId, targetId, otherNodeId, edgeId;
          edges.forEach(function(edge) {
            sourceId = edge.source().id();
            targetId = edge.target().id();
            otherNodeId = sourceId === currentNode ? targetId : sourceId;
            if (otherNodeId !== parent) {
              edgeId = edge.id();
              if (!visitedEdges[edgeId]) {
                visitedEdges[edgeId] = true;
                stack.push({
                  x: currentNode,
                  y: otherNodeId,
                  edge
                });
              }
              if (!(otherNodeId in nodes)) {
                biconnectedSearch2(root, otherNodeId, currentNode);
                nodes[currentNode].low = Math.min(nodes[currentNode].low, nodes[otherNodeId].low);
                if (nodes[currentNode].id <= nodes[otherNodeId].low) {
                  nodes[currentNode].cutVertex = true;
                  buildComponent(currentNode, otherNodeId);
                }
              } else {
                nodes[currentNode].low = Math.min(nodes[currentNode].low, nodes[otherNodeId].id);
              }
            }
          });
        }
      };
      eles.forEach(function(ele) {
        if (ele.isNode()) {
          var nodeId = ele.id();
          if (!(nodeId in nodes)) {
            edgeCount = 0;
            biconnectedSearch(nodeId, nodeId);
            nodes[nodeId].cutVertex = edgeCount > 1;
          }
        }
      });
      var cutVertices = Object.keys(nodes).filter(function(id2) {
        return nodes[id2].cutVertex;
      }).map(function(id2) {
        return eles.getElementById(id2);
      });
      return {
        cut: eles.spawn(cutVertices),
        components
      };
    };
    var hopcroftTarjanBiconnected$1 = {
      hopcroftTarjanBiconnected,
      htbc: hopcroftTarjanBiconnected,
      htb: hopcroftTarjanBiconnected,
      hopcroftTarjanBiconnectedComponents: hopcroftTarjanBiconnected
    };
    var tarjanStronglyConnected = function tarjanStronglyConnected2() {
      var eles = this;
      var nodes = {};
      var index = 0;
      var components = [];
      var stack = [];
      var cut = eles.spawn(eles);
      var stronglyConnectedSearch = function stronglyConnectedSearch2(sourceNodeId) {
        stack.push(sourceNodeId);
        nodes[sourceNodeId] = {
          index,
          low: index++,
          explored: false
        };
        var connectedEdges = eles.getElementById(sourceNodeId).connectedEdges().intersection(eles);
        connectedEdges.forEach(function(edge) {
          var targetNodeId = edge.target().id();
          if (targetNodeId !== sourceNodeId) {
            if (!(targetNodeId in nodes)) {
              stronglyConnectedSearch2(targetNodeId);
            }
            if (!nodes[targetNodeId].explored) {
              nodes[sourceNodeId].low = Math.min(nodes[sourceNodeId].low, nodes[targetNodeId].low);
            }
          }
        });
        if (nodes[sourceNodeId].index === nodes[sourceNodeId].low) {
          var componentNodes = eles.spawn();
          for (; ; ) {
            var nodeId = stack.pop();
            componentNodes.merge(eles.getElementById(nodeId));
            nodes[nodeId].low = nodes[sourceNodeId].index;
            nodes[nodeId].explored = true;
            if (nodeId === sourceNodeId) {
              break;
            }
          }
          var componentEdges = componentNodes.edgesWith(componentNodes);
          var component = componentNodes.merge(componentEdges);
          components.push(component);
          cut = cut.difference(component);
        }
      };
      eles.forEach(function(ele) {
        if (ele.isNode()) {
          var nodeId = ele.id();
          if (!(nodeId in nodes)) {
            stronglyConnectedSearch(nodeId);
          }
        }
      });
      return {
        cut,
        components
      };
    };
    var tarjanStronglyConnected$1 = {
      tarjanStronglyConnected,
      tsc: tarjanStronglyConnected,
      tscc: tarjanStronglyConnected,
      tarjanStronglyConnectedComponents: tarjanStronglyConnected
    };
    var elesfn$j = {};
    [elesfn$v, elesfn$u, elesfn$t, elesfn$s, elesfn$r, elesfn$q, elesfn$p, elesfn$o, elesfn$n, elesfn$m, elesfn$l, markovClustering$1, kClustering, hierarchicalClustering$1, affinityPropagation$1, elesfn$k, hopcroftTarjanBiconnected$1, tarjanStronglyConnected$1].forEach(function(props) {
      extend(elesfn$j, props);
    });
    var STATE_PENDING = 0;
    var STATE_FULFILLED = 1;
    var STATE_REJECTED = 2;
    var api = function api2(executor) {
      if (!(this instanceof api2)) return new api2(executor);
      this.id = "Thenable/1.0.7";
      this.state = STATE_PENDING;
      this.fulfillValue = void 0;
      this.rejectReason = void 0;
      this.onFulfilled = [];
      this.onRejected = [];
      this.proxy = {
        then: this.then.bind(this)
      };
      if (typeof executor === "function") executor.call(this, this.fulfill.bind(this), this.reject.bind(this));
    };
    api.prototype = {
      /*  promise resolving methods  */
      fulfill: function fulfill(value) {
        return deliver(this, STATE_FULFILLED, "fulfillValue", value);
      },
      reject: function reject(value) {
        return deliver(this, STATE_REJECTED, "rejectReason", value);
      },
      /*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
      then: function then(onFulfilled, onRejected) {
        var curr = this;
        var next = new api();
        curr.onFulfilled.push(resolver(onFulfilled, next, "fulfill"));
        curr.onRejected.push(resolver(onRejected, next, "reject"));
        execute(curr);
        return next.proxy;
      }
    };
    var deliver = function deliver2(curr, state, name, value) {
      if (curr.state === STATE_PENDING) {
        curr.state = state;
        curr[name] = value;
        execute(curr);
      }
      return curr;
    };
    var execute = function execute2(curr) {
      if (curr.state === STATE_FULFILLED) execute_handlers(curr, "onFulfilled", curr.fulfillValue);
      else if (curr.state === STATE_REJECTED) execute_handlers(curr, "onRejected", curr.rejectReason);
    };
    var execute_handlers = function execute_handlers2(curr, name, value) {
      if (curr[name].length === 0) return;
      var handlers = curr[name];
      curr[name] = [];
      var func = function func2() {
        for (var i2 = 0; i2 < handlers.length; i2++) {
          handlers[i2](value);
        }
      };
      if (typeof setImmediate === "function") setImmediate(func);
      else setTimeout(func, 0);
    };
    var resolver = function resolver2(cb, next, method) {
      return function(value) {
        if (typeof cb !== "function")
          next[method].call(next, value);
        else {
          var result;
          try {
            result = cb(value);
          } catch (e) {
            next.reject(e);
            return;
          }
          resolve(next, result);
        }
      };
    };
    var resolve = function resolve2(promise2, x) {
      if (promise2 === x || promise2.proxy === x) {
        promise2.reject(new TypeError("cannot resolve promise with itself"));
        return;
      }
      var then;
      if (_typeof(x) === "object" && x !== null || typeof x === "function") {
        try {
          then = x.then;
        } catch (e) {
          promise2.reject(e);
          return;
        }
      }
      if (typeof then === "function") {
        var resolved = false;
        try {
          then.call(
            x,
            /*  resolvePromise  */
            /*  [Promises/A+ 2.3.3.3.1]  */
            function(y) {
              if (resolved) return;
              resolved = true;
              if (y === x)
                promise2.reject(new TypeError("circular thenable chain"));
              else resolve2(promise2, y);
            },
            /*  rejectPromise  */
            /*  [Promises/A+ 2.3.3.3.2]  */
            function(r) {
              if (resolved) return;
              resolved = true;
              promise2.reject(r);
            }
          );
        } catch (e) {
          if (!resolved)
            promise2.reject(e);
        }
        return;
      }
      promise2.fulfill(x);
    };
    api.all = function(ps) {
      return new api(function(resolveAll, rejectAll) {
        var vals = new Array(ps.length);
        var doneCount = 0;
        var fulfill = function fulfill2(i3, val) {
          vals[i3] = val;
          doneCount++;
          if (doneCount === ps.length) {
            resolveAll(vals);
          }
        };
        for (var i2 = 0; i2 < ps.length; i2++) {
          (function(i3) {
            var p2 = ps[i3];
            var isPromise = p2 != null && p2.then != null;
            if (isPromise) {
              p2.then(function(val2) {
                fulfill(i3, val2);
              }, function(err) {
                rejectAll(err);
              });
            } else {
              var val = p2;
              fulfill(i3, val);
            }
          })(i2);
        }
      });
    };
    api.resolve = function(val) {
      return new api(function(resolve2, reject) {
        resolve2(val);
      });
    };
    api.reject = function(val) {
      return new api(function(resolve2, reject) {
        reject(val);
      });
    };
    var Promise$1 = typeof Promise !== "undefined" ? Promise : api;
    var Animation = function Animation2(target, opts, opts2) {
      var isCore = core(target);
      var isEle = !isCore;
      var _p = this._private = extend({
        duration: 1e3
      }, opts, opts2);
      _p.target = target;
      _p.style = _p.style || _p.css;
      _p.started = false;
      _p.playing = false;
      _p.hooked = false;
      _p.applying = false;
      _p.progress = 0;
      _p.completes = [];
      _p.frames = [];
      if (_p.complete && fn$6(_p.complete)) {
        _p.completes.push(_p.complete);
      }
      if (isEle) {
        var pos = target.position();
        _p.startPosition = _p.startPosition || {
          x: pos.x,
          y: pos.y
        };
        _p.startStyle = _p.startStyle || target.cy().style().getAnimationStartStyle(target, _p.style);
      }
      if (isCore) {
        var pan = target.pan();
        _p.startPan = {
          x: pan.x,
          y: pan.y
        };
        _p.startZoom = target.zoom();
      }
      this.length = 1;
      this[0] = this;
    };
    var anifn = Animation.prototype;
    extend(anifn, {
      instanceString: function instanceString() {
        return "animation";
      },
      hook: function hook() {
        var _p = this._private;
        if (!_p.hooked) {
          var q;
          var tAni = _p.target._private.animation;
          if (_p.queue) {
            q = tAni.queue;
          } else {
            q = tAni.current;
          }
          q.push(this);
          if (elementOrCollection(_p.target)) {
            _p.target.cy().addToAnimationPool(_p.target);
          }
          _p.hooked = true;
        }
        return this;
      },
      play: function play() {
        var _p = this._private;
        if (_p.progress === 1) {
          _p.progress = 0;
        }
        _p.playing = true;
        _p.started = false;
        _p.stopped = false;
        this.hook();
        return this;
      },
      playing: function playing() {
        return this._private.playing;
      },
      apply: function apply() {
        var _p = this._private;
        _p.applying = true;
        _p.started = false;
        _p.stopped = false;
        this.hook();
        return this;
      },
      applying: function applying() {
        return this._private.applying;
      },
      pause: function pause() {
        var _p = this._private;
        _p.playing = false;
        _p.started = false;
        return this;
      },
      stop: function stop() {
        var _p = this._private;
        _p.playing = false;
        _p.started = false;
        _p.stopped = true;
        return this;
      },
      rewind: function rewind() {
        return this.progress(0);
      },
      fastforward: function fastforward() {
        return this.progress(1);
      },
      time: function time(t) {
        var _p = this._private;
        if (t === void 0) {
          return _p.progress * _p.duration;
        } else {
          return this.progress(t / _p.duration);
        }
      },
      progress: function progress(p2) {
        var _p = this._private;
        var wasPlaying = _p.playing;
        if (p2 === void 0) {
          return _p.progress;
        } else {
          if (wasPlaying) {
            this.pause();
          }
          _p.progress = p2;
          _p.started = false;
          if (wasPlaying) {
            this.play();
          }
        }
        return this;
      },
      completed: function completed() {
        return this._private.progress === 1;
      },
      reverse: function reverse() {
        var _p = this._private;
        var wasPlaying = _p.playing;
        if (wasPlaying) {
          this.pause();
        }
        _p.progress = 1 - _p.progress;
        _p.started = false;
        var swap = function swap2(a, b) {
          var _pa = _p[a];
          if (_pa == null) {
            return;
          }
          _p[a] = _p[b];
          _p[b] = _pa;
        };
        swap("zoom", "startZoom");
        swap("pan", "startPan");
        swap("position", "startPosition");
        if (_p.style) {
          for (var i2 = 0; i2 < _p.style.length; i2++) {
            var prop = _p.style[i2];
            var name = prop.name;
            var startStyleProp = _p.startStyle[name];
            _p.startStyle[name] = prop;
            _p.style[i2] = startStyleProp;
          }
        }
        if (wasPlaying) {
          this.play();
        }
        return this;
      },
      promise: function promise2(type) {
        var _p = this._private;
        var arr;
        switch (type) {
          case "frame":
            arr = _p.frames;
            break;
          default:
          case "complete":
          case "completed":
            arr = _p.completes;
        }
        return new Promise$1(function(resolve2, reject) {
          arr.push(function() {
            resolve2();
          });
        });
      }
    });
    anifn.complete = anifn.completed;
    anifn.run = anifn.play;
    anifn.running = anifn.playing;
    var define$3 = {
      animated: function animated() {
        return function animatedImpl() {
          var self2 = this;
          var selfIsArrayLike = self2.length !== void 0;
          var all = selfIsArrayLike ? self2 : [self2];
          var cy = this._private.cy || this;
          if (!cy.styleEnabled()) {
            return false;
          }
          var ele = all[0];
          if (ele) {
            return ele._private.animation.current.length > 0;
          }
        };
      },
      // animated
      clearQueue: function clearQueue() {
        return function clearQueueImpl() {
          var self2 = this;
          var selfIsArrayLike = self2.length !== void 0;
          var all = selfIsArrayLike ? self2 : [self2];
          var cy = this._private.cy || this;
          if (!cy.styleEnabled()) {
            return this;
          }
          for (var i2 = 0; i2 < all.length; i2++) {
            var ele = all[i2];
            ele._private.animation.queue = [];
          }
          return this;
        };
      },
      // clearQueue
      delay: function delay() {
        return function delayImpl(time, complete) {
          var cy = this._private.cy || this;
          if (!cy.styleEnabled()) {
            return this;
          }
          return this.animate({
            delay: time,
            duration: time,
            complete
          });
        };
      },
      // delay
      delayAnimation: function delayAnimation() {
        return function delayAnimationImpl(time, complete) {
          var cy = this._private.cy || this;
          if (!cy.styleEnabled()) {
            return this;
          }
          return this.animation({
            delay: time,
            duration: time,
            complete
          });
        };
      },
      // delay
      animation: function animation() {
        return function animationImpl(properties, params) {
          var self2 = this;
          var selfIsArrayLike = self2.length !== void 0;
          var all = selfIsArrayLike ? self2 : [self2];
          var cy = this._private.cy || this;
          var isCore = !selfIsArrayLike;
          var isEles = !isCore;
          if (!cy.styleEnabled()) {
            return this;
          }
          var style = cy.style();
          properties = extend({}, properties, params);
          var propertiesEmpty = Object.keys(properties).length === 0;
          if (propertiesEmpty) {
            return new Animation(all[0], properties);
          }
          if (properties.duration === void 0) {
            properties.duration = 400;
          }
          switch (properties.duration) {
            case "slow":
              properties.duration = 600;
              break;
            case "fast":
              properties.duration = 200;
              break;
          }
          if (isEles) {
            properties.style = style.getPropsList(properties.style || properties.css);
            properties.css = void 0;
          }
          if (isEles && properties.renderedPosition != null) {
            var rpos = properties.renderedPosition;
            var pan = cy.pan();
            var zoom = cy.zoom();
            properties.position = renderedToModelPosition(rpos, zoom, pan);
          }
          if (isCore && properties.panBy != null) {
            var panBy = properties.panBy;
            var cyPan = cy.pan();
            properties.pan = {
              x: cyPan.x + panBy.x,
              y: cyPan.y + panBy.y
            };
          }
          var center = properties.center || properties.centre;
          if (isCore && center != null) {
            var centerPan = cy.getCenterPan(center.eles, properties.zoom);
            if (centerPan != null) {
              properties.pan = centerPan;
            }
          }
          if (isCore && properties.fit != null) {
            var fit = properties.fit;
            var fitVp = cy.getFitViewport(fit.eles || fit.boundingBox, fit.padding);
            if (fitVp != null) {
              properties.pan = fitVp.pan;
              properties.zoom = fitVp.zoom;
            }
          }
          if (isCore && plainObject(properties.zoom)) {
            var vp = cy.getZoomedViewport(properties.zoom);
            if (vp != null) {
              if (vp.zoomed) {
                properties.zoom = vp.zoom;
              }
              if (vp.panned) {
                properties.pan = vp.pan;
              }
            } else {
              properties.zoom = null;
            }
          }
          return new Animation(all[0], properties);
        };
      },
      // animate
      animate: function animate() {
        return function animateImpl(properties, params) {
          var self2 = this;
          var selfIsArrayLike = self2.length !== void 0;
          var all = selfIsArrayLike ? self2 : [self2];
          var cy = this._private.cy || this;
          if (!cy.styleEnabled()) {
            return this;
          }
          if (params) {
            properties = extend({}, properties, params);
          }
          for (var i2 = 0; i2 < all.length; i2++) {
            var ele = all[i2];
            var queue = ele.animated() && (properties.queue === void 0 || properties.queue);
            var ani = ele.animation(properties, queue ? {
              queue: true
            } : void 0);
            ani.play();
          }
          return this;
        };
      },
      // animate
      stop: function stop() {
        return function stopImpl(clearQueue, jumpToEnd) {
          var self2 = this;
          var selfIsArrayLike = self2.length !== void 0;
          var all = selfIsArrayLike ? self2 : [self2];
          var cy = this._private.cy || this;
          if (!cy.styleEnabled()) {
            return this;
          }
          for (var i2 = 0; i2 < all.length; i2++) {
            var ele = all[i2];
            var _p = ele._private;
            var anis = _p.animation.current;
            for (var j = 0; j < anis.length; j++) {
              var ani = anis[j];
              var ani_p = ani._private;
              if (jumpToEnd) {
                ani_p.duration = 0;
              }
            }
            if (clearQueue) {
              _p.animation.queue = [];
            }
            if (!jumpToEnd) {
              _p.animation.current = [];
            }
          }
          cy.notify("draw");
          return this;
        };
      }
      // stop
    };
    var define$2 = {
      // access data field
      data: function data2(params) {
        var defaults2 = {
          field: "data",
          bindingEvent: "data",
          allowBinding: false,
          allowSetting: false,
          allowGetting: false,
          settingEvent: "data",
          settingTriggersEvent: false,
          triggerFnName: "trigger",
          immutableKeys: {},
          // key => true if immutable
          updateStyle: false,
          beforeGet: function beforeGet(self2) {
          },
          beforeSet: function beforeSet(self2, obj) {
          },
          onSet: function onSet(self2) {
          },
          canSet: function canSet(self2) {
            return true;
          }
        };
        params = extend({}, defaults2, params);
        return function dataImpl(name, value) {
          var p2 = params;
          var self2 = this;
          var selfIsArrayLike = self2.length !== void 0;
          var all = selfIsArrayLike ? self2 : [self2];
          var single = selfIsArrayLike ? self2[0] : self2;
          if (string(name)) {
            var isPathLike = name.indexOf(".") !== -1;
            var path = isPathLike && toPath__default["default"](name);
            if (p2.allowGetting && value === void 0) {
              var ret;
              if (single) {
                p2.beforeGet(single);
                if (path && single._private[p2.field][name] === void 0) {
                  ret = get__default["default"](single._private[p2.field], path);
                } else {
                  ret = single._private[p2.field][name];
                }
              }
              return ret;
            } else if (p2.allowSetting && value !== void 0) {
              var valid2 = !p2.immutableKeys[name];
              if (valid2) {
                var change = _defineProperty({}, name, value);
                p2.beforeSet(self2, change);
                for (var i2 = 0, l = all.length; i2 < l; i2++) {
                  var ele = all[i2];
                  if (p2.canSet(ele)) {
                    if (path && single._private[p2.field][name] === void 0) {
                      set__default["default"](ele._private[p2.field], path, value);
                    } else {
                      ele._private[p2.field][name] = value;
                    }
                  }
                }
                if (p2.updateStyle) {
                  self2.updateStyle();
                }
                p2.onSet(self2);
                if (p2.settingTriggersEvent) {
                  self2[p2.triggerFnName](p2.settingEvent);
                }
              }
            }
          } else if (p2.allowSetting && plainObject(name)) {
            var obj = name;
            var k, v;
            var keys = Object.keys(obj);
            p2.beforeSet(self2, obj);
            for (var _i = 0; _i < keys.length; _i++) {
              k = keys[_i];
              v = obj[k];
              var _valid = !p2.immutableKeys[k];
              if (_valid) {
                for (var j = 0; j < all.length; j++) {
                  var _ele = all[j];
                  if (p2.canSet(_ele)) {
                    _ele._private[p2.field][k] = v;
                  }
                }
              }
            }
            if (p2.updateStyle) {
              self2.updateStyle();
            }
            p2.onSet(self2);
            if (p2.settingTriggersEvent) {
              self2[p2.triggerFnName](p2.settingEvent);
            }
          } else if (p2.allowBinding && fn$6(name)) {
            var fn2 = name;
            self2.on(p2.bindingEvent, fn2);
          } else if (p2.allowGetting && name === void 0) {
            var _ret;
            if (single) {
              p2.beforeGet(single);
              _ret = single._private[p2.field];
            }
            return _ret;
          }
          return self2;
        };
      },
      // data
      // remove data field
      removeData: function removeData(params) {
        var defaults2 = {
          field: "data",
          event: "data",
          triggerFnName: "trigger",
          triggerEvent: false,
          immutableKeys: {}
          // key => true if immutable
        };
        params = extend({}, defaults2, params);
        return function removeDataImpl(names) {
          var p2 = params;
          var self2 = this;
          var selfIsArrayLike = self2.length !== void 0;
          var all = selfIsArrayLike ? self2 : [self2];
          if (string(names)) {
            var keys = names.split(/\s+/);
            var l = keys.length;
            for (var i2 = 0; i2 < l; i2++) {
              var key = keys[i2];
              if (emptyString(key)) {
                continue;
              }
              var valid2 = !p2.immutableKeys[key];
              if (valid2) {
                for (var i_a = 0, l_a = all.length; i_a < l_a; i_a++) {
                  all[i_a]._private[p2.field][key] = void 0;
                }
              }
            }
            if (p2.triggerEvent) {
              self2[p2.triggerFnName](p2.event);
            }
          } else if (names === void 0) {
            for (var _i_a = 0, _l_a = all.length; _i_a < _l_a; _i_a++) {
              var _privateFields = all[_i_a]._private[p2.field];
              var _keys = Object.keys(_privateFields);
              for (var _i2 = 0; _i2 < _keys.length; _i2++) {
                var _key = _keys[_i2];
                var validKeyToDelete = !p2.immutableKeys[_key];
                if (validKeyToDelete) {
                  _privateFields[_key] = void 0;
                }
              }
            }
            if (p2.triggerEvent) {
              self2[p2.triggerFnName](p2.event);
            }
          }
          return self2;
        };
      }
      // removeData
    };
    var define$1 = {
      eventAliasesOn: function eventAliasesOn(proto) {
        var p2 = proto;
        p2.addListener = p2.listen = p2.bind = p2.on;
        p2.unlisten = p2.unbind = p2.off = p2.removeListener;
        p2.trigger = p2.emit;
        p2.pon = p2.promiseOn = function(events, selector) {
          var self2 = this;
          var args = Array.prototype.slice.call(arguments, 0);
          return new Promise$1(function(resolve2, reject) {
            var callback = function callback2(e) {
              self2.off.apply(self2, offArgs);
              resolve2(e);
            };
            var onArgs = args.concat([callback]);
            var offArgs = onArgs.concat([]);
            self2.on.apply(self2, onArgs);
          });
        };
      }
    };
    var define2 = {};
    [define$3, define$2, define$1].forEach(function(m) {
      extend(define2, m);
    });
    var elesfn$i = {
      animate: define2.animate(),
      animation: define2.animation(),
      animated: define2.animated(),
      clearQueue: define2.clearQueue(),
      delay: define2.delay(),
      delayAnimation: define2.delayAnimation(),
      stop: define2.stop()
    };
    var elesfn$h = {
      classes: function classes(_classes) {
        var self2 = this;
        if (_classes === void 0) {
          var ret = [];
          self2[0]._private.classes.forEach(function(cls2) {
            return ret.push(cls2);
          });
          return ret;
        } else if (!array(_classes)) {
          _classes = (_classes || "").match(/\S+/g) || [];
        }
        var changed = [];
        var classesSet = new Set$1(_classes);
        for (var j = 0; j < self2.length; j++) {
          var ele = self2[j];
          var _p = ele._private;
          var eleClasses = _p.classes;
          var changedEle = false;
          for (var i2 = 0; i2 < _classes.length; i2++) {
            var cls = _classes[i2];
            var eleHasClass = eleClasses.has(cls);
            if (!eleHasClass) {
              changedEle = true;
              break;
            }
          }
          if (!changedEle) {
            changedEle = eleClasses.size !== _classes.length;
          }
          if (changedEle) {
            _p.classes = classesSet;
            changed.push(ele);
          }
        }
        if (changed.length > 0) {
          this.spawn(changed).updateStyle().emit("class");
        }
        return self2;
      },
      addClass: function addClass(classes) {
        return this.toggleClass(classes, true);
      },
      hasClass: function hasClass(className) {
        var ele = this[0];
        return ele != null && ele._private.classes.has(className);
      },
      toggleClass: function toggleClass(classes, toggle) {
        if (!array(classes)) {
          classes = classes.match(/\S+/g) || [];
        }
        var self2 = this;
        var toggleUndefd = toggle === void 0;
        var changed = [];
        for (var i2 = 0, il = self2.length; i2 < il; i2++) {
          var ele = self2[i2];
          var eleClasses = ele._private.classes;
          var changedEle = false;
          for (var j = 0; j < classes.length; j++) {
            var cls = classes[j];
            var hasClass = eleClasses.has(cls);
            var changedNow = false;
            if (toggle || toggleUndefd && !hasClass) {
              eleClasses.add(cls);
              changedNow = true;
            } else if (!toggle || toggleUndefd && hasClass) {
              eleClasses["delete"](cls);
              changedNow = true;
            }
            if (!changedEle && changedNow) {
              changed.push(ele);
              changedEle = true;
            }
          }
        }
        if (changed.length > 0) {
          this.spawn(changed).updateStyle().emit("class");
        }
        return self2;
      },
      removeClass: function removeClass(classes) {
        return this.toggleClass(classes, false);
      },
      flashClass: function flashClass(classes, duration) {
        var self2 = this;
        if (duration == null) {
          duration = 250;
        } else if (duration === 0) {
          return self2;
        }
        self2.addClass(classes);
        setTimeout(function() {
          self2.removeClass(classes);
        }, duration);
        return self2;
      }
    };
    elesfn$h.className = elesfn$h.classNames = elesfn$h.classes;
    var tokens = {
      metaChar: "[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",
      // chars we need to escape in let names, etc
      comparatorOp: "=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",
      // binary comparison op (used in data selectors)
      boolOp: "\\?|\\!|\\^",
      // boolean (unary) operators (used in data selectors)
      string: `"(?:\\\\"|[^"])*"|'(?:\\\\'|[^'])*'`,
      // string literals (used in data selectors) -- doublequotes | singlequotes
      number,
      // number literal (used in data selectors) --- e.g. 0.1234, 1234, 12e123
      meta: "degree|indegree|outdegree",
      // allowed metadata fields (i.e. allowed functions to use from Collection)
      separator: "\\s*,\\s*",
      // queries are separated by commas, e.g. edge[foo = 'bar'], node.someClass
      descendant: "\\s+",
      child: "\\s+>\\s+",
      subject: "\\$",
      group: "node|edge|\\*",
      directedEdge: "\\s+->\\s+",
      undirectedEdge: "\\s+<->\\s+"
    };
    tokens.variable = "(?:[\\w-.]|(?:\\\\" + tokens.metaChar + "))+";
    tokens.className = "(?:[\\w-]|(?:\\\\" + tokens.metaChar + "))+";
    tokens.value = tokens.string + "|" + tokens.number;
    tokens.id = tokens.variable;
    (function() {
      var ops, op, i2;
      ops = tokens.comparatorOp.split("|");
      for (i2 = 0; i2 < ops.length; i2++) {
        op = ops[i2];
        tokens.comparatorOp += "|@" + op;
      }
      ops = tokens.comparatorOp.split("|");
      for (i2 = 0; i2 < ops.length; i2++) {
        op = ops[i2];
        if (op.indexOf("!") >= 0) {
          continue;
        }
        if (op === "=") {
          continue;
        }
        tokens.comparatorOp += "|\\!" + op;
      }
    })();
    var newQuery = function newQuery2() {
      return {
        checks: []
      };
    };
    var Type = {
      /** E.g. node */
      GROUP: 0,
      /** A collection of elements */
      COLLECTION: 1,
      /** A filter(ele) function */
      FILTER: 2,
      /** E.g. [foo > 1] */
      DATA_COMPARE: 3,
      /** E.g. [foo] */
      DATA_EXIST: 4,
      /** E.g. [?foo] */
      DATA_BOOL: 5,
      /** E.g. [[degree > 2]] */
      META_COMPARE: 6,
      /** E.g. :selected */
      STATE: 7,
      /** E.g. #foo */
      ID: 8,
      /** E.g. .foo */
      CLASS: 9,
      /** E.g. #foo <-> #bar */
      UNDIRECTED_EDGE: 10,
      /** E.g. #foo -> #bar */
      DIRECTED_EDGE: 11,
      /** E.g. $#foo -> #bar */
      NODE_SOURCE: 12,
      /** E.g. #foo -> $#bar */
      NODE_TARGET: 13,
      /** E.g. $#foo <-> #bar */
      NODE_NEIGHBOR: 14,
      /** E.g. #foo > #bar */
      CHILD: 15,
      /** E.g. #foo #bar */
      DESCENDANT: 16,
      /** E.g. $#foo > #bar */
      PARENT: 17,
      /** E.g. $#foo #bar */
      ANCESTOR: 18,
      /** E.g. #foo > $bar > #baz */
      COMPOUND_SPLIT: 19,
      /** Always matches, useful placeholder for subject in `COMPOUND_SPLIT` */
      TRUE: 20
    };
    var stateSelectors = [{
      selector: ":selected",
      matches: function matches2(ele) {
        return ele.selected();
      }
    }, {
      selector: ":unselected",
      matches: function matches2(ele) {
        return !ele.selected();
      }
    }, {
      selector: ":selectable",
      matches: function matches2(ele) {
        return ele.selectable();
      }
    }, {
      selector: ":unselectable",
      matches: function matches2(ele) {
        return !ele.selectable();
      }
    }, {
      selector: ":locked",
      matches: function matches2(ele) {
        return ele.locked();
      }
    }, {
      selector: ":unlocked",
      matches: function matches2(ele) {
        return !ele.locked();
      }
    }, {
      selector: ":visible",
      matches: function matches2(ele) {
        return ele.visible();
      }
    }, {
      selector: ":hidden",
      matches: function matches2(ele) {
        return !ele.visible();
      }
    }, {
      selector: ":transparent",
      matches: function matches2(ele) {
        return ele.transparent();
      }
    }, {
      selector: ":grabbed",
      matches: function matches2(ele) {
        return ele.grabbed();
      }
    }, {
      selector: ":free",
      matches: function matches2(ele) {
        return !ele.grabbed();
      }
    }, {
      selector: ":removed",
      matches: function matches2(ele) {
        return ele.removed();
      }
    }, {
      selector: ":inside",
      matches: function matches2(ele) {
        return !ele.removed();
      }
    }, {
      selector: ":grabbable",
      matches: function matches2(ele) {
        return ele.grabbable();
      }
    }, {
      selector: ":ungrabbable",
      matches: function matches2(ele) {
        return !ele.grabbable();
      }
    }, {
      selector: ":animated",
      matches: function matches2(ele) {
        return ele.animated();
      }
    }, {
      selector: ":unanimated",
      matches: function matches2(ele) {
        return !ele.animated();
      }
    }, {
      selector: ":parent",
      matches: function matches2(ele) {
        return ele.isParent();
      }
    }, {
      selector: ":childless",
      matches: function matches2(ele) {
        return ele.isChildless();
      }
    }, {
      selector: ":child",
      matches: function matches2(ele) {
        return ele.isChild();
      }
    }, {
      selector: ":orphan",
      matches: function matches2(ele) {
        return ele.isOrphan();
      }
    }, {
      selector: ":nonorphan",
      matches: function matches2(ele) {
        return ele.isChild();
      }
    }, {
      selector: ":compound",
      matches: function matches2(ele) {
        if (ele.isNode()) {
          return ele.isParent();
        } else {
          return ele.source().isParent() || ele.target().isParent();
        }
      }
    }, {
      selector: ":loop",
      matches: function matches2(ele) {
        return ele.isLoop();
      }
    }, {
      selector: ":simple",
      matches: function matches2(ele) {
        return ele.isSimple();
      }
    }, {
      selector: ":active",
      matches: function matches2(ele) {
        return ele.active();
      }
    }, {
      selector: ":inactive",
      matches: function matches2(ele) {
        return !ele.active();
      }
    }, {
      selector: ":backgrounding",
      matches: function matches2(ele) {
        return ele.backgrounding();
      }
    }, {
      selector: ":nonbackgrounding",
      matches: function matches2(ele) {
        return !ele.backgrounding();
      }
    }].sort(function(a, b) {
      return descending(a.selector, b.selector);
    });
    var lookup = function() {
      var selToFn = {};
      var s;
      for (var i2 = 0; i2 < stateSelectors.length; i2++) {
        s = stateSelectors[i2];
        selToFn[s.selector] = s.matches;
      }
      return selToFn;
    }();
    var stateSelectorMatches = function stateSelectorMatches2(sel, ele) {
      return lookup[sel](ele);
    };
    var stateSelectorRegex = "(" + stateSelectors.map(function(s) {
      return s.selector;
    }).join("|") + ")";
    var cleanMetaChars = function cleanMetaChars2(str) {
      return str.replace(new RegExp("\\\\(" + tokens.metaChar + ")", "g"), function(match2, $1) {
        return $1;
      });
    };
    var replaceLastQuery = function replaceLastQuery2(selector, examiningQuery, replacementQuery) {
      selector[selector.length - 1] = replacementQuery;
    };
    var exprs = [{
      name: "group",
      // just used for identifying when debugging
      query: true,
      regex: "(" + tokens.group + ")",
      populate: function populate(selector, query, _ref) {
        var _ref2 = _slicedToArray(_ref, 1), group = _ref2[0];
        query.checks.push({
          type: Type.GROUP,
          value: group === "*" ? group : group + "s"
        });
      }
    }, {
      name: "state",
      query: true,
      regex: stateSelectorRegex,
      populate: function populate(selector, query, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 1), state = _ref4[0];
        query.checks.push({
          type: Type.STATE,
          value: state
        });
      }
    }, {
      name: "id",
      query: true,
      regex: "\\#(" + tokens.id + ")",
      populate: function populate(selector, query, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 1), id = _ref6[0];
        query.checks.push({
          type: Type.ID,
          value: cleanMetaChars(id)
        });
      }
    }, {
      name: "className",
      query: true,
      regex: "\\.(" + tokens.className + ")",
      populate: function populate(selector, query, _ref7) {
        var _ref8 = _slicedToArray(_ref7, 1), className = _ref8[0];
        query.checks.push({
          type: Type.CLASS,
          value: cleanMetaChars(className)
        });
      }
    }, {
      name: "dataExists",
      query: true,
      regex: "\\[\\s*(" + tokens.variable + ")\\s*\\]",
      populate: function populate(selector, query, _ref9) {
        var _ref10 = _slicedToArray(_ref9, 1), variable = _ref10[0];
        query.checks.push({
          type: Type.DATA_EXIST,
          field: cleanMetaChars(variable)
        });
      }
    }, {
      name: "dataCompare",
      query: true,
      regex: "\\[\\s*(" + tokens.variable + ")\\s*(" + tokens.comparatorOp + ")\\s*(" + tokens.value + ")\\s*\\]",
      populate: function populate(selector, query, _ref11) {
        var _ref12 = _slicedToArray(_ref11, 3), variable = _ref12[0], comparatorOp = _ref12[1], value = _ref12[2];
        var valueIsString = new RegExp("^" + tokens.string + "$").exec(value) != null;
        if (valueIsString) {
          value = value.substring(1, value.length - 1);
        } else {
          value = parseFloat(value);
        }
        query.checks.push({
          type: Type.DATA_COMPARE,
          field: cleanMetaChars(variable),
          operator: comparatorOp,
          value
        });
      }
    }, {
      name: "dataBool",
      query: true,
      regex: "\\[\\s*(" + tokens.boolOp + ")\\s*(" + tokens.variable + ")\\s*\\]",
      populate: function populate(selector, query, _ref13) {
        var _ref14 = _slicedToArray(_ref13, 2), boolOp = _ref14[0], variable = _ref14[1];
        query.checks.push({
          type: Type.DATA_BOOL,
          field: cleanMetaChars(variable),
          operator: boolOp
        });
      }
    }, {
      name: "metaCompare",
      query: true,
      regex: "\\[\\[\\s*(" + tokens.meta + ")\\s*(" + tokens.comparatorOp + ")\\s*(" + tokens.number + ")\\s*\\]\\]",
      populate: function populate(selector, query, _ref15) {
        var _ref16 = _slicedToArray(_ref15, 3), meta2 = _ref16[0], comparatorOp = _ref16[1], number2 = _ref16[2];
        query.checks.push({
          type: Type.META_COMPARE,
          field: cleanMetaChars(meta2),
          operator: comparatorOp,
          value: parseFloat(number2)
        });
      }
    }, {
      name: "nextQuery",
      separator: true,
      regex: tokens.separator,
      populate: function populate(selector, query) {
        var currentSubject = selector.currentSubject;
        var edgeCount = selector.edgeCount;
        var compoundCount = selector.compoundCount;
        var lastQ = selector[selector.length - 1];
        if (currentSubject != null) {
          lastQ.subject = currentSubject;
          selector.currentSubject = null;
        }
        lastQ.edgeCount = edgeCount;
        lastQ.compoundCount = compoundCount;
        selector.edgeCount = 0;
        selector.compoundCount = 0;
        var nextQuery = selector[selector.length++] = newQuery();
        return nextQuery;
      }
    }, {
      name: "directedEdge",
      separator: true,
      regex: tokens.directedEdge,
      populate: function populate(selector, query) {
        if (selector.currentSubject == null) {
          var edgeQuery = newQuery();
          var source = query;
          var target = newQuery();
          edgeQuery.checks.push({
            type: Type.DIRECTED_EDGE,
            source,
            target
          });
          replaceLastQuery(selector, query, edgeQuery);
          selector.edgeCount++;
          return target;
        } else {
          var srcTgtQ = newQuery();
          var _source = query;
          var _target = newQuery();
          srcTgtQ.checks.push({
            type: Type.NODE_SOURCE,
            source: _source,
            target: _target
          });
          replaceLastQuery(selector, query, srcTgtQ);
          selector.edgeCount++;
          return _target;
        }
      }
    }, {
      name: "undirectedEdge",
      separator: true,
      regex: tokens.undirectedEdge,
      populate: function populate(selector, query) {
        if (selector.currentSubject == null) {
          var edgeQuery = newQuery();
          var source = query;
          var target = newQuery();
          edgeQuery.checks.push({
            type: Type.UNDIRECTED_EDGE,
            nodes: [source, target]
          });
          replaceLastQuery(selector, query, edgeQuery);
          selector.edgeCount++;
          return target;
        } else {
          var nhoodQ = newQuery();
          var node = query;
          var neighbor = newQuery();
          nhoodQ.checks.push({
            type: Type.NODE_NEIGHBOR,
            node,
            neighbor
          });
          replaceLastQuery(selector, query, nhoodQ);
          return neighbor;
        }
      }
    }, {
      name: "child",
      separator: true,
      regex: tokens.child,
      populate: function populate(selector, query) {
        if (selector.currentSubject == null) {
          var parentChildQuery = newQuery();
          var child = newQuery();
          var parent = selector[selector.length - 1];
          parentChildQuery.checks.push({
            type: Type.CHILD,
            parent,
            child
          });
          replaceLastQuery(selector, query, parentChildQuery);
          selector.compoundCount++;
          return child;
        } else if (selector.currentSubject === query) {
          var compound = newQuery();
          var left = selector[selector.length - 1];
          var right = newQuery();
          var subject = newQuery();
          var _child = newQuery();
          var _parent = newQuery();
          compound.checks.push({
            type: Type.COMPOUND_SPLIT,
            left,
            right,
            subject
          });
          subject.checks = query.checks;
          query.checks = [{
            type: Type.TRUE
          }];
          _parent.checks.push({
            type: Type.TRUE
          });
          right.checks.push({
            type: Type.PARENT,
            // type is swapped on right side queries
            parent: _parent,
            child: _child
            // empty for now
          });
          replaceLastQuery(selector, left, compound);
          selector.currentSubject = subject;
          selector.compoundCount++;
          return _child;
        } else {
          var _parent2 = newQuery();
          var _child2 = newQuery();
          var pcQChecks = [{
            type: Type.PARENT,
            parent: _parent2,
            child: _child2
          }];
          _parent2.checks = query.checks;
          query.checks = pcQChecks;
          selector.compoundCount++;
          return _child2;
        }
      }
    }, {
      name: "descendant",
      separator: true,
      regex: tokens.descendant,
      populate: function populate(selector, query) {
        if (selector.currentSubject == null) {
          var ancChQuery = newQuery();
          var descendant = newQuery();
          var ancestor = selector[selector.length - 1];
          ancChQuery.checks.push({
            type: Type.DESCENDANT,
            ancestor,
            descendant
          });
          replaceLastQuery(selector, query, ancChQuery);
          selector.compoundCount++;
          return descendant;
        } else if (selector.currentSubject === query) {
          var compound = newQuery();
          var left = selector[selector.length - 1];
          var right = newQuery();
          var subject = newQuery();
          var _descendant = newQuery();
          var _ancestor = newQuery();
          compound.checks.push({
            type: Type.COMPOUND_SPLIT,
            left,
            right,
            subject
          });
          subject.checks = query.checks;
          query.checks = [{
            type: Type.TRUE
          }];
          _ancestor.checks.push({
            type: Type.TRUE
          });
          right.checks.push({
            type: Type.ANCESTOR,
            // type is swapped on right side queries
            ancestor: _ancestor,
            descendant: _descendant
            // empty for now
          });
          replaceLastQuery(selector, left, compound);
          selector.currentSubject = subject;
          selector.compoundCount++;
          return _descendant;
        } else {
          var _ancestor2 = newQuery();
          var _descendant2 = newQuery();
          var adQChecks = [{
            type: Type.ANCESTOR,
            ancestor: _ancestor2,
            descendant: _descendant2
          }];
          _ancestor2.checks = query.checks;
          query.checks = adQChecks;
          selector.compoundCount++;
          return _descendant2;
        }
      }
    }, {
      name: "subject",
      modifier: true,
      regex: tokens.subject,
      populate: function populate(selector, query) {
        if (selector.currentSubject != null && selector.currentSubject !== query) {
          warn("Redefinition of subject in selector `" + selector.toString() + "`");
          return false;
        }
        selector.currentSubject = query;
        var topQ = selector[selector.length - 1];
        var topChk = topQ.checks[0];
        var topType = topChk == null ? null : topChk.type;
        if (topType === Type.DIRECTED_EDGE) {
          topChk.type = Type.NODE_TARGET;
        } else if (topType === Type.UNDIRECTED_EDGE) {
          topChk.type = Type.NODE_NEIGHBOR;
          topChk.node = topChk.nodes[1];
          topChk.neighbor = topChk.nodes[0];
          topChk.nodes = null;
        }
      }
    }];
    exprs.forEach(function(e) {
      return e.regexObj = new RegExp("^" + e.regex);
    });
    var consumeExpr = function consumeExpr2(remaining) {
      var expr;
      var match2;
      var name;
      for (var j = 0; j < exprs.length; j++) {
        var e = exprs[j];
        var n = e.name;
        var m = remaining.match(e.regexObj);
        if (m != null) {
          match2 = m;
          expr = e;
          name = n;
          var consumed = m[0];
          remaining = remaining.substring(consumed.length);
          break;
        }
      }
      return {
        expr,
        match: match2,
        name,
        remaining
      };
    };
    var consumeWhitespace = function consumeWhitespace2(remaining) {
      var match2 = remaining.match(/^\s+/);
      if (match2) {
        var consumed = match2[0];
        remaining = remaining.substring(consumed.length);
      }
      return remaining;
    };
    var parse = function parse2(selector) {
      var self2 = this;
      var remaining = self2.inputText = selector;
      var currentQuery = self2[0] = newQuery();
      self2.length = 1;
      remaining = consumeWhitespace(remaining);
      for (; ; ) {
        var exprInfo = consumeExpr(remaining);
        if (exprInfo.expr == null) {
          warn("The selector `" + selector + "`is invalid");
          return false;
        } else {
          var args = exprInfo.match.slice(1);
          var ret = exprInfo.expr.populate(self2, currentQuery, args);
          if (ret === false) {
            return false;
          } else if (ret != null) {
            currentQuery = ret;
          }
        }
        remaining = exprInfo.remaining;
        if (remaining.match(/^\s*$/)) {
          break;
        }
      }
      var lastQ = self2[self2.length - 1];
      if (self2.currentSubject != null) {
        lastQ.subject = self2.currentSubject;
      }
      lastQ.edgeCount = self2.edgeCount;
      lastQ.compoundCount = self2.compoundCount;
      for (var i2 = 0; i2 < self2.length; i2++) {
        var q = self2[i2];
        if (q.compoundCount > 0 && q.edgeCount > 0) {
          warn("The selector `" + selector + "` is invalid because it uses both a compound selector and an edge selector");
          return false;
        }
        if (q.edgeCount > 1) {
          warn("The selector `" + selector + "` is invalid because it uses multiple edge selectors");
          return false;
        } else if (q.edgeCount === 1) {
          warn("The selector `" + selector + "` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes.");
        }
      }
      return true;
    };
    var toString = function toString2() {
      if (this.toStringCache != null) {
        return this.toStringCache;
      }
      var clean = function clean2(obj) {
        if (obj == null) {
          return "";
        } else {
          return obj;
        }
      };
      var cleanVal = function cleanVal2(val) {
        if (string(val)) {
          return '"' + val + '"';
        } else {
          return clean(val);
        }
      };
      var space = function space2(val) {
        return " " + val + " ";
      };
      var checkToString = function checkToString2(check, subject) {
        var type = check.type, value = check.value;
        switch (type) {
          case Type.GROUP: {
            var group = clean(value);
            return group.substring(0, group.length - 1);
          }
          case Type.DATA_COMPARE: {
            var field = check.field, operator = check.operator;
            return "[" + field + space(clean(operator)) + cleanVal(value) + "]";
          }
          case Type.DATA_BOOL: {
            var _operator = check.operator, _field = check.field;
            return "[" + clean(_operator) + _field + "]";
          }
          case Type.DATA_EXIST: {
            var _field2 = check.field;
            return "[" + _field2 + "]";
          }
          case Type.META_COMPARE: {
            var _operator2 = check.operator, _field3 = check.field;
            return "[[" + _field3 + space(clean(_operator2)) + cleanVal(value) + "]]";
          }
          case Type.STATE: {
            return value;
          }
          case Type.ID: {
            return "#" + value;
          }
          case Type.CLASS: {
            return "." + value;
          }
          case Type.PARENT:
          case Type.CHILD: {
            return queryToString(check.parent, subject) + space(">") + queryToString(check.child, subject);
          }
          case Type.ANCESTOR:
          case Type.DESCENDANT: {
            return queryToString(check.ancestor, subject) + " " + queryToString(check.descendant, subject);
          }
          case Type.COMPOUND_SPLIT: {
            var lhs = queryToString(check.left, subject);
            var sub = queryToString(check.subject, subject);
            var rhs = queryToString(check.right, subject);
            return lhs + (lhs.length > 0 ? " " : "") + sub + rhs;
          }
          case Type.TRUE: {
            return "";
          }
        }
      };
      var queryToString = function queryToString2(query2, subject) {
        return query2.checks.reduce(function(str2, chk, i3) {
          return str2 + (subject === query2 && i3 === 0 ? "$" : "") + checkToString(chk, subject);
        }, "");
      };
      var str = "";
      for (var i2 = 0; i2 < this.length; i2++) {
        var query = this[i2];
        str += queryToString(query, query.subject);
        if (this.length > 1 && i2 < this.length - 1) {
          str += ", ";
        }
      }
      this.toStringCache = str;
      return str;
    };
    var parse$1 = {
      parse,
      toString
    };
    var valCmp = function valCmp2(fieldVal, operator, value) {
      var matches2;
      var isFieldStr = string(fieldVal);
      var isFieldNum = number$1(fieldVal);
      var isValStr = string(value);
      var fieldStr, valStr;
      var caseInsensitive = false;
      var notExpr = false;
      var isIneqCmp = false;
      if (operator.indexOf("!") >= 0) {
        operator = operator.replace("!", "");
        notExpr = true;
      }
      if (operator.indexOf("@") >= 0) {
        operator = operator.replace("@", "");
        caseInsensitive = true;
      }
      if (isFieldStr || isValStr || caseInsensitive) {
        fieldStr = !isFieldStr && !isFieldNum ? "" : "" + fieldVal;
        valStr = "" + value;
      }
      if (caseInsensitive) {
        fieldVal = fieldStr = fieldStr.toLowerCase();
        value = valStr = valStr.toLowerCase();
      }
      switch (operator) {
        case "*=":
          matches2 = fieldStr.indexOf(valStr) >= 0;
          break;
        case "$=":
          matches2 = fieldStr.indexOf(valStr, fieldStr.length - valStr.length) >= 0;
          break;
        case "^=":
          matches2 = fieldStr.indexOf(valStr) === 0;
          break;
        case "=":
          matches2 = fieldVal === value;
          break;
        case ">":
          isIneqCmp = true;
          matches2 = fieldVal > value;
          break;
        case ">=":
          isIneqCmp = true;
          matches2 = fieldVal >= value;
          break;
        case "<":
          isIneqCmp = true;
          matches2 = fieldVal < value;
          break;
        case "<=":
          isIneqCmp = true;
          matches2 = fieldVal <= value;
          break;
        default:
          matches2 = false;
          break;
      }
      if (notExpr && (fieldVal != null || !isIneqCmp)) {
        matches2 = !matches2;
      }
      return matches2;
    };
    var boolCmp = function boolCmp2(fieldVal, operator) {
      switch (operator) {
        case "?":
          return fieldVal ? true : false;
        case "!":
          return fieldVal ? false : true;
        case "^":
          return fieldVal === void 0;
      }
    };
    var existCmp = function existCmp2(fieldVal) {
      return fieldVal !== void 0;
    };
    var data$1 = function data2(ele, field) {
      return ele.data(field);
    };
    var meta = function meta2(ele, field) {
      return ele[field]();
    };
    var match = [];
    var matches$1 = function matches2(query, ele) {
      return query.checks.every(function(chk) {
        return match[chk.type](chk, ele);
      });
    };
    match[Type.GROUP] = function(check, ele) {
      var group = check.value;
      return group === "*" || group === ele.group();
    };
    match[Type.STATE] = function(check, ele) {
      var stateSelector = check.value;
      return stateSelectorMatches(stateSelector, ele);
    };
    match[Type.ID] = function(check, ele) {
      var id = check.value;
      return ele.id() === id;
    };
    match[Type.CLASS] = function(check, ele) {
      var cls = check.value;
      return ele.hasClass(cls);
    };
    match[Type.META_COMPARE] = function(check, ele) {
      var field = check.field, operator = check.operator, value = check.value;
      return valCmp(meta(ele, field), operator, value);
    };
    match[Type.DATA_COMPARE] = function(check, ele) {
      var field = check.field, operator = check.operator, value = check.value;
      return valCmp(data$1(ele, field), operator, value);
    };
    match[Type.DATA_BOOL] = function(check, ele) {
      var field = check.field, operator = check.operator;
      return boolCmp(data$1(ele, field), operator);
    };
    match[Type.DATA_EXIST] = function(check, ele) {
      var field = check.field;
      check.operator;
      return existCmp(data$1(ele, field));
    };
    match[Type.UNDIRECTED_EDGE] = function(check, ele) {
      var qA = check.nodes[0];
      var qB = check.nodes[1];
      var src = ele.source();
      var tgt = ele.target();
      return matches$1(qA, src) && matches$1(qB, tgt) || matches$1(qB, src) && matches$1(qA, tgt);
    };
    match[Type.NODE_NEIGHBOR] = function(check, ele) {
      return matches$1(check.node, ele) && ele.neighborhood().some(function(n) {
        return n.isNode() && matches$1(check.neighbor, n);
      });
    };
    match[Type.DIRECTED_EDGE] = function(check, ele) {
      return matches$1(check.source, ele.source()) && matches$1(check.target, ele.target());
    };
    match[Type.NODE_SOURCE] = function(check, ele) {
      return matches$1(check.source, ele) && ele.outgoers().some(function(n) {
        return n.isNode() && matches$1(check.target, n);
      });
    };
    match[Type.NODE_TARGET] = function(check, ele) {
      return matches$1(check.target, ele) && ele.incomers().some(function(n) {
        return n.isNode() && matches$1(check.source, n);
      });
    };
    match[Type.CHILD] = function(check, ele) {
      return matches$1(check.child, ele) && matches$1(check.parent, ele.parent());
    };
    match[Type.PARENT] = function(check, ele) {
      return matches$1(check.parent, ele) && ele.children().some(function(c) {
        return matches$1(check.child, c);
      });
    };
    match[Type.DESCENDANT] = function(check, ele) {
      return matches$1(check.descendant, ele) && ele.ancestors().some(function(a) {
        return matches$1(check.ancestor, a);
      });
    };
    match[Type.ANCESTOR] = function(check, ele) {
      return matches$1(check.ancestor, ele) && ele.descendants().some(function(d) {
        return matches$1(check.descendant, d);
      });
    };
    match[Type.COMPOUND_SPLIT] = function(check, ele) {
      return matches$1(check.subject, ele) && matches$1(check.left, ele) && matches$1(check.right, ele);
    };
    match[Type.TRUE] = function() {
      return true;
    };
    match[Type.COLLECTION] = function(check, ele) {
      var collection2 = check.value;
      return collection2.has(ele);
    };
    match[Type.FILTER] = function(check, ele) {
      var filter2 = check.value;
      return filter2(ele);
    };
    var filter = function filter2(collection2) {
      var self2 = this;
      if (self2.length === 1 && self2[0].checks.length === 1 && self2[0].checks[0].type === Type.ID) {
        return collection2.getElementById(self2[0].checks[0].value).collection();
      }
      var selectorFunction = function selectorFunction2(element2) {
        for (var j = 0; j < self2.length; j++) {
          var query = self2[j];
          if (matches$1(query, element2)) {
            return true;
          }
        }
        return false;
      };
      if (self2.text() == null) {
        selectorFunction = function selectorFunction2() {
          return true;
        };
      }
      return collection2.filter(selectorFunction);
    };
    var matches = function matches2(ele) {
      var self2 = this;
      for (var j = 0; j < self2.length; j++) {
        var query = self2[j];
        if (matches$1(query, ele)) {
          return true;
        }
      }
      return false;
    };
    var matching = {
      matches,
      filter
    };
    var Selector = function Selector2(selector) {
      this.inputText = selector;
      this.currentSubject = null;
      this.compoundCount = 0;
      this.edgeCount = 0;
      this.length = 0;
      if (selector == null || string(selector) && selector.match(/^\s*$/)) ;
      else if (elementOrCollection(selector)) {
        this.addQuery({
          checks: [{
            type: Type.COLLECTION,
            value: selector.collection()
          }]
        });
      } else if (fn$6(selector)) {
        this.addQuery({
          checks: [{
            type: Type.FILTER,
            value: selector
          }]
        });
      } else if (string(selector)) {
        if (!this.parse(selector)) {
          this.invalid = true;
        }
      } else {
        error("A selector must be created from a string; found ");
      }
    };
    var selfn = Selector.prototype;
    [parse$1, matching].forEach(function(p2) {
      return extend(selfn, p2);
    });
    selfn.text = function() {
      return this.inputText;
    };
    selfn.size = function() {
      return this.length;
    };
    selfn.eq = function(i2) {
      return this[i2];
    };
    selfn.sameText = function(otherSel) {
      return !this.invalid && !otherSel.invalid && this.text() === otherSel.text();
    };
    selfn.addQuery = function(q) {
      this[this.length++] = q;
    };
    selfn.selector = selfn.toString;
    var elesfn$g = {
      allAre: function allAre(selector) {
        var selObj = new Selector(selector);
        return this.every(function(ele) {
          return selObj.matches(ele);
        });
      },
      is: function is(selector) {
        var selObj = new Selector(selector);
        return this.some(function(ele) {
          return selObj.matches(ele);
        });
      },
      some: function some(fn2, thisArg) {
        for (var i2 = 0; i2 < this.length; i2++) {
          var ret = !thisArg ? fn2(this[i2], i2, this) : fn2.apply(thisArg, [this[i2], i2, this]);
          if (ret) {
            return true;
          }
        }
        return false;
      },
      every: function every(fn2, thisArg) {
        for (var i2 = 0; i2 < this.length; i2++) {
          var ret = !thisArg ? fn2(this[i2], i2, this) : fn2.apply(thisArg, [this[i2], i2, this]);
          if (!ret) {
            return false;
          }
        }
        return true;
      },
      same: function same(collection2) {
        if (this === collection2) {
          return true;
        }
        collection2 = this.cy().collection(collection2);
        var thisLength = this.length;
        var collectionLength = collection2.length;
        if (thisLength !== collectionLength) {
          return false;
        }
        if (thisLength === 1) {
          return this[0] === collection2[0];
        }
        return this.every(function(ele) {
          return collection2.hasElementWithId(ele.id());
        });
      },
      anySame: function anySame(collection2) {
        collection2 = this.cy().collection(collection2);
        return this.some(function(ele) {
          return collection2.hasElementWithId(ele.id());
        });
      },
      allAreNeighbors: function allAreNeighbors(collection2) {
        collection2 = this.cy().collection(collection2);
        var nhood = this.neighborhood();
        return collection2.every(function(ele) {
          return nhood.hasElementWithId(ele.id());
        });
      },
      contains: function contains(collection2) {
        collection2 = this.cy().collection(collection2);
        var self2 = this;
        return collection2.every(function(ele) {
          return self2.hasElementWithId(ele.id());
        });
      }
    };
    elesfn$g.allAreNeighbours = elesfn$g.allAreNeighbors;
    elesfn$g.has = elesfn$g.contains;
    elesfn$g.equal = elesfn$g.equals = elesfn$g.same;
    var cache = function cache2(fn2, name) {
      return function traversalCache(arg1, arg2, arg3, arg4) {
        var selectorOrEles = arg1;
        var eles = this;
        var key;
        if (selectorOrEles == null) {
          key = "";
        } else if (elementOrCollection(selectorOrEles) && selectorOrEles.length === 1) {
          key = selectorOrEles.id();
        }
        if (eles.length === 1 && key) {
          var _p = eles[0]._private;
          var tch = _p.traversalCache = _p.traversalCache || {};
          var ch = tch[name] = tch[name] || [];
          var hash = hashString(key);
          var cacheHit = ch[hash];
          if (cacheHit) {
            return cacheHit;
          } else {
            return ch[hash] = fn2.call(eles, arg1, arg2, arg3, arg4);
          }
        } else {
          return fn2.call(eles, arg1, arg2, arg3, arg4);
        }
      };
    };
    var elesfn$f = {
      parent: function parent(selector) {
        var parents = [];
        if (this.length === 1) {
          var parent2 = this[0]._private.parent;
          if (parent2) {
            return parent2;
          }
        }
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          var _parent = ele._private.parent;
          if (_parent) {
            parents.push(_parent);
          }
        }
        return this.spawn(parents, true).filter(selector);
      },
      parents: function parents(selector) {
        var parents2 = [];
        var eles = this.parent();
        while (eles.nonempty()) {
          for (var i2 = 0; i2 < eles.length; i2++) {
            var ele = eles[i2];
            parents2.push(ele);
          }
          eles = eles.parent();
        }
        return this.spawn(parents2, true).filter(selector);
      },
      commonAncestors: function commonAncestors(selector) {
        var ancestors;
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          var parents = ele.parents();
          ancestors = ancestors || parents;
          ancestors = ancestors.intersect(parents);
        }
        return ancestors.filter(selector);
      },
      orphans: function orphans(selector) {
        return this.stdFilter(function(ele) {
          return ele.isOrphan();
        }).filter(selector);
      },
      nonorphans: function nonorphans(selector) {
        return this.stdFilter(function(ele) {
          return ele.isChild();
        }).filter(selector);
      },
      children: cache(function(selector) {
        var children = [];
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          var eleChildren = ele._private.children;
          for (var j = 0; j < eleChildren.length; j++) {
            children.push(eleChildren[j]);
          }
        }
        return this.spawn(children, true).filter(selector);
      }, "children"),
      siblings: function siblings(selector) {
        return this.parent().children().not(this).filter(selector);
      },
      isParent: function isParent() {
        var ele = this[0];
        if (ele) {
          return ele.isNode() && ele._private.children.length !== 0;
        }
      },
      isChildless: function isChildless() {
        var ele = this[0];
        if (ele) {
          return ele.isNode() && ele._private.children.length === 0;
        }
      },
      isChild: function isChild() {
        var ele = this[0];
        if (ele) {
          return ele.isNode() && ele._private.parent != null;
        }
      },
      isOrphan: function isOrphan() {
        var ele = this[0];
        if (ele) {
          return ele.isNode() && ele._private.parent == null;
        }
      },
      descendants: function descendants(selector) {
        var elements = [];
        function add(eles) {
          for (var i2 = 0; i2 < eles.length; i2++) {
            var ele = eles[i2];
            elements.push(ele);
            if (ele.children().nonempty()) {
              add(ele.children());
            }
          }
        }
        add(this.children());
        return this.spawn(elements, true).filter(selector);
      }
    };
    function forEachCompound(eles, fn2, includeSelf, recursiveStep) {
      var q = [];
      var did = new Set$1();
      var cy = eles.cy();
      var hasCompounds = cy.hasCompoundNodes();
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        if (includeSelf) {
          q.push(ele);
        } else if (hasCompounds) {
          recursiveStep(q, did, ele);
        }
      }
      while (q.length > 0) {
        var _ele = q.shift();
        fn2(_ele);
        did.add(_ele.id());
        if (hasCompounds) {
          recursiveStep(q, did, _ele);
        }
      }
      return eles;
    }
    function addChildren(q, did, ele) {
      if (ele.isParent()) {
        var children = ele._private.children;
        for (var i2 = 0; i2 < children.length; i2++) {
          var child = children[i2];
          if (!did.has(child.id())) {
            q.push(child);
          }
        }
      }
    }
    elesfn$f.forEachDown = function(fn2) {
      var includeSelf = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return forEachCompound(this, fn2, includeSelf, addChildren);
    };
    function addParent(q, did, ele) {
      if (ele.isChild()) {
        var parent = ele._private.parent;
        if (!did.has(parent.id())) {
          q.push(parent);
        }
      }
    }
    elesfn$f.forEachUp = function(fn2) {
      var includeSelf = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return forEachCompound(this, fn2, includeSelf, addParent);
    };
    function addParentAndChildren(q, did, ele) {
      addParent(q, did, ele);
      addChildren(q, did, ele);
    }
    elesfn$f.forEachUpAndDown = function(fn2) {
      var includeSelf = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return forEachCompound(this, fn2, includeSelf, addParentAndChildren);
    };
    elesfn$f.ancestors = elesfn$f.parents;
    var fn$5;
    var elesfn$e;
    fn$5 = elesfn$e = {
      data: define2.data({
        field: "data",
        bindingEvent: "data",
        allowBinding: true,
        allowSetting: true,
        settingEvent: "data",
        settingTriggersEvent: true,
        triggerFnName: "trigger",
        allowGetting: true,
        immutableKeys: {
          "id": true,
          "source": true,
          "target": true,
          "parent": true
        },
        updateStyle: true
      }),
      removeData: define2.removeData({
        field: "data",
        event: "data",
        triggerFnName: "trigger",
        triggerEvent: true,
        immutableKeys: {
          "id": true,
          "source": true,
          "target": true,
          "parent": true
        },
        updateStyle: true
      }),
      scratch: define2.data({
        field: "scratch",
        bindingEvent: "scratch",
        allowBinding: true,
        allowSetting: true,
        settingEvent: "scratch",
        settingTriggersEvent: true,
        triggerFnName: "trigger",
        allowGetting: true,
        updateStyle: true
      }),
      removeScratch: define2.removeData({
        field: "scratch",
        event: "scratch",
        triggerFnName: "trigger",
        triggerEvent: true,
        updateStyle: true
      }),
      rscratch: define2.data({
        field: "rscratch",
        allowBinding: false,
        allowSetting: true,
        settingTriggersEvent: false,
        allowGetting: true
      }),
      removeRscratch: define2.removeData({
        field: "rscratch",
        triggerEvent: false
      }),
      id: function id() {
        var ele = this[0];
        if (ele) {
          return ele._private.data.id;
        }
      }
    };
    fn$5.attr = fn$5.data;
    fn$5.removeAttr = fn$5.removeData;
    var data = elesfn$e;
    var elesfn$d = {};
    function defineDegreeFunction(callback) {
      return function(includeLoops) {
        var self2 = this;
        if (includeLoops === void 0) {
          includeLoops = true;
        }
        if (self2.length === 0) {
          return;
        }
        if (self2.isNode() && !self2.removed()) {
          var degree = 0;
          var node = self2[0];
          var connectedEdges = node._private.edges;
          for (var i2 = 0; i2 < connectedEdges.length; i2++) {
            var edge = connectedEdges[i2];
            if (!includeLoops && edge.isLoop()) {
              continue;
            }
            degree += callback(node, edge);
          }
          return degree;
        } else {
          return;
        }
      };
    }
    extend(elesfn$d, {
      degree: defineDegreeFunction(function(node, edge) {
        if (edge.source().same(edge.target())) {
          return 2;
        } else {
          return 1;
        }
      }),
      indegree: defineDegreeFunction(function(node, edge) {
        if (edge.target().same(node)) {
          return 1;
        } else {
          return 0;
        }
      }),
      outdegree: defineDegreeFunction(function(node, edge) {
        if (edge.source().same(node)) {
          return 1;
        } else {
          return 0;
        }
      })
    });
    function defineDegreeBoundsFunction(degreeFn, callback) {
      return function(includeLoops) {
        var ret;
        var nodes = this.nodes();
        for (var i2 = 0; i2 < nodes.length; i2++) {
          var ele = nodes[i2];
          var degree = ele[degreeFn](includeLoops);
          if (degree !== void 0 && (ret === void 0 || callback(degree, ret))) {
            ret = degree;
          }
        }
        return ret;
      };
    }
    extend(elesfn$d, {
      minDegree: defineDegreeBoundsFunction("degree", function(degree, min2) {
        return degree < min2;
      }),
      maxDegree: defineDegreeBoundsFunction("degree", function(degree, max2) {
        return degree > max2;
      }),
      minIndegree: defineDegreeBoundsFunction("indegree", function(degree, min2) {
        return degree < min2;
      }),
      maxIndegree: defineDegreeBoundsFunction("indegree", function(degree, max2) {
        return degree > max2;
      }),
      minOutdegree: defineDegreeBoundsFunction("outdegree", function(degree, min2) {
        return degree < min2;
      }),
      maxOutdegree: defineDegreeBoundsFunction("outdegree", function(degree, max2) {
        return degree > max2;
      })
    });
    extend(elesfn$d, {
      totalDegree: function totalDegree(includeLoops) {
        var total = 0;
        var nodes = this.nodes();
        for (var i2 = 0; i2 < nodes.length; i2++) {
          total += nodes[i2].degree(includeLoops);
        }
        return total;
      }
    });
    var fn$4;
    var elesfn$c;
    var beforePositionSet = function beforePositionSet2(eles, newPos, silent) {
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        if (!ele.locked()) {
          var oldPos = ele._private.position;
          var delta = {
            x: newPos.x != null ? newPos.x - oldPos.x : 0,
            y: newPos.y != null ? newPos.y - oldPos.y : 0
          };
          if (ele.isParent() && !(delta.x === 0 && delta.y === 0)) {
            ele.children().shift(delta, silent);
          }
          ele.dirtyBoundingBoxCache();
        }
      }
    };
    var positionDef = {
      field: "position",
      bindingEvent: "position",
      allowBinding: true,
      allowSetting: true,
      settingEvent: "position",
      settingTriggersEvent: true,
      triggerFnName: "emitAndNotify",
      allowGetting: true,
      validKeys: ["x", "y"],
      beforeGet: function beforeGet(ele) {
        ele.updateCompoundBounds();
      },
      beforeSet: function beforeSet(eles, newPos) {
        beforePositionSet(eles, newPos, false);
      },
      onSet: function onSet(eles) {
        eles.dirtyCompoundBoundsCache();
      },
      canSet: function canSet(ele) {
        return !ele.locked();
      }
    };
    fn$4 = elesfn$c = {
      position: define2.data(positionDef),
      // position but no notification to renderer
      silentPosition: define2.data(extend({}, positionDef, {
        allowBinding: false,
        allowSetting: true,
        settingTriggersEvent: false,
        allowGetting: false,
        beforeSet: function beforeSet(eles, newPos) {
          beforePositionSet(eles, newPos, true);
        },
        onSet: function onSet(eles) {
          eles.dirtyCompoundBoundsCache();
        }
      })),
      positions: function positions(pos, silent) {
        if (plainObject(pos)) {
          if (silent) {
            this.silentPosition(pos);
          } else {
            this.position(pos);
          }
        } else if (fn$6(pos)) {
          var _fn = pos;
          var cy = this.cy();
          cy.startBatch();
          for (var i2 = 0; i2 < this.length; i2++) {
            var ele = this[i2];
            var _pos = void 0;
            if (_pos = _fn(ele, i2)) {
              if (silent) {
                ele.silentPosition(_pos);
              } else {
                ele.position(_pos);
              }
            }
          }
          cy.endBatch();
        }
        return this;
      },
      silentPositions: function silentPositions(pos) {
        return this.positions(pos, true);
      },
      shift: function shift(dim, val, silent) {
        var delta;
        if (plainObject(dim)) {
          delta = {
            x: number$1(dim.x) ? dim.x : 0,
            y: number$1(dim.y) ? dim.y : 0
          };
          silent = val;
        } else if (string(dim) && number$1(val)) {
          delta = {
            x: 0,
            y: 0
          };
          delta[dim] = val;
        }
        if (delta != null) {
          var cy = this.cy();
          cy.startBatch();
          for (var i2 = 0; i2 < this.length; i2++) {
            var ele = this[i2];
            if (cy.hasCompoundNodes() && ele.isChild() && ele.ancestors().anySame(this)) {
              continue;
            }
            var pos = ele.position();
            var newPos = {
              x: pos.x + delta.x,
              y: pos.y + delta.y
            };
            if (silent) {
              ele.silentPosition(newPos);
            } else {
              ele.position(newPos);
            }
          }
          cy.endBatch();
        }
        return this;
      },
      silentShift: function silentShift(dim, val) {
        if (plainObject(dim)) {
          this.shift(dim, true);
        } else if (string(dim) && number$1(val)) {
          this.shift(dim, val, true);
        }
        return this;
      },
      // get/set the rendered (i.e. on screen) positon of the element
      renderedPosition: function renderedPosition(dim, val) {
        var ele = this[0];
        var cy = this.cy();
        var zoom = cy.zoom();
        var pan = cy.pan();
        var rpos = plainObject(dim) ? dim : void 0;
        var setting = rpos !== void 0 || val !== void 0 && string(dim);
        if (ele && ele.isNode()) {
          if (setting) {
            for (var i2 = 0; i2 < this.length; i2++) {
              var _ele = this[i2];
              if (val !== void 0) {
                _ele.position(dim, (val - pan[dim]) / zoom);
              } else if (rpos !== void 0) {
                _ele.position(renderedToModelPosition(rpos, zoom, pan));
              }
            }
          } else {
            var pos = ele.position();
            rpos = modelToRenderedPosition(pos, zoom, pan);
            if (dim === void 0) {
              return rpos;
            } else {
              return rpos[dim];
            }
          }
        } else if (!setting) {
          return void 0;
        }
        return this;
      },
      // get/set the position relative to the parent
      relativePosition: function relativePosition(dim, val) {
        var ele = this[0];
        var cy = this.cy();
        var ppos = plainObject(dim) ? dim : void 0;
        var setting = ppos !== void 0 || val !== void 0 && string(dim);
        var hasCompoundNodes = cy.hasCompoundNodes();
        if (ele && ele.isNode()) {
          if (setting) {
            for (var i2 = 0; i2 < this.length; i2++) {
              var _ele2 = this[i2];
              var parent = hasCompoundNodes ? _ele2.parent() : null;
              var hasParent = parent && parent.length > 0;
              var relativeToParent = hasParent;
              if (hasParent) {
                parent = parent[0];
              }
              var origin = relativeToParent ? parent.position() : {
                x: 0,
                y: 0
              };
              if (val !== void 0) {
                _ele2.position(dim, val + origin[dim]);
              } else if (ppos !== void 0) {
                _ele2.position({
                  x: ppos.x + origin.x,
                  y: ppos.y + origin.y
                });
              }
            }
          } else {
            var pos = ele.position();
            var _parent = hasCompoundNodes ? ele.parent() : null;
            var _hasParent = _parent && _parent.length > 0;
            var _relativeToParent = _hasParent;
            if (_hasParent) {
              _parent = _parent[0];
            }
            var _origin = _relativeToParent ? _parent.position() : {
              x: 0,
              y: 0
            };
            ppos = {
              x: pos.x - _origin.x,
              y: pos.y - _origin.y
            };
            if (dim === void 0) {
              return ppos;
            } else {
              return ppos[dim];
            }
          }
        } else if (!setting) {
          return void 0;
        }
        return this;
      }
    };
    fn$4.modelPosition = fn$4.point = fn$4.position;
    fn$4.modelPositions = fn$4.points = fn$4.positions;
    fn$4.renderedPoint = fn$4.renderedPosition;
    fn$4.relativePoint = fn$4.relativePosition;
    var position = elesfn$c;
    var fn$3;
    var elesfn$b;
    fn$3 = elesfn$b = {};
    elesfn$b.renderedBoundingBox = function(options) {
      var bb = this.boundingBox(options);
      var cy = this.cy();
      var zoom = cy.zoom();
      var pan = cy.pan();
      var x1 = bb.x1 * zoom + pan.x;
      var x2 = bb.x2 * zoom + pan.x;
      var y1 = bb.y1 * zoom + pan.y;
      var y2 = bb.y2 * zoom + pan.y;
      return {
        x1,
        x2,
        y1,
        y2,
        w: x2 - x1,
        h: y2 - y1
      };
    };
    elesfn$b.dirtyCompoundBoundsCache = function() {
      var silent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var cy = this.cy();
      if (!cy.styleEnabled() || !cy.hasCompoundNodes()) {
        return this;
      }
      this.forEachUp(function(ele) {
        if (ele.isParent()) {
          var _p = ele._private;
          _p.compoundBoundsClean = false;
          _p.bbCache = null;
          if (!silent) {
            ele.emitAndNotify("bounds");
          }
        }
      });
      return this;
    };
    elesfn$b.updateCompoundBounds = function() {
      var force = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var cy = this.cy();
      if (!cy.styleEnabled() || !cy.hasCompoundNodes()) {
        return this;
      }
      if (!force && cy.batching()) {
        return this;
      }
      function update(parent) {
        if (!parent.isParent()) {
          return;
        }
        var _p2 = parent._private;
        var children = parent.children();
        var includeLabels = parent.pstyle("compound-sizing-wrt-labels").value === "include";
        var min2 = {
          width: {
            val: parent.pstyle("min-width").pfValue,
            left: parent.pstyle("min-width-bias-left"),
            right: parent.pstyle("min-width-bias-right")
          },
          height: {
            val: parent.pstyle("min-height").pfValue,
            top: parent.pstyle("min-height-bias-top"),
            bottom: parent.pstyle("min-height-bias-bottom")
          }
        };
        var bb = children.boundingBox({
          includeLabels,
          includeOverlays: false,
          // updating the compound bounds happens outside of the regular
          // cache cycle (i.e. before fired events)
          useCache: false
        });
        var pos = _p2.position;
        if (bb.w === 0 || bb.h === 0) {
          bb = {
            w: parent.pstyle("width").pfValue,
            h: parent.pstyle("height").pfValue
          };
          bb.x1 = pos.x - bb.w / 2;
          bb.x2 = pos.x + bb.w / 2;
          bb.y1 = pos.y - bb.h / 2;
          bb.y2 = pos.y + bb.h / 2;
        }
        function computeBiasValues(propDiff, propBias, propBiasComplement) {
          var biasDiff = 0;
          var biasComplementDiff = 0;
          var biasTotal = propBias + propBiasComplement;
          if (propDiff > 0 && biasTotal > 0) {
            biasDiff = propBias / biasTotal * propDiff;
            biasComplementDiff = propBiasComplement / biasTotal * propDiff;
          }
          return {
            biasDiff,
            biasComplementDiff
          };
        }
        function computePaddingValues(width, height, paddingObject, relativeTo) {
          if (paddingObject.units === "%") {
            switch (relativeTo) {
              case "width":
                return width > 0 ? paddingObject.pfValue * width : 0;
              case "height":
                return height > 0 ? paddingObject.pfValue * height : 0;
              case "average":
                return width > 0 && height > 0 ? paddingObject.pfValue * (width + height) / 2 : 0;
              case "min":
                return width > 0 && height > 0 ? width > height ? paddingObject.pfValue * height : paddingObject.pfValue * width : 0;
              case "max":
                return width > 0 && height > 0 ? width > height ? paddingObject.pfValue * width : paddingObject.pfValue * height : 0;
              default:
                return 0;
            }
          } else if (paddingObject.units === "px") {
            return paddingObject.pfValue;
          } else {
            return 0;
          }
        }
        var leftVal = min2.width.left.value;
        if (min2.width.left.units === "px" && min2.width.val > 0) {
          leftVal = leftVal * 100 / min2.width.val;
        }
        var rightVal = min2.width.right.value;
        if (min2.width.right.units === "px" && min2.width.val > 0) {
          rightVal = rightVal * 100 / min2.width.val;
        }
        var topVal = min2.height.top.value;
        if (min2.height.top.units === "px" && min2.height.val > 0) {
          topVal = topVal * 100 / min2.height.val;
        }
        var bottomVal = min2.height.bottom.value;
        if (min2.height.bottom.units === "px" && min2.height.val > 0) {
          bottomVal = bottomVal * 100 / min2.height.val;
        }
        var widthBiasDiffs = computeBiasValues(min2.width.val - bb.w, leftVal, rightVal);
        var diffLeft = widthBiasDiffs.biasDiff;
        var diffRight = widthBiasDiffs.biasComplementDiff;
        var heightBiasDiffs = computeBiasValues(min2.height.val - bb.h, topVal, bottomVal);
        var diffTop = heightBiasDiffs.biasDiff;
        var diffBottom = heightBiasDiffs.biasComplementDiff;
        _p2.autoPadding = computePaddingValues(bb.w, bb.h, parent.pstyle("padding"), parent.pstyle("padding-relative-to").value);
        _p2.autoWidth = Math.max(bb.w, min2.width.val);
        pos.x = (-diffLeft + bb.x1 + bb.x2 + diffRight) / 2;
        _p2.autoHeight = Math.max(bb.h, min2.height.val);
        pos.y = (-diffTop + bb.y1 + bb.y2 + diffBottom) / 2;
      }
      for (var i2 = 0; i2 < this.length; i2++) {
        var ele = this[i2];
        var _p = ele._private;
        if (!_p.compoundBoundsClean || force) {
          update(ele);
          if (!cy.batching()) {
            _p.compoundBoundsClean = true;
          }
        }
      }
      return this;
    };
    var noninf = function noninf2(x) {
      if (x === Infinity || x === -Infinity) {
        return 0;
      }
      return x;
    };
    var updateBounds = function updateBounds2(b, x1, y1, x2, y2) {
      if (x2 - x1 === 0 || y2 - y1 === 0) {
        return;
      }
      if (x1 == null || y1 == null || x2 == null || y2 == null) {
        return;
      }
      b.x1 = x1 < b.x1 ? x1 : b.x1;
      b.x2 = x2 > b.x2 ? x2 : b.x2;
      b.y1 = y1 < b.y1 ? y1 : b.y1;
      b.y2 = y2 > b.y2 ? y2 : b.y2;
      b.w = b.x2 - b.x1;
      b.h = b.y2 - b.y1;
    };
    var updateBoundsFromBox = function updateBoundsFromBox2(b, b2) {
      if (b2 == null) {
        return b;
      }
      return updateBounds(b, b2.x1, b2.y1, b2.x2, b2.y2);
    };
    var prefixedProperty = function prefixedProperty2(obj, field, prefix) {
      return getPrefixedProperty(obj, field, prefix);
    };
    var updateBoundsFromArrow = function updateBoundsFromArrow2(bounds2, ele, prefix) {
      if (ele.cy().headless()) {
        return;
      }
      var _p = ele._private;
      var rstyle = _p.rstyle;
      var halfArW = rstyle.arrowWidth / 2;
      var arrowType = ele.pstyle(prefix + "-arrow-shape").value;
      var x;
      var y;
      if (arrowType !== "none") {
        if (prefix === "source") {
          x = rstyle.srcX;
          y = rstyle.srcY;
        } else if (prefix === "target") {
          x = rstyle.tgtX;
          y = rstyle.tgtY;
        } else {
          x = rstyle.midX;
          y = rstyle.midY;
        }
        var bbs = _p.arrowBounds = _p.arrowBounds || {};
        var bb = bbs[prefix] = bbs[prefix] || {};
        bb.x1 = x - halfArW;
        bb.y1 = y - halfArW;
        bb.x2 = x + halfArW;
        bb.y2 = y + halfArW;
        bb.w = bb.x2 - bb.x1;
        bb.h = bb.y2 - bb.y1;
        expandBoundingBox(bb, 1);
        updateBounds(bounds2, bb.x1, bb.y1, bb.x2, bb.y2);
      }
    };
    var updateBoundsFromLabel = function updateBoundsFromLabel2(bounds2, ele, prefix) {
      if (ele.cy().headless()) {
        return;
      }
      var prefixDash;
      if (prefix) {
        prefixDash = prefix + "-";
      } else {
        prefixDash = "";
      }
      var _p = ele._private;
      var rstyle = _p.rstyle;
      var label = ele.pstyle(prefixDash + "label").strValue;
      if (label) {
        var halign = ele.pstyle("text-halign");
        var valign = ele.pstyle("text-valign");
        var labelWidth = prefixedProperty(rstyle, "labelWidth", prefix);
        var labelHeight = prefixedProperty(rstyle, "labelHeight", prefix);
        var labelX = prefixedProperty(rstyle, "labelX", prefix);
        var labelY = prefixedProperty(rstyle, "labelY", prefix);
        var marginX = ele.pstyle(prefixDash + "text-margin-x").pfValue;
        var marginY = ele.pstyle(prefixDash + "text-margin-y").pfValue;
        var isEdge = ele.isEdge();
        var rotation = ele.pstyle(prefixDash + "text-rotation");
        var outlineWidth = ele.pstyle("text-outline-width").pfValue;
        var borderWidth = ele.pstyle("text-border-width").pfValue;
        var halfBorderWidth = borderWidth / 2;
        var padding = ele.pstyle("text-background-padding").pfValue;
        var marginOfError = 2;
        var lh = labelHeight;
        var lw = labelWidth;
        var lw_2 = lw / 2;
        var lh_2 = lh / 2;
        var lx1, lx2, ly1, ly2;
        if (isEdge) {
          lx1 = labelX - lw_2;
          lx2 = labelX + lw_2;
          ly1 = labelY - lh_2;
          ly2 = labelY + lh_2;
        } else {
          switch (halign.value) {
            case "left":
              lx1 = labelX - lw;
              lx2 = labelX;
              break;
            case "center":
              lx1 = labelX - lw_2;
              lx2 = labelX + lw_2;
              break;
            case "right":
              lx1 = labelX;
              lx2 = labelX + lw;
              break;
          }
          switch (valign.value) {
            case "top":
              ly1 = labelY - lh;
              ly2 = labelY;
              break;
            case "center":
              ly1 = labelY - lh_2;
              ly2 = labelY + lh_2;
              break;
            case "bottom":
              ly1 = labelY;
              ly2 = labelY + lh;
              break;
          }
        }
        lx1 += marginX - Math.max(outlineWidth, halfBorderWidth) - padding - marginOfError;
        lx2 += marginX + Math.max(outlineWidth, halfBorderWidth) + padding + marginOfError;
        ly1 += marginY - Math.max(outlineWidth, halfBorderWidth) - padding - marginOfError;
        ly2 += marginY + Math.max(outlineWidth, halfBorderWidth) + padding + marginOfError;
        var bbPrefix = prefix || "main";
        var bbs = _p.labelBounds;
        var bb = bbs[bbPrefix] = bbs[bbPrefix] || {};
        bb.x1 = lx1;
        bb.y1 = ly1;
        bb.x2 = lx2;
        bb.y2 = ly2;
        bb.w = lx2 - lx1;
        bb.h = ly2 - ly1;
        var isAutorotate = isEdge && rotation.strValue === "autorotate";
        var isPfValue = rotation.pfValue != null && rotation.pfValue !== 0;
        if (isAutorotate || isPfValue) {
          var theta = isAutorotate ? prefixedProperty(_p.rstyle, "labelAngle", prefix) : rotation.pfValue;
          var cos2 = Math.cos(theta);
          var sin2 = Math.sin(theta);
          var xo = (lx1 + lx2) / 2;
          var yo = (ly1 + ly2) / 2;
          if (!isEdge) {
            switch (halign.value) {
              case "left":
                xo = lx2;
                break;
              case "right":
                xo = lx1;
                break;
            }
            switch (valign.value) {
              case "top":
                yo = ly2;
                break;
              case "bottom":
                yo = ly1;
                break;
            }
          }
          var rotate = function rotate2(x, y) {
            x = x - xo;
            y = y - yo;
            return {
              x: x * cos2 - y * sin2 + xo,
              y: x * sin2 + y * cos2 + yo
            };
          };
          var px1y1 = rotate(lx1, ly1);
          var px1y2 = rotate(lx1, ly2);
          var px2y1 = rotate(lx2, ly1);
          var px2y2 = rotate(lx2, ly2);
          lx1 = Math.min(px1y1.x, px1y2.x, px2y1.x, px2y2.x);
          lx2 = Math.max(px1y1.x, px1y2.x, px2y1.x, px2y2.x);
          ly1 = Math.min(px1y1.y, px1y2.y, px2y1.y, px2y2.y);
          ly2 = Math.max(px1y1.y, px1y2.y, px2y1.y, px2y2.y);
        }
        var bbPrefixRot = bbPrefix + "Rot";
        var bbRot = bbs[bbPrefixRot] = bbs[bbPrefixRot] || {};
        bbRot.x1 = lx1;
        bbRot.y1 = ly1;
        bbRot.x2 = lx2;
        bbRot.y2 = ly2;
        bbRot.w = lx2 - lx1;
        bbRot.h = ly2 - ly1;
        updateBounds(bounds2, lx1, ly1, lx2, ly2);
        updateBounds(_p.labelBounds.all, lx1, ly1, lx2, ly2);
      }
      return bounds2;
    };
    var updateBoundsFromOutline = function updateBoundsFromOutline2(bounds2, ele) {
      if (ele.cy().headless()) {
        return;
      }
      var outlineOpacity = ele.pstyle("outline-opacity").value;
      var outlineWidth = ele.pstyle("outline-width").value;
      if (outlineOpacity > 0 && outlineWidth > 0) {
        var outlineOffset = ele.pstyle("outline-offset").value;
        var nodeShape = ele.pstyle("shape").value;
        var outlineSize = outlineWidth + outlineOffset;
        var scaleX = (bounds2.w + outlineSize * 2) / bounds2.w;
        var scaleY = (bounds2.h + outlineSize * 2) / bounds2.h;
        var xOffset = 0;
        var yOffset = 0;
        if (["diamond", "pentagon", "round-triangle"].includes(nodeShape)) {
          scaleX = (bounds2.w + outlineSize * 2.4) / bounds2.w;
          yOffset = -outlineSize / 3.6;
        } else if (["concave-hexagon", "rhomboid", "right-rhomboid"].includes(nodeShape)) {
          scaleX = (bounds2.w + outlineSize * 2.4) / bounds2.w;
        } else if (nodeShape === "star") {
          scaleX = (bounds2.w + outlineSize * 2.8) / bounds2.w;
          scaleY = (bounds2.h + outlineSize * 2.6) / bounds2.h;
          yOffset = -outlineSize / 3.8;
        } else if (nodeShape === "triangle") {
          scaleX = (bounds2.w + outlineSize * 2.8) / bounds2.w;
          scaleY = (bounds2.h + outlineSize * 2.4) / bounds2.h;
          yOffset = -outlineSize / 1.4;
        } else if (nodeShape === "vee") {
          scaleX = (bounds2.w + outlineSize * 4.4) / bounds2.w;
          scaleY = (bounds2.h + outlineSize * 3.8) / bounds2.h;
          yOffset = -outlineSize * 0.5;
        }
        var hDelta = bounds2.h * scaleY - bounds2.h;
        var wDelta = bounds2.w * scaleX - bounds2.w;
        expandBoundingBoxSides(bounds2, [Math.ceil(hDelta / 2), Math.ceil(wDelta / 2)]);
        if (xOffset != 0 || yOffset !== 0) {
          var oBounds = shiftBoundingBox(bounds2, xOffset, yOffset);
          updateBoundingBox(bounds2, oBounds);
        }
      }
    };
    var boundingBoxImpl = function boundingBoxImpl2(ele, options) {
      var cy = ele._private.cy;
      var styleEnabled = cy.styleEnabled();
      var headless = cy.headless();
      var bounds2 = makeBoundingBox();
      var _p = ele._private;
      var isNode = ele.isNode();
      var isEdge = ele.isEdge();
      var ex1, ex2, ey1, ey2;
      var x, y;
      var rstyle = _p.rstyle;
      var manualExpansion = isNode && styleEnabled ? ele.pstyle("bounds-expansion").pfValue : [0];
      var isDisplayed = function isDisplayed2(ele2) {
        return ele2.pstyle("display").value !== "none";
      };
      var displayed = !styleEnabled || isDisplayed(ele) && (!isEdge || isDisplayed(ele.source()) && isDisplayed(ele.target()));
      if (displayed) {
        var overlayOpacity = 0;
        var overlayPadding = 0;
        if (styleEnabled && options.includeOverlays) {
          overlayOpacity = ele.pstyle("overlay-opacity").value;
          if (overlayOpacity !== 0) {
            overlayPadding = ele.pstyle("overlay-padding").value;
          }
        }
        var underlayOpacity = 0;
        var underlayPadding = 0;
        if (styleEnabled && options.includeUnderlays) {
          underlayOpacity = ele.pstyle("underlay-opacity").value;
          if (underlayOpacity !== 0) {
            underlayPadding = ele.pstyle("underlay-padding").value;
          }
        }
        var padding = Math.max(overlayPadding, underlayPadding);
        var w = 0;
        var wHalf = 0;
        if (styleEnabled) {
          w = ele.pstyle("width").pfValue;
          wHalf = w / 2;
        }
        if (isNode && options.includeNodes) {
          var pos = ele.position();
          x = pos.x;
          y = pos.y;
          var _w = ele.outerWidth();
          var halfW = _w / 2;
          var h = ele.outerHeight();
          var halfH = h / 2;
          ex1 = x - halfW;
          ex2 = x + halfW;
          ey1 = y - halfH;
          ey2 = y + halfH;
          updateBounds(bounds2, ex1, ey1, ex2, ey2);
          if (styleEnabled && options.includeOutlines) {
            updateBoundsFromOutline(bounds2, ele);
          }
        } else if (isEdge && options.includeEdges) {
          if (styleEnabled && !headless) {
            var curveStyle = ele.pstyle("curve-style").strValue;
            ex1 = Math.min(rstyle.srcX, rstyle.midX, rstyle.tgtX);
            ex2 = Math.max(rstyle.srcX, rstyle.midX, rstyle.tgtX);
            ey1 = Math.min(rstyle.srcY, rstyle.midY, rstyle.tgtY);
            ey2 = Math.max(rstyle.srcY, rstyle.midY, rstyle.tgtY);
            ex1 -= wHalf;
            ex2 += wHalf;
            ey1 -= wHalf;
            ey2 += wHalf;
            updateBounds(bounds2, ex1, ey1, ex2, ey2);
            if (curveStyle === "haystack") {
              var hpts = rstyle.haystackPts;
              if (hpts && hpts.length === 2) {
                ex1 = hpts[0].x;
                ey1 = hpts[0].y;
                ex2 = hpts[1].x;
                ey2 = hpts[1].y;
                if (ex1 > ex2) {
                  var temp = ex1;
                  ex1 = ex2;
                  ex2 = temp;
                }
                if (ey1 > ey2) {
                  var _temp = ey1;
                  ey1 = ey2;
                  ey2 = _temp;
                }
                updateBounds(bounds2, ex1 - wHalf, ey1 - wHalf, ex2 + wHalf, ey2 + wHalf);
              }
            } else if (curveStyle === "bezier" || curveStyle === "unbundled-bezier" || curveStyle === "segments" || curveStyle === "taxi") {
              var pts2;
              switch (curveStyle) {
                case "bezier":
                case "unbundled-bezier":
                  pts2 = rstyle.bezierPts;
                  break;
                case "segments":
                case "taxi":
                  pts2 = rstyle.linePts;
                  break;
              }
              if (pts2 != null) {
                for (var j = 0; j < pts2.length; j++) {
                  var pt = pts2[j];
                  ex1 = pt.x - wHalf;
                  ex2 = pt.x + wHalf;
                  ey1 = pt.y - wHalf;
                  ey2 = pt.y + wHalf;
                  updateBounds(bounds2, ex1, ey1, ex2, ey2);
                }
              }
            }
          } else {
            var n1 = ele.source();
            var n1pos = n1.position();
            var n2 = ele.target();
            var n2pos = n2.position();
            ex1 = n1pos.x;
            ex2 = n2pos.x;
            ey1 = n1pos.y;
            ey2 = n2pos.y;
            if (ex1 > ex2) {
              var _temp2 = ex1;
              ex1 = ex2;
              ex2 = _temp2;
            }
            if (ey1 > ey2) {
              var _temp3 = ey1;
              ey1 = ey2;
              ey2 = _temp3;
            }
            ex1 -= wHalf;
            ex2 += wHalf;
            ey1 -= wHalf;
            ey2 += wHalf;
            updateBounds(bounds2, ex1, ey1, ex2, ey2);
          }
        }
        if (styleEnabled && options.includeEdges && isEdge) {
          updateBoundsFromArrow(bounds2, ele, "mid-source");
          updateBoundsFromArrow(bounds2, ele, "mid-target");
          updateBoundsFromArrow(bounds2, ele, "source");
          updateBoundsFromArrow(bounds2, ele, "target");
        }
        if (styleEnabled) {
          var ghost = ele.pstyle("ghost").value === "yes";
          if (ghost) {
            var gx = ele.pstyle("ghost-offset-x").pfValue;
            var gy = ele.pstyle("ghost-offset-y").pfValue;
            updateBounds(bounds2, bounds2.x1 + gx, bounds2.y1 + gy, bounds2.x2 + gx, bounds2.y2 + gy);
          }
        }
        var bbBody = _p.bodyBounds = _p.bodyBounds || {};
        assignBoundingBox(bbBody, bounds2);
        expandBoundingBoxSides(bbBody, manualExpansion);
        expandBoundingBox(bbBody, 1);
        if (styleEnabled) {
          ex1 = bounds2.x1;
          ex2 = bounds2.x2;
          ey1 = bounds2.y1;
          ey2 = bounds2.y2;
          updateBounds(bounds2, ex1 - padding, ey1 - padding, ex2 + padding, ey2 + padding);
        }
        var bbOverlay = _p.overlayBounds = _p.overlayBounds || {};
        assignBoundingBox(bbOverlay, bounds2);
        expandBoundingBoxSides(bbOverlay, manualExpansion);
        expandBoundingBox(bbOverlay, 1);
        var bbLabels = _p.labelBounds = _p.labelBounds || {};
        if (bbLabels.all != null) {
          clearBoundingBox(bbLabels.all);
        } else {
          bbLabels.all = makeBoundingBox();
        }
        if (styleEnabled && options.includeLabels) {
          if (options.includeMainLabels) {
            updateBoundsFromLabel(bounds2, ele, null);
          }
          if (isEdge) {
            if (options.includeSourceLabels) {
              updateBoundsFromLabel(bounds2, ele, "source");
            }
            if (options.includeTargetLabels) {
              updateBoundsFromLabel(bounds2, ele, "target");
            }
          }
        }
      }
      bounds2.x1 = noninf(bounds2.x1);
      bounds2.y1 = noninf(bounds2.y1);
      bounds2.x2 = noninf(bounds2.x2);
      bounds2.y2 = noninf(bounds2.y2);
      bounds2.w = noninf(bounds2.x2 - bounds2.x1);
      bounds2.h = noninf(bounds2.y2 - bounds2.y1);
      if (bounds2.w > 0 && bounds2.h > 0 && displayed) {
        expandBoundingBoxSides(bounds2, manualExpansion);
        expandBoundingBox(bounds2, 1);
      }
      return bounds2;
    };
    var getKey = function getKey2(opts) {
      var i2 = 0;
      var tf = function tf2(val) {
        return (val ? 1 : 0) << i2++;
      };
      var key = 0;
      key += tf(opts.incudeNodes);
      key += tf(opts.includeEdges);
      key += tf(opts.includeLabels);
      key += tf(opts.includeMainLabels);
      key += tf(opts.includeSourceLabels);
      key += tf(opts.includeTargetLabels);
      key += tf(opts.includeOverlays);
      key += tf(opts.includeOutlines);
      return key;
    };
    var getBoundingBoxPosKey = function getBoundingBoxPosKey2(ele) {
      if (ele.isEdge()) {
        var p1 = ele.source().position();
        var p2 = ele.target().position();
        var r = function r2(x) {
          return Math.round(x);
        };
        return hashIntsArray([r(p1.x), r(p1.y), r(p2.x), r(p2.y)]);
      } else {
        return 0;
      }
    };
    var cachedBoundingBoxImpl = function cachedBoundingBoxImpl2(ele, opts) {
      var _p = ele._private;
      var bb;
      var isEdge = ele.isEdge();
      var key = opts == null ? defBbOptsKey : getKey(opts);
      var usingDefOpts = key === defBbOptsKey;
      var currPosKey = getBoundingBoxPosKey(ele);
      var isPosKeySame = _p.bbCachePosKey === currPosKey;
      var useCache = opts.useCache && isPosKeySame;
      var isDirty = function isDirty2(ele2) {
        return ele2._private.bbCache == null || ele2._private.styleDirty;
      };
      var needRecalc = !useCache || isDirty(ele) || isEdge && isDirty(ele.source()) || isDirty(ele.target());
      if (needRecalc) {
        if (!isPosKeySame) {
          ele.recalculateRenderedStyle(useCache);
        }
        bb = boundingBoxImpl(ele, defBbOpts);
        _p.bbCache = bb;
        _p.bbCachePosKey = currPosKey;
      } else {
        bb = _p.bbCache;
      }
      if (!usingDefOpts) {
        var isNode = ele.isNode();
        bb = makeBoundingBox();
        if (opts.includeNodes && isNode || opts.includeEdges && !isNode) {
          if (opts.includeOverlays) {
            updateBoundsFromBox(bb, _p.overlayBounds);
          } else {
            updateBoundsFromBox(bb, _p.bodyBounds);
          }
        }
        if (opts.includeLabels) {
          if (opts.includeMainLabels && (!isEdge || opts.includeSourceLabels && opts.includeTargetLabels)) {
            updateBoundsFromBox(bb, _p.labelBounds.all);
          } else {
            if (opts.includeMainLabels) {
              updateBoundsFromBox(bb, _p.labelBounds.mainRot);
            }
            if (opts.includeSourceLabels) {
              updateBoundsFromBox(bb, _p.labelBounds.sourceRot);
            }
            if (opts.includeTargetLabels) {
              updateBoundsFromBox(bb, _p.labelBounds.targetRot);
            }
          }
        }
        bb.w = bb.x2 - bb.x1;
        bb.h = bb.y2 - bb.y1;
      }
      return bb;
    };
    var defBbOpts = {
      includeNodes: true,
      includeEdges: true,
      includeLabels: true,
      includeMainLabels: true,
      includeSourceLabels: true,
      includeTargetLabels: true,
      includeOverlays: true,
      includeUnderlays: true,
      includeOutlines: true,
      useCache: true
    };
    var defBbOptsKey = getKey(defBbOpts);
    var filledBbOpts = defaults$g(defBbOpts);
    elesfn$b.boundingBox = function(options) {
      var bounds2;
      if (this.length === 1 && this[0]._private.bbCache != null && !this[0]._private.styleDirty && (options === void 0 || options.useCache === void 0 || options.useCache === true)) {
        if (options === void 0) {
          options = defBbOpts;
        } else {
          options = filledBbOpts(options);
        }
        bounds2 = cachedBoundingBoxImpl(this[0], options);
      } else {
        bounds2 = makeBoundingBox();
        options = options || defBbOpts;
        var opts = filledBbOpts(options);
        var eles = this;
        var cy = eles.cy();
        var styleEnabled = cy.styleEnabled();
        if (styleEnabled) {
          for (var i2 = 0; i2 < eles.length; i2++) {
            var ele = eles[i2];
            var _p = ele._private;
            var currPosKey = getBoundingBoxPosKey(ele);
            var isPosKeySame = _p.bbCachePosKey === currPosKey;
            var useCache = opts.useCache && isPosKeySame && !_p.styleDirty;
            ele.recalculateRenderedStyle(useCache);
          }
        }
        this.updateCompoundBounds(!options.useCache);
        for (var _i = 0; _i < eles.length; _i++) {
          var _ele = eles[_i];
          updateBoundsFromBox(bounds2, cachedBoundingBoxImpl(_ele, opts));
        }
      }
      bounds2.x1 = noninf(bounds2.x1);
      bounds2.y1 = noninf(bounds2.y1);
      bounds2.x2 = noninf(bounds2.x2);
      bounds2.y2 = noninf(bounds2.y2);
      bounds2.w = noninf(bounds2.x2 - bounds2.x1);
      bounds2.h = noninf(bounds2.y2 - bounds2.y1);
      return bounds2;
    };
    elesfn$b.dirtyBoundingBoxCache = function() {
      for (var i2 = 0; i2 < this.length; i2++) {
        var _p = this[i2]._private;
        _p.bbCache = null;
        _p.bbCachePosKey = null;
        _p.bodyBounds = null;
        _p.overlayBounds = null;
        _p.labelBounds.all = null;
        _p.labelBounds.source = null;
        _p.labelBounds.target = null;
        _p.labelBounds.main = null;
        _p.labelBounds.sourceRot = null;
        _p.labelBounds.targetRot = null;
        _p.labelBounds.mainRot = null;
        _p.arrowBounds.source = null;
        _p.arrowBounds.target = null;
        _p.arrowBounds["mid-source"] = null;
        _p.arrowBounds["mid-target"] = null;
      }
      this.emitAndNotify("bounds");
      return this;
    };
    elesfn$b.boundingBoxAt = function(fn2) {
      var nodes = this.nodes();
      var cy = this.cy();
      var hasCompoundNodes = cy.hasCompoundNodes();
      var parents = cy.collection();
      if (hasCompoundNodes) {
        parents = nodes.filter(function(node) {
          return node.isParent();
        });
        nodes = nodes.not(parents);
      }
      if (plainObject(fn2)) {
        var obj = fn2;
        fn2 = function fn3() {
          return obj;
        };
      }
      var storeOldPos = function storeOldPos2(node, i2) {
        return node._private.bbAtOldPos = fn2(node, i2);
      };
      var getOldPos = function getOldPos2(node) {
        return node._private.bbAtOldPos;
      };
      cy.startBatch();
      nodes.forEach(storeOldPos).silentPositions(fn2);
      if (hasCompoundNodes) {
        parents.dirtyCompoundBoundsCache();
        parents.dirtyBoundingBoxCache();
        parents.updateCompoundBounds(true);
      }
      var bb = copyBoundingBox(this.boundingBox({
        useCache: false
      }));
      nodes.silentPositions(getOldPos);
      if (hasCompoundNodes) {
        parents.dirtyCompoundBoundsCache();
        parents.dirtyBoundingBoxCache();
        parents.updateCompoundBounds(true);
      }
      cy.endBatch();
      return bb;
    };
    fn$3.boundingbox = fn$3.bb = fn$3.boundingBox;
    fn$3.renderedBoundingbox = fn$3.renderedBoundingBox;
    var bounds = elesfn$b;
    var fn$2;
    var elesfn$a;
    fn$2 = elesfn$a = {};
    var defineDimFns = function defineDimFns2(opts) {
      opts.uppercaseName = capitalize(opts.name);
      opts.autoName = "auto" + opts.uppercaseName;
      opts.labelName = "label" + opts.uppercaseName;
      opts.outerName = "outer" + opts.uppercaseName;
      opts.uppercaseOuterName = capitalize(opts.outerName);
      fn$2[opts.name] = function dimImpl() {
        var ele = this[0];
        var _p = ele._private;
        var cy = _p.cy;
        var styleEnabled = cy._private.styleEnabled;
        if (ele) {
          if (styleEnabled) {
            if (ele.isParent()) {
              ele.updateCompoundBounds();
              return _p[opts.autoName] || 0;
            }
            var d = ele.pstyle(opts.name);
            switch (d.strValue) {
              case "label":
                ele.recalculateRenderedStyle();
                return _p.rstyle[opts.labelName] || 0;
              default:
                return d.pfValue;
            }
          } else {
            return 1;
          }
        }
      };
      fn$2["outer" + opts.uppercaseName] = function outerDimImpl() {
        var ele = this[0];
        var _p = ele._private;
        var cy = _p.cy;
        var styleEnabled = cy._private.styleEnabled;
        if (ele) {
          if (styleEnabled) {
            var dim = ele[opts.name]();
            var border = ele.pstyle("border-width").pfValue;
            var padding = 2 * ele.padding();
            return dim + border + padding;
          } else {
            return 1;
          }
        }
      };
      fn$2["rendered" + opts.uppercaseName] = function renderedDimImpl() {
        var ele = this[0];
        if (ele) {
          var d = ele[opts.name]();
          return d * this.cy().zoom();
        }
      };
      fn$2["rendered" + opts.uppercaseOuterName] = function renderedOuterDimImpl() {
        var ele = this[0];
        if (ele) {
          var od = ele[opts.outerName]();
          return od * this.cy().zoom();
        }
      };
    };
    defineDimFns({
      name: "width"
    });
    defineDimFns({
      name: "height"
    });
    elesfn$a.padding = function() {
      var ele = this[0];
      var _p = ele._private;
      if (ele.isParent()) {
        ele.updateCompoundBounds();
        if (_p.autoPadding !== void 0) {
          return _p.autoPadding;
        } else {
          return ele.pstyle("padding").pfValue;
        }
      } else {
        return ele.pstyle("padding").pfValue;
      }
    };
    elesfn$a.paddedHeight = function() {
      var ele = this[0];
      return ele.height() + 2 * ele.padding();
    };
    elesfn$a.paddedWidth = function() {
      var ele = this[0];
      return ele.width() + 2 * ele.padding();
    };
    var widthHeight = elesfn$a;
    var ifEdge = function ifEdge2(ele, getValue2) {
      if (ele.isEdge()) {
        return getValue2(ele);
      }
    };
    var ifEdgeRenderedPosition = function ifEdgeRenderedPosition2(ele, getPoint) {
      if (ele.isEdge()) {
        var cy = ele.cy();
        return modelToRenderedPosition(getPoint(ele), cy.zoom(), cy.pan());
      }
    };
    var ifEdgeRenderedPositions = function ifEdgeRenderedPositions2(ele, getPoints) {
      if (ele.isEdge()) {
        var cy = ele.cy();
        var pan = cy.pan();
        var zoom = cy.zoom();
        return getPoints(ele).map(function(p2) {
          return modelToRenderedPosition(p2, zoom, pan);
        });
      }
    };
    var controlPoints = function controlPoints2(ele) {
      return ele.renderer().getControlPoints(ele);
    };
    var segmentPoints = function segmentPoints2(ele) {
      return ele.renderer().getSegmentPoints(ele);
    };
    var sourceEndpoint = function sourceEndpoint2(ele) {
      return ele.renderer().getSourceEndpoint(ele);
    };
    var targetEndpoint = function targetEndpoint2(ele) {
      return ele.renderer().getTargetEndpoint(ele);
    };
    var midpoint = function midpoint2(ele) {
      return ele.renderer().getEdgeMidpoint(ele);
    };
    var pts = {
      controlPoints: {
        get: controlPoints,
        mult: true
      },
      segmentPoints: {
        get: segmentPoints,
        mult: true
      },
      sourceEndpoint: {
        get: sourceEndpoint
      },
      targetEndpoint: {
        get: targetEndpoint
      },
      midpoint: {
        get: midpoint
      }
    };
    var renderedName = function renderedName2(name) {
      return "rendered" + name[0].toUpperCase() + name.substr(1);
    };
    var edgePoints = Object.keys(pts).reduce(function(obj, name) {
      var spec = pts[name];
      var rName = renderedName(name);
      obj[name] = function() {
        return ifEdge(this, spec.get);
      };
      if (spec.mult) {
        obj[rName] = function() {
          return ifEdgeRenderedPositions(this, spec.get);
        };
      } else {
        obj[rName] = function() {
          return ifEdgeRenderedPosition(this, spec.get);
        };
      }
      return obj;
    }, {});
    var dimensions = extend({}, position, bounds, widthHeight, edgePoints);
    var Event = function Event2(src, props) {
      this.recycle(src, props);
    };
    function returnFalse() {
      return false;
    }
    function returnTrue() {
      return true;
    }
    Event.prototype = {
      instanceString: function instanceString() {
        return "event";
      },
      recycle: function recycle(src, props) {
        this.isImmediatePropagationStopped = this.isPropagationStopped = this.isDefaultPrevented = returnFalse;
        if (src != null && src.preventDefault) {
          this.type = src.type;
          this.isDefaultPrevented = src.defaultPrevented ? returnTrue : returnFalse;
        } else if (src != null && src.type) {
          props = src;
        } else {
          this.type = src;
        }
        if (props != null) {
          this.originalEvent = props.originalEvent;
          this.type = props.type != null ? props.type : this.type;
          this.cy = props.cy;
          this.target = props.target;
          this.position = props.position;
          this.renderedPosition = props.renderedPosition;
          this.namespace = props.namespace;
          this.layout = props.layout;
        }
        if (this.cy != null && this.position != null && this.renderedPosition == null) {
          var pos = this.position;
          var zoom = this.cy.zoom();
          var pan = this.cy.pan();
          this.renderedPosition = {
            x: pos.x * zoom + pan.x,
            y: pos.y * zoom + pan.y
          };
        }
        this.timeStamp = src && src.timeStamp || Date.now();
      },
      preventDefault: function preventDefault() {
        this.isDefaultPrevented = returnTrue;
        var e = this.originalEvent;
        if (!e) {
          return;
        }
        if (e.preventDefault) {
          e.preventDefault();
        }
      },
      stopPropagation: function stopPropagation() {
        this.isPropagationStopped = returnTrue;
        var e = this.originalEvent;
        if (!e) {
          return;
        }
        if (e.stopPropagation) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function stopImmediatePropagation() {
        this.isImmediatePropagationStopped = returnTrue;
        this.stopPropagation();
      },
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse
    };
    var eventRegex = /^([^.]+)(\.(?:[^.]+))?$/;
    var universalNamespace = ".*";
    var defaults$8 = {
      qualifierCompare: function qualifierCompare(q1, q2) {
        return q1 === q2;
      },
      eventMatches: function eventMatches() {
        return true;
      },
      addEventFields: function addEventFields() {
      },
      callbackContext: function callbackContext(context) {
        return context;
      },
      beforeEmit: function beforeEmit() {
      },
      afterEmit: function afterEmit() {
      },
      bubble: function bubble() {
        return false;
      },
      parent: function parent() {
        return null;
      },
      context: null
    };
    var defaultsKeys = Object.keys(defaults$8);
    var emptyOpts = {};
    function Emitter() {
      var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : emptyOpts;
      var context = arguments.length > 1 ? arguments[1] : void 0;
      for (var i2 = 0; i2 < defaultsKeys.length; i2++) {
        var key = defaultsKeys[i2];
        this[key] = opts[key] || defaults$8[key];
      }
      this.context = context || this.context;
      this.listeners = [];
      this.emitting = 0;
    }
    var p = Emitter.prototype;
    var forEachEvent = function forEachEvent2(self2, handler, events, qualifier, callback, conf, confOverrides) {
      if (fn$6(qualifier)) {
        callback = qualifier;
        qualifier = null;
      }
      if (confOverrides) {
        if (conf == null) {
          conf = confOverrides;
        } else {
          conf = extend({}, conf, confOverrides);
        }
      }
      var eventList = array(events) ? events : events.split(/\s+/);
      for (var i2 = 0; i2 < eventList.length; i2++) {
        var evt = eventList[i2];
        if (emptyString(evt)) {
          continue;
        }
        var match2 = evt.match(eventRegex);
        if (match2) {
          var type = match2[1];
          var namespace = match2[2] ? match2[2] : null;
          var ret = handler(self2, evt, type, namespace, qualifier, callback, conf);
          if (ret === false) {
            break;
          }
        }
      }
    };
    var makeEventObj = function makeEventObj2(self2, obj) {
      self2.addEventFields(self2.context, obj);
      return new Event(obj.type, obj);
    };
    var forEachEventObj = function forEachEventObj2(self2, handler, events) {
      if (event(events)) {
        handler(self2, events);
        return;
      } else if (plainObject(events)) {
        handler(self2, makeEventObj(self2, events));
        return;
      }
      var eventList = array(events) ? events : events.split(/\s+/);
      for (var i2 = 0; i2 < eventList.length; i2++) {
        var evt = eventList[i2];
        if (emptyString(evt)) {
          continue;
        }
        var match2 = evt.match(eventRegex);
        if (match2) {
          var type = match2[1];
          var namespace = match2[2] ? match2[2] : null;
          var eventObj = makeEventObj(self2, {
            type,
            namespace,
            target: self2.context
          });
          handler(self2, eventObj);
        }
      }
    };
    p.on = p.addListener = function(events, qualifier, callback, conf, confOverrides) {
      forEachEvent(this, function(self2, event2, type, namespace, qualifier2, callback2, conf2) {
        if (fn$6(callback2)) {
          self2.listeners.push({
            event: event2,
            // full event string
            callback: callback2,
            // callback to run
            type,
            // the event type (e.g. 'click')
            namespace,
            // the event namespace (e.g. ".foo")
            qualifier: qualifier2,
            // a restriction on whether to match this emitter
            conf: conf2
            // additional configuration
          });
        }
      }, events, qualifier, callback, conf, confOverrides);
      return this;
    };
    p.one = function(events, qualifier, callback, conf) {
      return this.on(events, qualifier, callback, conf, {
        one: true
      });
    };
    p.removeListener = p.off = function(events, qualifier, callback, conf) {
      var _this = this;
      if (this.emitting !== 0) {
        this.listeners = copyArray(this.listeners);
      }
      var listeners = this.listeners;
      var _loop = function _loop2(i3) {
        var listener = listeners[i3];
        forEachEvent(_this, function(self2, event2, type, namespace, qualifier2, callback2) {
          if ((listener.type === type || events === "*") && (!namespace && listener.namespace !== ".*" || listener.namespace === namespace) && (!qualifier2 || self2.qualifierCompare(listener.qualifier, qualifier2)) && (!callback2 || listener.callback === callback2)) {
            listeners.splice(i3, 1);
            return false;
          }
        }, events, qualifier, callback, conf);
      };
      for (var i2 = listeners.length - 1; i2 >= 0; i2--) {
        _loop(i2);
      }
      return this;
    };
    p.removeAllListeners = function() {
      return this.removeListener("*");
    };
    p.emit = p.trigger = function(events, extraParams, manualCallback) {
      var listeners = this.listeners;
      var numListenersBeforeEmit = listeners.length;
      this.emitting++;
      if (!array(extraParams)) {
        extraParams = [extraParams];
      }
      forEachEventObj(this, function(self2, eventObj) {
        if (manualCallback != null) {
          listeners = [{
            event: eventObj.event,
            type: eventObj.type,
            namespace: eventObj.namespace,
            callback: manualCallback
          }];
          numListenersBeforeEmit = listeners.length;
        }
        var _loop2 = function _loop22(i3) {
          var listener = listeners[i3];
          if (listener.type === eventObj.type && (!listener.namespace || listener.namespace === eventObj.namespace || listener.namespace === universalNamespace) && self2.eventMatches(self2.context, listener, eventObj)) {
            var args = [eventObj];
            if (extraParams != null) {
              push(args, extraParams);
            }
            self2.beforeEmit(self2.context, listener, eventObj);
            if (listener.conf && listener.conf.one) {
              self2.listeners = self2.listeners.filter(function(l) {
                return l !== listener;
              });
            }
            var context = self2.callbackContext(self2.context, listener, eventObj);
            var ret = listener.callback.apply(context, args);
            self2.afterEmit(self2.context, listener, eventObj);
            if (ret === false) {
              eventObj.stopPropagation();
              eventObj.preventDefault();
            }
          }
        };
        for (var i2 = 0; i2 < numListenersBeforeEmit; i2++) {
          _loop2(i2);
        }
        if (self2.bubble(self2.context) && !eventObj.isPropagationStopped()) {
          self2.parent(self2.context).emit(eventObj, extraParams);
        }
      }, events);
      this.emitting--;
      return this;
    };
    var emitterOptions$1 = {
      qualifierCompare: function qualifierCompare(selector1, selector2) {
        if (selector1 == null || selector2 == null) {
          return selector1 == null && selector2 == null;
        } else {
          return selector1.sameText(selector2);
        }
      },
      eventMatches: function eventMatches(ele, listener, eventObj) {
        var selector = listener.qualifier;
        if (selector != null) {
          return ele !== eventObj.target && element(eventObj.target) && selector.matches(eventObj.target);
        }
        return true;
      },
      addEventFields: function addEventFields(ele, evt) {
        evt.cy = ele.cy();
        evt.target = ele;
      },
      callbackContext: function callbackContext(ele, listener, eventObj) {
        return listener.qualifier != null ? eventObj.target : ele;
      },
      beforeEmit: function beforeEmit(context, listener) {
        if (listener.conf && listener.conf.once) {
          listener.conf.onceCollection.removeListener(listener.event, listener.qualifier, listener.callback);
        }
      },
      bubble: function bubble() {
        return true;
      },
      parent: function parent(ele) {
        return ele.isChild() ? ele.parent() : ele.cy();
      }
    };
    var argSelector$1 = function argSelector2(arg) {
      if (string(arg)) {
        return new Selector(arg);
      } else {
        return arg;
      }
    };
    var elesfn$9 = {
      createEmitter: function createEmitter() {
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          var _p = ele._private;
          if (!_p.emitter) {
            _p.emitter = new Emitter(emitterOptions$1, ele);
          }
        }
        return this;
      },
      emitter: function emitter() {
        return this._private.emitter;
      },
      on: function on(events, selector, callback) {
        var argSel = argSelector$1(selector);
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          ele.emitter().on(events, argSel, callback);
        }
        return this;
      },
      removeListener: function removeListener(events, selector, callback) {
        var argSel = argSelector$1(selector);
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          ele.emitter().removeListener(events, argSel, callback);
        }
        return this;
      },
      removeAllListeners: function removeAllListeners() {
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          ele.emitter().removeAllListeners();
        }
        return this;
      },
      one: function one(events, selector, callback) {
        var argSel = argSelector$1(selector);
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          ele.emitter().one(events, argSel, callback);
        }
        return this;
      },
      once: function once(events, selector, callback) {
        var argSel = argSelector$1(selector);
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          ele.emitter().on(events, argSel, callback, {
            once: true,
            onceCollection: this
          });
        }
      },
      emit: function emit(events, extraParams) {
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          ele.emitter().emit(events, extraParams);
        }
        return this;
      },
      emitAndNotify: function emitAndNotify(event2, extraParams) {
        if (this.length === 0) {
          return;
        }
        this.cy().notify(event2, this);
        this.emit(event2, extraParams);
        return this;
      }
    };
    define2.eventAliasesOn(elesfn$9);
    var elesfn$8 = {
      nodes: function nodes(selector) {
        return this.filter(function(ele) {
          return ele.isNode();
        }).filter(selector);
      },
      edges: function edges(selector) {
        return this.filter(function(ele) {
          return ele.isEdge();
        }).filter(selector);
      },
      // internal helper to get nodes and edges as separate collections with single iteration over elements
      byGroup: function byGroup() {
        var nodes = this.spawn();
        var edges = this.spawn();
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          if (ele.isNode()) {
            nodes.push(ele);
          } else {
            edges.push(ele);
          }
        }
        return {
          nodes,
          edges
        };
      },
      filter: function filter2(_filter, thisArg) {
        if (_filter === void 0) {
          return this;
        } else if (string(_filter) || elementOrCollection(_filter)) {
          return new Selector(_filter).filter(this);
        } else if (fn$6(_filter)) {
          var filterEles = this.spawn();
          var eles = this;
          for (var i2 = 0; i2 < eles.length; i2++) {
            var ele = eles[i2];
            var include = thisArg ? _filter.apply(thisArg, [ele, i2, eles]) : _filter(ele, i2, eles);
            if (include) {
              filterEles.push(ele);
            }
          }
          return filterEles;
        }
        return this.spawn();
      },
      not: function not(toRemove) {
        if (!toRemove) {
          return this;
        } else {
          if (string(toRemove)) {
            toRemove = this.filter(toRemove);
          }
          var elements = this.spawn();
          for (var i2 = 0; i2 < this.length; i2++) {
            var element2 = this[i2];
            var remove = toRemove.has(element2);
            if (!remove) {
              elements.push(element2);
            }
          }
          return elements;
        }
      },
      absoluteComplement: function absoluteComplement() {
        var cy = this.cy();
        return cy.mutableElements().not(this);
      },
      intersect: function intersect(other) {
        if (string(other)) {
          var selector = other;
          return this.filter(selector);
        }
        var elements = this.spawn();
        var col1 = this;
        var col2 = other;
        var col1Smaller = this.length < other.length;
        var colS = col1Smaller ? col1 : col2;
        var colL = col1Smaller ? col2 : col1;
        for (var i2 = 0; i2 < colS.length; i2++) {
          var ele = colS[i2];
          if (colL.has(ele)) {
            elements.push(ele);
          }
        }
        return elements;
      },
      xor: function xor(other) {
        var cy = this._private.cy;
        if (string(other)) {
          other = cy.$(other);
        }
        var elements = this.spawn();
        var col1 = this;
        var col2 = other;
        var add = function add2(col, other2) {
          for (var i2 = 0; i2 < col.length; i2++) {
            var ele = col[i2];
            var id = ele._private.data.id;
            var inOther = other2.hasElementWithId(id);
            if (!inOther) {
              elements.push(ele);
            }
          }
        };
        add(col1, col2);
        add(col2, col1);
        return elements;
      },
      diff: function diff(other) {
        var cy = this._private.cy;
        if (string(other)) {
          other = cy.$(other);
        }
        var left = this.spawn();
        var right = this.spawn();
        var both = this.spawn();
        var col1 = this;
        var col2 = other;
        var add = function add2(col, other2, retEles) {
          for (var i2 = 0; i2 < col.length; i2++) {
            var ele = col[i2];
            var id = ele._private.data.id;
            var inOther = other2.hasElementWithId(id);
            if (inOther) {
              both.merge(ele);
            } else {
              retEles.push(ele);
            }
          }
        };
        add(col1, col2, left);
        add(col2, col1, right);
        return {
          left,
          right,
          both
        };
      },
      add: function add(toAdd) {
        var cy = this._private.cy;
        if (!toAdd) {
          return this;
        }
        if (string(toAdd)) {
          var selector = toAdd;
          toAdd = cy.mutableElements().filter(selector);
        }
        var elements = this.spawnSelf();
        for (var i2 = 0; i2 < toAdd.length; i2++) {
          var ele = toAdd[i2];
          var add2 = !this.has(ele);
          if (add2) {
            elements.push(ele);
          }
        }
        return elements;
      },
      // in place merge on calling collection
      merge: function merge(toAdd) {
        var _p = this._private;
        var cy = _p.cy;
        if (!toAdd) {
          return this;
        }
        if (toAdd && string(toAdd)) {
          var selector = toAdd;
          toAdd = cy.mutableElements().filter(selector);
        }
        var map = _p.map;
        for (var i2 = 0; i2 < toAdd.length; i2++) {
          var toAddEle = toAdd[i2];
          var id = toAddEle._private.data.id;
          var add = !map.has(id);
          if (add) {
            var index = this.length++;
            this[index] = toAddEle;
            map.set(id, {
              ele: toAddEle,
              index
            });
          }
        }
        return this;
      },
      unmergeAt: function unmergeAt(i2) {
        var ele = this[i2];
        var id = ele.id();
        var _p = this._private;
        var map = _p.map;
        this[i2] = void 0;
        map["delete"](id);
        var unmergedLastEle = i2 === this.length - 1;
        if (this.length > 1 && !unmergedLastEle) {
          var lastEleI = this.length - 1;
          var lastEle = this[lastEleI];
          var lastEleId = lastEle._private.data.id;
          this[lastEleI] = void 0;
          this[i2] = lastEle;
          map.set(lastEleId, {
            ele: lastEle,
            index: i2
          });
        }
        this.length--;
        return this;
      },
      // remove single ele in place in calling collection
      unmergeOne: function unmergeOne(ele) {
        ele = ele[0];
        var _p = this._private;
        var id = ele._private.data.id;
        var map = _p.map;
        var entry = map.get(id);
        if (!entry) {
          return this;
        }
        var i2 = entry.index;
        this.unmergeAt(i2);
        return this;
      },
      // remove eles in place on calling collection
      unmerge: function unmerge(toRemove) {
        var cy = this._private.cy;
        if (!toRemove) {
          return this;
        }
        if (toRemove && string(toRemove)) {
          var selector = toRemove;
          toRemove = cy.mutableElements().filter(selector);
        }
        for (var i2 = 0; i2 < toRemove.length; i2++) {
          this.unmergeOne(toRemove[i2]);
        }
        return this;
      },
      unmergeBy: function unmergeBy(toRmFn) {
        for (var i2 = this.length - 1; i2 >= 0; i2--) {
          var ele = this[i2];
          if (toRmFn(ele)) {
            this.unmergeAt(i2);
          }
        }
        return this;
      },
      map: function map(mapFn, thisArg) {
        var arr = [];
        var eles = this;
        for (var i2 = 0; i2 < eles.length; i2++) {
          var ele = eles[i2];
          var ret = thisArg ? mapFn.apply(thisArg, [ele, i2, eles]) : mapFn(ele, i2, eles);
          arr.push(ret);
        }
        return arr;
      },
      reduce: function reduce(fn2, initialValue) {
        var val = initialValue;
        var eles = this;
        for (var i2 = 0; i2 < eles.length; i2++) {
          val = fn2(val, eles[i2], i2, eles);
        }
        return val;
      },
      max: function max2(valFn, thisArg) {
        var max3 = -Infinity;
        var maxEle;
        var eles = this;
        for (var i2 = 0; i2 < eles.length; i2++) {
          var ele = eles[i2];
          var val = thisArg ? valFn.apply(thisArg, [ele, i2, eles]) : valFn(ele, i2, eles);
          if (val > max3) {
            max3 = val;
            maxEle = ele;
          }
        }
        return {
          value: max3,
          ele: maxEle
        };
      },
      min: function min2(valFn, thisArg) {
        var min3 = Infinity;
        var minEle;
        var eles = this;
        for (var i2 = 0; i2 < eles.length; i2++) {
          var ele = eles[i2];
          var val = thisArg ? valFn.apply(thisArg, [ele, i2, eles]) : valFn(ele, i2, eles);
          if (val < min3) {
            min3 = val;
            minEle = ele;
          }
        }
        return {
          value: min3,
          ele: minEle
        };
      }
    };
    var fn$1 = elesfn$8;
    fn$1["u"] = fn$1["|"] = fn$1["+"] = fn$1.union = fn$1.or = fn$1.add;
    fn$1["\\"] = fn$1["!"] = fn$1["-"] = fn$1.difference = fn$1.relativeComplement = fn$1.subtract = fn$1.not;
    fn$1["n"] = fn$1["&"] = fn$1["."] = fn$1.and = fn$1.intersection = fn$1.intersect;
    fn$1["^"] = fn$1["(+)"] = fn$1["(-)"] = fn$1.symmetricDifference = fn$1.symdiff = fn$1.xor;
    fn$1.fnFilter = fn$1.filterFn = fn$1.stdFilter = fn$1.filter;
    fn$1.complement = fn$1.abscomp = fn$1.absoluteComplement;
    var elesfn$7 = {
      isNode: function isNode() {
        return this.group() === "nodes";
      },
      isEdge: function isEdge() {
        return this.group() === "edges";
      },
      isLoop: function isLoop() {
        return this.isEdge() && this.source()[0] === this.target()[0];
      },
      isSimple: function isSimple() {
        return this.isEdge() && this.source()[0] !== this.target()[0];
      },
      group: function group() {
        var ele = this[0];
        if (ele) {
          return ele._private.group;
        }
      }
    };
    var zIndexSort = function zIndexSort2(a, b) {
      var cy = a.cy();
      var hasCompoundNodes = cy.hasCompoundNodes();
      function getDepth(ele) {
        var style = ele.pstyle("z-compound-depth");
        if (style.value === "auto") {
          return hasCompoundNodes ? ele.zDepth() : 0;
        } else if (style.value === "bottom") {
          return -1;
        } else if (style.value === "top") {
          return MAX_INT$1;
        }
        return 0;
      }
      var depthDiff = getDepth(a) - getDepth(b);
      if (depthDiff !== 0) {
        return depthDiff;
      }
      function getEleDepth(ele) {
        var style = ele.pstyle("z-index-compare");
        if (style.value === "auto") {
          return ele.isNode() ? 1 : 0;
        }
        return 0;
      }
      var eleDiff = getEleDepth(a) - getEleDepth(b);
      if (eleDiff !== 0) {
        return eleDiff;
      }
      var zDiff = a.pstyle("z-index").value - b.pstyle("z-index").value;
      if (zDiff !== 0) {
        return zDiff;
      }
      return a.poolIndex() - b.poolIndex();
    };
    var elesfn$6 = {
      forEach: function forEach(fn2, thisArg) {
        if (fn$6(fn2)) {
          var N = this.length;
          for (var i2 = 0; i2 < N; i2++) {
            var ele = this[i2];
            var ret = thisArg ? fn2.apply(thisArg, [ele, i2, this]) : fn2(ele, i2, this);
            if (ret === false) {
              break;
            }
          }
        }
        return this;
      },
      toArray: function toArray() {
        var array2 = [];
        for (var i2 = 0; i2 < this.length; i2++) {
          array2.push(this[i2]);
        }
        return array2;
      },
      slice: function slice(start, end) {
        var array2 = [];
        var thisSize = this.length;
        if (end == null) {
          end = thisSize;
        }
        if (start == null) {
          start = 0;
        }
        if (start < 0) {
          start = thisSize + start;
        }
        if (end < 0) {
          end = thisSize + end;
        }
        for (var i2 = start; i2 >= 0 && i2 < end && i2 < thisSize; i2++) {
          array2.push(this[i2]);
        }
        return this.spawn(array2);
      },
      size: function size() {
        return this.length;
      },
      eq: function eq(i2) {
        return this[i2] || this.spawn();
      },
      first: function first() {
        return this[0] || this.spawn();
      },
      last: function last() {
        return this[this.length - 1] || this.spawn();
      },
      empty: function empty() {
        return this.length === 0;
      },
      nonempty: function nonempty() {
        return !this.empty();
      },
      sort: function sort(sortFn) {
        if (!fn$6(sortFn)) {
          return this;
        }
        var sorted = this.toArray().sort(sortFn);
        return this.spawn(sorted);
      },
      sortByZIndex: function sortByZIndex() {
        return this.sort(zIndexSort);
      },
      zDepth: function zDepth() {
        var ele = this[0];
        if (!ele) {
          return void 0;
        }
        var _p = ele._private;
        var group = _p.group;
        if (group === "nodes") {
          var depth = _p.data.parent ? ele.parents().size() : 0;
          if (!ele.isParent()) {
            return MAX_INT$1 - 1;
          }
          return depth;
        } else {
          var src = _p.source;
          var tgt = _p.target;
          var srcDepth = src.zDepth();
          var tgtDepth = tgt.zDepth();
          return Math.max(srcDepth, tgtDepth, 0);
        }
      }
    };
    elesfn$6.each = elesfn$6.forEach;
    var defineSymbolIterator = function defineSymbolIterator2() {
      var typeofUndef = "undefined";
      var isIteratorSupported = (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) != typeofUndef && _typeof(Symbol.iterator) != typeofUndef;
      if (isIteratorSupported) {
        elesfn$6[Symbol.iterator] = function() {
          var _this = this;
          var entry = {
            value: void 0,
            done: false
          };
          var i2 = 0;
          var length = this.length;
          return _defineProperty({
            next: function next() {
              if (i2 < length) {
                entry.value = _this[i2++];
              } else {
                entry.value = void 0;
                entry.done = true;
              }
              return entry;
            }
          }, Symbol.iterator, function() {
            return this;
          });
        };
      }
    };
    defineSymbolIterator();
    var getLayoutDimensionOptions = defaults$g({
      nodeDimensionsIncludeLabels: false
    });
    var elesfn$5 = {
      // Calculates and returns node dimensions { x, y } based on options given
      layoutDimensions: function layoutDimensions(options) {
        options = getLayoutDimensionOptions(options);
        var dims;
        if (!this.takesUpSpace()) {
          dims = {
            w: 0,
            h: 0
          };
        } else if (options.nodeDimensionsIncludeLabels) {
          var bbDim = this.boundingBox();
          dims = {
            w: bbDim.w,
            h: bbDim.h
          };
        } else {
          dims = {
            w: this.outerWidth(),
            h: this.outerHeight()
          };
        }
        if (dims.w === 0 || dims.h === 0) {
          dims.w = dims.h = 1;
        }
        return dims;
      },
      // using standard layout options, apply position function (w/ or w/o animation)
      layoutPositions: function layoutPositions(layout2, options, fn2) {
        var nodes = this.nodes().filter(function(n) {
          return !n.isParent();
        });
        var cy = this.cy();
        var layoutEles = options.eles;
        var getMemoizeKey = function getMemoizeKey2(node2) {
          return node2.id();
        };
        var fnMem = memoize(fn2, getMemoizeKey);
        layout2.emit({
          type: "layoutstart",
          layout: layout2
        });
        layout2.animations = [];
        var calculateSpacing = function calculateSpacing2(spacing, nodesBb, pos) {
          var center = {
            x: nodesBb.x1 + nodesBb.w / 2,
            y: nodesBb.y1 + nodesBb.h / 2
          };
          var spacingVector = {
            // scale from center of bounding box (not necessarily 0,0)
            x: (pos.x - center.x) * spacing,
            y: (pos.y - center.y) * spacing
          };
          return {
            x: center.x + spacingVector.x,
            y: center.y + spacingVector.y
          };
        };
        var useSpacingFactor = options.spacingFactor && options.spacingFactor !== 1;
        var spacingBb = function spacingBb2() {
          if (!useSpacingFactor) {
            return null;
          }
          var bb2 = makeBoundingBox();
          for (var i3 = 0; i3 < nodes.length; i3++) {
            var node2 = nodes[i3];
            var pos = fnMem(node2, i3);
            expandBoundingBoxByPoint(bb2, pos.x, pos.y);
          }
          return bb2;
        };
        var bb = spacingBb();
        var getFinalPos = memoize(function(node2, i3) {
          var newPos2 = fnMem(node2, i3);
          if (useSpacingFactor) {
            var spacing = Math.abs(options.spacingFactor);
            newPos2 = calculateSpacing(spacing, bb, newPos2);
          }
          if (options.transform != null) {
            newPos2 = options.transform(node2, newPos2);
          }
          return newPos2;
        }, getMemoizeKey);
        if (options.animate) {
          for (var i2 = 0; i2 < nodes.length; i2++) {
            var node = nodes[i2];
            var newPos = getFinalPos(node, i2);
            var animateNode = options.animateFilter == null || options.animateFilter(node, i2);
            if (animateNode) {
              var ani = node.animation({
                position: newPos,
                duration: options.animationDuration,
                easing: options.animationEasing
              });
              layout2.animations.push(ani);
            } else {
              node.position(newPos);
            }
          }
          if (options.fit) {
            var fitAni = cy.animation({
              fit: {
                boundingBox: layoutEles.boundingBoxAt(getFinalPos),
                padding: options.padding
              },
              duration: options.animationDuration,
              easing: options.animationEasing
            });
            layout2.animations.push(fitAni);
          } else if (options.zoom !== void 0 && options.pan !== void 0) {
            var zoomPanAni = cy.animation({
              zoom: options.zoom,
              pan: options.pan,
              duration: options.animationDuration,
              easing: options.animationEasing
            });
            layout2.animations.push(zoomPanAni);
          }
          layout2.animations.forEach(function(ani2) {
            return ani2.play();
          });
          layout2.one("layoutready", options.ready);
          layout2.emit({
            type: "layoutready",
            layout: layout2
          });
          Promise$1.all(layout2.animations.map(function(ani2) {
            return ani2.promise();
          })).then(function() {
            layout2.one("layoutstop", options.stop);
            layout2.emit({
              type: "layoutstop",
              layout: layout2
            });
          });
        } else {
          nodes.positions(getFinalPos);
          if (options.fit) {
            cy.fit(options.eles, options.padding);
          }
          if (options.zoom != null) {
            cy.zoom(options.zoom);
          }
          if (options.pan) {
            cy.pan(options.pan);
          }
          layout2.one("layoutready", options.ready);
          layout2.emit({
            type: "layoutready",
            layout: layout2
          });
          layout2.one("layoutstop", options.stop);
          layout2.emit({
            type: "layoutstop",
            layout: layout2
          });
        }
        return this;
      },
      layout: function layout2(options) {
        var cy = this.cy();
        return cy.makeLayout(extend({}, options, {
          eles: this
        }));
      }
    };
    elesfn$5.createLayout = elesfn$5.makeLayout = elesfn$5.layout;
    function styleCache(key, fn2, ele) {
      var _p = ele._private;
      var cache2 = _p.styleCache = _p.styleCache || [];
      var val;
      if ((val = cache2[key]) != null) {
        return val;
      } else {
        val = cache2[key] = fn2(ele);
        return val;
      }
    }
    function cacheStyleFunction(key, fn2) {
      key = hashString(key);
      return function cachedStyleFunction(ele) {
        return styleCache(key, fn2, ele);
      };
    }
    function cachePrototypeStyleFunction(key, fn2) {
      key = hashString(key);
      var selfFn = function selfFn2(ele) {
        return fn2.call(ele);
      };
      return function cachedPrototypeStyleFunction() {
        var ele = this[0];
        if (ele) {
          return styleCache(key, selfFn, ele);
        }
      };
    }
    var elesfn$4 = {
      recalculateRenderedStyle: function recalculateRenderedStyle(useCache) {
        var cy = this.cy();
        var renderer2 = cy.renderer();
        var styleEnabled = cy.styleEnabled();
        if (renderer2 && styleEnabled) {
          renderer2.recalculateRenderedStyle(this, useCache);
        }
        return this;
      },
      dirtyStyleCache: function dirtyStyleCache() {
        var cy = this.cy();
        var dirty = function dirty2(ele) {
          return ele._private.styleCache = null;
        };
        if (cy.hasCompoundNodes()) {
          var eles;
          eles = this.spawnSelf().merge(this.descendants()).merge(this.parents());
          eles.merge(eles.connectedEdges());
          eles.forEach(dirty);
        } else {
          this.forEach(function(ele) {
            dirty(ele);
            ele.connectedEdges().forEach(dirty);
          });
        }
        return this;
      },
      // fully updates (recalculates) the style for the elements
      updateStyle: function updateStyle(notifyRenderer) {
        var cy = this._private.cy;
        if (!cy.styleEnabled()) {
          return this;
        }
        if (cy.batching()) {
          var bEles = cy._private.batchStyleEles;
          bEles.merge(this);
          return this;
        }
        var hasCompounds = cy.hasCompoundNodes();
        var updatedEles = this;
        notifyRenderer = notifyRenderer || notifyRenderer === void 0 ? true : false;
        if (hasCompounds) {
          updatedEles = this.spawnSelf().merge(this.descendants()).merge(this.parents());
        }
        var changedEles = updatedEles;
        if (notifyRenderer) {
          changedEles.emitAndNotify("style");
        } else {
          changedEles.emit("style");
        }
        updatedEles.forEach(function(ele) {
          return ele._private.styleDirty = true;
        });
        return this;
      },
      // private: clears dirty flag and recalculates style
      cleanStyle: function cleanStyle() {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return;
        }
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          if (ele._private.styleDirty) {
            ele._private.styleDirty = false;
            cy.style().apply(ele);
          }
        }
      },
      // get the internal parsed style object for the specified property
      parsedStyle: function parsedStyle(property) {
        var includeNonDefault = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var ele = this[0];
        var cy = ele.cy();
        if (!cy.styleEnabled()) {
          return;
        }
        if (ele) {
          this.cleanStyle();
          var overriddenStyle = ele._private.style[property];
          if (overriddenStyle != null) {
            return overriddenStyle;
          } else if (includeNonDefault) {
            return cy.style().getDefaultProperty(property);
          } else {
            return null;
          }
        }
      },
      numericStyle: function numericStyle(property) {
        var ele = this[0];
        if (!ele.cy().styleEnabled()) {
          return;
        }
        if (ele) {
          var pstyle = ele.pstyle(property);
          return pstyle.pfValue !== void 0 ? pstyle.pfValue : pstyle.value;
        }
      },
      numericStyleUnits: function numericStyleUnits(property) {
        var ele = this[0];
        if (!ele.cy().styleEnabled()) {
          return;
        }
        if (ele) {
          return ele.pstyle(property).units;
        }
      },
      // get the specified css property as a rendered value (i.e. on-screen value)
      // or get the whole rendered style if no property specified (NB doesn't allow setting)
      renderedStyle: function renderedStyle(property) {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return this;
        }
        var ele = this[0];
        if (ele) {
          return cy.style().getRenderedStyle(ele, property);
        }
      },
      // read the calculated css style of the element or override the style (via a bypass)
      style: function style(name, value) {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return this;
        }
        var updateTransitions = false;
        var style2 = cy.style();
        if (plainObject(name)) {
          var props = name;
          style2.applyBypass(this, props, updateTransitions);
          this.emitAndNotify("style");
        } else if (string(name)) {
          if (value === void 0) {
            var ele = this[0];
            if (ele) {
              return style2.getStylePropertyValue(ele, name);
            } else {
              return;
            }
          } else {
            style2.applyBypass(this, name, value, updateTransitions);
            this.emitAndNotify("style");
          }
        } else if (name === void 0) {
          var _ele = this[0];
          if (_ele) {
            return style2.getRawStyle(_ele);
          } else {
            return;
          }
        }
        return this;
      },
      removeStyle: function removeStyle(names) {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return this;
        }
        var updateTransitions = false;
        var style = cy.style();
        var eles = this;
        if (names === void 0) {
          for (var i2 = 0; i2 < eles.length; i2++) {
            var ele = eles[i2];
            style.removeAllBypasses(ele, updateTransitions);
          }
        } else {
          names = names.split(/\s+/);
          for (var _i = 0; _i < eles.length; _i++) {
            var _ele2 = eles[_i];
            style.removeBypasses(_ele2, names, updateTransitions);
          }
        }
        this.emitAndNotify("style");
        return this;
      },
      show: function show() {
        this.css("display", "element");
        return this;
      },
      hide: function hide() {
        this.css("display", "none");
        return this;
      },
      effectiveOpacity: function effectiveOpacity() {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return 1;
        }
        var hasCompoundNodes = cy.hasCompoundNodes();
        var ele = this[0];
        if (ele) {
          var _p = ele._private;
          var parentOpacity = ele.pstyle("opacity").value;
          if (!hasCompoundNodes) {
            return parentOpacity;
          }
          var parents = !_p.data.parent ? null : ele.parents();
          if (parents) {
            for (var i2 = 0; i2 < parents.length; i2++) {
              var parent = parents[i2];
              var opacity = parent.pstyle("opacity").value;
              parentOpacity = opacity * parentOpacity;
            }
          }
          return parentOpacity;
        }
      },
      transparent: function transparent() {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return false;
        }
        var ele = this[0];
        var hasCompoundNodes = ele.cy().hasCompoundNodes();
        if (ele) {
          if (!hasCompoundNodes) {
            return ele.pstyle("opacity").value === 0;
          } else {
            return ele.effectiveOpacity() === 0;
          }
        }
      },
      backgrounding: function backgrounding() {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return false;
        }
        var ele = this[0];
        return ele._private.backgrounding ? true : false;
      }
    };
    function checkCompound(ele, parentOk) {
      var _p = ele._private;
      var parents = _p.data.parent ? ele.parents() : null;
      if (parents) {
        for (var i2 = 0; i2 < parents.length; i2++) {
          var parent = parents[i2];
          if (!parentOk(parent)) {
            return false;
          }
        }
      }
      return true;
    }
    function defineDerivedStateFunction(specs) {
      var ok = specs.ok;
      var edgeOkViaNode = specs.edgeOkViaNode || specs.ok;
      var parentOk = specs.parentOk || specs.ok;
      return function() {
        var cy = this.cy();
        if (!cy.styleEnabled()) {
          return true;
        }
        var ele = this[0];
        var hasCompoundNodes = cy.hasCompoundNodes();
        if (ele) {
          var _p = ele._private;
          if (!ok(ele)) {
            return false;
          }
          if (ele.isNode()) {
            return !hasCompoundNodes || checkCompound(ele, parentOk);
          } else {
            var src = _p.source;
            var tgt = _p.target;
            return edgeOkViaNode(src) && (!hasCompoundNodes || checkCompound(src, edgeOkViaNode)) && (src === tgt || edgeOkViaNode(tgt) && (!hasCompoundNodes || checkCompound(tgt, edgeOkViaNode)));
          }
        }
      };
    }
    var eleTakesUpSpace = cacheStyleFunction("eleTakesUpSpace", function(ele) {
      return ele.pstyle("display").value === "element" && ele.width() !== 0 && (ele.isNode() ? ele.height() !== 0 : true);
    });
    elesfn$4.takesUpSpace = cachePrototypeStyleFunction("takesUpSpace", defineDerivedStateFunction({
      ok: eleTakesUpSpace
    }));
    var eleInteractive = cacheStyleFunction("eleInteractive", function(ele) {
      return ele.pstyle("events").value === "yes" && ele.pstyle("visibility").value === "visible" && eleTakesUpSpace(ele);
    });
    var parentInteractive = cacheStyleFunction("parentInteractive", function(parent) {
      return parent.pstyle("visibility").value === "visible" && eleTakesUpSpace(parent);
    });
    elesfn$4.interactive = cachePrototypeStyleFunction("interactive", defineDerivedStateFunction({
      ok: eleInteractive,
      parentOk: parentInteractive,
      edgeOkViaNode: eleTakesUpSpace
    }));
    elesfn$4.noninteractive = function() {
      var ele = this[0];
      if (ele) {
        return !ele.interactive();
      }
    };
    var eleVisible = cacheStyleFunction("eleVisible", function(ele) {
      return ele.pstyle("visibility").value === "visible" && ele.pstyle("opacity").pfValue !== 0 && eleTakesUpSpace(ele);
    });
    var edgeVisibleViaNode = eleTakesUpSpace;
    elesfn$4.visible = cachePrototypeStyleFunction("visible", defineDerivedStateFunction({
      ok: eleVisible,
      edgeOkViaNode: edgeVisibleViaNode
    }));
    elesfn$4.hidden = function() {
      var ele = this[0];
      if (ele) {
        return !ele.visible();
      }
    };
    elesfn$4.isBundledBezier = cachePrototypeStyleFunction("isBundledBezier", function() {
      if (!this.cy().styleEnabled()) {
        return false;
      }
      return !this.removed() && this.pstyle("curve-style").value === "bezier" && this.takesUpSpace();
    });
    elesfn$4.bypass = elesfn$4.css = elesfn$4.style;
    elesfn$4.renderedCss = elesfn$4.renderedStyle;
    elesfn$4.removeBypass = elesfn$4.removeCss = elesfn$4.removeStyle;
    elesfn$4.pstyle = elesfn$4.parsedStyle;
    var elesfn$3 = {};
    function defineSwitchFunction(params) {
      return function() {
        var args = arguments;
        var changedEles = [];
        if (args.length === 2) {
          var data2 = args[0];
          var handler = args[1];
          this.on(params.event, data2, handler);
        } else if (args.length === 1 && fn$6(args[0])) {
          var _handler = args[0];
          this.on(params.event, _handler);
        } else if (args.length === 0 || args.length === 1 && array(args[0])) {
          var addlEvents = args.length === 1 ? args[0] : null;
          for (var i2 = 0; i2 < this.length; i2++) {
            var ele = this[i2];
            var able = !params.ableField || ele._private[params.ableField];
            var changed = ele._private[params.field] != params.value;
            if (params.overrideAble) {
              var overrideAble = params.overrideAble(ele);
              if (overrideAble !== void 0) {
                able = overrideAble;
                if (!overrideAble) {
                  return this;
                }
              }
            }
            if (able) {
              ele._private[params.field] = params.value;
              if (changed) {
                changedEles.push(ele);
              }
            }
          }
          var changedColl = this.spawn(changedEles);
          changedColl.updateStyle();
          changedColl.emit(params.event);
          if (addlEvents) {
            changedColl.emit(addlEvents);
          }
        }
        return this;
      };
    }
    function defineSwitchSet(params) {
      elesfn$3[params.field] = function() {
        var ele = this[0];
        if (ele) {
          if (params.overrideField) {
            var val = params.overrideField(ele);
            if (val !== void 0) {
              return val;
            }
          }
          return ele._private[params.field];
        }
      };
      elesfn$3[params.on] = defineSwitchFunction({
        event: params.on,
        field: params.field,
        ableField: params.ableField,
        overrideAble: params.overrideAble,
        value: true
      });
      elesfn$3[params.off] = defineSwitchFunction({
        event: params.off,
        field: params.field,
        ableField: params.ableField,
        overrideAble: params.overrideAble,
        value: false
      });
    }
    defineSwitchSet({
      field: "locked",
      overrideField: function overrideField(ele) {
        return ele.cy().autolock() ? true : void 0;
      },
      on: "lock",
      off: "unlock"
    });
    defineSwitchSet({
      field: "grabbable",
      overrideField: function overrideField(ele) {
        return ele.cy().autoungrabify() || ele.pannable() ? false : void 0;
      },
      on: "grabify",
      off: "ungrabify"
    });
    defineSwitchSet({
      field: "selected",
      ableField: "selectable",
      overrideAble: function overrideAble(ele) {
        return ele.cy().autounselectify() ? false : void 0;
      },
      on: "select",
      off: "unselect"
    });
    defineSwitchSet({
      field: "selectable",
      overrideField: function overrideField(ele) {
        return ele.cy().autounselectify() ? false : void 0;
      },
      on: "selectify",
      off: "unselectify"
    });
    elesfn$3.deselect = elesfn$3.unselect;
    elesfn$3.grabbed = function() {
      var ele = this[0];
      if (ele) {
        return ele._private.grabbed;
      }
    };
    defineSwitchSet({
      field: "active",
      on: "activate",
      off: "unactivate"
    });
    defineSwitchSet({
      field: "pannable",
      on: "panify",
      off: "unpanify"
    });
    elesfn$3.inactive = function() {
      var ele = this[0];
      if (ele) {
        return !ele._private.active;
      }
    };
    var elesfn$2 = {};
    var defineDagExtremity = function defineDagExtremity2(params) {
      return function dagExtremityImpl(selector) {
        var eles = this;
        var ret = [];
        for (var i2 = 0; i2 < eles.length; i2++) {
          var ele = eles[i2];
          if (!ele.isNode()) {
            continue;
          }
          var disqualified = false;
          var edges = ele.connectedEdges();
          for (var j = 0; j < edges.length; j++) {
            var edge = edges[j];
            var src = edge.source();
            var tgt = edge.target();
            if (params.noIncomingEdges && tgt === ele && src !== ele || params.noOutgoingEdges && src === ele && tgt !== ele) {
              disqualified = true;
              break;
            }
          }
          if (!disqualified) {
            ret.push(ele);
          }
        }
        return this.spawn(ret, true).filter(selector);
      };
    };
    var defineDagOneHop = function defineDagOneHop2(params) {
      return function(selector) {
        var eles = this;
        var oEles = [];
        for (var i2 = 0; i2 < eles.length; i2++) {
          var ele = eles[i2];
          if (!ele.isNode()) {
            continue;
          }
          var edges = ele.connectedEdges();
          for (var j = 0; j < edges.length; j++) {
            var edge = edges[j];
            var src = edge.source();
            var tgt = edge.target();
            if (params.outgoing && src === ele) {
              oEles.push(edge);
              oEles.push(tgt);
            } else if (params.incoming && tgt === ele) {
              oEles.push(edge);
              oEles.push(src);
            }
          }
        }
        return this.spawn(oEles, true).filter(selector);
      };
    };
    var defineDagAllHops = function defineDagAllHops2(params) {
      return function(selector) {
        var eles = this;
        var sEles = [];
        var sElesIds = {};
        for (; ; ) {
          var next = params.outgoing ? eles.outgoers() : eles.incomers();
          if (next.length === 0) {
            break;
          }
          var newNext = false;
          for (var i2 = 0; i2 < next.length; i2++) {
            var n = next[i2];
            var nid = n.id();
            if (!sElesIds[nid]) {
              sElesIds[nid] = true;
              sEles.push(n);
              newNext = true;
            }
          }
          if (!newNext) {
            break;
          }
          eles = next;
        }
        return this.spawn(sEles, true).filter(selector);
      };
    };
    elesfn$2.clearTraversalCache = function() {
      for (var i2 = 0; i2 < this.length; i2++) {
        this[i2]._private.traversalCache = null;
      }
    };
    extend(elesfn$2, {
      // get the root nodes in the DAG
      roots: defineDagExtremity({
        noIncomingEdges: true
      }),
      // get the leaf nodes in the DAG
      leaves: defineDagExtremity({
        noOutgoingEdges: true
      }),
      // normally called children in graph theory
      // these nodes =edges=> outgoing nodes
      outgoers: cache(defineDagOneHop({
        outgoing: true
      }), "outgoers"),
      // aka DAG descendants
      successors: defineDagAllHops({
        outgoing: true
      }),
      // normally called parents in graph theory
      // these nodes <=edges= incoming nodes
      incomers: cache(defineDagOneHop({
        incoming: true
      }), "incomers"),
      // aka DAG ancestors
      predecessors: defineDagAllHops({
        incoming: true
      })
    });
    extend(elesfn$2, {
      neighborhood: cache(function(selector) {
        var elements = [];
        var nodes = this.nodes();
        for (var i2 = 0; i2 < nodes.length; i2++) {
          var node = nodes[i2];
          var connectedEdges = node.connectedEdges();
          for (var j = 0; j < connectedEdges.length; j++) {
            var edge = connectedEdges[j];
            var src = edge.source();
            var tgt = edge.target();
            var otherNode = node === src ? tgt : src;
            if (otherNode.length > 0) {
              elements.push(otherNode[0]);
            }
            elements.push(edge[0]);
          }
        }
        return this.spawn(elements, true).filter(selector);
      }, "neighborhood"),
      closedNeighborhood: function closedNeighborhood(selector) {
        return this.neighborhood().add(this).filter(selector);
      },
      openNeighborhood: function openNeighborhood(selector) {
        return this.neighborhood(selector);
      }
    });
    elesfn$2.neighbourhood = elesfn$2.neighborhood;
    elesfn$2.closedNeighbourhood = elesfn$2.closedNeighborhood;
    elesfn$2.openNeighbourhood = elesfn$2.openNeighborhood;
    extend(elesfn$2, {
      source: cache(function sourceImpl(selector) {
        var ele = this[0];
        var src;
        if (ele) {
          src = ele._private.source || ele.cy().collection();
        }
        return src && selector ? src.filter(selector) : src;
      }, "source"),
      target: cache(function targetImpl(selector) {
        var ele = this[0];
        var tgt;
        if (ele) {
          tgt = ele._private.target || ele.cy().collection();
        }
        return tgt && selector ? tgt.filter(selector) : tgt;
      }, "target"),
      sources: defineSourceFunction({
        attr: "source"
      }),
      targets: defineSourceFunction({
        attr: "target"
      })
    });
    function defineSourceFunction(params) {
      return function sourceImpl(selector) {
        var sources = [];
        for (var i2 = 0; i2 < this.length; i2++) {
          var ele = this[i2];
          var src = ele._private[params.attr];
          if (src) {
            sources.push(src);
          }
        }
        return this.spawn(sources, true).filter(selector);
      };
    }
    extend(elesfn$2, {
      edgesWith: cache(defineEdgesWithFunction(), "edgesWith"),
      edgesTo: cache(defineEdgesWithFunction({
        thisIsSrc: true
      }), "edgesTo")
    });
    function defineEdgesWithFunction(params) {
      return function edgesWithImpl(otherNodes) {
        var elements = [];
        var cy = this._private.cy;
        var p2 = params || {};
        if (string(otherNodes)) {
          otherNodes = cy.$(otherNodes);
        }
        for (var h = 0; h < otherNodes.length; h++) {
          var edges = otherNodes[h]._private.edges;
          for (var i2 = 0; i2 < edges.length; i2++) {
            var edge = edges[i2];
            var edgeData = edge._private.data;
            var thisToOther = this.hasElementWithId(edgeData.source) && otherNodes.hasElementWithId(edgeData.target);
            var otherToThis = otherNodes.hasElementWithId(edgeData.source) && this.hasElementWithId(edgeData.target);
            var edgeConnectsThisAndOther = thisToOther || otherToThis;
            if (!edgeConnectsThisAndOther) {
              continue;
            }
            if (p2.thisIsSrc || p2.thisIsTgt) {
              if (p2.thisIsSrc && !thisToOther) {
                continue;
              }
              if (p2.thisIsTgt && !otherToThis) {
                continue;
              }
            }
            elements.push(edge);
          }
        }
        return this.spawn(elements, true);
      };
    }
    extend(elesfn$2, {
      connectedEdges: cache(function(selector) {
        var retEles = [];
        var eles = this;
        for (var i2 = 0; i2 < eles.length; i2++) {
          var node = eles[i2];
          if (!node.isNode()) {
            continue;
          }
          var edges = node._private.edges;
          for (var j = 0; j < edges.length; j++) {
            var edge = edges[j];
            retEles.push(edge);
          }
        }
        return this.spawn(retEles, true).filter(selector);
      }, "connectedEdges"),
      connectedNodes: cache(function(selector) {
        var retEles = [];
        var eles = this;
        for (var i2 = 0; i2 < eles.length; i2++) {
          var edge = eles[i2];
          if (!edge.isEdge()) {
            continue;
          }
          retEles.push(edge.source()[0]);
          retEles.push(edge.target()[0]);
        }
        return this.spawn(retEles, true).filter(selector);
      }, "connectedNodes"),
      parallelEdges: cache(defineParallelEdgesFunction(), "parallelEdges"),
      codirectedEdges: cache(defineParallelEdgesFunction({
        codirected: true
      }), "codirectedEdges")
    });
    function defineParallelEdgesFunction(params) {
      var defaults2 = {
        codirected: false
      };
      params = extend({}, defaults2, params);
      return function parallelEdgesImpl(selector) {
        var elements = [];
        var edges = this.edges();
        var p2 = params;
        for (var i2 = 0; i2 < edges.length; i2++) {
          var edge1 = edges[i2];
          var edge1_p = edge1._private;
          var src1 = edge1_p.source;
          var srcid1 = src1._private.data.id;
          var tgtid1 = edge1_p.data.target;
          var srcEdges1 = src1._private.edges;
          for (var j = 0; j < srcEdges1.length; j++) {
            var edge2 = srcEdges1[j];
            var edge2data = edge2._private.data;
            var tgtid2 = edge2data.target;
            var srcid2 = edge2data.source;
            var codirected = tgtid2 === tgtid1 && srcid2 === srcid1;
            var oppdirected = srcid1 === tgtid2 && tgtid1 === srcid2;
            if (p2.codirected && codirected || !p2.codirected && (codirected || oppdirected)) {
              elements.push(edge2);
            }
          }
        }
        return this.spawn(elements, true).filter(selector);
      };
    }
    extend(elesfn$2, {
      components: function components(root) {
        var self2 = this;
        var cy = self2.cy();
        var visited = cy.collection();
        var unvisited = root == null ? self2.nodes() : root.nodes();
        var components2 = [];
        if (root != null && unvisited.empty()) {
          unvisited = root.sources();
        }
        var visitInComponent = function visitInComponent2(node, component) {
          visited.merge(node);
          unvisited.unmerge(node);
          component.merge(node);
        };
        if (unvisited.empty()) {
          return self2.spawn();
        }
        var _loop = function _loop2() {
          var cmpt = cy.collection();
          components2.push(cmpt);
          var root2 = unvisited[0];
          visitInComponent(root2, cmpt);
          self2.bfs({
            directed: false,
            roots: root2,
            visit: function visit(v) {
              return visitInComponent(v, cmpt);
            }
          });
          cmpt.forEach(function(node) {
            node.connectedEdges().forEach(function(e) {
              if (self2.has(e) && cmpt.has(e.source()) && cmpt.has(e.target())) {
                cmpt.merge(e);
              }
            });
          });
        };
        do {
          _loop();
        } while (unvisited.length > 0);
        return components2;
      },
      component: function component() {
        var ele = this[0];
        return ele.cy().mutableElements().components(ele)[0];
      }
    });
    elesfn$2.componentsOf = elesfn$2.components;
    var Collection = function Collection2(cy, elements) {
      var unique = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var removed = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      if (cy === void 0) {
        error("A collection must have a reference to the core");
        return;
      }
      var map = new Map$1();
      var createdElements = false;
      if (!elements) {
        elements = [];
      } else if (elements.length > 0 && plainObject(elements[0]) && !element(elements[0])) {
        createdElements = true;
        var eles = [];
        var elesIds = new Set$1();
        for (var i2 = 0, l = elements.length; i2 < l; i2++) {
          var json = elements[i2];
          if (json.data == null) {
            json.data = {};
          }
          var _data = json.data;
          if (_data.id == null) {
            _data.id = uuid();
          } else if (cy.hasElementWithId(_data.id) || elesIds.has(_data.id)) {
            continue;
          }
          var ele = new Element(cy, json, false);
          eles.push(ele);
          elesIds.add(_data.id);
        }
        elements = eles;
      }
      this.length = 0;
      for (var _i = 0, _l = elements.length; _i < _l; _i++) {
        var element$1 = elements[_i][0];
        if (element$1 == null) {
          continue;
        }
        var id = element$1._private.data.id;
        if (!unique || !map.has(id)) {
          if (unique) {
            map.set(id, {
              index: this.length,
              ele: element$1
            });
          }
          this[this.length] = element$1;
          this.length++;
        }
      }
      this._private = {
        eles: this,
        cy,
        get map() {
          if (this.lazyMap == null) {
            this.rebuildMap();
          }
          return this.lazyMap;
        },
        set map(m) {
          this.lazyMap = m;
        },
        rebuildMap: function rebuildMap() {
          var m = this.lazyMap = new Map$1();
          var eles2 = this.eles;
          for (var _i2 = 0; _i2 < eles2.length; _i2++) {
            var _ele = eles2[_i2];
            m.set(_ele.id(), {
              index: _i2,
              ele: _ele
            });
          }
        }
      };
      if (unique) {
        this._private.map = map;
      }
      if (createdElements && !removed) {
        this.restore();
      }
    };
    var elesfn$1 = Element.prototype = Collection.prototype = Object.create(Array.prototype);
    elesfn$1.instanceString = function() {
      return "collection";
    };
    elesfn$1.spawn = function(eles, unique) {
      return new Collection(this.cy(), eles, unique);
    };
    elesfn$1.spawnSelf = function() {
      return this.spawn(this);
    };
    elesfn$1.cy = function() {
      return this._private.cy;
    };
    elesfn$1.renderer = function() {
      return this._private.cy.renderer();
    };
    elesfn$1.element = function() {
      return this[0];
    };
    elesfn$1.collection = function() {
      if (collection(this)) {
        return this;
      } else {
        return new Collection(this._private.cy, [this]);
      }
    };
    elesfn$1.unique = function() {
      return new Collection(this._private.cy, this, true);
    };
    elesfn$1.hasElementWithId = function(id) {
      id = "" + id;
      return this._private.map.has(id);
    };
    elesfn$1.getElementById = function(id) {
      id = "" + id;
      var cy = this._private.cy;
      var entry = this._private.map.get(id);
      return entry ? entry.ele : new Collection(cy);
    };
    elesfn$1.$id = elesfn$1.getElementById;
    elesfn$1.poolIndex = function() {
      var cy = this._private.cy;
      var eles = cy._private.elements;
      var id = this[0]._private.data.id;
      return eles._private.map.get(id).index;
    };
    elesfn$1.indexOf = function(ele) {
      var id = ele[0]._private.data.id;
      return this._private.map.get(id).index;
    };
    elesfn$1.indexOfId = function(id) {
      id = "" + id;
      return this._private.map.get(id).index;
    };
    elesfn$1.json = function(obj) {
      var ele = this.element();
      var cy = this.cy();
      if (ele == null && obj) {
        return this;
      }
      if (ele == null) {
        return void 0;
      }
      var p2 = ele._private;
      if (plainObject(obj)) {
        cy.startBatch();
        if (obj.data) {
          ele.data(obj.data);
          var _data2 = p2.data;
          if (ele.isEdge()) {
            var move = false;
            var spec = {};
            var src = obj.data.source;
            var tgt = obj.data.target;
            if (src != null && src != _data2.source) {
              spec.source = "" + src;
              move = true;
            }
            if (tgt != null && tgt != _data2.target) {
              spec.target = "" + tgt;
              move = true;
            }
            if (move) {
              ele = ele.move(spec);
            }
          } else {
            var newParentValSpecd = "parent" in obj.data;
            var parent = obj.data.parent;
            if (newParentValSpecd && (parent != null || _data2.parent != null) && parent != _data2.parent) {
              if (parent === void 0) {
                parent = null;
              }
              if (parent != null) {
                parent = "" + parent;
              }
              ele = ele.move({
                parent
              });
            }
          }
        }
        if (obj.position) {
          ele.position(obj.position);
        }
        var checkSwitch = function checkSwitch2(k, trueFnName, falseFnName) {
          var obj_k = obj[k];
          if (obj_k != null && obj_k !== p2[k]) {
            if (obj_k) {
              ele[trueFnName]();
            } else {
              ele[falseFnName]();
            }
          }
        };
        checkSwitch("removed", "remove", "restore");
        checkSwitch("selected", "select", "unselect");
        checkSwitch("selectable", "selectify", "unselectify");
        checkSwitch("locked", "lock", "unlock");
        checkSwitch("grabbable", "grabify", "ungrabify");
        checkSwitch("pannable", "panify", "unpanify");
        if (obj.classes != null) {
          ele.classes(obj.classes);
        }
        cy.endBatch();
        return this;
      } else if (obj === void 0) {
        var json = {
          data: copy(p2.data),
          position: copy(p2.position),
          group: p2.group,
          removed: p2.removed,
          selected: p2.selected,
          selectable: p2.selectable,
          locked: p2.locked,
          grabbable: p2.grabbable,
          pannable: p2.pannable,
          classes: null
        };
        json.classes = "";
        var i2 = 0;
        p2.classes.forEach(function(cls) {
          return json.classes += i2++ === 0 ? cls : " " + cls;
        });
        return json;
      }
    };
    elesfn$1.jsons = function() {
      var jsons = [];
      for (var i2 = 0; i2 < this.length; i2++) {
        var ele = this[i2];
        var json = ele.json();
        jsons.push(json);
      }
      return jsons;
    };
    elesfn$1.clone = function() {
      var cy = this.cy();
      var elesArr = [];
      for (var i2 = 0; i2 < this.length; i2++) {
        var ele = this[i2];
        var json = ele.json();
        var clone2 = new Element(cy, json, false);
        elesArr.push(clone2);
      }
      return new Collection(cy, elesArr);
    };
    elesfn$1.copy = elesfn$1.clone;
    elesfn$1.restore = function() {
      var notifyRenderer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      var addToPool = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      var self2 = this;
      var cy = self2.cy();
      var cy_p = cy._private;
      var nodes = [];
      var edges = [];
      var elements;
      for (var _i3 = 0, l = self2.length; _i3 < l; _i3++) {
        var ele = self2[_i3];
        if (addToPool && !ele.removed()) {
          continue;
        }
        if (ele.isNode()) {
          nodes.push(ele);
        } else {
          edges.push(ele);
        }
      }
      elements = nodes.concat(edges);
      var i2;
      var removeFromElements = function removeFromElements2() {
        elements.splice(i2, 1);
        i2--;
      };
      for (i2 = 0; i2 < elements.length; i2++) {
        var _ele2 = elements[i2];
        var _private = _ele2._private;
        var _data3 = _private.data;
        _ele2.clearTraversalCache();
        if (!addToPool && !_private.removed) ;
        else if (_data3.id === void 0) {
          _data3.id = uuid();
        } else if (number$1(_data3.id)) {
          _data3.id = "" + _data3.id;
        } else if (emptyString(_data3.id) || !string(_data3.id)) {
          error("Can not create element with invalid string ID `" + _data3.id + "`");
          removeFromElements();
          continue;
        } else if (cy.hasElementWithId(_data3.id)) {
          error("Can not create second element with ID `" + _data3.id + "`");
          removeFromElements();
          continue;
        }
        var id = _data3.id;
        if (_ele2.isNode()) {
          var pos = _private.position;
          if (pos.x == null) {
            pos.x = 0;
          }
          if (pos.y == null) {
            pos.y = 0;
          }
        }
        if (_ele2.isEdge()) {
          var edge = _ele2;
          var fields = ["source", "target"];
          var fieldsLength = fields.length;
          var badSourceOrTarget = false;
          for (var j = 0; j < fieldsLength; j++) {
            var field = fields[j];
            var val = _data3[field];
            if (number$1(val)) {
              val = _data3[field] = "" + _data3[field];
            }
            if (val == null || val === "") {
              error("Can not create edge `" + id + "` with unspecified " + field);
              badSourceOrTarget = true;
            } else if (!cy.hasElementWithId(val)) {
              error("Can not create edge `" + id + "` with nonexistant " + field + " `" + val + "`");
              badSourceOrTarget = true;
            }
          }
          if (badSourceOrTarget) {
            removeFromElements();
            continue;
          }
          var src = cy.getElementById(_data3.source);
          var tgt = cy.getElementById(_data3.target);
          if (src.same(tgt)) {
            src._private.edges.push(edge);
          } else {
            src._private.edges.push(edge);
            tgt._private.edges.push(edge);
          }
          edge._private.source = src;
          edge._private.target = tgt;
        }
        _private.map = new Map$1();
        _private.map.set(id, {
          ele: _ele2,
          index: 0
        });
        _private.removed = false;
        if (addToPool) {
          cy.addToPool(_ele2);
        }
      }
      for (var _i4 = 0; _i4 < nodes.length; _i4++) {
        var node = nodes[_i4];
        var _data4 = node._private.data;
        if (number$1(_data4.parent)) {
          _data4.parent = "" + _data4.parent;
        }
        var parentId = _data4.parent;
        var specifiedParent = parentId != null;
        if (specifiedParent || node._private.parent) {
          var parent = node._private.parent ? cy.collection().merge(node._private.parent) : cy.getElementById(parentId);
          if (parent.empty()) {
            _data4.parent = void 0;
          } else if (parent[0].removed()) {
            warn("Node added with missing parent, reference to parent removed");
            _data4.parent = void 0;
            node._private.parent = null;
          } else {
            var selfAsParent = false;
            var ancestor = parent;
            while (!ancestor.empty()) {
              if (node.same(ancestor)) {
                selfAsParent = true;
                _data4.parent = void 0;
                break;
              }
              ancestor = ancestor.parent();
            }
            if (!selfAsParent) {
              parent[0]._private.children.push(node);
              node._private.parent = parent[0];
              cy_p.hasCompoundNodes = true;
            }
          }
        }
      }
      if (elements.length > 0) {
        var restored = elements.length === self2.length ? self2 : new Collection(cy, elements);
        for (var _i5 = 0; _i5 < restored.length; _i5++) {
          var _ele3 = restored[_i5];
          if (_ele3.isNode()) {
            continue;
          }
          _ele3.parallelEdges().clearTraversalCache();
          _ele3.source().clearTraversalCache();
          _ele3.target().clearTraversalCache();
        }
        var toUpdateStyle;
        if (cy_p.hasCompoundNodes) {
          toUpdateStyle = cy.collection().merge(restored).merge(restored.connectedNodes()).merge(restored.parent());
        } else {
          toUpdateStyle = restored;
        }
        toUpdateStyle.dirtyCompoundBoundsCache().dirtyBoundingBoxCache().updateStyle(notifyRenderer);
        if (notifyRenderer) {
          restored.emitAndNotify("add");
        } else if (addToPool) {
          restored.emit("add");
        }
      }
      return self2;
    };
    elesfn$1.removed = function() {
      var ele = this[0];
      return ele && ele._private.removed;
    };
    elesfn$1.inside = function() {
      var ele = this[0];
      return ele && !ele._private.removed;
    };
    elesfn$1.remove = function() {
      var notifyRenderer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      var removeFromPool = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      var self2 = this;
      var elesToRemove = [];
      var elesToRemoveIds = {};
      var cy = self2._private.cy;
      function addConnectedEdges(node) {
        var edges = node._private.edges;
        for (var i3 = 0; i3 < edges.length; i3++) {
          add(edges[i3]);
        }
      }
      function addChildren2(node) {
        var children = node._private.children;
        for (var i3 = 0; i3 < children.length; i3++) {
          add(children[i3]);
        }
      }
      function add(ele2) {
        var alreadyAdded = elesToRemoveIds[ele2.id()];
        if (removeFromPool && ele2.removed() || alreadyAdded) {
          return;
        } else {
          elesToRemoveIds[ele2.id()] = true;
        }
        if (ele2.isNode()) {
          elesToRemove.push(ele2);
          addConnectedEdges(ele2);
          addChildren2(ele2);
        } else {
          elesToRemove.unshift(ele2);
        }
      }
      for (var i2 = 0, l = self2.length; i2 < l; i2++) {
        var ele = self2[i2];
        add(ele);
      }
      function removeEdgeRef(node, edge) {
        var connectedEdges = node._private.edges;
        removeFromArray(connectedEdges, edge);
        node.clearTraversalCache();
      }
      function removeParallelRef(pllEdge2) {
        pllEdge2.clearTraversalCache();
      }
      var alteredParents = [];
      alteredParents.ids = {};
      function removeChildRef(parent2, ele2) {
        ele2 = ele2[0];
        parent2 = parent2[0];
        var children = parent2._private.children;
        var pid = parent2.id();
        removeFromArray(children, ele2);
        ele2._private.parent = null;
        if (!alteredParents.ids[pid]) {
          alteredParents.ids[pid] = true;
          alteredParents.push(parent2);
        }
      }
      self2.dirtyCompoundBoundsCache();
      if (removeFromPool) {
        cy.removeFromPool(elesToRemove);
      }
      for (var _i6 = 0; _i6 < elesToRemove.length; _i6++) {
        var _ele4 = elesToRemove[_i6];
        if (_ele4.isEdge()) {
          var src = _ele4.source()[0];
          var tgt = _ele4.target()[0];
          removeEdgeRef(src, _ele4);
          removeEdgeRef(tgt, _ele4);
          var pllEdges = _ele4.parallelEdges();
          for (var j = 0; j < pllEdges.length; j++) {
            var pllEdge = pllEdges[j];
            removeParallelRef(pllEdge);
            if (pllEdge.isBundledBezier()) {
              pllEdge.dirtyBoundingBoxCache();
            }
          }
        } else {
          var parent = _ele4.parent();
          if (parent.length !== 0) {
            removeChildRef(parent, _ele4);
          }
        }
        if (removeFromPool) {
          _ele4._private.removed = true;
        }
      }
      var elesStillInside = cy._private.elements;
      cy._private.hasCompoundNodes = false;
      for (var _i7 = 0; _i7 < elesStillInside.length; _i7++) {
        var _ele5 = elesStillInside[_i7];
        if (_ele5.isParent()) {
          cy._private.hasCompoundNodes = true;
          break;
        }
      }
      var removedElements = new Collection(this.cy(), elesToRemove);
      if (removedElements.size() > 0) {
        if (notifyRenderer) {
          removedElements.emitAndNotify("remove");
        } else if (removeFromPool) {
          removedElements.emit("remove");
        }
      }
      for (var _i8 = 0; _i8 < alteredParents.length; _i8++) {
        var _ele6 = alteredParents[_i8];
        if (!removeFromPool || !_ele6.removed()) {
          _ele6.updateStyle();
        }
      }
      return removedElements;
    };
    elesfn$1.move = function(struct) {
      var cy = this._private.cy;
      var eles = this;
      var notifyRenderer = false;
      var modifyPool = false;
      var toString2 = function toString3(id) {
        return id == null ? id : "" + id;
      };
      if (struct.source !== void 0 || struct.target !== void 0) {
        var srcId = toString2(struct.source);
        var tgtId = toString2(struct.target);
        var srcExists = srcId != null && cy.hasElementWithId(srcId);
        var tgtExists = tgtId != null && cy.hasElementWithId(tgtId);
        if (srcExists || tgtExists) {
          cy.batch(function() {
            eles.remove(notifyRenderer, modifyPool);
            eles.emitAndNotify("moveout");
            for (var i2 = 0; i2 < eles.length; i2++) {
              var ele = eles[i2];
              var _data5 = ele._private.data;
              if (ele.isEdge()) {
                if (srcExists) {
                  _data5.source = srcId;
                }
                if (tgtExists) {
                  _data5.target = tgtId;
                }
              }
            }
            eles.restore(notifyRenderer, modifyPool);
          });
          eles.emitAndNotify("move");
        }
      } else if (struct.parent !== void 0) {
        var parentId = toString2(struct.parent);
        var parentExists = parentId === null || cy.hasElementWithId(parentId);
        if (parentExists) {
          var pidToAssign = parentId === null ? void 0 : parentId;
          cy.batch(function() {
            var updated = eles.remove(notifyRenderer, modifyPool);
            updated.emitAndNotify("moveout");
            for (var i2 = 0; i2 < eles.length; i2++) {
              var ele = eles[i2];
              var _data6 = ele._private.data;
              if (ele.isNode()) {
                _data6.parent = pidToAssign;
              }
            }
            updated.restore(notifyRenderer, modifyPool);
          });
          eles.emitAndNotify("move");
        }
      }
      return this;
    };
    [elesfn$j, elesfn$i, elesfn$h, elesfn$g, elesfn$f, data, elesfn$d, dimensions, elesfn$9, elesfn$8, elesfn$7, elesfn$6, elesfn$5, elesfn$4, elesfn$3, elesfn$2].forEach(function(props) {
      extend(elesfn$1, props);
    });
    var corefn$9 = {
      add: function add(opts) {
        var elements;
        var cy = this;
        if (elementOrCollection(opts)) {
          var eles = opts;
          if (eles._private.cy === cy) {
            elements = eles.restore();
          } else {
            var jsons = [];
            for (var i2 = 0; i2 < eles.length; i2++) {
              var ele = eles[i2];
              jsons.push(ele.json());
            }
            elements = new Collection(cy, jsons);
          }
        } else if (array(opts)) {
          var _jsons = opts;
          elements = new Collection(cy, _jsons);
        } else if (plainObject(opts) && (array(opts.nodes) || array(opts.edges))) {
          var elesByGroup = opts;
          var _jsons2 = [];
          var grs = ["nodes", "edges"];
          for (var _i = 0, il = grs.length; _i < il; _i++) {
            var group = grs[_i];
            var elesArray = elesByGroup[group];
            if (array(elesArray)) {
              for (var j = 0, jl = elesArray.length; j < jl; j++) {
                var json = extend({
                  group
                }, elesArray[j]);
                _jsons2.push(json);
              }
            }
          }
          elements = new Collection(cy, _jsons2);
        } else {
          var _json = opts;
          elements = new Element(cy, _json).collection();
        }
        return elements;
      },
      remove: function remove(collection2) {
        if (elementOrCollection(collection2)) ;
        else if (string(collection2)) {
          var selector = collection2;
          collection2 = this.$(selector);
        }
        return collection2.remove();
      }
    };
    function generateCubicBezier(mX1, mY1, mX2, mY2) {
      var NEWTON_ITERATIONS = 4, NEWTON_MIN_SLOPE = 1e-3, SUBDIVISION_PRECISION = 1e-7, SUBDIVISION_MAX_ITERATIONS = 10, kSplineTableSize = 11, kSampleStepSize = 1 / (kSplineTableSize - 1), float32ArraySupported = typeof Float32Array !== "undefined";
      if (arguments.length !== 4) {
        return false;
      }
      for (var i2 = 0; i2 < 4; ++i2) {
        if (typeof arguments[i2] !== "number" || isNaN(arguments[i2]) || !isFinite(arguments[i2])) {
          return false;
        }
      }
      mX1 = Math.min(mX1, 1);
      mX2 = Math.min(mX2, 1);
      mX1 = Math.max(mX1, 0);
      mX2 = Math.max(mX2, 0);
      var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
      function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
      }
      function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
      }
      function C(aA1) {
        return 3 * aA1;
      }
      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }
      function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
      }
      function newtonRaphsonIterate(aX, aGuessT) {
        for (var _i = 0; _i < NEWTON_ITERATIONS; ++_i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);
          if (currentSlope === 0) {
            return aGuessT;
          }
          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
      }
      function calcSampleValues() {
        for (var _i2 = 0; _i2 < kSplineTableSize; ++_i2) {
          mSampleValues[_i2] = calcBezier(_i2 * kSampleStepSize, mX1, mX2);
        }
      }
      function binarySubdivide(aX, aA, aB) {
        var currentX, currentT, i3 = 0;
        do {
          currentT = aA + (aB - aA) / 2;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i3 < SUBDIVISION_MAX_ITERATIONS);
        return currentT;
      }
      function getTForX(aX) {
        var intervalStart = 0, currentSample = 1, lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist2 = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]), guessForT = intervalStart + dist2 * kSampleStepSize, initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
        }
      }
      var _precomputed = false;
      function precompute() {
        _precomputed = true;
        if (mX1 !== mY1 || mX2 !== mY2) {
          calcSampleValues();
        }
      }
      var f = function f2(aX) {
        if (!_precomputed) {
          precompute();
        }
        if (mX1 === mY1 && mX2 === mY2) {
          return aX;
        }
        if (aX === 0) {
          return 0;
        }
        if (aX === 1) {
          return 1;
        }
        return calcBezier(getTForX(aX), mY1, mY2);
      };
      f.getControlPoints = function() {
        return [{
          x: mX1,
          y: mY1
        }, {
          x: mX2,
          y: mY2
        }];
      };
      var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
      f.toString = function() {
        return str;
      };
      return f;
    }
    var generateSpringRK4 = /* @__PURE__ */ function() {
      function springAccelerationForState(state) {
        return -state.tension * state.x - state.friction * state.v;
      }
      function springEvaluateStateWithDerivative(initialState, dt, derivative) {
        var state = {
          x: initialState.x + derivative.dx * dt,
          v: initialState.v + derivative.dv * dt,
          tension: initialState.tension,
          friction: initialState.friction
        };
        return {
          dx: state.v,
          dv: springAccelerationForState(state)
        };
      }
      function springIntegrateState(state, dt) {
        var a = {
          dx: state.v,
          dv: springAccelerationForState(state)
        }, b = springEvaluateStateWithDerivative(state, dt * 0.5, a), c = springEvaluateStateWithDerivative(state, dt * 0.5, b), d = springEvaluateStateWithDerivative(state, dt, c), dxdt = 1 / 6 * (a.dx + 2 * (b.dx + c.dx) + d.dx), dvdt = 1 / 6 * (a.dv + 2 * (b.dv + c.dv) + d.dv);
        state.x = state.x + dxdt * dt;
        state.v = state.v + dvdt * dt;
        return state;
      }
      return function springRK4Factory(tension, friction, duration) {
        var initState = {
          x: -1,
          v: 0,
          tension: null,
          friction: null
        }, path = [0], time_lapsed = 0, tolerance = 1 / 1e4, DT = 16 / 1e3, have_duration, dt, last_state;
        tension = parseFloat(tension) || 500;
        friction = parseFloat(friction) || 20;
        duration = duration || null;
        initState.tension = tension;
        initState.friction = friction;
        have_duration = duration !== null;
        if (have_duration) {
          time_lapsed = springRK4Factory(tension, friction);
          dt = time_lapsed / duration * DT;
        } else {
          dt = DT;
        }
        for (; ; ) {
          last_state = springIntegrateState(last_state || initState, dt);
          path.push(1 + last_state.x);
          time_lapsed += 16;
          if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
            break;
          }
        }
        return !have_duration ? time_lapsed : function(percentComplete) {
          return path[percentComplete * (path.length - 1) | 0];
        };
      };
    }();
    var cubicBezier = function cubicBezier2(t1, p1, t2, p2) {
      var bezier = generateCubicBezier(t1, p1, t2, p2);
      return function(start, end, percent) {
        return start + (end - start) * bezier(percent);
      };
    };
    var easings = {
      "linear": function linear(start, end, percent) {
        return start + (end - start) * percent;
      },
      // default easings
      "ease": cubicBezier(0.25, 0.1, 0.25, 1),
      "ease-in": cubicBezier(0.42, 0, 1, 1),
      "ease-out": cubicBezier(0, 0, 0.58, 1),
      "ease-in-out": cubicBezier(0.42, 0, 0.58, 1),
      // sine
      "ease-in-sine": cubicBezier(0.47, 0, 0.745, 0.715),
      "ease-out-sine": cubicBezier(0.39, 0.575, 0.565, 1),
      "ease-in-out-sine": cubicBezier(0.445, 0.05, 0.55, 0.95),
      // quad
      "ease-in-quad": cubicBezier(0.55, 0.085, 0.68, 0.53),
      "ease-out-quad": cubicBezier(0.25, 0.46, 0.45, 0.94),
      "ease-in-out-quad": cubicBezier(0.455, 0.03, 0.515, 0.955),
      // cubic
      "ease-in-cubic": cubicBezier(0.55, 0.055, 0.675, 0.19),
      "ease-out-cubic": cubicBezier(0.215, 0.61, 0.355, 1),
      "ease-in-out-cubic": cubicBezier(0.645, 0.045, 0.355, 1),
      // quart
      "ease-in-quart": cubicBezier(0.895, 0.03, 0.685, 0.22),
      "ease-out-quart": cubicBezier(0.165, 0.84, 0.44, 1),
      "ease-in-out-quart": cubicBezier(0.77, 0, 0.175, 1),
      // quint
      "ease-in-quint": cubicBezier(0.755, 0.05, 0.855, 0.06),
      "ease-out-quint": cubicBezier(0.23, 1, 0.32, 1),
      "ease-in-out-quint": cubicBezier(0.86, 0, 0.07, 1),
      // expo
      "ease-in-expo": cubicBezier(0.95, 0.05, 0.795, 0.035),
      "ease-out-expo": cubicBezier(0.19, 1, 0.22, 1),
      "ease-in-out-expo": cubicBezier(1, 0, 0, 1),
      // circ
      "ease-in-circ": cubicBezier(0.6, 0.04, 0.98, 0.335),
      "ease-out-circ": cubicBezier(0.075, 0.82, 0.165, 1),
      "ease-in-out-circ": cubicBezier(0.785, 0.135, 0.15, 0.86),
      // user param easings...
      "spring": function spring(tension, friction, duration) {
        if (duration === 0) {
          return easings.linear;
        }
        var spring2 = generateSpringRK4(tension, friction, duration);
        return function(start, end, percent) {
          return start + (end - start) * spring2(percent);
        };
      },
      "cubic-bezier": cubicBezier
    };
    function getEasedValue(type, start, end, percent, easingFn) {
      if (percent === 1) {
        return end;
      }
      if (start === end) {
        return end;
      }
      var val = easingFn(start, end, percent);
      if (type == null) {
        return val;
      }
      if (type.roundValue || type.color) {
        val = Math.round(val);
      }
      if (type.min !== void 0) {
        val = Math.max(val, type.min);
      }
      if (type.max !== void 0) {
        val = Math.min(val, type.max);
      }
      return val;
    }
    function getValue(prop, spec) {
      if (prop.pfValue != null || prop.value != null) {
        if (prop.pfValue != null && (spec == null || spec.type.units !== "%")) {
          return prop.pfValue;
        } else {
          return prop.value;
        }
      } else {
        return prop;
      }
    }
    function ease(startProp, endProp, percent, easingFn, propSpec) {
      var type = propSpec != null ? propSpec.type : null;
      if (percent < 0) {
        percent = 0;
      } else if (percent > 1) {
        percent = 1;
      }
      var start = getValue(startProp, propSpec);
      var end = getValue(endProp, propSpec);
      if (number$1(start) && number$1(end)) {
        return getEasedValue(type, start, end, percent, easingFn);
      } else if (array(start) && array(end)) {
        var easedArr = [];
        for (var i2 = 0; i2 < end.length; i2++) {
          var si = start[i2];
          var ei = end[i2];
          if (si != null && ei != null) {
            var val = getEasedValue(type, si, ei, percent, easingFn);
            easedArr.push(val);
          } else {
            easedArr.push(ei);
          }
        }
        return easedArr;
      }
      return void 0;
    }
    function step$1(self2, ani, now, isCore) {
      var isEles = !isCore;
      var _p = self2._private;
      var ani_p = ani._private;
      var pEasing = ani_p.easing;
      var startTime = ani_p.startTime;
      var cy = isCore ? self2 : self2.cy();
      var style = cy.style();
      if (!ani_p.easingImpl) {
        if (pEasing == null) {
          ani_p.easingImpl = easings["linear"];
        } else {
          var easingVals;
          if (string(pEasing)) {
            var easingProp = style.parse("transition-timing-function", pEasing);
            easingVals = easingProp.value;
          } else {
            easingVals = pEasing;
          }
          var name, args;
          if (string(easingVals)) {
            name = easingVals;
            args = [];
          } else {
            name = easingVals[1];
            args = easingVals.slice(2).map(function(n) {
              return +n;
            });
          }
          if (args.length > 0) {
            if (name === "spring") {
              args.push(ani_p.duration);
            }
            ani_p.easingImpl = easings[name].apply(null, args);
          } else {
            ani_p.easingImpl = easings[name];
          }
        }
      }
      var easing = ani_p.easingImpl;
      var percent;
      if (ani_p.duration === 0) {
        percent = 1;
      } else {
        percent = (now - startTime) / ani_p.duration;
      }
      if (ani_p.applying) {
        percent = ani_p.progress;
      }
      if (percent < 0) {
        percent = 0;
      } else if (percent > 1) {
        percent = 1;
      }
      if (ani_p.delay == null) {
        var startPos = ani_p.startPosition;
        var endPos = ani_p.position;
        if (endPos && isEles && !self2.locked()) {
          var newPos = {};
          if (valid(startPos.x, endPos.x)) {
            newPos.x = ease(startPos.x, endPos.x, percent, easing);
          }
          if (valid(startPos.y, endPos.y)) {
            newPos.y = ease(startPos.y, endPos.y, percent, easing);
          }
          self2.position(newPos);
        }
        var startPan = ani_p.startPan;
        var endPan = ani_p.pan;
        var pan = _p.pan;
        var animatingPan = endPan != null && isCore;
        if (animatingPan) {
          if (valid(startPan.x, endPan.x)) {
            pan.x = ease(startPan.x, endPan.x, percent, easing);
          }
          if (valid(startPan.y, endPan.y)) {
            pan.y = ease(startPan.y, endPan.y, percent, easing);
          }
          self2.emit("pan");
        }
        var startZoom = ani_p.startZoom;
        var endZoom = ani_p.zoom;
        var animatingZoom = endZoom != null && isCore;
        if (animatingZoom) {
          if (valid(startZoom, endZoom)) {
            _p.zoom = bound(_p.minZoom, ease(startZoom, endZoom, percent, easing), _p.maxZoom);
          }
          self2.emit("zoom");
        }
        if (animatingPan || animatingZoom) {
          self2.emit("viewport");
        }
        var props = ani_p.style;
        if (props && props.length > 0 && isEles) {
          for (var i2 = 0; i2 < props.length; i2++) {
            var prop = props[i2];
            var _name = prop.name;
            var end = prop;
            var start = ani_p.startStyle[_name];
            var propSpec = style.properties[start.name];
            var easedVal = ease(start, end, percent, easing, propSpec);
            style.overrideBypass(self2, _name, easedVal);
          }
          self2.emit("style");
        }
      }
      ani_p.progress = percent;
      return percent;
    }
    function valid(start, end) {
      if (start == null || end == null) {
        return false;
      }
      if (number$1(start) && number$1(end)) {
        return true;
      } else if (start && end) {
        return true;
      }
      return false;
    }
    function startAnimation(self2, ani, now, isCore) {
      var ani_p = ani._private;
      ani_p.started = true;
      ani_p.startTime = now - ani_p.progress * ani_p.duration;
    }
    function stepAll(now, cy) {
      var eles = cy._private.aniEles;
      var doneEles = [];
      function stepOne(ele2, isCore) {
        var _p = ele2._private;
        var current = _p.animation.current;
        var queue = _p.animation.queue;
        var ranAnis = false;
        if (current.length === 0) {
          var next = queue.shift();
          if (next) {
            current.push(next);
          }
        }
        var callbacks = function callbacks2(_callbacks) {
          for (var j = _callbacks.length - 1; j >= 0; j--) {
            var cb = _callbacks[j];
            cb();
          }
          _callbacks.splice(0, _callbacks.length);
        };
        for (var i2 = current.length - 1; i2 >= 0; i2--) {
          var ani = current[i2];
          var ani_p = ani._private;
          if (ani_p.stopped) {
            current.splice(i2, 1);
            ani_p.hooked = false;
            ani_p.playing = false;
            ani_p.started = false;
            callbacks(ani_p.frames);
            continue;
          }
          if (!ani_p.playing && !ani_p.applying) {
            continue;
          }
          if (ani_p.playing && ani_p.applying) {
            ani_p.applying = false;
          }
          if (!ani_p.started) {
            startAnimation(ele2, ani, now);
          }
          step$1(ele2, ani, now, isCore);
          if (ani_p.applying) {
            ani_p.applying = false;
          }
          callbacks(ani_p.frames);
          if (ani_p.step != null) {
            ani_p.step(now);
          }
          if (ani.completed()) {
            current.splice(i2, 1);
            ani_p.hooked = false;
            ani_p.playing = false;
            ani_p.started = false;
            callbacks(ani_p.completes);
          }
          ranAnis = true;
        }
        if (!isCore && current.length === 0 && queue.length === 0) {
          doneEles.push(ele2);
        }
        return ranAnis;
      }
      var ranEleAni = false;
      for (var e = 0; e < eles.length; e++) {
        var ele = eles[e];
        var handledThisEle = stepOne(ele);
        ranEleAni = ranEleAni || handledThisEle;
      }
      var ranCoreAni = stepOne(cy, true);
      if (ranEleAni || ranCoreAni) {
        if (eles.length > 0) {
          cy.notify("draw", eles);
        } else {
          cy.notify("draw");
        }
      }
      eles.unmerge(doneEles);
      cy.emit("step");
    }
    var corefn$8 = {
      // pull in animation functions
      animate: define2.animate(),
      animation: define2.animation(),
      animated: define2.animated(),
      clearQueue: define2.clearQueue(),
      delay: define2.delay(),
      delayAnimation: define2.delayAnimation(),
      stop: define2.stop(),
      addToAnimationPool: function addToAnimationPool(eles) {
        var cy = this;
        if (!cy.styleEnabled()) {
          return;
        }
        cy._private.aniEles.merge(eles);
      },
      stopAnimationLoop: function stopAnimationLoop() {
        this._private.animationsRunning = false;
      },
      startAnimationLoop: function startAnimationLoop() {
        var cy = this;
        cy._private.animationsRunning = true;
        if (!cy.styleEnabled()) {
          return;
        }
        function headlessStep() {
          if (!cy._private.animationsRunning) {
            return;
          }
          requestAnimationFrame(function animationStep(now) {
            stepAll(now, cy);
            headlessStep();
          });
        }
        var renderer2 = cy.renderer();
        if (renderer2 && renderer2.beforeRender) {
          renderer2.beforeRender(function rendererAnimationStep(willDraw, now) {
            stepAll(now, cy);
          }, renderer2.beforeRenderPriorities.animations);
        } else {
          headlessStep();
        }
      }
    };
    var emitterOptions = {
      qualifierCompare: function qualifierCompare(selector1, selector2) {
        if (selector1 == null || selector2 == null) {
          return selector1 == null && selector2 == null;
        } else {
          return selector1.sameText(selector2);
        }
      },
      eventMatches: function eventMatches(cy, listener, eventObj) {
        var selector = listener.qualifier;
        if (selector != null) {
          return cy !== eventObj.target && element(eventObj.target) && selector.matches(eventObj.target);
        }
        return true;
      },
      addEventFields: function addEventFields(cy, evt) {
        evt.cy = cy;
        evt.target = cy;
      },
      callbackContext: function callbackContext(cy, listener, eventObj) {
        return listener.qualifier != null ? eventObj.target : cy;
      }
    };
    var argSelector = function argSelector2(arg) {
      if (string(arg)) {
        return new Selector(arg);
      } else {
        return arg;
      }
    };
    var elesfn = {
      createEmitter: function createEmitter() {
        var _p = this._private;
        if (!_p.emitter) {
          _p.emitter = new Emitter(emitterOptions, this);
        }
        return this;
      },
      emitter: function emitter() {
        return this._private.emitter;
      },
      on: function on(events, selector, callback) {
        this.emitter().on(events, argSelector(selector), callback);
        return this;
      },
      removeListener: function removeListener(events, selector, callback) {
        this.emitter().removeListener(events, argSelector(selector), callback);
        return this;
      },
      removeAllListeners: function removeAllListeners() {
        this.emitter().removeAllListeners();
        return this;
      },
      one: function one(events, selector, callback) {
        this.emitter().one(events, argSelector(selector), callback);
        return this;
      },
      once: function once(events, selector, callback) {
        this.emitter().one(events, argSelector(selector), callback);
        return this;
      },
      emit: function emit(events, extraParams) {
        this.emitter().emit(events, extraParams);
        return this;
      },
      emitAndNotify: function emitAndNotify(event2, eles) {
        this.emit(event2);
        this.notify(event2, eles);
        return this;
      }
    };
    define2.eventAliasesOn(elesfn);
    var corefn$7 = {
      png: function png(options) {
        var renderer2 = this._private.renderer;
        options = options || {};
        return renderer2.png(options);
      },
      jpg: function jpg(options) {
        var renderer2 = this._private.renderer;
        options = options || {};
        options.bg = options.bg || "#fff";
        return renderer2.jpg(options);
      }
    };
    corefn$7.jpeg = corefn$7.jpg;
    var corefn$6 = {
      layout: function layout2(options) {
        var cy = this;
        if (options == null) {
          error("Layout options must be specified to make a layout");
          return;
        }
        if (options.name == null) {
          error("A `name` must be specified to make a layout");
          return;
        }
        var name = options.name;
        var Layout = cy.extension("layout", name);
        if (Layout == null) {
          error("No such layout `" + name + "` found.  Did you forget to import it and `cytoscape.use()` it?");
          return;
        }
        var eles;
        if (string(options.eles)) {
          eles = cy.$(options.eles);
        } else {
          eles = options.eles != null ? options.eles : cy.$();
        }
        var layout3 = new Layout(extend({}, options, {
          cy,
          eles
        }));
        return layout3;
      }
    };
    corefn$6.createLayout = corefn$6.makeLayout = corefn$6.layout;
    var corefn$5 = {
      notify: function notify(eventName, eventEles) {
        var _p = this._private;
        if (this.batching()) {
          _p.batchNotifications = _p.batchNotifications || {};
          var eles = _p.batchNotifications[eventName] = _p.batchNotifications[eventName] || this.collection();
          if (eventEles != null) {
            eles.merge(eventEles);
          }
          return;
        }
        if (!_p.notificationsEnabled) {
          return;
        }
        var renderer2 = this.renderer();
        if (this.destroyed() || !renderer2) {
          return;
        }
        renderer2.notify(eventName, eventEles);
      },
      notifications: function notifications(bool) {
        var p2 = this._private;
        if (bool === void 0) {
          return p2.notificationsEnabled;
        } else {
          p2.notificationsEnabled = bool ? true : false;
        }
        return this;
      },
      noNotifications: function noNotifications(callback) {
        this.notifications(false);
        callback();
        this.notifications(true);
      },
      batching: function batching() {
        return this._private.batchCount > 0;
      },
      startBatch: function startBatch() {
        var _p = this._private;
        if (_p.batchCount == null) {
          _p.batchCount = 0;
        }
        if (_p.batchCount === 0) {
          _p.batchStyleEles = this.collection();
          _p.batchNotifications = {};
        }
        _p.batchCount++;
        return this;
      },
      endBatch: function endBatch() {
        var _p = this._private;
        if (_p.batchCount === 0) {
          return this;
        }
        _p.batchCount--;
        if (_p.batchCount === 0) {
          _p.batchStyleEles.updateStyle();
          var renderer2 = this.renderer();
          Object.keys(_p.batchNotifications).forEach(function(eventName) {
            var eles = _p.batchNotifications[eventName];
            if (eles.empty()) {
              renderer2.notify(eventName);
            } else {
              renderer2.notify(eventName, eles);
            }
          });
        }
        return this;
      },
      batch: function batch(callback) {
        this.startBatch();
        callback();
        this.endBatch();
        return this;
      },
      // for backwards compatibility
      batchData: function batchData(map) {
        var cy = this;
        return this.batch(function() {
          var ids = Object.keys(map);
          for (var i2 = 0; i2 < ids.length; i2++) {
            var id = ids[i2];
            var data2 = map[id];
            var ele = cy.getElementById(id);
            ele.data(data2);
          }
        });
      }
    };
    var rendererDefaults = defaults$g({
      hideEdgesOnViewport: false,
      textureOnViewport: false,
      motionBlur: false,
      motionBlurOpacity: 0.05,
      pixelRatio: void 0,
      desktopTapThreshold: 4,
      touchTapThreshold: 8,
      wheelSensitivity: 1,
      debug: false,
      showFps: false
    });
    var corefn$4 = {
      renderTo: function renderTo(context, zoom, pan, pxRatio) {
        var r = this._private.renderer;
        r.renderTo(context, zoom, pan, pxRatio);
        return this;
      },
      renderer: function renderer2() {
        return this._private.renderer;
      },
      forceRender: function forceRender() {
        this.notify("draw");
        return this;
      },
      resize: function resize() {
        this.invalidateSize();
        this.emitAndNotify("resize");
        return this;
      },
      initRenderer: function initRenderer(options) {
        var cy = this;
        var RendererProto = cy.extension("renderer", options.name);
        if (RendererProto == null) {
          error("Can not initialise: No such renderer `".concat(options.name, "` found. Did you forget to import it and `cytoscape.use()` it?"));
          return;
        }
        if (options.wheelSensitivity !== void 0) {
          warn("You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine.");
        }
        var rOpts = rendererDefaults(options);
        rOpts.cy = cy;
        cy._private.renderer = new RendererProto(rOpts);
        this.notify("init");
      },
      destroyRenderer: function destroyRenderer() {
        var cy = this;
        cy.notify("destroy");
        var domEle = cy.container();
        if (domEle) {
          domEle._cyreg = null;
          while (domEle.childNodes.length > 0) {
            domEle.removeChild(domEle.childNodes[0]);
          }
        }
        cy._private.renderer = null;
        cy.mutableElements().forEach(function(ele) {
          var _p = ele._private;
          _p.rscratch = {};
          _p.rstyle = {};
          _p.animation.current = [];
          _p.animation.queue = [];
        });
      },
      onRender: function onRender(fn2) {
        return this.on("render", fn2);
      },
      offRender: function offRender(fn2) {
        return this.off("render", fn2);
      }
    };
    corefn$4.invalidateDimensions = corefn$4.resize;
    var corefn$3 = {
      // get a collection
      // - empty collection on no args
      // - collection of elements in the graph on selector arg
      // - guarantee a returned collection when elements or collection specified
      collection: function collection2(eles, opts) {
        if (string(eles)) {
          return this.$(eles);
        } else if (elementOrCollection(eles)) {
          return eles.collection();
        } else if (array(eles)) {
          if (!opts) {
            opts = {};
          }
          return new Collection(this, eles, opts.unique, opts.removed);
        }
        return new Collection(this);
      },
      nodes: function nodes(selector) {
        var nodes2 = this.$(function(ele) {
          return ele.isNode();
        });
        if (selector) {
          return nodes2.filter(selector);
        }
        return nodes2;
      },
      edges: function edges(selector) {
        var edges2 = this.$(function(ele) {
          return ele.isEdge();
        });
        if (selector) {
          return edges2.filter(selector);
        }
        return edges2;
      },
      // search the graph like jQuery
      $: function $(selector) {
        var eles = this._private.elements;
        if (selector) {
          return eles.filter(selector);
        } else {
          return eles.spawnSelf();
        }
      },
      mutableElements: function mutableElements() {
        return this._private.elements;
      }
    };
    corefn$3.elements = corefn$3.filter = corefn$3.$;
    var styfn$8 = {};
    var TRUE = "t";
    var FALSE = "f";
    styfn$8.apply = function(eles) {
      var self2 = this;
      var _p = self2._private;
      var cy = _p.cy;
      var updatedEles = cy.collection();
      for (var ie = 0; ie < eles.length; ie++) {
        var ele = eles[ie];
        var cxtMeta = self2.getContextMeta(ele);
        if (cxtMeta.empty) {
          continue;
        }
        var cxtStyle = self2.getContextStyle(cxtMeta);
        var app = self2.applyContextStyle(cxtMeta, cxtStyle, ele);
        if (ele._private.appliedInitStyle) {
          self2.updateTransitions(ele, app.diffProps);
        } else {
          ele._private.appliedInitStyle = true;
        }
        var hintsDiff = self2.updateStyleHints(ele);
        if (hintsDiff) {
          updatedEles.push(ele);
        }
      }
      return updatedEles;
    };
    styfn$8.getPropertiesDiff = function(oldCxtKey, newCxtKey) {
      var self2 = this;
      var cache2 = self2._private.propDiffs = self2._private.propDiffs || {};
      var dualCxtKey = oldCxtKey + "-" + newCxtKey;
      var cachedVal = cache2[dualCxtKey];
      if (cachedVal) {
        return cachedVal;
      }
      var diffProps = [];
      var addedProp = {};
      for (var i2 = 0; i2 < self2.length; i2++) {
        var cxt = self2[i2];
        var oldHasCxt = oldCxtKey[i2] === TRUE;
        var newHasCxt = newCxtKey[i2] === TRUE;
        var cxtHasDiffed = oldHasCxt !== newHasCxt;
        var cxtHasMappedProps = cxt.mappedProperties.length > 0;
        if (cxtHasDiffed || newHasCxt && cxtHasMappedProps) {
          var props = void 0;
          if (cxtHasDiffed && cxtHasMappedProps) {
            props = cxt.properties;
          } else if (cxtHasDiffed) {
            props = cxt.properties;
          } else if (cxtHasMappedProps) {
            props = cxt.mappedProperties;
          }
          for (var j = 0; j < props.length; j++) {
            var prop = props[j];
            var name = prop.name;
            var laterCxtOverrides = false;
            for (var k = i2 + 1; k < self2.length; k++) {
              var laterCxt = self2[k];
              var hasLaterCxt = newCxtKey[k] === TRUE;
              if (!hasLaterCxt) {
                continue;
              }
              laterCxtOverrides = laterCxt.properties[prop.name] != null;
              if (laterCxtOverrides) {
                break;
              }
            }
            if (!addedProp[name] && !laterCxtOverrides) {
              addedProp[name] = true;
              diffProps.push(name);
            }
          }
        }
      }
      cache2[dualCxtKey] = diffProps;
      return diffProps;
    };
    styfn$8.getContextMeta = function(ele) {
      var self2 = this;
      var cxtKey = "";
      var diffProps;
      var prevKey = ele._private.styleCxtKey || "";
      for (var i2 = 0; i2 < self2.length; i2++) {
        var context = self2[i2];
        var contextSelectorMatches = context.selector && context.selector.matches(ele);
        if (contextSelectorMatches) {
          cxtKey += TRUE;
        } else {
          cxtKey += FALSE;
        }
      }
      diffProps = self2.getPropertiesDiff(prevKey, cxtKey);
      ele._private.styleCxtKey = cxtKey;
      return {
        key: cxtKey,
        diffPropNames: diffProps,
        empty: diffProps.length === 0
      };
    };
    styfn$8.getContextStyle = function(cxtMeta) {
      var cxtKey = cxtMeta.key;
      var self2 = this;
      var cxtStyles = this._private.contextStyles = this._private.contextStyles || {};
      if (cxtStyles[cxtKey]) {
        return cxtStyles[cxtKey];
      }
      var style = {
        _private: {
          key: cxtKey
        }
      };
      for (var i2 = 0; i2 < self2.length; i2++) {
        var cxt = self2[i2];
        var hasCxt = cxtKey[i2] === TRUE;
        if (!hasCxt) {
          continue;
        }
        for (var j = 0; j < cxt.properties.length; j++) {
          var prop = cxt.properties[j];
          style[prop.name] = prop;
        }
      }
      cxtStyles[cxtKey] = style;
      return style;
    };
    styfn$8.applyContextStyle = function(cxtMeta, cxtStyle, ele) {
      var self2 = this;
      var diffProps = cxtMeta.diffPropNames;
      var retDiffProps = {};
      var types = self2.types;
      for (var i2 = 0; i2 < diffProps.length; i2++) {
        var diffPropName = diffProps[i2];
        var cxtProp = cxtStyle[diffPropName];
        var eleProp = ele.pstyle(diffPropName);
        if (!cxtProp) {
          if (!eleProp) {
            continue;
          } else if (eleProp.bypass) {
            cxtProp = {
              name: diffPropName,
              deleteBypassed: true
            };
          } else {
            cxtProp = {
              name: diffPropName,
              "delete": true
            };
          }
        }
        if (eleProp === cxtProp) {
          continue;
        }
        if (cxtProp.mapped === types.fn && eleProp != null && eleProp.mapping != null && eleProp.mapping.value === cxtProp.value) {
          var mapping = eleProp.mapping;
          var fnValue = mapping.fnValue = cxtProp.value(ele);
          if (fnValue === mapping.prevFnValue) {
            continue;
          }
        }
        var retDiffProp = retDiffProps[diffPropName] = {
          prev: eleProp
        };
        self2.applyParsedProperty(ele, cxtProp);
        retDiffProp.next = ele.pstyle(diffPropName);
        if (retDiffProp.next && retDiffProp.next.bypass) {
          retDiffProp.next = retDiffProp.next.bypassed;
        }
      }
      return {
        diffProps: retDiffProps
      };
    };
    styfn$8.updateStyleHints = function(ele) {
      var _p = ele._private;
      var self2 = this;
      var propNames = self2.propertyGroupNames;
      var propGrKeys = self2.propertyGroupKeys;
      var propHash = function propHash2(ele2, propNames2, seedKey) {
        return self2.getPropertiesHash(ele2, propNames2, seedKey);
      };
      var oldStyleKey = _p.styleKey;
      if (ele.removed()) {
        return false;
      }
      var isNode = _p.group === "nodes";
      var overriddenStyles = ele._private.style;
      propNames = Object.keys(overriddenStyles);
      for (var i2 = 0; i2 < propGrKeys.length; i2++) {
        var grKey = propGrKeys[i2];
        _p.styleKeys[grKey] = [DEFAULT_HASH_SEED, DEFAULT_HASH_SEED_ALT];
      }
      var updateGrKey1 = function updateGrKey12(val, grKey2) {
        return _p.styleKeys[grKey2][0] = hashInt(val, _p.styleKeys[grKey2][0]);
      };
      var updateGrKey2 = function updateGrKey22(val, grKey2) {
        return _p.styleKeys[grKey2][1] = hashIntAlt(val, _p.styleKeys[grKey2][1]);
      };
      var updateGrKey = function updateGrKey3(val, grKey2) {
        updateGrKey1(val, grKey2);
        updateGrKey2(val, grKey2);
      };
      var updateGrKeyWStr = function updateGrKeyWStr2(strVal, grKey2) {
        for (var j = 0; j < strVal.length; j++) {
          var ch = strVal.charCodeAt(j);
          updateGrKey1(ch, grKey2);
          updateGrKey2(ch, grKey2);
        }
      };
      var N = 2e9;
      var cleanNum = function cleanNum2(val) {
        return -128 < val && val < 128 && Math.floor(val) !== val ? N - (val * 1024 | 0) : val;
      };
      for (var _i = 0; _i < propNames.length; _i++) {
        var name = propNames[_i];
        var parsedProp = overriddenStyles[name];
        if (parsedProp == null) {
          continue;
        }
        var propInfo = this.properties[name];
        var type = propInfo.type;
        var _grKey = propInfo.groupKey;
        var normalizedNumberVal = void 0;
        if (propInfo.hashOverride != null) {
          normalizedNumberVal = propInfo.hashOverride(ele, parsedProp);
        } else if (parsedProp.pfValue != null) {
          normalizedNumberVal = parsedProp.pfValue;
        }
        var numberVal = propInfo.enums == null ? parsedProp.value : null;
        var haveNormNum = normalizedNumberVal != null;
        var haveUnitedNum = numberVal != null;
        var haveNum = haveNormNum || haveUnitedNum;
        var units = parsedProp.units;
        if (type.number && haveNum && !type.multiple) {
          var v = haveNormNum ? normalizedNumberVal : numberVal;
          updateGrKey(cleanNum(v), _grKey);
          if (!haveNormNum && units != null) {
            updateGrKeyWStr(units, _grKey);
          }
        } else {
          updateGrKeyWStr(parsedProp.strValue, _grKey);
        }
      }
      var hash = [DEFAULT_HASH_SEED, DEFAULT_HASH_SEED_ALT];
      for (var _i2 = 0; _i2 < propGrKeys.length; _i2++) {
        var _grKey2 = propGrKeys[_i2];
        var grHash = _p.styleKeys[_grKey2];
        hash[0] = hashInt(grHash[0], hash[0]);
        hash[1] = hashIntAlt(grHash[1], hash[1]);
      }
      _p.styleKey = combineHashes(hash[0], hash[1]);
      var sk = _p.styleKeys;
      _p.labelDimsKey = combineHashesArray(sk.labelDimensions);
      var labelKeys = propHash(ele, ["label"], sk.labelDimensions);
      _p.labelKey = combineHashesArray(labelKeys);
      _p.labelStyleKey = combineHashesArray(hashArrays(sk.commonLabel, labelKeys));
      if (!isNode) {
        var sourceLabelKeys = propHash(ele, ["source-label"], sk.labelDimensions);
        _p.sourceLabelKey = combineHashesArray(sourceLabelKeys);
        _p.sourceLabelStyleKey = combineHashesArray(hashArrays(sk.commonLabel, sourceLabelKeys));
        var targetLabelKeys = propHash(ele, ["target-label"], sk.labelDimensions);
        _p.targetLabelKey = combineHashesArray(targetLabelKeys);
        _p.targetLabelStyleKey = combineHashesArray(hashArrays(sk.commonLabel, targetLabelKeys));
      }
      if (isNode) {
        var _p$styleKeys = _p.styleKeys, nodeBody = _p$styleKeys.nodeBody, nodeBorder = _p$styleKeys.nodeBorder, nodeOutline = _p$styleKeys.nodeOutline, backgroundImage = _p$styleKeys.backgroundImage, compound = _p$styleKeys.compound, pie = _p$styleKeys.pie;
        var nodeKeys = [nodeBody, nodeBorder, nodeOutline, backgroundImage, compound, pie].filter(function(k) {
          return k != null;
        }).reduce(hashArrays, [DEFAULT_HASH_SEED, DEFAULT_HASH_SEED_ALT]);
        _p.nodeKey = combineHashesArray(nodeKeys);
        _p.hasPie = pie != null && pie[0] !== DEFAULT_HASH_SEED && pie[1] !== DEFAULT_HASH_SEED_ALT;
      }
      return oldStyleKey !== _p.styleKey;
    };
    styfn$8.clearStyleHints = function(ele) {
      var _p = ele._private;
      _p.styleCxtKey = "";
      _p.styleKeys = {};
      _p.styleKey = null;
      _p.labelKey = null;
      _p.labelStyleKey = null;
      _p.sourceLabelKey = null;
      _p.sourceLabelStyleKey = null;
      _p.targetLabelKey = null;
      _p.targetLabelStyleKey = null;
      _p.nodeKey = null;
      _p.hasPie = null;
    };
    styfn$8.applyParsedProperty = function(ele, parsedProp) {
      var self2 = this;
      var prop = parsedProp;
      var style = ele._private.style;
      var flatProp;
      var types = self2.types;
      var type = self2.properties[prop.name].type;
      var propIsBypass = prop.bypass;
      var origProp = style[prop.name];
      var origPropIsBypass = origProp && origProp.bypass;
      var _p = ele._private;
      var flatPropMapping = "mapping";
      var getVal = function getVal2(p2) {
        if (p2 == null) {
          return null;
        } else if (p2.pfValue != null) {
          return p2.pfValue;
        } else {
          return p2.value;
        }
      };
      var checkTriggers = function checkTriggers2() {
        var fromVal = getVal(origProp);
        var toVal = getVal(prop);
        self2.checkTriggers(ele, prop.name, fromVal, toVal);
      };
      if (parsedProp.name === "curve-style" && ele.isEdge() && // loops must be bundled beziers
      (parsedProp.value !== "bezier" && ele.isLoop() || // edges connected to compound nodes can not be haystacks
      parsedProp.value === "haystack" && (ele.source().isParent() || ele.target().isParent()))) {
        prop = parsedProp = this.parse(parsedProp.name, "bezier", propIsBypass);
      }
      if (prop["delete"]) {
        style[prop.name] = void 0;
        checkTriggers();
        return true;
      }
      if (prop.deleteBypassed) {
        if (!origProp) {
          checkTriggers();
          return true;
        } else if (origProp.bypass) {
          origProp.bypassed = void 0;
          checkTriggers();
          return true;
        } else {
          return false;
        }
      }
      if (prop.deleteBypass) {
        if (!origProp) {
          checkTriggers();
          return true;
        } else if (origProp.bypass) {
          style[prop.name] = origProp.bypassed;
          checkTriggers();
          return true;
        } else {
          return false;
        }
      }
      var printMappingErr = function printMappingErr2() {
        warn("Do not assign mappings to elements without corresponding data (i.e. ele `" + ele.id() + "` has no mapping for property `" + prop.name + "` with data field `" + prop.field + "`); try a `[" + prop.field + "]` selector to limit scope to elements with `" + prop.field + "` defined");
      };
      switch (prop.mapped) {
        case types.mapData: {
          var fields = prop.field.split(".");
          var fieldVal = _p.data;
          for (var i2 = 0; i2 < fields.length && fieldVal; i2++) {
            var field = fields[i2];
            fieldVal = fieldVal[field];
          }
          if (fieldVal == null) {
            printMappingErr();
            return false;
          }
          var percent;
          if (!number$1(fieldVal)) {
            warn("Do not use continuous mappers without specifying numeric data (i.e. `" + prop.field + ": " + fieldVal + "` for `" + ele.id() + "` is non-numeric)");
            return false;
          } else {
            var fieldWidth = prop.fieldMax - prop.fieldMin;
            if (fieldWidth === 0) {
              percent = 0;
            } else {
              percent = (fieldVal - prop.fieldMin) / fieldWidth;
            }
          }
          if (percent < 0) {
            percent = 0;
          } else if (percent > 1) {
            percent = 1;
          }
          if (type.color) {
            var r1 = prop.valueMin[0];
            var r2 = prop.valueMax[0];
            var g1 = prop.valueMin[1];
            var g2 = prop.valueMax[1];
            var b1 = prop.valueMin[2];
            var b2 = prop.valueMax[2];
            var a1 = prop.valueMin[3] == null ? 1 : prop.valueMin[3];
            var a2 = prop.valueMax[3] == null ? 1 : prop.valueMax[3];
            var clr = [Math.round(r1 + (r2 - r1) * percent), Math.round(g1 + (g2 - g1) * percent), Math.round(b1 + (b2 - b1) * percent), Math.round(a1 + (a2 - a1) * percent)];
            flatProp = {
              // colours are simple, so just create the flat property instead of expensive string parsing
              bypass: prop.bypass,
              // we're a bypass if the mapping property is a bypass
              name: prop.name,
              value: clr,
              strValue: "rgb(" + clr[0] + ", " + clr[1] + ", " + clr[2] + ")"
            };
          } else if (type.number) {
            var calcValue = prop.valueMin + (prop.valueMax - prop.valueMin) * percent;
            flatProp = this.parse(prop.name, calcValue, prop.bypass, flatPropMapping);
          } else {
            return false;
          }
          if (!flatProp) {
            printMappingErr();
            return false;
          }
          flatProp.mapping = prop;
          prop = flatProp;
          break;
        }
        case types.data: {
          var _fields = prop.field.split(".");
          var _fieldVal = _p.data;
          for (var _i3 = 0; _i3 < _fields.length && _fieldVal; _i3++) {
            var _field = _fields[_i3];
            _fieldVal = _fieldVal[_field];
          }
          if (_fieldVal != null) {
            flatProp = this.parse(prop.name, _fieldVal, prop.bypass, flatPropMapping);
          }
          if (!flatProp) {
            printMappingErr();
            return false;
          }
          flatProp.mapping = prop;
          prop = flatProp;
          break;
        }
        case types.fn: {
          var fn2 = prop.value;
          var fnRetVal = prop.fnValue != null ? prop.fnValue : fn2(ele);
          prop.prevFnValue = fnRetVal;
          if (fnRetVal == null) {
            warn("Custom function mappers may not return null (i.e. `" + prop.name + "` for ele `" + ele.id() + "` is null)");
            return false;
          }
          flatProp = this.parse(prop.name, fnRetVal, prop.bypass, flatPropMapping);
          if (!flatProp) {
            warn("Custom function mappers may not return invalid values for the property type (i.e. `" + prop.name + "` for ele `" + ele.id() + "` is invalid)");
            return false;
          }
          flatProp.mapping = copy(prop);
          prop = flatProp;
          break;
        }
        case void 0:
          break;
        default:
          return false;
      }
      if (propIsBypass) {
        if (origPropIsBypass) {
          prop.bypassed = origProp.bypassed;
        } else {
          prop.bypassed = origProp;
        }
        style[prop.name] = prop;
      } else {
        if (origPropIsBypass) {
          origProp.bypassed = prop;
        } else {
          style[prop.name] = prop;
        }
      }
      checkTriggers();
      return true;
    };
    styfn$8.cleanElements = function(eles, keepBypasses) {
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        this.clearStyleHints(ele);
        ele.dirtyCompoundBoundsCache();
        ele.dirtyBoundingBoxCache();
        if (!keepBypasses) {
          ele._private.style = {};
        } else {
          var style = ele._private.style;
          var propNames = Object.keys(style);
          for (var j = 0; j < propNames.length; j++) {
            var propName = propNames[j];
            var eleProp = style[propName];
            if (eleProp != null) {
              if (eleProp.bypass) {
                eleProp.bypassed = null;
              } else {
                style[propName] = null;
              }
            }
          }
        }
      }
    };
    styfn$8.update = function() {
      var cy = this._private.cy;
      var eles = cy.mutableElements();
      eles.updateStyle();
    };
    styfn$8.updateTransitions = function(ele, diffProps) {
      var self2 = this;
      var _p = ele._private;
      var props = ele.pstyle("transition-property").value;
      var duration = ele.pstyle("transition-duration").pfValue;
      var delay = ele.pstyle("transition-delay").pfValue;
      if (props.length > 0 && duration > 0) {
        var style = {};
        var anyPrev = false;
        for (var i2 = 0; i2 < props.length; i2++) {
          var prop = props[i2];
          var styProp = ele.pstyle(prop);
          var diffProp = diffProps[prop];
          if (!diffProp) {
            continue;
          }
          var prevProp = diffProp.prev;
          var fromProp = prevProp;
          var toProp = diffProp.next != null ? diffProp.next : styProp;
          var diff = false;
          var initVal = void 0;
          var initDt = 1e-6;
          if (!fromProp) {
            continue;
          }
          if (number$1(fromProp.pfValue) && number$1(toProp.pfValue)) {
            diff = toProp.pfValue - fromProp.pfValue;
            initVal = fromProp.pfValue + initDt * diff;
          } else if (number$1(fromProp.value) && number$1(toProp.value)) {
            diff = toProp.value - fromProp.value;
            initVal = fromProp.value + initDt * diff;
          } else if (array(fromProp.value) && array(toProp.value)) {
            diff = fromProp.value[0] !== toProp.value[0] || fromProp.value[1] !== toProp.value[1] || fromProp.value[2] !== toProp.value[2];
            initVal = fromProp.strValue;
          }
          if (diff) {
            style[prop] = toProp.strValue;
            this.applyBypass(ele, prop, initVal);
            anyPrev = true;
          }
        }
        if (!anyPrev) {
          return;
        }
        _p.transitioning = true;
        new Promise$1(function(resolve2) {
          if (delay > 0) {
            ele.delayAnimation(delay).play().promise().then(resolve2);
          } else {
            resolve2();
          }
        }).then(function() {
          return ele.animation({
            style,
            duration,
            easing: ele.pstyle("transition-timing-function").value,
            queue: false
          }).play().promise();
        }).then(function() {
          self2.removeBypasses(ele, props);
          ele.emitAndNotify("style");
          _p.transitioning = false;
        });
      } else if (_p.transitioning) {
        this.removeBypasses(ele, props);
        ele.emitAndNotify("style");
        _p.transitioning = false;
      }
    };
    styfn$8.checkTrigger = function(ele, name, fromValue, toValue, getTrigger, onTrigger) {
      var prop = this.properties[name];
      var triggerCheck = getTrigger(prop);
      if (triggerCheck != null && triggerCheck(fromValue, toValue)) {
        onTrigger(prop);
      }
    };
    styfn$8.checkZOrderTrigger = function(ele, name, fromValue, toValue) {
      var _this = this;
      this.checkTrigger(ele, name, fromValue, toValue, function(prop) {
        return prop.triggersZOrder;
      }, function() {
        _this._private.cy.notify("zorder", ele);
      });
    };
    styfn$8.checkBoundsTrigger = function(ele, name, fromValue, toValue) {
      this.checkTrigger(ele, name, fromValue, toValue, function(prop) {
        return prop.triggersBounds;
      }, function(prop) {
        ele.dirtyCompoundBoundsCache();
        ele.dirtyBoundingBoxCache();
        if (
          // only for beziers -- so performance of other edges isn't affected
          prop.triggersBoundsOfParallelBeziers && name === "curve-style" && (fromValue === "bezier" || toValue === "bezier")
        ) {
          ele.parallelEdges().forEach(function(pllEdge) {
            if (pllEdge.isBundledBezier()) {
              pllEdge.dirtyBoundingBoxCache();
            }
          });
        }
        if (prop.triggersBoundsOfConnectedEdges && name === "display" && (fromValue === "none" || toValue === "none")) {
          ele.connectedEdges().forEach(function(edge) {
            edge.dirtyBoundingBoxCache();
          });
        }
      });
    };
    styfn$8.checkTriggers = function(ele, name, fromValue, toValue) {
      ele.dirtyStyleCache();
      this.checkZOrderTrigger(ele, name, fromValue, toValue);
      this.checkBoundsTrigger(ele, name, fromValue, toValue);
    };
    var styfn$7 = {};
    styfn$7.applyBypass = function(eles, name, value, updateTransitions) {
      var self2 = this;
      var props = [];
      var isBypass = true;
      if (name === "*" || name === "**") {
        if (value !== void 0) {
          for (var i2 = 0; i2 < self2.properties.length; i2++) {
            var prop = self2.properties[i2];
            var _name = prop.name;
            var parsedProp = this.parse(_name, value, true);
            if (parsedProp) {
              props.push(parsedProp);
            }
          }
        }
      } else if (string(name)) {
        var _parsedProp = this.parse(name, value, true);
        if (_parsedProp) {
          props.push(_parsedProp);
        }
      } else if (plainObject(name)) {
        var specifiedProps = name;
        updateTransitions = value;
        var names = Object.keys(specifiedProps);
        for (var _i = 0; _i < names.length; _i++) {
          var _name2 = names[_i];
          var _value = specifiedProps[_name2];
          if (_value === void 0) {
            _value = specifiedProps[dash2camel(_name2)];
          }
          if (_value !== void 0) {
            var _parsedProp2 = this.parse(_name2, _value, true);
            if (_parsedProp2) {
              props.push(_parsedProp2);
            }
          }
        }
      } else {
        return false;
      }
      if (props.length === 0) {
        return false;
      }
      var ret = false;
      for (var _i2 = 0; _i2 < eles.length; _i2++) {
        var ele = eles[_i2];
        var diffProps = {};
        var diffProp = void 0;
        for (var j = 0; j < props.length; j++) {
          var _prop = props[j];
          if (updateTransitions) {
            var prevProp = ele.pstyle(_prop.name);
            diffProp = diffProps[_prop.name] = {
              prev: prevProp
            };
          }
          ret = this.applyParsedProperty(ele, copy(_prop)) || ret;
          if (updateTransitions) {
            diffProp.next = ele.pstyle(_prop.name);
          }
        }
        if (ret) {
          this.updateStyleHints(ele);
        }
        if (updateTransitions) {
          this.updateTransitions(ele, diffProps, isBypass);
        }
      }
      return ret;
    };
    styfn$7.overrideBypass = function(eles, name, value) {
      name = camel2dash(name);
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        var prop = ele._private.style[name];
        var type = this.properties[name].type;
        var isColor = type.color;
        var isMulti = type.mutiple;
        var oldValue = !prop ? null : prop.pfValue != null ? prop.pfValue : prop.value;
        if (!prop || !prop.bypass) {
          this.applyBypass(ele, name, value);
        } else {
          prop.value = value;
          if (prop.pfValue != null) {
            prop.pfValue = value;
          }
          if (isColor) {
            prop.strValue = "rgb(" + value.join(",") + ")";
          } else if (isMulti) {
            prop.strValue = value.join(" ");
          } else {
            prop.strValue = "" + value;
          }
          this.updateStyleHints(ele);
        }
        this.checkTriggers(ele, name, oldValue, value);
      }
    };
    styfn$7.removeAllBypasses = function(eles, updateTransitions) {
      return this.removeBypasses(eles, this.propertyNames, updateTransitions);
    };
    styfn$7.removeBypasses = function(eles, props, updateTransitions) {
      var isBypass = true;
      for (var j = 0; j < eles.length; j++) {
        var ele = eles[j];
        var diffProps = {};
        for (var i2 = 0; i2 < props.length; i2++) {
          var name = props[i2];
          var prop = this.properties[name];
          var prevProp = ele.pstyle(prop.name);
          if (!prevProp || !prevProp.bypass) {
            continue;
          }
          var value = "";
          var parsedProp = this.parse(name, value, true);
          var diffProp = diffProps[prop.name] = {
            prev: prevProp
          };
          this.applyParsedProperty(ele, parsedProp);
          diffProp.next = ele.pstyle(prop.name);
        }
        this.updateStyleHints(ele);
        if (updateTransitions) {
          this.updateTransitions(ele, diffProps, isBypass);
        }
      }
    };
    var styfn$6 = {};
    styfn$6.getEmSizeInPixels = function() {
      var px = this.containerCss("font-size");
      if (px != null) {
        return parseFloat(px);
      } else {
        return 1;
      }
    };
    styfn$6.containerCss = function(propName) {
      var cy = this._private.cy;
      var domElement2 = cy.container();
      var containerWindow = cy.window();
      if (containerWindow && domElement2 && containerWindow.getComputedStyle) {
        return containerWindow.getComputedStyle(domElement2).getPropertyValue(propName);
      }
    };
    var styfn$5 = {};
    styfn$5.getRenderedStyle = function(ele, prop) {
      if (prop) {
        return this.getStylePropertyValue(ele, prop, true);
      } else {
        return this.getRawStyle(ele, true);
      }
    };
    styfn$5.getRawStyle = function(ele, isRenderedVal) {
      var self2 = this;
      ele = ele[0];
      if (ele) {
        var rstyle = {};
        for (var i2 = 0; i2 < self2.properties.length; i2++) {
          var prop = self2.properties[i2];
          var val = self2.getStylePropertyValue(ele, prop.name, isRenderedVal);
          if (val != null) {
            rstyle[prop.name] = val;
            rstyle[dash2camel(prop.name)] = val;
          }
        }
        return rstyle;
      }
    };
    styfn$5.getIndexedStyle = function(ele, property, subproperty, index) {
      var pstyle = ele.pstyle(property)[subproperty][index];
      return pstyle != null ? pstyle : ele.cy().style().getDefaultProperty(property)[subproperty][0];
    };
    styfn$5.getStylePropertyValue = function(ele, propName, isRenderedVal) {
      var self2 = this;
      ele = ele[0];
      if (ele) {
        var prop = self2.properties[propName];
        if (prop.alias) {
          prop = prop.pointsTo;
        }
        var type = prop.type;
        var styleProp = ele.pstyle(prop.name);
        if (styleProp) {
          var value = styleProp.value, units = styleProp.units, strValue = styleProp.strValue;
          if (isRenderedVal && type.number && value != null && number$1(value)) {
            var zoom = ele.cy().zoom();
            var getRenderedValue = function getRenderedValue2(val) {
              return val * zoom;
            };
            var getValueStringWithUnits = function getValueStringWithUnits2(val, units2) {
              return getRenderedValue(val) + units2;
            };
            var isArrayValue = array(value);
            var haveUnits = isArrayValue ? units.every(function(u) {
              return u != null;
            }) : units != null;
            if (haveUnits) {
              if (isArrayValue) {
                return value.map(function(v, i2) {
                  return getValueStringWithUnits(v, units[i2]);
                }).join(" ");
              } else {
                return getValueStringWithUnits(value, units);
              }
            } else {
              if (isArrayValue) {
                return value.map(function(v) {
                  return string(v) ? v : "" + getRenderedValue(v);
                }).join(" ");
              } else {
                return "" + getRenderedValue(value);
              }
            }
          } else if (strValue != null) {
            return strValue;
          }
        }
        return null;
      }
    };
    styfn$5.getAnimationStartStyle = function(ele, aniProps) {
      var rstyle = {};
      for (var i2 = 0; i2 < aniProps.length; i2++) {
        var aniProp = aniProps[i2];
        var name = aniProp.name;
        var styleProp = ele.pstyle(name);
        if (styleProp !== void 0) {
          if (plainObject(styleProp)) {
            styleProp = this.parse(name, styleProp.strValue);
          } else {
            styleProp = this.parse(name, styleProp);
          }
        }
        if (styleProp) {
          rstyle[name] = styleProp;
        }
      }
      return rstyle;
    };
    styfn$5.getPropsList = function(propsObj) {
      var self2 = this;
      var rstyle = [];
      var style = propsObj;
      var props = self2.properties;
      if (style) {
        var names = Object.keys(style);
        for (var i2 = 0; i2 < names.length; i2++) {
          var name = names[i2];
          var val = style[name];
          var prop = props[name] || props[camel2dash(name)];
          var styleProp = this.parse(prop.name, val);
          if (styleProp) {
            rstyle.push(styleProp);
          }
        }
      }
      return rstyle;
    };
    styfn$5.getNonDefaultPropertiesHash = function(ele, propNames, seed) {
      var hash = seed.slice();
      var name, val, strVal, chVal;
      var i2, j;
      for (i2 = 0; i2 < propNames.length; i2++) {
        name = propNames[i2];
        val = ele.pstyle(name, false);
        if (val == null) {
          continue;
        } else if (val.pfValue != null) {
          hash[0] = hashInt(chVal, hash[0]);
          hash[1] = hashIntAlt(chVal, hash[1]);
        } else {
          strVal = val.strValue;
          for (j = 0; j < strVal.length; j++) {
            chVal = strVal.charCodeAt(j);
            hash[0] = hashInt(chVal, hash[0]);
            hash[1] = hashIntAlt(chVal, hash[1]);
          }
        }
      }
      return hash;
    };
    styfn$5.getPropertiesHash = styfn$5.getNonDefaultPropertiesHash;
    var styfn$4 = {};
    styfn$4.appendFromJson = function(json) {
      var style = this;
      for (var i2 = 0; i2 < json.length; i2++) {
        var context = json[i2];
        var selector = context.selector;
        var props = context.style || context.css;
        var names = Object.keys(props);
        style.selector(selector);
        for (var j = 0; j < names.length; j++) {
          var name = names[j];
          var value = props[name];
          style.css(name, value);
        }
      }
      return style;
    };
    styfn$4.fromJson = function(json) {
      var style = this;
      style.resetToDefault();
      style.appendFromJson(json);
      return style;
    };
    styfn$4.json = function() {
      var json = [];
      for (var i2 = this.defaultLength; i2 < this.length; i2++) {
        var cxt = this[i2];
        var selector = cxt.selector;
        var props = cxt.properties;
        var css = {};
        for (var j = 0; j < props.length; j++) {
          var prop = props[j];
          css[prop.name] = prop.strValue;
        }
        json.push({
          selector: !selector ? "core" : selector.toString(),
          style: css
        });
      }
      return json;
    };
    var styfn$3 = {};
    styfn$3.appendFromString = function(string2) {
      var self2 = this;
      var style = this;
      var remaining = "" + string2;
      var selAndBlockStr;
      var blockRem;
      var propAndValStr;
      remaining = remaining.replace(/[/][*](\s|.)+?[*][/]/g, "");
      function removeSelAndBlockFromRemaining() {
        if (remaining.length > selAndBlockStr.length) {
          remaining = remaining.substr(selAndBlockStr.length);
        } else {
          remaining = "";
        }
      }
      function removePropAndValFromRem() {
        if (blockRem.length > propAndValStr.length) {
          blockRem = blockRem.substr(propAndValStr.length);
        } else {
          blockRem = "";
        }
      }
      for (; ; ) {
        var nothingLeftToParse = remaining.match(/^\s*$/);
        if (nothingLeftToParse) {
          break;
        }
        var selAndBlock = remaining.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);
        if (!selAndBlock) {
          warn("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: " + remaining);
          break;
        }
        selAndBlockStr = selAndBlock[0];
        var selectorStr = selAndBlock[1];
        if (selectorStr !== "core") {
          var selector = new Selector(selectorStr);
          if (selector.invalid) {
            warn("Skipping parsing of block: Invalid selector found in string stylesheet: " + selectorStr);
            removeSelAndBlockFromRemaining();
            continue;
          }
        }
        var blockStr = selAndBlock[2];
        var invalidBlock = false;
        blockRem = blockStr;
        var props = [];
        for (; ; ) {
          var _nothingLeftToParse = blockRem.match(/^\s*$/);
          if (_nothingLeftToParse) {
            break;
          }
          var propAndVal = blockRem.match(/^\s*(.+?)\s*:\s*(.+?)(?:\s*;|\s*$)/);
          if (!propAndVal) {
            warn("Skipping parsing of block: Invalid formatting of style property and value definitions found in:" + blockStr);
            invalidBlock = true;
            break;
          }
          propAndValStr = propAndVal[0];
          var propStr = propAndVal[1];
          var valStr = propAndVal[2];
          var prop = self2.properties[propStr];
          if (!prop) {
            warn("Skipping property: Invalid property name in: " + propAndValStr);
            removePropAndValFromRem();
            continue;
          }
          var parsedProp = style.parse(propStr, valStr);
          if (!parsedProp) {
            warn("Skipping property: Invalid property definition in: " + propAndValStr);
            removePropAndValFromRem();
            continue;
          }
          props.push({
            name: propStr,
            val: valStr
          });
          removePropAndValFromRem();
        }
        if (invalidBlock) {
          removeSelAndBlockFromRemaining();
          break;
        }
        style.selector(selectorStr);
        for (var i2 = 0; i2 < props.length; i2++) {
          var _prop = props[i2];
          style.css(_prop.name, _prop.val);
        }
        removeSelAndBlockFromRemaining();
      }
      return style;
    };
    styfn$3.fromString = function(string2) {
      var style = this;
      style.resetToDefault();
      style.appendFromString(string2);
      return style;
    };
    var styfn$2 = {};
    (function() {
      var number$12 = number;
      var rgba2 = rgbaNoBackRefs;
      var hsla2 = hslaNoBackRefs;
      var hex3$1 = hex3;
      var hex6$1 = hex6;
      var data2 = function data3(prefix) {
        return "^" + prefix + "\\s*\\(\\s*([\\w\\.]+)\\s*\\)$";
      };
      var mapData = function mapData2(prefix) {
        var mapArg = number$12 + "|\\w+|" + rgba2 + "|" + hsla2 + "|" + hex3$1 + "|" + hex6$1;
        return "^" + prefix + "\\s*\\(([\\w\\.]+)\\s*\\,\\s*(" + number$12 + ")\\s*\\,\\s*(" + number$12 + ")\\s*,\\s*(" + mapArg + ")\\s*\\,\\s*(" + mapArg + ")\\)$";
      };
      var urlRegexes = [`^url\\s*\\(\\s*['"]?(.+?)['"]?\\s*\\)$`, "^(none)$", "^(.+)$"];
      styfn$2.types = {
        time: {
          number: true,
          min: 0,
          units: "s|ms",
          implicitUnits: "ms"
        },
        percent: {
          number: true,
          min: 0,
          max: 100,
          units: "%",
          implicitUnits: "%"
        },
        percentages: {
          number: true,
          min: 0,
          max: 100,
          units: "%",
          implicitUnits: "%",
          multiple: true
        },
        zeroOneNumber: {
          number: true,
          min: 0,
          max: 1,
          unitless: true
        },
        zeroOneNumbers: {
          number: true,
          min: 0,
          max: 1,
          unitless: true,
          multiple: true
        },
        nOneOneNumber: {
          number: true,
          min: -1,
          max: 1,
          unitless: true
        },
        nonNegativeInt: {
          number: true,
          min: 0,
          integer: true,
          unitless: true
        },
        nonNegativeNumber: {
          number: true,
          min: 0,
          unitless: true
        },
        position: {
          enums: ["parent", "origin"]
        },
        nodeSize: {
          number: true,
          min: 0,
          enums: ["label"]
        },
        number: {
          number: true,
          unitless: true
        },
        numbers: {
          number: true,
          unitless: true,
          multiple: true
        },
        positiveNumber: {
          number: true,
          unitless: true,
          min: 0,
          strictMin: true
        },
        size: {
          number: true,
          min: 0
        },
        bidirectionalSize: {
          number: true
        },
        // allows negative
        bidirectionalSizeMaybePercent: {
          number: true,
          allowPercent: true
        },
        // allows negative
        bidirectionalSizes: {
          number: true,
          multiple: true
        },
        // allows negative
        sizeMaybePercent: {
          number: true,
          min: 0,
          allowPercent: true
        },
        axisDirection: {
          enums: ["horizontal", "leftward", "rightward", "vertical", "upward", "downward", "auto"]
        },
        paddingRelativeTo: {
          enums: ["width", "height", "average", "min", "max"]
        },
        bgWH: {
          number: true,
          min: 0,
          allowPercent: true,
          enums: ["auto"],
          multiple: true
        },
        bgPos: {
          number: true,
          allowPercent: true,
          multiple: true
        },
        bgRelativeTo: {
          enums: ["inner", "include-padding"],
          multiple: true
        },
        bgRepeat: {
          enums: ["repeat", "repeat-x", "repeat-y", "no-repeat"],
          multiple: true
        },
        bgFit: {
          enums: ["none", "contain", "cover"],
          multiple: true
        },
        bgCrossOrigin: {
          enums: ["anonymous", "use-credentials", "null"],
          multiple: true
        },
        bgClip: {
          enums: ["none", "node"],
          multiple: true
        },
        bgContainment: {
          enums: ["inside", "over"],
          multiple: true
        },
        color: {
          color: true
        },
        colors: {
          color: true,
          multiple: true
        },
        fill: {
          enums: ["solid", "linear-gradient", "radial-gradient"]
        },
        bool: {
          enums: ["yes", "no"]
        },
        bools: {
          enums: ["yes", "no"],
          multiple: true
        },
        lineStyle: {
          enums: ["solid", "dotted", "dashed"]
        },
        lineCap: {
          enums: ["butt", "round", "square"]
        },
        borderStyle: {
          enums: ["solid", "dotted", "dashed", "double"]
        },
        curveStyle: {
          enums: ["bezier", "unbundled-bezier", "haystack", "segments", "straight", "straight-triangle", "taxi"]
        },
        fontFamily: {
          regex: '^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$'
        },
        fontStyle: {
          enums: ["italic", "normal", "oblique"]
        },
        fontWeight: {
          enums: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "800", "900", 100, 200, 300, 400, 500, 600, 700, 800, 900]
        },
        textDecoration: {
          enums: ["none", "underline", "overline", "line-through"]
        },
        textTransform: {
          enums: ["none", "uppercase", "lowercase"]
        },
        textWrap: {
          enums: ["none", "wrap", "ellipsis"]
        },
        textOverflowWrap: {
          enums: ["whitespace", "anywhere"]
        },
        textBackgroundShape: {
          enums: ["rectangle", "roundrectangle", "round-rectangle"]
        },
        nodeShape: {
          enums: ["rectangle", "roundrectangle", "round-rectangle", "cutrectangle", "cut-rectangle", "bottomroundrectangle", "bottom-round-rectangle", "barrel", "ellipse", "triangle", "round-triangle", "square", "pentagon", "round-pentagon", "hexagon", "round-hexagon", "concavehexagon", "concave-hexagon", "heptagon", "round-heptagon", "octagon", "round-octagon", "tag", "round-tag", "star", "diamond", "round-diamond", "vee", "rhomboid", "right-rhomboid", "polygon"]
        },
        overlayShape: {
          enums: ["roundrectangle", "round-rectangle", "ellipse"]
        },
        compoundIncludeLabels: {
          enums: ["include", "exclude"]
        },
        arrowShape: {
          enums: ["tee", "triangle", "triangle-tee", "circle-triangle", "triangle-cross", "triangle-backcurve", "vee", "square", "circle", "diamond", "chevron", "none"]
        },
        arrowFill: {
          enums: ["filled", "hollow"]
        },
        arrowWidth: {
          number: true,
          units: "%|px|em",
          implicitUnits: "px",
          enums: ["match-line"]
        },
        display: {
          enums: ["element", "none"]
        },
        visibility: {
          enums: ["hidden", "visible"]
        },
        zCompoundDepth: {
          enums: ["bottom", "orphan", "auto", "top"]
        },
        zIndexCompare: {
          enums: ["auto", "manual"]
        },
        valign: {
          enums: ["top", "center", "bottom"]
        },
        halign: {
          enums: ["left", "center", "right"]
        },
        justification: {
          enums: ["left", "center", "right", "auto"]
        },
        text: {
          string: true
        },
        data: {
          mapping: true,
          regex: data2("data")
        },
        layoutData: {
          mapping: true,
          regex: data2("layoutData")
        },
        scratch: {
          mapping: true,
          regex: data2("scratch")
        },
        mapData: {
          mapping: true,
          regex: mapData("mapData")
        },
        mapLayoutData: {
          mapping: true,
          regex: mapData("mapLayoutData")
        },
        mapScratch: {
          mapping: true,
          regex: mapData("mapScratch")
        },
        fn: {
          mapping: true,
          fn: true
        },
        url: {
          regexes: urlRegexes,
          singleRegexMatchValue: true
        },
        urls: {
          regexes: urlRegexes,
          singleRegexMatchValue: true,
          multiple: true
        },
        propList: {
          propList: true
        },
        angle: {
          number: true,
          units: "deg|rad",
          implicitUnits: "rad"
        },
        textRotation: {
          number: true,
          units: "deg|rad",
          implicitUnits: "rad",
          enums: ["none", "autorotate"]
        },
        polygonPointList: {
          number: true,
          multiple: true,
          evenMultiple: true,
          min: -1,
          max: 1,
          unitless: true
        },
        edgeDistances: {
          enums: ["intersection", "node-position", "endpoints"]
        },
        edgeEndpoint: {
          number: true,
          multiple: true,
          units: "%|px|em|deg|rad",
          implicitUnits: "px",
          enums: ["inside-to-node", "outside-to-node", "outside-to-node-or-label", "outside-to-line", "outside-to-line-or-label"],
          singleEnum: true,
          validate: function validate(valArr, unitsArr) {
            switch (valArr.length) {
              case 2:
                return unitsArr[0] !== "deg" && unitsArr[0] !== "rad" && unitsArr[1] !== "deg" && unitsArr[1] !== "rad";
              case 1:
                return string(valArr[0]) || unitsArr[0] === "deg" || unitsArr[0] === "rad";
              default:
                return false;
            }
          }
        },
        easing: {
          regexes: ["^(spring)\\s*\\(\\s*(" + number$12 + ")\\s*,\\s*(" + number$12 + ")\\s*\\)$", "^(cubic-bezier)\\s*\\(\\s*(" + number$12 + ")\\s*,\\s*(" + number$12 + ")\\s*,\\s*(" + number$12 + ")\\s*,\\s*(" + number$12 + ")\\s*\\)$"],
          enums: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "ease-in-sine", "ease-out-sine", "ease-in-out-sine", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-circ", "ease-out-circ", "ease-in-out-circ"]
        },
        gradientDirection: {
          enums: [
            "to-bottom",
            "to-top",
            "to-left",
            "to-right",
            "to-bottom-right",
            "to-bottom-left",
            "to-top-right",
            "to-top-left",
            "to-right-bottom",
            "to-left-bottom",
            "to-right-top",
            "to-left-top"
            // different order
          ]
        },
        boundsExpansion: {
          number: true,
          multiple: true,
          min: 0,
          validate: function validate(valArr) {
            var length = valArr.length;
            return length === 1 || length === 2 || length === 4;
          }
        }
      };
      var diff = {
        zeroNonZero: function zeroNonZero(val1, val2) {
          if ((val1 == null || val2 == null) && val1 !== val2) {
            return true;
          }
          if (val1 == 0 && val2 != 0) {
            return true;
          } else if (val1 != 0 && val2 == 0) {
            return true;
          } else {
            return false;
          }
        },
        any: function any(val1, val2) {
          return val1 != val2;
        },
        emptyNonEmpty: function emptyNonEmpty(str1, str2) {
          var empty1 = emptyString(str1);
          var empty2 = emptyString(str2);
          return empty1 && !empty2 || !empty1 && empty2;
        }
      };
      var t = styfn$2.types;
      var mainLabel = [{
        name: "label",
        type: t.text,
        triggersBounds: diff.any,
        triggersZOrder: diff.emptyNonEmpty
      }, {
        name: "text-rotation",
        type: t.textRotation,
        triggersBounds: diff.any
      }, {
        name: "text-margin-x",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }, {
        name: "text-margin-y",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }];
      var sourceLabel = [{
        name: "source-label",
        type: t.text,
        triggersBounds: diff.any
      }, {
        name: "source-text-rotation",
        type: t.textRotation,
        triggersBounds: diff.any
      }, {
        name: "source-text-margin-x",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }, {
        name: "source-text-margin-y",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }, {
        name: "source-text-offset",
        type: t.size,
        triggersBounds: diff.any
      }];
      var targetLabel = [{
        name: "target-label",
        type: t.text,
        triggersBounds: diff.any
      }, {
        name: "target-text-rotation",
        type: t.textRotation,
        triggersBounds: diff.any
      }, {
        name: "target-text-margin-x",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }, {
        name: "target-text-margin-y",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }, {
        name: "target-text-offset",
        type: t.size,
        triggersBounds: diff.any
      }];
      var labelDimensions = [{
        name: "font-family",
        type: t.fontFamily,
        triggersBounds: diff.any
      }, {
        name: "font-style",
        type: t.fontStyle,
        triggersBounds: diff.any
      }, {
        name: "font-weight",
        type: t.fontWeight,
        triggersBounds: diff.any
      }, {
        name: "font-size",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "text-transform",
        type: t.textTransform,
        triggersBounds: diff.any
      }, {
        name: "text-wrap",
        type: t.textWrap,
        triggersBounds: diff.any
      }, {
        name: "text-overflow-wrap",
        type: t.textOverflowWrap,
        triggersBounds: diff.any
      }, {
        name: "text-max-width",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "text-outline-width",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "line-height",
        type: t.positiveNumber,
        triggersBounds: diff.any
      }];
      var commonLabel = [{
        name: "text-valign",
        type: t.valign,
        triggersBounds: diff.any
      }, {
        name: "text-halign",
        type: t.halign,
        triggersBounds: diff.any
      }, {
        name: "color",
        type: t.color
      }, {
        name: "text-outline-color",
        type: t.color
      }, {
        name: "text-outline-opacity",
        type: t.zeroOneNumber
      }, {
        name: "text-background-color",
        type: t.color
      }, {
        name: "text-background-opacity",
        type: t.zeroOneNumber
      }, {
        name: "text-background-padding",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "text-border-opacity",
        type: t.zeroOneNumber
      }, {
        name: "text-border-color",
        type: t.color
      }, {
        name: "text-border-width",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "text-border-style",
        type: t.borderStyle,
        triggersBounds: diff.any
      }, {
        name: "text-background-shape",
        type: t.textBackgroundShape,
        triggersBounds: diff.any
      }, {
        name: "text-justification",
        type: t.justification
      }];
      var behavior = [{
        name: "events",
        type: t.bool,
        triggersZOrder: diff.any
      }, {
        name: "text-events",
        type: t.bool,
        triggersZOrder: diff.any
      }];
      var visibility = [{
        name: "display",
        type: t.display,
        triggersZOrder: diff.any,
        triggersBounds: diff.any,
        triggersBoundsOfConnectedEdges: true
      }, {
        name: "visibility",
        type: t.visibility,
        triggersZOrder: diff.any
      }, {
        name: "opacity",
        type: t.zeroOneNumber,
        triggersZOrder: diff.zeroNonZero
      }, {
        name: "text-opacity",
        type: t.zeroOneNumber
      }, {
        name: "min-zoomed-font-size",
        type: t.size
      }, {
        name: "z-compound-depth",
        type: t.zCompoundDepth,
        triggersZOrder: diff.any
      }, {
        name: "z-index-compare",
        type: t.zIndexCompare,
        triggersZOrder: diff.any
      }, {
        name: "z-index",
        type: t.number,
        triggersZOrder: diff.any
      }];
      var overlay = [{
        name: "overlay-padding",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "overlay-color",
        type: t.color
      }, {
        name: "overlay-opacity",
        type: t.zeroOneNumber,
        triggersBounds: diff.zeroNonZero
      }, {
        name: "overlay-shape",
        type: t.overlayShape,
        triggersBounds: diff.any
      }];
      var underlay = [{
        name: "underlay-padding",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "underlay-color",
        type: t.color
      }, {
        name: "underlay-opacity",
        type: t.zeroOneNumber,
        triggersBounds: diff.zeroNonZero
      }, {
        name: "underlay-shape",
        type: t.overlayShape,
        triggersBounds: diff.any
      }];
      var transition = [{
        name: "transition-property",
        type: t.propList
      }, {
        name: "transition-duration",
        type: t.time
      }, {
        name: "transition-delay",
        type: t.time
      }, {
        name: "transition-timing-function",
        type: t.easing
      }];
      var nodeSizeHashOverride = function nodeSizeHashOverride2(ele, parsedProp) {
        if (parsedProp.value === "label") {
          return -ele.poolIndex();
        } else {
          return parsedProp.pfValue;
        }
      };
      var nodeBody = [{
        name: "height",
        type: t.nodeSize,
        triggersBounds: diff.any,
        hashOverride: nodeSizeHashOverride
      }, {
        name: "width",
        type: t.nodeSize,
        triggersBounds: diff.any,
        hashOverride: nodeSizeHashOverride
      }, {
        name: "shape",
        type: t.nodeShape,
        triggersBounds: diff.any
      }, {
        name: "shape-polygon-points",
        type: t.polygonPointList,
        triggersBounds: diff.any
      }, {
        name: "background-color",
        type: t.color
      }, {
        name: "background-fill",
        type: t.fill
      }, {
        name: "background-opacity",
        type: t.zeroOneNumber
      }, {
        name: "background-blacken",
        type: t.nOneOneNumber
      }, {
        name: "background-gradient-stop-colors",
        type: t.colors
      }, {
        name: "background-gradient-stop-positions",
        type: t.percentages
      }, {
        name: "background-gradient-direction",
        type: t.gradientDirection
      }, {
        name: "padding",
        type: t.sizeMaybePercent,
        triggersBounds: diff.any
      }, {
        name: "padding-relative-to",
        type: t.paddingRelativeTo,
        triggersBounds: diff.any
      }, {
        name: "bounds-expansion",
        type: t.boundsExpansion,
        triggersBounds: diff.any
      }];
      var nodeBorder = [{
        name: "border-color",
        type: t.color
      }, {
        name: "border-opacity",
        type: t.zeroOneNumber
      }, {
        name: "border-width",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "border-style",
        type: t.borderStyle
      }];
      var nodeOutline = [{
        name: "outline-color",
        type: t.color
      }, {
        name: "outline-opacity",
        type: t.zeroOneNumber
      }, {
        name: "outline-width",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "outline-style",
        type: t.borderStyle
      }, {
        name: "outline-offset",
        type: t.size,
        triggersBounds: diff.any
      }];
      var backgroundImage = [{
        name: "background-image",
        type: t.urls
      }, {
        name: "background-image-crossorigin",
        type: t.bgCrossOrigin
      }, {
        name: "background-image-opacity",
        type: t.zeroOneNumbers
      }, {
        name: "background-image-containment",
        type: t.bgContainment
      }, {
        name: "background-image-smoothing",
        type: t.bools
      }, {
        name: "background-position-x",
        type: t.bgPos
      }, {
        name: "background-position-y",
        type: t.bgPos
      }, {
        name: "background-width-relative-to",
        type: t.bgRelativeTo
      }, {
        name: "background-height-relative-to",
        type: t.bgRelativeTo
      }, {
        name: "background-repeat",
        type: t.bgRepeat
      }, {
        name: "background-fit",
        type: t.bgFit
      }, {
        name: "background-clip",
        type: t.bgClip
      }, {
        name: "background-width",
        type: t.bgWH
      }, {
        name: "background-height",
        type: t.bgWH
      }, {
        name: "background-offset-x",
        type: t.bgPos
      }, {
        name: "background-offset-y",
        type: t.bgPos
      }];
      var compound = [{
        name: "position",
        type: t.position,
        triggersBounds: diff.any
      }, {
        name: "compound-sizing-wrt-labels",
        type: t.compoundIncludeLabels,
        triggersBounds: diff.any
      }, {
        name: "min-width",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "min-width-bias-left",
        type: t.sizeMaybePercent,
        triggersBounds: diff.any
      }, {
        name: "min-width-bias-right",
        type: t.sizeMaybePercent,
        triggersBounds: diff.any
      }, {
        name: "min-height",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "min-height-bias-top",
        type: t.sizeMaybePercent,
        triggersBounds: diff.any
      }, {
        name: "min-height-bias-bottom",
        type: t.sizeMaybePercent,
        triggersBounds: diff.any
      }];
      var edgeLine = [{
        name: "line-style",
        type: t.lineStyle
      }, {
        name: "line-color",
        type: t.color
      }, {
        name: "line-fill",
        type: t.fill
      }, {
        name: "line-cap",
        type: t.lineCap
      }, {
        name: "line-opacity",
        type: t.zeroOneNumber
      }, {
        name: "line-dash-pattern",
        type: t.numbers
      }, {
        name: "line-dash-offset",
        type: t.number
      }, {
        name: "line-gradient-stop-colors",
        type: t.colors
      }, {
        name: "line-gradient-stop-positions",
        type: t.percentages
      }, {
        name: "curve-style",
        type: t.curveStyle,
        triggersBounds: diff.any,
        triggersBoundsOfParallelBeziers: true
      }, {
        name: "haystack-radius",
        type: t.zeroOneNumber,
        triggersBounds: diff.any
      }, {
        name: "source-endpoint",
        type: t.edgeEndpoint,
        triggersBounds: diff.any
      }, {
        name: "target-endpoint",
        type: t.edgeEndpoint,
        triggersBounds: diff.any
      }, {
        name: "control-point-step-size",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "control-point-distances",
        type: t.bidirectionalSizes,
        triggersBounds: diff.any
      }, {
        name: "control-point-weights",
        type: t.numbers,
        triggersBounds: diff.any
      }, {
        name: "segment-distances",
        type: t.bidirectionalSizes,
        triggersBounds: diff.any
      }, {
        name: "segment-weights",
        type: t.numbers,
        triggersBounds: diff.any
      }, {
        name: "taxi-turn",
        type: t.bidirectionalSizeMaybePercent,
        triggersBounds: diff.any
      }, {
        name: "taxi-turn-min-distance",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "taxi-direction",
        type: t.axisDirection,
        triggersBounds: diff.any
      }, {
        name: "edge-distances",
        type: t.edgeDistances,
        triggersBounds: diff.any
      }, {
        name: "arrow-scale",
        type: t.positiveNumber,
        triggersBounds: diff.any
      }, {
        name: "loop-direction",
        type: t.angle,
        triggersBounds: diff.any
      }, {
        name: "loop-sweep",
        type: t.angle,
        triggersBounds: diff.any
      }, {
        name: "source-distance-from-node",
        type: t.size,
        triggersBounds: diff.any
      }, {
        name: "target-distance-from-node",
        type: t.size,
        triggersBounds: diff.any
      }];
      var ghost = [{
        name: "ghost",
        type: t.bool,
        triggersBounds: diff.any
      }, {
        name: "ghost-offset-x",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }, {
        name: "ghost-offset-y",
        type: t.bidirectionalSize,
        triggersBounds: diff.any
      }, {
        name: "ghost-opacity",
        type: t.zeroOneNumber
      }];
      var core2 = [{
        name: "selection-box-color",
        type: t.color
      }, {
        name: "selection-box-opacity",
        type: t.zeroOneNumber
      }, {
        name: "selection-box-border-color",
        type: t.color
      }, {
        name: "selection-box-border-width",
        type: t.size
      }, {
        name: "active-bg-color",
        type: t.color
      }, {
        name: "active-bg-opacity",
        type: t.zeroOneNumber
      }, {
        name: "active-bg-size",
        type: t.size
      }, {
        name: "outside-texture-bg-color",
        type: t.color
      }, {
        name: "outside-texture-bg-opacity",
        type: t.zeroOneNumber
      }];
      var pie = [];
      styfn$2.pieBackgroundN = 16;
      pie.push({
        name: "pie-size",
        type: t.sizeMaybePercent
      });
      for (var i2 = 1; i2 <= styfn$2.pieBackgroundN; i2++) {
        pie.push({
          name: "pie-" + i2 + "-background-color",
          type: t.color
        });
        pie.push({
          name: "pie-" + i2 + "-background-size",
          type: t.percent
        });
        pie.push({
          name: "pie-" + i2 + "-background-opacity",
          type: t.zeroOneNumber
        });
      }
      var edgeArrow = [];
      var arrowPrefixes = styfn$2.arrowPrefixes = ["source", "mid-source", "target", "mid-target"];
      [{
        name: "arrow-shape",
        type: t.arrowShape,
        triggersBounds: diff.any
      }, {
        name: "arrow-color",
        type: t.color
      }, {
        name: "arrow-fill",
        type: t.arrowFill
      }, {
        name: "arrow-width",
        type: t.arrowWidth
      }].forEach(function(prop2) {
        arrowPrefixes.forEach(function(prefix) {
          var name = prefix + "-" + prop2.name;
          var type = prop2.type, triggersBounds = prop2.triggersBounds;
          edgeArrow.push({
            name,
            type,
            triggersBounds
          });
        });
      }, {});
      var props = styfn$2.properties = [].concat(behavior, transition, visibility, overlay, underlay, ghost, commonLabel, labelDimensions, mainLabel, sourceLabel, targetLabel, nodeBody, nodeBorder, nodeOutline, backgroundImage, pie, compound, edgeLine, edgeArrow, core2);
      var propGroups = styfn$2.propertyGroups = {
        // common to all eles
        behavior,
        transition,
        visibility,
        overlay,
        underlay,
        ghost,
        // labels
        commonLabel,
        labelDimensions,
        mainLabel,
        sourceLabel,
        targetLabel,
        // node props
        nodeBody,
        nodeBorder,
        nodeOutline,
        backgroundImage,
        pie,
        compound,
        // edge props
        edgeLine,
        edgeArrow,
        core: core2
      };
      var propGroupNames = styfn$2.propertyGroupNames = {};
      var propGroupKeys = styfn$2.propertyGroupKeys = Object.keys(propGroups);
      propGroupKeys.forEach(function(key) {
        propGroupNames[key] = propGroups[key].map(function(prop2) {
          return prop2.name;
        });
        propGroups[key].forEach(function(prop2) {
          return prop2.groupKey = key;
        });
      });
      var aliases = styfn$2.aliases = [{
        name: "content",
        pointsTo: "label"
      }, {
        name: "control-point-distance",
        pointsTo: "control-point-distances"
      }, {
        name: "control-point-weight",
        pointsTo: "control-point-weights"
      }, {
        name: "edge-text-rotation",
        pointsTo: "text-rotation"
      }, {
        name: "padding-left",
        pointsTo: "padding"
      }, {
        name: "padding-right",
        pointsTo: "padding"
      }, {
        name: "padding-top",
        pointsTo: "padding"
      }, {
        name: "padding-bottom",
        pointsTo: "padding"
      }];
      styfn$2.propertyNames = props.map(function(p2) {
        return p2.name;
      });
      for (var _i = 0; _i < props.length; _i++) {
        var prop = props[_i];
        props[prop.name] = prop;
      }
      for (var _i2 = 0; _i2 < aliases.length; _i2++) {
        var alias = aliases[_i2];
        var pointsToProp = props[alias.pointsTo];
        var aliasProp = {
          name: alias.name,
          alias: true,
          pointsTo: pointsToProp
        };
        props.push(aliasProp);
        props[alias.name] = aliasProp;
      }
    })();
    styfn$2.getDefaultProperty = function(name) {
      return this.getDefaultProperties()[name];
    };
    styfn$2.getDefaultProperties = function() {
      var _p = this._private;
      if (_p.defaultProperties != null) {
        return _p.defaultProperties;
      }
      var rawProps = extend({
        // core props
        "selection-box-color": "#ddd",
        "selection-box-opacity": 0.65,
        "selection-box-border-color": "#aaa",
        "selection-box-border-width": 1,
        "active-bg-color": "black",
        "active-bg-opacity": 0.15,
        "active-bg-size": 30,
        "outside-texture-bg-color": "#000",
        "outside-texture-bg-opacity": 0.125,
        // common node/edge props
        "events": "yes",
        "text-events": "no",
        "text-valign": "top",
        "text-halign": "center",
        "text-justification": "auto",
        "line-height": 1,
        "color": "#000",
        "text-outline-color": "#000",
        "text-outline-width": 0,
        "text-outline-opacity": 1,
        "text-opacity": 1,
        "text-decoration": "none",
        "text-transform": "none",
        "text-wrap": "none",
        "text-overflow-wrap": "whitespace",
        "text-max-width": 9999,
        "text-background-color": "#000",
        "text-background-opacity": 0,
        "text-background-shape": "rectangle",
        "text-background-padding": 0,
        "text-border-opacity": 0,
        "text-border-width": 0,
        "text-border-style": "solid",
        "text-border-color": "#000",
        "font-family": "Helvetica Neue, Helvetica, sans-serif",
        "font-style": "normal",
        "font-weight": "normal",
        "font-size": 16,
        "min-zoomed-font-size": 0,
        "text-rotation": "none",
        "source-text-rotation": "none",
        "target-text-rotation": "none",
        "visibility": "visible",
        "display": "element",
        "opacity": 1,
        "z-compound-depth": "auto",
        "z-index-compare": "auto",
        "z-index": 0,
        "label": "",
        "text-margin-x": 0,
        "text-margin-y": 0,
        "source-label": "",
        "source-text-offset": 0,
        "source-text-margin-x": 0,
        "source-text-margin-y": 0,
        "target-label": "",
        "target-text-offset": 0,
        "target-text-margin-x": 0,
        "target-text-margin-y": 0,
        "overlay-opacity": 0,
        "overlay-color": "#000",
        "overlay-padding": 10,
        "overlay-shape": "round-rectangle",
        "underlay-opacity": 0,
        "underlay-color": "#000",
        "underlay-padding": 10,
        "underlay-shape": "round-rectangle",
        "transition-property": "none",
        "transition-duration": 0,
        "transition-delay": 0,
        "transition-timing-function": "linear",
        // node props
        "background-blacken": 0,
        "background-color": "#999",
        "background-fill": "solid",
        "background-opacity": 1,
        "background-image": "none",
        "background-image-crossorigin": "anonymous",
        "background-image-opacity": 1,
        "background-image-containment": "inside",
        "background-image-smoothing": "yes",
        "background-position-x": "50%",
        "background-position-y": "50%",
        "background-offset-x": 0,
        "background-offset-y": 0,
        "background-width-relative-to": "include-padding",
        "background-height-relative-to": "include-padding",
        "background-repeat": "no-repeat",
        "background-fit": "none",
        "background-clip": "node",
        "background-width": "auto",
        "background-height": "auto",
        "border-color": "#000",
        "border-opacity": 1,
        "border-width": 0,
        "border-style": "solid",
        "outline-color": "#999",
        "outline-opacity": 1,
        "outline-width": 0,
        "outline-offset": 0,
        "outline-style": "solid",
        "height": 30,
        "width": 30,
        "shape": "ellipse",
        "shape-polygon-points": "-1, -1,   1, -1,   1, 1,   -1, 1",
        "bounds-expansion": 0,
        // node gradient
        "background-gradient-direction": "to-bottom",
        "background-gradient-stop-colors": "#999",
        "background-gradient-stop-positions": "0%",
        // ghost props
        "ghost": "no",
        "ghost-offset-y": 0,
        "ghost-offset-x": 0,
        "ghost-opacity": 0,
        // compound props
        "padding": 0,
        "padding-relative-to": "width",
        "position": "origin",
        "compound-sizing-wrt-labels": "include",
        "min-width": 0,
        "min-width-bias-left": 0,
        "min-width-bias-right": 0,
        "min-height": 0,
        "min-height-bias-top": 0,
        "min-height-bias-bottom": 0
      }, {
        // node pie bg
        "pie-size": "100%"
      }, [{
        name: "pie-{{i}}-background-color",
        value: "black"
      }, {
        name: "pie-{{i}}-background-size",
        value: "0%"
      }, {
        name: "pie-{{i}}-background-opacity",
        value: 1
      }].reduce(function(css, prop2) {
        for (var i3 = 1; i3 <= styfn$2.pieBackgroundN; i3++) {
          var name2 = prop2.name.replace("{{i}}", i3);
          var val2 = prop2.value;
          css[name2] = val2;
        }
        return css;
      }, {}), {
        // edge props
        "line-style": "solid",
        "line-color": "#999",
        "line-fill": "solid",
        "line-cap": "butt",
        "line-opacity": 1,
        "line-gradient-stop-colors": "#999",
        "line-gradient-stop-positions": "0%",
        "control-point-step-size": 40,
        "control-point-weights": 0.5,
        "segment-weights": 0.5,
        "segment-distances": 20,
        "taxi-turn": "50%",
        "taxi-turn-min-distance": 10,
        "taxi-direction": "auto",
        "edge-distances": "intersection",
        "curve-style": "haystack",
        "haystack-radius": 0,
        "arrow-scale": 1,
        "loop-direction": "-45deg",
        "loop-sweep": "-90deg",
        "source-distance-from-node": 0,
        "target-distance-from-node": 0,
        "source-endpoint": "outside-to-node",
        "target-endpoint": "outside-to-node",
        "line-dash-pattern": [6, 3],
        "line-dash-offset": 0
      }, [{
        name: "arrow-shape",
        value: "none"
      }, {
        name: "arrow-color",
        value: "#999"
      }, {
        name: "arrow-fill",
        value: "filled"
      }, {
        name: "arrow-width",
        value: 1
      }].reduce(function(css, prop2) {
        styfn$2.arrowPrefixes.forEach(function(prefix) {
          var name2 = prefix + "-" + prop2.name;
          var val2 = prop2.value;
          css[name2] = val2;
        });
        return css;
      }, {}));
      var parsedProps = {};
      for (var i2 = 0; i2 < this.properties.length; i2++) {
        var prop = this.properties[i2];
        if (prop.pointsTo) {
          continue;
        }
        var name = prop.name;
        var val = rawProps[name];
        var parsedProp = this.parse(name, val);
        parsedProps[name] = parsedProp;
      }
      _p.defaultProperties = parsedProps;
      return _p.defaultProperties;
    };
    styfn$2.addDefaultStylesheet = function() {
      this.selector(":parent").css({
        "shape": "rectangle",
        "padding": 10,
        "background-color": "#eee",
        "border-color": "#ccc",
        "border-width": 1
      }).selector("edge").css({
        "width": 3
      }).selector(":loop").css({
        "curve-style": "bezier"
      }).selector("edge:compound").css({
        "curve-style": "bezier",
        "source-endpoint": "outside-to-line",
        "target-endpoint": "outside-to-line"
      }).selector(":selected").css({
        "background-color": "#0169D9",
        "line-color": "#0169D9",
        "source-arrow-color": "#0169D9",
        "target-arrow-color": "#0169D9",
        "mid-source-arrow-color": "#0169D9",
        "mid-target-arrow-color": "#0169D9"
      }).selector(":parent:selected").css({
        "background-color": "#CCE1F9",
        "border-color": "#aec8e5"
      }).selector(":active").css({
        "overlay-color": "black",
        "overlay-padding": 10,
        "overlay-opacity": 0.25
      });
      this.defaultLength = this.length;
    };
    var styfn$1 = {};
    styfn$1.parse = function(name, value, propIsBypass, propIsFlat) {
      var self2 = this;
      if (fn$6(value)) {
        return self2.parseImplWarn(name, value, propIsBypass, propIsFlat);
      }
      var flatKey = propIsFlat === "mapping" || propIsFlat === true || propIsFlat === false || propIsFlat == null ? "dontcare" : propIsFlat;
      var bypassKey = propIsBypass ? "t" : "f";
      var valueKey = "" + value;
      var argHash = hashStrings(name, valueKey, bypassKey, flatKey);
      var propCache = self2.propCache = self2.propCache || [];
      var ret;
      if (!(ret = propCache[argHash])) {
        ret = propCache[argHash] = self2.parseImplWarn(name, value, propIsBypass, propIsFlat);
      }
      if (propIsBypass || propIsFlat === "mapping") {
        ret = copy(ret);
        if (ret) {
          ret.value = copy(ret.value);
        }
      }
      return ret;
    };
    styfn$1.parseImplWarn = function(name, value, propIsBypass, propIsFlat) {
      var prop = this.parseImpl(name, value, propIsBypass, propIsFlat);
      if (!prop && value != null) {
        warn("The style property `".concat(name, ": ").concat(value, "` is invalid"));
      }
      if (prop && (prop.name === "width" || prop.name === "height") && value === "label") {
        warn("The style value of `label` is deprecated for `" + prop.name + "`");
      }
      return prop;
    };
    styfn$1.parseImpl = function(name, value, propIsBypass, propIsFlat) {
      var self2 = this;
      name = camel2dash(name);
      var property = self2.properties[name];
      var passedValue = value;
      var types = self2.types;
      if (!property) {
        return null;
      }
      if (value === void 0) {
        return null;
      }
      if (property.alias) {
        property = property.pointsTo;
        name = property.name;
      }
      var valueIsString = string(value);
      if (valueIsString) {
        value = value.trim();
      }
      var type = property.type;
      if (!type) {
        return null;
      }
      if (propIsBypass && (value === "" || value === null)) {
        return {
          name,
          value,
          bypass: true,
          deleteBypass: true
        };
      }
      if (fn$6(value)) {
        return {
          name,
          value,
          strValue: "fn",
          mapped: types.fn,
          bypass: propIsBypass
        };
      }
      var data2, mapData;
      if (!valueIsString || propIsFlat || value.length < 7 || value[1] !== "a") ;
      else if (value.length >= 7 && value[0] === "d" && (data2 = new RegExp(types.data.regex).exec(value))) {
        if (propIsBypass) {
          return false;
        }
        var mapped = types.data;
        return {
          name,
          value: data2,
          strValue: "" + value,
          mapped,
          field: data2[1],
          bypass: propIsBypass
        };
      } else if (value.length >= 10 && value[0] === "m" && (mapData = new RegExp(types.mapData.regex).exec(value))) {
        if (propIsBypass) {
          return false;
        }
        if (type.multiple) {
          return false;
        }
        var _mapped = types.mapData;
        if (!(type.color || type.number)) {
          return false;
        }
        var valueMin = this.parse(name, mapData[4]);
        if (!valueMin || valueMin.mapped) {
          return false;
        }
        var valueMax = this.parse(name, mapData[5]);
        if (!valueMax || valueMax.mapped) {
          return false;
        }
        if (valueMin.pfValue === valueMax.pfValue || valueMin.strValue === valueMax.strValue) {
          warn("`" + name + ": " + value + "` is not a valid mapper because the output range is zero; converting to `" + name + ": " + valueMin.strValue + "`");
          return this.parse(name, valueMin.strValue);
        } else if (type.color) {
          var c1 = valueMin.value;
          var c2 = valueMax.value;
          var same = c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && // optional alpha
          (c1[3] === c2[3] || (c1[3] == null || c1[3] === 1) && (c2[3] == null || c2[3] === 1));
          if (same) {
            return false;
          }
        }
        return {
          name,
          value: mapData,
          strValue: "" + value,
          mapped: _mapped,
          field: mapData[1],
          fieldMin: parseFloat(mapData[2]),
          // min & max are numeric
          fieldMax: parseFloat(mapData[3]),
          valueMin: valueMin.value,
          valueMax: valueMax.value,
          bypass: propIsBypass
        };
      }
      if (type.multiple && propIsFlat !== "multiple") {
        var vals;
        if (valueIsString) {
          vals = value.split(/\s+/);
        } else if (array(value)) {
          vals = value;
        } else {
          vals = [value];
        }
        if (type.evenMultiple && vals.length % 2 !== 0) {
          return null;
        }
        var valArr = [];
        var unitsArr = [];
        var pfValArr = [];
        var strVal = "";
        var hasEnum = false;
        for (var i2 = 0; i2 < vals.length; i2++) {
          var p2 = self2.parse(name, vals[i2], propIsBypass, "multiple");
          hasEnum = hasEnum || string(p2.value);
          valArr.push(p2.value);
          pfValArr.push(p2.pfValue != null ? p2.pfValue : p2.value);
          unitsArr.push(p2.units);
          strVal += (i2 > 0 ? " " : "") + p2.strValue;
        }
        if (type.validate && !type.validate(valArr, unitsArr)) {
          return null;
        }
        if (type.singleEnum && hasEnum) {
          if (valArr.length === 1 && string(valArr[0])) {
            return {
              name,
              value: valArr[0],
              strValue: valArr[0],
              bypass: propIsBypass
            };
          } else {
            return null;
          }
        }
        return {
          name,
          value: valArr,
          pfValue: pfValArr,
          strValue: strVal,
          bypass: propIsBypass,
          units: unitsArr
        };
      }
      var checkEnums = function checkEnums2() {
        for (var _i = 0; _i < type.enums.length; _i++) {
          var en = type.enums[_i];
          if (en === value) {
            return {
              name,
              value,
              strValue: "" + value,
              bypass: propIsBypass
            };
          }
        }
        return null;
      };
      if (type.number) {
        var units;
        var implicitUnits = "px";
        if (type.units) {
          units = type.units;
        }
        if (type.implicitUnits) {
          implicitUnits = type.implicitUnits;
        }
        if (!type.unitless) {
          if (valueIsString) {
            var unitsRegex = "px|em" + (type.allowPercent ? "|\\%" : "");
            if (units) {
              unitsRegex = units;
            }
            var match2 = value.match("^(" + number + ")(" + unitsRegex + ")?$");
            if (match2) {
              value = match2[1];
              units = match2[2] || implicitUnits;
            }
          } else if (!units || type.implicitUnits) {
            units = implicitUnits;
          }
        }
        value = parseFloat(value);
        if (isNaN(value) && type.enums === void 0) {
          return null;
        }
        if (isNaN(value) && type.enums !== void 0) {
          value = passedValue;
          return checkEnums();
        }
        if (type.integer && !integer(value)) {
          return null;
        }
        if (type.min !== void 0 && (value < type.min || type.strictMin && value === type.min) || type.max !== void 0 && (value > type.max || type.strictMax && value === type.max)) {
          return null;
        }
        var ret = {
          name,
          value,
          strValue: "" + value + (units ? units : ""),
          units,
          bypass: propIsBypass
        };
        if (type.unitless || units !== "px" && units !== "em") {
          ret.pfValue = value;
        } else {
          ret.pfValue = units === "px" || !units ? value : this.getEmSizeInPixels() * value;
        }
        if (units === "ms" || units === "s") {
          ret.pfValue = units === "ms" ? value : 1e3 * value;
        }
        if (units === "deg" || units === "rad") {
          ret.pfValue = units === "rad" ? value : deg2rad(value);
        }
        if (units === "%") {
          ret.pfValue = value / 100;
        }
        return ret;
      } else if (type.propList) {
        var props = [];
        var propsStr = "" + value;
        if (propsStr === "none") ;
        else {
          var propsSplit = propsStr.split(/\s*,\s*|\s+/);
          for (var _i2 = 0; _i2 < propsSplit.length; _i2++) {
            var propName = propsSplit[_i2].trim();
            if (self2.properties[propName]) {
              props.push(propName);
            } else {
              warn("`" + propName + "` is not a valid property name");
            }
          }
          if (props.length === 0) {
            return null;
          }
        }
        return {
          name,
          value: props,
          strValue: props.length === 0 ? "none" : props.join(" "),
          bypass: propIsBypass
        };
      } else if (type.color) {
        var tuple = color2tuple(value);
        if (!tuple) {
          return null;
        }
        return {
          name,
          value: tuple,
          pfValue: tuple,
          strValue: "rgb(" + tuple[0] + "," + tuple[1] + "," + tuple[2] + ")",
          // n.b. no spaces b/c of multiple support
          bypass: propIsBypass
        };
      } else if (type.regex || type.regexes) {
        if (type.enums) {
          var enumProp = checkEnums();
          if (enumProp) {
            return enumProp;
          }
        }
        var regexes = type.regexes ? type.regexes : [type.regex];
        for (var _i3 = 0; _i3 < regexes.length; _i3++) {
          var regex = new RegExp(regexes[_i3]);
          var m = regex.exec(value);
          if (m) {
            return {
              name,
              value: type.singleRegexMatchValue ? m[1] : m,
              strValue: "" + value,
              bypass: propIsBypass
            };
          }
        }
        return null;
      } else if (type.string) {
        return {
          name,
          value: "" + value,
          strValue: "" + value,
          bypass: propIsBypass
        };
      } else if (type.enums) {
        return checkEnums();
      } else {
        return null;
      }
    };
    var Style = function Style2(cy) {
      if (!(this instanceof Style2)) {
        return new Style2(cy);
      }
      if (!core(cy)) {
        error("A style must have a core reference");
        return;
      }
      this._private = {
        cy,
        coreStyle: {}
      };
      this.length = 0;
      this.resetToDefault();
    };
    var styfn = Style.prototype;
    styfn.instanceString = function() {
      return "style";
    };
    styfn.clear = function() {
      var _p = this._private;
      var cy = _p.cy;
      var eles = cy.elements();
      for (var i2 = 0; i2 < this.length; i2++) {
        this[i2] = void 0;
      }
      this.length = 0;
      _p.contextStyles = {};
      _p.propDiffs = {};
      this.cleanElements(eles, true);
      eles.forEach(function(ele) {
        var ele_p = ele[0]._private;
        ele_p.styleDirty = true;
        ele_p.appliedInitStyle = false;
      });
      return this;
    };
    styfn.resetToDefault = function() {
      this.clear();
      this.addDefaultStylesheet();
      return this;
    };
    styfn.core = function(propName) {
      return this._private.coreStyle[propName] || this.getDefaultProperty(propName);
    };
    styfn.selector = function(selectorStr) {
      var selector = selectorStr === "core" ? null : new Selector(selectorStr);
      var i2 = this.length++;
      this[i2] = {
        selector,
        properties: [],
        mappedProperties: [],
        index: i2
      };
      return this;
    };
    styfn.css = function() {
      var self2 = this;
      var args = arguments;
      if (args.length === 1) {
        var map = args[0];
        for (var i2 = 0; i2 < self2.properties.length; i2++) {
          var prop = self2.properties[i2];
          var mapVal = map[prop.name];
          if (mapVal === void 0) {
            mapVal = map[dash2camel(prop.name)];
          }
          if (mapVal !== void 0) {
            this.cssRule(prop.name, mapVal);
          }
        }
      } else if (args.length === 2) {
        this.cssRule(args[0], args[1]);
      }
      return this;
    };
    styfn.style = styfn.css;
    styfn.cssRule = function(name, value) {
      var property = this.parse(name, value);
      if (property) {
        var i2 = this.length - 1;
        this[i2].properties.push(property);
        this[i2].properties[property.name] = property;
        if (property.name.match(/pie-(\d+)-background-size/) && property.value) {
          this._private.hasPie = true;
        }
        if (property.mapped) {
          this[i2].mappedProperties.push(property);
        }
        var currentSelectorIsCore = !this[i2].selector;
        if (currentSelectorIsCore) {
          this._private.coreStyle[property.name] = property;
        }
      }
      return this;
    };
    styfn.append = function(style) {
      if (stylesheet(style)) {
        style.appendToStyle(this);
      } else if (array(style)) {
        this.appendFromJson(style);
      } else if (string(style)) {
        this.appendFromString(style);
      }
      return this;
    };
    Style.fromJson = function(cy, json) {
      var style = new Style(cy);
      style.fromJson(json);
      return style;
    };
    Style.fromString = function(cy, string2) {
      return new Style(cy).fromString(string2);
    };
    [styfn$8, styfn$7, styfn$6, styfn$5, styfn$4, styfn$3, styfn$2, styfn$1].forEach(function(props) {
      extend(styfn, props);
    });
    Style.types = styfn.types;
    Style.properties = styfn.properties;
    Style.propertyGroups = styfn.propertyGroups;
    Style.propertyGroupNames = styfn.propertyGroupNames;
    Style.propertyGroupKeys = styfn.propertyGroupKeys;
    var corefn$2 = {
      style: function style(newStyle) {
        if (newStyle) {
          var s = this.setStyle(newStyle);
          s.update();
        }
        return this._private.style;
      },
      setStyle: function setStyle(style) {
        var _p = this._private;
        if (stylesheet(style)) {
          _p.style = style.generateStyle(this);
        } else if (array(style)) {
          _p.style = Style.fromJson(this, style);
        } else if (string(style)) {
          _p.style = Style.fromString(this, style);
        } else {
          _p.style = Style(this);
        }
        return _p.style;
      },
      // e.g. cy.data() changed => recalc ele mappers
      updateStyle: function updateStyle() {
        this.mutableElements().updateStyle();
      }
    };
    var defaultSelectionType = "single";
    var corefn$1 = {
      autolock: function autolock(bool) {
        if (bool !== void 0) {
          this._private.autolock = bool ? true : false;
        } else {
          return this._private.autolock;
        }
        return this;
      },
      autoungrabify: function autoungrabify(bool) {
        if (bool !== void 0) {
          this._private.autoungrabify = bool ? true : false;
        } else {
          return this._private.autoungrabify;
        }
        return this;
      },
      autounselectify: function autounselectify(bool) {
        if (bool !== void 0) {
          this._private.autounselectify = bool ? true : false;
        } else {
          return this._private.autounselectify;
        }
        return this;
      },
      selectionType: function selectionType(selType) {
        var _p = this._private;
        if (_p.selectionType == null) {
          _p.selectionType = defaultSelectionType;
        }
        if (selType !== void 0) {
          if (selType === "additive" || selType === "single") {
            _p.selectionType = selType;
          }
        } else {
          return _p.selectionType;
        }
        return this;
      },
      panningEnabled: function panningEnabled(bool) {
        if (bool !== void 0) {
          this._private.panningEnabled = bool ? true : false;
        } else {
          return this._private.panningEnabled;
        }
        return this;
      },
      userPanningEnabled: function userPanningEnabled(bool) {
        if (bool !== void 0) {
          this._private.userPanningEnabled = bool ? true : false;
        } else {
          return this._private.userPanningEnabled;
        }
        return this;
      },
      zoomingEnabled: function zoomingEnabled(bool) {
        if (bool !== void 0) {
          this._private.zoomingEnabled = bool ? true : false;
        } else {
          return this._private.zoomingEnabled;
        }
        return this;
      },
      userZoomingEnabled: function userZoomingEnabled(bool) {
        if (bool !== void 0) {
          this._private.userZoomingEnabled = bool ? true : false;
        } else {
          return this._private.userZoomingEnabled;
        }
        return this;
      },
      boxSelectionEnabled: function boxSelectionEnabled(bool) {
        if (bool !== void 0) {
          this._private.boxSelectionEnabled = bool ? true : false;
        } else {
          return this._private.boxSelectionEnabled;
        }
        return this;
      },
      pan: function pan() {
        var args = arguments;
        var pan2 = this._private.pan;
        var dim, val, dims, x, y;
        switch (args.length) {
          case 0:
            return pan2;
          case 1:
            if (string(args[0])) {
              dim = args[0];
              return pan2[dim];
            } else if (plainObject(args[0])) {
              if (!this._private.panningEnabled) {
                return this;
              }
              dims = args[0];
              x = dims.x;
              y = dims.y;
              if (number$1(x)) {
                pan2.x = x;
              }
              if (number$1(y)) {
                pan2.y = y;
              }
              this.emit("pan viewport");
            }
            break;
          case 2:
            if (!this._private.panningEnabled) {
              return this;
            }
            dim = args[0];
            val = args[1];
            if ((dim === "x" || dim === "y") && number$1(val)) {
              pan2[dim] = val;
            }
            this.emit("pan viewport");
            break;
        }
        this.notify("viewport");
        return this;
      },
      panBy: function panBy(arg0, arg1) {
        var args = arguments;
        var pan = this._private.pan;
        var dim, val, dims, x, y;
        if (!this._private.panningEnabled) {
          return this;
        }
        switch (args.length) {
          case 1:
            if (plainObject(arg0)) {
              dims = args[0];
              x = dims.x;
              y = dims.y;
              if (number$1(x)) {
                pan.x += x;
              }
              if (number$1(y)) {
                pan.y += y;
              }
              this.emit("pan viewport");
            }
            break;
          case 2:
            dim = arg0;
            val = arg1;
            if ((dim === "x" || dim === "y") && number$1(val)) {
              pan[dim] += val;
            }
            this.emit("pan viewport");
            break;
        }
        this.notify("viewport");
        return this;
      },
      fit: function fit(elements, padding) {
        var viewportState = this.getFitViewport(elements, padding);
        if (viewportState) {
          var _p = this._private;
          _p.zoom = viewportState.zoom;
          _p.pan = viewportState.pan;
          this.emit("pan zoom viewport");
          this.notify("viewport");
        }
        return this;
      },
      getFitViewport: function getFitViewport(elements, padding) {
        if (number$1(elements) && padding === void 0) {
          padding = elements;
          elements = void 0;
        }
        if (!this._private.panningEnabled || !this._private.zoomingEnabled) {
          return;
        }
        var bb;
        if (string(elements)) {
          var sel = elements;
          elements = this.$(sel);
        } else if (boundingBox(elements)) {
          var bbe = elements;
          bb = {
            x1: bbe.x1,
            y1: bbe.y1,
            x2: bbe.x2,
            y2: bbe.y2
          };
          bb.w = bb.x2 - bb.x1;
          bb.h = bb.y2 - bb.y1;
        } else if (!elementOrCollection(elements)) {
          elements = this.mutableElements();
        }
        if (elementOrCollection(elements) && elements.empty()) {
          return;
        }
        bb = bb || elements.boundingBox();
        var w = this.width();
        var h = this.height();
        var zoom;
        padding = number$1(padding) ? padding : 0;
        if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0 && !isNaN(bb.w) && !isNaN(bb.h) && bb.w > 0 && bb.h > 0) {
          zoom = Math.min((w - 2 * padding) / bb.w, (h - 2 * padding) / bb.h);
          zoom = zoom > this._private.maxZoom ? this._private.maxZoom : zoom;
          zoom = zoom < this._private.minZoom ? this._private.minZoom : zoom;
          var pan = {
            // now pan to middle
            x: (w - zoom * (bb.x1 + bb.x2)) / 2,
            y: (h - zoom * (bb.y1 + bb.y2)) / 2
          };
          return {
            zoom,
            pan
          };
        }
        return;
      },
      zoomRange: function zoomRange(min2, max2) {
        var _p = this._private;
        if (max2 == null) {
          var opts = min2;
          min2 = opts.min;
          max2 = opts.max;
        }
        if (number$1(min2) && number$1(max2) && min2 <= max2) {
          _p.minZoom = min2;
          _p.maxZoom = max2;
        } else if (number$1(min2) && max2 === void 0 && min2 <= _p.maxZoom) {
          _p.minZoom = min2;
        } else if (number$1(max2) && min2 === void 0 && max2 >= _p.minZoom) {
          _p.maxZoom = max2;
        }
        return this;
      },
      minZoom: function minZoom(zoom) {
        if (zoom === void 0) {
          return this._private.minZoom;
        } else {
          return this.zoomRange({
            min: zoom
          });
        }
      },
      maxZoom: function maxZoom2(zoom) {
        if (zoom === void 0) {
          return this._private.maxZoom;
        } else {
          return this.zoomRange({
            max: zoom
          });
        }
      },
      getZoomedViewport: function getZoomedViewport(params) {
        var _p = this._private;
        var currentPan = _p.pan;
        var currentZoom = _p.zoom;
        var pos;
        var zoom;
        var bail = false;
        if (!_p.zoomingEnabled) {
          bail = true;
        }
        if (number$1(params)) {
          zoom = params;
        } else if (plainObject(params)) {
          zoom = params.level;
          if (params.position != null) {
            pos = modelToRenderedPosition(params.position, currentZoom, currentPan);
          } else if (params.renderedPosition != null) {
            pos = params.renderedPosition;
          }
          if (pos != null && !_p.panningEnabled) {
            bail = true;
          }
        }
        zoom = zoom > _p.maxZoom ? _p.maxZoom : zoom;
        zoom = zoom < _p.minZoom ? _p.minZoom : zoom;
        if (bail || !number$1(zoom) || zoom === currentZoom || pos != null && (!number$1(pos.x) || !number$1(pos.y))) {
          return null;
        }
        if (pos != null) {
          var pan1 = currentPan;
          var zoom1 = currentZoom;
          var zoom2 = zoom;
          var pan2 = {
            x: -zoom2 / zoom1 * (pos.x - pan1.x) + pos.x,
            y: -zoom2 / zoom1 * (pos.y - pan1.y) + pos.y
          };
          return {
            zoomed: true,
            panned: true,
            zoom: zoom2,
            pan: pan2
          };
        } else {
          return {
            zoomed: true,
            panned: false,
            zoom,
            pan: currentPan
          };
        }
      },
      zoom: function zoom(params) {
        if (params === void 0) {
          return this._private.zoom;
        } else {
          var vp = this.getZoomedViewport(params);
          var _p = this._private;
          if (vp == null || !vp.zoomed) {
            return this;
          }
          _p.zoom = vp.zoom;
          if (vp.panned) {
            _p.pan.x = vp.pan.x;
            _p.pan.y = vp.pan.y;
          }
          this.emit("zoom" + (vp.panned ? " pan" : "") + " viewport");
          this.notify("viewport");
          return this;
        }
      },
      viewport: function viewport(opts) {
        var _p = this._private;
        var zoomDefd = true;
        var panDefd = true;
        var events = [];
        var zoomFailed = false;
        var panFailed = false;
        if (!opts) {
          return this;
        }
        if (!number$1(opts.zoom)) {
          zoomDefd = false;
        }
        if (!plainObject(opts.pan)) {
          panDefd = false;
        }
        if (!zoomDefd && !panDefd) {
          return this;
        }
        if (zoomDefd) {
          var z = opts.zoom;
          if (z < _p.minZoom || z > _p.maxZoom || !_p.zoomingEnabled) {
            zoomFailed = true;
          } else {
            _p.zoom = z;
            events.push("zoom");
          }
        }
        if (panDefd && (!zoomFailed || !opts.cancelOnFailedZoom) && _p.panningEnabled) {
          var p2 = opts.pan;
          if (number$1(p2.x)) {
            _p.pan.x = p2.x;
            panFailed = false;
          }
          if (number$1(p2.y)) {
            _p.pan.y = p2.y;
            panFailed = false;
          }
          if (!panFailed) {
            events.push("pan");
          }
        }
        if (events.length > 0) {
          events.push("viewport");
          this.emit(events.join(" "));
          this.notify("viewport");
        }
        return this;
      },
      center: function center(elements) {
        var pan = this.getCenterPan(elements);
        if (pan) {
          this._private.pan = pan;
          this.emit("pan viewport");
          this.notify("viewport");
        }
        return this;
      },
      getCenterPan: function getCenterPan(elements, zoom) {
        if (!this._private.panningEnabled) {
          return;
        }
        if (string(elements)) {
          var selector = elements;
          elements = this.mutableElements().filter(selector);
        } else if (!elementOrCollection(elements)) {
          elements = this.mutableElements();
        }
        if (elements.length === 0) {
          return;
        }
        var bb = elements.boundingBox();
        var w = this.width();
        var h = this.height();
        zoom = zoom === void 0 ? this._private.zoom : zoom;
        var pan = {
          // middle
          x: (w - zoom * (bb.x1 + bb.x2)) / 2,
          y: (h - zoom * (bb.y1 + bb.y2)) / 2
        };
        return pan;
      },
      reset: function reset() {
        if (!this._private.panningEnabled || !this._private.zoomingEnabled) {
          return this;
        }
        this.viewport({
          pan: {
            x: 0,
            y: 0
          },
          zoom: 1
        });
        return this;
      },
      invalidateSize: function invalidateSize() {
        this._private.sizeCache = null;
      },
      size: function size() {
        var _p = this._private;
        var container = _p.container;
        var cy = this;
        return _p.sizeCache = _p.sizeCache || (container ? function() {
          var style = cy.window().getComputedStyle(container);
          var val = function val2(name) {
            return parseFloat(style.getPropertyValue(name));
          };
          return {
            width: container.clientWidth - val("padding-left") - val("padding-right"),
            height: container.clientHeight - val("padding-top") - val("padding-bottom")
          };
        }() : {
          // fallback if no container (not 0 b/c can be used for dividing etc)
          width: 1,
          height: 1
        });
      },
      width: function width() {
        return this.size().width;
      },
      height: function height() {
        return this.size().height;
      },
      extent: function extent() {
        var pan = this._private.pan;
        var zoom = this._private.zoom;
        var rb = this.renderedExtent();
        var b = {
          x1: (rb.x1 - pan.x) / zoom,
          x2: (rb.x2 - pan.x) / zoom,
          y1: (rb.y1 - pan.y) / zoom,
          y2: (rb.y2 - pan.y) / zoom
        };
        b.w = b.x2 - b.x1;
        b.h = b.y2 - b.y1;
        return b;
      },
      renderedExtent: function renderedExtent() {
        var width = this.width();
        var height = this.height();
        return {
          x1: 0,
          y1: 0,
          x2: width,
          y2: height,
          w: width,
          h: height
        };
      },
      multiClickDebounceTime: function multiClickDebounceTime(_int) {
        if (_int) this._private.multiClickDebounceTime = _int;
        else return this._private.multiClickDebounceTime;
        return this;
      }
    };
    corefn$1.centre = corefn$1.center;
    corefn$1.autolockNodes = corefn$1.autolock;
    corefn$1.autoungrabifyNodes = corefn$1.autoungrabify;
    var fn = {
      data: define2.data({
        field: "data",
        bindingEvent: "data",
        allowBinding: true,
        allowSetting: true,
        settingEvent: "data",
        settingTriggersEvent: true,
        triggerFnName: "trigger",
        allowGetting: true,
        updateStyle: true
      }),
      removeData: define2.removeData({
        field: "data",
        event: "data",
        triggerFnName: "trigger",
        triggerEvent: true,
        updateStyle: true
      }),
      scratch: define2.data({
        field: "scratch",
        bindingEvent: "scratch",
        allowBinding: true,
        allowSetting: true,
        settingEvent: "scratch",
        settingTriggersEvent: true,
        triggerFnName: "trigger",
        allowGetting: true,
        updateStyle: true
      }),
      removeScratch: define2.removeData({
        field: "scratch",
        event: "scratch",
        triggerFnName: "trigger",
        triggerEvent: true,
        updateStyle: true
      })
    };
    fn.attr = fn.data;
    fn.removeAttr = fn.removeData;
    var Core = function Core2(opts) {
      var cy = this;
      opts = extend({}, opts);
      var container = opts.container;
      if (container && !htmlElement(container) && htmlElement(container[0])) {
        container = container[0];
      }
      var reg = container ? container._cyreg : null;
      reg = reg || {};
      if (reg && reg.cy) {
        reg.cy.destroy();
        reg = {};
      }
      var readies = reg.readies = reg.readies || [];
      if (container) {
        container._cyreg = reg;
      }
      reg.cy = cy;
      var head = _window !== void 0 && container !== void 0 && !opts.headless;
      var options = opts;
      options.layout = extend({
        name: head ? "grid" : "null"
      }, options.layout);
      options.renderer = extend({
        name: head ? "canvas" : "null"
      }, options.renderer);
      var defVal = function defVal2(def, val, altVal) {
        if (val !== void 0) {
          return val;
        } else if (altVal !== void 0) {
          return altVal;
        } else {
          return def;
        }
      };
      var _p = this._private = {
        container,
        // html dom ele container
        ready: false,
        // whether ready has been triggered
        options,
        // cached options
        elements: new Collection(this),
        // elements in the graph
        listeners: [],
        // list of listeners
        aniEles: new Collection(this),
        // elements being animated
        data: options.data || {},
        // data for the core
        scratch: {},
        // scratch object for core
        layout: null,
        renderer: null,
        destroyed: false,
        // whether destroy was called
        notificationsEnabled: true,
        // whether notifications are sent to the renderer
        minZoom: 1e-50,
        maxZoom: 1e50,
        zoomingEnabled: defVal(true, options.zoomingEnabled),
        userZoomingEnabled: defVal(true, options.userZoomingEnabled),
        panningEnabled: defVal(true, options.panningEnabled),
        userPanningEnabled: defVal(true, options.userPanningEnabled),
        boxSelectionEnabled: defVal(true, options.boxSelectionEnabled),
        autolock: defVal(false, options.autolock, options.autolockNodes),
        autoungrabify: defVal(false, options.autoungrabify, options.autoungrabifyNodes),
        autounselectify: defVal(false, options.autounselectify),
        styleEnabled: options.styleEnabled === void 0 ? head : options.styleEnabled,
        zoom: number$1(options.zoom) ? options.zoom : 1,
        pan: {
          x: plainObject(options.pan) && number$1(options.pan.x) ? options.pan.x : 0,
          y: plainObject(options.pan) && number$1(options.pan.y) ? options.pan.y : 0
        },
        animation: {
          // object for currently-running animations
          current: [],
          queue: []
        },
        hasCompoundNodes: false,
        multiClickDebounceTime: defVal(250, options.multiClickDebounceTime)
      };
      this.createEmitter();
      this.selectionType(options.selectionType);
      this.zoomRange({
        min: options.minZoom,
        max: options.maxZoom
      });
      var loadExtData = function loadExtData2(extData, next) {
        var anyIsPromise = extData.some(promise);
        if (anyIsPromise) {
          return Promise$1.all(extData).then(next);
        } else {
          next(extData);
        }
      };
      if (_p.styleEnabled) {
        cy.setStyle([]);
      }
      var rendererOptions = extend({}, options, options.renderer);
      cy.initRenderer(rendererOptions);
      var setElesAndLayout = function setElesAndLayout2(elements, onload, ondone) {
        cy.notifications(false);
        var oldEles = cy.mutableElements();
        if (oldEles.length > 0) {
          oldEles.remove();
        }
        if (elements != null) {
          if (plainObject(elements) || array(elements)) {
            cy.add(elements);
          }
        }
        cy.one("layoutready", function(e) {
          cy.notifications(true);
          cy.emit(e);
          cy.one("load", onload);
          cy.emitAndNotify("load");
        }).one("layoutstop", function() {
          cy.one("done", ondone);
          cy.emit("done");
        });
        var layoutOpts = extend({}, cy._private.options.layout);
        layoutOpts.eles = cy.elements();
        cy.layout(layoutOpts).run();
      };
      loadExtData([options.style, options.elements], function(thens) {
        var initStyle = thens[0];
        var initEles = thens[1];
        if (_p.styleEnabled) {
          cy.style().append(initStyle);
        }
        setElesAndLayout(initEles, function() {
          cy.startAnimationLoop();
          _p.ready = true;
          if (fn$6(options.ready)) {
            cy.on("ready", options.ready);
          }
          for (var i2 = 0; i2 < readies.length; i2++) {
            var fn2 = readies[i2];
            cy.on("ready", fn2);
          }
          if (reg) {
            reg.readies = [];
          }
          cy.emit("ready");
        }, options.done);
      });
    };
    var corefn = Core.prototype;
    extend(corefn, {
      instanceString: function instanceString() {
        return "core";
      },
      isReady: function isReady() {
        return this._private.ready;
      },
      destroyed: function destroyed() {
        return this._private.destroyed;
      },
      ready: function ready(fn2) {
        if (this.isReady()) {
          this.emitter().emit("ready", [], fn2);
        } else {
          this.on("ready", fn2);
        }
        return this;
      },
      destroy: function destroy() {
        var cy = this;
        if (cy.destroyed()) return;
        cy.stopAnimationLoop();
        cy.destroyRenderer();
        this.emit("destroy");
        cy._private.destroyed = true;
        return cy;
      },
      hasElementWithId: function hasElementWithId(id) {
        return this._private.elements.hasElementWithId(id);
      },
      getElementById: function getElementById(id) {
        return this._private.elements.getElementById(id);
      },
      hasCompoundNodes: function hasCompoundNodes() {
        return this._private.hasCompoundNodes;
      },
      headless: function headless() {
        return this._private.renderer.isHeadless();
      },
      styleEnabled: function styleEnabled() {
        return this._private.styleEnabled;
      },
      addToPool: function addToPool(eles) {
        this._private.elements.merge(eles);
        return this;
      },
      removeFromPool: function removeFromPool(eles) {
        this._private.elements.unmerge(eles);
        return this;
      },
      container: function container() {
        return this._private.container || null;
      },
      window: function window2() {
        var container = this._private.container;
        if (container == null) return _window;
        var ownerDocument = this._private.container.ownerDocument;
        if (ownerDocument === void 0 || ownerDocument == null) {
          return _window;
        }
        return ownerDocument.defaultView || _window;
      },
      mount: function mount(container) {
        if (container == null) {
          return;
        }
        var cy = this;
        var _p = cy._private;
        var options = _p.options;
        if (!htmlElement(container) && htmlElement(container[0])) {
          container = container[0];
        }
        cy.stopAnimationLoop();
        cy.destroyRenderer();
        _p.container = container;
        _p.styleEnabled = true;
        cy.invalidateSize();
        cy.initRenderer(extend({}, options, options.renderer, {
          // allow custom renderer name to be re-used, otherwise use canvas
          name: options.renderer.name === "null" ? "canvas" : options.renderer.name
        }));
        cy.startAnimationLoop();
        cy.style(options.style);
        cy.emit("mount");
        return cy;
      },
      unmount: function unmount() {
        var cy = this;
        cy.stopAnimationLoop();
        cy.destroyRenderer();
        cy.initRenderer({
          name: "null"
        });
        cy.emit("unmount");
        return cy;
      },
      options: function options() {
        return copy(this._private.options);
      },
      json: function json(obj) {
        var cy = this;
        var _p = cy._private;
        var eles = cy.mutableElements();
        var getFreshRef = function getFreshRef2(ele) {
          return cy.getElementById(ele.id());
        };
        if (plainObject(obj)) {
          cy.startBatch();
          if (obj.elements) {
            var idInJson = {};
            var updateEles = function updateEles2(jsons, gr2) {
              var toAdd = [];
              var toMod = [];
              for (var i3 = 0; i3 < jsons.length; i3++) {
                var json3 = jsons[i3];
                if (!json3.data.id) {
                  warn("cy.json() cannot handle elements without an ID attribute");
                  continue;
                }
                var id = "" + json3.data.id;
                var ele = cy.getElementById(id);
                idInJson[id] = true;
                if (ele.length !== 0) {
                  toMod.push({
                    ele,
                    json: json3
                  });
                } else {
                  if (gr2) {
                    json3.group = gr2;
                    toAdd.push(json3);
                  } else {
                    toAdd.push(json3);
                  }
                }
              }
              cy.add(toAdd);
              for (var _i = 0; _i < toMod.length; _i++) {
                var _toMod$_i = toMod[_i], _ele = _toMod$_i.ele, _json = _toMod$_i.json;
                _ele.json(_json);
              }
            };
            if (array(obj.elements)) {
              updateEles(obj.elements);
            } else {
              var grs = ["nodes", "edges"];
              for (var i2 = 0; i2 < grs.length; i2++) {
                var gr = grs[i2];
                var elements = obj.elements[gr];
                if (array(elements)) {
                  updateEles(elements, gr);
                }
              }
            }
            var parentsToRemove = cy.collection();
            eles.filter(function(ele) {
              return !idInJson[ele.id()];
            }).forEach(function(ele) {
              if (ele.isParent()) {
                parentsToRemove.merge(ele);
              } else {
                ele.remove();
              }
            });
            parentsToRemove.forEach(function(ele) {
              return ele.children().move({
                parent: null
              });
            });
            parentsToRemove.forEach(function(ele) {
              return getFreshRef(ele).remove();
            });
          }
          if (obj.style) {
            cy.style(obj.style);
          }
          if (obj.zoom != null && obj.zoom !== _p.zoom) {
            cy.zoom(obj.zoom);
          }
          if (obj.pan) {
            if (obj.pan.x !== _p.pan.x || obj.pan.y !== _p.pan.y) {
              cy.pan(obj.pan);
            }
          }
          if (obj.data) {
            cy.data(obj.data);
          }
          var fields = ["minZoom", "maxZoom", "zoomingEnabled", "userZoomingEnabled", "panningEnabled", "userPanningEnabled", "boxSelectionEnabled", "autolock", "autoungrabify", "autounselectify", "multiClickDebounceTime"];
          for (var _i2 = 0; _i2 < fields.length; _i2++) {
            var f = fields[_i2];
            if (obj[f] != null) {
              cy[f](obj[f]);
            }
          }
          cy.endBatch();
          return this;
        } else {
          var flat = !!obj;
          var json2 = {};
          if (flat) {
            json2.elements = this.elements().map(function(ele) {
              return ele.json();
            });
          } else {
            json2.elements = {};
            eles.forEach(function(ele) {
              var group = ele.group();
              if (!json2.elements[group]) {
                json2.elements[group] = [];
              }
              json2.elements[group].push(ele.json());
            });
          }
          if (this._private.styleEnabled) {
            json2.style = cy.style().json();
          }
          json2.data = copy(cy.data());
          var options = _p.options;
          json2.zoomingEnabled = _p.zoomingEnabled;
          json2.userZoomingEnabled = _p.userZoomingEnabled;
          json2.zoom = _p.zoom;
          json2.minZoom = _p.minZoom;
          json2.maxZoom = _p.maxZoom;
          json2.panningEnabled = _p.panningEnabled;
          json2.userPanningEnabled = _p.userPanningEnabled;
          json2.pan = copy(_p.pan);
          json2.boxSelectionEnabled = _p.boxSelectionEnabled;
          json2.renderer = copy(options.renderer);
          json2.hideEdgesOnViewport = options.hideEdgesOnViewport;
          json2.textureOnViewport = options.textureOnViewport;
          json2.wheelSensitivity = options.wheelSensitivity;
          json2.motionBlur = options.motionBlur;
          json2.multiClickDebounceTime = options.multiClickDebounceTime;
          return json2;
        }
      }
    });
    corefn.$id = corefn.getElementById;
    [corefn$9, corefn$8, elesfn, corefn$7, corefn$6, corefn$5, corefn$4, corefn$3, corefn$2, corefn$1, fn].forEach(function(props) {
      extend(corefn, props);
    });
    var defaults$7 = {
      fit: true,
      // whether to fit the viewport to the graph
      directed: false,
      // whether the tree is directed downwards (or edges can point in any direction if false)
      padding: 30,
      // padding on fit
      circle: false,
      // put depths in concentric circles if true, put depths top down if false
      grid: false,
      // whether to create an even grid into which the DAG is placed (circle:false only)
      spacingFactor: 1.75,
      // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
      boundingBox: void 0,
      // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true,
      // prevents node overlap, may overflow boundingBox if not enough space
      nodeDimensionsIncludeLabels: false,
      // Excludes the label when calculating node bounding boxes for the layout algorithm
      roots: void 0,
      // the roots of the trees
      depthSort: void 0,
      // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false,
      // whether to transition the node positions
      animationDuration: 500,
      // duration of animation in ms if enabled
      animationEasing: void 0,
      // easing of animation if enabled,
      animateFilter: function animateFilter(node, i2) {
        return true;
      },
      // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: void 0,
      // callback on layoutready
      stop: void 0,
      // callback on layoutstop
      transform: function transform(node, position2) {
        return position2;
      }
      // transform a given node position. Useful for changing flow direction in discrete layouts
    };
    var deprecatedOptionDefaults = {
      maximal: false,
      // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only); setting acyclic to true sets maximal to true also
      acyclic: false
      // whether the tree is acyclic and thus a node could be shifted (due to the maximal option) multiple times without causing an infinite loop; setting to true sets maximal to true also; if you are uncertain whether a tree is acyclic, set to false to avoid potential infinite loops
    };
    var getInfo = function getInfo2(ele) {
      return ele.scratch("breadthfirst");
    };
    var setInfo = function setInfo2(ele, obj) {
      return ele.scratch("breadthfirst", obj);
    };
    function BreadthFirstLayout(options) {
      this.options = extend({}, defaults$7, deprecatedOptionDefaults, options);
    }
    BreadthFirstLayout.prototype.run = function() {
      var params = this.options;
      var options = params;
      var cy = params.cy;
      var eles = options.eles;
      var nodes = eles.nodes().filter(function(n2) {
        return !n2.isParent();
      });
      var graph = eles;
      var directed = options.directed;
      var maximal = options.acyclic || options.maximal || options.maximalAdjustments > 0;
      var bb = makeBoundingBox(options.boundingBox ? options.boundingBox : {
        x1: 0,
        y1: 0,
        w: cy.width(),
        h: cy.height()
      });
      var roots;
      if (elementOrCollection(options.roots)) {
        roots = options.roots;
      } else if (array(options.roots)) {
        var rootsArray = [];
        for (var i2 = 0; i2 < options.roots.length; i2++) {
          var id = options.roots[i2];
          var ele = cy.getElementById(id);
          rootsArray.push(ele);
        }
        roots = cy.collection(rootsArray);
      } else if (string(options.roots)) {
        roots = cy.$(options.roots);
      } else {
        if (directed) {
          roots = nodes.roots();
        } else {
          var components = eles.components();
          roots = cy.collection();
          var _loop = function _loop2(_i3) {
            var comp = components[_i3];
            var maxDegree = comp.maxDegree(false);
            var compRoots = comp.filter(function(ele2) {
              return ele2.degree(false) === maxDegree;
            });
            roots = roots.add(compRoots);
          };
          for (var _i = 0; _i < components.length; _i++) {
            _loop(_i);
          }
        }
      }
      var depths = [];
      var foundByBfs = {};
      var addToDepth = function addToDepth2(ele2, d) {
        if (depths[d] == null) {
          depths[d] = [];
        }
        var i3 = depths[d].length;
        depths[d].push(ele2);
        setInfo(ele2, {
          index: i3,
          depth: d
        });
      };
      var changeDepth = function changeDepth2(ele2, newDepth) {
        var _getInfo = getInfo(ele2), depth = _getInfo.depth, index = _getInfo.index;
        depths[depth][index] = null;
        addToDepth(ele2, newDepth);
      };
      graph.bfs({
        roots,
        directed: options.directed,
        visit: function visit(node, edge, pNode, i3, depth) {
          var ele2 = node[0];
          var id2 = ele2.id();
          addToDepth(ele2, depth);
          foundByBfs[id2] = true;
        }
      });
      var orphanNodes = [];
      for (var _i2 = 0; _i2 < nodes.length; _i2++) {
        var _ele = nodes[_i2];
        if (foundByBfs[_ele.id()]) {
          continue;
        } else {
          orphanNodes.push(_ele);
        }
      }
      var assignDepthsAt = function assignDepthsAt2(i3) {
        var eles2 = depths[i3];
        for (var j = 0; j < eles2.length; j++) {
          var _ele2 = eles2[j];
          if (_ele2 == null) {
            eles2.splice(j, 1);
            j--;
            continue;
          }
          setInfo(_ele2, {
            depth: i3,
            index: j
          });
        }
      };
      var assignDepths = function assignDepths2() {
        for (var _i3 = 0; _i3 < depths.length; _i3++) {
          assignDepthsAt(_i3);
        }
      };
      var adjustMaximally = function adjustMaximally2(ele2, shifted2) {
        var eInfo = getInfo(ele2);
        var incomers = ele2.incomers().filter(function(el) {
          return el.isNode() && eles.has(el);
        });
        var maxDepth = -1;
        var id2 = ele2.id();
        for (var k = 0; k < incomers.length; k++) {
          var incmr = incomers[k];
          var iInfo = getInfo(incmr);
          maxDepth = Math.max(maxDepth, iInfo.depth);
        }
        if (eInfo.depth <= maxDepth) {
          if (!options.acyclic && shifted2[id2]) {
            return null;
          }
          var newDepth = maxDepth + 1;
          changeDepth(ele2, newDepth);
          shifted2[id2] = newDepth;
          return true;
        }
        return false;
      };
      if (directed && maximal) {
        var Q = [];
        var shifted = {};
        var enqueue = function enqueue2(n2) {
          return Q.push(n2);
        };
        var dequeue = function dequeue2() {
          return Q.shift();
        };
        nodes.forEach(function(n2) {
          return Q.push(n2);
        });
        while (Q.length > 0) {
          var _ele3 = dequeue();
          var didShift = adjustMaximally(_ele3, shifted);
          if (didShift) {
            _ele3.outgoers().filter(function(el) {
              return el.isNode() && eles.has(el);
            }).forEach(enqueue);
          } else if (didShift === null) {
            warn("Detected double maximal shift for node `" + _ele3.id() + "`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs.");
            break;
          }
        }
      }
      assignDepths();
      var minDistance = 0;
      if (options.avoidOverlap) {
        for (var _i4 = 0; _i4 < nodes.length; _i4++) {
          var n = nodes[_i4];
          var nbb = n.layoutDimensions(options);
          var w = nbb.w;
          var h = nbb.h;
          minDistance = Math.max(minDistance, w, h);
        }
      }
      var cachedWeightedPercent = {};
      var getWeightedPercent = function getWeightedPercent2(ele2) {
        if (cachedWeightedPercent[ele2.id()]) {
          return cachedWeightedPercent[ele2.id()];
        }
        var eleDepth = getInfo(ele2).depth;
        var neighbors = ele2.neighborhood();
        var percent = 0;
        var samples = 0;
        for (var _i5 = 0; _i5 < neighbors.length; _i5++) {
          var neighbor = neighbors[_i5];
          if (neighbor.isEdge() || neighbor.isParent() || !nodes.has(neighbor)) {
            continue;
          }
          var bf = getInfo(neighbor);
          if (bf == null) {
            continue;
          }
          var index = bf.index;
          var depth = bf.depth;
          if (index == null || depth == null) {
            continue;
          }
          var nDepth = depths[depth].length;
          if (depth < eleDepth) {
            percent += index / nDepth;
            samples++;
          }
        }
        samples = Math.max(1, samples);
        percent = percent / samples;
        if (samples === 0) {
          percent = 0;
        }
        cachedWeightedPercent[ele2.id()] = percent;
        return percent;
      };
      var sortFn = function sortFn2(a, b) {
        var apct = getWeightedPercent(a);
        var bpct = getWeightedPercent(b);
        var diff = apct - bpct;
        if (diff === 0) {
          return ascending(a.id(), b.id());
        } else {
          return diff;
        }
      };
      if (options.depthSort !== void 0) {
        sortFn = options.depthSort;
      }
      for (var _i6 = 0; _i6 < depths.length; _i6++) {
        depths[_i6].sort(sortFn);
        assignDepthsAt(_i6);
      }
      var orphanDepth = [];
      for (var _i7 = 0; _i7 < orphanNodes.length; _i7++) {
        orphanDepth.push(orphanNodes[_i7]);
      }
      depths.unshift(orphanDepth);
      assignDepths();
      var biggestDepthSize = 0;
      for (var _i8 = 0; _i8 < depths.length; _i8++) {
        biggestDepthSize = Math.max(depths[_i8].length, biggestDepthSize);
      }
      var center = {
        x: bb.x1 + bb.w / 2,
        y: bb.x1 + bb.h / 2
      };
      var maxDepthSize = depths.reduce(function(max2, eles2) {
        return Math.max(max2, eles2.length);
      }, 0);
      var getPosition = function getPosition2(ele2) {
        var _getInfo2 = getInfo(ele2), depth = _getInfo2.depth, index = _getInfo2.index;
        var depthSize = depths[depth].length;
        var distanceX = Math.max(bb.w / ((options.grid ? maxDepthSize : depthSize) + 1), minDistance);
        var distanceY = Math.max(bb.h / (depths.length + 1), minDistance);
        var radiusStepSize = Math.min(bb.w / 2 / depths.length, bb.h / 2 / depths.length);
        radiusStepSize = Math.max(radiusStepSize, minDistance);
        if (!options.circle) {
          var epos = {
            x: center.x + (index + 1 - (depthSize + 1) / 2) * distanceX,
            y: (depth + 1) * distanceY
          };
          return epos;
        } else {
          var radius = radiusStepSize * depth + radiusStepSize - (depths.length > 0 && depths[0].length <= 3 ? radiusStepSize / 2 : 0);
          var theta = 2 * Math.PI / depths[depth].length * index;
          if (depth === 0 && depths[0].length === 1) {
            radius = 1;
          }
          return {
            x: center.x + radius * Math.cos(theta),
            y: center.y + radius * Math.sin(theta)
          };
        }
      };
      eles.nodes().layoutPositions(this, options, getPosition);
      return this;
    };
    var defaults$6 = {
      fit: true,
      // whether to fit the viewport to the graph
      padding: 30,
      // the padding on fit
      boundingBox: void 0,
      // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true,
      // prevents node overlap, may overflow boundingBox and radius if not enough space
      nodeDimensionsIncludeLabels: false,
      // Excludes the label when calculating node bounding boxes for the layout algorithm
      spacingFactor: void 0,
      // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      radius: void 0,
      // the radius of the circle
      startAngle: 3 / 2 * Math.PI,
      // where nodes start in radians
      sweep: void 0,
      // how many radians should be between the first and last node (defaults to full circle)
      clockwise: true,
      // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
      sort: void 0,
      // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false,
      // whether to transition the node positions
      animationDuration: 500,
      // duration of animation in ms if enabled
      animationEasing: void 0,
      // easing of animation if enabled
      animateFilter: function animateFilter(node, i2) {
        return true;
      },
      // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: void 0,
      // callback on layoutready
      stop: void 0,
      // callback on layoutstop
      transform: function transform(node, position2) {
        return position2;
      }
      // transform a given node position. Useful for changing flow direction in discrete layouts 
    };
    function CircleLayout(options) {
      this.options = extend({}, defaults$6, options);
    }
    CircleLayout.prototype.run = function() {
      var params = this.options;
      var options = params;
      var cy = params.cy;
      var eles = options.eles;
      var clockwise = options.counterclockwise !== void 0 ? !options.counterclockwise : options.clockwise;
      var nodes = eles.nodes().not(":parent");
      if (options.sort) {
        nodes = nodes.sort(options.sort);
      }
      var bb = makeBoundingBox(options.boundingBox ? options.boundingBox : {
        x1: 0,
        y1: 0,
        w: cy.width(),
        h: cy.height()
      });
      var center = {
        x: bb.x1 + bb.w / 2,
        y: bb.y1 + bb.h / 2
      };
      var sweep = options.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / nodes.length : options.sweep;
      var dTheta = sweep / Math.max(1, nodes.length - 1);
      var r;
      var minDistance = 0;
      for (var i2 = 0; i2 < nodes.length; i2++) {
        var n = nodes[i2];
        var nbb = n.layoutDimensions(options);
        var w = nbb.w;
        var h = nbb.h;
        minDistance = Math.max(minDistance, w, h);
      }
      if (number$1(options.radius)) {
        r = options.radius;
      } else if (nodes.length <= 1) {
        r = 0;
      } else {
        r = Math.min(bb.h, bb.w) / 2 - minDistance;
      }
      if (nodes.length > 1 && options.avoidOverlap) {
        minDistance *= 1.75;
        var dcos = Math.cos(dTheta) - Math.cos(0);
        var dsin = Math.sin(dTheta) - Math.sin(0);
        var rMin = Math.sqrt(minDistance * minDistance / (dcos * dcos + dsin * dsin));
        r = Math.max(rMin, r);
      }
      var getPos = function getPos2(ele, i3) {
        var theta = options.startAngle + i3 * dTheta * (clockwise ? 1 : -1);
        var rx = r * Math.cos(theta);
        var ry = r * Math.sin(theta);
        var pos = {
          x: center.x + rx,
          y: center.y + ry
        };
        return pos;
      };
      eles.nodes().layoutPositions(this, options, getPos);
      return this;
    };
    var defaults$5 = {
      fit: true,
      // whether to fit the viewport to the graph
      padding: 30,
      // the padding on fit
      startAngle: 3 / 2 * Math.PI,
      // where nodes start in radians
      sweep: void 0,
      // how many radians should be between the first and last node (defaults to full circle)
      clockwise: true,
      // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
      equidistant: false,
      // whether levels have an equal radial distance betwen them, may cause bounding box overflow
      minNodeSpacing: 10,
      // min spacing between outside of nodes (used for radius adjustment)
      boundingBox: void 0,
      // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true,
      // prevents node overlap, may overflow boundingBox if not enough space
      nodeDimensionsIncludeLabels: false,
      // Excludes the label when calculating node bounding boxes for the layout algorithm
      height: void 0,
      // height of layout area (overrides container height)
      width: void 0,
      // width of layout area (overrides container width)
      spacingFactor: void 0,
      // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      concentric: function concentric(node) {
        return node.degree();
      },
      levelWidth: function levelWidth(nodes) {
        return nodes.maxDegree() / 4;
      },
      animate: false,
      // whether to transition the node positions
      animationDuration: 500,
      // duration of animation in ms if enabled
      animationEasing: void 0,
      // easing of animation if enabled
      animateFilter: function animateFilter(node, i2) {
        return true;
      },
      // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: void 0,
      // callback on layoutready
      stop: void 0,
      // callback on layoutstop
      transform: function transform(node, position2) {
        return position2;
      }
      // transform a given node position. Useful for changing flow direction in discrete layouts
    };
    function ConcentricLayout(options) {
      this.options = extend({}, defaults$5, options);
    }
    ConcentricLayout.prototype.run = function() {
      var params = this.options;
      var options = params;
      var clockwise = options.counterclockwise !== void 0 ? !options.counterclockwise : options.clockwise;
      var cy = params.cy;
      var eles = options.eles;
      var nodes = eles.nodes().not(":parent");
      var bb = makeBoundingBox(options.boundingBox ? options.boundingBox : {
        x1: 0,
        y1: 0,
        w: cy.width(),
        h: cy.height()
      });
      var center = {
        x: bb.x1 + bb.w / 2,
        y: bb.y1 + bb.h / 2
      };
      var nodeValues = [];
      var maxNodeSize = 0;
      for (var i2 = 0; i2 < nodes.length; i2++) {
        var node = nodes[i2];
        var value = void 0;
        value = options.concentric(node);
        nodeValues.push({
          value,
          node
        });
        node._private.scratch.concentric = value;
      }
      nodes.updateStyle();
      for (var _i = 0; _i < nodes.length; _i++) {
        var _node = nodes[_i];
        var nbb = _node.layoutDimensions(options);
        maxNodeSize = Math.max(maxNodeSize, nbb.w, nbb.h);
      }
      nodeValues.sort(function(a, b) {
        return b.value - a.value;
      });
      var levelWidth = options.levelWidth(nodes);
      var levels = [[]];
      var currentLevel = levels[0];
      for (var _i2 = 0; _i2 < nodeValues.length; _i2++) {
        var val = nodeValues[_i2];
        if (currentLevel.length > 0) {
          var diff = Math.abs(currentLevel[0].value - val.value);
          if (diff >= levelWidth) {
            currentLevel = [];
            levels.push(currentLevel);
          }
        }
        currentLevel.push(val);
      }
      var minDist = maxNodeSize + options.minNodeSpacing;
      if (!options.avoidOverlap) {
        var firstLvlHasMulti = levels.length > 0 && levels[0].length > 1;
        var maxR = Math.min(bb.w, bb.h) / 2 - minDist;
        var rStep = maxR / (levels.length + firstLvlHasMulti ? 1 : 0);
        minDist = Math.min(minDist, rStep);
      }
      var r = 0;
      for (var _i3 = 0; _i3 < levels.length; _i3++) {
        var level = levels[_i3];
        var sweep = options.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / level.length : options.sweep;
        var dTheta = level.dTheta = sweep / Math.max(1, level.length - 1);
        if (level.length > 1 && options.avoidOverlap) {
          var dcos = Math.cos(dTheta) - Math.cos(0);
          var dsin = Math.sin(dTheta) - Math.sin(0);
          var rMin = Math.sqrt(minDist * minDist / (dcos * dcos + dsin * dsin));
          r = Math.max(rMin, r);
        }
        level.r = r;
        r += minDist;
      }
      if (options.equidistant) {
        var rDeltaMax = 0;
        var _r = 0;
        for (var _i4 = 0; _i4 < levels.length; _i4++) {
          var _level = levels[_i4];
          var rDelta = _level.r - _r;
          rDeltaMax = Math.max(rDeltaMax, rDelta);
        }
        _r = 0;
        for (var _i5 = 0; _i5 < levels.length; _i5++) {
          var _level2 = levels[_i5];
          if (_i5 === 0) {
            _r = _level2.r;
          }
          _level2.r = _r;
          _r += rDeltaMax;
        }
      }
      var pos = {};
      for (var _i6 = 0; _i6 < levels.length; _i6++) {
        var _level3 = levels[_i6];
        var _dTheta = _level3.dTheta;
        var _r2 = _level3.r;
        for (var j = 0; j < _level3.length; j++) {
          var _val = _level3[j];
          var theta = options.startAngle + (clockwise ? 1 : -1) * _dTheta * j;
          var p2 = {
            x: center.x + _r2 * Math.cos(theta),
            y: center.y + _r2 * Math.sin(theta)
          };
          pos[_val.node.id()] = p2;
        }
      }
      eles.nodes().layoutPositions(this, options, function(ele) {
        var id = ele.id();
        return pos[id];
      });
      return this;
    };
    var DEBUG;
    var defaults$4 = {
      // Called on `layoutready`
      ready: function ready() {
      },
      // Called on `layoutstop`
      stop: function stop() {
      },
      // Whether to animate while running the layout
      // true : Animate continuously as the layout is running
      // false : Just show the end result
      // 'end' : Animate with the end result, from the initial positions to the end positions
      animate: true,
      // Easing of the animation for animate:'end'
      animationEasing: void 0,
      // The duration of the animation for animate:'end'
      animationDuration: void 0,
      // A function that determines whether the node should be animated
      // All nodes animated by default on animate enabled
      // Non-animated nodes are positioned immediately when the layout starts
      animateFilter: function animateFilter(node, i2) {
        return true;
      },
      // The layout animates only after this many milliseconds for animate:true
      // (prevents flashing on fast runs)
      animationThreshold: 250,
      // Number of iterations between consecutive screen positions update
      refresh: 20,
      // Whether to fit the network view after when done
      fit: true,
      // Padding on fit
      padding: 30,
      // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      boundingBox: void 0,
      // Excludes the label when calculating node bounding boxes for the layout algorithm
      nodeDimensionsIncludeLabels: false,
      // Randomize the initial positions of the nodes (true) or use existing positions (false)
      randomize: false,
      // Extra spacing between components in non-compound graphs
      componentSpacing: 40,
      // Node repulsion (non overlapping) multiplier
      nodeRepulsion: function nodeRepulsion2(node) {
        return 2048;
      },
      // Node repulsion (overlapping) multiplier
      nodeOverlap: 4,
      // Ideal edge (non nested) length
      idealEdgeLength: function idealEdgeLength(edge) {
        return 32;
      },
      // Divisor to compute edge forces
      edgeElasticity: function edgeElasticity(edge) {
        return 32;
      },
      // Nesting factor (multiplier) to compute ideal edge length for nested edges
      nestingFactor: 1.2,
      // Gravity force (constant)
      gravity: 1,
      // Maximum number of iterations to perform
      numIter: 1e3,
      // Initial temperature (maximum node displacement)
      initialTemp: 1e3,
      // Cooling factor (how the temperature is reduced between consecutive iterations
      coolingFactor: 0.99,
      // Lower temperature threshold (below this point the layout will end)
      minTemp: 1
    };
    function CoseLayout(options) {
      this.options = extend({}, defaults$4, options);
      this.options.layout = this;
      var nodes = this.options.eles.nodes();
      var edges = this.options.eles.edges();
      var notEdges = edges.filter(function(e) {
        var sourceId = e.source().data("id");
        var targetId = e.target().data("id");
        var hasSource = nodes.some(function(n) {
          return n.data("id") === sourceId;
        });
        var hasTarget = nodes.some(function(n) {
          return n.data("id") === targetId;
        });
        return !hasSource || !hasTarget;
      });
      this.options.eles = this.options.eles.not(notEdges);
    }
    CoseLayout.prototype.run = function() {
      var options = this.options;
      var cy = options.cy;
      var layout2 = this;
      layout2.stopped = false;
      if (options.animate === true || options.animate === false) {
        layout2.emit({
          type: "layoutstart",
          layout: layout2
        });
      }
      if (true === options.debug) {
        DEBUG = true;
      } else {
        DEBUG = false;
      }
      var layoutInfo = createLayoutInfo(cy, layout2, options);
      if (DEBUG) {
        printLayoutInfo(layoutInfo);
      }
      if (options.randomize) {
        randomizePositions(layoutInfo);
      }
      var startTime = performanceNow();
      var refresh = function refresh2() {
        refreshPositions(layoutInfo, cy, options);
        if (true === options.fit) {
          cy.fit(options.padding);
        }
      };
      var mainLoop = function mainLoop2(i3) {
        if (layout2.stopped || i3 >= options.numIter) {
          return false;
        }
        step(layoutInfo, options);
        layoutInfo.temperature = layoutInfo.temperature * options.coolingFactor;
        if (layoutInfo.temperature < options.minTemp) {
          return false;
        }
        return true;
      };
      var done = function done2() {
        if (options.animate === true || options.animate === false) {
          refresh();
          layout2.one("layoutstop", options.stop);
          layout2.emit({
            type: "layoutstop",
            layout: layout2
          });
        } else {
          var nodes = options.eles.nodes();
          var getScaledPos = getScaleInBoundsFn(layoutInfo, options, nodes);
          nodes.layoutPositions(layout2, options, getScaledPos);
        }
      };
      var i2 = 0;
      var loopRet = true;
      if (options.animate === true) {
        var frame = function frame2() {
          var f = 0;
          while (loopRet && f < options.refresh) {
            loopRet = mainLoop(i2);
            i2++;
            f++;
          }
          if (!loopRet) {
            separateComponents(layoutInfo, options);
            done();
          } else {
            var now = performanceNow();
            if (now - startTime >= options.animationThreshold) {
              refresh();
            }
            requestAnimationFrame(frame2);
          }
        };
        frame();
      } else {
        while (loopRet) {
          loopRet = mainLoop(i2);
          i2++;
        }
        separateComponents(layoutInfo, options);
        done();
      }
      return this;
    };
    CoseLayout.prototype.stop = function() {
      this.stopped = true;
      if (this.thread) {
        this.thread.stop();
      }
      this.emit("layoutstop");
      return this;
    };
    CoseLayout.prototype.destroy = function() {
      if (this.thread) {
        this.thread.stop();
      }
      return this;
    };
    var createLayoutInfo = function createLayoutInfo2(cy, layout2, options) {
      var edges = options.eles.edges();
      var nodes = options.eles.nodes();
      var bb = makeBoundingBox(options.boundingBox ? options.boundingBox : {
        x1: 0,
        y1: 0,
        w: cy.width(),
        h: cy.height()
      });
      var layoutInfo = {
        isCompound: cy.hasCompoundNodes(),
        layoutNodes: [],
        idToIndex: {},
        nodeSize: nodes.size(),
        graphSet: [],
        indexToGraph: [],
        layoutEdges: [],
        edgeSize: edges.size(),
        temperature: options.initialTemp,
        clientWidth: bb.w,
        clientHeight: bb.h,
        boundingBox: bb
      };
      var components = options.eles.components();
      var id2cmptId = {};
      for (var i2 = 0; i2 < components.length; i2++) {
        var component = components[i2];
        for (var j = 0; j < component.length; j++) {
          var node = component[j];
          id2cmptId[node.id()] = i2;
        }
      }
      for (var i2 = 0; i2 < layoutInfo.nodeSize; i2++) {
        var n = nodes[i2];
        var nbb = n.layoutDimensions(options);
        var tempNode = {};
        tempNode.isLocked = n.locked();
        tempNode.id = n.data("id");
        tempNode.parentId = n.data("parent");
        tempNode.cmptId = id2cmptId[n.id()];
        tempNode.children = [];
        tempNode.positionX = n.position("x");
        tempNode.positionY = n.position("y");
        tempNode.offsetX = 0;
        tempNode.offsetY = 0;
        tempNode.height = nbb.w;
        tempNode.width = nbb.h;
        tempNode.maxX = tempNode.positionX + tempNode.width / 2;
        tempNode.minX = tempNode.positionX - tempNode.width / 2;
        tempNode.maxY = tempNode.positionY + tempNode.height / 2;
        tempNode.minY = tempNode.positionY - tempNode.height / 2;
        tempNode.padLeft = parseFloat(n.style("padding"));
        tempNode.padRight = parseFloat(n.style("padding"));
        tempNode.padTop = parseFloat(n.style("padding"));
        tempNode.padBottom = parseFloat(n.style("padding"));
        tempNode.nodeRepulsion = fn$6(options.nodeRepulsion) ? options.nodeRepulsion(n) : options.nodeRepulsion;
        layoutInfo.layoutNodes.push(tempNode);
        layoutInfo.idToIndex[tempNode.id] = i2;
      }
      var queue = [];
      var start = 0;
      var end = -1;
      var tempGraph = [];
      for (var i2 = 0; i2 < layoutInfo.nodeSize; i2++) {
        var n = layoutInfo.layoutNodes[i2];
        var p_id = n.parentId;
        if (null != p_id) {
          layoutInfo.layoutNodes[layoutInfo.idToIndex[p_id]].children.push(n.id);
        } else {
          queue[++end] = n.id;
          tempGraph.push(n.id);
        }
      }
      layoutInfo.graphSet.push(tempGraph);
      while (start <= end) {
        var node_id = queue[start++];
        var node_ix = layoutInfo.idToIndex[node_id];
        var node = layoutInfo.layoutNodes[node_ix];
        var children = node.children;
        if (children.length > 0) {
          layoutInfo.graphSet.push(children);
          for (var i2 = 0; i2 < children.length; i2++) {
            queue[++end] = children[i2];
          }
        }
      }
      for (var i2 = 0; i2 < layoutInfo.graphSet.length; i2++) {
        var graph = layoutInfo.graphSet[i2];
        for (var j = 0; j < graph.length; j++) {
          var index = layoutInfo.idToIndex[graph[j]];
          layoutInfo.indexToGraph[index] = i2;
        }
      }
      for (var i2 = 0; i2 < layoutInfo.edgeSize; i2++) {
        var e = edges[i2];
        var tempEdge = {};
        tempEdge.id = e.data("id");
        tempEdge.sourceId = e.data("source");
        tempEdge.targetId = e.data("target");
        var idealLength = fn$6(options.idealEdgeLength) ? options.idealEdgeLength(e) : options.idealEdgeLength;
        var elasticity = fn$6(options.edgeElasticity) ? options.edgeElasticity(e) : options.edgeElasticity;
        var sourceIx = layoutInfo.idToIndex[tempEdge.sourceId];
        var targetIx = layoutInfo.idToIndex[tempEdge.targetId];
        var sourceGraph = layoutInfo.indexToGraph[sourceIx];
        var targetGraph = layoutInfo.indexToGraph[targetIx];
        if (sourceGraph != targetGraph) {
          var lca = findLCA(tempEdge.sourceId, tempEdge.targetId, layoutInfo);
          var lcaGraph = layoutInfo.graphSet[lca];
          var depth = 0;
          var tempNode = layoutInfo.layoutNodes[sourceIx];
          while (-1 === lcaGraph.indexOf(tempNode.id)) {
            tempNode = layoutInfo.layoutNodes[layoutInfo.idToIndex[tempNode.parentId]];
            depth++;
          }
          tempNode = layoutInfo.layoutNodes[targetIx];
          while (-1 === lcaGraph.indexOf(tempNode.id)) {
            tempNode = layoutInfo.layoutNodes[layoutInfo.idToIndex[tempNode.parentId]];
            depth++;
          }
          idealLength *= depth * options.nestingFactor;
        }
        tempEdge.idealLength = idealLength;
        tempEdge.elasticity = elasticity;
        layoutInfo.layoutEdges.push(tempEdge);
      }
      return layoutInfo;
    };
    var findLCA = function findLCA2(node1, node2, layoutInfo) {
      var res = findLCA_aux(node1, node2, 0, layoutInfo);
      if (2 > res.count) {
        return 0;
      } else {
        return res.graph;
      }
    };
    var findLCA_aux = function findLCA_aux2(node1, node2, graphIx, layoutInfo) {
      var graph = layoutInfo.graphSet[graphIx];
      if (-1 < graph.indexOf(node1) && -1 < graph.indexOf(node2)) {
        return {
          count: 2,
          graph: graphIx
        };
      }
      var c = 0;
      for (var i2 = 0; i2 < graph.length; i2++) {
        var nodeId = graph[i2];
        var nodeIx = layoutInfo.idToIndex[nodeId];
        var children = layoutInfo.layoutNodes[nodeIx].children;
        if (0 === children.length) {
          continue;
        }
        var childGraphIx = layoutInfo.indexToGraph[layoutInfo.idToIndex[children[0]]];
        var result = findLCA_aux2(node1, node2, childGraphIx, layoutInfo);
        if (0 === result.count) {
          continue;
        } else if (1 === result.count) {
          c++;
          if (2 === c) {
            break;
          }
        } else {
          return result;
        }
      }
      return {
        count: c,
        graph: graphIx
      };
    };
    var printLayoutInfo;
    var randomizePositions = function randomizePositions2(layoutInfo, cy) {
      var width = layoutInfo.clientWidth;
      var height = layoutInfo.clientHeight;
      for (var i2 = 0; i2 < layoutInfo.nodeSize; i2++) {
        var n = layoutInfo.layoutNodes[i2];
        if (0 === n.children.length && !n.isLocked) {
          n.positionX = Math.random() * width;
          n.positionY = Math.random() * height;
        }
      }
    };
    var getScaleInBoundsFn = function getScaleInBoundsFn2(layoutInfo, options, nodes) {
      var bb = layoutInfo.boundingBox;
      var coseBB = {
        x1: Infinity,
        x2: -Infinity,
        y1: Infinity,
        y2: -Infinity
      };
      if (options.boundingBox) {
        nodes.forEach(function(node) {
          var lnode = layoutInfo.layoutNodes[layoutInfo.idToIndex[node.data("id")]];
          coseBB.x1 = Math.min(coseBB.x1, lnode.positionX);
          coseBB.x2 = Math.max(coseBB.x2, lnode.positionX);
          coseBB.y1 = Math.min(coseBB.y1, lnode.positionY);
          coseBB.y2 = Math.max(coseBB.y2, lnode.positionY);
        });
        coseBB.w = coseBB.x2 - coseBB.x1;
        coseBB.h = coseBB.y2 - coseBB.y1;
      }
      return function(ele, i2) {
        var lnode = layoutInfo.layoutNodes[layoutInfo.idToIndex[ele.data("id")]];
        if (options.boundingBox) {
          var pctX = (lnode.positionX - coseBB.x1) / coseBB.w;
          var pctY = (lnode.positionY - coseBB.y1) / coseBB.h;
          return {
            x: bb.x1 + pctX * bb.w,
            y: bb.y1 + pctY * bb.h
          };
        } else {
          return {
            x: lnode.positionX,
            y: lnode.positionY
          };
        }
      };
    };
    var refreshPositions = function refreshPositions2(layoutInfo, cy, options) {
      var layout2 = options.layout;
      var nodes = options.eles.nodes();
      var getScaledPos = getScaleInBoundsFn(layoutInfo, options, nodes);
      nodes.positions(getScaledPos);
      if (true !== layoutInfo.ready) {
        layoutInfo.ready = true;
        layout2.one("layoutready", options.ready);
        layout2.emit({
          type: "layoutready",
          layout: this
        });
      }
    };
    var step = function step2(layoutInfo, options, _step) {
      calculateNodeForces(layoutInfo, options);
      calculateEdgeForces(layoutInfo);
      calculateGravityForces(layoutInfo, options);
      propagateForces(layoutInfo);
      updatePositions(layoutInfo);
    };
    var calculateNodeForces = function calculateNodeForces2(layoutInfo, options) {
      for (var i2 = 0; i2 < layoutInfo.graphSet.length; i2++) {
        var graph = layoutInfo.graphSet[i2];
        var numNodes = graph.length;
        for (var j = 0; j < numNodes; j++) {
          var node1 = layoutInfo.layoutNodes[layoutInfo.idToIndex[graph[j]]];
          for (var k = j + 1; k < numNodes; k++) {
            var node2 = layoutInfo.layoutNodes[layoutInfo.idToIndex[graph[k]]];
            nodeRepulsion(node1, node2, layoutInfo, options);
          }
        }
      }
    };
    var randomDistance = function randomDistance2(max2) {
      return -max2 + 2 * max2 * Math.random();
    };
    var nodeRepulsion = function nodeRepulsion2(node1, node2, layoutInfo, options) {
      var cmptId1 = node1.cmptId;
      var cmptId2 = node2.cmptId;
      if (cmptId1 !== cmptId2 && !layoutInfo.isCompound) {
        return;
      }
      var directionX = node2.positionX - node1.positionX;
      var directionY = node2.positionY - node1.positionY;
      var maxRandDist = 1;
      if (0 === directionX && 0 === directionY) {
        directionX = randomDistance(maxRandDist);
        directionY = randomDistance(maxRandDist);
      }
      var overlap = nodesOverlap(node1, node2, directionX, directionY);
      if (overlap > 0) {
        var force = options.nodeOverlap * overlap;
        var distance = Math.sqrt(directionX * directionX + directionY * directionY);
        var forceX = force * directionX / distance;
        var forceY = force * directionY / distance;
      } else {
        var point1 = findClippingPoint(node1, directionX, directionY);
        var point2 = findClippingPoint(node2, -1 * directionX, -1 * directionY);
        var distanceX = point2.x - point1.x;
        var distanceY = point2.y - point1.y;
        var distanceSqr = distanceX * distanceX + distanceY * distanceY;
        var distance = Math.sqrt(distanceSqr);
        var force = (node1.nodeRepulsion + node2.nodeRepulsion) / distanceSqr;
        var forceX = force * distanceX / distance;
        var forceY = force * distanceY / distance;
      }
      if (!node1.isLocked) {
        node1.offsetX -= forceX;
        node1.offsetY -= forceY;
      }
      if (!node2.isLocked) {
        node2.offsetX += forceX;
        node2.offsetY += forceY;
      }
      return;
    };
    var nodesOverlap = function nodesOverlap2(node1, node2, dX, dY) {
      if (dX > 0) {
        var overlapX = node1.maxX - node2.minX;
      } else {
        var overlapX = node2.maxX - node1.minX;
      }
      if (dY > 0) {
        var overlapY = node1.maxY - node2.minY;
      } else {
        var overlapY = node2.maxY - node1.minY;
      }
      if (overlapX >= 0 && overlapY >= 0) {
        return Math.sqrt(overlapX * overlapX + overlapY * overlapY);
      } else {
        return 0;
      }
    };
    var findClippingPoint = function findClippingPoint2(node, dX, dY) {
      var X = node.positionX;
      var Y = node.positionY;
      var H = node.height || 1;
      var W = node.width || 1;
      var dirSlope = dY / dX;
      var nodeSlope = H / W;
      var res = {};
      if (0 === dX && 0 < dY) {
        res.x = X;
        res.y = Y + H / 2;
        return res;
      }
      if (0 === dX && 0 > dY) {
        res.x = X;
        res.y = Y + H / 2;
        return res;
      }
      if (0 < dX && -1 * nodeSlope <= dirSlope && dirSlope <= nodeSlope) {
        res.x = X + W / 2;
        res.y = Y + W * dY / 2 / dX;
        return res;
      }
      if (0 > dX && -1 * nodeSlope <= dirSlope && dirSlope <= nodeSlope) {
        res.x = X - W / 2;
        res.y = Y - W * dY / 2 / dX;
        return res;
      }
      if (0 < dY && (dirSlope <= -1 * nodeSlope || dirSlope >= nodeSlope)) {
        res.x = X + H * dX / 2 / dY;
        res.y = Y + H / 2;
        return res;
      }
      if (0 > dY && (dirSlope <= -1 * nodeSlope || dirSlope >= nodeSlope)) {
        res.x = X - H * dX / 2 / dY;
        res.y = Y - H / 2;
        return res;
      }
      return res;
    };
    var calculateEdgeForces = function calculateEdgeForces2(layoutInfo, options) {
      for (var i2 = 0; i2 < layoutInfo.edgeSize; i2++) {
        var edge = layoutInfo.layoutEdges[i2];
        var sourceIx = layoutInfo.idToIndex[edge.sourceId];
        var source = layoutInfo.layoutNodes[sourceIx];
        var targetIx = layoutInfo.idToIndex[edge.targetId];
        var target = layoutInfo.layoutNodes[targetIx];
        var directionX = target.positionX - source.positionX;
        var directionY = target.positionY - source.positionY;
        if (0 === directionX && 0 === directionY) {
          continue;
        }
        var point1 = findClippingPoint(source, directionX, directionY);
        var point2 = findClippingPoint(target, -1 * directionX, -1 * directionY);
        var lx = point2.x - point1.x;
        var ly = point2.y - point1.y;
        var l = Math.sqrt(lx * lx + ly * ly);
        var force = Math.pow(edge.idealLength - l, 2) / edge.elasticity;
        if (0 !== l) {
          var forceX = force * lx / l;
          var forceY = force * ly / l;
        } else {
          var forceX = 0;
          var forceY = 0;
        }
        if (!source.isLocked) {
          source.offsetX += forceX;
          source.offsetY += forceY;
        }
        if (!target.isLocked) {
          target.offsetX -= forceX;
          target.offsetY -= forceY;
        }
      }
    };
    var calculateGravityForces = function calculateGravityForces2(layoutInfo, options) {
      if (options.gravity === 0) {
        return;
      }
      var distThreshold = 1;
      for (var i2 = 0; i2 < layoutInfo.graphSet.length; i2++) {
        var graph = layoutInfo.graphSet[i2];
        var numNodes = graph.length;
        if (0 === i2) {
          var centerX = layoutInfo.clientHeight / 2;
          var centerY = layoutInfo.clientWidth / 2;
        } else {
          var temp = layoutInfo.layoutNodes[layoutInfo.idToIndex[graph[0]]];
          var parent = layoutInfo.layoutNodes[layoutInfo.idToIndex[temp.parentId]];
          var centerX = parent.positionX;
          var centerY = parent.positionY;
        }
        for (var j = 0; j < numNodes; j++) {
          var node = layoutInfo.layoutNodes[layoutInfo.idToIndex[graph[j]]];
          if (node.isLocked) {
            continue;
          }
          var dx = centerX - node.positionX;
          var dy = centerY - node.positionY;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d > distThreshold) {
            var fx = options.gravity * dx / d;
            var fy = options.gravity * dy / d;
            node.offsetX += fx;
            node.offsetY += fy;
          }
        }
      }
    };
    var propagateForces = function propagateForces2(layoutInfo, options) {
      var queue = [];
      var start = 0;
      var end = -1;
      queue.push.apply(queue, layoutInfo.graphSet[0]);
      end += layoutInfo.graphSet[0].length;
      while (start <= end) {
        var nodeId = queue[start++];
        var nodeIndex = layoutInfo.idToIndex[nodeId];
        var node = layoutInfo.layoutNodes[nodeIndex];
        var children = node.children;
        if (0 < children.length && !node.isLocked) {
          var offX = node.offsetX;
          var offY = node.offsetY;
          for (var i2 = 0; i2 < children.length; i2++) {
            var childNode = layoutInfo.layoutNodes[layoutInfo.idToIndex[children[i2]]];
            childNode.offsetX += offX;
            childNode.offsetY += offY;
            queue[++end] = children[i2];
          }
          node.offsetX = 0;
          node.offsetY = 0;
        }
      }
    };
    var updatePositions = function updatePositions2(layoutInfo, options) {
      for (var i2 = 0; i2 < layoutInfo.nodeSize; i2++) {
        var n = layoutInfo.layoutNodes[i2];
        if (0 < n.children.length) {
          n.maxX = void 0;
          n.minX = void 0;
          n.maxY = void 0;
          n.minY = void 0;
        }
      }
      for (var i2 = 0; i2 < layoutInfo.nodeSize; i2++) {
        var n = layoutInfo.layoutNodes[i2];
        if (0 < n.children.length || n.isLocked) {
          continue;
        }
        var tempForce = limitForce(n.offsetX, n.offsetY, layoutInfo.temperature);
        n.positionX += tempForce.x;
        n.positionY += tempForce.y;
        n.offsetX = 0;
        n.offsetY = 0;
        n.minX = n.positionX - n.width;
        n.maxX = n.positionX + n.width;
        n.minY = n.positionY - n.height;
        n.maxY = n.positionY + n.height;
        updateAncestryBoundaries(n, layoutInfo);
      }
      for (var i2 = 0; i2 < layoutInfo.nodeSize; i2++) {
        var n = layoutInfo.layoutNodes[i2];
        if (0 < n.children.length && !n.isLocked) {
          n.positionX = (n.maxX + n.minX) / 2;
          n.positionY = (n.maxY + n.minY) / 2;
          n.width = n.maxX - n.minX;
          n.height = n.maxY - n.minY;
        }
      }
    };
    var limitForce = function limitForce2(forceX, forceY, max2) {
      var force = Math.sqrt(forceX * forceX + forceY * forceY);
      if (force > max2) {
        var res = {
          x: max2 * forceX / force,
          y: max2 * forceY / force
        };
      } else {
        var res = {
          x: forceX,
          y: forceY
        };
      }
      return res;
    };
    var updateAncestryBoundaries = function updateAncestryBoundaries2(node, layoutInfo) {
      var parentId = node.parentId;
      if (null == parentId) {
        return;
      }
      var p2 = layoutInfo.layoutNodes[layoutInfo.idToIndex[parentId]];
      var flag = false;
      if (null == p2.maxX || node.maxX + p2.padRight > p2.maxX) {
        p2.maxX = node.maxX + p2.padRight;
        flag = true;
      }
      if (null == p2.minX || node.minX - p2.padLeft < p2.minX) {
        p2.minX = node.minX - p2.padLeft;
        flag = true;
      }
      if (null == p2.maxY || node.maxY + p2.padBottom > p2.maxY) {
        p2.maxY = node.maxY + p2.padBottom;
        flag = true;
      }
      if (null == p2.minY || node.minY - p2.padTop < p2.minY) {
        p2.minY = node.minY - p2.padTop;
        flag = true;
      }
      if (flag) {
        return updateAncestryBoundaries2(p2, layoutInfo);
      }
      return;
    };
    var separateComponents = function separateComponents2(layoutInfo, options) {
      var nodes = layoutInfo.layoutNodes;
      var components = [];
      for (var i2 = 0; i2 < nodes.length; i2++) {
        var node = nodes[i2];
        var cid = node.cmptId;
        var component = components[cid] = components[cid] || [];
        component.push(node);
      }
      var totalA = 0;
      for (var i2 = 0; i2 < components.length; i2++) {
        var c = components[i2];
        if (!c) {
          continue;
        }
        c.x1 = Infinity;
        c.x2 = -Infinity;
        c.y1 = Infinity;
        c.y2 = -Infinity;
        for (var j = 0; j < c.length; j++) {
          var n = c[j];
          c.x1 = Math.min(c.x1, n.positionX - n.width / 2);
          c.x2 = Math.max(c.x2, n.positionX + n.width / 2);
          c.y1 = Math.min(c.y1, n.positionY - n.height / 2);
          c.y2 = Math.max(c.y2, n.positionY + n.height / 2);
        }
        c.w = c.x2 - c.x1;
        c.h = c.y2 - c.y1;
        totalA += c.w * c.h;
      }
      components.sort(function(c1, c2) {
        return c2.w * c2.h - c1.w * c1.h;
      });
      var x = 0;
      var y = 0;
      var usedW = 0;
      var rowH = 0;
      var maxRowW = Math.sqrt(totalA) * layoutInfo.clientWidth / layoutInfo.clientHeight;
      for (var i2 = 0; i2 < components.length; i2++) {
        var c = components[i2];
        if (!c) {
          continue;
        }
        for (var j = 0; j < c.length; j++) {
          var n = c[j];
          if (!n.isLocked) {
            n.positionX += x - c.x1;
            n.positionY += y - c.y1;
          }
        }
        x += c.w + options.componentSpacing;
        usedW += c.w + options.componentSpacing;
        rowH = Math.max(rowH, c.h);
        if (usedW > maxRowW) {
          y += rowH + options.componentSpacing;
          x = 0;
          usedW = 0;
          rowH = 0;
        }
      }
    };
    var defaults$3 = {
      fit: true,
      // whether to fit the viewport to the graph
      padding: 30,
      // padding used on fit
      boundingBox: void 0,
      // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true,
      // prevents node overlap, may overflow boundingBox if not enough space
      avoidOverlapPadding: 10,
      // extra spacing around nodes when avoidOverlap: true
      nodeDimensionsIncludeLabels: false,
      // Excludes the label when calculating node bounding boxes for the layout algorithm
      spacingFactor: void 0,
      // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      condense: false,
      // uses all available space on false, uses minimal space on true
      rows: void 0,
      // force num of rows in the grid
      cols: void 0,
      // force num of columns in the grid
      position: function position2(node) {
      },
      // returns { row, col } for element
      sort: void 0,
      // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false,
      // whether to transition the node positions
      animationDuration: 500,
      // duration of animation in ms if enabled
      animationEasing: void 0,
      // easing of animation if enabled
      animateFilter: function animateFilter(node, i2) {
        return true;
      },
      // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: void 0,
      // callback on layoutready
      stop: void 0,
      // callback on layoutstop
      transform: function transform(node, position2) {
        return position2;
      }
      // transform a given node position. Useful for changing flow direction in discrete layouts 
    };
    function GridLayout(options) {
      this.options = extend({}, defaults$3, options);
    }
    GridLayout.prototype.run = function() {
      var params = this.options;
      var options = params;
      var cy = params.cy;
      var eles = options.eles;
      var nodes = eles.nodes().not(":parent");
      if (options.sort) {
        nodes = nodes.sort(options.sort);
      }
      var bb = makeBoundingBox(options.boundingBox ? options.boundingBox : {
        x1: 0,
        y1: 0,
        w: cy.width(),
        h: cy.height()
      });
      if (bb.h === 0 || bb.w === 0) {
        eles.nodes().layoutPositions(this, options, function(ele) {
          return {
            x: bb.x1,
            y: bb.y1
          };
        });
      } else {
        var cells = nodes.size();
        var splits = Math.sqrt(cells * bb.h / bb.w);
        var rows = Math.round(splits);
        var cols = Math.round(bb.w / bb.h * splits);
        var small = function small2(val) {
          if (val == null) {
            return Math.min(rows, cols);
          } else {
            var min2 = Math.min(rows, cols);
            if (min2 == rows) {
              rows = val;
            } else {
              cols = val;
            }
          }
        };
        var large = function large2(val) {
          if (val == null) {
            return Math.max(rows, cols);
          } else {
            var max2 = Math.max(rows, cols);
            if (max2 == rows) {
              rows = val;
            } else {
              cols = val;
            }
          }
        };
        var oRows = options.rows;
        var oCols = options.cols != null ? options.cols : options.columns;
        if (oRows != null && oCols != null) {
          rows = oRows;
          cols = oCols;
        } else if (oRows != null && oCols == null) {
          rows = oRows;
          cols = Math.ceil(cells / rows);
        } else if (oRows == null && oCols != null) {
          cols = oCols;
          rows = Math.ceil(cells / cols);
        } else if (cols * rows > cells) {
          var sm = small();
          var lg = large();
          if ((sm - 1) * lg >= cells) {
            small(sm - 1);
          } else if ((lg - 1) * sm >= cells) {
            large(lg - 1);
          }
        } else {
          while (cols * rows < cells) {
            var _sm = small();
            var _lg = large();
            if ((_lg + 1) * _sm >= cells) {
              large(_lg + 1);
            } else {
              small(_sm + 1);
            }
          }
        }
        var cellWidth = bb.w / cols;
        var cellHeight = bb.h / rows;
        if (options.condense) {
          cellWidth = 0;
          cellHeight = 0;
        }
        if (options.avoidOverlap) {
          for (var i2 = 0; i2 < nodes.length; i2++) {
            var node = nodes[i2];
            var pos = node._private.position;
            if (pos.x == null || pos.y == null) {
              pos.x = 0;
              pos.y = 0;
            }
            var nbb = node.layoutDimensions(options);
            var p2 = options.avoidOverlapPadding;
            var w = nbb.w + p2;
            var h = nbb.h + p2;
            cellWidth = Math.max(cellWidth, w);
            cellHeight = Math.max(cellHeight, h);
          }
        }
        var cellUsed = {};
        var used = function used2(row2, col2) {
          return cellUsed["c-" + row2 + "-" + col2] ? true : false;
        };
        var use = function use2(row2, col2) {
          cellUsed["c-" + row2 + "-" + col2] = true;
        };
        var row = 0;
        var col = 0;
        var moveToNextCell = function moveToNextCell2() {
          col++;
          if (col >= cols) {
            col = 0;
            row++;
          }
        };
        var id2manPos = {};
        for (var _i = 0; _i < nodes.length; _i++) {
          var _node = nodes[_i];
          var rcPos = options.position(_node);
          if (rcPos && (rcPos.row !== void 0 || rcPos.col !== void 0)) {
            var _pos = {
              row: rcPos.row,
              col: rcPos.col
            };
            if (_pos.col === void 0) {
              _pos.col = 0;
              while (used(_pos.row, _pos.col)) {
                _pos.col++;
              }
            } else if (_pos.row === void 0) {
              _pos.row = 0;
              while (used(_pos.row, _pos.col)) {
                _pos.row++;
              }
            }
            id2manPos[_node.id()] = _pos;
            use(_pos.row, _pos.col);
          }
        }
        var getPos = function getPos2(element2, i3) {
          var x, y;
          if (element2.locked() || element2.isParent()) {
            return false;
          }
          var rcPos2 = id2manPos[element2.id()];
          if (rcPos2) {
            x = rcPos2.col * cellWidth + cellWidth / 2 + bb.x1;
            y = rcPos2.row * cellHeight + cellHeight / 2 + bb.y1;
          } else {
            while (used(row, col)) {
              moveToNextCell();
            }
            x = col * cellWidth + cellWidth / 2 + bb.x1;
            y = row * cellHeight + cellHeight / 2 + bb.y1;
            use(row, col);
            moveToNextCell();
          }
          return {
            x,
            y
          };
        };
        nodes.layoutPositions(this, options, getPos);
      }
      return this;
    };
    var defaults$2 = {
      ready: function ready() {
      },
      // on layoutready
      stop: function stop() {
      }
      // on layoutstop
    };
    function NullLayout(options) {
      this.options = extend({}, defaults$2, options);
    }
    NullLayout.prototype.run = function() {
      var options = this.options;
      var eles = options.eles;
      var layout2 = this;
      options.cy;
      layout2.emit("layoutstart");
      eles.nodes().positions(function() {
        return {
          x: 0,
          y: 0
        };
      });
      layout2.one("layoutready", options.ready);
      layout2.emit("layoutready");
      layout2.one("layoutstop", options.stop);
      layout2.emit("layoutstop");
      return this;
    };
    NullLayout.prototype.stop = function() {
      return this;
    };
    var defaults$1 = {
      positions: void 0,
      // map of (node id) => (position obj); or function(node){ return somPos; }
      zoom: void 0,
      // the zoom level to set (prob want fit = false if set)
      pan: void 0,
      // the pan level to set (prob want fit = false if set)
      fit: true,
      // whether to fit to viewport
      padding: 30,
      // padding on fit
      spacingFactor: void 0,
      // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      animate: false,
      // whether to transition the node positions
      animationDuration: 500,
      // duration of animation in ms if enabled
      animationEasing: void 0,
      // easing of animation if enabled
      animateFilter: function animateFilter(node, i2) {
        return true;
      },
      // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: void 0,
      // callback on layoutready
      stop: void 0,
      // callback on layoutstop
      transform: function transform(node, position2) {
        return position2;
      }
      // transform a given node position. Useful for changing flow direction in discrete layouts
    };
    function PresetLayout(options) {
      this.options = extend({}, defaults$1, options);
    }
    PresetLayout.prototype.run = function() {
      var options = this.options;
      var eles = options.eles;
      var nodes = eles.nodes();
      var posIsFn = fn$6(options.positions);
      function getPosition(node) {
        if (options.positions == null) {
          return copyPosition(node.position());
        }
        if (posIsFn) {
          return options.positions(node);
        }
        var pos = options.positions[node._private.data.id];
        if (pos == null) {
          return null;
        }
        return pos;
      }
      nodes.layoutPositions(this, options, function(node, i2) {
        var position2 = getPosition(node);
        if (node.locked() || position2 == null) {
          return false;
        }
        return position2;
      });
      return this;
    };
    var defaults = {
      fit: true,
      // whether to fit to viewport
      padding: 30,
      // fit padding
      boundingBox: void 0,
      // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      animate: false,
      // whether to transition the node positions
      animationDuration: 500,
      // duration of animation in ms if enabled
      animationEasing: void 0,
      // easing of animation if enabled
      animateFilter: function animateFilter(node, i2) {
        return true;
      },
      // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: void 0,
      // callback on layoutready
      stop: void 0,
      // callback on layoutstop
      transform: function transform(node, position2) {
        return position2;
      }
      // transform a given node position. Useful for changing flow direction in discrete layouts 
    };
    function RandomLayout(options) {
      this.options = extend({}, defaults, options);
    }
    RandomLayout.prototype.run = function() {
      var options = this.options;
      var cy = options.cy;
      var eles = options.eles;
      var bb = makeBoundingBox(options.boundingBox ? options.boundingBox : {
        x1: 0,
        y1: 0,
        w: cy.width(),
        h: cy.height()
      });
      var getPos = function getPos2(node, i2) {
        return {
          x: bb.x1 + Math.round(Math.random() * bb.w),
          y: bb.y1 + Math.round(Math.random() * bb.h)
        };
      };
      eles.nodes().layoutPositions(this, options, getPos);
      return this;
    };
    var layout = [{
      name: "breadthfirst",
      impl: BreadthFirstLayout
    }, {
      name: "circle",
      impl: CircleLayout
    }, {
      name: "concentric",
      impl: ConcentricLayout
    }, {
      name: "cose",
      impl: CoseLayout
    }, {
      name: "grid",
      impl: GridLayout
    }, {
      name: "null",
      impl: NullLayout
    }, {
      name: "preset",
      impl: PresetLayout
    }, {
      name: "random",
      impl: RandomLayout
    }];
    function NullRenderer(options) {
      this.options = options;
      this.notifications = 0;
    }
    var noop = function noop2() {
    };
    var throwImgErr = function throwImgErr2() {
      throw new Error("A headless instance can not render images");
    };
    NullRenderer.prototype = {
      recalculateRenderedStyle: noop,
      notify: function notify() {
        this.notifications++;
      },
      init: noop,
      isHeadless: function isHeadless() {
        return true;
      },
      png: throwImgErr,
      jpg: throwImgErr
    };
    var BRp$f = {};
    BRp$f.arrowShapeWidth = 0.3;
    BRp$f.registerArrowShapes = function() {
      var arrowShapes = this.arrowShapes = {};
      var renderer2 = this;
      var bbCollide = function bbCollide2(x, y, size, angle, translation, edgeWidth, padding) {
        var x1 = translation.x - size / 2 - padding;
        var x2 = translation.x + size / 2 + padding;
        var y1 = translation.y - size / 2 - padding;
        var y2 = translation.y + size / 2 + padding;
        var inside = x1 <= x && x <= x2 && y1 <= y && y <= y2;
        return inside;
      };
      var transform = function transform2(x, y, size, angle, translation) {
        var xRotated = x * Math.cos(angle) - y * Math.sin(angle);
        var yRotated = x * Math.sin(angle) + y * Math.cos(angle);
        var xScaled = xRotated * size;
        var yScaled = yRotated * size;
        var xTranslated = xScaled + translation.x;
        var yTranslated = yScaled + translation.y;
        return {
          x: xTranslated,
          y: yTranslated
        };
      };
      var transformPoints = function transformPoints2(pts2, size, angle, translation) {
        var retPts = [];
        for (var i2 = 0; i2 < pts2.length; i2 += 2) {
          var x = pts2[i2];
          var y = pts2[i2 + 1];
          retPts.push(transform(x, y, size, angle, translation));
        }
        return retPts;
      };
      var pointsToArr = function pointsToArr2(pts2) {
        var ret = [];
        for (var i2 = 0; i2 < pts2.length; i2++) {
          var p2 = pts2[i2];
          ret.push(p2.x, p2.y);
        }
        return ret;
      };
      var standardGap = function standardGap2(edge) {
        return edge.pstyle("width").pfValue * edge.pstyle("arrow-scale").pfValue * 2;
      };
      var defineArrowShape = function defineArrowShape2(name, defn) {
        if (string(defn)) {
          defn = arrowShapes[defn];
        }
        arrowShapes[name] = extend({
          name,
          points: [-0.15, -0.3, 0.15, -0.3, 0.15, 0.3, -0.15, 0.3],
          collide: function collide(x, y, size, angle, translation, padding) {
            var points = pointsToArr(transformPoints(this.points, size + 2 * padding, angle, translation));
            var inside = pointInsidePolygonPoints(x, y, points);
            return inside;
          },
          roughCollide: bbCollide,
          draw: function draw(context, size, angle, translation) {
            var points = transformPoints(this.points, size, angle, translation);
            renderer2.arrowShapeImpl("polygon")(context, points);
          },
          spacing: function spacing(edge) {
            return 0;
          },
          gap: standardGap
        }, defn);
      };
      defineArrowShape("none", {
        collide: falsify,
        roughCollide: falsify,
        draw: noop$1,
        spacing: zeroify,
        gap: zeroify
      });
      defineArrowShape("triangle", {
        points: [-0.15, -0.3, 0, 0, 0.15, -0.3]
      });
      defineArrowShape("arrow", "triangle");
      defineArrowShape("triangle-backcurve", {
        points: arrowShapes["triangle"].points,
        controlPoint: [0, -0.15],
        roughCollide: bbCollide,
        draw: function draw(context, size, angle, translation, edgeWidth) {
          var ptsTrans = transformPoints(this.points, size, angle, translation);
          var ctrlPt = this.controlPoint;
          var ctrlPtTrans = transform(ctrlPt[0], ctrlPt[1], size, angle, translation);
          renderer2.arrowShapeImpl(this.name)(context, ptsTrans, ctrlPtTrans);
        },
        gap: function gap(edge) {
          return standardGap(edge) * 0.8;
        }
      });
      defineArrowShape("triangle-tee", {
        points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0],
        pointsTee: [-0.15, -0.4, -0.15, -0.5, 0.15, -0.5, 0.15, -0.4],
        collide: function collide(x, y, size, angle, translation, edgeWidth, padding) {
          var triPts = pointsToArr(transformPoints(this.points, size + 2 * padding, angle, translation));
          var teePts = pointsToArr(transformPoints(this.pointsTee, size + 2 * padding, angle, translation));
          var inside = pointInsidePolygonPoints(x, y, triPts) || pointInsidePolygonPoints(x, y, teePts);
          return inside;
        },
        draw: function draw(context, size, angle, translation, edgeWidth) {
          var triPts = transformPoints(this.points, size, angle, translation);
          var teePts = transformPoints(this.pointsTee, size, angle, translation);
          renderer2.arrowShapeImpl(this.name)(context, triPts, teePts);
        }
      });
      defineArrowShape("circle-triangle", {
        radius: 0.15,
        pointsTr: [0, -0.15, 0.15, -0.45, -0.15, -0.45, 0, -0.15],
        collide: function collide(x, y, size, angle, translation, edgeWidth, padding) {
          var t = translation;
          var circleInside = Math.pow(t.x - x, 2) + Math.pow(t.y - y, 2) <= Math.pow((size + 2 * padding) * this.radius, 2);
          var triPts = pointsToArr(transformPoints(this.points, size + 2 * padding, angle, translation));
          return pointInsidePolygonPoints(x, y, triPts) || circleInside;
        },
        draw: function draw(context, size, angle, translation, edgeWidth) {
          var triPts = transformPoints(this.pointsTr, size, angle, translation);
          renderer2.arrowShapeImpl(this.name)(context, triPts, translation.x, translation.y, this.radius * size);
        },
        spacing: function spacing(edge) {
          return renderer2.getArrowWidth(edge.pstyle("width").pfValue, edge.pstyle("arrow-scale").value) * this.radius;
        }
      });
      defineArrowShape("triangle-cross", {
        points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0],
        baseCrossLinePts: [
          -0.15,
          -0.4,
          // first half of the rectangle
          -0.15,
          -0.4,
          0.15,
          -0.4,
          // second half of the rectangle
          0.15,
          -0.4
        ],
        crossLinePts: function crossLinePts(size, edgeWidth) {
          var p2 = this.baseCrossLinePts.slice();
          var shiftFactor = edgeWidth / size;
          var y0 = 3;
          var y1 = 5;
          p2[y0] = p2[y0] - shiftFactor;
          p2[y1] = p2[y1] - shiftFactor;
          return p2;
        },
        collide: function collide(x, y, size, angle, translation, edgeWidth, padding) {
          var triPts = pointsToArr(transformPoints(this.points, size + 2 * padding, angle, translation));
          var teePts = pointsToArr(transformPoints(this.crossLinePts(size, edgeWidth), size + 2 * padding, angle, translation));
          var inside = pointInsidePolygonPoints(x, y, triPts) || pointInsidePolygonPoints(x, y, teePts);
          return inside;
        },
        draw: function draw(context, size, angle, translation, edgeWidth) {
          var triPts = transformPoints(this.points, size, angle, translation);
          var crossLinePts = transformPoints(this.crossLinePts(size, edgeWidth), size, angle, translation);
          renderer2.arrowShapeImpl(this.name)(context, triPts, crossLinePts);
        }
      });
      defineArrowShape("vee", {
        points: [-0.15, -0.3, 0, 0, 0.15, -0.3, 0, -0.15],
        gap: function gap(edge) {
          return standardGap(edge) * 0.525;
        }
      });
      defineArrowShape("circle", {
        radius: 0.15,
        collide: function collide(x, y, size, angle, translation, edgeWidth, padding) {
          var t = translation;
          var inside = Math.pow(t.x - x, 2) + Math.pow(t.y - y, 2) <= Math.pow((size + 2 * padding) * this.radius, 2);
          return inside;
        },
        draw: function draw(context, size, angle, translation, edgeWidth) {
          renderer2.arrowShapeImpl(this.name)(context, translation.x, translation.y, this.radius * size);
        },
        spacing: function spacing(edge) {
          return renderer2.getArrowWidth(edge.pstyle("width").pfValue, edge.pstyle("arrow-scale").value) * this.radius;
        }
      });
      defineArrowShape("tee", {
        points: [-0.15, 0, -0.15, -0.1, 0.15, -0.1, 0.15, 0],
        spacing: function spacing(edge) {
          return 1;
        },
        gap: function gap(edge) {
          return 1;
        }
      });
      defineArrowShape("square", {
        points: [-0.15, 0, 0.15, 0, 0.15, -0.3, -0.15, -0.3]
      });
      defineArrowShape("diamond", {
        points: [-0.15, -0.15, 0, -0.3, 0.15, -0.15, 0, 0],
        gap: function gap(edge) {
          return edge.pstyle("width").pfValue * edge.pstyle("arrow-scale").value;
        }
      });
      defineArrowShape("chevron", {
        points: [0, 0, -0.15, -0.15, -0.1, -0.2, 0, -0.1, 0.1, -0.2, 0.15, -0.15],
        gap: function gap(edge) {
          return 0.95 * edge.pstyle("width").pfValue * edge.pstyle("arrow-scale").value;
        }
      });
    };
    var BRp$e = {};
    BRp$e.projectIntoViewport = function(clientX, clientY) {
      var cy = this.cy;
      var offsets = this.findContainerClientCoords();
      var offsetLeft = offsets[0];
      var offsetTop = offsets[1];
      var scale = offsets[4];
      var pan = cy.pan();
      var zoom = cy.zoom();
      var x = ((clientX - offsetLeft) / scale - pan.x) / zoom;
      var y = ((clientY - offsetTop) / scale - pan.y) / zoom;
      return [x, y];
    };
    BRp$e.findContainerClientCoords = function() {
      if (this.containerBB) {
        return this.containerBB;
      }
      var container = this.container;
      var rect = container.getBoundingClientRect();
      var style = this.cy.window().getComputedStyle(container);
      var styleValue = function styleValue2(name) {
        return parseFloat(style.getPropertyValue(name));
      };
      var padding = {
        left: styleValue("padding-left"),
        right: styleValue("padding-right"),
        top: styleValue("padding-top"),
        bottom: styleValue("padding-bottom")
      };
      var border = {
        left: styleValue("border-left-width"),
        right: styleValue("border-right-width"),
        top: styleValue("border-top-width"),
        bottom: styleValue("border-bottom-width")
      };
      var clientWidth = container.clientWidth;
      var clientHeight = container.clientHeight;
      var paddingHor = padding.left + padding.right;
      var paddingVer = padding.top + padding.bottom;
      var borderHor = border.left + border.right;
      var scale = rect.width / (clientWidth + borderHor);
      var unscaledW = clientWidth - paddingHor;
      var unscaledH = clientHeight - paddingVer;
      var left = rect.left + padding.left + border.left;
      var top = rect.top + padding.top + border.top;
      return this.containerBB = [left, top, unscaledW, unscaledH, scale];
    };
    BRp$e.invalidateContainerClientCoordsCache = function() {
      this.containerBB = null;
    };
    BRp$e.findNearestElement = function(x, y, interactiveElementsOnly, isTouch) {
      return this.findNearestElements(x, y, interactiveElementsOnly, isTouch)[0];
    };
    BRp$e.findNearestElements = function(x, y, interactiveElementsOnly, isTouch) {
      var self2 = this;
      var r = this;
      var eles = r.getCachedZSortedEles();
      var near = [];
      var zoom = r.cy.zoom();
      var hasCompounds = r.cy.hasCompoundNodes();
      var edgeThreshold = (isTouch ? 24 : 8) / zoom;
      var nodeThreshold = (isTouch ? 8 : 2) / zoom;
      var labelThreshold = (isTouch ? 8 : 2) / zoom;
      var minSqDist = Infinity;
      var nearEdge;
      var nearNode;
      if (interactiveElementsOnly) {
        eles = eles.interactive;
      }
      function addEle(ele2, sqDist) {
        if (ele2.isNode()) {
          if (nearNode) {
            return;
          } else {
            nearNode = ele2;
            near.push(ele2);
          }
        }
        if (ele2.isEdge() && (sqDist == null || sqDist < minSqDist)) {
          if (nearEdge) {
            if (nearEdge.pstyle("z-compound-depth").value === ele2.pstyle("z-compound-depth").value && nearEdge.pstyle("z-compound-depth").value === ele2.pstyle("z-compound-depth").value) {
              for (var i3 = 0; i3 < near.length; i3++) {
                if (near[i3].isEdge()) {
                  near[i3] = ele2;
                  nearEdge = ele2;
                  minSqDist = sqDist != null ? sqDist : minSqDist;
                  break;
                }
              }
            }
          } else {
            near.push(ele2);
            nearEdge = ele2;
            minSqDist = sqDist != null ? sqDist : minSqDist;
          }
        }
      }
      function checkNode(node) {
        var width = node.outerWidth() + 2 * nodeThreshold;
        var height = node.outerHeight() + 2 * nodeThreshold;
        var hw = width / 2;
        var hh = height / 2;
        var pos = node.position();
        if (pos.x - hw <= x && x <= pos.x + hw && pos.y - hh <= y && y <= pos.y + hh) {
          var shape = r.nodeShapes[self2.getNodeShape(node)];
          if (shape.checkPoint(x, y, 0, width, height, pos.x, pos.y)) {
            addEle(node, 0);
            return true;
          }
        }
      }
      function checkEdge(edge) {
        var _p = edge._private;
        var rs = _p.rscratch;
        var styleWidth = edge.pstyle("width").pfValue;
        var scale = edge.pstyle("arrow-scale").value;
        var width = styleWidth / 2 + edgeThreshold;
        var widthSq = width * width;
        var width2 = width * 2;
        var src = _p.source;
        var tgt = _p.target;
        var sqDist;
        if (rs.edgeType === "segments" || rs.edgeType === "straight" || rs.edgeType === "haystack") {
          var pts2 = rs.allpts;
          for (var i3 = 0; i3 + 3 < pts2.length; i3 += 2) {
            if (inLineVicinity(x, y, pts2[i3], pts2[i3 + 1], pts2[i3 + 2], pts2[i3 + 3], width2) && widthSq > (sqDist = sqdistToFiniteLine(x, y, pts2[i3], pts2[i3 + 1], pts2[i3 + 2], pts2[i3 + 3]))) {
              addEle(edge, sqDist);
              return true;
            }
          }
        } else if (rs.edgeType === "bezier" || rs.edgeType === "multibezier" || rs.edgeType === "self" || rs.edgeType === "compound") {
          var pts2 = rs.allpts;
          for (var i3 = 0; i3 + 5 < rs.allpts.length; i3 += 4) {
            if (inBezierVicinity(x, y, pts2[i3], pts2[i3 + 1], pts2[i3 + 2], pts2[i3 + 3], pts2[i3 + 4], pts2[i3 + 5], width2) && widthSq > (sqDist = sqdistToQuadraticBezier(x, y, pts2[i3], pts2[i3 + 1], pts2[i3 + 2], pts2[i3 + 3], pts2[i3 + 4], pts2[i3 + 5]))) {
              addEle(edge, sqDist);
              return true;
            }
          }
        }
        var src = src || _p.source;
        var tgt = tgt || _p.target;
        var arSize = self2.getArrowWidth(styleWidth, scale);
        var arrows = [{
          name: "source",
          x: rs.arrowStartX,
          y: rs.arrowStartY,
          angle: rs.srcArrowAngle
        }, {
          name: "target",
          x: rs.arrowEndX,
          y: rs.arrowEndY,
          angle: rs.tgtArrowAngle
        }, {
          name: "mid-source",
          x: rs.midX,
          y: rs.midY,
          angle: rs.midsrcArrowAngle
        }, {
          name: "mid-target",
          x: rs.midX,
          y: rs.midY,
          angle: rs.midtgtArrowAngle
        }];
        for (var i3 = 0; i3 < arrows.length; i3++) {
          var ar = arrows[i3];
          var shape = r.arrowShapes[edge.pstyle(ar.name + "-arrow-shape").value];
          var edgeWidth = edge.pstyle("width").pfValue;
          if (shape.roughCollide(x, y, arSize, ar.angle, {
            x: ar.x,
            y: ar.y
          }, edgeWidth, edgeThreshold) && shape.collide(x, y, arSize, ar.angle, {
            x: ar.x,
            y: ar.y
          }, edgeWidth, edgeThreshold)) {
            addEle(edge);
            return true;
          }
        }
        if (hasCompounds && near.length > 0) {
          checkNode(src);
          checkNode(tgt);
        }
      }
      function preprop(obj, name, pre) {
        return getPrefixedProperty(obj, name, pre);
      }
      function checkLabel(ele2, prefix) {
        var _p = ele2._private;
        var th = labelThreshold;
        var prefixDash;
        if (prefix) {
          prefixDash = prefix + "-";
        } else {
          prefixDash = "";
        }
        ele2.boundingBox();
        var bb = _p.labelBounds[prefix || "main"];
        var text = ele2.pstyle(prefixDash + "label").value;
        var eventsEnabled = ele2.pstyle("text-events").strValue === "yes";
        if (!eventsEnabled || !text) {
          return;
        }
        var lx = preprop(_p.rscratch, "labelX", prefix);
        var ly = preprop(_p.rscratch, "labelY", prefix);
        var theta = preprop(_p.rscratch, "labelAngle", prefix);
        var ox = ele2.pstyle(prefixDash + "text-margin-x").pfValue;
        var oy = ele2.pstyle(prefixDash + "text-margin-y").pfValue;
        var lx1 = bb.x1 - th - ox;
        var lx2 = bb.x2 + th - ox;
        var ly1 = bb.y1 - th - oy;
        var ly2 = bb.y2 + th - oy;
        if (theta) {
          var cos2 = Math.cos(theta);
          var sin2 = Math.sin(theta);
          var rotate = function rotate2(x2, y2) {
            x2 = x2 - lx;
            y2 = y2 - ly;
            return {
              x: x2 * cos2 - y2 * sin2 + lx,
              y: x2 * sin2 + y2 * cos2 + ly
            };
          };
          var px1y1 = rotate(lx1, ly1);
          var px1y2 = rotate(lx1, ly2);
          var px2y1 = rotate(lx2, ly1);
          var px2y2 = rotate(lx2, ly2);
          var points = [
            // with the margin added after the rotation is applied
            px1y1.x + ox,
            px1y1.y + oy,
            px2y1.x + ox,
            px2y1.y + oy,
            px2y2.x + ox,
            px2y2.y + oy,
            px1y2.x + ox,
            px1y2.y + oy
          ];
          if (pointInsidePolygonPoints(x, y, points)) {
            addEle(ele2);
            return true;
          }
        } else {
          if (inBoundingBox(bb, x, y)) {
            addEle(ele2);
            return true;
          }
        }
      }
      for (var i2 = eles.length - 1; i2 >= 0; i2--) {
        var ele = eles[i2];
        if (ele.isNode()) {
          checkNode(ele) || checkLabel(ele);
        } else {
          checkEdge(ele) || checkLabel(ele) || checkLabel(ele, "source") || checkLabel(ele, "target");
        }
      }
      return near;
    };
    BRp$e.getAllInBox = function(x1, y1, x2, y2) {
      var eles = this.getCachedZSortedEles().interactive;
      var box = [];
      var x1c = Math.min(x1, x2);
      var x2c = Math.max(x1, x2);
      var y1c = Math.min(y1, y2);
      var y2c = Math.max(y1, y2);
      x1 = x1c;
      x2 = x2c;
      y1 = y1c;
      y2 = y2c;
      var boxBb = makeBoundingBox({
        x1,
        y1,
        x2,
        y2
      });
      for (var e = 0; e < eles.length; e++) {
        var ele = eles[e];
        if (ele.isNode()) {
          var node = ele;
          var nodeBb = node.boundingBox({
            includeNodes: true,
            includeEdges: false,
            includeLabels: false
          });
          if (boundingBoxesIntersect(boxBb, nodeBb) && !boundingBoxInBoundingBox(nodeBb, boxBb)) {
            box.push(node);
          }
        } else {
          var edge = ele;
          var _p = edge._private;
          var rs = _p.rscratch;
          if (rs.startX != null && rs.startY != null && !inBoundingBox(boxBb, rs.startX, rs.startY)) {
            continue;
          }
          if (rs.endX != null && rs.endY != null && !inBoundingBox(boxBb, rs.endX, rs.endY)) {
            continue;
          }
          if (rs.edgeType === "bezier" || rs.edgeType === "multibezier" || rs.edgeType === "self" || rs.edgeType === "compound" || rs.edgeType === "segments" || rs.edgeType === "haystack") {
            var pts2 = _p.rstyle.bezierPts || _p.rstyle.linePts || _p.rstyle.haystackPts;
            var allInside = true;
            for (var i2 = 0; i2 < pts2.length; i2++) {
              if (!pointInBoundingBox(boxBb, pts2[i2])) {
                allInside = false;
                break;
              }
            }
            if (allInside) {
              box.push(edge);
            }
          } else if (rs.edgeType === "haystack" || rs.edgeType === "straight") {
            box.push(edge);
          }
        }
      }
      return box;
    };
    var BRp$d = {};
    BRp$d.calculateArrowAngles = function(edge) {
      var rs = edge._private.rscratch;
      var isHaystack = rs.edgeType === "haystack";
      var isBezier = rs.edgeType === "bezier";
      var isMultibezier = rs.edgeType === "multibezier";
      var isSegments = rs.edgeType === "segments";
      var isCompound = rs.edgeType === "compound";
      var isSelf = rs.edgeType === "self";
      var dispX, dispY;
      var startX, startY, endX, endY, midX, midY;
      if (isHaystack) {
        startX = rs.haystackPts[0];
        startY = rs.haystackPts[1];
        endX = rs.haystackPts[2];
        endY = rs.haystackPts[3];
      } else {
        startX = rs.arrowStartX;
        startY = rs.arrowStartY;
        endX = rs.arrowEndX;
        endY = rs.arrowEndY;
      }
      midX = rs.midX;
      midY = rs.midY;
      if (isSegments) {
        dispX = startX - rs.segpts[0];
        dispY = startY - rs.segpts[1];
      } else if (isMultibezier || isCompound || isSelf || isBezier) {
        var pts2 = rs.allpts;
        var bX = qbezierAt(pts2[0], pts2[2], pts2[4], 0.1);
        var bY = qbezierAt(pts2[1], pts2[3], pts2[5], 0.1);
        dispX = startX - bX;
        dispY = startY - bY;
      } else {
        dispX = startX - midX;
        dispY = startY - midY;
      }
      rs.srcArrowAngle = getAngleFromDisp(dispX, dispY);
      var midX = rs.midX;
      var midY = rs.midY;
      if (isHaystack) {
        midX = (startX + endX) / 2;
        midY = (startY + endY) / 2;
      }
      dispX = endX - startX;
      dispY = endY - startY;
      if (isSegments) {
        var pts2 = rs.allpts;
        if (pts2.length / 2 % 2 === 0) {
          var i2 = pts2.length / 2;
          var i1 = i2 - 2;
          dispX = pts2[i2] - pts2[i1];
          dispY = pts2[i2 + 1] - pts2[i1 + 1];
        } else {
          var i2 = pts2.length / 2 - 1;
          var i1 = i2 - 2;
          var i3 = i2 + 2;
          dispX = pts2[i2] - pts2[i1];
          dispY = pts2[i2 + 1] - pts2[i1 + 1];
        }
      } else if (isMultibezier || isCompound || isSelf) {
        var pts2 = rs.allpts;
        var cpts = rs.ctrlpts;
        var bp0x, bp0y;
        var bp1x, bp1y;
        if (cpts.length / 2 % 2 === 0) {
          var p0 = pts2.length / 2 - 1;
          var ic = p0 + 2;
          var p1 = ic + 2;
          bp0x = qbezierAt(pts2[p0], pts2[ic], pts2[p1], 0);
          bp0y = qbezierAt(pts2[p0 + 1], pts2[ic + 1], pts2[p1 + 1], 0);
          bp1x = qbezierAt(pts2[p0], pts2[ic], pts2[p1], 1e-4);
          bp1y = qbezierAt(pts2[p0 + 1], pts2[ic + 1], pts2[p1 + 1], 1e-4);
        } else {
          var ic = pts2.length / 2 - 1;
          var p0 = ic - 2;
          var p1 = ic + 2;
          bp0x = qbezierAt(pts2[p0], pts2[ic], pts2[p1], 0.4999);
          bp0y = qbezierAt(pts2[p0 + 1], pts2[ic + 1], pts2[p1 + 1], 0.4999);
          bp1x = qbezierAt(pts2[p0], pts2[ic], pts2[p1], 0.5);
          bp1y = qbezierAt(pts2[p0 + 1], pts2[ic + 1], pts2[p1 + 1], 0.5);
        }
        dispX = bp1x - bp0x;
        dispY = bp1y - bp0y;
      }
      rs.midtgtArrowAngle = getAngleFromDisp(dispX, dispY);
      rs.midDispX = dispX;
      rs.midDispY = dispY;
      dispX *= -1;
      dispY *= -1;
      if (isSegments) {
        var pts2 = rs.allpts;
        if (pts2.length / 2 % 2 === 0) ;
        else {
          var i2 = pts2.length / 2 - 1;
          var i3 = i2 + 2;
          dispX = -(pts2[i3] - pts2[i2]);
          dispY = -(pts2[i3 + 1] - pts2[i2 + 1]);
        }
      }
      rs.midsrcArrowAngle = getAngleFromDisp(dispX, dispY);
      if (isSegments) {
        dispX = endX - rs.segpts[rs.segpts.length - 2];
        dispY = endY - rs.segpts[rs.segpts.length - 1];
      } else if (isMultibezier || isCompound || isSelf || isBezier) {
        var pts2 = rs.allpts;
        var l = pts2.length;
        var bX = qbezierAt(pts2[l - 6], pts2[l - 4], pts2[l - 2], 0.9);
        var bY = qbezierAt(pts2[l - 5], pts2[l - 3], pts2[l - 1], 0.9);
        dispX = endX - bX;
        dispY = endY - bY;
      } else {
        dispX = endX - midX;
        dispY = endY - midY;
      }
      rs.tgtArrowAngle = getAngleFromDisp(dispX, dispY);
    };
    BRp$d.getArrowWidth = BRp$d.getArrowHeight = function(edgeWidth, scale) {
      var cache2 = this.arrowWidthCache = this.arrowWidthCache || {};
      var cachedVal = cache2[edgeWidth + ", " + scale];
      if (cachedVal) {
        return cachedVal;
      }
      cachedVal = Math.max(Math.pow(edgeWidth * 13.37, 0.9), 29) * scale;
      cache2[edgeWidth + ", " + scale] = cachedVal;
      return cachedVal;
    };
    var BRp$c = {};
    BRp$c.findMidptPtsEtc = function(edge, pairInfo) {
      var posPts = pairInfo.posPts, intersectionPts = pairInfo.intersectionPts, vectorNormInverse = pairInfo.vectorNormInverse;
      var midptPts;
      var srcManEndpt = edge.pstyle("source-endpoint");
      var tgtManEndpt = edge.pstyle("target-endpoint");
      var haveManualEndPts = srcManEndpt.units != null && tgtManEndpt.units != null;
      var recalcVectorNormInverse = function recalcVectorNormInverse2(x12, y12, x22, y22) {
        var dy = y22 - y12;
        var dx = x22 - x12;
        var l = Math.sqrt(dx * dx + dy * dy);
        return {
          x: -dy / l,
          y: dx / l
        };
      };
      var edgeDistances = edge.pstyle("edge-distances").value;
      switch (edgeDistances) {
        case "node-position":
          midptPts = posPts;
          break;
        case "intersection":
          midptPts = intersectionPts;
          break;
        case "endpoints": {
          if (haveManualEndPts) {
            var _this$manualEndptToPx = this.manualEndptToPx(edge.source()[0], srcManEndpt), _this$manualEndptToPx2 = _slicedToArray(_this$manualEndptToPx, 2), x1 = _this$manualEndptToPx2[0], y1 = _this$manualEndptToPx2[1];
            var _this$manualEndptToPx3 = this.manualEndptToPx(edge.target()[0], tgtManEndpt), _this$manualEndptToPx4 = _slicedToArray(_this$manualEndptToPx3, 2), x2 = _this$manualEndptToPx4[0], y2 = _this$manualEndptToPx4[1];
            var endPts = {
              x1,
              y1,
              x2,
              y2
            };
            vectorNormInverse = recalcVectorNormInverse(x1, y1, x2, y2);
            midptPts = endPts;
          } else {
            warn("Edge ".concat(edge.id(), " has edge-distances:endpoints specified without manual endpoints specified via source-endpoint and target-endpoint.  Falling back on edge-distances:intersection (default)."));
            midptPts = intersectionPts;
          }
          break;
        }
      }
      return {
        midptPts,
        vectorNormInverse
      };
    };
    BRp$c.findHaystackPoints = function(edges) {
      for (var i2 = 0; i2 < edges.length; i2++) {
        var edge = edges[i2];
        var _p = edge._private;
        var rs = _p.rscratch;
        if (!rs.haystack) {
          var angle = Math.random() * 2 * Math.PI;
          rs.source = {
            x: Math.cos(angle),
            y: Math.sin(angle)
          };
          angle = Math.random() * 2 * Math.PI;
          rs.target = {
            x: Math.cos(angle),
            y: Math.sin(angle)
          };
        }
        var src = _p.source;
        var tgt = _p.target;
        var srcPos = src.position();
        var tgtPos = tgt.position();
        var srcW = src.width();
        var tgtW = tgt.width();
        var srcH = src.height();
        var tgtH = tgt.height();
        var radius = edge.pstyle("haystack-radius").value;
        var halfRadius = radius / 2;
        rs.haystackPts = rs.allpts = [rs.source.x * srcW * halfRadius + srcPos.x, rs.source.y * srcH * halfRadius + srcPos.y, rs.target.x * tgtW * halfRadius + tgtPos.x, rs.target.y * tgtH * halfRadius + tgtPos.y];
        rs.midX = (rs.allpts[0] + rs.allpts[2]) / 2;
        rs.midY = (rs.allpts[1] + rs.allpts[3]) / 2;
        rs.edgeType = "haystack";
        rs.haystack = true;
        this.storeEdgeProjections(edge);
        this.calculateArrowAngles(edge);
        this.recalculateEdgeLabelProjections(edge);
        this.calculateLabelAngles(edge);
      }
    };
    BRp$c.findSegmentsPoints = function(edge, pairInfo) {
      var rs = edge._private.rscratch;
      var segmentWs = edge.pstyle("segment-weights");
      var segmentDs = edge.pstyle("segment-distances");
      var segmentsN = Math.min(segmentWs.pfValue.length, segmentDs.pfValue.length);
      rs.edgeType = "segments";
      rs.segpts = [];
      for (var s = 0; s < segmentsN; s++) {
        var w = segmentWs.pfValue[s];
        var d = segmentDs.pfValue[s];
        var w1 = 1 - w;
        var w2 = w;
        var _this$findMidptPtsEtc = this.findMidptPtsEtc(edge, pairInfo), midptPts = _this$findMidptPtsEtc.midptPts, vectorNormInverse = _this$findMidptPtsEtc.vectorNormInverse;
        var adjustedMidpt = {
          x: midptPts.x1 * w1 + midptPts.x2 * w2,
          y: midptPts.y1 * w1 + midptPts.y2 * w2
        };
        rs.segpts.push(adjustedMidpt.x + vectorNormInverse.x * d, adjustedMidpt.y + vectorNormInverse.y * d);
      }
    };
    BRp$c.findLoopPoints = function(edge, pairInfo, i2, edgeIsUnbundled) {
      var rs = edge._private.rscratch;
      var dirCounts = pairInfo.dirCounts, srcPos = pairInfo.srcPos;
      var ctrlptDists = edge.pstyle("control-point-distances");
      var ctrlptDist = ctrlptDists ? ctrlptDists.pfValue[0] : void 0;
      var loopDir = edge.pstyle("loop-direction").pfValue;
      var loopSwp = edge.pstyle("loop-sweep").pfValue;
      var stepSize = edge.pstyle("control-point-step-size").pfValue;
      rs.edgeType = "self";
      var j = i2;
      var loopDist = stepSize;
      if (edgeIsUnbundled) {
        j = 0;
        loopDist = ctrlptDist;
      }
      var loopAngle = loopDir - Math.PI / 2;
      var outAngle = loopAngle - loopSwp / 2;
      var inAngle = loopAngle + loopSwp / 2;
      var dc = String(loopDir + "_" + loopSwp);
      j = dirCounts[dc] === void 0 ? dirCounts[dc] = 0 : ++dirCounts[dc];
      rs.ctrlpts = [srcPos.x + Math.cos(outAngle) * 1.4 * loopDist * (j / 3 + 1), srcPos.y + Math.sin(outAngle) * 1.4 * loopDist * (j / 3 + 1), srcPos.x + Math.cos(inAngle) * 1.4 * loopDist * (j / 3 + 1), srcPos.y + Math.sin(inAngle) * 1.4 * loopDist * (j / 3 + 1)];
    };
    BRp$c.findCompoundLoopPoints = function(edge, pairInfo, i2, edgeIsUnbundled) {
      var rs = edge._private.rscratch;
      rs.edgeType = "compound";
      var srcPos = pairInfo.srcPos, tgtPos = pairInfo.tgtPos, srcW = pairInfo.srcW, srcH = pairInfo.srcH, tgtW = pairInfo.tgtW, tgtH = pairInfo.tgtH;
      var stepSize = edge.pstyle("control-point-step-size").pfValue;
      var ctrlptDists = edge.pstyle("control-point-distances");
      var ctrlptDist = ctrlptDists ? ctrlptDists.pfValue[0] : void 0;
      var j = i2;
      var loopDist = stepSize;
      if (edgeIsUnbundled) {
        j = 0;
        loopDist = ctrlptDist;
      }
      var loopW = 50;
      var loopaPos = {
        x: srcPos.x - srcW / 2,
        y: srcPos.y - srcH / 2
      };
      var loopbPos = {
        x: tgtPos.x - tgtW / 2,
        y: tgtPos.y - tgtH / 2
      };
      var loopPos = {
        x: Math.min(loopaPos.x, loopbPos.x),
        y: Math.min(loopaPos.y, loopbPos.y)
      };
      var minCompoundStretch = 0.5;
      var compoundStretchA = Math.max(minCompoundStretch, Math.log(srcW * 0.01));
      var compoundStretchB = Math.max(minCompoundStretch, Math.log(tgtW * 0.01));
      rs.ctrlpts = [loopPos.x, loopPos.y - (1 + Math.pow(loopW, 1.12) / 100) * loopDist * (j / 3 + 1) * compoundStretchA, loopPos.x - (1 + Math.pow(loopW, 1.12) / 100) * loopDist * (j / 3 + 1) * compoundStretchB, loopPos.y];
    };
    BRp$c.findStraightEdgePoints = function(edge) {
      edge._private.rscratch.edgeType = "straight";
    };
    BRp$c.findBezierPoints = function(edge, pairInfo, i2, edgeIsUnbundled, edgeIsSwapped) {
      var rs = edge._private.rscratch;
      var stepSize = edge.pstyle("control-point-step-size").pfValue;
      var ctrlptDists = edge.pstyle("control-point-distances");
      var ctrlptWs = edge.pstyle("control-point-weights");
      var bezierN = ctrlptDists && ctrlptWs ? Math.min(ctrlptDists.value.length, ctrlptWs.value.length) : 1;
      var ctrlptDist = ctrlptDists ? ctrlptDists.pfValue[0] : void 0;
      var ctrlptWeight = ctrlptWs.value[0];
      var multi = edgeIsUnbundled;
      rs.edgeType = multi ? "multibezier" : "bezier";
      rs.ctrlpts = [];
      for (var b = 0; b < bezierN; b++) {
        var normctrlptDist = (0.5 - pairInfo.eles.length / 2 + i2) * stepSize * (edgeIsSwapped ? -1 : 1);
        var manctrlptDist = void 0;
        var sign = signum(normctrlptDist);
        if (multi) {
          ctrlptDist = ctrlptDists ? ctrlptDists.pfValue[b] : stepSize;
          ctrlptWeight = ctrlptWs.value[b];
        }
        if (edgeIsUnbundled) {
          manctrlptDist = ctrlptDist;
        } else {
          manctrlptDist = ctrlptDist !== void 0 ? sign * ctrlptDist : void 0;
        }
        var distanceFromMidpoint = manctrlptDist !== void 0 ? manctrlptDist : normctrlptDist;
        var w1 = 1 - ctrlptWeight;
        var w2 = ctrlptWeight;
        var _this$findMidptPtsEtc2 = this.findMidptPtsEtc(edge, pairInfo), midptPts = _this$findMidptPtsEtc2.midptPts, vectorNormInverse = _this$findMidptPtsEtc2.vectorNormInverse;
        var adjustedMidpt = {
          x: midptPts.x1 * w1 + midptPts.x2 * w2,
          y: midptPts.y1 * w1 + midptPts.y2 * w2
        };
        rs.ctrlpts.push(adjustedMidpt.x + vectorNormInverse.x * distanceFromMidpoint, adjustedMidpt.y + vectorNormInverse.y * distanceFromMidpoint);
      }
    };
    BRp$c.findTaxiPoints = function(edge, pairInfo) {
      var rs = edge._private.rscratch;
      rs.edgeType = "segments";
      var VERTICAL = "vertical";
      var HORIZONTAL = "horizontal";
      var LEFTWARD = "leftward";
      var RIGHTWARD = "rightward";
      var DOWNWARD = "downward";
      var UPWARD = "upward";
      var AUTO = "auto";
      var posPts = pairInfo.posPts, srcW = pairInfo.srcW, srcH = pairInfo.srcH, tgtW = pairInfo.tgtW, tgtH = pairInfo.tgtH;
      var edgeDistances = edge.pstyle("edge-distances").value;
      var dIncludesNodeBody = edgeDistances !== "node-position";
      var taxiDir = edge.pstyle("taxi-direction").value;
      var rawTaxiDir = taxiDir;
      var taxiTurn = edge.pstyle("taxi-turn");
      var turnIsPercent = taxiTurn.units === "%";
      var taxiTurnPfVal = taxiTurn.pfValue;
      var turnIsNegative = taxiTurnPfVal < 0;
      var minD = edge.pstyle("taxi-turn-min-distance").pfValue;
      var dw = dIncludesNodeBody ? (srcW + tgtW) / 2 : 0;
      var dh = dIncludesNodeBody ? (srcH + tgtH) / 2 : 0;
      var pdx = posPts.x2 - posPts.x1;
      var pdy = posPts.y2 - posPts.y1;
      var subDWH = function subDWH2(dxy, dwh) {
        if (dxy > 0) {
          return Math.max(dxy - dwh, 0);
        } else {
          return Math.min(dxy + dwh, 0);
        }
      };
      var dx = subDWH(pdx, dw);
      var dy = subDWH(pdy, dh);
      var isExplicitDir = false;
      if (rawTaxiDir === AUTO) {
        taxiDir = Math.abs(dx) > Math.abs(dy) ? HORIZONTAL : VERTICAL;
      } else if (rawTaxiDir === UPWARD || rawTaxiDir === DOWNWARD) {
        taxiDir = VERTICAL;
        isExplicitDir = true;
      } else if (rawTaxiDir === LEFTWARD || rawTaxiDir === RIGHTWARD) {
        taxiDir = HORIZONTAL;
        isExplicitDir = true;
      }
      var isVert = taxiDir === VERTICAL;
      var l = isVert ? dy : dx;
      var pl = isVert ? pdy : pdx;
      var sgnL = signum(pl);
      var forcedDir = false;
      if (!(isExplicitDir && (turnIsPercent || turnIsNegative)) && (rawTaxiDir === DOWNWARD && pl < 0 || rawTaxiDir === UPWARD && pl > 0 || rawTaxiDir === LEFTWARD && pl > 0 || rawTaxiDir === RIGHTWARD && pl < 0)) {
        sgnL *= -1;
        l = sgnL * Math.abs(l);
        forcedDir = true;
      }
      var d;
      if (turnIsPercent) {
        var p2 = taxiTurnPfVal < 0 ? 1 + taxiTurnPfVal : taxiTurnPfVal;
        d = p2 * l;
      } else {
        var k = taxiTurnPfVal < 0 ? l : 0;
        d = k + taxiTurnPfVal * sgnL;
      }
      var getIsTooClose = function getIsTooClose2(d2) {
        return Math.abs(d2) < minD || Math.abs(d2) >= Math.abs(l);
      };
      var isTooCloseSrc = getIsTooClose(d);
      var isTooCloseTgt = getIsTooClose(Math.abs(l) - Math.abs(d));
      var isTooClose = isTooCloseSrc || isTooCloseTgt;
      if (isTooClose && !forcedDir) {
        if (isVert) {
          var lShapeInsideSrc = Math.abs(pl) <= srcH / 2;
          var lShapeInsideTgt = Math.abs(pdx) <= tgtW / 2;
          if (lShapeInsideSrc) {
            var x = (posPts.x1 + posPts.x2) / 2;
            var y1 = posPts.y1, y2 = posPts.y2;
            rs.segpts = [x, y1, x, y2];
          } else if (lShapeInsideTgt) {
            var y = (posPts.y1 + posPts.y2) / 2;
            var x1 = posPts.x1, x2 = posPts.x2;
            rs.segpts = [x1, y, x2, y];
          } else {
            rs.segpts = [posPts.x1, posPts.y2];
          }
        } else {
          var _lShapeInsideSrc = Math.abs(pl) <= srcW / 2;
          var _lShapeInsideTgt = Math.abs(pdy) <= tgtH / 2;
          if (_lShapeInsideSrc) {
            var _y = (posPts.y1 + posPts.y2) / 2;
            var _x = posPts.x1, _x2 = posPts.x2;
            rs.segpts = [_x, _y, _x2, _y];
          } else if (_lShapeInsideTgt) {
            var _x3 = (posPts.x1 + posPts.x2) / 2;
            var _y2 = posPts.y1, _y3 = posPts.y2;
            rs.segpts = [_x3, _y2, _x3, _y3];
          } else {
            rs.segpts = [posPts.x2, posPts.y1];
          }
        }
      } else {
        if (isVert) {
          var _y4 = posPts.y1 + d + (dIncludesNodeBody ? srcH / 2 * sgnL : 0);
          var _x4 = posPts.x1, _x5 = posPts.x2;
          rs.segpts = [_x4, _y4, _x5, _y4];
        } else {
          var _x6 = posPts.x1 + d + (dIncludesNodeBody ? srcW / 2 * sgnL : 0);
          var _y5 = posPts.y1, _y6 = posPts.y2;
          rs.segpts = [_x6, _y5, _x6, _y6];
        }
      }
    };
    BRp$c.tryToCorrectInvalidPoints = function(edge, pairInfo) {
      var rs = edge._private.rscratch;
      if (rs.edgeType === "bezier") {
        var srcPos = pairInfo.srcPos, tgtPos = pairInfo.tgtPos, srcW = pairInfo.srcW, srcH = pairInfo.srcH, tgtW = pairInfo.tgtW, tgtH = pairInfo.tgtH, srcShape = pairInfo.srcShape, tgtShape = pairInfo.tgtShape;
        var badStart = !number$1(rs.startX) || !number$1(rs.startY);
        var badAStart = !number$1(rs.arrowStartX) || !number$1(rs.arrowStartY);
        var badEnd = !number$1(rs.endX) || !number$1(rs.endY);
        var badAEnd = !number$1(rs.arrowEndX) || !number$1(rs.arrowEndY);
        var minCpADistFactor = 3;
        var arrowW = this.getArrowWidth(edge.pstyle("width").pfValue, edge.pstyle("arrow-scale").value) * this.arrowShapeWidth;
        var minCpADist = minCpADistFactor * arrowW;
        var startACpDist = dist({
          x: rs.ctrlpts[0],
          y: rs.ctrlpts[1]
        }, {
          x: rs.startX,
          y: rs.startY
        });
        var closeStartACp = startACpDist < minCpADist;
        var endACpDist = dist({
          x: rs.ctrlpts[0],
          y: rs.ctrlpts[1]
        }, {
          x: rs.endX,
          y: rs.endY
        });
        var closeEndACp = endACpDist < minCpADist;
        var overlapping = false;
        if (badStart || badAStart || closeStartACp) {
          overlapping = true;
          var cpD = {
            // delta
            x: rs.ctrlpts[0] - srcPos.x,
            y: rs.ctrlpts[1] - srcPos.y
          };
          var cpL = Math.sqrt(cpD.x * cpD.x + cpD.y * cpD.y);
          var cpM = {
            // normalised delta
            x: cpD.x / cpL,
            y: cpD.y / cpL
          };
          var radius = Math.max(srcW, srcH);
          var cpProj = {
            // *2 radius guarantees outside shape
            x: rs.ctrlpts[0] + cpM.x * 2 * radius,
            y: rs.ctrlpts[1] + cpM.y * 2 * radius
          };
          var srcCtrlPtIntn = srcShape.intersectLine(srcPos.x, srcPos.y, srcW, srcH, cpProj.x, cpProj.y, 0);
          if (closeStartACp) {
            rs.ctrlpts[0] = rs.ctrlpts[0] + cpM.x * (minCpADist - startACpDist);
            rs.ctrlpts[1] = rs.ctrlpts[1] + cpM.y * (minCpADist - startACpDist);
          } else {
            rs.ctrlpts[0] = srcCtrlPtIntn[0] + cpM.x * minCpADist;
            rs.ctrlpts[1] = srcCtrlPtIntn[1] + cpM.y * minCpADist;
          }
        }
        if (badEnd || badAEnd || closeEndACp) {
          overlapping = true;
          var _cpD = {
            // delta
            x: rs.ctrlpts[0] - tgtPos.x,
            y: rs.ctrlpts[1] - tgtPos.y
          };
          var _cpL = Math.sqrt(_cpD.x * _cpD.x + _cpD.y * _cpD.y);
          var _cpM = {
            // normalised delta
            x: _cpD.x / _cpL,
            y: _cpD.y / _cpL
          };
          var _radius = Math.max(srcW, srcH);
          var _cpProj = {
            // *2 radius guarantees outside shape
            x: rs.ctrlpts[0] + _cpM.x * 2 * _radius,
            y: rs.ctrlpts[1] + _cpM.y * 2 * _radius
          };
          var tgtCtrlPtIntn = tgtShape.intersectLine(tgtPos.x, tgtPos.y, tgtW, tgtH, _cpProj.x, _cpProj.y, 0);
          if (closeEndACp) {
            rs.ctrlpts[0] = rs.ctrlpts[0] + _cpM.x * (minCpADist - endACpDist);
            rs.ctrlpts[1] = rs.ctrlpts[1] + _cpM.y * (minCpADist - endACpDist);
          } else {
            rs.ctrlpts[0] = tgtCtrlPtIntn[0] + _cpM.x * minCpADist;
            rs.ctrlpts[1] = tgtCtrlPtIntn[1] + _cpM.y * minCpADist;
          }
        }
        if (overlapping) {
          this.findEndpoints(edge);
        }
      }
    };
    BRp$c.storeAllpts = function(edge) {
      var rs = edge._private.rscratch;
      if (rs.edgeType === "multibezier" || rs.edgeType === "bezier" || rs.edgeType === "self" || rs.edgeType === "compound") {
        rs.allpts = [];
        rs.allpts.push(rs.startX, rs.startY);
        for (var b = 0; b + 1 < rs.ctrlpts.length; b += 2) {
          rs.allpts.push(rs.ctrlpts[b], rs.ctrlpts[b + 1]);
          if (b + 3 < rs.ctrlpts.length) {
            rs.allpts.push((rs.ctrlpts[b] + rs.ctrlpts[b + 2]) / 2, (rs.ctrlpts[b + 1] + rs.ctrlpts[b + 3]) / 2);
          }
        }
        rs.allpts.push(rs.endX, rs.endY);
        var m, mt;
        if (rs.ctrlpts.length / 2 % 2 === 0) {
          m = rs.allpts.length / 2 - 1;
          rs.midX = rs.allpts[m];
          rs.midY = rs.allpts[m + 1];
        } else {
          m = rs.allpts.length / 2 - 3;
          mt = 0.5;
          rs.midX = qbezierAt(rs.allpts[m], rs.allpts[m + 2], rs.allpts[m + 4], mt);
          rs.midY = qbezierAt(rs.allpts[m + 1], rs.allpts[m + 3], rs.allpts[m + 5], mt);
        }
      } else if (rs.edgeType === "straight") {
        rs.allpts = [rs.startX, rs.startY, rs.endX, rs.endY];
        rs.midX = (rs.startX + rs.endX + rs.arrowStartX + rs.arrowEndX) / 4;
        rs.midY = (rs.startY + rs.endY + rs.arrowStartY + rs.arrowEndY) / 4;
      } else if (rs.edgeType === "segments") {
        rs.allpts = [];
        rs.allpts.push(rs.startX, rs.startY);
        rs.allpts.push.apply(rs.allpts, rs.segpts);
        rs.allpts.push(rs.endX, rs.endY);
        if (rs.segpts.length % 4 === 0) {
          var i2 = rs.segpts.length / 2;
          var i1 = i2 - 2;
          rs.midX = (rs.segpts[i1] + rs.segpts[i2]) / 2;
          rs.midY = (rs.segpts[i1 + 1] + rs.segpts[i2 + 1]) / 2;
        } else {
          var _i = rs.segpts.length / 2 - 1;
          rs.midX = rs.segpts[_i];
          rs.midY = rs.segpts[_i + 1];
        }
      }
    };
    BRp$c.checkForInvalidEdgeWarning = function(edge) {
      var rs = edge[0]._private.rscratch;
      if (rs.nodesOverlap || number$1(rs.startX) && number$1(rs.startY) && number$1(rs.endX) && number$1(rs.endY)) {
        rs.loggedErr = false;
      } else {
        if (!rs.loggedErr) {
          rs.loggedErr = true;
          warn("Edge `" + edge.id() + "` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap.");
        }
      }
    };
    BRp$c.findEdgeControlPoints = function(edges) {
      var _this = this;
      if (!edges || edges.length === 0) {
        return;
      }
      var r = this;
      var cy = r.cy;
      var hasCompounds = cy.hasCompoundNodes();
      var hashTable = {
        map: new Map$1(),
        get: function get2(pairId2) {
          var map2 = this.map.get(pairId2[0]);
          if (map2 != null) {
            return map2.get(pairId2[1]);
          } else {
            return null;
          }
        },
        set: function set2(pairId2, val) {
          var map2 = this.map.get(pairId2[0]);
          if (map2 == null) {
            map2 = new Map$1();
            this.map.set(pairId2[0], map2);
          }
          map2.set(pairId2[1], val);
        }
      };
      var pairIds = [];
      var haystackEdges = [];
      for (var i2 = 0; i2 < edges.length; i2++) {
        var edge = edges[i2];
        var _p = edge._private;
        var curveStyle = edge.pstyle("curve-style").value;
        if (edge.removed() || !edge.takesUpSpace()) {
          continue;
        }
        if (curveStyle === "haystack") {
          haystackEdges.push(edge);
          continue;
        }
        var edgeIsUnbundled = curveStyle === "unbundled-bezier" || curveStyle === "segments" || curveStyle === "straight" || curveStyle === "straight-triangle" || curveStyle === "taxi";
        var edgeIsBezier = curveStyle === "unbundled-bezier" || curveStyle === "bezier";
        var src = _p.source;
        var tgt = _p.target;
        var srcIndex = src.poolIndex();
        var tgtIndex = tgt.poolIndex();
        var pairId = [srcIndex, tgtIndex].sort();
        var tableEntry = hashTable.get(pairId);
        if (tableEntry == null) {
          tableEntry = {
            eles: []
          };
          hashTable.set(pairId, tableEntry);
          pairIds.push(pairId);
        }
        tableEntry.eles.push(edge);
        if (edgeIsUnbundled) {
          tableEntry.hasUnbundled = true;
        }
        if (edgeIsBezier) {
          tableEntry.hasBezier = true;
        }
      }
      var _loop = function _loop2(p3) {
        var pairId2 = pairIds[p3];
        var pairInfo = hashTable.get(pairId2);
        var swappedpairInfo = void 0;
        if (!pairInfo.hasUnbundled) {
          var pllEdges = pairInfo.eles[0].parallelEdges().filter(function(e) {
            return e.isBundledBezier();
          });
          clearArray(pairInfo.eles);
          pllEdges.forEach(function(edge2) {
            return pairInfo.eles.push(edge2);
          });
          pairInfo.eles.sort(function(edge1, edge2) {
            return edge1.poolIndex() - edge2.poolIndex();
          });
        }
        var firstEdge = pairInfo.eles[0];
        var src2 = firstEdge.source();
        var tgt2 = firstEdge.target();
        if (src2.poolIndex() > tgt2.poolIndex()) {
          var temp = src2;
          src2 = tgt2;
          tgt2 = temp;
        }
        var srcPos = pairInfo.srcPos = src2.position();
        var tgtPos = pairInfo.tgtPos = tgt2.position();
        var srcW = pairInfo.srcW = src2.outerWidth();
        var srcH = pairInfo.srcH = src2.outerHeight();
        var tgtW = pairInfo.tgtW = tgt2.outerWidth();
        var tgtH = pairInfo.tgtH = tgt2.outerHeight();
        var srcShape = pairInfo.srcShape = r.nodeShapes[_this.getNodeShape(src2)];
        var tgtShape = pairInfo.tgtShape = r.nodeShapes[_this.getNodeShape(tgt2)];
        pairInfo.dirCounts = {
          "north": 0,
          "west": 0,
          "south": 0,
          "east": 0,
          "northwest": 0,
          "southwest": 0,
          "northeast": 0,
          "southeast": 0
        };
        for (var _i2 = 0; _i2 < pairInfo.eles.length; _i2++) {
          var _edge = pairInfo.eles[_i2];
          var rs = _edge[0]._private.rscratch;
          var _curveStyle = _edge.pstyle("curve-style").value;
          var _edgeIsUnbundled = _curveStyle === "unbundled-bezier" || _curveStyle === "segments" || _curveStyle === "taxi";
          var edgeIsSwapped = !src2.same(_edge.source());
          if (!pairInfo.calculatedIntersection && src2 !== tgt2 && (pairInfo.hasBezier || pairInfo.hasUnbundled)) {
            pairInfo.calculatedIntersection = true;
            var srcOutside = srcShape.intersectLine(srcPos.x, srcPos.y, srcW, srcH, tgtPos.x, tgtPos.y, 0);
            var srcIntn = pairInfo.srcIntn = srcOutside;
            var tgtOutside = tgtShape.intersectLine(tgtPos.x, tgtPos.y, tgtW, tgtH, srcPos.x, srcPos.y, 0);
            var tgtIntn = pairInfo.tgtIntn = tgtOutside;
            var intersectionPts = pairInfo.intersectionPts = {
              x1: srcOutside[0],
              x2: tgtOutside[0],
              y1: srcOutside[1],
              y2: tgtOutside[1]
            };
            var posPts = pairInfo.posPts = {
              x1: srcPos.x,
              x2: tgtPos.x,
              y1: srcPos.y,
              y2: tgtPos.y
            };
            var dy = tgtOutside[1] - srcOutside[1];
            var dx = tgtOutside[0] - srcOutside[0];
            var l = Math.sqrt(dx * dx + dy * dy);
            var vector = pairInfo.vector = {
              x: dx,
              y: dy
            };
            var vectorNorm = pairInfo.vectorNorm = {
              x: vector.x / l,
              y: vector.y / l
            };
            var vectorNormInverse = {
              x: -vectorNorm.y,
              y: vectorNorm.x
            };
            pairInfo.nodesOverlap = !number$1(l) || tgtShape.checkPoint(srcOutside[0], srcOutside[1], 0, tgtW, tgtH, tgtPos.x, tgtPos.y) || srcShape.checkPoint(tgtOutside[0], tgtOutside[1], 0, srcW, srcH, srcPos.x, srcPos.y);
            pairInfo.vectorNormInverse = vectorNormInverse;
            swappedpairInfo = {
              nodesOverlap: pairInfo.nodesOverlap,
              dirCounts: pairInfo.dirCounts,
              calculatedIntersection: true,
              hasBezier: pairInfo.hasBezier,
              hasUnbundled: pairInfo.hasUnbundled,
              eles: pairInfo.eles,
              srcPos: tgtPos,
              tgtPos: srcPos,
              srcW: tgtW,
              srcH: tgtH,
              tgtW: srcW,
              tgtH: srcH,
              srcIntn: tgtIntn,
              tgtIntn: srcIntn,
              srcShape: tgtShape,
              tgtShape: srcShape,
              posPts: {
                x1: posPts.x2,
                y1: posPts.y2,
                x2: posPts.x1,
                y2: posPts.y1
              },
              intersectionPts: {
                x1: intersectionPts.x2,
                y1: intersectionPts.y2,
                x2: intersectionPts.x1,
                y2: intersectionPts.y1
              },
              vector: {
                x: -vector.x,
                y: -vector.y
              },
              vectorNorm: {
                x: -vectorNorm.x,
                y: -vectorNorm.y
              },
              vectorNormInverse: {
                x: -vectorNormInverse.x,
                y: -vectorNormInverse.y
              }
            };
          }
          var passedPairInfo = edgeIsSwapped ? swappedpairInfo : pairInfo;
          rs.nodesOverlap = passedPairInfo.nodesOverlap;
          rs.srcIntn = passedPairInfo.srcIntn;
          rs.tgtIntn = passedPairInfo.tgtIntn;
          if (hasCompounds && (src2.isParent() || src2.isChild() || tgt2.isParent() || tgt2.isChild()) && (src2.parents().anySame(tgt2) || tgt2.parents().anySame(src2) || src2.same(tgt2) && src2.isParent())) {
            _this.findCompoundLoopPoints(_edge, passedPairInfo, _i2, _edgeIsUnbundled);
          } else if (src2 === tgt2) {
            _this.findLoopPoints(_edge, passedPairInfo, _i2, _edgeIsUnbundled);
          } else if (_curveStyle === "segments") {
            _this.findSegmentsPoints(_edge, passedPairInfo);
          } else if (_curveStyle === "taxi") {
            _this.findTaxiPoints(_edge, passedPairInfo);
          } else if (_curveStyle === "straight" || !_edgeIsUnbundled && pairInfo.eles.length % 2 === 1 && _i2 === Math.floor(pairInfo.eles.length / 2)) {
            _this.findStraightEdgePoints(_edge);
          } else {
            _this.findBezierPoints(_edge, passedPairInfo, _i2, _edgeIsUnbundled, edgeIsSwapped);
          }
          _this.findEndpoints(_edge);
          _this.tryToCorrectInvalidPoints(_edge, passedPairInfo);
          _this.checkForInvalidEdgeWarning(_edge);
          _this.storeAllpts(_edge);
          _this.storeEdgeProjections(_edge);
          _this.calculateArrowAngles(_edge);
          _this.recalculateEdgeLabelProjections(_edge);
          _this.calculateLabelAngles(_edge);
        }
      };
      for (var p2 = 0; p2 < pairIds.length; p2++) {
        _loop(p2);
      }
      this.findHaystackPoints(haystackEdges);
    };
    function getPts(pts2) {
      var retPts = [];
      if (pts2 == null) {
        return;
      }
      for (var i2 = 0; i2 < pts2.length; i2 += 2) {
        var x = pts2[i2];
        var y = pts2[i2 + 1];
        retPts.push({
          x,
          y
        });
      }
      return retPts;
    }
    BRp$c.getSegmentPoints = function(edge) {
      var rs = edge[0]._private.rscratch;
      var type = rs.edgeType;
      if (type === "segments") {
        this.recalculateRenderedStyle(edge);
        return getPts(rs.segpts);
      }
    };
    BRp$c.getControlPoints = function(edge) {
      var rs = edge[0]._private.rscratch;
      var type = rs.edgeType;
      if (type === "bezier" || type === "multibezier" || type === "self" || type === "compound") {
        this.recalculateRenderedStyle(edge);
        return getPts(rs.ctrlpts);
      }
    };
    BRp$c.getEdgeMidpoint = function(edge) {
      var rs = edge[0]._private.rscratch;
      this.recalculateRenderedStyle(edge);
      return {
        x: rs.midX,
        y: rs.midY
      };
    };
    var BRp$b = {};
    BRp$b.manualEndptToPx = function(node, prop) {
      var r = this;
      var npos = node.position();
      var w = node.outerWidth();
      var h = node.outerHeight();
      if (prop.value.length === 2) {
        var p2 = [prop.pfValue[0], prop.pfValue[1]];
        if (prop.units[0] === "%") {
          p2[0] = p2[0] * w;
        }
        if (prop.units[1] === "%") {
          p2[1] = p2[1] * h;
        }
        p2[0] += npos.x;
        p2[1] += npos.y;
        return p2;
      } else {
        var angle = prop.pfValue[0];
        angle = -Math.PI / 2 + angle;
        var l = 2 * Math.max(w, h);
        var _p = [npos.x + Math.cos(angle) * l, npos.y + Math.sin(angle) * l];
        return r.nodeShapes[this.getNodeShape(node)].intersectLine(npos.x, npos.y, w, h, _p[0], _p[1], 0);
      }
    };
    BRp$b.findEndpoints = function(edge) {
      var r = this;
      var intersect;
      var source = edge.source()[0];
      var target = edge.target()[0];
      var srcPos = source.position();
      var tgtPos = target.position();
      var tgtArShape = edge.pstyle("target-arrow-shape").value;
      var srcArShape = edge.pstyle("source-arrow-shape").value;
      var tgtDist = edge.pstyle("target-distance-from-node").pfValue;
      var srcDist = edge.pstyle("source-distance-from-node").pfValue;
      var curveStyle = edge.pstyle("curve-style").value;
      var rs = edge._private.rscratch;
      var et = rs.edgeType;
      var taxi = curveStyle === "taxi";
      var self2 = et === "self" || et === "compound";
      var bezier = et === "bezier" || et === "multibezier" || self2;
      var multi = et !== "bezier";
      var lines = et === "straight" || et === "segments";
      var segments = et === "segments";
      var hasEndpts = bezier || multi || lines;
      var overrideEndpts = self2 || taxi;
      var srcManEndpt = edge.pstyle("source-endpoint");
      var srcManEndptVal = overrideEndpts ? "outside-to-node" : srcManEndpt.value;
      var tgtManEndpt = edge.pstyle("target-endpoint");
      var tgtManEndptVal = overrideEndpts ? "outside-to-node" : tgtManEndpt.value;
      rs.srcManEndpt = srcManEndpt;
      rs.tgtManEndpt = tgtManEndpt;
      var p1;
      var p2;
      var p1_i;
      var p2_i;
      if (bezier) {
        var cpStart = [rs.ctrlpts[0], rs.ctrlpts[1]];
        var cpEnd = multi ? [rs.ctrlpts[rs.ctrlpts.length - 2], rs.ctrlpts[rs.ctrlpts.length - 1]] : cpStart;
        p1 = cpEnd;
        p2 = cpStart;
      } else if (lines) {
        var srcArrowFromPt = !segments ? [tgtPos.x, tgtPos.y] : rs.segpts.slice(0, 2);
        var tgtArrowFromPt = !segments ? [srcPos.x, srcPos.y] : rs.segpts.slice(rs.segpts.length - 2);
        p1 = tgtArrowFromPt;
        p2 = srcArrowFromPt;
      }
      if (tgtManEndptVal === "inside-to-node") {
        intersect = [tgtPos.x, tgtPos.y];
      } else if (tgtManEndpt.units) {
        intersect = this.manualEndptToPx(target, tgtManEndpt);
      } else if (tgtManEndptVal === "outside-to-line") {
        intersect = rs.tgtIntn;
      } else {
        if (tgtManEndptVal === "outside-to-node" || tgtManEndptVal === "outside-to-node-or-label") {
          p1_i = p1;
        } else if (tgtManEndptVal === "outside-to-line" || tgtManEndptVal === "outside-to-line-or-label") {
          p1_i = [srcPos.x, srcPos.y];
        }
        intersect = r.nodeShapes[this.getNodeShape(target)].intersectLine(tgtPos.x, tgtPos.y, target.outerWidth(), target.outerHeight(), p1_i[0], p1_i[1], 0);
        if (tgtManEndptVal === "outside-to-node-or-label" || tgtManEndptVal === "outside-to-line-or-label") {
          var trs = target._private.rscratch;
          var lw = trs.labelWidth;
          var lh = trs.labelHeight;
          var lx = trs.labelX;
          var ly = trs.labelY;
          var lw2 = lw / 2;
          var lh2 = lh / 2;
          var va = target.pstyle("text-valign").value;
          if (va === "top") {
            ly -= lh2;
          } else if (va === "bottom") {
            ly += lh2;
          }
          var ha = target.pstyle("text-halign").value;
          if (ha === "left") {
            lx -= lw2;
          } else if (ha === "right") {
            lx += lw2;
          }
          var labelIntersect = polygonIntersectLine(p1_i[0], p1_i[1], [lx - lw2, ly - lh2, lx + lw2, ly - lh2, lx + lw2, ly + lh2, lx - lw2, ly + lh2], tgtPos.x, tgtPos.y);
          if (labelIntersect.length > 0) {
            var refPt = srcPos;
            var intSqdist = sqdist(refPt, array2point(intersect));
            var labIntSqdist = sqdist(refPt, array2point(labelIntersect));
            var minSqDist = intSqdist;
            if (labIntSqdist < intSqdist) {
              intersect = labelIntersect;
              minSqDist = labIntSqdist;
            }
            if (labelIntersect.length > 2) {
              var labInt2SqDist = sqdist(refPt, {
                x: labelIntersect[2],
                y: labelIntersect[3]
              });
              if (labInt2SqDist < minSqDist) {
                intersect = [labelIntersect[2], labelIntersect[3]];
              }
            }
          }
        }
      }
      var arrowEnd = shortenIntersection(intersect, p1, r.arrowShapes[tgtArShape].spacing(edge) + tgtDist);
      var edgeEnd = shortenIntersection(intersect, p1, r.arrowShapes[tgtArShape].gap(edge) + tgtDist);
      rs.endX = edgeEnd[0];
      rs.endY = edgeEnd[1];
      rs.arrowEndX = arrowEnd[0];
      rs.arrowEndY = arrowEnd[1];
      if (srcManEndptVal === "inside-to-node") {
        intersect = [srcPos.x, srcPos.y];
      } else if (srcManEndpt.units) {
        intersect = this.manualEndptToPx(source, srcManEndpt);
      } else if (srcManEndptVal === "outside-to-line") {
        intersect = rs.srcIntn;
      } else {
        if (srcManEndptVal === "outside-to-node" || srcManEndptVal === "outside-to-node-or-label") {
          p2_i = p2;
        } else if (srcManEndptVal === "outside-to-line" || srcManEndptVal === "outside-to-line-or-label") {
          p2_i = [tgtPos.x, tgtPos.y];
        }
        intersect = r.nodeShapes[this.getNodeShape(source)].intersectLine(srcPos.x, srcPos.y, source.outerWidth(), source.outerHeight(), p2_i[0], p2_i[1], 0);
        if (srcManEndptVal === "outside-to-node-or-label" || srcManEndptVal === "outside-to-line-or-label") {
          var srs = source._private.rscratch;
          var _lw = srs.labelWidth;
          var _lh = srs.labelHeight;
          var _lx = srs.labelX;
          var _ly = srs.labelY;
          var _lw2 = _lw / 2;
          var _lh2 = _lh / 2;
          var _va = source.pstyle("text-valign").value;
          if (_va === "top") {
            _ly -= _lh2;
          } else if (_va === "bottom") {
            _ly += _lh2;
          }
          var _ha = source.pstyle("text-halign").value;
          if (_ha === "left") {
            _lx -= _lw2;
          } else if (_ha === "right") {
            _lx += _lw2;
          }
          var _labelIntersect = polygonIntersectLine(p2_i[0], p2_i[1], [_lx - _lw2, _ly - _lh2, _lx + _lw2, _ly - _lh2, _lx + _lw2, _ly + _lh2, _lx - _lw2, _ly + _lh2], srcPos.x, srcPos.y);
          if (_labelIntersect.length > 0) {
            var _refPt = tgtPos;
            var _intSqdist = sqdist(_refPt, array2point(intersect));
            var _labIntSqdist = sqdist(_refPt, array2point(_labelIntersect));
            var _minSqDist = _intSqdist;
            if (_labIntSqdist < _intSqdist) {
              intersect = [_labelIntersect[0], _labelIntersect[1]];
              _minSqDist = _labIntSqdist;
            }
            if (_labelIntersect.length > 2) {
              var _labInt2SqDist = sqdist(_refPt, {
                x: _labelIntersect[2],
                y: _labelIntersect[3]
              });
              if (_labInt2SqDist < _minSqDist) {
                intersect = [_labelIntersect[2], _labelIntersect[3]];
              }
            }
          }
        }
      }
      var arrowStart = shortenIntersection(intersect, p2, r.arrowShapes[srcArShape].spacing(edge) + srcDist);
      var edgeStart = shortenIntersection(intersect, p2, r.arrowShapes[srcArShape].gap(edge) + srcDist);
      rs.startX = edgeStart[0];
      rs.startY = edgeStart[1];
      rs.arrowStartX = arrowStart[0];
      rs.arrowStartY = arrowStart[1];
      if (hasEndpts) {
        if (!number$1(rs.startX) || !number$1(rs.startY) || !number$1(rs.endX) || !number$1(rs.endY)) {
          rs.badLine = true;
        } else {
          rs.badLine = false;
        }
      }
    };
    BRp$b.getSourceEndpoint = function(edge) {
      var rs = edge[0]._private.rscratch;
      this.recalculateRenderedStyle(edge);
      switch (rs.edgeType) {
        case "haystack":
          return {
            x: rs.haystackPts[0],
            y: rs.haystackPts[1]
          };
        default:
          return {
            x: rs.arrowStartX,
            y: rs.arrowStartY
          };
      }
    };
    BRp$b.getTargetEndpoint = function(edge) {
      var rs = edge[0]._private.rscratch;
      this.recalculateRenderedStyle(edge);
      switch (rs.edgeType) {
        case "haystack":
          return {
            x: rs.haystackPts[2],
            y: rs.haystackPts[3]
          };
        default:
          return {
            x: rs.arrowEndX,
            y: rs.arrowEndY
          };
      }
    };
    var BRp$a = {};
    function pushBezierPts(r, edge, pts2) {
      var qbezierAt$1 = function qbezierAt$12(p1, p22, p3, t) {
        return qbezierAt(p1, p22, p3, t);
      };
      var _p = edge._private;
      var bpts = _p.rstyle.bezierPts;
      for (var i2 = 0; i2 < r.bezierProjPcts.length; i2++) {
        var p2 = r.bezierProjPcts[i2];
        bpts.push({
          x: qbezierAt$1(pts2[0], pts2[2], pts2[4], p2),
          y: qbezierAt$1(pts2[1], pts2[3], pts2[5], p2)
        });
      }
    }
    BRp$a.storeEdgeProjections = function(edge) {
      var _p = edge._private;
      var rs = _p.rscratch;
      var et = rs.edgeType;
      _p.rstyle.bezierPts = null;
      _p.rstyle.linePts = null;
      _p.rstyle.haystackPts = null;
      if (et === "multibezier" || et === "bezier" || et === "self" || et === "compound") {
        _p.rstyle.bezierPts = [];
        for (var i2 = 0; i2 + 5 < rs.allpts.length; i2 += 4) {
          pushBezierPts(this, edge, rs.allpts.slice(i2, i2 + 6));
        }
      } else if (et === "segments") {
        var lpts = _p.rstyle.linePts = [];
        for (var i2 = 0; i2 + 1 < rs.allpts.length; i2 += 2) {
          lpts.push({
            x: rs.allpts[i2],
            y: rs.allpts[i2 + 1]
          });
        }
      } else if (et === "haystack") {
        var hpts = rs.haystackPts;
        _p.rstyle.haystackPts = [{
          x: hpts[0],
          y: hpts[1]
        }, {
          x: hpts[2],
          y: hpts[3]
        }];
      }
      _p.rstyle.arrowWidth = this.getArrowWidth(edge.pstyle("width").pfValue, edge.pstyle("arrow-scale").value) * this.arrowShapeWidth;
    };
    BRp$a.recalculateEdgeProjections = function(edges) {
      this.findEdgeControlPoints(edges);
    };
    var BRp$9 = {};
    BRp$9.recalculateNodeLabelProjection = function(node) {
      var content = node.pstyle("label").strValue;
      if (emptyString(content)) {
        return;
      }
      var textX, textY;
      var _p = node._private;
      var nodeWidth = node.width();
      var nodeHeight = node.height();
      var padding = node.padding();
      var nodePos = node.position();
      var textHalign = node.pstyle("text-halign").strValue;
      var textValign = node.pstyle("text-valign").strValue;
      var rs = _p.rscratch;
      var rstyle = _p.rstyle;
      switch (textHalign) {
        case "left":
          textX = nodePos.x - nodeWidth / 2 - padding;
          break;
        case "right":
          textX = nodePos.x + nodeWidth / 2 + padding;
          break;
        default:
          textX = nodePos.x;
      }
      switch (textValign) {
        case "top":
          textY = nodePos.y - nodeHeight / 2 - padding;
          break;
        case "bottom":
          textY = nodePos.y + nodeHeight / 2 + padding;
          break;
        default:
          textY = nodePos.y;
      }
      rs.labelX = textX;
      rs.labelY = textY;
      rstyle.labelX = textX;
      rstyle.labelY = textY;
      this.calculateLabelAngles(node);
      this.applyLabelDimensions(node);
    };
    var lineAngleFromDelta = function lineAngleFromDelta2(dx, dy) {
      var angle = Math.atan(dy / dx);
      if (dx === 0 && angle < 0) {
        angle = angle * -1;
      }
      return angle;
    };
    var lineAngle = function lineAngle2(p0, p1) {
      var dx = p1.x - p0.x;
      var dy = p1.y - p0.y;
      return lineAngleFromDelta(dx, dy);
    };
    var bezierAngle = function bezierAngle2(p0, p1, p2, t) {
      var t0 = bound(0, t - 1e-3, 1);
      var t1 = bound(0, t + 1e-3, 1);
      var lp0 = qbezierPtAt(p0, p1, p2, t0);
      var lp1 = qbezierPtAt(p0, p1, p2, t1);
      return lineAngle(lp0, lp1);
    };
    BRp$9.recalculateEdgeLabelProjections = function(edge) {
      var p2;
      var _p = edge._private;
      var rs = _p.rscratch;
      var r = this;
      var content = {
        mid: edge.pstyle("label").strValue,
        source: edge.pstyle("source-label").strValue,
        target: edge.pstyle("target-label").strValue
      };
      if (content.mid || content.source || content.target) ;
      else {
        return;
      }
      p2 = {
        x: rs.midX,
        y: rs.midY
      };
      var setRs = function setRs2(propName, prefix, value) {
        setPrefixedProperty(_p.rscratch, propName, prefix, value);
        setPrefixedProperty(_p.rstyle, propName, prefix, value);
      };
      setRs("labelX", null, p2.x);
      setRs("labelY", null, p2.y);
      var midAngle = lineAngleFromDelta(rs.midDispX, rs.midDispY);
      setRs("labelAutoAngle", null, midAngle);
      var createControlPointInfo = function createControlPointInfo2() {
        if (createControlPointInfo2.cache) {
          return createControlPointInfo2.cache;
        }
        var ctrlpts = [];
        for (var i2 = 0; i2 + 5 < rs.allpts.length; i2 += 4) {
          var p0 = {
            x: rs.allpts[i2],
            y: rs.allpts[i2 + 1]
          };
          var p1 = {
            x: rs.allpts[i2 + 2],
            y: rs.allpts[i2 + 3]
          };
          var p22 = {
            x: rs.allpts[i2 + 4],
            y: rs.allpts[i2 + 5]
          };
          ctrlpts.push({
            p0,
            p1,
            p2: p22,
            startDist: 0,
            length: 0,
            segments: []
          });
        }
        var bpts = _p.rstyle.bezierPts;
        var nProjs = r.bezierProjPcts.length;
        function addSegment(cp2, p02, p12, t0, t1) {
          var length = dist(p02, p12);
          var prevSegment = cp2.segments[cp2.segments.length - 1];
          var segment = {
            p0: p02,
            p1: p12,
            t0,
            t1,
            startDist: prevSegment ? prevSegment.startDist + prevSegment.length : 0,
            length
          };
          cp2.segments.push(segment);
          cp2.length += length;
        }
        for (var _i = 0; _i < ctrlpts.length; _i++) {
          var cp = ctrlpts[_i];
          var prevCp = ctrlpts[_i - 1];
          if (prevCp) {
            cp.startDist = prevCp.startDist + prevCp.length;
          }
          addSegment(cp, cp.p0, bpts[_i * nProjs], 0, r.bezierProjPcts[0]);
          for (var j = 0; j < nProjs - 1; j++) {
            addSegment(cp, bpts[_i * nProjs + j], bpts[_i * nProjs + j + 1], r.bezierProjPcts[j], r.bezierProjPcts[j + 1]);
          }
          addSegment(cp, bpts[_i * nProjs + nProjs - 1], cp.p2, r.bezierProjPcts[nProjs - 1], 1);
        }
        return createControlPointInfo2.cache = ctrlpts;
      };
      var calculateEndProjection = function calculateEndProjection2(prefix) {
        var angle;
        var isSrc = prefix === "source";
        if (!content[prefix]) {
          return;
        }
        var offset = edge.pstyle(prefix + "-text-offset").pfValue;
        switch (rs.edgeType) {
          case "self":
          case "compound":
          case "bezier":
          case "multibezier": {
            var cps = createControlPointInfo();
            var selected;
            var startDist = 0;
            var totalDist = 0;
            for (var i2 = 0; i2 < cps.length; i2++) {
              var _cp = cps[isSrc ? i2 : cps.length - 1 - i2];
              for (var j = 0; j < _cp.segments.length; j++) {
                var _seg = _cp.segments[isSrc ? j : _cp.segments.length - 1 - j];
                var lastSeg = i2 === cps.length - 1 && j === _cp.segments.length - 1;
                startDist = totalDist;
                totalDist += _seg.length;
                if (totalDist >= offset || lastSeg) {
                  selected = {
                    cp: _cp,
                    segment: _seg
                  };
                  break;
                }
              }
              if (selected) {
                break;
              }
            }
            var cp = selected.cp;
            var seg = selected.segment;
            var tSegment = (offset - startDist) / seg.length;
            var segDt = seg.t1 - seg.t0;
            var t = isSrc ? seg.t0 + segDt * tSegment : seg.t1 - segDt * tSegment;
            t = bound(0, t, 1);
            p2 = qbezierPtAt(cp.p0, cp.p1, cp.p2, t);
            angle = bezierAngle(cp.p0, cp.p1, cp.p2, t);
            break;
          }
          case "straight":
          case "segments":
          case "haystack": {
            var d = 0, di, d0;
            var p0, p1;
            var l = rs.allpts.length;
            for (var _i2 = 0; _i2 + 3 < l; _i2 += 2) {
              if (isSrc) {
                p0 = {
                  x: rs.allpts[_i2],
                  y: rs.allpts[_i2 + 1]
                };
                p1 = {
                  x: rs.allpts[_i2 + 2],
                  y: rs.allpts[_i2 + 3]
                };
              } else {
                p0 = {
                  x: rs.allpts[l - 2 - _i2],
                  y: rs.allpts[l - 1 - _i2]
                };
                p1 = {
                  x: rs.allpts[l - 4 - _i2],
                  y: rs.allpts[l - 3 - _i2]
                };
              }
              di = dist(p0, p1);
              d0 = d;
              d += di;
              if (d >= offset) {
                break;
              }
            }
            var pD = offset - d0;
            var _t = pD / di;
            _t = bound(0, _t, 1);
            p2 = lineAt(p0, p1, _t);
            angle = lineAngle(p0, p1);
            break;
          }
        }
        setRs("labelX", prefix, p2.x);
        setRs("labelY", prefix, p2.y);
        setRs("labelAutoAngle", prefix, angle);
      };
      calculateEndProjection("source");
      calculateEndProjection("target");
      this.applyLabelDimensions(edge);
    };
    BRp$9.applyLabelDimensions = function(ele) {
      this.applyPrefixedLabelDimensions(ele);
      if (ele.isEdge()) {
        this.applyPrefixedLabelDimensions(ele, "source");
        this.applyPrefixedLabelDimensions(ele, "target");
      }
    };
    BRp$9.applyPrefixedLabelDimensions = function(ele, prefix) {
      var _p = ele._private;
      var text = this.getLabelText(ele, prefix);
      var labelDims = this.calculateLabelDimensions(ele, text);
      var lineHeight = ele.pstyle("line-height").pfValue;
      var textWrap = ele.pstyle("text-wrap").strValue;
      var lines = getPrefixedProperty(_p.rscratch, "labelWrapCachedLines", prefix) || [];
      var numLines = textWrap !== "wrap" ? 1 : Math.max(lines.length, 1);
      var normPerLineHeight = labelDims.height / numLines;
      var labelLineHeight = normPerLineHeight * lineHeight;
      var width = labelDims.width;
      var height = labelDims.height + (numLines - 1) * (lineHeight - 1) * normPerLineHeight;
      setPrefixedProperty(_p.rstyle, "labelWidth", prefix, width);
      setPrefixedProperty(_p.rscratch, "labelWidth", prefix, width);
      setPrefixedProperty(_p.rstyle, "labelHeight", prefix, height);
      setPrefixedProperty(_p.rscratch, "labelHeight", prefix, height);
      setPrefixedProperty(_p.rscratch, "labelLineHeight", prefix, labelLineHeight);
    };
    BRp$9.getLabelText = function(ele, prefix) {
      var _p = ele._private;
      var pfd = prefix ? prefix + "-" : "";
      var text = ele.pstyle(pfd + "label").strValue;
      var textTransform = ele.pstyle("text-transform").value;
      var rscratch = function rscratch2(propName, value) {
        if (value) {
          setPrefixedProperty(_p.rscratch, propName, prefix, value);
          return value;
        } else {
          return getPrefixedProperty(_p.rscratch, propName, prefix);
        }
      };
      if (!text) {
        return "";
      }
      if (textTransform == "none") ;
      else if (textTransform == "uppercase") {
        text = text.toUpperCase();
      } else if (textTransform == "lowercase") {
        text = text.toLowerCase();
      }
      var wrapStyle = ele.pstyle("text-wrap").value;
      if (wrapStyle === "wrap") {
        var labelKey = rscratch("labelKey");
        if (labelKey != null && rscratch("labelWrapKey") === labelKey) {
          return rscratch("labelWrapCachedText");
        }
        var zwsp = "​";
        var lines = text.split("\n");
        var maxW = ele.pstyle("text-max-width").pfValue;
        var overflow = ele.pstyle("text-overflow-wrap").value;
        var overflowAny = overflow === "anywhere";
        var wrappedLines = [];
        var wordsRegex = /[\s\u200b]+/;
        var wordSeparator = overflowAny ? "" : " ";
        for (var l = 0; l < lines.length; l++) {
          var line = lines[l];
          var lineDims = this.calculateLabelDimensions(ele, line);
          var lineW = lineDims.width;
          if (overflowAny) {
            var processedLine = line.split("").join(zwsp);
            line = processedLine;
          }
          if (lineW > maxW) {
            var words = line.split(wordsRegex);
            var subline = "";
            for (var w = 0; w < words.length; w++) {
              var word = words[w];
              var testLine = subline.length === 0 ? word : subline + wordSeparator + word;
              var testDims = this.calculateLabelDimensions(ele, testLine);
              var testW = testDims.width;
              if (testW <= maxW) {
                subline += word + wordSeparator;
              } else {
                if (subline) {
                  wrappedLines.push(subline);
                }
                subline = word + wordSeparator;
              }
            }
            if (!subline.match(/^[\s\u200b]+$/)) {
              wrappedLines.push(subline);
            }
          } else {
            wrappedLines.push(line);
          }
        }
        rscratch("labelWrapCachedLines", wrappedLines);
        text = rscratch("labelWrapCachedText", wrappedLines.join("\n"));
        rscratch("labelWrapKey", labelKey);
      } else if (wrapStyle === "ellipsis") {
        var _maxW = ele.pstyle("text-max-width").pfValue;
        var ellipsized = "";
        var ellipsis = "…";
        var incLastCh = false;
        if (this.calculateLabelDimensions(ele, text).width < _maxW) {
          return text;
        }
        for (var i2 = 0; i2 < text.length; i2++) {
          var widthWithNextCh = this.calculateLabelDimensions(ele, ellipsized + text[i2] + ellipsis).width;
          if (widthWithNextCh > _maxW) {
            break;
          }
          ellipsized += text[i2];
          if (i2 === text.length - 1) {
            incLastCh = true;
          }
        }
        if (!incLastCh) {
          ellipsized += ellipsis;
        }
        return ellipsized;
      }
      return text;
    };
    BRp$9.getLabelJustification = function(ele) {
      var justification = ele.pstyle("text-justification").strValue;
      var textHalign = ele.pstyle("text-halign").strValue;
      if (justification === "auto") {
        if (ele.isNode()) {
          switch (textHalign) {
            case "left":
              return "right";
            case "right":
              return "left";
            default:
              return "center";
          }
        } else {
          return "center";
        }
      } else {
        return justification;
      }
    };
    BRp$9.calculateLabelDimensions = function(ele, text) {
      var r = this;
      var cacheKey = hashString(text, ele._private.labelDimsKey);
      var cache2 = r.labelDimCache || (r.labelDimCache = []);
      var existingVal = cache2[cacheKey];
      if (existingVal != null) {
        return existingVal;
      }
      var padding = 0;
      var fStyle = ele.pstyle("font-style").strValue;
      var size = ele.pstyle("font-size").pfValue;
      var family = ele.pstyle("font-family").strValue;
      var weight = ele.pstyle("font-weight").strValue;
      var canvas = this.labelCalcCanvas;
      var c2d = this.labelCalcCanvasContext;
      if (!canvas) {
        canvas = this.labelCalcCanvas = document.createElement("canvas");
        c2d = this.labelCalcCanvasContext = canvas.getContext("2d");
        var ds = canvas.style;
        ds.position = "absolute";
        ds.left = "-9999px";
        ds.top = "-9999px";
        ds.zIndex = "-1";
        ds.visibility = "hidden";
        ds.pointerEvents = "none";
      }
      c2d.font = "".concat(fStyle, " ").concat(weight, " ").concat(size, "px ").concat(family);
      var width = 0;
      var height = 0;
      var lines = text.split("\n");
      for (var i2 = 0; i2 < lines.length; i2++) {
        var line = lines[i2];
        var metrics = c2d.measureText(line);
        var w = Math.ceil(metrics.width);
        var h = size;
        width = Math.max(w, width);
        height += h;
      }
      width += padding;
      height += padding;
      return cache2[cacheKey] = {
        width,
        height
      };
    };
    BRp$9.calculateLabelAngle = function(ele, prefix) {
      var _p = ele._private;
      var rs = _p.rscratch;
      var isEdge = ele.isEdge();
      var prefixDash = prefix ? prefix + "-" : "";
      var rot = ele.pstyle(prefixDash + "text-rotation");
      var rotStr = rot.strValue;
      if (rotStr === "none") {
        return 0;
      } else if (isEdge && rotStr === "autorotate") {
        return rs.labelAutoAngle;
      } else if (rotStr === "autorotate") {
        return 0;
      } else {
        return rot.pfValue;
      }
    };
    BRp$9.calculateLabelAngles = function(ele) {
      var r = this;
      var isEdge = ele.isEdge();
      var _p = ele._private;
      var rs = _p.rscratch;
      rs.labelAngle = r.calculateLabelAngle(ele);
      if (isEdge) {
        rs.sourceLabelAngle = r.calculateLabelAngle(ele, "source");
        rs.targetLabelAngle = r.calculateLabelAngle(ele, "target");
      }
    };
    var BRp$8 = {};
    var TOO_SMALL_CUT_RECT = 28;
    var warnedCutRect = false;
    BRp$8.getNodeShape = function(node) {
      var r = this;
      var shape = node.pstyle("shape").value;
      if (shape === "cutrectangle" && (node.width() < TOO_SMALL_CUT_RECT || node.height() < TOO_SMALL_CUT_RECT)) {
        if (!warnedCutRect) {
          warn("The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead");
          warnedCutRect = true;
        }
        return "rectangle";
      }
      if (node.isParent()) {
        if (shape === "rectangle" || shape === "roundrectangle" || shape === "round-rectangle" || shape === "cutrectangle" || shape === "cut-rectangle" || shape === "barrel") {
          return shape;
        } else {
          return "rectangle";
        }
      }
      if (shape === "polygon") {
        var points = node.pstyle("shape-polygon-points").value;
        return r.nodeShapes.makePolygon(points).name;
      }
      return shape;
    };
    var BRp$7 = {};
    BRp$7.registerCalculationListeners = function() {
      var cy = this.cy;
      var elesToUpdate = cy.collection();
      var r = this;
      var enqueue = function enqueue2(eles) {
        var dirtyStyleCaches = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        elesToUpdate.merge(eles);
        if (dirtyStyleCaches) {
          for (var i2 = 0; i2 < eles.length; i2++) {
            var ele = eles[i2];
            var _p = ele._private;
            var rstyle = _p.rstyle;
            rstyle.clean = false;
            rstyle.cleanConnected = false;
          }
        }
      };
      r.binder(cy).on("bounds.* dirty.*", function onDirtyBounds(e) {
        var ele = e.target;
        enqueue(ele);
      }).on("style.* background.*", function onDirtyStyle(e) {
        var ele = e.target;
        enqueue(ele, false);
      });
      var updateEleCalcs = function updateEleCalcs2(willDraw) {
        if (willDraw) {
          var fns = r.onUpdateEleCalcsFns;
          elesToUpdate.cleanStyle();
          for (var i2 = 0; i2 < elesToUpdate.length; i2++) {
            var ele = elesToUpdate[i2];
            var rstyle = ele._private.rstyle;
            if (ele.isNode() && !rstyle.cleanConnected) {
              enqueue(ele.connectedEdges());
              rstyle.cleanConnected = true;
            }
          }
          if (fns) {
            for (var _i = 0; _i < fns.length; _i++) {
              var fn2 = fns[_i];
              fn2(willDraw, elesToUpdate);
            }
          }
          r.recalculateRenderedStyle(elesToUpdate);
          elesToUpdate = cy.collection();
        }
      };
      r.flushRenderedStyleQueue = function() {
        updateEleCalcs(true);
      };
      r.beforeRender(updateEleCalcs, r.beforeRenderPriorities.eleCalcs);
    };
    BRp$7.onUpdateEleCalcs = function(fn2) {
      var fns = this.onUpdateEleCalcsFns = this.onUpdateEleCalcsFns || [];
      fns.push(fn2);
    };
    BRp$7.recalculateRenderedStyle = function(eles, useCache) {
      var isCleanConnected = function isCleanConnected2(ele2) {
        return ele2._private.rstyle.cleanConnected;
      };
      var edges = [];
      var nodes = [];
      if (this.destroyed) {
        return;
      }
      if (useCache === void 0) {
        useCache = true;
      }
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        var _p = ele._private;
        var rstyle = _p.rstyle;
        if (ele.isEdge() && (!isCleanConnected(ele.source()) || !isCleanConnected(ele.target()))) {
          rstyle.clean = false;
        }
        if (useCache && rstyle.clean || ele.removed()) {
          continue;
        }
        if (ele.pstyle("display").value === "none") {
          continue;
        }
        if (_p.group === "nodes") {
          nodes.push(ele);
        } else {
          edges.push(ele);
        }
        rstyle.clean = true;
      }
      for (var _i2 = 0; _i2 < nodes.length; _i2++) {
        var _ele = nodes[_i2];
        var _p2 = _ele._private;
        var _rstyle = _p2.rstyle;
        var pos = _ele.position();
        this.recalculateNodeLabelProjection(_ele);
        _rstyle.nodeX = pos.x;
        _rstyle.nodeY = pos.y;
        _rstyle.nodeW = _ele.pstyle("width").pfValue;
        _rstyle.nodeH = _ele.pstyle("height").pfValue;
      }
      this.recalculateEdgeProjections(edges);
      for (var _i3 = 0; _i3 < edges.length; _i3++) {
        var _ele2 = edges[_i3];
        var _p3 = _ele2._private;
        var _rstyle2 = _p3.rstyle;
        var rs = _p3.rscratch;
        _rstyle2.srcX = rs.arrowStartX;
        _rstyle2.srcY = rs.arrowStartY;
        _rstyle2.tgtX = rs.arrowEndX;
        _rstyle2.tgtY = rs.arrowEndY;
        _rstyle2.midX = rs.midX;
        _rstyle2.midY = rs.midY;
        _rstyle2.labelAngle = rs.labelAngle;
        _rstyle2.sourceLabelAngle = rs.sourceLabelAngle;
        _rstyle2.targetLabelAngle = rs.targetLabelAngle;
      }
    };
    var BRp$6 = {};
    BRp$6.updateCachedGrabbedEles = function() {
      var eles = this.cachedZSortedEles;
      if (!eles) {
        return;
      }
      eles.drag = [];
      eles.nondrag = [];
      var grabTargets = [];
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        var rs = ele._private.rscratch;
        if (ele.grabbed() && !ele.isParent()) {
          grabTargets.push(ele);
        } else if (rs.inDragLayer) {
          eles.drag.push(ele);
        } else {
          eles.nondrag.push(ele);
        }
      }
      for (var i2 = 0; i2 < grabTargets.length; i2++) {
        var ele = grabTargets[i2];
        eles.drag.push(ele);
      }
    };
    BRp$6.invalidateCachedZSortedEles = function() {
      this.cachedZSortedEles = null;
    };
    BRp$6.getCachedZSortedEles = function(forceRecalc) {
      if (forceRecalc || !this.cachedZSortedEles) {
        var eles = this.cy.mutableElements().toArray();
        eles.sort(zIndexSort);
        eles.interactive = eles.filter(function(ele) {
          return ele.interactive();
        });
        this.cachedZSortedEles = eles;
        this.updateCachedGrabbedEles();
      } else {
        eles = this.cachedZSortedEles;
      }
      return eles;
    };
    var BRp$5 = {};
    [BRp$e, BRp$d, BRp$c, BRp$b, BRp$a, BRp$9, BRp$8, BRp$7, BRp$6].forEach(function(props) {
      extend(BRp$5, props);
    });
    var BRp$4 = {};
    BRp$4.getCachedImage = function(url, crossOrigin, onLoad) {
      var r = this;
      var imageCache = r.imageCache = r.imageCache || {};
      var cache2 = imageCache[url];
      if (cache2) {
        if (!cache2.image.complete) {
          cache2.image.addEventListener("load", onLoad);
        }
        return cache2.image;
      } else {
        cache2 = imageCache[url] = imageCache[url] || {};
        var image = cache2.image = new Image();
        image.addEventListener("load", onLoad);
        image.addEventListener("error", function() {
          image.error = true;
        });
        var dataUriPrefix = "data:";
        var isDataUri = url.substring(0, dataUriPrefix.length).toLowerCase() === dataUriPrefix;
        if (!isDataUri) {
          crossOrigin = crossOrigin === "null" ? null : crossOrigin;
          image.crossOrigin = crossOrigin;
        }
        image.src = url;
        return image;
      }
    };
    var BRp$3 = {};
    BRp$3.registerBinding = function(target, event2, handler, useCapture) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      var b = this.binder(target);
      return b.on.apply(b, args);
    };
    BRp$3.binder = function(tgt) {
      var r = this;
      var containerWindow = r.cy.window();
      var tgtIsDom = tgt === containerWindow || tgt === containerWindow.document || tgt === containerWindow.document.body || domElement(tgt);
      if (r.supportsPassiveEvents == null) {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, "passive", {
            get: function get2() {
              supportsPassive = true;
              return true;
            }
          });
          containerWindow.addEventListener("test", null, opts);
        } catch (err) {
        }
        r.supportsPassiveEvents = supportsPassive;
      }
      var on = function on2(event2, handler, useCapture) {
        var args = Array.prototype.slice.call(arguments);
        if (tgtIsDom && r.supportsPassiveEvents) {
          args[2] = {
            capture: useCapture != null ? useCapture : false,
            passive: false,
            once: false
          };
        }
        r.bindings.push({
          target: tgt,
          args
        });
        (tgt.addEventListener || tgt.on).apply(tgt, args);
        return this;
      };
      return {
        on,
        addEventListener: on,
        addListener: on,
        bind: on
      };
    };
    BRp$3.nodeIsDraggable = function(node) {
      return node && node.isNode() && !node.locked() && node.grabbable();
    };
    BRp$3.nodeIsGrabbable = function(node) {
      return this.nodeIsDraggable(node) && node.interactive();
    };
    BRp$3.load = function() {
      var r = this;
      var containerWindow = r.cy.window();
      var isSelected = function isSelected2(ele) {
        return ele.selected();
      };
      var triggerEvents = function triggerEvents2(target, names, e, position2) {
        if (target == null) {
          target = r.cy;
        }
        for (var i2 = 0; i2 < names.length; i2++) {
          var name = names[i2];
          target.emit({
            originalEvent: e,
            type: name,
            position: position2
          });
        }
      };
      var isMultSelKeyDown = function isMultSelKeyDown2(e) {
        return e.shiftKey || e.metaKey || e.ctrlKey;
      };
      var allowPanningPassthrough = function allowPanningPassthrough2(down, downs) {
        var allowPassthrough = true;
        if (r.cy.hasCompoundNodes() && down && down.pannable()) {
          for (var i2 = 0; downs && i2 < downs.length; i2++) {
            var down = downs[i2];
            if (down.isNode() && down.isParent() && !down.pannable()) {
              allowPassthrough = false;
              break;
            }
          }
        } else {
          allowPassthrough = true;
        }
        return allowPassthrough;
      };
      var setGrabbed = function setGrabbed2(ele) {
        ele[0]._private.grabbed = true;
      };
      var setFreed = function setFreed2(ele) {
        ele[0]._private.grabbed = false;
      };
      var setInDragLayer = function setInDragLayer2(ele) {
        ele[0]._private.rscratch.inDragLayer = true;
      };
      var setOutDragLayer = function setOutDragLayer2(ele) {
        ele[0]._private.rscratch.inDragLayer = false;
      };
      var setGrabTarget = function setGrabTarget2(ele) {
        ele[0]._private.rscratch.isGrabTarget = true;
      };
      var removeGrabTarget = function removeGrabTarget2(ele) {
        ele[0]._private.rscratch.isGrabTarget = false;
      };
      var addToDragList = function addToDragList2(ele, opts) {
        var list = opts.addToList;
        var listHasEle = list.has(ele);
        if (!listHasEle && ele.grabbable() && !ele.locked()) {
          list.merge(ele);
          setGrabbed(ele);
        }
      };
      var addDescendantsToDrag = function addDescendantsToDrag2(node, opts) {
        if (!node.cy().hasCompoundNodes()) {
          return;
        }
        if (opts.inDragLayer == null && opts.addToList == null) {
          return;
        }
        var innerNodes = node.descendants();
        if (opts.inDragLayer) {
          innerNodes.forEach(setInDragLayer);
          innerNodes.connectedEdges().forEach(setInDragLayer);
        }
        if (opts.addToList) {
          addToDragList(innerNodes, opts);
        }
      };
      var addNodesToDrag = function addNodesToDrag2(nodes, opts) {
        opts = opts || {};
        var hasCompoundNodes = nodes.cy().hasCompoundNodes();
        if (opts.inDragLayer) {
          nodes.forEach(setInDragLayer);
          nodes.neighborhood().stdFilter(function(ele) {
            return !hasCompoundNodes || ele.isEdge();
          }).forEach(setInDragLayer);
        }
        if (opts.addToList) {
          nodes.forEach(function(ele) {
            addToDragList(ele, opts);
          });
        }
        addDescendantsToDrag(nodes, opts);
        updateAncestorsInDragLayer(nodes, {
          inDragLayer: opts.inDragLayer
        });
        r.updateCachedGrabbedEles();
      };
      var addNodeToDrag = addNodesToDrag;
      var freeDraggedElements = function freeDraggedElements2(grabbedEles) {
        if (!grabbedEles) {
          return;
        }
        r.getCachedZSortedEles().forEach(function(ele) {
          setFreed(ele);
          setOutDragLayer(ele);
          removeGrabTarget(ele);
        });
        r.updateCachedGrabbedEles();
      };
      var updateAncestorsInDragLayer = function updateAncestorsInDragLayer2(node, opts) {
        if (opts.inDragLayer == null && opts.addToList == null) {
          return;
        }
        if (!node.cy().hasCompoundNodes()) {
          return;
        }
        var parent = node.ancestors().orphans();
        if (parent.same(node)) {
          return;
        }
        var nodes = parent.descendants().spawnSelf().merge(parent).unmerge(node).unmerge(node.descendants());
        var edges = nodes.connectedEdges();
        if (opts.inDragLayer) {
          edges.forEach(setInDragLayer);
          nodes.forEach(setInDragLayer);
        }
        if (opts.addToList) {
          nodes.forEach(function(ele) {
            addToDragList(ele, opts);
          });
        }
      };
      var blurActiveDomElement = function blurActiveDomElement2() {
        if (document.activeElement != null && document.activeElement.blur != null) {
          document.activeElement.blur();
        }
      };
      var haveMutationsApi = typeof MutationObserver !== "undefined";
      var haveResizeObserverApi = typeof ResizeObserver !== "undefined";
      if (haveMutationsApi) {
        r.removeObserver = new MutationObserver(function(mutns) {
          for (var i2 = 0; i2 < mutns.length; i2++) {
            var mutn = mutns[i2];
            var rNodes = mutn.removedNodes;
            if (rNodes) {
              for (var j = 0; j < rNodes.length; j++) {
                var rNode = rNodes[j];
                if (rNode === r.container) {
                  r.destroy();
                  break;
                }
              }
            }
          }
        });
        if (r.container.parentNode) {
          r.removeObserver.observe(r.container.parentNode, {
            childList: true
          });
        }
      } else {
        r.registerBinding(r.container, "DOMNodeRemoved", function(e) {
          r.destroy();
        });
      }
      var onResize = debounce__default["default"](function() {
        r.cy.resize();
      }, 100);
      if (haveMutationsApi) {
        r.styleObserver = new MutationObserver(onResize);
        r.styleObserver.observe(r.container, {
          attributes: true
        });
      }
      r.registerBinding(containerWindow, "resize", onResize);
      if (haveResizeObserverApi) {
        r.resizeObserver = new ResizeObserver(onResize);
        r.resizeObserver.observe(r.container);
      }
      var forEachUp = function forEachUp2(domEle, fn2) {
        while (domEle != null) {
          fn2(domEle);
          domEle = domEle.parentNode;
        }
      };
      var invalidateCoords = function invalidateCoords2() {
        r.invalidateContainerClientCoordsCache();
      };
      forEachUp(r.container, function(domEle) {
        r.registerBinding(domEle, "transitionend", invalidateCoords);
        r.registerBinding(domEle, "animationend", invalidateCoords);
        r.registerBinding(domEle, "scroll", invalidateCoords);
      });
      r.registerBinding(r.container, "contextmenu", function(e) {
        e.preventDefault();
      });
      var inBoxSelection = function inBoxSelection2() {
        return r.selection[4] !== 0;
      };
      var eventInContainer = function eventInContainer2(e) {
        var containerPageCoords = r.findContainerClientCoords();
        var x = containerPageCoords[0];
        var y = containerPageCoords[1];
        var width = containerPageCoords[2];
        var height = containerPageCoords[3];
        var positions = e.touches ? e.touches : [e];
        var atLeastOnePosInside = false;
        for (var i2 = 0; i2 < positions.length; i2++) {
          var p2 = positions[i2];
          if (x <= p2.clientX && p2.clientX <= x + width && y <= p2.clientY && p2.clientY <= y + height) {
            atLeastOnePosInside = true;
            break;
          }
        }
        if (!atLeastOnePosInside) {
          return false;
        }
        var container = r.container;
        var target = e.target;
        var tParent = target.parentNode;
        var containerIsTarget = false;
        while (tParent) {
          if (tParent === container) {
            containerIsTarget = true;
            break;
          }
          tParent = tParent.parentNode;
        }
        if (!containerIsTarget) {
          return false;
        }
        return true;
      };
      r.registerBinding(r.container, "mousedown", function mousedownHandler(e) {
        if (!eventInContainer(e)) {
          return;
        }
        e.preventDefault();
        blurActiveDomElement();
        r.hoverData.capture = true;
        r.hoverData.which = e.which;
        var cy = r.cy;
        var gpos = [e.clientX, e.clientY];
        var pos = r.projectIntoViewport(gpos[0], gpos[1]);
        var select = r.selection;
        var nears = r.findNearestElements(pos[0], pos[1], true, false);
        var near = nears[0];
        var draggedElements = r.dragData.possibleDragElements;
        r.hoverData.mdownPos = pos;
        r.hoverData.mdownGPos = gpos;
        var checkForTaphold = function checkForTaphold2() {
          r.hoverData.tapholdCancelled = false;
          clearTimeout(r.hoverData.tapholdTimeout);
          r.hoverData.tapholdTimeout = setTimeout(function() {
            if (r.hoverData.tapholdCancelled) {
              return;
            } else {
              var ele = r.hoverData.down;
              if (ele) {
                ele.emit({
                  originalEvent: e,
                  type: "taphold",
                  position: {
                    x: pos[0],
                    y: pos[1]
                  }
                });
              } else {
                cy.emit({
                  originalEvent: e,
                  type: "taphold",
                  position: {
                    x: pos[0],
                    y: pos[1]
                  }
                });
              }
            }
          }, r.tapholdDuration);
        };
        if (e.which == 3) {
          r.hoverData.cxtStarted = true;
          var cxtEvt = {
            originalEvent: e,
            type: "cxttapstart",
            position: {
              x: pos[0],
              y: pos[1]
            }
          };
          if (near) {
            near.activate();
            near.emit(cxtEvt);
            r.hoverData.down = near;
          } else {
            cy.emit(cxtEvt);
          }
          r.hoverData.downTime = (/* @__PURE__ */ new Date()).getTime();
          r.hoverData.cxtDragged = false;
        } else if (e.which == 1) {
          if (near) {
            near.activate();
          }
          {
            if (near != null) {
              if (r.nodeIsGrabbable(near)) {
                var makeEvent = function makeEvent2(type) {
                  return {
                    originalEvent: e,
                    type,
                    position: {
                      x: pos[0],
                      y: pos[1]
                    }
                  };
                };
                var triggerGrab = function triggerGrab2(ele) {
                  ele.emit(makeEvent("grab"));
                };
                setGrabTarget(near);
                if (!near.selected()) {
                  draggedElements = r.dragData.possibleDragElements = cy.collection();
                  addNodeToDrag(near, {
                    addToList: draggedElements
                  });
                  near.emit(makeEvent("grabon")).emit(makeEvent("grab"));
                } else {
                  draggedElements = r.dragData.possibleDragElements = cy.collection();
                  var selectedNodes = cy.$(function(ele) {
                    return ele.isNode() && ele.selected() && r.nodeIsGrabbable(ele);
                  });
                  addNodesToDrag(selectedNodes, {
                    addToList: draggedElements
                  });
                  near.emit(makeEvent("grabon"));
                  selectedNodes.forEach(triggerGrab);
                }
                r.redrawHint("eles", true);
                r.redrawHint("drag", true);
              }
            }
            r.hoverData.down = near;
            r.hoverData.downs = nears;
            r.hoverData.downTime = (/* @__PURE__ */ new Date()).getTime();
          }
          triggerEvents(near, ["mousedown", "tapstart", "vmousedown"], e, {
            x: pos[0],
            y: pos[1]
          });
          if (near == null) {
            select[4] = 1;
            r.data.bgActivePosistion = {
              x: pos[0],
              y: pos[1]
            };
            r.redrawHint("select", true);
            r.redraw();
          } else if (near.pannable()) {
            select[4] = 1;
          }
          checkForTaphold();
        }
        select[0] = select[2] = pos[0];
        select[1] = select[3] = pos[1];
      }, false);
      r.registerBinding(containerWindow, "mousemove", function mousemoveHandler(e) {
        var capture = r.hoverData.capture;
        if (!capture && !eventInContainer(e)) {
          return;
        }
        var preventDefault = false;
        var cy = r.cy;
        var zoom = cy.zoom();
        var gpos = [e.clientX, e.clientY];
        var pos = r.projectIntoViewport(gpos[0], gpos[1]);
        var mdownPos = r.hoverData.mdownPos;
        var mdownGPos = r.hoverData.mdownGPos;
        var select = r.selection;
        var near = null;
        if (!r.hoverData.draggingEles && !r.hoverData.dragging && !r.hoverData.selecting) {
          near = r.findNearestElement(pos[0], pos[1], true, false);
        }
        var last = r.hoverData.last;
        var down = r.hoverData.down;
        var disp = [pos[0] - select[2], pos[1] - select[3]];
        var draggedElements = r.dragData.possibleDragElements;
        var isOverThresholdDrag;
        if (mdownGPos) {
          var dx = gpos[0] - mdownGPos[0];
          var dx2 = dx * dx;
          var dy = gpos[1] - mdownGPos[1];
          var dy2 = dy * dy;
          var dist2 = dx2 + dy2;
          r.hoverData.isOverThresholdDrag = isOverThresholdDrag = dist2 >= r.desktopTapThreshold2;
        }
        var multSelKeyDown = isMultSelKeyDown(e);
        if (isOverThresholdDrag) {
          r.hoverData.tapholdCancelled = true;
        }
        var updateDragDelta = function updateDragDelta2() {
          var dragDelta2 = r.hoverData.dragDelta = r.hoverData.dragDelta || [];
          if (dragDelta2.length === 0) {
            dragDelta2.push(disp[0]);
            dragDelta2.push(disp[1]);
          } else {
            dragDelta2[0] += disp[0];
            dragDelta2[1] += disp[1];
          }
        };
        preventDefault = true;
        triggerEvents(near, ["mousemove", "vmousemove", "tapdrag"], e, {
          x: pos[0],
          y: pos[1]
        });
        var goIntoBoxMode = function goIntoBoxMode2() {
          r.data.bgActivePosistion = void 0;
          if (!r.hoverData.selecting) {
            cy.emit({
              originalEvent: e,
              type: "boxstart",
              position: {
                x: pos[0],
                y: pos[1]
              }
            });
          }
          select[4] = 1;
          r.hoverData.selecting = true;
          r.redrawHint("select", true);
          r.redraw();
        };
        if (r.hoverData.which === 3) {
          if (isOverThresholdDrag) {
            var cxtEvt = {
              originalEvent: e,
              type: "cxtdrag",
              position: {
                x: pos[0],
                y: pos[1]
              }
            };
            if (down) {
              down.emit(cxtEvt);
            } else {
              cy.emit(cxtEvt);
            }
            r.hoverData.cxtDragged = true;
            if (!r.hoverData.cxtOver || near !== r.hoverData.cxtOver) {
              if (r.hoverData.cxtOver) {
                r.hoverData.cxtOver.emit({
                  originalEvent: e,
                  type: "cxtdragout",
                  position: {
                    x: pos[0],
                    y: pos[1]
                  }
                });
              }
              r.hoverData.cxtOver = near;
              if (near) {
                near.emit({
                  originalEvent: e,
                  type: "cxtdragover",
                  position: {
                    x: pos[0],
                    y: pos[1]
                  }
                });
              }
            }
          }
        } else if (r.hoverData.dragging) {
          preventDefault = true;
          if (cy.panningEnabled() && cy.userPanningEnabled()) {
            var deltaP;
            if (r.hoverData.justStartedPan) {
              var mdPos = r.hoverData.mdownPos;
              deltaP = {
                x: (pos[0] - mdPos[0]) * zoom,
                y: (pos[1] - mdPos[1]) * zoom
              };
              r.hoverData.justStartedPan = false;
            } else {
              deltaP = {
                x: disp[0] * zoom,
                y: disp[1] * zoom
              };
            }
            cy.panBy(deltaP);
            cy.emit("dragpan");
            r.hoverData.dragged = true;
          }
          pos = r.projectIntoViewport(e.clientX, e.clientY);
        } else if (select[4] == 1 && (down == null || down.pannable())) {
          if (isOverThresholdDrag) {
            if (!r.hoverData.dragging && cy.boxSelectionEnabled() && (multSelKeyDown || !cy.panningEnabled() || !cy.userPanningEnabled())) {
              goIntoBoxMode();
            } else if (!r.hoverData.selecting && cy.panningEnabled() && cy.userPanningEnabled()) {
              var allowPassthrough = allowPanningPassthrough(down, r.hoverData.downs);
              if (allowPassthrough) {
                r.hoverData.dragging = true;
                r.hoverData.justStartedPan = true;
                select[4] = 0;
                r.data.bgActivePosistion = array2point(mdownPos);
                r.redrawHint("select", true);
                r.redraw();
              }
            }
            if (down && down.pannable() && down.active()) {
              down.unactivate();
            }
          }
        } else {
          if (down && down.pannable() && down.active()) {
            down.unactivate();
          }
          if ((!down || !down.grabbed()) && near != last) {
            if (last) {
              triggerEvents(last, ["mouseout", "tapdragout"], e, {
                x: pos[0],
                y: pos[1]
              });
            }
            if (near) {
              triggerEvents(near, ["mouseover", "tapdragover"], e, {
                x: pos[0],
                y: pos[1]
              });
            }
            r.hoverData.last = near;
          }
          if (down) {
            if (isOverThresholdDrag) {
              if (cy.boxSelectionEnabled() && multSelKeyDown) {
                if (down && down.grabbed()) {
                  freeDraggedElements(draggedElements);
                  down.emit("freeon");
                  draggedElements.emit("free");
                  if (r.dragData.didDrag) {
                    down.emit("dragfreeon");
                    draggedElements.emit("dragfree");
                  }
                }
                goIntoBoxMode();
              } else if (down && down.grabbed() && r.nodeIsDraggable(down)) {
                var justStartedDrag = !r.dragData.didDrag;
                if (justStartedDrag) {
                  r.redrawHint("eles", true);
                }
                r.dragData.didDrag = true;
                if (!r.hoverData.draggingEles) {
                  addNodesToDrag(draggedElements, {
                    inDragLayer: true
                  });
                }
                var totalShift = {
                  x: 0,
                  y: 0
                };
                if (number$1(disp[0]) && number$1(disp[1])) {
                  totalShift.x += disp[0];
                  totalShift.y += disp[1];
                  if (justStartedDrag) {
                    var dragDelta = r.hoverData.dragDelta;
                    if (dragDelta && number$1(dragDelta[0]) && number$1(dragDelta[1])) {
                      totalShift.x += dragDelta[0];
                      totalShift.y += dragDelta[1];
                    }
                  }
                }
                r.hoverData.draggingEles = true;
                draggedElements.silentShift(totalShift).emit("position drag");
                r.redrawHint("drag", true);
                r.redraw();
              }
            } else {
              updateDragDelta();
            }
          }
          preventDefault = true;
        }
        select[2] = pos[0];
        select[3] = pos[1];
        if (preventDefault) {
          if (e.stopPropagation) e.stopPropagation();
          if (e.preventDefault) e.preventDefault();
          return false;
        }
      }, false);
      var clickTimeout, didDoubleClick, prevClickTimeStamp;
      r.registerBinding(containerWindow, "mouseup", function mouseupHandler(e) {
        var capture = r.hoverData.capture;
        if (!capture) {
          return;
        }
        r.hoverData.capture = false;
        var cy = r.cy;
        var pos = r.projectIntoViewport(e.clientX, e.clientY);
        var select = r.selection;
        var near = r.findNearestElement(pos[0], pos[1], true, false);
        var draggedElements = r.dragData.possibleDragElements;
        var down = r.hoverData.down;
        var multSelKeyDown = isMultSelKeyDown(e);
        if (r.data.bgActivePosistion) {
          r.redrawHint("select", true);
          r.redraw();
        }
        r.hoverData.tapholdCancelled = true;
        r.data.bgActivePosistion = void 0;
        if (down) {
          down.unactivate();
        }
        if (r.hoverData.which === 3) {
          var cxtEvt = {
            originalEvent: e,
            type: "cxttapend",
            position: {
              x: pos[0],
              y: pos[1]
            }
          };
          if (down) {
            down.emit(cxtEvt);
          } else {
            cy.emit(cxtEvt);
          }
          if (!r.hoverData.cxtDragged) {
            var cxtTap = {
              originalEvent: e,
              type: "cxttap",
              position: {
                x: pos[0],
                y: pos[1]
              }
            };
            if (down) {
              down.emit(cxtTap);
            } else {
              cy.emit(cxtTap);
            }
          }
          r.hoverData.cxtDragged = false;
          r.hoverData.which = null;
        } else if (r.hoverData.which === 1) {
          triggerEvents(near, ["mouseup", "tapend", "vmouseup"], e, {
            x: pos[0],
            y: pos[1]
          });
          if (!r.dragData.didDrag && // didn't move a node around
          !r.hoverData.dragged && // didn't pan
          !r.hoverData.selecting && // not box selection
          !r.hoverData.isOverThresholdDrag) {
            triggerEvents(down, ["click", "tap", "vclick"], e, {
              x: pos[0],
              y: pos[1]
            });
            didDoubleClick = false;
            if (e.timeStamp - prevClickTimeStamp <= cy.multiClickDebounceTime()) {
              clickTimeout && clearTimeout(clickTimeout);
              didDoubleClick = true;
              prevClickTimeStamp = null;
              triggerEvents(down, ["dblclick", "dbltap", "vdblclick"], e, {
                x: pos[0],
                y: pos[1]
              });
            } else {
              clickTimeout = setTimeout(function() {
                if (didDoubleClick) return;
                triggerEvents(down, ["oneclick", "onetap", "voneclick"], e, {
                  x: pos[0],
                  y: pos[1]
                });
              }, cy.multiClickDebounceTime());
              prevClickTimeStamp = e.timeStamp;
            }
          }
          if (down == null && !r.dragData.didDrag && !r.hoverData.selecting && !r.hoverData.dragged && !isMultSelKeyDown(e)) {
            cy.$(isSelected).unselect(["tapunselect"]);
            if (draggedElements.length > 0) {
              r.redrawHint("eles", true);
            }
            r.dragData.possibleDragElements = draggedElements = cy.collection();
          }
          if (near == down && !r.dragData.didDrag && !r.hoverData.selecting) {
            if (near != null && near._private.selectable) {
              if (r.hoverData.dragging) ;
              else if (cy.selectionType() === "additive" || multSelKeyDown) {
                if (near.selected()) {
                  near.unselect(["tapunselect"]);
                } else {
                  near.select(["tapselect"]);
                }
              } else {
                if (!multSelKeyDown) {
                  cy.$(isSelected).unmerge(near).unselect(["tapunselect"]);
                  near.select(["tapselect"]);
                }
              }
              r.redrawHint("eles", true);
            }
          }
          if (r.hoverData.selecting) {
            var box = cy.collection(r.getAllInBox(select[0], select[1], select[2], select[3]));
            r.redrawHint("select", true);
            if (box.length > 0) {
              r.redrawHint("eles", true);
            }
            cy.emit({
              type: "boxend",
              originalEvent: e,
              position: {
                x: pos[0],
                y: pos[1]
              }
            });
            var eleWouldBeSelected = function eleWouldBeSelected2(ele) {
              return ele.selectable() && !ele.selected();
            };
            if (cy.selectionType() === "additive") {
              box.emit("box").stdFilter(eleWouldBeSelected).select().emit("boxselect");
            } else {
              if (!multSelKeyDown) {
                cy.$(isSelected).unmerge(box).unselect();
              }
              box.emit("box").stdFilter(eleWouldBeSelected).select().emit("boxselect");
            }
            r.redraw();
          }
          if (r.hoverData.dragging) {
            r.hoverData.dragging = false;
            r.redrawHint("select", true);
            r.redrawHint("eles", true);
            r.redraw();
          }
          if (!select[4]) {
            r.redrawHint("drag", true);
            r.redrawHint("eles", true);
            var downWasGrabbed = down && down.grabbed();
            freeDraggedElements(draggedElements);
            if (downWasGrabbed) {
              down.emit("freeon");
              draggedElements.emit("free");
              if (r.dragData.didDrag) {
                down.emit("dragfreeon");
                draggedElements.emit("dragfree");
              }
            }
          }
        }
        select[4] = 0;
        r.hoverData.down = null;
        r.hoverData.cxtStarted = false;
        r.hoverData.draggingEles = false;
        r.hoverData.selecting = false;
        r.hoverData.isOverThresholdDrag = false;
        r.dragData.didDrag = false;
        r.hoverData.dragged = false;
        r.hoverData.dragDelta = [];
        r.hoverData.mdownPos = null;
        r.hoverData.mdownGPos = null;
      }, false);
      var wheelHandler = function wheelHandler2(e) {
        if (r.scrollingPage) {
          return;
        }
        var cy = r.cy;
        var zoom = cy.zoom();
        var pan = cy.pan();
        var pos = r.projectIntoViewport(e.clientX, e.clientY);
        var rpos = [pos[0] * zoom + pan.x, pos[1] * zoom + pan.y];
        if (r.hoverData.draggingEles || r.hoverData.dragging || r.hoverData.cxtStarted || inBoxSelection()) {
          e.preventDefault();
          return;
        }
        if (cy.panningEnabled() && cy.userPanningEnabled() && cy.zoomingEnabled() && cy.userZoomingEnabled()) {
          e.preventDefault();
          r.data.wheelZooming = true;
          clearTimeout(r.data.wheelTimeout);
          r.data.wheelTimeout = setTimeout(function() {
            r.data.wheelZooming = false;
            r.redrawHint("eles", true);
            r.redraw();
          }, 150);
          var diff;
          if (e.deltaY != null) {
            diff = e.deltaY / -250;
          } else if (e.wheelDeltaY != null) {
            diff = e.wheelDeltaY / 1e3;
          } else {
            diff = e.wheelDelta / 1e3;
          }
          diff = diff * r.wheelSensitivity;
          var needsWheelFix = e.deltaMode === 1;
          if (needsWheelFix) {
            diff *= 33;
          }
          var newZoom = cy.zoom() * Math.pow(10, diff);
          if (e.type === "gesturechange") {
            newZoom = r.gestureStartZoom * e.scale;
          }
          cy.zoom({
            level: newZoom,
            renderedPosition: {
              x: rpos[0],
              y: rpos[1]
            }
          });
          cy.emit(e.type === "gesturechange" ? "pinchzoom" : "scrollzoom");
        }
      };
      r.registerBinding(r.container, "wheel", wheelHandler, true);
      r.registerBinding(containerWindow, "scroll", function scrollHandler(e) {
        r.scrollingPage = true;
        clearTimeout(r.scrollingPageTimeout);
        r.scrollingPageTimeout = setTimeout(function() {
          r.scrollingPage = false;
        }, 250);
      }, true);
      r.registerBinding(r.container, "gesturestart", function gestureStartHandler(e) {
        r.gestureStartZoom = r.cy.zoom();
        if (!r.hasTouchStarted) {
          e.preventDefault();
        }
      }, true);
      r.registerBinding(r.container, "gesturechange", function(e) {
        if (!r.hasTouchStarted) {
          wheelHandler(e);
        }
      }, true);
      r.registerBinding(r.container, "mouseout", function mouseOutHandler(e) {
        var pos = r.projectIntoViewport(e.clientX, e.clientY);
        r.cy.emit({
          originalEvent: e,
          type: "mouseout",
          position: {
            x: pos[0],
            y: pos[1]
          }
        });
      }, false);
      r.registerBinding(r.container, "mouseover", function mouseOverHandler(e) {
        var pos = r.projectIntoViewport(e.clientX, e.clientY);
        r.cy.emit({
          originalEvent: e,
          type: "mouseover",
          position: {
            x: pos[0],
            y: pos[1]
          }
        });
      }, false);
      var f1x1, f1y1, f2x1, f2y1;
      var distance1, distance1Sq;
      var center1, modelCenter1;
      var offsetLeft, offsetTop;
      var containerWidth, containerHeight;
      var twoFingersStartInside;
      var distance = function distance2(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      };
      var distanceSq = function distanceSq2(x1, y1, x2, y2) {
        return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
      };
      var touchstartHandler;
      r.registerBinding(r.container, "touchstart", touchstartHandler = function touchstartHandler2(e) {
        r.hasTouchStarted = true;
        if (!eventInContainer(e)) {
          return;
        }
        blurActiveDomElement();
        r.touchData.capture = true;
        r.data.bgActivePosistion = void 0;
        var cy = r.cy;
        var now = r.touchData.now;
        var earlier = r.touchData.earlier;
        if (e.touches[0]) {
          var pos = r.projectIntoViewport(e.touches[0].clientX, e.touches[0].clientY);
          now[0] = pos[0];
          now[1] = pos[1];
        }
        if (e.touches[1]) {
          var pos = r.projectIntoViewport(e.touches[1].clientX, e.touches[1].clientY);
          now[2] = pos[0];
          now[3] = pos[1];
        }
        if (e.touches[2]) {
          var pos = r.projectIntoViewport(e.touches[2].clientX, e.touches[2].clientY);
          now[4] = pos[0];
          now[5] = pos[1];
        }
        if (e.touches[1]) {
          r.touchData.singleTouchMoved = true;
          freeDraggedElements(r.dragData.touchDragEles);
          var offsets = r.findContainerClientCoords();
          offsetLeft = offsets[0];
          offsetTop = offsets[1];
          containerWidth = offsets[2];
          containerHeight = offsets[3];
          f1x1 = e.touches[0].clientX - offsetLeft;
          f1y1 = e.touches[0].clientY - offsetTop;
          f2x1 = e.touches[1].clientX - offsetLeft;
          f2y1 = e.touches[1].clientY - offsetTop;
          twoFingersStartInside = 0 <= f1x1 && f1x1 <= containerWidth && 0 <= f2x1 && f2x1 <= containerWidth && 0 <= f1y1 && f1y1 <= containerHeight && 0 <= f2y1 && f2y1 <= containerHeight;
          var pan = cy.pan();
          var zoom = cy.zoom();
          distance1 = distance(f1x1, f1y1, f2x1, f2y1);
          distance1Sq = distanceSq(f1x1, f1y1, f2x1, f2y1);
          center1 = [(f1x1 + f2x1) / 2, (f1y1 + f2y1) / 2];
          modelCenter1 = [(center1[0] - pan.x) / zoom, (center1[1] - pan.y) / zoom];
          var cxtDistThreshold = 200;
          var cxtDistThresholdSq = cxtDistThreshold * cxtDistThreshold;
          if (distance1Sq < cxtDistThresholdSq && !e.touches[2]) {
            var near1 = r.findNearestElement(now[0], now[1], true, true);
            var near2 = r.findNearestElement(now[2], now[3], true, true);
            if (near1 && near1.isNode()) {
              near1.activate().emit({
                originalEvent: e,
                type: "cxttapstart",
                position: {
                  x: now[0],
                  y: now[1]
                }
              });
              r.touchData.start = near1;
            } else if (near2 && near2.isNode()) {
              near2.activate().emit({
                originalEvent: e,
                type: "cxttapstart",
                position: {
                  x: now[0],
                  y: now[1]
                }
              });
              r.touchData.start = near2;
            } else {
              cy.emit({
                originalEvent: e,
                type: "cxttapstart",
                position: {
                  x: now[0],
                  y: now[1]
                }
              });
            }
            if (r.touchData.start) {
              r.touchData.start._private.grabbed = false;
            }
            r.touchData.cxt = true;
            r.touchData.cxtDragged = false;
            r.data.bgActivePosistion = void 0;
            r.redraw();
            return;
          }
        }
        if (e.touches[2]) {
          if (cy.boxSelectionEnabled()) {
            e.preventDefault();
          }
        } else if (e.touches[1]) ;
        else if (e.touches[0]) {
          var nears = r.findNearestElements(now[0], now[1], true, true);
          var near = nears[0];
          if (near != null) {
            near.activate();
            r.touchData.start = near;
            r.touchData.starts = nears;
            if (r.nodeIsGrabbable(near)) {
              var draggedEles = r.dragData.touchDragEles = cy.collection();
              var selectedNodes = null;
              r.redrawHint("eles", true);
              r.redrawHint("drag", true);
              if (near.selected()) {
                selectedNodes = cy.$(function(ele) {
                  return ele.selected() && r.nodeIsGrabbable(ele);
                });
                addNodesToDrag(selectedNodes, {
                  addToList: draggedEles
                });
              } else {
                addNodeToDrag(near, {
                  addToList: draggedEles
                });
              }
              setGrabTarget(near);
              var makeEvent = function makeEvent2(type) {
                return {
                  originalEvent: e,
                  type,
                  position: {
                    x: now[0],
                    y: now[1]
                  }
                };
              };
              near.emit(makeEvent("grabon"));
              if (selectedNodes) {
                selectedNodes.forEach(function(n) {
                  n.emit(makeEvent("grab"));
                });
              } else {
                near.emit(makeEvent("grab"));
              }
            }
          }
          triggerEvents(near, ["touchstart", "tapstart", "vmousedown"], e, {
            x: now[0],
            y: now[1]
          });
          if (near == null) {
            r.data.bgActivePosistion = {
              x: pos[0],
              y: pos[1]
            };
            r.redrawHint("select", true);
            r.redraw();
          }
          r.touchData.singleTouchMoved = false;
          r.touchData.singleTouchStartTime = +/* @__PURE__ */ new Date();
          clearTimeout(r.touchData.tapholdTimeout);
          r.touchData.tapholdTimeout = setTimeout(function() {
            if (r.touchData.singleTouchMoved === false && !r.pinching && !r.touchData.selecting) {
              triggerEvents(r.touchData.start, ["taphold"], e, {
                x: now[0],
                y: now[1]
              });
            }
          }, r.tapholdDuration);
        }
        if (e.touches.length >= 1) {
          var sPos = r.touchData.startPosition = [null, null, null, null, null, null];
          for (var i2 = 0; i2 < now.length; i2++) {
            sPos[i2] = earlier[i2] = now[i2];
          }
          var touch0 = e.touches[0];
          r.touchData.startGPosition = [touch0.clientX, touch0.clientY];
        }
      }, false);
      var touchmoveHandler;
      r.registerBinding(window, "touchmove", touchmoveHandler = function touchmoveHandler2(e) {
        var capture = r.touchData.capture;
        if (!capture && !eventInContainer(e)) {
          return;
        }
        var select = r.selection;
        var cy = r.cy;
        var now = r.touchData.now;
        var earlier = r.touchData.earlier;
        var zoom = cy.zoom();
        if (e.touches[0]) {
          var pos = r.projectIntoViewport(e.touches[0].clientX, e.touches[0].clientY);
          now[0] = pos[0];
          now[1] = pos[1];
        }
        if (e.touches[1]) {
          var pos = r.projectIntoViewport(e.touches[1].clientX, e.touches[1].clientY);
          now[2] = pos[0];
          now[3] = pos[1];
        }
        if (e.touches[2]) {
          var pos = r.projectIntoViewport(e.touches[2].clientX, e.touches[2].clientY);
          now[4] = pos[0];
          now[5] = pos[1];
        }
        var startGPos = r.touchData.startGPosition;
        var isOverThresholdDrag;
        if (capture && e.touches[0] && startGPos) {
          var disp = [];
          for (var j = 0; j < now.length; j++) {
            disp[j] = now[j] - earlier[j];
          }
          var dx = e.touches[0].clientX - startGPos[0];
          var dx2 = dx * dx;
          var dy = e.touches[0].clientY - startGPos[1];
          var dy2 = dy * dy;
          var dist2 = dx2 + dy2;
          isOverThresholdDrag = dist2 >= r.touchTapThreshold2;
        }
        if (capture && r.touchData.cxt) {
          e.preventDefault();
          var f1x2 = e.touches[0].clientX - offsetLeft, f1y2 = e.touches[0].clientY - offsetTop;
          var f2x2 = e.touches[1].clientX - offsetLeft, f2y2 = e.touches[1].clientY - offsetTop;
          var distance2Sq = distanceSq(f1x2, f1y2, f2x2, f2y2);
          var factorSq = distance2Sq / distance1Sq;
          var distThreshold = 150;
          var distThresholdSq = distThreshold * distThreshold;
          var factorThreshold = 1.5;
          var factorThresholdSq = factorThreshold * factorThreshold;
          if (factorSq >= factorThresholdSq || distance2Sq >= distThresholdSq) {
            r.touchData.cxt = false;
            r.data.bgActivePosistion = void 0;
            r.redrawHint("select", true);
            var cxtEvt = {
              originalEvent: e,
              type: "cxttapend",
              position: {
                x: now[0],
                y: now[1]
              }
            };
            if (r.touchData.start) {
              r.touchData.start.unactivate().emit(cxtEvt);
              r.touchData.start = null;
            } else {
              cy.emit(cxtEvt);
            }
          }
        }
        if (capture && r.touchData.cxt) {
          var cxtEvt = {
            originalEvent: e,
            type: "cxtdrag",
            position: {
              x: now[0],
              y: now[1]
            }
          };
          r.data.bgActivePosistion = void 0;
          r.redrawHint("select", true);
          if (r.touchData.start) {
            r.touchData.start.emit(cxtEvt);
          } else {
            cy.emit(cxtEvt);
          }
          if (r.touchData.start) {
            r.touchData.start._private.grabbed = false;
          }
          r.touchData.cxtDragged = true;
          var near = r.findNearestElement(now[0], now[1], true, true);
          if (!r.touchData.cxtOver || near !== r.touchData.cxtOver) {
            if (r.touchData.cxtOver) {
              r.touchData.cxtOver.emit({
                originalEvent: e,
                type: "cxtdragout",
                position: {
                  x: now[0],
                  y: now[1]
                }
              });
            }
            r.touchData.cxtOver = near;
            if (near) {
              near.emit({
                originalEvent: e,
                type: "cxtdragover",
                position: {
                  x: now[0],
                  y: now[1]
                }
              });
            }
          }
        } else if (capture && e.touches[2] && cy.boxSelectionEnabled()) {
          e.preventDefault();
          r.data.bgActivePosistion = void 0;
          this.lastThreeTouch = +/* @__PURE__ */ new Date();
          if (!r.touchData.selecting) {
            cy.emit({
              originalEvent: e,
              type: "boxstart",
              position: {
                x: now[0],
                y: now[1]
              }
            });
          }
          r.touchData.selecting = true;
          r.touchData.didSelect = true;
          select[4] = 1;
          if (!select || select.length === 0 || select[0] === void 0) {
            select[0] = (now[0] + now[2] + now[4]) / 3;
            select[1] = (now[1] + now[3] + now[5]) / 3;
            select[2] = (now[0] + now[2] + now[4]) / 3 + 1;
            select[3] = (now[1] + now[3] + now[5]) / 3 + 1;
          } else {
            select[2] = (now[0] + now[2] + now[4]) / 3;
            select[3] = (now[1] + now[3] + now[5]) / 3;
          }
          r.redrawHint("select", true);
          r.redraw();
        } else if (capture && e.touches[1] && !r.touchData.didSelect && cy.zoomingEnabled() && cy.panningEnabled() && cy.userZoomingEnabled() && cy.userPanningEnabled()) {
          e.preventDefault();
          r.data.bgActivePosistion = void 0;
          r.redrawHint("select", true);
          var draggedEles = r.dragData.touchDragEles;
          if (draggedEles) {
            r.redrawHint("drag", true);
            for (var i2 = 0; i2 < draggedEles.length; i2++) {
              var de_p = draggedEles[i2]._private;
              de_p.grabbed = false;
              de_p.rscratch.inDragLayer = false;
            }
          }
          var _start = r.touchData.start;
          var f1x2 = e.touches[0].clientX - offsetLeft, f1y2 = e.touches[0].clientY - offsetTop;
          var f2x2 = e.touches[1].clientX - offsetLeft, f2y2 = e.touches[1].clientY - offsetTop;
          var distance2 = distance(f1x2, f1y2, f2x2, f2y2);
          var factor = distance2 / distance1;
          if (twoFingersStartInside) {
            var df1x = f1x2 - f1x1;
            var df1y = f1y2 - f1y1;
            var df2x = f2x2 - f2x1;
            var df2y = f2y2 - f2y1;
            var tx = (df1x + df2x) / 2;
            var ty = (df1y + df2y) / 2;
            var zoom1 = cy.zoom();
            var zoom2 = zoom1 * factor;
            var pan1 = cy.pan();
            var ctrx = modelCenter1[0] * zoom1 + pan1.x;
            var ctry = modelCenter1[1] * zoom1 + pan1.y;
            var pan2 = {
              x: -zoom2 / zoom1 * (ctrx - pan1.x - tx) + ctrx,
              y: -zoom2 / zoom1 * (ctry - pan1.y - ty) + ctry
            };
            if (_start && _start.active()) {
              var draggedEles = r.dragData.touchDragEles;
              freeDraggedElements(draggedEles);
              r.redrawHint("drag", true);
              r.redrawHint("eles", true);
              _start.unactivate().emit("freeon");
              draggedEles.emit("free");
              if (r.dragData.didDrag) {
                _start.emit("dragfreeon");
                draggedEles.emit("dragfree");
              }
            }
            cy.viewport({
              zoom: zoom2,
              pan: pan2,
              cancelOnFailedZoom: true
            });
            cy.emit("pinchzoom");
            distance1 = distance2;
            f1x1 = f1x2;
            f1y1 = f1y2;
            f2x1 = f2x2;
            f2y1 = f2y2;
            r.pinching = true;
          }
          if (e.touches[0]) {
            var pos = r.projectIntoViewport(e.touches[0].clientX, e.touches[0].clientY);
            now[0] = pos[0];
            now[1] = pos[1];
          }
          if (e.touches[1]) {
            var pos = r.projectIntoViewport(e.touches[1].clientX, e.touches[1].clientY);
            now[2] = pos[0];
            now[3] = pos[1];
          }
          if (e.touches[2]) {
            var pos = r.projectIntoViewport(e.touches[2].clientX, e.touches[2].clientY);
            now[4] = pos[0];
            now[5] = pos[1];
          }
        } else if (e.touches[0] && !r.touchData.didSelect) {
          var start = r.touchData.start;
          var last = r.touchData.last;
          var near;
          if (!r.hoverData.draggingEles && !r.swipePanning) {
            near = r.findNearestElement(now[0], now[1], true, true);
          }
          if (capture && start != null) {
            e.preventDefault();
          }
          if (capture && start != null && r.nodeIsDraggable(start)) {
            if (isOverThresholdDrag) {
              var draggedEles = r.dragData.touchDragEles;
              var justStartedDrag = !r.dragData.didDrag;
              if (justStartedDrag) {
                addNodesToDrag(draggedEles, {
                  inDragLayer: true
                });
              }
              r.dragData.didDrag = true;
              var totalShift = {
                x: 0,
                y: 0
              };
              if (number$1(disp[0]) && number$1(disp[1])) {
                totalShift.x += disp[0];
                totalShift.y += disp[1];
                if (justStartedDrag) {
                  r.redrawHint("eles", true);
                  var dragDelta = r.touchData.dragDelta;
                  if (dragDelta && number$1(dragDelta[0]) && number$1(dragDelta[1])) {
                    totalShift.x += dragDelta[0];
                    totalShift.y += dragDelta[1];
                  }
                }
              }
              r.hoverData.draggingEles = true;
              draggedEles.silentShift(totalShift).emit("position drag");
              r.redrawHint("drag", true);
              if (r.touchData.startPosition[0] == earlier[0] && r.touchData.startPosition[1] == earlier[1]) {
                r.redrawHint("eles", true);
              }
              r.redraw();
            } else {
              var dragDelta = r.touchData.dragDelta = r.touchData.dragDelta || [];
              if (dragDelta.length === 0) {
                dragDelta.push(disp[0]);
                dragDelta.push(disp[1]);
              } else {
                dragDelta[0] += disp[0];
                dragDelta[1] += disp[1];
              }
            }
          }
          {
            triggerEvents(start || near, ["touchmove", "tapdrag", "vmousemove"], e, {
              x: now[0],
              y: now[1]
            });
            if ((!start || !start.grabbed()) && near != last) {
              if (last) {
                last.emit({
                  originalEvent: e,
                  type: "tapdragout",
                  position: {
                    x: now[0],
                    y: now[1]
                  }
                });
              }
              if (near) {
                near.emit({
                  originalEvent: e,
                  type: "tapdragover",
                  position: {
                    x: now[0],
                    y: now[1]
                  }
                });
              }
            }
            r.touchData.last = near;
          }
          if (capture) {
            for (var i2 = 0; i2 < now.length; i2++) {
              if (now[i2] && r.touchData.startPosition[i2] && isOverThresholdDrag) {
                r.touchData.singleTouchMoved = true;
              }
            }
          }
          if (capture && (start == null || start.pannable()) && cy.panningEnabled() && cy.userPanningEnabled()) {
            var allowPassthrough = allowPanningPassthrough(start, r.touchData.starts);
            if (allowPassthrough) {
              e.preventDefault();
              if (!r.data.bgActivePosistion) {
                r.data.bgActivePosistion = array2point(r.touchData.startPosition);
              }
              if (r.swipePanning) {
                cy.panBy({
                  x: disp[0] * zoom,
                  y: disp[1] * zoom
                });
                cy.emit("dragpan");
              } else if (isOverThresholdDrag) {
                r.swipePanning = true;
                cy.panBy({
                  x: dx * zoom,
                  y: dy * zoom
                });
                cy.emit("dragpan");
                if (start) {
                  start.unactivate();
                  r.redrawHint("select", true);
                  r.touchData.start = null;
                }
              }
            }
            var pos = r.projectIntoViewport(e.touches[0].clientX, e.touches[0].clientY);
            now[0] = pos[0];
            now[1] = pos[1];
          }
        }
        for (var j = 0; j < now.length; j++) {
          earlier[j] = now[j];
        }
        if (capture && e.touches.length > 0 && !r.hoverData.draggingEles && !r.swipePanning && r.data.bgActivePosistion != null) {
          r.data.bgActivePosistion = void 0;
          r.redrawHint("select", true);
          r.redraw();
        }
      }, false);
      var touchcancelHandler;
      r.registerBinding(containerWindow, "touchcancel", touchcancelHandler = function touchcancelHandler2(e) {
        var start = r.touchData.start;
        r.touchData.capture = false;
        if (start) {
          start.unactivate();
        }
      });
      var touchendHandler, didDoubleTouch, touchTimeout, prevTouchTimeStamp;
      r.registerBinding(containerWindow, "touchend", touchendHandler = function touchendHandler2(e) {
        var start = r.touchData.start;
        var capture = r.touchData.capture;
        if (capture) {
          if (e.touches.length === 0) {
            r.touchData.capture = false;
          }
          e.preventDefault();
        } else {
          return;
        }
        var select = r.selection;
        r.swipePanning = false;
        r.hoverData.draggingEles = false;
        var cy = r.cy;
        var zoom = cy.zoom();
        var now = r.touchData.now;
        var earlier = r.touchData.earlier;
        if (e.touches[0]) {
          var pos = r.projectIntoViewport(e.touches[0].clientX, e.touches[0].clientY);
          now[0] = pos[0];
          now[1] = pos[1];
        }
        if (e.touches[1]) {
          var pos = r.projectIntoViewport(e.touches[1].clientX, e.touches[1].clientY);
          now[2] = pos[0];
          now[3] = pos[1];
        }
        if (e.touches[2]) {
          var pos = r.projectIntoViewport(e.touches[2].clientX, e.touches[2].clientY);
          now[4] = pos[0];
          now[5] = pos[1];
        }
        if (start) {
          start.unactivate();
        }
        var ctxTapend;
        if (r.touchData.cxt) {
          ctxTapend = {
            originalEvent: e,
            type: "cxttapend",
            position: {
              x: now[0],
              y: now[1]
            }
          };
          if (start) {
            start.emit(ctxTapend);
          } else {
            cy.emit(ctxTapend);
          }
          if (!r.touchData.cxtDragged) {
            var ctxTap = {
              originalEvent: e,
              type: "cxttap",
              position: {
                x: now[0],
                y: now[1]
              }
            };
            if (start) {
              start.emit(ctxTap);
            } else {
              cy.emit(ctxTap);
            }
          }
          if (r.touchData.start) {
            r.touchData.start._private.grabbed = false;
          }
          r.touchData.cxt = false;
          r.touchData.start = null;
          r.redraw();
          return;
        }
        if (!e.touches[2] && cy.boxSelectionEnabled() && r.touchData.selecting) {
          r.touchData.selecting = false;
          var box = cy.collection(r.getAllInBox(select[0], select[1], select[2], select[3]));
          select[0] = void 0;
          select[1] = void 0;
          select[2] = void 0;
          select[3] = void 0;
          select[4] = 0;
          r.redrawHint("select", true);
          cy.emit({
            type: "boxend",
            originalEvent: e,
            position: {
              x: now[0],
              y: now[1]
            }
          });
          var eleWouldBeSelected = function eleWouldBeSelected2(ele) {
            return ele.selectable() && !ele.selected();
          };
          box.emit("box").stdFilter(eleWouldBeSelected).select().emit("boxselect");
          if (box.nonempty()) {
            r.redrawHint("eles", true);
          }
          r.redraw();
        }
        if (start != null) {
          start.unactivate();
        }
        if (e.touches[2]) {
          r.data.bgActivePosistion = void 0;
          r.redrawHint("select", true);
        } else if (e.touches[1]) ;
        else if (e.touches[0]) ;
        else if (!e.touches[0]) {
          r.data.bgActivePosistion = void 0;
          r.redrawHint("select", true);
          var draggedEles = r.dragData.touchDragEles;
          if (start != null) {
            var startWasGrabbed = start._private.grabbed;
            freeDraggedElements(draggedEles);
            r.redrawHint("drag", true);
            r.redrawHint("eles", true);
            if (startWasGrabbed) {
              start.emit("freeon");
              draggedEles.emit("free");
              if (r.dragData.didDrag) {
                start.emit("dragfreeon");
                draggedEles.emit("dragfree");
              }
            }
            triggerEvents(start, ["touchend", "tapend", "vmouseup", "tapdragout"], e, {
              x: now[0],
              y: now[1]
            });
            start.unactivate();
            r.touchData.start = null;
          } else {
            var near = r.findNearestElement(now[0], now[1], true, true);
            triggerEvents(near, ["touchend", "tapend", "vmouseup", "tapdragout"], e, {
              x: now[0],
              y: now[1]
            });
          }
          var dx = r.touchData.startPosition[0] - now[0];
          var dx2 = dx * dx;
          var dy = r.touchData.startPosition[1] - now[1];
          var dy2 = dy * dy;
          var dist2 = dx2 + dy2;
          var rdist2 = dist2 * zoom * zoom;
          if (!r.touchData.singleTouchMoved) {
            if (!start) {
              cy.$(":selected").unselect(["tapunselect"]);
            }
            triggerEvents(start, ["tap", "vclick"], e, {
              x: now[0],
              y: now[1]
            });
            didDoubleTouch = false;
            if (e.timeStamp - prevTouchTimeStamp <= cy.multiClickDebounceTime()) {
              touchTimeout && clearTimeout(touchTimeout);
              didDoubleTouch = true;
              prevTouchTimeStamp = null;
              triggerEvents(start, ["dbltap", "vdblclick"], e, {
                x: now[0],
                y: now[1]
              });
            } else {
              touchTimeout = setTimeout(function() {
                if (didDoubleTouch) return;
                triggerEvents(start, ["onetap", "voneclick"], e, {
                  x: now[0],
                  y: now[1]
                });
              }, cy.multiClickDebounceTime());
              prevTouchTimeStamp = e.timeStamp;
            }
          }
          if (start != null && !r.dragData.didDrag && start._private.selectable && rdist2 < r.touchTapThreshold2 && !r.pinching) {
            if (cy.selectionType() === "single") {
              cy.$(isSelected).unmerge(start).unselect(["tapunselect"]);
              start.select(["tapselect"]);
            } else {
              if (start.selected()) {
                start.unselect(["tapunselect"]);
              } else {
                start.select(["tapselect"]);
              }
            }
            r.redrawHint("eles", true);
          }
          r.touchData.singleTouchMoved = true;
        }
        for (var j = 0; j < now.length; j++) {
          earlier[j] = now[j];
        }
        r.dragData.didDrag = false;
        if (e.touches.length === 0) {
          r.touchData.dragDelta = [];
          r.touchData.startPosition = [null, null, null, null, null, null];
          r.touchData.startGPosition = null;
          r.touchData.didSelect = false;
        }
        if (e.touches.length < 2) {
          if (e.touches.length === 1) {
            r.touchData.startGPosition = [e.touches[0].clientX, e.touches[0].clientY];
          }
          r.pinching = false;
          r.redrawHint("eles", true);
          r.redraw();
        }
      }, false);
      if (typeof TouchEvent === "undefined") {
        var pointers = [];
        var makeTouch = function makeTouch2(e) {
          return {
            clientX: e.clientX,
            clientY: e.clientY,
            force: 1,
            identifier: e.pointerId,
            pageX: e.pageX,
            pageY: e.pageY,
            radiusX: e.width / 2,
            radiusY: e.height / 2,
            screenX: e.screenX,
            screenY: e.screenY,
            target: e.target
          };
        };
        var makePointer = function makePointer2(e) {
          return {
            event: e,
            touch: makeTouch(e)
          };
        };
        var addPointer = function addPointer2(e) {
          pointers.push(makePointer(e));
        };
        var removePointer = function removePointer2(e) {
          for (var i2 = 0; i2 < pointers.length; i2++) {
            var p2 = pointers[i2];
            if (p2.event.pointerId === e.pointerId) {
              pointers.splice(i2, 1);
              return;
            }
          }
        };
        var updatePointer = function updatePointer2(e) {
          var p2 = pointers.filter(function(p3) {
            return p3.event.pointerId === e.pointerId;
          })[0];
          p2.event = e;
          p2.touch = makeTouch(e);
        };
        var addTouchesToEvent = function addTouchesToEvent2(e) {
          e.touches = pointers.map(function(p2) {
            return p2.touch;
          });
        };
        var pointerIsMouse = function pointerIsMouse2(e) {
          return e.pointerType === "mouse" || e.pointerType === 4;
        };
        r.registerBinding(r.container, "pointerdown", function(e) {
          if (pointerIsMouse(e)) {
            return;
          }
          e.preventDefault();
          addPointer(e);
          addTouchesToEvent(e);
          touchstartHandler(e);
        });
        r.registerBinding(r.container, "pointerup", function(e) {
          if (pointerIsMouse(e)) {
            return;
          }
          removePointer(e);
          addTouchesToEvent(e);
          touchendHandler(e);
        });
        r.registerBinding(r.container, "pointercancel", function(e) {
          if (pointerIsMouse(e)) {
            return;
          }
          removePointer(e);
          addTouchesToEvent(e);
          touchcancelHandler(e);
        });
        r.registerBinding(r.container, "pointermove", function(e) {
          if (pointerIsMouse(e)) {
            return;
          }
          e.preventDefault();
          updatePointer(e);
          addTouchesToEvent(e);
          touchmoveHandler(e);
        });
      }
    };
    var BRp$2 = {};
    BRp$2.generatePolygon = function(name, points) {
      return this.nodeShapes[name] = {
        renderer: this,
        name,
        points,
        draw: function draw(context, centerX, centerY, width, height) {
          this.renderer.nodeShapeImpl("polygon", context, centerX, centerY, width, height, this.points);
        },
        intersectLine: function intersectLine(nodeX, nodeY, width, height, x, y, padding) {
          return polygonIntersectLine(x, y, this.points, nodeX, nodeY, width / 2, height / 2, padding);
        },
        checkPoint: function checkPoint(x, y, padding, width, height, centerX, centerY) {
          return pointInsidePolygon(x, y, this.points, centerX, centerY, width, height, [0, -1], padding);
        }
      };
    };
    BRp$2.generateEllipse = function() {
      return this.nodeShapes["ellipse"] = {
        renderer: this,
        name: "ellipse",
        draw: function draw(context, centerX, centerY, width, height) {
          this.renderer.nodeShapeImpl(this.name, context, centerX, centerY, width, height);
        },
        intersectLine: function intersectLine(nodeX, nodeY, width, height, x, y, padding) {
          return intersectLineEllipse(x, y, nodeX, nodeY, width / 2 + padding, height / 2 + padding);
        },
        checkPoint: function checkPoint(x, y, padding, width, height, centerX, centerY) {
          return checkInEllipse(x, y, width, height, centerX, centerY, padding);
        }
      };
    };
    BRp$2.generateRoundPolygon = function(name, points) {
      var allPoints = new Array(points.length * 2);
      for (var i2 = 0; i2 < points.length / 2; i2++) {
        var sourceIndex = i2 * 2;
        var destIndex = void 0;
        if (i2 < points.length / 2 - 1) {
          destIndex = (i2 + 1) * 2;
        } else {
          destIndex = 0;
        }
        allPoints[i2 * 4] = points[sourceIndex];
        allPoints[i2 * 4 + 1] = points[sourceIndex + 1];
        var xDest = points[destIndex] - points[sourceIndex];
        var yDest = points[destIndex + 1] - points[sourceIndex + 1];
        var norm = Math.sqrt(xDest * xDest + yDest * yDest);
        allPoints[i2 * 4 + 2] = xDest / norm;
        allPoints[i2 * 4 + 3] = yDest / norm;
      }
      return this.nodeShapes[name] = {
        renderer: this,
        name,
        points: allPoints,
        draw: function draw(context, centerX, centerY, width, height) {
          this.renderer.nodeShapeImpl("round-polygon", context, centerX, centerY, width, height, this.points);
        },
        intersectLine: function intersectLine(nodeX, nodeY, width, height, x, y, padding) {
          return roundPolygonIntersectLine(x, y, this.points, nodeX, nodeY, width, height);
        },
        checkPoint: function checkPoint(x, y, padding, width, height, centerX, centerY) {
          return pointInsideRoundPolygon(x, y, this.points, centerX, centerY, width, height);
        }
      };
    };
    BRp$2.generateRoundRectangle = function() {
      return this.nodeShapes["round-rectangle"] = this.nodeShapes["roundrectangle"] = {
        renderer: this,
        name: "round-rectangle",
        points: generateUnitNgonPointsFitToSquare(4, 0),
        draw: function draw(context, centerX, centerY, width, height) {
          this.renderer.nodeShapeImpl(this.name, context, centerX, centerY, width, height);
        },
        intersectLine: function intersectLine(nodeX, nodeY, width, height, x, y, padding) {
          return roundRectangleIntersectLine(x, y, nodeX, nodeY, width, height, padding);
        },
        checkPoint: function checkPoint(x, y, padding, width, height, centerX, centerY) {
          var cornerRadius = getRoundRectangleRadius(width, height);
          var diam = cornerRadius * 2;
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width, height - diam, [0, -1], padding)) {
            return true;
          }
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width - diam, height, [0, -1], padding)) {
            return true;
          }
          if (checkInEllipse(x, y, diam, diam, centerX - width / 2 + cornerRadius, centerY - height / 2 + cornerRadius, padding)) {
            return true;
          }
          if (checkInEllipse(x, y, diam, diam, centerX + width / 2 - cornerRadius, centerY - height / 2 + cornerRadius, padding)) {
            return true;
          }
          if (checkInEllipse(x, y, diam, diam, centerX + width / 2 - cornerRadius, centerY + height / 2 - cornerRadius, padding)) {
            return true;
          }
          if (checkInEllipse(x, y, diam, diam, centerX - width / 2 + cornerRadius, centerY + height / 2 - cornerRadius, padding)) {
            return true;
          }
          return false;
        }
      };
    };
    BRp$2.generateCutRectangle = function() {
      return this.nodeShapes["cut-rectangle"] = this.nodeShapes["cutrectangle"] = {
        renderer: this,
        name: "cut-rectangle",
        cornerLength: getCutRectangleCornerLength(),
        points: generateUnitNgonPointsFitToSquare(4, 0),
        draw: function draw(context, centerX, centerY, width, height) {
          this.renderer.nodeShapeImpl(this.name, context, centerX, centerY, width, height);
        },
        generateCutTrianglePts: function generateCutTrianglePts(width, height, centerX, centerY) {
          var cl = this.cornerLength;
          var hh = height / 2;
          var hw = width / 2;
          var xBegin = centerX - hw;
          var xEnd = centerX + hw;
          var yBegin = centerY - hh;
          var yEnd = centerY + hh;
          return {
            topLeft: [xBegin, yBegin + cl, xBegin + cl, yBegin, xBegin + cl, yBegin + cl],
            topRight: [xEnd - cl, yBegin, xEnd, yBegin + cl, xEnd - cl, yBegin + cl],
            bottomRight: [xEnd, yEnd - cl, xEnd - cl, yEnd, xEnd - cl, yEnd - cl],
            bottomLeft: [xBegin + cl, yEnd, xBegin, yEnd - cl, xBegin + cl, yEnd - cl]
          };
        },
        intersectLine: function intersectLine(nodeX, nodeY, width, height, x, y, padding) {
          var cPts = this.generateCutTrianglePts(width + 2 * padding, height + 2 * padding, nodeX, nodeY);
          var pts2 = [].concat.apply([], [cPts.topLeft.splice(0, 4), cPts.topRight.splice(0, 4), cPts.bottomRight.splice(0, 4), cPts.bottomLeft.splice(0, 4)]);
          return polygonIntersectLine(x, y, pts2, nodeX, nodeY);
        },
        checkPoint: function checkPoint(x, y, padding, width, height, centerX, centerY) {
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width, height - 2 * this.cornerLength, [0, -1], padding)) {
            return true;
          }
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width - 2 * this.cornerLength, height, [0, -1], padding)) {
            return true;
          }
          var cutTrianglePts = this.generateCutTrianglePts(width, height, centerX, centerY);
          return pointInsidePolygonPoints(x, y, cutTrianglePts.topLeft) || pointInsidePolygonPoints(x, y, cutTrianglePts.topRight) || pointInsidePolygonPoints(x, y, cutTrianglePts.bottomRight) || pointInsidePolygonPoints(x, y, cutTrianglePts.bottomLeft);
        }
      };
    };
    BRp$2.generateBarrel = function() {
      return this.nodeShapes["barrel"] = {
        renderer: this,
        name: "barrel",
        points: generateUnitNgonPointsFitToSquare(4, 0),
        draw: function draw(context, centerX, centerY, width, height) {
          this.renderer.nodeShapeImpl(this.name, context, centerX, centerY, width, height);
        },
        intersectLine: function intersectLine(nodeX, nodeY, width, height, x, y, padding) {
          var t0 = 0.15;
          var t1 = 0.5;
          var t2 = 0.85;
          var bPts = this.generateBarrelBezierPts(width + 2 * padding, height + 2 * padding, nodeX, nodeY);
          var approximateBarrelCurvePts = function approximateBarrelCurvePts2(pts3) {
            var m0 = qbezierPtAt({
              x: pts3[0],
              y: pts3[1]
            }, {
              x: pts3[2],
              y: pts3[3]
            }, {
              x: pts3[4],
              y: pts3[5]
            }, t0);
            var m1 = qbezierPtAt({
              x: pts3[0],
              y: pts3[1]
            }, {
              x: pts3[2],
              y: pts3[3]
            }, {
              x: pts3[4],
              y: pts3[5]
            }, t1);
            var m2 = qbezierPtAt({
              x: pts3[0],
              y: pts3[1]
            }, {
              x: pts3[2],
              y: pts3[3]
            }, {
              x: pts3[4],
              y: pts3[5]
            }, t2);
            return [pts3[0], pts3[1], m0.x, m0.y, m1.x, m1.y, m2.x, m2.y, pts3[4], pts3[5]];
          };
          var pts2 = [].concat(approximateBarrelCurvePts(bPts.topLeft), approximateBarrelCurvePts(bPts.topRight), approximateBarrelCurvePts(bPts.bottomRight), approximateBarrelCurvePts(bPts.bottomLeft));
          return polygonIntersectLine(x, y, pts2, nodeX, nodeY);
        },
        generateBarrelBezierPts: function generateBarrelBezierPts(width, height, centerX, centerY) {
          var hh = height / 2;
          var hw = width / 2;
          var xBegin = centerX - hw;
          var xEnd = centerX + hw;
          var yBegin = centerY - hh;
          var yEnd = centerY + hh;
          var curveConstants = getBarrelCurveConstants(width, height);
          var hOffset = curveConstants.heightOffset;
          var wOffset = curveConstants.widthOffset;
          var ctrlPtXOffset = curveConstants.ctrlPtOffsetPct * width;
          var pts2 = {
            topLeft: [xBegin, yBegin + hOffset, xBegin + ctrlPtXOffset, yBegin, xBegin + wOffset, yBegin],
            topRight: [xEnd - wOffset, yBegin, xEnd - ctrlPtXOffset, yBegin, xEnd, yBegin + hOffset],
            bottomRight: [xEnd, yEnd - hOffset, xEnd - ctrlPtXOffset, yEnd, xEnd - wOffset, yEnd],
            bottomLeft: [xBegin + wOffset, yEnd, xBegin + ctrlPtXOffset, yEnd, xBegin, yEnd - hOffset]
          };
          pts2.topLeft.isTop = true;
          pts2.topRight.isTop = true;
          pts2.bottomLeft.isBottom = true;
          pts2.bottomRight.isBottom = true;
          return pts2;
        },
        checkPoint: function checkPoint(x, y, padding, width, height, centerX, centerY) {
          var curveConstants = getBarrelCurveConstants(width, height);
          var hOffset = curveConstants.heightOffset;
          var wOffset = curveConstants.widthOffset;
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width, height - 2 * hOffset, [0, -1], padding)) {
            return true;
          }
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width - 2 * wOffset, height, [0, -1], padding)) {
            return true;
          }
          var barrelCurvePts = this.generateBarrelBezierPts(width, height, centerX, centerY);
          var getCurveT = function getCurveT2(x2, y3, curvePts) {
            var x0 = curvePts[4];
            var x1 = curvePts[2];
            var x22 = curvePts[0];
            var y02 = curvePts[5];
            var y22 = curvePts[1];
            var xMin = Math.min(x0, x22);
            var xMax = Math.max(x0, x22);
            var yMin = Math.min(y02, y22);
            var yMax = Math.max(y02, y22);
            if (xMin <= x2 && x2 <= xMax && yMin <= y3 && y3 <= yMax) {
              var coeff = bezierPtsToQuadCoeff(x0, x1, x22);
              var roots = solveQuadratic(coeff[0], coeff[1], coeff[2], x2);
              var validRoots = roots.filter(function(r) {
                return 0 <= r && r <= 1;
              });
              if (validRoots.length > 0) {
                return validRoots[0];
              }
            }
            return null;
          };
          var curveRegions = Object.keys(barrelCurvePts);
          for (var i2 = 0; i2 < curveRegions.length; i2++) {
            var corner = curveRegions[i2];
            var cornerPts = barrelCurvePts[corner];
            var t = getCurveT(x, y, cornerPts);
            if (t == null) {
              continue;
            }
            var y0 = cornerPts[5];
            var y1 = cornerPts[3];
            var y2 = cornerPts[1];
            var bezY = qbezierAt(y0, y1, y2, t);
            if (cornerPts.isTop && bezY <= y) {
              return true;
            }
            if (cornerPts.isBottom && y <= bezY) {
              return true;
            }
          }
          return false;
        }
      };
    };
    BRp$2.generateBottomRoundrectangle = function() {
      return this.nodeShapes["bottom-round-rectangle"] = this.nodeShapes["bottomroundrectangle"] = {
        renderer: this,
        name: "bottom-round-rectangle",
        points: generateUnitNgonPointsFitToSquare(4, 0),
        draw: function draw(context, centerX, centerY, width, height) {
          this.renderer.nodeShapeImpl(this.name, context, centerX, centerY, width, height);
        },
        intersectLine: function intersectLine(nodeX, nodeY, width, height, x, y, padding) {
          var topStartX = nodeX - (width / 2 + padding);
          var topStartY = nodeY - (height / 2 + padding);
          var topEndY = topStartY;
          var topEndX = nodeX + (width / 2 + padding);
          var topIntersections = finiteLinesIntersect(x, y, nodeX, nodeY, topStartX, topStartY, topEndX, topEndY, false);
          if (topIntersections.length > 0) {
            return topIntersections;
          }
          return roundRectangleIntersectLine(x, y, nodeX, nodeY, width, height, padding);
        },
        checkPoint: function checkPoint(x, y, padding, width, height, centerX, centerY) {
          var cornerRadius = getRoundRectangleRadius(width, height);
          var diam = 2 * cornerRadius;
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width, height - diam, [0, -1], padding)) {
            return true;
          }
          if (pointInsidePolygon(x, y, this.points, centerX, centerY, width - diam, height, [0, -1], padding)) {
            return true;
          }
          var outerWidth = width / 2 + 2 * padding;
          var outerHeight = height / 2 + 2 * padding;
          var points = [centerX - outerWidth, centerY - outerHeight, centerX - outerWidth, centerY, centerX + outerWidth, centerY, centerX + outerWidth, centerY - outerHeight];
          if (pointInsidePolygonPoints(x, y, points)) {
            return true;
          }
          if (checkInEllipse(x, y, diam, diam, centerX + width / 2 - cornerRadius, centerY + height / 2 - cornerRadius, padding)) {
            return true;
          }
          if (checkInEllipse(x, y, diam, diam, centerX - width / 2 + cornerRadius, centerY + height / 2 - cornerRadius, padding)) {
            return true;
          }
          return false;
        }
      };
    };
    BRp$2.registerNodeShapes = function() {
      var nodeShapes = this.nodeShapes = {};
      var renderer2 = this;
      this.generateEllipse();
      this.generatePolygon("triangle", generateUnitNgonPointsFitToSquare(3, 0));
      this.generateRoundPolygon("round-triangle", generateUnitNgonPointsFitToSquare(3, 0));
      this.generatePolygon("rectangle", generateUnitNgonPointsFitToSquare(4, 0));
      nodeShapes["square"] = nodeShapes["rectangle"];
      this.generateRoundRectangle();
      this.generateCutRectangle();
      this.generateBarrel();
      this.generateBottomRoundrectangle();
      {
        var diamondPoints = [0, 1, 1, 0, 0, -1, -1, 0];
        this.generatePolygon("diamond", diamondPoints);
        this.generateRoundPolygon("round-diamond", diamondPoints);
      }
      this.generatePolygon("pentagon", generateUnitNgonPointsFitToSquare(5, 0));
      this.generateRoundPolygon("round-pentagon", generateUnitNgonPointsFitToSquare(5, 0));
      this.generatePolygon("hexagon", generateUnitNgonPointsFitToSquare(6, 0));
      this.generateRoundPolygon("round-hexagon", generateUnitNgonPointsFitToSquare(6, 0));
      this.generatePolygon("heptagon", generateUnitNgonPointsFitToSquare(7, 0));
      this.generateRoundPolygon("round-heptagon", generateUnitNgonPointsFitToSquare(7, 0));
      this.generatePolygon("octagon", generateUnitNgonPointsFitToSquare(8, 0));
      this.generateRoundPolygon("round-octagon", generateUnitNgonPointsFitToSquare(8, 0));
      var star5Points = new Array(20);
      {
        var outerPoints = generateUnitNgonPoints(5, 0);
        var innerPoints = generateUnitNgonPoints(5, Math.PI / 5);
        var innerRadius = 0.5 * (3 - Math.sqrt(5));
        innerRadius *= 1.57;
        for (var i2 = 0; i2 < innerPoints.length / 2; i2++) {
          innerPoints[i2 * 2] *= innerRadius;
          innerPoints[i2 * 2 + 1] *= innerRadius;
        }
        for (var i2 = 0; i2 < 20 / 4; i2++) {
          star5Points[i2 * 4] = outerPoints[i2 * 2];
          star5Points[i2 * 4 + 1] = outerPoints[i2 * 2 + 1];
          star5Points[i2 * 4 + 2] = innerPoints[i2 * 2];
          star5Points[i2 * 4 + 3] = innerPoints[i2 * 2 + 1];
        }
      }
      star5Points = fitPolygonToSquare(star5Points);
      this.generatePolygon("star", star5Points);
      this.generatePolygon("vee", [-1, -1, 0, -0.333, 1, -1, 0, 1]);
      this.generatePolygon("rhomboid", [-1, -1, 0.333, -1, 1, 1, -0.333, 1]);
      this.generatePolygon("right-rhomboid", [-0.333, -1, 1, -1, 0.333, 1, -1, 1]);
      this.nodeShapes["concavehexagon"] = this.generatePolygon("concave-hexagon", [-1, -0.95, -0.75, 0, -1, 0.95, 1, 0.95, 0.75, 0, 1, -0.95]);
      {
        var tagPoints = [-1, -1, 0.25, -1, 1, 0, 0.25, 1, -1, 1];
        this.generatePolygon("tag", tagPoints);
        this.generateRoundPolygon("round-tag", tagPoints);
      }
      nodeShapes.makePolygon = function(points) {
        var key = points.join("$");
        var name = "polygon-" + key;
        var shape;
        if (shape = this[name]) {
          return shape;
        }
        return renderer2.generatePolygon(name, points);
      };
    };
    var BRp$1 = {};
    BRp$1.timeToRender = function() {
      return this.redrawTotalTime / this.redrawCount;
    };
    BRp$1.redraw = function(options) {
      options = options || staticEmptyObject();
      var r = this;
      if (r.averageRedrawTime === void 0) {
        r.averageRedrawTime = 0;
      }
      if (r.lastRedrawTime === void 0) {
        r.lastRedrawTime = 0;
      }
      if (r.lastDrawTime === void 0) {
        r.lastDrawTime = 0;
      }
      r.requestedFrame = true;
      r.renderOptions = options;
    };
    BRp$1.beforeRender = function(fn2, priority) {
      if (this.destroyed) {
        return;
      }
      if (priority == null) {
        error("Priority is not optional for beforeRender");
      }
      var cbs = this.beforeRenderCallbacks;
      cbs.push({
        fn: fn2,
        priority
      });
      cbs.sort(function(a, b) {
        return b.priority - a.priority;
      });
    };
    var beforeRenderCallbacks = function beforeRenderCallbacks2(r, willDraw, startTime) {
      var cbs = r.beforeRenderCallbacks;
      for (var i2 = 0; i2 < cbs.length; i2++) {
        cbs[i2].fn(willDraw, startTime);
      }
    };
    BRp$1.startRenderLoop = function() {
      var r = this;
      var cy = r.cy;
      if (r.renderLoopStarted) {
        return;
      } else {
        r.renderLoopStarted = true;
      }
      var renderFn = function renderFn2(requestTime) {
        if (r.destroyed) {
          return;
        }
        if (cy.batching()) ;
        else if (r.requestedFrame && !r.skipFrame) {
          beforeRenderCallbacks(r, true, requestTime);
          var startTime = performanceNow();
          r.render(r.renderOptions);
          var endTime = r.lastDrawTime = performanceNow();
          if (r.averageRedrawTime === void 0) {
            r.averageRedrawTime = endTime - startTime;
          }
          if (r.redrawCount === void 0) {
            r.redrawCount = 0;
          }
          r.redrawCount++;
          if (r.redrawTotalTime === void 0) {
            r.redrawTotalTime = 0;
          }
          var duration = endTime - startTime;
          r.redrawTotalTime += duration;
          r.lastRedrawTime = duration;
          r.averageRedrawTime = r.averageRedrawTime / 2 + duration / 2;
          r.requestedFrame = false;
        } else {
          beforeRenderCallbacks(r, false, requestTime);
        }
        r.skipFrame = false;
        requestAnimationFrame(renderFn2);
      };
      requestAnimationFrame(renderFn);
    };
    var BaseRenderer = function BaseRenderer2(options) {
      this.init(options);
    };
    var BR = BaseRenderer;
    var BRp = BR.prototype;
    BRp.clientFunctions = ["redrawHint", "render", "renderTo", "matchCanvasSize", "nodeShapeImpl", "arrowShapeImpl"];
    BRp.init = function(options) {
      var r = this;
      r.options = options;
      r.cy = options.cy;
      var ctr = r.container = options.cy.container();
      var containerWindow = r.cy.window();
      if (containerWindow) {
        var document2 = containerWindow.document;
        var head = document2.head;
        var stylesheetId = "__________cytoscape_stylesheet";
        var className = "__________cytoscape_container";
        var stylesheetAlreadyExists = document2.getElementById(stylesheetId) != null;
        if (ctr.className.indexOf(className) < 0) {
          ctr.className = (ctr.className || "") + " " + className;
        }
        if (!stylesheetAlreadyExists) {
          var stylesheet2 = document2.createElement("style");
          stylesheet2.id = stylesheetId;
          stylesheet2.textContent = "." + className + " { position: relative; }";
          head.insertBefore(stylesheet2, head.children[0]);
        }
        var computedStyle = containerWindow.getComputedStyle(ctr);
        var position2 = computedStyle.getPropertyValue("position");
        if (position2 === "static") {
          warn("A Cytoscape container has style position:static and so can not use UI extensions properly");
        }
      }
      r.selection = [void 0, void 0, void 0, void 0, 0];
      r.bezierProjPcts = [0.05, 0.225, 0.4, 0.5, 0.6, 0.775, 0.95];
      r.hoverData = {
        down: null,
        last: null,
        downTime: null,
        triggerMode: null,
        dragging: false,
        initialPan: [null, null],
        capture: false
      };
      r.dragData = {
        possibleDragElements: []
      };
      r.touchData = {
        start: null,
        capture: false,
        // These 3 fields related to tap, taphold events
        startPosition: [null, null, null, null, null, null],
        singleTouchStartTime: null,
        singleTouchMoved: true,
        now: [null, null, null, null, null, null],
        earlier: [null, null, null, null, null, null]
      };
      r.redraws = 0;
      r.showFps = options.showFps;
      r.debug = options.debug;
      r.hideEdgesOnViewport = options.hideEdgesOnViewport;
      r.textureOnViewport = options.textureOnViewport;
      r.wheelSensitivity = options.wheelSensitivity;
      r.motionBlurEnabled = options.motionBlur;
      r.forcedPixelRatio = number$1(options.pixelRatio) ? options.pixelRatio : null;
      r.motionBlur = options.motionBlur;
      r.motionBlurOpacity = options.motionBlurOpacity;
      r.motionBlurTransparency = 1 - r.motionBlurOpacity;
      r.motionBlurPxRatio = 1;
      r.mbPxRBlurry = 1;
      r.minMbLowQualFrames = 4;
      r.fullQualityMb = false;
      r.clearedForMotionBlur = [];
      r.desktopTapThreshold = options.desktopTapThreshold;
      r.desktopTapThreshold2 = options.desktopTapThreshold * options.desktopTapThreshold;
      r.touchTapThreshold = options.touchTapThreshold;
      r.touchTapThreshold2 = options.touchTapThreshold * options.touchTapThreshold;
      r.tapholdDuration = 500;
      r.bindings = [];
      r.beforeRenderCallbacks = [];
      r.beforeRenderPriorities = {
        // higher priority execs before lower one
        animations: 400,
        eleCalcs: 300,
        eleTxrDeq: 200,
        lyrTxrDeq: 150,
        lyrTxrSkip: 100
      };
      r.registerNodeShapes();
      r.registerArrowShapes();
      r.registerCalculationListeners();
    };
    BRp.notify = function(eventName, eles) {
      var r = this;
      var cy = r.cy;
      if (this.destroyed) {
        return;
      }
      if (eventName === "init") {
        r.load();
        return;
      }
      if (eventName === "destroy") {
        r.destroy();
        return;
      }
      if (eventName === "add" || eventName === "remove" || eventName === "move" && cy.hasCompoundNodes() || eventName === "load" || eventName === "zorder" || eventName === "mount") {
        r.invalidateCachedZSortedEles();
      }
      if (eventName === "viewport") {
        r.redrawHint("select", true);
      }
      if (eventName === "load" || eventName === "resize" || eventName === "mount") {
        r.invalidateContainerClientCoordsCache();
        r.matchCanvasSize(r.container);
      }
      r.redrawHint("eles", true);
      r.redrawHint("drag", true);
      this.startRenderLoop();
      this.redraw();
    };
    BRp.destroy = function() {
      var r = this;
      r.destroyed = true;
      r.cy.stopAnimationLoop();
      for (var i2 = 0; i2 < r.bindings.length; i2++) {
        var binding = r.bindings[i2];
        var b = binding;
        var tgt = b.target;
        (tgt.off || tgt.removeEventListener).apply(tgt, b.args);
      }
      r.bindings = [];
      r.beforeRenderCallbacks = [];
      r.onUpdateEleCalcsFns = [];
      if (r.removeObserver) {
        r.removeObserver.disconnect();
      }
      if (r.styleObserver) {
        r.styleObserver.disconnect();
      }
      if (r.resizeObserver) {
        r.resizeObserver.disconnect();
      }
      if (r.labelCalcDiv) {
        try {
          document.body.removeChild(r.labelCalcDiv);
        } catch (e) {
        }
      }
    };
    BRp.isHeadless = function() {
      return false;
    };
    [BRp$f, BRp$5, BRp$4, BRp$3, BRp$2, BRp$1].forEach(function(props) {
      extend(BRp, props);
    });
    var fullFpsTime = 1e3 / 60;
    var defs = {
      setupDequeueing: function setupDequeueing(opts) {
        return function setupDequeueingImpl() {
          var self2 = this;
          var r = this.renderer;
          if (self2.dequeueingSetup) {
            return;
          } else {
            self2.dequeueingSetup = true;
          }
          var queueRedraw = debounce__default["default"](function() {
            r.redrawHint("eles", true);
            r.redrawHint("drag", true);
            r.redraw();
          }, opts.deqRedrawThreshold);
          var dequeue = function dequeue2(willDraw, frameStartTime) {
            var startTime = performanceNow();
            var avgRenderTime = r.averageRedrawTime;
            var renderTime = r.lastRedrawTime;
            var deqd = [];
            var extent = r.cy.extent();
            var pixelRatio = r.getPixelRatio();
            if (!willDraw) {
              r.flushRenderedStyleQueue();
            }
            while (true) {
              var now = performanceNow();
              var duration = now - startTime;
              var frameDuration = now - frameStartTime;
              if (renderTime < fullFpsTime) {
                var timeAvailable = fullFpsTime - (willDraw ? avgRenderTime : 0);
                if (frameDuration >= opts.deqFastCost * timeAvailable) {
                  break;
                }
              } else {
                if (willDraw) {
                  if (duration >= opts.deqCost * renderTime || duration >= opts.deqAvgCost * avgRenderTime) {
                    break;
                  }
                } else if (frameDuration >= opts.deqNoDrawCost * fullFpsTime) {
                  break;
                }
              }
              var thisDeqd = opts.deq(self2, pixelRatio, extent);
              if (thisDeqd.length > 0) {
                for (var i2 = 0; i2 < thisDeqd.length; i2++) {
                  deqd.push(thisDeqd[i2]);
                }
              } else {
                break;
              }
            }
            if (deqd.length > 0) {
              opts.onDeqd(self2, deqd);
              if (!willDraw && opts.shouldRedraw(self2, deqd, pixelRatio, extent)) {
                queueRedraw();
              }
            }
          };
          var priority = opts.priority || noop$1;
          r.beforeRender(dequeue, priority(self2));
        };
      }
    };
    var ElementTextureCacheLookup = function() {
      function ElementTextureCacheLookup2(getKey2) {
        var doesEleInvalidateKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : falsify;
        _classCallCheck(this, ElementTextureCacheLookup2);
        this.idsByKey = new Map$1();
        this.keyForId = new Map$1();
        this.cachesByLvl = new Map$1();
        this.lvls = [];
        this.getKey = getKey2;
        this.doesEleInvalidateKey = doesEleInvalidateKey;
      }
      _createClass(ElementTextureCacheLookup2, [{
        key: "getIdsFor",
        value: function getIdsFor(key) {
          if (key == null) {
            error("Can not get id list for null key");
          }
          var idsByKey = this.idsByKey;
          var ids = this.idsByKey.get(key);
          if (!ids) {
            ids = new Set$1();
            idsByKey.set(key, ids);
          }
          return ids;
        }
      }, {
        key: "addIdForKey",
        value: function addIdForKey(key, id) {
          if (key != null) {
            this.getIdsFor(key).add(id);
          }
        }
      }, {
        key: "deleteIdForKey",
        value: function deleteIdForKey(key, id) {
          if (key != null) {
            this.getIdsFor(key)["delete"](id);
          }
        }
      }, {
        key: "getNumberOfIdsForKey",
        value: function getNumberOfIdsForKey(key) {
          if (key == null) {
            return 0;
          } else {
            return this.getIdsFor(key).size;
          }
        }
      }, {
        key: "updateKeyMappingFor",
        value: function updateKeyMappingFor(ele) {
          var id = ele.id();
          var prevKey = this.keyForId.get(id);
          var currKey = this.getKey(ele);
          this.deleteIdForKey(prevKey, id);
          this.addIdForKey(currKey, id);
          this.keyForId.set(id, currKey);
        }
      }, {
        key: "deleteKeyMappingFor",
        value: function deleteKeyMappingFor(ele) {
          var id = ele.id();
          var prevKey = this.keyForId.get(id);
          this.deleteIdForKey(prevKey, id);
          this.keyForId["delete"](id);
        }
      }, {
        key: "keyHasChangedFor",
        value: function keyHasChangedFor(ele) {
          var id = ele.id();
          var prevKey = this.keyForId.get(id);
          var newKey = this.getKey(ele);
          return prevKey !== newKey;
        }
      }, {
        key: "isInvalid",
        value: function isInvalid(ele) {
          return this.keyHasChangedFor(ele) || this.doesEleInvalidateKey(ele);
        }
      }, {
        key: "getCachesAt",
        value: function getCachesAt(lvl) {
          var cachesByLvl = this.cachesByLvl, lvls = this.lvls;
          var caches = cachesByLvl.get(lvl);
          if (!caches) {
            caches = new Map$1();
            cachesByLvl.set(lvl, caches);
            lvls.push(lvl);
          }
          return caches;
        }
      }, {
        key: "getCache",
        value: function getCache(key, lvl) {
          return this.getCachesAt(lvl).get(key);
        }
      }, {
        key: "get",
        value: function get2(ele, lvl) {
          var key = this.getKey(ele);
          var cache2 = this.getCache(key, lvl);
          if (cache2 != null) {
            this.updateKeyMappingFor(ele);
          }
          return cache2;
        }
      }, {
        key: "getForCachedKey",
        value: function getForCachedKey(ele, lvl) {
          var key = this.keyForId.get(ele.id());
          var cache2 = this.getCache(key, lvl);
          return cache2;
        }
      }, {
        key: "hasCache",
        value: function hasCache(key, lvl) {
          return this.getCachesAt(lvl).has(key);
        }
      }, {
        key: "has",
        value: function has(ele, lvl) {
          var key = this.getKey(ele);
          return this.hasCache(key, lvl);
        }
      }, {
        key: "setCache",
        value: function setCache(key, lvl, cache2) {
          cache2.key = key;
          this.getCachesAt(lvl).set(key, cache2);
        }
      }, {
        key: "set",
        value: function set2(ele, lvl, cache2) {
          var key = this.getKey(ele);
          this.setCache(key, lvl, cache2);
          this.updateKeyMappingFor(ele);
        }
      }, {
        key: "deleteCache",
        value: function deleteCache(key, lvl) {
          this.getCachesAt(lvl)["delete"](key);
        }
      }, {
        key: "delete",
        value: function _delete(ele, lvl) {
          var key = this.getKey(ele);
          this.deleteCache(key, lvl);
        }
      }, {
        key: "invalidateKey",
        value: function invalidateKey(key) {
          var _this = this;
          this.lvls.forEach(function(lvl) {
            return _this.deleteCache(key, lvl);
          });
        }
        // returns true if no other eles reference the invalidated cache (n.b. other eles may need the cache with the same key)
      }, {
        key: "invalidate",
        value: function invalidate(ele) {
          var id = ele.id();
          var key = this.keyForId.get(id);
          this.deleteKeyMappingFor(ele);
          var entireKeyInvalidated = this.doesEleInvalidateKey(ele);
          if (entireKeyInvalidated) {
            this.invalidateKey(key);
          }
          return entireKeyInvalidated || this.getNumberOfIdsForKey(key) === 0;
        }
      }]);
      return ElementTextureCacheLookup2;
    }();
    var minTxrH = 25;
    var txrStepH = 50;
    var minLvl$1 = -4;
    var maxLvl$1 = 3;
    var maxZoom$1 = 7.99;
    var eleTxrSpacing = 8;
    var defTxrWidth = 1024;
    var maxTxrW = 1024;
    var maxTxrH = 1024;
    var minUtility = 0.2;
    var maxFullness = 0.8;
    var maxFullnessChecks = 10;
    var deqCost$1 = 0.15;
    var deqAvgCost$1 = 0.1;
    var deqNoDrawCost$1 = 0.9;
    var deqFastCost$1 = 0.9;
    var deqRedrawThreshold$1 = 100;
    var maxDeqSize$1 = 1;
    var getTxrReasons = {
      dequeue: "dequeue",
      downscale: "downscale",
      highQuality: "highQuality"
    };
    var initDefaults = defaults$g({
      getKey: null,
      doesEleInvalidateKey: falsify,
      drawElement: null,
      getBoundingBox: null,
      getRotationPoint: null,
      getRotationOffset: null,
      isVisible: trueify,
      allowEdgeTxrCaching: true,
      allowParentTxrCaching: true
    });
    var ElementTextureCache = function ElementTextureCache2(renderer2, initOptions) {
      var self2 = this;
      self2.renderer = renderer2;
      self2.onDequeues = [];
      var opts = initDefaults(initOptions);
      extend(self2, opts);
      self2.lookup = new ElementTextureCacheLookup(opts.getKey, opts.doesEleInvalidateKey);
      self2.setupDequeueing();
    };
    var ETCp = ElementTextureCache.prototype;
    ETCp.reasons = getTxrReasons;
    ETCp.getTextureQueue = function(txrH) {
      var self2 = this;
      self2.eleImgCaches = self2.eleImgCaches || {};
      return self2.eleImgCaches[txrH] = self2.eleImgCaches[txrH] || [];
    };
    ETCp.getRetiredTextureQueue = function(txrH) {
      var self2 = this;
      var rtxtrQs = self2.eleImgCaches.retired = self2.eleImgCaches.retired || {};
      var rtxtrQ = rtxtrQs[txrH] = rtxtrQs[txrH] || [];
      return rtxtrQ;
    };
    ETCp.getElementQueue = function() {
      var self2 = this;
      var q = self2.eleCacheQueue = self2.eleCacheQueue || new Heap__default["default"](function(a, b) {
        return b.reqs - a.reqs;
      });
      return q;
    };
    ETCp.getElementKeyToQueue = function() {
      var self2 = this;
      var k2q = self2.eleKeyToCacheQueue = self2.eleKeyToCacheQueue || {};
      return k2q;
    };
    ETCp.getElement = function(ele, bb, pxRatio, lvl, reason) {
      var self2 = this;
      var r = this.renderer;
      var zoom = r.cy.zoom();
      var lookup2 = this.lookup;
      if (!bb || bb.w === 0 || bb.h === 0 || isNaN(bb.w) || isNaN(bb.h) || !ele.visible() || ele.removed()) {
        return null;
      }
      if (!self2.allowEdgeTxrCaching && ele.isEdge() || !self2.allowParentTxrCaching && ele.isParent()) {
        return null;
      }
      if (lvl == null) {
        lvl = Math.ceil(log2(zoom * pxRatio));
      }
      if (lvl < minLvl$1) {
        lvl = minLvl$1;
      } else if (zoom >= maxZoom$1 || lvl > maxLvl$1) {
        return null;
      }
      var scale = Math.pow(2, lvl);
      var eleScaledH = bb.h * scale;
      var eleScaledW = bb.w * scale;
      var scaledLabelShown = r.eleTextBiggerThanMin(ele, scale);
      if (!this.isVisible(ele, scaledLabelShown)) {
        return null;
      }
      var eleCache = lookup2.get(ele, lvl);
      if (eleCache && eleCache.invalidated) {
        eleCache.invalidated = false;
        eleCache.texture.invalidatedWidth -= eleCache.width;
      }
      if (eleCache) {
        return eleCache;
      }
      var txrH;
      if (eleScaledH <= minTxrH) {
        txrH = minTxrH;
      } else if (eleScaledH <= txrStepH) {
        txrH = txrStepH;
      } else {
        txrH = Math.ceil(eleScaledH / txrStepH) * txrStepH;
      }
      if (eleScaledH > maxTxrH || eleScaledW > maxTxrW) {
        return null;
      }
      var txrQ = self2.getTextureQueue(txrH);
      var txr = txrQ[txrQ.length - 2];
      var addNewTxr = function addNewTxr2() {
        return self2.recycleTexture(txrH, eleScaledW) || self2.addTexture(txrH, eleScaledW);
      };
      if (!txr) {
        txr = txrQ[txrQ.length - 1];
      }
      if (!txr) {
        txr = addNewTxr();
      }
      if (txr.width - txr.usedWidth < eleScaledW) {
        txr = addNewTxr();
      }
      var scalableFrom = function scalableFrom2(otherCache) {
        return otherCache && otherCache.scaledLabelShown === scaledLabelShown;
      };
      var deqing = reason && reason === getTxrReasons.dequeue;
      var highQualityReq = reason && reason === getTxrReasons.highQuality;
      var downscaleReq = reason && reason === getTxrReasons.downscale;
      var higherCache;
      for (var l = lvl + 1; l <= maxLvl$1; l++) {
        var c = lookup2.get(ele, l);
        if (c) {
          higherCache = c;
          break;
        }
      }
      var oneUpCache = higherCache && higherCache.level === lvl + 1 ? higherCache : null;
      var downscale = function downscale2() {
        txr.context.drawImage(oneUpCache.texture.canvas, oneUpCache.x, 0, oneUpCache.width, oneUpCache.height, txr.usedWidth, 0, eleScaledW, eleScaledH);
      };
      txr.context.setTransform(1, 0, 0, 1, 0, 0);
      txr.context.clearRect(txr.usedWidth, 0, eleScaledW, txrH);
      if (scalableFrom(oneUpCache)) {
        downscale();
      } else if (scalableFrom(higherCache)) {
        if (highQualityReq) {
          for (var _l = higherCache.level; _l > lvl; _l--) {
            oneUpCache = self2.getElement(ele, bb, pxRatio, _l, getTxrReasons.downscale);
          }
          downscale();
        } else {
          self2.queueElement(ele, higherCache.level - 1);
          return higherCache;
        }
      } else {
        var lowerCache;
        if (!deqing && !highQualityReq && !downscaleReq) {
          for (var _l2 = lvl - 1; _l2 >= minLvl$1; _l2--) {
            var _c = lookup2.get(ele, _l2);
            if (_c) {
              lowerCache = _c;
              break;
            }
          }
        }
        if (scalableFrom(lowerCache)) {
          self2.queueElement(ele, lvl);
          return lowerCache;
        }
        txr.context.translate(txr.usedWidth, 0);
        txr.context.scale(scale, scale);
        this.drawElement(txr.context, ele, bb, scaledLabelShown, false);
        txr.context.scale(1 / scale, 1 / scale);
        txr.context.translate(-txr.usedWidth, 0);
      }
      eleCache = {
        x: txr.usedWidth,
        texture: txr,
        level: lvl,
        scale,
        width: eleScaledW,
        height: eleScaledH,
        scaledLabelShown
      };
      txr.usedWidth += Math.ceil(eleScaledW + eleTxrSpacing);
      txr.eleCaches.push(eleCache);
      lookup2.set(ele, lvl, eleCache);
      self2.checkTextureFullness(txr);
      return eleCache;
    };
    ETCp.invalidateElements = function(eles) {
      for (var i2 = 0; i2 < eles.length; i2++) {
        this.invalidateElement(eles[i2]);
      }
    };
    ETCp.invalidateElement = function(ele) {
      var self2 = this;
      var lookup2 = self2.lookup;
      var caches = [];
      var invalid = lookup2.isInvalid(ele);
      if (!invalid) {
        return;
      }
      for (var lvl = minLvl$1; lvl <= maxLvl$1; lvl++) {
        var cache2 = lookup2.getForCachedKey(ele, lvl);
        if (cache2) {
          caches.push(cache2);
        }
      }
      var noOtherElesUseCache = lookup2.invalidate(ele);
      if (noOtherElesUseCache) {
        for (var i2 = 0; i2 < caches.length; i2++) {
          var _cache = caches[i2];
          var txr = _cache.texture;
          txr.invalidatedWidth += _cache.width;
          _cache.invalidated = true;
          self2.checkTextureUtility(txr);
        }
      }
      self2.removeFromQueue(ele);
    };
    ETCp.checkTextureUtility = function(txr) {
      if (txr.invalidatedWidth >= minUtility * txr.width) {
        this.retireTexture(txr);
      }
    };
    ETCp.checkTextureFullness = function(txr) {
      var self2 = this;
      var txrQ = self2.getTextureQueue(txr.height);
      if (txr.usedWidth / txr.width > maxFullness && txr.fullnessChecks >= maxFullnessChecks) {
        removeFromArray(txrQ, txr);
      } else {
        txr.fullnessChecks++;
      }
    };
    ETCp.retireTexture = function(txr) {
      var self2 = this;
      var txrH = txr.height;
      var txrQ = self2.getTextureQueue(txrH);
      var lookup2 = this.lookup;
      removeFromArray(txrQ, txr);
      txr.retired = true;
      var eleCaches = txr.eleCaches;
      for (var i2 = 0; i2 < eleCaches.length; i2++) {
        var eleCache = eleCaches[i2];
        lookup2.deleteCache(eleCache.key, eleCache.level);
      }
      clearArray(eleCaches);
      var rtxtrQ = self2.getRetiredTextureQueue(txrH);
      rtxtrQ.push(txr);
    };
    ETCp.addTexture = function(txrH, minW) {
      var self2 = this;
      var txrQ = self2.getTextureQueue(txrH);
      var txr = {};
      txrQ.push(txr);
      txr.eleCaches = [];
      txr.height = txrH;
      txr.width = Math.max(defTxrWidth, minW);
      txr.usedWidth = 0;
      txr.invalidatedWidth = 0;
      txr.fullnessChecks = 0;
      txr.canvas = self2.renderer.makeOffscreenCanvas(txr.width, txr.height);
      txr.context = txr.canvas.getContext("2d");
      return txr;
    };
    ETCp.recycleTexture = function(txrH, minW) {
      var self2 = this;
      var txrQ = self2.getTextureQueue(txrH);
      var rtxtrQ = self2.getRetiredTextureQueue(txrH);
      for (var i2 = 0; i2 < rtxtrQ.length; i2++) {
        var txr = rtxtrQ[i2];
        if (txr.width >= minW) {
          txr.retired = false;
          txr.usedWidth = 0;
          txr.invalidatedWidth = 0;
          txr.fullnessChecks = 0;
          clearArray(txr.eleCaches);
          txr.context.setTransform(1, 0, 0, 1, 0, 0);
          txr.context.clearRect(0, 0, txr.width, txr.height);
          removeFromArray(rtxtrQ, txr);
          txrQ.push(txr);
          return txr;
        }
      }
    };
    ETCp.queueElement = function(ele, lvl) {
      var self2 = this;
      var q = self2.getElementQueue();
      var k2q = self2.getElementKeyToQueue();
      var key = this.getKey(ele);
      var existingReq = k2q[key];
      if (existingReq) {
        existingReq.level = Math.max(existingReq.level, lvl);
        existingReq.eles.merge(ele);
        existingReq.reqs++;
        q.updateItem(existingReq);
      } else {
        var req = {
          eles: ele.spawn().merge(ele),
          level: lvl,
          reqs: 1,
          key
        };
        q.push(req);
        k2q[key] = req;
      }
    };
    ETCp.dequeue = function(pxRatio) {
      var self2 = this;
      var q = self2.getElementQueue();
      var k2q = self2.getElementKeyToQueue();
      var dequeued = [];
      var lookup2 = self2.lookup;
      for (var i2 = 0; i2 < maxDeqSize$1; i2++) {
        if (q.size() > 0) {
          var req = q.pop();
          var key = req.key;
          var ele = req.eles[0];
          var cacheExists = lookup2.hasCache(ele, req.level);
          k2q[key] = null;
          if (cacheExists) {
            continue;
          }
          dequeued.push(req);
          var bb = self2.getBoundingBox(ele);
          self2.getElement(ele, bb, pxRatio, req.level, getTxrReasons.dequeue);
        } else {
          break;
        }
      }
      return dequeued;
    };
    ETCp.removeFromQueue = function(ele) {
      var self2 = this;
      var q = self2.getElementQueue();
      var k2q = self2.getElementKeyToQueue();
      var key = this.getKey(ele);
      var req = k2q[key];
      if (req != null) {
        if (req.eles.length === 1) {
          req.reqs = MAX_INT$1;
          q.updateItem(req);
          q.pop();
          k2q[key] = null;
        } else {
          req.eles.unmerge(ele);
        }
      }
    };
    ETCp.onDequeue = function(fn2) {
      this.onDequeues.push(fn2);
    };
    ETCp.offDequeue = function(fn2) {
      removeFromArray(this.onDequeues, fn2);
    };
    ETCp.setupDequeueing = defs.setupDequeueing({
      deqRedrawThreshold: deqRedrawThreshold$1,
      deqCost: deqCost$1,
      deqAvgCost: deqAvgCost$1,
      deqNoDrawCost: deqNoDrawCost$1,
      deqFastCost: deqFastCost$1,
      deq: function deq(self2, pxRatio, extent) {
        return self2.dequeue(pxRatio, extent);
      },
      onDeqd: function onDeqd(self2, deqd) {
        for (var i2 = 0; i2 < self2.onDequeues.length; i2++) {
          var fn2 = self2.onDequeues[i2];
          fn2(deqd);
        }
      },
      shouldRedraw: function shouldRedraw(self2, deqd, pxRatio, extent) {
        for (var i2 = 0; i2 < deqd.length; i2++) {
          var eles = deqd[i2].eles;
          for (var j = 0; j < eles.length; j++) {
            var bb = eles[j].boundingBox();
            if (boundingBoxesIntersect(bb, extent)) {
              return true;
            }
          }
        }
        return false;
      },
      priority: function priority(self2) {
        return self2.renderer.beforeRenderPriorities.eleTxrDeq;
      }
    });
    var defNumLayers = 1;
    var minLvl = -4;
    var maxLvl = 2;
    var maxZoom = 3.99;
    var deqRedrawThreshold = 50;
    var refineEleDebounceTime = 50;
    var deqCost = 0.15;
    var deqAvgCost = 0.1;
    var deqNoDrawCost = 0.9;
    var deqFastCost = 0.9;
    var maxDeqSize = 1;
    var invalidThreshold = 250;
    var maxLayerArea = 4e3 * 4e3;
    var useHighQualityEleTxrReqs = true;
    var LayeredTextureCache = function LayeredTextureCache2(renderer2) {
      var self2 = this;
      var r = self2.renderer = renderer2;
      var cy = r.cy;
      self2.layersByLevel = {};
      self2.firstGet = true;
      self2.lastInvalidationTime = performanceNow() - 2 * invalidThreshold;
      self2.skipping = false;
      self2.eleTxrDeqs = cy.collection();
      self2.scheduleElementRefinement = debounce__default["default"](function() {
        self2.refineElementTextures(self2.eleTxrDeqs);
        self2.eleTxrDeqs.unmerge(self2.eleTxrDeqs);
      }, refineEleDebounceTime);
      r.beforeRender(function(willDraw, now) {
        if (now - self2.lastInvalidationTime <= invalidThreshold) {
          self2.skipping = true;
        } else {
          self2.skipping = false;
        }
      }, r.beforeRenderPriorities.lyrTxrSkip);
      var qSort = function qSort2(a, b) {
        return b.reqs - a.reqs;
      };
      self2.layersQueue = new Heap__default["default"](qSort);
      self2.setupDequeueing();
    };
    var LTCp = LayeredTextureCache.prototype;
    var layerIdPool = 0;
    var MAX_INT = Math.pow(2, 53) - 1;
    LTCp.makeLayer = function(bb, lvl) {
      var scale = Math.pow(2, lvl);
      var w = Math.ceil(bb.w * scale);
      var h = Math.ceil(bb.h * scale);
      var canvas = this.renderer.makeOffscreenCanvas(w, h);
      var layer = {
        id: layerIdPool = ++layerIdPool % MAX_INT,
        bb,
        level: lvl,
        width: w,
        height: h,
        canvas,
        context: canvas.getContext("2d"),
        eles: [],
        elesQueue: [],
        reqs: 0
      };
      var cxt = layer.context;
      var dx = -layer.bb.x1;
      var dy = -layer.bb.y1;
      cxt.scale(scale, scale);
      cxt.translate(dx, dy);
      return layer;
    };
    LTCp.getLayers = function(eles, pxRatio, lvl) {
      var self2 = this;
      var r = self2.renderer;
      var cy = r.cy;
      var zoom = cy.zoom();
      var firstGet = self2.firstGet;
      self2.firstGet = false;
      if (lvl == null) {
        lvl = Math.ceil(log2(zoom * pxRatio));
        if (lvl < minLvl) {
          lvl = minLvl;
        } else if (zoom >= maxZoom || lvl > maxLvl) {
          return null;
        }
      }
      self2.validateLayersElesOrdering(lvl, eles);
      var layersByLvl = self2.layersByLevel;
      var scale = Math.pow(2, lvl);
      var layers = layersByLvl[lvl] = layersByLvl[lvl] || [];
      var bb;
      var lvlComplete = self2.levelIsComplete(lvl, eles);
      var tmpLayers;
      var checkTempLevels = function checkTempLevels2() {
        var canUseAsTmpLvl = function canUseAsTmpLvl2(l) {
          self2.validateLayersElesOrdering(l, eles);
          if (self2.levelIsComplete(l, eles)) {
            tmpLayers = layersByLvl[l];
            return true;
          }
        };
        var checkLvls = function checkLvls2(dir) {
          if (tmpLayers) {
            return;
          }
          for (var l = lvl + dir; minLvl <= l && l <= maxLvl; l += dir) {
            if (canUseAsTmpLvl(l)) {
              break;
            }
          }
        };
        checkLvls(1);
        checkLvls(-1);
        for (var i3 = layers.length - 1; i3 >= 0; i3--) {
          var layer2 = layers[i3];
          if (layer2.invalid) {
            removeFromArray(layers, layer2);
          }
        }
      };
      if (!lvlComplete) {
        checkTempLevels();
      } else {
        return layers;
      }
      var getBb = function getBb2() {
        if (!bb) {
          bb = makeBoundingBox();
          for (var i3 = 0; i3 < eles.length; i3++) {
            updateBoundingBox(bb, eles[i3].boundingBox());
          }
        }
        return bb;
      };
      var makeLayer = function makeLayer2(opts) {
        opts = opts || {};
        var after = opts.after;
        getBb();
        var area = bb.w * scale * (bb.h * scale);
        if (area > maxLayerArea) {
          return null;
        }
        var layer2 = self2.makeLayer(bb, lvl);
        if (after != null) {
          var index = layers.indexOf(after) + 1;
          layers.splice(index, 0, layer2);
        } else if (opts.insert === void 0 || opts.insert) {
          layers.unshift(layer2);
        }
        return layer2;
      };
      if (self2.skipping && !firstGet) {
        return null;
      }
      var layer = null;
      var maxElesPerLayer = eles.length / defNumLayers;
      var allowLazyQueueing = !firstGet;
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        var rs = ele._private.rscratch;
        var caches = rs.imgLayerCaches = rs.imgLayerCaches || {};
        var existingLayer = caches[lvl];
        if (existingLayer) {
          layer = existingLayer;
          continue;
        }
        if (!layer || layer.eles.length >= maxElesPerLayer || !boundingBoxInBoundingBox(layer.bb, ele.boundingBox())) {
          layer = makeLayer({
            insert: true,
            after: layer
          });
          if (!layer) {
            return null;
          }
        }
        if (tmpLayers || allowLazyQueueing) {
          self2.queueLayer(layer, ele);
        } else {
          self2.drawEleInLayer(layer, ele, lvl, pxRatio);
        }
        layer.eles.push(ele);
        caches[lvl] = layer;
      }
      if (tmpLayers) {
        return tmpLayers;
      }
      if (allowLazyQueueing) {
        return null;
      }
      return layers;
    };
    LTCp.getEleLevelForLayerLevel = function(lvl, pxRatio) {
      return lvl;
    };
    LTCp.drawEleInLayer = function(layer, ele, lvl, pxRatio) {
      var self2 = this;
      var r = this.renderer;
      var context = layer.context;
      var bb = ele.boundingBox();
      if (bb.w === 0 || bb.h === 0 || !ele.visible()) {
        return;
      }
      lvl = self2.getEleLevelForLayerLevel(lvl, pxRatio);
      {
        r.setImgSmoothing(context, false);
      }
      {
        r.drawCachedElement(context, ele, null, null, lvl, useHighQualityEleTxrReqs);
      }
      {
        r.setImgSmoothing(context, true);
      }
    };
    LTCp.levelIsComplete = function(lvl, eles) {
      var self2 = this;
      var layers = self2.layersByLevel[lvl];
      if (!layers || layers.length === 0) {
        return false;
      }
      var numElesInLayers = 0;
      for (var i2 = 0; i2 < layers.length; i2++) {
        var layer = layers[i2];
        if (layer.reqs > 0) {
          return false;
        }
        if (layer.invalid) {
          return false;
        }
        numElesInLayers += layer.eles.length;
      }
      if (numElesInLayers !== eles.length) {
        return false;
      }
      return true;
    };
    LTCp.validateLayersElesOrdering = function(lvl, eles) {
      var layers = this.layersByLevel[lvl];
      if (!layers) {
        return;
      }
      for (var i2 = 0; i2 < layers.length; i2++) {
        var layer = layers[i2];
        var offset = -1;
        for (var j = 0; j < eles.length; j++) {
          if (layer.eles[0] === eles[j]) {
            offset = j;
            break;
          }
        }
        if (offset < 0) {
          this.invalidateLayer(layer);
          continue;
        }
        var o = offset;
        for (var j = 0; j < layer.eles.length; j++) {
          if (layer.eles[j] !== eles[o + j]) {
            this.invalidateLayer(layer);
            break;
          }
        }
      }
    };
    LTCp.updateElementsInLayers = function(eles, update) {
      var self2 = this;
      var isEles = element(eles[0]);
      for (var i2 = 0; i2 < eles.length; i2++) {
        var req = isEles ? null : eles[i2];
        var ele = isEles ? eles[i2] : eles[i2].ele;
        var rs = ele._private.rscratch;
        var caches = rs.imgLayerCaches = rs.imgLayerCaches || {};
        for (var l = minLvl; l <= maxLvl; l++) {
          var layer = caches[l];
          if (!layer) {
            continue;
          }
          if (req && self2.getEleLevelForLayerLevel(layer.level) !== req.level) {
            continue;
          }
          update(layer, ele, req);
        }
      }
    };
    LTCp.haveLayers = function() {
      var self2 = this;
      var haveLayers = false;
      for (var l = minLvl; l <= maxLvl; l++) {
        var layers = self2.layersByLevel[l];
        if (layers && layers.length > 0) {
          haveLayers = true;
          break;
        }
      }
      return haveLayers;
    };
    LTCp.invalidateElements = function(eles) {
      var self2 = this;
      if (eles.length === 0) {
        return;
      }
      self2.lastInvalidationTime = performanceNow();
      if (eles.length === 0 || !self2.haveLayers()) {
        return;
      }
      self2.updateElementsInLayers(eles, function invalAssocLayers(layer, ele, req) {
        self2.invalidateLayer(layer);
      });
    };
    LTCp.invalidateLayer = function(layer) {
      this.lastInvalidationTime = performanceNow();
      if (layer.invalid) {
        return;
      }
      var lvl = layer.level;
      var eles = layer.eles;
      var layers = this.layersByLevel[lvl];
      removeFromArray(layers, layer);
      layer.elesQueue = [];
      layer.invalid = true;
      if (layer.replacement) {
        layer.replacement.invalid = true;
      }
      for (var i2 = 0; i2 < eles.length; i2++) {
        var caches = eles[i2]._private.rscratch.imgLayerCaches;
        if (caches) {
          caches[lvl] = null;
        }
      }
    };
    LTCp.refineElementTextures = function(eles) {
      var self2 = this;
      self2.updateElementsInLayers(eles, function refineEachEle(layer, ele, req) {
        var rLyr = layer.replacement;
        if (!rLyr) {
          rLyr = layer.replacement = self2.makeLayer(layer.bb, layer.level);
          rLyr.replaces = layer;
          rLyr.eles = layer.eles;
        }
        if (!rLyr.reqs) {
          for (var i2 = 0; i2 < rLyr.eles.length; i2++) {
            self2.queueLayer(rLyr, rLyr.eles[i2]);
          }
        }
      });
    };
    LTCp.enqueueElementRefinement = function(ele) {
      this.eleTxrDeqs.merge(ele);
      this.scheduleElementRefinement();
    };
    LTCp.queueLayer = function(layer, ele) {
      var self2 = this;
      var q = self2.layersQueue;
      var elesQ = layer.elesQueue;
      var hasId = elesQ.hasId = elesQ.hasId || {};
      if (layer.replacement) {
        return;
      }
      if (ele) {
        if (hasId[ele.id()]) {
          return;
        }
        elesQ.push(ele);
        hasId[ele.id()] = true;
      }
      if (layer.reqs) {
        layer.reqs++;
        q.updateItem(layer);
      } else {
        layer.reqs = 1;
        q.push(layer);
      }
    };
    LTCp.dequeue = function(pxRatio) {
      var self2 = this;
      var q = self2.layersQueue;
      var deqd = [];
      var eleDeqs = 0;
      while (eleDeqs < maxDeqSize) {
        if (q.size() === 0) {
          break;
        }
        var layer = q.peek();
        if (layer.replacement) {
          q.pop();
          continue;
        }
        if (layer.replaces && layer !== layer.replaces.replacement) {
          q.pop();
          continue;
        }
        if (layer.invalid) {
          q.pop();
          continue;
        }
        var ele = layer.elesQueue.shift();
        if (ele) {
          self2.drawEleInLayer(layer, ele, layer.level, pxRatio);
          eleDeqs++;
        }
        if (deqd.length === 0) {
          deqd.push(true);
        }
        if (layer.elesQueue.length === 0) {
          q.pop();
          layer.reqs = 0;
          if (layer.replaces) {
            self2.applyLayerReplacement(layer);
          }
          self2.requestRedraw();
        }
      }
      return deqd;
    };
    LTCp.applyLayerReplacement = function(layer) {
      var self2 = this;
      var layersInLevel = self2.layersByLevel[layer.level];
      var replaced = layer.replaces;
      var index = layersInLevel.indexOf(replaced);
      if (index < 0 || replaced.invalid) {
        return;
      }
      layersInLevel[index] = layer;
      for (var i2 = 0; i2 < layer.eles.length; i2++) {
        var _p = layer.eles[i2]._private;
        var cache2 = _p.imgLayerCaches = _p.imgLayerCaches || {};
        if (cache2) {
          cache2[layer.level] = layer;
        }
      }
      self2.requestRedraw();
    };
    LTCp.requestRedraw = debounce__default["default"](function() {
      var r = this.renderer;
      r.redrawHint("eles", true);
      r.redrawHint("drag", true);
      r.redraw();
    }, 100);
    LTCp.setupDequeueing = defs.setupDequeueing({
      deqRedrawThreshold,
      deqCost,
      deqAvgCost,
      deqNoDrawCost,
      deqFastCost,
      deq: function deq(self2, pxRatio) {
        return self2.dequeue(pxRatio);
      },
      onDeqd: noop$1,
      shouldRedraw: trueify,
      priority: function priority(self2) {
        return self2.renderer.beforeRenderPriorities.lyrTxrDeq;
      }
    });
    var CRp$a = {};
    var impl;
    function polygon(context, points) {
      for (var i2 = 0; i2 < points.length; i2++) {
        var pt = points[i2];
        context.lineTo(pt.x, pt.y);
      }
    }
    function triangleBackcurve(context, points, controlPoint) {
      var firstPt;
      for (var i2 = 0; i2 < points.length; i2++) {
        var pt = points[i2];
        if (i2 === 0) {
          firstPt = pt;
        }
        context.lineTo(pt.x, pt.y);
      }
      context.quadraticCurveTo(controlPoint.x, controlPoint.y, firstPt.x, firstPt.y);
    }
    function triangleTee(context, trianglePoints, teePoints) {
      if (context.beginPath) {
        context.beginPath();
      }
      var triPts = trianglePoints;
      for (var i2 = 0; i2 < triPts.length; i2++) {
        var pt = triPts[i2];
        context.lineTo(pt.x, pt.y);
      }
      var teePts = teePoints;
      var firstTeePt = teePoints[0];
      context.moveTo(firstTeePt.x, firstTeePt.y);
      for (var i2 = 1; i2 < teePts.length; i2++) {
        var pt = teePts[i2];
        context.lineTo(pt.x, pt.y);
      }
      if (context.closePath) {
        context.closePath();
      }
    }
    function circleTriangle(context, trianglePoints, rx, ry, r) {
      if (context.beginPath) {
        context.beginPath();
      }
      context.arc(rx, ry, r, 0, Math.PI * 2, false);
      var triPts = trianglePoints;
      var firstTrPt = triPts[0];
      context.moveTo(firstTrPt.x, firstTrPt.y);
      for (var i2 = 0; i2 < triPts.length; i2++) {
        var pt = triPts[i2];
        context.lineTo(pt.x, pt.y);
      }
      if (context.closePath) {
        context.closePath();
      }
    }
    function circle(context, rx, ry, r) {
      context.arc(rx, ry, r, 0, Math.PI * 2, false);
    }
    CRp$a.arrowShapeImpl = function(name) {
      return (impl || (impl = {
        "polygon": polygon,
        "triangle-backcurve": triangleBackcurve,
        "triangle-tee": triangleTee,
        "circle-triangle": circleTriangle,
        "triangle-cross": triangleTee,
        "circle": circle
      }))[name];
    };
    var CRp$9 = {};
    CRp$9.drawElement = function(context, ele, shiftToOriginWithBb, showLabel, showOverlay, showOpacity) {
      var r = this;
      if (ele.isNode()) {
        r.drawNode(context, ele, shiftToOriginWithBb, showLabel, showOverlay, showOpacity);
      } else {
        r.drawEdge(context, ele, shiftToOriginWithBb, showLabel, showOverlay, showOpacity);
      }
    };
    CRp$9.drawElementOverlay = function(context, ele) {
      var r = this;
      if (ele.isNode()) {
        r.drawNodeOverlay(context, ele);
      } else {
        r.drawEdgeOverlay(context, ele);
      }
    };
    CRp$9.drawElementUnderlay = function(context, ele) {
      var r = this;
      if (ele.isNode()) {
        r.drawNodeUnderlay(context, ele);
      } else {
        r.drawEdgeUnderlay(context, ele);
      }
    };
    CRp$9.drawCachedElementPortion = function(context, ele, eleTxrCache, pxRatio, lvl, reason, getRotation, getOpacity2) {
      var r = this;
      var bb = eleTxrCache.getBoundingBox(ele);
      if (bb.w === 0 || bb.h === 0) {
        return;
      }
      var eleCache = eleTxrCache.getElement(ele, bb, pxRatio, lvl, reason);
      if (eleCache != null) {
        var opacity = getOpacity2(r, ele);
        if (opacity === 0) {
          return;
        }
        var theta = getRotation(r, ele);
        var x1 = bb.x1, y1 = bb.y1, w = bb.w, h = bb.h;
        var x, y, sx, sy, smooth;
        if (theta !== 0) {
          var rotPt = eleTxrCache.getRotationPoint(ele);
          sx = rotPt.x;
          sy = rotPt.y;
          context.translate(sx, sy);
          context.rotate(theta);
          smooth = r.getImgSmoothing(context);
          if (!smooth) {
            r.setImgSmoothing(context, true);
          }
          var off = eleTxrCache.getRotationOffset(ele);
          x = off.x;
          y = off.y;
        } else {
          x = x1;
          y = y1;
        }
        var oldGlobalAlpha;
        if (opacity !== 1) {
          oldGlobalAlpha = context.globalAlpha;
          context.globalAlpha = oldGlobalAlpha * opacity;
        }
        context.drawImage(eleCache.texture.canvas, eleCache.x, 0, eleCache.width, eleCache.height, x, y, w, h);
        if (opacity !== 1) {
          context.globalAlpha = oldGlobalAlpha;
        }
        if (theta !== 0) {
          context.rotate(-theta);
          context.translate(-sx, -sy);
          if (!smooth) {
            r.setImgSmoothing(context, false);
          }
        }
      } else {
        eleTxrCache.drawElement(context, ele);
      }
    };
    var getZeroRotation = function getZeroRotation2() {
      return 0;
    };
    var getLabelRotation = function getLabelRotation2(r, ele) {
      return r.getTextAngle(ele, null);
    };
    var getSourceLabelRotation = function getSourceLabelRotation2(r, ele) {
      return r.getTextAngle(ele, "source");
    };
    var getTargetLabelRotation = function getTargetLabelRotation2(r, ele) {
      return r.getTextAngle(ele, "target");
    };
    var getOpacity = function getOpacity2(r, ele) {
      return ele.effectiveOpacity();
    };
    var getTextOpacity = function getTextOpacity2(e, ele) {
      return ele.pstyle("text-opacity").pfValue * ele.effectiveOpacity();
    };
    CRp$9.drawCachedElement = function(context, ele, pxRatio, extent, lvl, requestHighQuality) {
      var r = this;
      var _r$data = r.data, eleTxrCache = _r$data.eleTxrCache, lblTxrCache = _r$data.lblTxrCache, slbTxrCache = _r$data.slbTxrCache, tlbTxrCache = _r$data.tlbTxrCache;
      var bb = ele.boundingBox();
      var reason = requestHighQuality === true ? eleTxrCache.reasons.highQuality : null;
      if (bb.w === 0 || bb.h === 0 || !ele.visible()) {
        return;
      }
      if (!extent || boundingBoxesIntersect(bb, extent)) {
        var isEdge = ele.isEdge();
        var badLine = ele.element()._private.rscratch.badLine;
        r.drawElementUnderlay(context, ele);
        r.drawCachedElementPortion(context, ele, eleTxrCache, pxRatio, lvl, reason, getZeroRotation, getOpacity);
        if (!isEdge || !badLine) {
          r.drawCachedElementPortion(context, ele, lblTxrCache, pxRatio, lvl, reason, getLabelRotation, getTextOpacity);
        }
        if (isEdge && !badLine) {
          r.drawCachedElementPortion(context, ele, slbTxrCache, pxRatio, lvl, reason, getSourceLabelRotation, getTextOpacity);
          r.drawCachedElementPortion(context, ele, tlbTxrCache, pxRatio, lvl, reason, getTargetLabelRotation, getTextOpacity);
        }
        r.drawElementOverlay(context, ele);
      }
    };
    CRp$9.drawElements = function(context, eles) {
      var r = this;
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        r.drawElement(context, ele);
      }
    };
    CRp$9.drawCachedElements = function(context, eles, pxRatio, extent) {
      var r = this;
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        r.drawCachedElement(context, ele, pxRatio, extent);
      }
    };
    CRp$9.drawCachedNodes = function(context, eles, pxRatio, extent) {
      var r = this;
      for (var i2 = 0; i2 < eles.length; i2++) {
        var ele = eles[i2];
        if (!ele.isNode()) {
          continue;
        }
        r.drawCachedElement(context, ele, pxRatio, extent);
      }
    };
    CRp$9.drawLayeredElements = function(context, eles, pxRatio, extent) {
      var r = this;
      var layers = r.data.lyrTxrCache.getLayers(eles, pxRatio);
      if (layers) {
        for (var i2 = 0; i2 < layers.length; i2++) {
          var layer = layers[i2];
          var bb = layer.bb;
          if (bb.w === 0 || bb.h === 0) {
            continue;
          }
          context.drawImage(layer.canvas, bb.x1, bb.y1, bb.w, bb.h);
        }
      } else {
        r.drawCachedElements(context, eles, pxRatio, extent);
      }
    };
    var CRp$8 = {};
    CRp$8.drawEdge = function(context, edge, shiftToOriginWithBb) {
      var drawLabel = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      var shouldDrawOverlay = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
      var shouldDrawOpacity = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true;
      var r = this;
      var rs = edge._private.rscratch;
      if (shouldDrawOpacity && !edge.visible()) {
        return;
      }
      if (rs.badLine || rs.allpts == null || isNaN(rs.allpts[0])) {
        return;
      }
      var bb;
      if (shiftToOriginWithBb) {
        bb = shiftToOriginWithBb;
        context.translate(-bb.x1, -bb.y1);
      }
      var opacity = shouldDrawOpacity ? edge.pstyle("opacity").value : 1;
      var lineOpacity = shouldDrawOpacity ? edge.pstyle("line-opacity").value : 1;
      var curveStyle = edge.pstyle("curve-style").value;
      var lineStyle = edge.pstyle("line-style").value;
      var edgeWidth = edge.pstyle("width").pfValue;
      var lineCap = edge.pstyle("line-cap").value;
      var effectiveLineOpacity = opacity * lineOpacity;
      var effectiveArrowOpacity = opacity * lineOpacity;
      var drawLine = function drawLine2() {
        var strokeOpacity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : effectiveLineOpacity;
        if (curveStyle === "straight-triangle") {
          r.eleStrokeStyle(context, edge, strokeOpacity);
          r.drawEdgeTrianglePath(edge, context, rs.allpts);
        } else {
          context.lineWidth = edgeWidth;
          context.lineCap = lineCap;
          r.eleStrokeStyle(context, edge, strokeOpacity);
          r.drawEdgePath(edge, context, rs.allpts, lineStyle);
          context.lineCap = "butt";
        }
      };
      var drawOverlay = function drawOverlay2() {
        if (!shouldDrawOverlay) {
          return;
        }
        r.drawEdgeOverlay(context, edge);
      };
      var drawUnderlay = function drawUnderlay2() {
        if (!shouldDrawOverlay) {
          return;
        }
        r.drawEdgeUnderlay(context, edge);
      };
      var drawArrows = function drawArrows2() {
        var arrowOpacity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : effectiveArrowOpacity;
        r.drawArrowheads(context, edge, arrowOpacity);
      };
      var drawText = function drawText2() {
        r.drawElementText(context, edge, null, drawLabel);
      };
      context.lineJoin = "round";
      var ghost = edge.pstyle("ghost").value === "yes";
      if (ghost) {
        var gx = edge.pstyle("ghost-offset-x").pfValue;
        var gy = edge.pstyle("ghost-offset-y").pfValue;
        var ghostOpacity = edge.pstyle("ghost-opacity").value;
        var effectiveGhostOpacity = effectiveLineOpacity * ghostOpacity;
        context.translate(gx, gy);
        drawLine(effectiveGhostOpacity);
        drawArrows(effectiveGhostOpacity);
        context.translate(-gx, -gy);
      }
      drawUnderlay();
      drawLine();
      drawArrows();
      drawOverlay();
      drawText();
      if (shiftToOriginWithBb) {
        context.translate(bb.x1, bb.y1);
      }
    };
    var drawEdgeOverlayUnderlay = function drawEdgeOverlayUnderlay2(overlayOrUnderlay) {
      if (!["overlay", "underlay"].includes(overlayOrUnderlay)) {
        throw new Error("Invalid state");
      }
      return function(context, edge) {
        if (!edge.visible()) {
          return;
        }
        var opacity = edge.pstyle("".concat(overlayOrUnderlay, "-opacity")).value;
        if (opacity === 0) {
          return;
        }
        var r = this;
        var usePaths = r.usePaths();
        var rs = edge._private.rscratch;
        var padding = edge.pstyle("".concat(overlayOrUnderlay, "-padding")).pfValue;
        var width = 2 * padding;
        var color = edge.pstyle("".concat(overlayOrUnderlay, "-color")).value;
        context.lineWidth = width;
        if (rs.edgeType === "self" && !usePaths) {
          context.lineCap = "butt";
        } else {
          context.lineCap = "round";
        }
        r.colorStrokeStyle(context, color[0], color[1], color[2], opacity);
        r.drawEdgePath(edge, context, rs.allpts, "solid");
      };
    };
    CRp$8.drawEdgeOverlay = drawEdgeOverlayUnderlay("overlay");
    CRp$8.drawEdgeUnderlay = drawEdgeOverlayUnderlay("underlay");
    CRp$8.drawEdgePath = function(edge, context, pts2, type) {
      var rs = edge._private.rscratch;
      var canvasCxt = context;
      var path;
      var pathCacheHit = false;
      var usePaths = this.usePaths();
      var lineDashPattern = edge.pstyle("line-dash-pattern").pfValue;
      var lineDashOffset = edge.pstyle("line-dash-offset").pfValue;
      if (usePaths) {
        var pathCacheKey = pts2.join("$");
        var keyMatches = rs.pathCacheKey && rs.pathCacheKey === pathCacheKey;
        if (keyMatches) {
          path = context = rs.pathCache;
          pathCacheHit = true;
        } else {
          path = context = new Path2D();
          rs.pathCacheKey = pathCacheKey;
          rs.pathCache = path;
        }
      }
      if (canvasCxt.setLineDash) {
        switch (type) {
          case "dotted":
            canvasCxt.setLineDash([1, 1]);
            break;
          case "dashed":
            canvasCxt.setLineDash(lineDashPattern);
            canvasCxt.lineDashOffset = lineDashOffset;
            break;
          case "solid":
            canvasCxt.setLineDash([]);
            break;
        }
      }
      if (!pathCacheHit && !rs.badLine) {
        if (context.beginPath) {
          context.beginPath();
        }
        context.moveTo(pts2[0], pts2[1]);
        switch (rs.edgeType) {
          case "bezier":
          case "self":
          case "compound":
          case "multibezier":
            for (var i2 = 2; i2 + 3 < pts2.length; i2 += 4) {
              context.quadraticCurveTo(pts2[i2], pts2[i2 + 1], pts2[i2 + 2], pts2[i2 + 3]);
            }
            break;
          case "straight":
          case "segments":
          case "haystack":
            for (var _i = 2; _i + 1 < pts2.length; _i += 2) {
              context.lineTo(pts2[_i], pts2[_i + 1]);
            }
            break;
        }
      }
      context = canvasCxt;
      if (usePaths) {
        context.stroke(path);
      } else {
        context.stroke();
      }
      if (context.setLineDash) {
        context.setLineDash([]);
      }
    };
    CRp$8.drawEdgeTrianglePath = function(edge, context, pts2) {
      context.fillStyle = context.strokeStyle;
      var edgeWidth = edge.pstyle("width").pfValue;
      for (var i2 = 0; i2 + 1 < pts2.length; i2 += 2) {
        var vector = [pts2[i2 + 2] - pts2[i2], pts2[i2 + 3] - pts2[i2 + 1]];
        var length = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
        var normal = [vector[1] / length, -vector[0] / length];
        var triangleHead = [normal[0] * edgeWidth / 2, normal[1] * edgeWidth / 2];
        context.beginPath();
        context.moveTo(pts2[i2] - triangleHead[0], pts2[i2 + 1] - triangleHead[1]);
        context.lineTo(pts2[i2] + triangleHead[0], pts2[i2 + 1] + triangleHead[1]);
        context.lineTo(pts2[i2 + 2], pts2[i2 + 3]);
        context.closePath();
        context.fill();
      }
    };
    CRp$8.drawArrowheads = function(context, edge, opacity) {
      var rs = edge._private.rscratch;
      var isHaystack = rs.edgeType === "haystack";
      if (!isHaystack) {
        this.drawArrowhead(context, edge, "source", rs.arrowStartX, rs.arrowStartY, rs.srcArrowAngle, opacity);
      }
      this.drawArrowhead(context, edge, "mid-target", rs.midX, rs.midY, rs.midtgtArrowAngle, opacity);
      this.drawArrowhead(context, edge, "mid-source", rs.midX, rs.midY, rs.midsrcArrowAngle, opacity);
      if (!isHaystack) {
        this.drawArrowhead(context, edge, "target", rs.arrowEndX, rs.arrowEndY, rs.tgtArrowAngle, opacity);
      }
    };
    CRp$8.drawArrowhead = function(context, edge, prefix, x, y, angle, opacity) {
      if (isNaN(x) || x == null || isNaN(y) || y == null || isNaN(angle) || angle == null) {
        return;
      }
      var self2 = this;
      var arrowShape = edge.pstyle(prefix + "-arrow-shape").value;
      if (arrowShape === "none") {
        return;
      }
      var arrowClearFill = edge.pstyle(prefix + "-arrow-fill").value === "hollow" ? "both" : "filled";
      var arrowFill = edge.pstyle(prefix + "-arrow-fill").value;
      var edgeWidth = edge.pstyle("width").pfValue;
      var pArrowWidth = edge.pstyle(prefix + "-arrow-width");
      var arrowWidth = pArrowWidth.value === "match-line" ? edgeWidth : pArrowWidth.pfValue;
      if (pArrowWidth.units === "%") arrowWidth *= edgeWidth;
      var edgeOpacity = edge.pstyle("opacity").value;
      if (opacity === void 0) {
        opacity = edgeOpacity;
      }
      var gco = context.globalCompositeOperation;
      if (opacity !== 1 || arrowFill === "hollow") {
        context.globalCompositeOperation = "destination-out";
        self2.colorFillStyle(context, 255, 255, 255, 1);
        self2.colorStrokeStyle(context, 255, 255, 255, 1);
        self2.drawArrowShape(edge, context, arrowClearFill, edgeWidth, arrowShape, arrowWidth, x, y, angle);
        context.globalCompositeOperation = gco;
      }
      var color = edge.pstyle(prefix + "-arrow-color").value;
      self2.colorFillStyle(context, color[0], color[1], color[2], opacity);
      self2.colorStrokeStyle(context, color[0], color[1], color[2], opacity);
      self2.drawArrowShape(edge, context, arrowFill, edgeWidth, arrowShape, arrowWidth, x, y, angle);
    };
    CRp$8.drawArrowShape = function(edge, context, fill, edgeWidth, shape, shapeWidth, x, y, angle) {
      var r = this;
      var usePaths = this.usePaths() && shape !== "triangle-cross";
      var pathCacheHit = false;
      var path;
      var canvasContext = context;
      var translation = {
        x,
        y
      };
      var scale = edge.pstyle("arrow-scale").value;
      var size = this.getArrowWidth(edgeWidth, scale);
      var shapeImpl = r.arrowShapes[shape];
      if (usePaths) {
        var cache2 = r.arrowPathCache = r.arrowPathCache || [];
        var key = hashString(shape);
        var cachedPath = cache2[key];
        if (cachedPath != null) {
          path = context = cachedPath;
          pathCacheHit = true;
        } else {
          path = context = new Path2D();
          cache2[key] = path;
        }
      }
      if (!pathCacheHit) {
        if (context.beginPath) {
          context.beginPath();
        }
        if (usePaths) {
          shapeImpl.draw(context, 1, 0, {
            x: 0,
            y: 0
          }, 1);
        } else {
          shapeImpl.draw(context, size, angle, translation, edgeWidth);
        }
        if (context.closePath) {
          context.closePath();
        }
      }
      context = canvasContext;
      if (usePaths) {
        context.translate(x, y);
        context.rotate(angle);
        context.scale(size, size);
      }
      if (fill === "filled" || fill === "both") {
        if (usePaths) {
          context.fill(path);
        } else {
          context.fill();
        }
      }
      if (fill === "hollow" || fill === "both") {
        context.lineWidth = shapeWidth / (usePaths ? size : 1);
        context.lineJoin = "miter";
        if (usePaths) {
          context.stroke(path);
        } else {
          context.stroke();
        }
      }
      if (usePaths) {
        context.scale(1 / size, 1 / size);
        context.rotate(-angle);
        context.translate(-x, -y);
      }
    };
    var CRp$7 = {};
    CRp$7.safeDrawImage = function(context, img, ix, iy, iw, ih, x, y, w, h) {
      if (iw <= 0 || ih <= 0 || w <= 0 || h <= 0) {
        return;
      }
      try {
        context.drawImage(img, ix, iy, iw, ih, x, y, w, h);
      } catch (e) {
        warn(e);
      }
    };
    CRp$7.drawInscribedImage = function(context, img, node, index, nodeOpacity) {
      var r = this;
      var pos = node.position();
      var nodeX = pos.x;
      var nodeY = pos.y;
      var styleObj = node.cy().style();
      var getIndexedStyle = styleObj.getIndexedStyle.bind(styleObj);
      var fit = getIndexedStyle(node, "background-fit", "value", index);
      var repeat = getIndexedStyle(node, "background-repeat", "value", index);
      var nodeW = node.width();
      var nodeH = node.height();
      var paddingX2 = node.padding() * 2;
      var nodeTW = nodeW + (getIndexedStyle(node, "background-width-relative-to", "value", index) === "inner" ? 0 : paddingX2);
      var nodeTH = nodeH + (getIndexedStyle(node, "background-height-relative-to", "value", index) === "inner" ? 0 : paddingX2);
      var rs = node._private.rscratch;
      var clip = getIndexedStyle(node, "background-clip", "value", index);
      var shouldClip = clip === "node";
      var imgOpacity = getIndexedStyle(node, "background-image-opacity", "value", index) * nodeOpacity;
      var smooth = getIndexedStyle(node, "background-image-smoothing", "value", index);
      var imgW = img.width || img.cachedW;
      var imgH = img.height || img.cachedH;
      if (null == imgW || null == imgH) {
        document.body.appendChild(img);
        imgW = img.cachedW = img.width || img.offsetWidth;
        imgH = img.cachedH = img.height || img.offsetHeight;
        document.body.removeChild(img);
      }
      var w = imgW;
      var h = imgH;
      if (getIndexedStyle(node, "background-width", "value", index) !== "auto") {
        if (getIndexedStyle(node, "background-width", "units", index) === "%") {
          w = getIndexedStyle(node, "background-width", "pfValue", index) * nodeTW;
        } else {
          w = getIndexedStyle(node, "background-width", "pfValue", index);
        }
      }
      if (getIndexedStyle(node, "background-height", "value", index) !== "auto") {
        if (getIndexedStyle(node, "background-height", "units", index) === "%") {
          h = getIndexedStyle(node, "background-height", "pfValue", index) * nodeTH;
        } else {
          h = getIndexedStyle(node, "background-height", "pfValue", index);
        }
      }
      if (w === 0 || h === 0) {
        return;
      }
      if (fit === "contain") {
        var scale = Math.min(nodeTW / w, nodeTH / h);
        w *= scale;
        h *= scale;
      } else if (fit === "cover") {
        var scale = Math.max(nodeTW / w, nodeTH / h);
        w *= scale;
        h *= scale;
      }
      var x = nodeX - nodeTW / 2;
      var posXUnits = getIndexedStyle(node, "background-position-x", "units", index);
      var posXPfVal = getIndexedStyle(node, "background-position-x", "pfValue", index);
      if (posXUnits === "%") {
        x += (nodeTW - w) * posXPfVal;
      } else {
        x += posXPfVal;
      }
      var offXUnits = getIndexedStyle(node, "background-offset-x", "units", index);
      var offXPfVal = getIndexedStyle(node, "background-offset-x", "pfValue", index);
      if (offXUnits === "%") {
        x += (nodeTW - w) * offXPfVal;
      } else {
        x += offXPfVal;
      }
      var y = nodeY - nodeTH / 2;
      var posYUnits = getIndexedStyle(node, "background-position-y", "units", index);
      var posYPfVal = getIndexedStyle(node, "background-position-y", "pfValue", index);
      if (posYUnits === "%") {
        y += (nodeTH - h) * posYPfVal;
      } else {
        y += posYPfVal;
      }
      var offYUnits = getIndexedStyle(node, "background-offset-y", "units", index);
      var offYPfVal = getIndexedStyle(node, "background-offset-y", "pfValue", index);
      if (offYUnits === "%") {
        y += (nodeTH - h) * offYPfVal;
      } else {
        y += offYPfVal;
      }
      if (rs.pathCache) {
        x -= nodeX;
        y -= nodeY;
        nodeX = 0;
        nodeY = 0;
      }
      var gAlpha = context.globalAlpha;
      context.globalAlpha = imgOpacity;
      var smoothingEnabled = r.getImgSmoothing(context);
      var isSmoothingSwitched = false;
      if (smooth === "no" && smoothingEnabled) {
        r.setImgSmoothing(context, false);
        isSmoothingSwitched = true;
      } else if (smooth === "yes" && !smoothingEnabled) {
        r.setImgSmoothing(context, true);
        isSmoothingSwitched = true;
      }
      if (repeat === "no-repeat") {
        if (shouldClip) {
          context.save();
          if (rs.pathCache) {
            context.clip(rs.pathCache);
          } else {
            r.nodeShapes[r.getNodeShape(node)].draw(context, nodeX, nodeY, nodeTW, nodeTH);
            context.clip();
          }
        }
        r.safeDrawImage(context, img, 0, 0, imgW, imgH, x, y, w, h);
        if (shouldClip) {
          context.restore();
        }
      } else {
        var pattern = context.createPattern(img, repeat);
        context.fillStyle = pattern;
        r.nodeShapes[r.getNodeShape(node)].draw(context, nodeX, nodeY, nodeTW, nodeTH);
        context.translate(x, y);
        context.fill();
        context.translate(-x, -y);
      }
      context.globalAlpha = gAlpha;
      if (isSmoothingSwitched) {
        r.setImgSmoothing(context, smoothingEnabled);
      }
    };
    var CRp$6 = {};
    CRp$6.eleTextBiggerThanMin = function(ele, scale) {
      if (!scale) {
        var zoom = ele.cy().zoom();
        var pxRatio = this.getPixelRatio();
        var lvl = Math.ceil(log2(zoom * pxRatio));
        scale = Math.pow(2, lvl);
      }
      var computedSize = ele.pstyle("font-size").pfValue * scale;
      var minSize = ele.pstyle("min-zoomed-font-size").pfValue;
      if (computedSize < minSize) {
        return false;
      }
      return true;
    };
    CRp$6.drawElementText = function(context, ele, shiftToOriginWithBb, force, prefix) {
      var useEleOpacity = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true;
      var r = this;
      if (force == null) {
        if (useEleOpacity && !r.eleTextBiggerThanMin(ele)) {
          return;
        }
      } else if (force === false) {
        return;
      }
      if (ele.isNode()) {
        var label = ele.pstyle("label");
        if (!label || !label.value) {
          return;
        }
        var justification = r.getLabelJustification(ele);
        context.textAlign = justification;
        context.textBaseline = "bottom";
      } else {
        var badLine = ele.element()._private.rscratch.badLine;
        var _label = ele.pstyle("label");
        var srcLabel = ele.pstyle("source-label");
        var tgtLabel = ele.pstyle("target-label");
        if (badLine || (!_label || !_label.value) && (!srcLabel || !srcLabel.value) && (!tgtLabel || !tgtLabel.value)) {
          return;
        }
        context.textAlign = "center";
        context.textBaseline = "bottom";
      }
      var applyRotation = !shiftToOriginWithBb;
      var bb;
      if (shiftToOriginWithBb) {
        bb = shiftToOriginWithBb;
        context.translate(-bb.x1, -bb.y1);
      }
      if (prefix == null) {
        r.drawText(context, ele, null, applyRotation, useEleOpacity);
        if (ele.isEdge()) {
          r.drawText(context, ele, "source", applyRotation, useEleOpacity);
          r.drawText(context, ele, "target", applyRotation, useEleOpacity);
        }
      } else {
        r.drawText(context, ele, prefix, applyRotation, useEleOpacity);
      }
      if (shiftToOriginWithBb) {
        context.translate(bb.x1, bb.y1);
      }
    };
    CRp$6.getFontCache = function(context) {
      var cache2;
      this.fontCaches = this.fontCaches || [];
      for (var i2 = 0; i2 < this.fontCaches.length; i2++) {
        cache2 = this.fontCaches[i2];
        if (cache2.context === context) {
          return cache2;
        }
      }
      cache2 = {
        context
      };
      this.fontCaches.push(cache2);
      return cache2;
    };
    CRp$6.setupTextStyle = function(context, ele) {
      var useEleOpacity = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      var labelStyle = ele.pstyle("font-style").strValue;
      var labelSize = ele.pstyle("font-size").pfValue + "px";
      var labelFamily = ele.pstyle("font-family").strValue;
      var labelWeight = ele.pstyle("font-weight").strValue;
      var opacity = useEleOpacity ? ele.effectiveOpacity() * ele.pstyle("text-opacity").value : 1;
      var outlineOpacity = ele.pstyle("text-outline-opacity").value * opacity;
      var color = ele.pstyle("color").value;
      var outlineColor = ele.pstyle("text-outline-color").value;
      context.font = labelStyle + " " + labelWeight + " " + labelSize + " " + labelFamily;
      context.lineJoin = "round";
      this.colorFillStyle(context, color[0], color[1], color[2], opacity);
      this.colorStrokeStyle(context, outlineColor[0], outlineColor[1], outlineColor[2], outlineOpacity);
    };
    function roundRect(ctx, x, y, width, height) {
      var radius = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 5;
      var stroke = arguments.length > 6 ? arguments[6] : void 0;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (stroke) ctx.stroke();
      else ctx.fill();
    }
    CRp$6.getTextAngle = function(ele, prefix) {
      var theta;
      var _p = ele._private;
      var rscratch = _p.rscratch;
      var pdash = prefix ? prefix + "-" : "";
      var rotation = ele.pstyle(pdash + "text-rotation");
      var textAngle = getPrefixedProperty(rscratch, "labelAngle", prefix);
      if (rotation.strValue === "autorotate") {
        theta = ele.isEdge() ? textAngle : 0;
      } else if (rotation.strValue === "none") {
        theta = 0;
      } else {
        theta = rotation.pfValue;
      }
      return theta;
    };
    CRp$6.drawText = function(context, ele, prefix) {
      var applyRotation = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      var useEleOpacity = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
      var _p = ele._private;
      var rscratch = _p.rscratch;
      var parentOpacity = useEleOpacity ? ele.effectiveOpacity() : 1;
      if (useEleOpacity && (parentOpacity === 0 || ele.pstyle("text-opacity").value === 0)) {
        return;
      }
      if (prefix === "main") {
        prefix = null;
      }
      var textX = getPrefixedProperty(rscratch, "labelX", prefix);
      var textY = getPrefixedProperty(rscratch, "labelY", prefix);
      var orgTextX, orgTextY;
      var text = this.getLabelText(ele, prefix);
      if (text != null && text !== "" && !isNaN(textX) && !isNaN(textY)) {
        this.setupTextStyle(context, ele, useEleOpacity);
        var pdash = prefix ? prefix + "-" : "";
        var textW = getPrefixedProperty(rscratch, "labelWidth", prefix);
        var textH = getPrefixedProperty(rscratch, "labelHeight", prefix);
        var marginX = ele.pstyle(pdash + "text-margin-x").pfValue;
        var marginY = ele.pstyle(pdash + "text-margin-y").pfValue;
        var isEdge = ele.isEdge();
        var halign = ele.pstyle("text-halign").value;
        var valign = ele.pstyle("text-valign").value;
        if (isEdge) {
          halign = "center";
          valign = "center";
        }
        textX += marginX;
        textY += marginY;
        var theta;
        if (!applyRotation) {
          theta = 0;
        } else {
          theta = this.getTextAngle(ele, prefix);
        }
        if (theta !== 0) {
          orgTextX = textX;
          orgTextY = textY;
          context.translate(orgTextX, orgTextY);
          context.rotate(theta);
          textX = 0;
          textY = 0;
        }
        switch (valign) {
          case "top":
            break;
          case "center":
            textY += textH / 2;
            break;
          case "bottom":
            textY += textH;
            break;
        }
        var backgroundOpacity = ele.pstyle("text-background-opacity").value;
        var borderOpacity = ele.pstyle("text-border-opacity").value;
        var textBorderWidth = ele.pstyle("text-border-width").pfValue;
        var backgroundPadding = ele.pstyle("text-background-padding").pfValue;
        var styleShape = ele.pstyle("text-background-shape").strValue;
        var rounded = styleShape.indexOf("round") === 0;
        var roundRadius = 2;
        if (backgroundOpacity > 0 || textBorderWidth > 0 && borderOpacity > 0) {
          var bgX = textX - backgroundPadding;
          switch (halign) {
            case "left":
              bgX -= textW;
              break;
            case "center":
              bgX -= textW / 2;
              break;
          }
          var bgY = textY - textH - backgroundPadding;
          var bgW = textW + 2 * backgroundPadding;
          var bgH = textH + 2 * backgroundPadding;
          if (backgroundOpacity > 0) {
            var textFill = context.fillStyle;
            var textBackgroundColor = ele.pstyle("text-background-color").value;
            context.fillStyle = "rgba(" + textBackgroundColor[0] + "," + textBackgroundColor[1] + "," + textBackgroundColor[2] + "," + backgroundOpacity * parentOpacity + ")";
            if (rounded) {
              roundRect(context, bgX, bgY, bgW, bgH, roundRadius);
            } else {
              context.fillRect(bgX, bgY, bgW, bgH);
            }
            context.fillStyle = textFill;
          }
          if (textBorderWidth > 0 && borderOpacity > 0) {
            var textStroke = context.strokeStyle;
            var textLineWidth = context.lineWidth;
            var textBorderColor = ele.pstyle("text-border-color").value;
            var textBorderStyle = ele.pstyle("text-border-style").value;
            context.strokeStyle = "rgba(" + textBorderColor[0] + "," + textBorderColor[1] + "," + textBorderColor[2] + "," + borderOpacity * parentOpacity + ")";
            context.lineWidth = textBorderWidth;
            if (context.setLineDash) {
              switch (textBorderStyle) {
                case "dotted":
                  context.setLineDash([1, 1]);
                  break;
                case "dashed":
                  context.setLineDash([4, 2]);
                  break;
                case "double":
                  context.lineWidth = textBorderWidth / 4;
                  context.setLineDash([]);
                  break;
                case "solid":
                  context.setLineDash([]);
                  break;
              }
            }
            if (rounded) {
              roundRect(context, bgX, bgY, bgW, bgH, roundRadius, "stroke");
            } else {
              context.strokeRect(bgX, bgY, bgW, bgH);
            }
            if (textBorderStyle === "double") {
              var whiteWidth = textBorderWidth / 2;
              if (rounded) {
                roundRect(context, bgX + whiteWidth, bgY + whiteWidth, bgW - whiteWidth * 2, bgH - whiteWidth * 2, roundRadius, "stroke");
              } else {
                context.strokeRect(bgX + whiteWidth, bgY + whiteWidth, bgW - whiteWidth * 2, bgH - whiteWidth * 2);
              }
            }
            if (context.setLineDash) {
              context.setLineDash([]);
            }
            context.lineWidth = textLineWidth;
            context.strokeStyle = textStroke;
          }
        }
        var lineWidth = 2 * ele.pstyle("text-outline-width").pfValue;
        if (lineWidth > 0) {
          context.lineWidth = lineWidth;
        }
        if (ele.pstyle("text-wrap").value === "wrap") {
          var lines = getPrefixedProperty(rscratch, "labelWrapCachedLines", prefix);
          var lineHeight = getPrefixedProperty(rscratch, "labelLineHeight", prefix);
          var halfTextW = textW / 2;
          var justification = this.getLabelJustification(ele);
          if (justification === "auto") ;
          else if (halign === "left") {
            if (justification === "left") {
              textX += -textW;
            } else if (justification === "center") {
              textX += -halfTextW;
            }
          } else if (halign === "center") {
            if (justification === "left") {
              textX += -halfTextW;
            } else if (justification === "right") {
              textX += halfTextW;
            }
          } else if (halign === "right") {
            if (justification === "center") {
              textX += halfTextW;
            } else if (justification === "right") {
              textX += textW;
            }
          }
          switch (valign) {
            case "top":
              textY -= (lines.length - 1) * lineHeight;
              break;
            case "center":
            case "bottom":
              textY -= (lines.length - 1) * lineHeight;
              break;
          }
          for (var l = 0; l < lines.length; l++) {
            if (lineWidth > 0) {
              context.strokeText(lines[l], textX, textY);
            }
            context.fillText(lines[l], textX, textY);
            textY += lineHeight;
          }
        } else {
          if (lineWidth > 0) {
            context.strokeText(text, textX, textY);
          }
          context.fillText(text, textX, textY);
        }
        if (theta !== 0) {
          context.rotate(-theta);
          context.translate(-orgTextX, -orgTextY);
        }
      }
    };
    var CRp$5 = {};
    CRp$5.drawNode = function(context, node, shiftToOriginWithBb) {
      var drawLabel = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      var shouldDrawOverlay = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
      var shouldDrawOpacity = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true;
      var r = this;
      var nodeWidth, nodeHeight;
      var _p = node._private;
      var rs = _p.rscratch;
      var pos = node.position();
      if (!number$1(pos.x) || !number$1(pos.y)) {
        return;
      }
      if (shouldDrawOpacity && !node.visible()) {
        return;
      }
      var eleOpacity = shouldDrawOpacity ? node.effectiveOpacity() : 1;
      var usePaths = r.usePaths();
      var path;
      var pathCacheHit = false;
      var padding = node.padding();
      nodeWidth = node.width() + 2 * padding;
      nodeHeight = node.height() + 2 * padding;
      var bb;
      if (shiftToOriginWithBb) {
        bb = shiftToOriginWithBb;
        context.translate(-bb.x1, -bb.y1);
      }
      var bgImgProp = node.pstyle("background-image");
      var urls = bgImgProp.value;
      var urlDefined = new Array(urls.length);
      var image = new Array(urls.length);
      var numImages = 0;
      for (var i2 = 0; i2 < urls.length; i2++) {
        var url = urls[i2];
        var defd = urlDefined[i2] = url != null && url !== "none";
        if (defd) {
          var bgImgCrossOrigin = node.cy().style().getIndexedStyle(node, "background-image-crossorigin", "value", i2);
          numImages++;
          image[i2] = r.getCachedImage(url, bgImgCrossOrigin, function() {
            _p.backgroundTimestamp = Date.now();
            node.emitAndNotify("background");
          });
        }
      }
      var darkness = node.pstyle("background-blacken").value;
      var borderWidth = node.pstyle("border-width").pfValue;
      var bgOpacity = node.pstyle("background-opacity").value * eleOpacity;
      var borderColor = node.pstyle("border-color").value;
      var borderStyle = node.pstyle("border-style").value;
      var borderOpacity = node.pstyle("border-opacity").value * eleOpacity;
      var outlineWidth = node.pstyle("outline-width").pfValue;
      var outlineColor = node.pstyle("outline-color").value;
      var outlineStyle = node.pstyle("outline-style").value;
      var outlineOpacity = node.pstyle("outline-opacity").value * eleOpacity;
      var outlineOffset = node.pstyle("outline-offset").value;
      context.lineJoin = "miter";
      var setupShapeColor = function setupShapeColor2() {
        var bgOpy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : bgOpacity;
        r.eleFillStyle(context, node, bgOpy);
      };
      var setupBorderColor = function setupBorderColor2() {
        var bdrOpy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : borderOpacity;
        r.colorStrokeStyle(context, borderColor[0], borderColor[1], borderColor[2], bdrOpy);
      };
      var setupOutlineColor = function setupOutlineColor2() {
        var otlnOpy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : outlineOpacity;
        r.colorStrokeStyle(context, outlineColor[0], outlineColor[1], outlineColor[2], otlnOpy);
      };
      var getPath = function getPath2(width, height, shape, points) {
        var pathCache = r.nodePathCache = r.nodePathCache || [];
        var key = hashStrings(shape === "polygon" ? shape + "," + points.join(",") : shape, "" + height, "" + width);
        var cachedPath = pathCache[key];
        var path2;
        var cacheHit = false;
        if (cachedPath != null) {
          path2 = cachedPath;
          cacheHit = true;
          rs.pathCache = path2;
        } else {
          path2 = new Path2D();
          pathCache[key] = rs.pathCache = path2;
        }
        return {
          path: path2,
          cacheHit
        };
      };
      var styleShape = node.pstyle("shape").strValue;
      var shapePts = node.pstyle("shape-polygon-points").pfValue;
      if (usePaths) {
        context.translate(pos.x, pos.y);
        var shapePath = getPath(nodeWidth, nodeHeight, styleShape, shapePts);
        path = shapePath.path;
        pathCacheHit = shapePath.cacheHit;
      }
      var drawShape = function drawShape2() {
        if (!pathCacheHit) {
          var npos = pos;
          if (usePaths) {
            npos = {
              x: 0,
              y: 0
            };
          }
          r.nodeShapes[r.getNodeShape(node)].draw(path || context, npos.x, npos.y, nodeWidth, nodeHeight);
        }
        if (usePaths) {
          context.fill(path);
        } else {
          context.fill();
        }
      };
      var drawImages = function drawImages2() {
        var nodeOpacity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : eleOpacity;
        var inside = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var prevBging = _p.backgrounding;
        var totalCompleted = 0;
        for (var _i = 0; _i < image.length; _i++) {
          var bgContainment = node.cy().style().getIndexedStyle(node, "background-image-containment", "value", _i);
          if (inside && bgContainment === "over" || !inside && bgContainment === "inside") {
            totalCompleted++;
            continue;
          }
          if (urlDefined[_i] && image[_i].complete && !image[_i].error) {
            totalCompleted++;
            r.drawInscribedImage(context, image[_i], node, _i, nodeOpacity);
          }
        }
        _p.backgrounding = !(totalCompleted === numImages);
        if (prevBging !== _p.backgrounding) {
          node.updateStyle(false);
        }
      };
      var drawPie = function drawPie2() {
        var redrawShape = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        var pieOpacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : eleOpacity;
        if (r.hasPie(node)) {
          r.drawPie(context, node, pieOpacity);
          if (redrawShape) {
            if (!usePaths) {
              r.nodeShapes[r.getNodeShape(node)].draw(context, pos.x, pos.y, nodeWidth, nodeHeight);
            }
          }
        }
      };
      var darken = function darken2() {
        var darkenOpacity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : eleOpacity;
        var opacity = (darkness > 0 ? darkness : -darkness) * darkenOpacity;
        var c = darkness > 0 ? 0 : 255;
        if (darkness !== 0) {
          r.colorFillStyle(context, c, c, c, opacity);
          if (usePaths) {
            context.fill(path);
          } else {
            context.fill();
          }
        }
      };
      var drawBorder = function drawBorder2() {
        if (borderWidth > 0) {
          context.lineWidth = borderWidth;
          context.lineCap = "butt";
          if (context.setLineDash) {
            switch (borderStyle) {
              case "dotted":
                context.setLineDash([1, 1]);
                break;
              case "dashed":
                context.setLineDash([4, 2]);
                break;
              case "solid":
              case "double":
                context.setLineDash([]);
                break;
            }
          }
          if (usePaths) {
            context.stroke(path);
          } else {
            context.stroke();
          }
          if (borderStyle === "double") {
            context.lineWidth = borderWidth / 3;
            var gco = context.globalCompositeOperation;
            context.globalCompositeOperation = "destination-out";
            if (usePaths) {
              context.stroke(path);
            } else {
              context.stroke();
            }
            context.globalCompositeOperation = gco;
          }
          if (context.setLineDash) {
            context.setLineDash([]);
          }
        }
      };
      var drawOutline = function drawOutline2() {
        if (outlineWidth > 0) {
          context.lineWidth = outlineWidth;
          context.lineCap = "butt";
          if (context.setLineDash) {
            switch (outlineStyle) {
              case "dotted":
                context.setLineDash([1, 1]);
                break;
              case "dashed":
                context.setLineDash([4, 2]);
                break;
              case "solid":
              case "double":
                context.setLineDash([]);
                break;
            }
          }
          var npos = pos;
          if (usePaths) {
            npos = {
              x: 0,
              y: 0
            };
          }
          var shape = r.getNodeShape(node);
          var scaleX = (nodeWidth + borderWidth + (outlineWidth + outlineOffset)) / nodeWidth;
          var scaleY = (nodeHeight + borderWidth + (outlineWidth + outlineOffset)) / nodeHeight;
          var sWidth = nodeWidth * scaleX;
          var sHeight = nodeHeight * scaleY;
          var points = r.nodeShapes[shape].points;
          var _path;
          if (usePaths) {
            var outlinePath = getPath(sWidth, sHeight, shape, points);
            _path = outlinePath.path;
          }
          if (shape === "ellipse") {
            r.drawEllipsePath(_path || context, npos.x, npos.y, sWidth, sHeight);
          } else if (["round-diamond", "round-heptagon", "round-hexagon", "round-octagon", "round-pentagon", "round-polygon", "round-triangle", "round-tag"].includes(shape)) {
            var sMult = 0;
            var offsetX = 0;
            var offsetY = 0;
            if (shape === "round-diamond") {
              sMult = (borderWidth + outlineOffset + outlineWidth) * 1.4;
            } else if (shape === "round-heptagon") {
              sMult = (borderWidth + outlineOffset + outlineWidth) * 1.075;
              offsetY = -(borderWidth / 2 + outlineOffset + outlineWidth) / 35;
            } else if (shape === "round-hexagon") {
              sMult = (borderWidth + outlineOffset + outlineWidth) * 1.12;
            } else if (shape === "round-pentagon") {
              sMult = (borderWidth + outlineOffset + outlineWidth) * 1.13;
              offsetY = -(borderWidth / 2 + outlineOffset + outlineWidth) / 15;
            } else if (shape === "round-tag") {
              sMult = (borderWidth + outlineOffset + outlineWidth) * 1.12;
              offsetX = (borderWidth / 2 + outlineWidth + outlineOffset) * 0.07;
            } else if (shape === "round-triangle") {
              sMult = (borderWidth + outlineOffset + outlineWidth) * (Math.PI / 2);
              offsetY = -(borderWidth + outlineOffset / 2 + outlineWidth) / Math.PI;
            }
            if (sMult !== 0) {
              scaleX = (nodeWidth + sMult) / nodeWidth;
              scaleY = (nodeHeight + sMult) / nodeHeight;
            }
            r.drawRoundPolygonPath(_path || context, npos.x + offsetX, npos.y + offsetY, nodeWidth * scaleX, nodeHeight * scaleY, points);
          } else if (["roundrectangle", "round-rectangle"].includes(shape)) {
            r.drawRoundRectanglePath(_path || context, npos.x, npos.y, sWidth, sHeight);
          } else if (["cutrectangle", "cut-rectangle"].includes(shape)) {
            r.drawCutRectanglePath(_path || context, npos.x, npos.y, sWidth, sHeight);
          } else if (["bottomroundrectangle", "bottom-round-rectangle"].includes(shape)) {
            r.drawBottomRoundRectanglePath(_path || context, npos.x, npos.y, sWidth, sHeight);
          } else if (shape === "barrel") {
            r.drawBarrelPath(_path || context, npos.x, npos.y, sWidth, sHeight);
          } else if (shape.startsWith("polygon") || ["rhomboid", "right-rhomboid", "round-tag", "tag", "vee"].includes(shape)) {
            var pad = (borderWidth + outlineWidth + outlineOffset) / nodeWidth;
            points = joinLines(expandPolygon(points, pad));
            r.drawPolygonPath(_path || context, npos.x, npos.y, nodeWidth, nodeHeight, points);
          } else {
            var _pad = (borderWidth + outlineWidth + outlineOffset) / nodeWidth;
            points = joinLines(expandPolygon(points, -_pad));
            r.drawPolygonPath(_path || context, npos.x, npos.y, nodeWidth, nodeHeight, points);
          }
          if (usePaths) {
            context.stroke(_path);
          } else {
            context.stroke();
          }
          if (outlineStyle === "double") {
            context.lineWidth = borderWidth / 3;
            var gco = context.globalCompositeOperation;
            context.globalCompositeOperation = "destination-out";
            if (usePaths) {
              context.stroke(_path);
            } else {
              context.stroke();
            }
            context.globalCompositeOperation = gco;
          }
          if (context.setLineDash) {
            context.setLineDash([]);
          }
        }
      };
      var drawOverlay = function drawOverlay2() {
        if (shouldDrawOverlay) {
          r.drawNodeOverlay(context, node, pos, nodeWidth, nodeHeight);
        }
      };
      var drawUnderlay = function drawUnderlay2() {
        if (shouldDrawOverlay) {
          r.drawNodeUnderlay(context, node, pos, nodeWidth, nodeHeight);
        }
      };
      var drawText = function drawText2() {
        r.drawElementText(context, node, null, drawLabel);
      };
      var ghost = node.pstyle("ghost").value === "yes";
      if (ghost) {
        var gx = node.pstyle("ghost-offset-x").pfValue;
        var gy = node.pstyle("ghost-offset-y").pfValue;
        var ghostOpacity = node.pstyle("ghost-opacity").value;
        var effGhostOpacity = ghostOpacity * eleOpacity;
        context.translate(gx, gy);
        setupOutlineColor();
        drawOutline();
        setupShapeColor(ghostOpacity * bgOpacity);
        drawShape();
        drawImages(effGhostOpacity, true);
        setupBorderColor(ghostOpacity * borderOpacity);
        drawBorder();
        drawPie(darkness !== 0 || borderWidth !== 0);
        drawImages(effGhostOpacity, false);
        darken(effGhostOpacity);
        context.translate(-gx, -gy);
      }
      if (usePaths) {
        context.translate(-pos.x, -pos.y);
      }
      drawUnderlay();
      if (usePaths) {
        context.translate(pos.x, pos.y);
      }
      setupOutlineColor();
      drawOutline();
      setupShapeColor();
      drawShape();
      drawImages(eleOpacity, true);
      setupBorderColor();
      drawBorder();
      drawPie(darkness !== 0 || borderWidth !== 0);
      drawImages(eleOpacity, false);
      darken();
      if (usePaths) {
        context.translate(-pos.x, -pos.y);
      }
      drawText();
      drawOverlay();
      if (shiftToOriginWithBb) {
        context.translate(bb.x1, bb.y1);
      }
    };
    var drawNodeOverlayUnderlay = function drawNodeOverlayUnderlay2(overlayOrUnderlay) {
      if (!["overlay", "underlay"].includes(overlayOrUnderlay)) {
        throw new Error("Invalid state");
      }
      return function(context, node, pos, nodeWidth, nodeHeight) {
        var r = this;
        if (!node.visible()) {
          return;
        }
        var padding = node.pstyle("".concat(overlayOrUnderlay, "-padding")).pfValue;
        var opacity = node.pstyle("".concat(overlayOrUnderlay, "-opacity")).value;
        var color = node.pstyle("".concat(overlayOrUnderlay, "-color")).value;
        var shape = node.pstyle("".concat(overlayOrUnderlay, "-shape")).value;
        if (opacity > 0) {
          pos = pos || node.position();
          if (nodeWidth == null || nodeHeight == null) {
            var _padding = node.padding();
            nodeWidth = node.width() + 2 * _padding;
            nodeHeight = node.height() + 2 * _padding;
          }
          r.colorFillStyle(context, color[0], color[1], color[2], opacity);
          r.nodeShapes[shape].draw(context, pos.x, pos.y, nodeWidth + padding * 2, nodeHeight + padding * 2);
          context.fill();
        }
      };
    };
    CRp$5.drawNodeOverlay = drawNodeOverlayUnderlay("overlay");
    CRp$5.drawNodeUnderlay = drawNodeOverlayUnderlay("underlay");
    CRp$5.hasPie = function(node) {
      node = node[0];
      return node._private.hasPie;
    };
    CRp$5.drawPie = function(context, node, nodeOpacity, pos) {
      node = node[0];
      pos = pos || node.position();
      var cyStyle = node.cy().style();
      var pieSize = node.pstyle("pie-size");
      var x = pos.x;
      var y = pos.y;
      var nodeW = node.width();
      var nodeH = node.height();
      var radius = Math.min(nodeW, nodeH) / 2;
      var lastPercent = 0;
      var usePaths = this.usePaths();
      if (usePaths) {
        x = 0;
        y = 0;
      }
      if (pieSize.units === "%") {
        radius = radius * pieSize.pfValue;
      } else if (pieSize.pfValue !== void 0) {
        radius = pieSize.pfValue / 2;
      }
      for (var i2 = 1; i2 <= cyStyle.pieBackgroundN; i2++) {
        var size = node.pstyle("pie-" + i2 + "-background-size").value;
        var color = node.pstyle("pie-" + i2 + "-background-color").value;
        var opacity = node.pstyle("pie-" + i2 + "-background-opacity").value * nodeOpacity;
        var percent = size / 100;
        if (percent + lastPercent > 1) {
          percent = 1 - lastPercent;
        }
        var angleStart = 1.5 * Math.PI + 2 * Math.PI * lastPercent;
        var angleDelta = 2 * Math.PI * percent;
        var angleEnd = angleStart + angleDelta;
        if (size === 0 || lastPercent >= 1 || lastPercent + percent > 1) {
          continue;
        }
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, radius, angleStart, angleEnd);
        context.closePath();
        this.colorFillStyle(context, color[0], color[1], color[2], opacity);
        context.fill();
        lastPercent += percent;
      }
    };
    var CRp$4 = {};
    var motionBlurDelay = 100;
    CRp$4.getPixelRatio = function() {
      var context = this.data.contexts[0];
      if (this.forcedPixelRatio != null) {
        return this.forcedPixelRatio;
      }
      var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    };
    CRp$4.paintCache = function(context) {
      var caches = this.paintCaches = this.paintCaches || [];
      var needToCreateCache = true;
      var cache2;
      for (var i2 = 0; i2 < caches.length; i2++) {
        cache2 = caches[i2];
        if (cache2.context === context) {
          needToCreateCache = false;
          break;
        }
      }
      if (needToCreateCache) {
        cache2 = {
          context
        };
        caches.push(cache2);
      }
      return cache2;
    };
    CRp$4.createGradientStyleFor = function(context, shapeStyleName, ele, fill, opacity) {
      var gradientStyle;
      var usePaths = this.usePaths();
      var colors2 = ele.pstyle(shapeStyleName + "-gradient-stop-colors").value, positions = ele.pstyle(shapeStyleName + "-gradient-stop-positions").pfValue;
      if (fill === "radial-gradient") {
        if (ele.isEdge()) {
          var start = ele.sourceEndpoint(), end = ele.targetEndpoint(), mid = ele.midpoint();
          var d1 = dist(start, mid);
          var d2 = dist(end, mid);
          gradientStyle = context.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, Math.max(d1, d2));
        } else {
          var pos = usePaths ? {
            x: 0,
            y: 0
          } : ele.position(), width = ele.paddedWidth(), height = ele.paddedHeight();
          gradientStyle = context.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, Math.max(width, height));
        }
      } else {
        if (ele.isEdge()) {
          var _start = ele.sourceEndpoint(), _end = ele.targetEndpoint();
          gradientStyle = context.createLinearGradient(_start.x, _start.y, _end.x, _end.y);
        } else {
          var _pos = usePaths ? {
            x: 0,
            y: 0
          } : ele.position(), _width = ele.paddedWidth(), _height = ele.paddedHeight(), halfWidth = _width / 2, halfHeight = _height / 2;
          var direction = ele.pstyle("background-gradient-direction").value;
          switch (direction) {
            case "to-bottom":
              gradientStyle = context.createLinearGradient(_pos.x, _pos.y - halfHeight, _pos.x, _pos.y + halfHeight);
              break;
            case "to-top":
              gradientStyle = context.createLinearGradient(_pos.x, _pos.y + halfHeight, _pos.x, _pos.y - halfHeight);
              break;
            case "to-left":
              gradientStyle = context.createLinearGradient(_pos.x + halfWidth, _pos.y, _pos.x - halfWidth, _pos.y);
              break;
            case "to-right":
              gradientStyle = context.createLinearGradient(_pos.x - halfWidth, _pos.y, _pos.x + halfWidth, _pos.y);
              break;
            case "to-bottom-right":
            case "to-right-bottom":
              gradientStyle = context.createLinearGradient(_pos.x - halfWidth, _pos.y - halfHeight, _pos.x + halfWidth, _pos.y + halfHeight);
              break;
            case "to-top-right":
            case "to-right-top":
              gradientStyle = context.createLinearGradient(_pos.x - halfWidth, _pos.y + halfHeight, _pos.x + halfWidth, _pos.y - halfHeight);
              break;
            case "to-bottom-left":
            case "to-left-bottom":
              gradientStyle = context.createLinearGradient(_pos.x + halfWidth, _pos.y - halfHeight, _pos.x - halfWidth, _pos.y + halfHeight);
              break;
            case "to-top-left":
            case "to-left-top":
              gradientStyle = context.createLinearGradient(_pos.x + halfWidth, _pos.y + halfHeight, _pos.x - halfWidth, _pos.y - halfHeight);
              break;
          }
        }
      }
      if (!gradientStyle) return null;
      var hasPositions = positions.length === colors2.length;
      var length = colors2.length;
      for (var i2 = 0; i2 < length; i2++) {
        gradientStyle.addColorStop(hasPositions ? positions[i2] : i2 / (length - 1), "rgba(" + colors2[i2][0] + "," + colors2[i2][1] + "," + colors2[i2][2] + "," + opacity + ")");
      }
      return gradientStyle;
    };
    CRp$4.gradientFillStyle = function(context, ele, fill, opacity) {
      var gradientStyle = this.createGradientStyleFor(context, "background", ele, fill, opacity);
      if (!gradientStyle) return null;
      context.fillStyle = gradientStyle;
    };
    CRp$4.colorFillStyle = function(context, r, g, b, a) {
      context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    CRp$4.eleFillStyle = function(context, ele, opacity) {
      var backgroundFill = ele.pstyle("background-fill").value;
      if (backgroundFill === "linear-gradient" || backgroundFill === "radial-gradient") {
        this.gradientFillStyle(context, ele, backgroundFill, opacity);
      } else {
        var backgroundColor = ele.pstyle("background-color").value;
        this.colorFillStyle(context, backgroundColor[0], backgroundColor[1], backgroundColor[2], opacity);
      }
    };
    CRp$4.gradientStrokeStyle = function(context, ele, fill, opacity) {
      var gradientStyle = this.createGradientStyleFor(context, "line", ele, fill, opacity);
      if (!gradientStyle) return null;
      context.strokeStyle = gradientStyle;
    };
    CRp$4.colorStrokeStyle = function(context, r, g, b, a) {
      context.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    CRp$4.eleStrokeStyle = function(context, ele, opacity) {
      var lineFill = ele.pstyle("line-fill").value;
      if (lineFill === "linear-gradient" || lineFill === "radial-gradient") {
        this.gradientStrokeStyle(context, ele, lineFill, opacity);
      } else {
        var lineColor = ele.pstyle("line-color").value;
        this.colorStrokeStyle(context, lineColor[0], lineColor[1], lineColor[2], opacity);
      }
    };
    CRp$4.matchCanvasSize = function(container) {
      var r = this;
      var data2 = r.data;
      var bb = r.findContainerClientCoords();
      var width = bb[2];
      var height = bb[3];
      var pixelRatio = r.getPixelRatio();
      var mbPxRatio = r.motionBlurPxRatio;
      if (container === r.data.bufferCanvases[r.MOTIONBLUR_BUFFER_NODE] || container === r.data.bufferCanvases[r.MOTIONBLUR_BUFFER_DRAG]) {
        pixelRatio = mbPxRatio;
      }
      var canvasWidth = width * pixelRatio;
      var canvasHeight = height * pixelRatio;
      var canvas;
      if (canvasWidth === r.canvasWidth && canvasHeight === r.canvasHeight) {
        return;
      }
      r.fontCaches = null;
      var canvasContainer = data2.canvasContainer;
      canvasContainer.style.width = width + "px";
      canvasContainer.style.height = height + "px";
      for (var i2 = 0; i2 < r.CANVAS_LAYERS; i2++) {
        canvas = data2.canvases[i2];
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
      }
      for (var i2 = 0; i2 < r.BUFFER_COUNT; i2++) {
        canvas = data2.bufferCanvases[i2];
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
      }
      r.textureMult = 1;
      if (pixelRatio <= 1) {
        canvas = data2.bufferCanvases[r.TEXTURE_BUFFER];
        r.textureMult = 2;
        canvas.width = canvasWidth * r.textureMult;
        canvas.height = canvasHeight * r.textureMult;
      }
      r.canvasWidth = canvasWidth;
      r.canvasHeight = canvasHeight;
    };
    CRp$4.renderTo = function(cxt, zoom, pan, pxRatio) {
      this.render({
        forcedContext: cxt,
        forcedZoom: zoom,
        forcedPan: pan,
        drawAllLayers: true,
        forcedPxRatio: pxRatio
      });
    };
    CRp$4.render = function(options) {
      options = options || staticEmptyObject();
      var forcedContext = options.forcedContext;
      var drawAllLayers = options.drawAllLayers;
      var drawOnlyNodeLayer = options.drawOnlyNodeLayer;
      var forcedZoom = options.forcedZoom;
      var forcedPan = options.forcedPan;
      var r = this;
      var pixelRatio = options.forcedPxRatio === void 0 ? this.getPixelRatio() : options.forcedPxRatio;
      var cy = r.cy;
      var data2 = r.data;
      var needDraw = data2.canvasNeedsRedraw;
      var textureDraw = r.textureOnViewport && !forcedContext && (r.pinching || r.hoverData.dragging || r.swipePanning || r.data.wheelZooming);
      var motionBlur = options.motionBlur !== void 0 ? options.motionBlur : r.motionBlur;
      var mbPxRatio = r.motionBlurPxRatio;
      var hasCompoundNodes = cy.hasCompoundNodes();
      var inNodeDragGesture = r.hoverData.draggingEles;
      var inBoxSelection = r.hoverData.selecting || r.touchData.selecting ? true : false;
      motionBlur = motionBlur && !forcedContext && r.motionBlurEnabled && !inBoxSelection;
      var motionBlurFadeEffect = motionBlur;
      if (!forcedContext) {
        if (r.prevPxRatio !== pixelRatio) {
          r.invalidateContainerClientCoordsCache();
          r.matchCanvasSize(r.container);
          r.redrawHint("eles", true);
          r.redrawHint("drag", true);
        }
        r.prevPxRatio = pixelRatio;
      }
      if (!forcedContext && r.motionBlurTimeout) {
        clearTimeout(r.motionBlurTimeout);
      }
      if (motionBlur) {
        if (r.mbFrames == null) {
          r.mbFrames = 0;
        }
        r.mbFrames++;
        if (r.mbFrames < 3) {
          motionBlurFadeEffect = false;
        }
        if (r.mbFrames > r.minMbLowQualFrames) {
          r.motionBlurPxRatio = r.mbPxRBlurry;
        }
      }
      if (r.clearingMotionBlur) {
        r.motionBlurPxRatio = 1;
      }
      if (r.textureDrawLastFrame && !textureDraw) {
        needDraw[r.NODE] = true;
        needDraw[r.SELECT_BOX] = true;
      }
      var style = cy.style();
      var zoom = cy.zoom();
      var effectiveZoom = forcedZoom !== void 0 ? forcedZoom : zoom;
      var pan = cy.pan();
      var effectivePan = {
        x: pan.x,
        y: pan.y
      };
      var vp = {
        zoom,
        pan: {
          x: pan.x,
          y: pan.y
        }
      };
      var prevVp = r.prevViewport;
      var viewportIsDiff = prevVp === void 0 || vp.zoom !== prevVp.zoom || vp.pan.x !== prevVp.pan.x || vp.pan.y !== prevVp.pan.y;
      if (!viewportIsDiff && !(inNodeDragGesture && !hasCompoundNodes)) {
        r.motionBlurPxRatio = 1;
      }
      if (forcedPan) {
        effectivePan = forcedPan;
      }
      effectiveZoom *= pixelRatio;
      effectivePan.x *= pixelRatio;
      effectivePan.y *= pixelRatio;
      var eles = r.getCachedZSortedEles();
      function mbclear(context2, x, y, w, h) {
        var gco = context2.globalCompositeOperation;
        context2.globalCompositeOperation = "destination-out";
        r.colorFillStyle(context2, 255, 255, 255, r.motionBlurTransparency);
        context2.fillRect(x, y, w, h);
        context2.globalCompositeOperation = gco;
      }
      function setContextTransform(context2, clear2) {
        var ePan, eZoom, w, h;
        if (!r.clearingMotionBlur && (context2 === data2.bufferContexts[r.MOTIONBLUR_BUFFER_NODE] || context2 === data2.bufferContexts[r.MOTIONBLUR_BUFFER_DRAG])) {
          ePan = {
            x: pan.x * mbPxRatio,
            y: pan.y * mbPxRatio
          };
          eZoom = zoom * mbPxRatio;
          w = r.canvasWidth * mbPxRatio;
          h = r.canvasHeight * mbPxRatio;
        } else {
          ePan = effectivePan;
          eZoom = effectiveZoom;
          w = r.canvasWidth;
          h = r.canvasHeight;
        }
        context2.setTransform(1, 0, 0, 1, 0, 0);
        if (clear2 === "motionBlur") {
          mbclear(context2, 0, 0, w, h);
        } else if (!forcedContext && (clear2 === void 0 || clear2)) {
          context2.clearRect(0, 0, w, h);
        }
        if (!drawAllLayers) {
          context2.translate(ePan.x, ePan.y);
          context2.scale(eZoom, eZoom);
        }
        if (forcedPan) {
          context2.translate(forcedPan.x, forcedPan.y);
        }
        if (forcedZoom) {
          context2.scale(forcedZoom, forcedZoom);
        }
      }
      if (!textureDraw) {
        r.textureDrawLastFrame = false;
      }
      if (textureDraw) {
        r.textureDrawLastFrame = true;
        if (!r.textureCache) {
          r.textureCache = {};
          r.textureCache.bb = cy.mutableElements().boundingBox();
          r.textureCache.texture = r.data.bufferCanvases[r.TEXTURE_BUFFER];
          var cxt = r.data.bufferContexts[r.TEXTURE_BUFFER];
          cxt.setTransform(1, 0, 0, 1, 0, 0);
          cxt.clearRect(0, 0, r.canvasWidth * r.textureMult, r.canvasHeight * r.textureMult);
          r.render({
            forcedContext: cxt,
            drawOnlyNodeLayer: true,
            forcedPxRatio: pixelRatio * r.textureMult
          });
          var vp = r.textureCache.viewport = {
            zoom: cy.zoom(),
            pan: cy.pan(),
            width: r.canvasWidth,
            height: r.canvasHeight
          };
          vp.mpan = {
            x: (0 - vp.pan.x) / vp.zoom,
            y: (0 - vp.pan.y) / vp.zoom
          };
        }
        needDraw[r.DRAG] = false;
        needDraw[r.NODE] = false;
        var context = data2.contexts[r.NODE];
        var texture = r.textureCache.texture;
        var vp = r.textureCache.viewport;
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (motionBlur) {
          mbclear(context, 0, 0, vp.width, vp.height);
        } else {
          context.clearRect(0, 0, vp.width, vp.height);
        }
        var outsideBgColor = style.core("outside-texture-bg-color").value;
        var outsideBgOpacity = style.core("outside-texture-bg-opacity").value;
        r.colorFillStyle(context, outsideBgColor[0], outsideBgColor[1], outsideBgColor[2], outsideBgOpacity);
        context.fillRect(0, 0, vp.width, vp.height);
        var zoom = cy.zoom();
        setContextTransform(context, false);
        context.clearRect(vp.mpan.x, vp.mpan.y, vp.width / vp.zoom / pixelRatio, vp.height / vp.zoom / pixelRatio);
        context.drawImage(texture, vp.mpan.x, vp.mpan.y, vp.width / vp.zoom / pixelRatio, vp.height / vp.zoom / pixelRatio);
      } else if (r.textureOnViewport && !forcedContext) {
        r.textureCache = null;
      }
      var extent = cy.extent();
      var vpManip = r.pinching || r.hoverData.dragging || r.swipePanning || r.data.wheelZooming || r.hoverData.draggingEles || r.cy.animated();
      var hideEdges = r.hideEdgesOnViewport && vpManip;
      var needMbClear = [];
      needMbClear[r.NODE] = !needDraw[r.NODE] && motionBlur && !r.clearedForMotionBlur[r.NODE] || r.clearingMotionBlur;
      if (needMbClear[r.NODE]) {
        r.clearedForMotionBlur[r.NODE] = true;
      }
      needMbClear[r.DRAG] = !needDraw[r.DRAG] && motionBlur && !r.clearedForMotionBlur[r.DRAG] || r.clearingMotionBlur;
      if (needMbClear[r.DRAG]) {
        r.clearedForMotionBlur[r.DRAG] = true;
      }
      if (needDraw[r.NODE] || drawAllLayers || drawOnlyNodeLayer || needMbClear[r.NODE]) {
        var useBuffer = motionBlur && !needMbClear[r.NODE] && mbPxRatio !== 1;
        var context = forcedContext || (useBuffer ? r.data.bufferContexts[r.MOTIONBLUR_BUFFER_NODE] : data2.contexts[r.NODE]);
        var clear = motionBlur && !useBuffer ? "motionBlur" : void 0;
        setContextTransform(context, clear);
        if (hideEdges) {
          r.drawCachedNodes(context, eles.nondrag, pixelRatio, extent);
        } else {
          r.drawLayeredElements(context, eles.nondrag, pixelRatio, extent);
        }
        if (r.debug) {
          r.drawDebugPoints(context, eles.nondrag);
        }
        if (!drawAllLayers && !motionBlur) {
          needDraw[r.NODE] = false;
        }
      }
      if (!drawOnlyNodeLayer && (needDraw[r.DRAG] || drawAllLayers || needMbClear[r.DRAG])) {
        var useBuffer = motionBlur && !needMbClear[r.DRAG] && mbPxRatio !== 1;
        var context = forcedContext || (useBuffer ? r.data.bufferContexts[r.MOTIONBLUR_BUFFER_DRAG] : data2.contexts[r.DRAG]);
        setContextTransform(context, motionBlur && !useBuffer ? "motionBlur" : void 0);
        if (hideEdges) {
          r.drawCachedNodes(context, eles.drag, pixelRatio, extent);
        } else {
          r.drawCachedElements(context, eles.drag, pixelRatio, extent);
        }
        if (r.debug) {
          r.drawDebugPoints(context, eles.drag);
        }
        if (!drawAllLayers && !motionBlur) {
          needDraw[r.DRAG] = false;
        }
      }
      if (r.showFps || !drawOnlyNodeLayer && needDraw[r.SELECT_BOX] && !drawAllLayers) {
        var context = forcedContext || data2.contexts[r.SELECT_BOX];
        setContextTransform(context);
        if (r.selection[4] == 1 && (r.hoverData.selecting || r.touchData.selecting)) {
          var zoom = r.cy.zoom();
          var borderWidth = style.core("selection-box-border-width").value / zoom;
          context.lineWidth = borderWidth;
          context.fillStyle = "rgba(" + style.core("selection-box-color").value[0] + "," + style.core("selection-box-color").value[1] + "," + style.core("selection-box-color").value[2] + "," + style.core("selection-box-opacity").value + ")";
          context.fillRect(r.selection[0], r.selection[1], r.selection[2] - r.selection[0], r.selection[3] - r.selection[1]);
          if (borderWidth > 0) {
            context.strokeStyle = "rgba(" + style.core("selection-box-border-color").value[0] + "," + style.core("selection-box-border-color").value[1] + "," + style.core("selection-box-border-color").value[2] + "," + style.core("selection-box-opacity").value + ")";
            context.strokeRect(r.selection[0], r.selection[1], r.selection[2] - r.selection[0], r.selection[3] - r.selection[1]);
          }
        }
        if (data2.bgActivePosistion && !r.hoverData.selecting) {
          var zoom = r.cy.zoom();
          var pos = data2.bgActivePosistion;
          context.fillStyle = "rgba(" + style.core("active-bg-color").value[0] + "," + style.core("active-bg-color").value[1] + "," + style.core("active-bg-color").value[2] + "," + style.core("active-bg-opacity").value + ")";
          context.beginPath();
          context.arc(pos.x, pos.y, style.core("active-bg-size").pfValue / zoom, 0, 2 * Math.PI);
          context.fill();
        }
        var timeToRender = r.lastRedrawTime;
        if (r.showFps && timeToRender) {
          timeToRender = Math.round(timeToRender);
          var fps = Math.round(1e3 / timeToRender);
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.fillStyle = "rgba(255, 0, 0, 0.75)";
          context.strokeStyle = "rgba(255, 0, 0, 0.75)";
          context.lineWidth = 1;
          context.fillText("1 frame = " + timeToRender + " ms = " + fps + " fps", 0, 20);
          var maxFps = 60;
          context.strokeRect(0, 30, 250, 20);
          context.fillRect(0, 30, 250 * Math.min(fps / maxFps, 1), 20);
        }
        if (!drawAllLayers) {
          needDraw[r.SELECT_BOX] = false;
        }
      }
      if (motionBlur && mbPxRatio !== 1) {
        var cxtNode = data2.contexts[r.NODE];
        var txtNode = r.data.bufferCanvases[r.MOTIONBLUR_BUFFER_NODE];
        var cxtDrag = data2.contexts[r.DRAG];
        var txtDrag = r.data.bufferCanvases[r.MOTIONBLUR_BUFFER_DRAG];
        var drawMotionBlur = function drawMotionBlur2(cxt2, txt, needClear) {
          cxt2.setTransform(1, 0, 0, 1, 0, 0);
          if (needClear || !motionBlurFadeEffect) {
            cxt2.clearRect(0, 0, r.canvasWidth, r.canvasHeight);
          } else {
            mbclear(cxt2, 0, 0, r.canvasWidth, r.canvasHeight);
          }
          var pxr = mbPxRatio;
          cxt2.drawImage(
            txt,
            // img
            0,
            0,
            // sx, sy
            r.canvasWidth * pxr,
            r.canvasHeight * pxr,
            // sw, sh
            0,
            0,
            // x, y
            r.canvasWidth,
            r.canvasHeight
            // w, h
          );
        };
        if (needDraw[r.NODE] || needMbClear[r.NODE]) {
          drawMotionBlur(cxtNode, txtNode, needMbClear[r.NODE]);
          needDraw[r.NODE] = false;
        }
        if (needDraw[r.DRAG] || needMbClear[r.DRAG]) {
          drawMotionBlur(cxtDrag, txtDrag, needMbClear[r.DRAG]);
          needDraw[r.DRAG] = false;
        }
      }
      r.prevViewport = vp;
      if (r.clearingMotionBlur) {
        r.clearingMotionBlur = false;
        r.motionBlurCleared = true;
        r.motionBlur = true;
      }
      if (motionBlur) {
        r.motionBlurTimeout = setTimeout(function() {
          r.motionBlurTimeout = null;
          r.clearedForMotionBlur[r.NODE] = false;
          r.clearedForMotionBlur[r.DRAG] = false;
          r.motionBlur = false;
          r.clearingMotionBlur = !textureDraw;
          r.mbFrames = 0;
          needDraw[r.NODE] = true;
          needDraw[r.DRAG] = true;
          r.redraw();
        }, motionBlurDelay);
      }
      if (!forcedContext) {
        cy.emit("render");
      }
    };
    var CRp$3 = {};
    CRp$3.drawPolygonPath = function(context, x, y, width, height, points) {
      var halfW = width / 2;
      var halfH = height / 2;
      if (context.beginPath) {
        context.beginPath();
      }
      context.moveTo(x + halfW * points[0], y + halfH * points[1]);
      for (var i2 = 1; i2 < points.length / 2; i2++) {
        context.lineTo(x + halfW * points[i2 * 2], y + halfH * points[i2 * 2 + 1]);
      }
      context.closePath();
    };
    CRp$3.drawRoundPolygonPath = function(context, x, y, width, height, points) {
      var halfW = width / 2;
      var halfH = height / 2;
      var cornerRadius = getRoundPolygonRadius(width, height);
      if (context.beginPath) {
        context.beginPath();
      }
      for (var _i = 0; _i < points.length / 4; _i++) {
        var sourceUv = void 0, destUv = void 0;
        if (_i === 0) {
          sourceUv = points.length - 2;
        } else {
          sourceUv = _i * 4 - 2;
        }
        destUv = _i * 4 + 2;
        var px = x + halfW * points[_i * 4];
        var py = y + halfH * points[_i * 4 + 1];
        var cosTheta = -points[sourceUv] * points[destUv] - points[sourceUv + 1] * points[destUv + 1];
        var offset = cornerRadius / Math.tan(Math.acos(cosTheta) / 2);
        var cp0x = px - offset * points[sourceUv];
        var cp0y = py - offset * points[sourceUv + 1];
        var cp1x = px + offset * points[destUv];
        var cp1y = py + offset * points[destUv + 1];
        if (_i === 0) {
          context.moveTo(cp0x, cp0y);
        } else {
          context.lineTo(cp0x, cp0y);
        }
        context.arcTo(px, py, cp1x, cp1y, cornerRadius);
      }
      context.closePath();
    };
    CRp$3.drawRoundRectanglePath = function(context, x, y, width, height) {
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var cornerRadius = getRoundRectangleRadius(width, height);
      if (context.beginPath) {
        context.beginPath();
      }
      context.moveTo(x, y - halfHeight);
      context.arcTo(x + halfWidth, y - halfHeight, x + halfWidth, y, cornerRadius);
      context.arcTo(x + halfWidth, y + halfHeight, x, y + halfHeight, cornerRadius);
      context.arcTo(x - halfWidth, y + halfHeight, x - halfWidth, y, cornerRadius);
      context.arcTo(x - halfWidth, y - halfHeight, x, y - halfHeight, cornerRadius);
      context.lineTo(x, y - halfHeight);
      context.closePath();
    };
    CRp$3.drawBottomRoundRectanglePath = function(context, x, y, width, height) {
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var cornerRadius = getRoundRectangleRadius(width, height);
      if (context.beginPath) {
        context.beginPath();
      }
      context.moveTo(x, y - halfHeight);
      context.lineTo(x + halfWidth, y - halfHeight);
      context.lineTo(x + halfWidth, y);
      context.arcTo(x + halfWidth, y + halfHeight, x, y + halfHeight, cornerRadius);
      context.arcTo(x - halfWidth, y + halfHeight, x - halfWidth, y, cornerRadius);
      context.lineTo(x - halfWidth, y - halfHeight);
      context.lineTo(x, y - halfHeight);
      context.closePath();
    };
    CRp$3.drawCutRectanglePath = function(context, x, y, width, height) {
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var cornerLength = getCutRectangleCornerLength();
      if (context.beginPath) {
        context.beginPath();
      }
      context.moveTo(x - halfWidth + cornerLength, y - halfHeight);
      context.lineTo(x + halfWidth - cornerLength, y - halfHeight);
      context.lineTo(x + halfWidth, y - halfHeight + cornerLength);
      context.lineTo(x + halfWidth, y + halfHeight - cornerLength);
      context.lineTo(x + halfWidth - cornerLength, y + halfHeight);
      context.lineTo(x - halfWidth + cornerLength, y + halfHeight);
      context.lineTo(x - halfWidth, y + halfHeight - cornerLength);
      context.lineTo(x - halfWidth, y - halfHeight + cornerLength);
      context.closePath();
    };
    CRp$3.drawBarrelPath = function(context, x, y, width, height) {
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var xBegin = x - halfWidth;
      var xEnd = x + halfWidth;
      var yBegin = y - halfHeight;
      var yEnd = y + halfHeight;
      var barrelCurveConstants = getBarrelCurveConstants(width, height);
      var wOffset = barrelCurveConstants.widthOffset;
      var hOffset = barrelCurveConstants.heightOffset;
      var ctrlPtXOffset = barrelCurveConstants.ctrlPtOffsetPct * wOffset;
      if (context.beginPath) {
        context.beginPath();
      }
      context.moveTo(xBegin, yBegin + hOffset);
      context.lineTo(xBegin, yEnd - hOffset);
      context.quadraticCurveTo(xBegin + ctrlPtXOffset, yEnd, xBegin + wOffset, yEnd);
      context.lineTo(xEnd - wOffset, yEnd);
      context.quadraticCurveTo(xEnd - ctrlPtXOffset, yEnd, xEnd, yEnd - hOffset);
      context.lineTo(xEnd, yBegin + hOffset);
      context.quadraticCurveTo(xEnd - ctrlPtXOffset, yBegin, xEnd - wOffset, yBegin);
      context.lineTo(xBegin + wOffset, yBegin);
      context.quadraticCurveTo(xBegin + ctrlPtXOffset, yBegin, xBegin, yBegin + hOffset);
      context.closePath();
    };
    var sin0 = Math.sin(0);
    var cos0 = Math.cos(0);
    var sin = {};
    var cos = {};
    var ellipseStepSize = Math.PI / 40;
    for (i = 0 * Math.PI; i < 2 * Math.PI; i += ellipseStepSize) {
      sin[i] = Math.sin(i);
      cos[i] = Math.cos(i);
    }
    var i;
    CRp$3.drawEllipsePath = function(context, centerX, centerY, width, height) {
      if (context.beginPath) {
        context.beginPath();
      }
      if (context.ellipse) {
        context.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
      } else {
        var xPos, yPos;
        var rw = width / 2;
        var rh = height / 2;
        for (var i2 = 0 * Math.PI; i2 < 2 * Math.PI; i2 += ellipseStepSize) {
          xPos = centerX - rw * sin[i2] * sin0 + rw * cos[i2] * cos0;
          yPos = centerY + rh * cos[i2] * sin0 + rh * sin[i2] * cos0;
          if (i2 === 0) {
            context.moveTo(xPos, yPos);
          } else {
            context.lineTo(xPos, yPos);
          }
        }
      }
      context.closePath();
    };
    var CRp$2 = {};
    CRp$2.createBuffer = function(w, h) {
      var buffer = document.createElement("canvas");
      buffer.width = w;
      buffer.height = h;
      return [buffer, buffer.getContext("2d")];
    };
    CRp$2.bufferCanvasImage = function(options) {
      var cy = this.cy;
      var eles = cy.mutableElements();
      var bb = eles.boundingBox();
      var ctrRect = this.findContainerClientCoords();
      var width = options.full ? Math.ceil(bb.w) : ctrRect[2];
      var height = options.full ? Math.ceil(bb.h) : ctrRect[3];
      var specdMaxDims = number$1(options.maxWidth) || number$1(options.maxHeight);
      var pxRatio = this.getPixelRatio();
      var scale = 1;
      if (options.scale !== void 0) {
        width *= options.scale;
        height *= options.scale;
        scale = options.scale;
      } else if (specdMaxDims) {
        var maxScaleW = Infinity;
        var maxScaleH = Infinity;
        if (number$1(options.maxWidth)) {
          maxScaleW = scale * options.maxWidth / width;
        }
        if (number$1(options.maxHeight)) {
          maxScaleH = scale * options.maxHeight / height;
        }
        scale = Math.min(maxScaleW, maxScaleH);
        width *= scale;
        height *= scale;
      }
      if (!specdMaxDims) {
        width *= pxRatio;
        height *= pxRatio;
        scale *= pxRatio;
      }
      var buffCanvas = document.createElement("canvas");
      buffCanvas.width = width;
      buffCanvas.height = height;
      buffCanvas.style.width = width + "px";
      buffCanvas.style.height = height + "px";
      var buffCxt = buffCanvas.getContext("2d");
      if (width > 0 && height > 0) {
        buffCxt.clearRect(0, 0, width, height);
        buffCxt.globalCompositeOperation = "source-over";
        var zsortedEles = this.getCachedZSortedEles();
        if (options.full) {
          buffCxt.translate(-bb.x1 * scale, -bb.y1 * scale);
          buffCxt.scale(scale, scale);
          this.drawElements(buffCxt, zsortedEles);
          buffCxt.scale(1 / scale, 1 / scale);
          buffCxt.translate(bb.x1 * scale, bb.y1 * scale);
        } else {
          var pan = cy.pan();
          var translation = {
            x: pan.x * scale,
            y: pan.y * scale
          };
          scale *= cy.zoom();
          buffCxt.translate(translation.x, translation.y);
          buffCxt.scale(scale, scale);
          this.drawElements(buffCxt, zsortedEles);
          buffCxt.scale(1 / scale, 1 / scale);
          buffCxt.translate(-translation.x, -translation.y);
        }
        if (options.bg) {
          buffCxt.globalCompositeOperation = "destination-over";
          buffCxt.fillStyle = options.bg;
          buffCxt.rect(0, 0, width, height);
          buffCxt.fill();
        }
      }
      return buffCanvas;
    };
    function b64ToBlob(b64, mimeType) {
      var bytes = atob(b64);
      var buff = new ArrayBuffer(bytes.length);
      var buffUint8 = new Uint8Array(buff);
      for (var i2 = 0; i2 < bytes.length; i2++) {
        buffUint8[i2] = bytes.charCodeAt(i2);
      }
      return new Blob([buff], {
        type: mimeType
      });
    }
    function b64UriToB64(b64uri) {
      var i2 = b64uri.indexOf(",");
      return b64uri.substr(i2 + 1);
    }
    function output(options, canvas, mimeType) {
      var getB64Uri = function getB64Uri2() {
        return canvas.toDataURL(mimeType, options.quality);
      };
      switch (options.output) {
        case "blob-promise":
          return new Promise$1(function(resolve2, reject) {
            try {
              canvas.toBlob(function(blob) {
                if (blob != null) {
                  resolve2(blob);
                } else {
                  reject(new Error("`canvas.toBlob()` sent a null value in its callback"));
                }
              }, mimeType, options.quality);
            } catch (err) {
              reject(err);
            }
          });
        case "blob":
          return b64ToBlob(b64UriToB64(getB64Uri()), mimeType);
        case "base64":
          return b64UriToB64(getB64Uri());
        case "base64uri":
        default:
          return getB64Uri();
      }
    }
    CRp$2.png = function(options) {
      return output(options, this.bufferCanvasImage(options), "image/png");
    };
    CRp$2.jpg = function(options) {
      return output(options, this.bufferCanvasImage(options), "image/jpeg");
    };
    var CRp$1 = {};
    CRp$1.nodeShapeImpl = function(name, context, centerX, centerY, width, height, points) {
      switch (name) {
        case "ellipse":
          return this.drawEllipsePath(context, centerX, centerY, width, height);
        case "polygon":
          return this.drawPolygonPath(context, centerX, centerY, width, height, points);
        case "round-polygon":
          return this.drawRoundPolygonPath(context, centerX, centerY, width, height, points);
        case "roundrectangle":
        case "round-rectangle":
          return this.drawRoundRectanglePath(context, centerX, centerY, width, height);
        case "cutrectangle":
        case "cut-rectangle":
          return this.drawCutRectanglePath(context, centerX, centerY, width, height);
        case "bottomroundrectangle":
        case "bottom-round-rectangle":
          return this.drawBottomRoundRectanglePath(context, centerX, centerY, width, height);
        case "barrel":
          return this.drawBarrelPath(context, centerX, centerY, width, height);
      }
    };
    var CR = CanvasRenderer;
    var CRp = CanvasRenderer.prototype;
    CRp.CANVAS_LAYERS = 3;
    CRp.SELECT_BOX = 0;
    CRp.DRAG = 1;
    CRp.NODE = 2;
    CRp.BUFFER_COUNT = 3;
    CRp.TEXTURE_BUFFER = 0;
    CRp.MOTIONBLUR_BUFFER_NODE = 1;
    CRp.MOTIONBLUR_BUFFER_DRAG = 2;
    function CanvasRenderer(options) {
      var r = this;
      r.data = {
        canvases: new Array(CRp.CANVAS_LAYERS),
        contexts: new Array(CRp.CANVAS_LAYERS),
        canvasNeedsRedraw: new Array(CRp.CANVAS_LAYERS),
        bufferCanvases: new Array(CRp.BUFFER_COUNT),
        bufferContexts: new Array(CRp.CANVAS_LAYERS)
      };
      var tapHlOffAttr = "-webkit-tap-highlight-color";
      var tapHlOffStyle = "rgba(0,0,0,0)";
      r.data.canvasContainer = document.createElement("div");
      var containerStyle = r.data.canvasContainer.style;
      r.data.canvasContainer.style[tapHlOffAttr] = tapHlOffStyle;
      containerStyle.position = "relative";
      containerStyle.zIndex = "0";
      containerStyle.overflow = "hidden";
      var container = options.cy.container();
      container.appendChild(r.data.canvasContainer);
      container.style[tapHlOffAttr] = tapHlOffStyle;
      var styleMap = {
        "-webkit-user-select": "none",
        "-moz-user-select": "-moz-none",
        "user-select": "none",
        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
        "outline-style": "none"
      };
      if (ms()) {
        styleMap["-ms-touch-action"] = "none";
        styleMap["touch-action"] = "none";
      }
      for (var i2 = 0; i2 < CRp.CANVAS_LAYERS; i2++) {
        var canvas = r.data.canvases[i2] = document.createElement("canvas");
        r.data.contexts[i2] = canvas.getContext("2d");
        Object.keys(styleMap).forEach(function(k) {
          canvas.style[k] = styleMap[k];
        });
        canvas.style.position = "absolute";
        canvas.setAttribute("data-id", "layer" + i2);
        canvas.style.zIndex = String(CRp.CANVAS_LAYERS - i2);
        r.data.canvasContainer.appendChild(canvas);
        r.data.canvasNeedsRedraw[i2] = false;
      }
      r.data.topCanvas = r.data.canvases[0];
      r.data.canvases[CRp.NODE].setAttribute("data-id", "layer" + CRp.NODE + "-node");
      r.data.canvases[CRp.SELECT_BOX].setAttribute("data-id", "layer" + CRp.SELECT_BOX + "-selectbox");
      r.data.canvases[CRp.DRAG].setAttribute("data-id", "layer" + CRp.DRAG + "-drag");
      for (var i2 = 0; i2 < CRp.BUFFER_COUNT; i2++) {
        r.data.bufferCanvases[i2] = document.createElement("canvas");
        r.data.bufferContexts[i2] = r.data.bufferCanvases[i2].getContext("2d");
        r.data.bufferCanvases[i2].style.position = "absolute";
        r.data.bufferCanvases[i2].setAttribute("data-id", "buffer" + i2);
        r.data.bufferCanvases[i2].style.zIndex = String(-i2 - 1);
        r.data.bufferCanvases[i2].style.visibility = "hidden";
      }
      r.pathsEnabled = true;
      var emptyBb = makeBoundingBox();
      var getBoxCenter = function getBoxCenter2(bb) {
        return {
          x: (bb.x1 + bb.x2) / 2,
          y: (bb.y1 + bb.y2) / 2
        };
      };
      var getCenterOffset = function getCenterOffset2(bb) {
        return {
          x: -bb.w / 2,
          y: -bb.h / 2
        };
      };
      var backgroundTimestampHasChanged = function backgroundTimestampHasChanged2(ele) {
        var _p = ele[0]._private;
        var same = _p.oldBackgroundTimestamp === _p.backgroundTimestamp;
        return !same;
      };
      var getStyleKey = function getStyleKey2(ele) {
        return ele[0]._private.nodeKey;
      };
      var getLabelKey = function getLabelKey2(ele) {
        return ele[0]._private.labelStyleKey;
      };
      var getSourceLabelKey = function getSourceLabelKey2(ele) {
        return ele[0]._private.sourceLabelStyleKey;
      };
      var getTargetLabelKey = function getTargetLabelKey2(ele) {
        return ele[0]._private.targetLabelStyleKey;
      };
      var drawElement = function drawElement2(context, ele, bb, scaledLabelShown, useEleOpacity) {
        return r.drawElement(context, ele, bb, false, false, useEleOpacity);
      };
      var drawLabel = function drawLabel2(context, ele, bb, scaledLabelShown, useEleOpacity) {
        return r.drawElementText(context, ele, bb, scaledLabelShown, "main", useEleOpacity);
      };
      var drawSourceLabel = function drawSourceLabel2(context, ele, bb, scaledLabelShown, useEleOpacity) {
        return r.drawElementText(context, ele, bb, scaledLabelShown, "source", useEleOpacity);
      };
      var drawTargetLabel = function drawTargetLabel2(context, ele, bb, scaledLabelShown, useEleOpacity) {
        return r.drawElementText(context, ele, bb, scaledLabelShown, "target", useEleOpacity);
      };
      var getElementBox = function getElementBox2(ele) {
        ele.boundingBox();
        return ele[0]._private.bodyBounds;
      };
      var getLabelBox = function getLabelBox2(ele) {
        ele.boundingBox();
        return ele[0]._private.labelBounds.main || emptyBb;
      };
      var getSourceLabelBox = function getSourceLabelBox2(ele) {
        ele.boundingBox();
        return ele[0]._private.labelBounds.source || emptyBb;
      };
      var getTargetLabelBox = function getTargetLabelBox2(ele) {
        ele.boundingBox();
        return ele[0]._private.labelBounds.target || emptyBb;
      };
      var isLabelVisibleAtScale = function isLabelVisibleAtScale2(ele, scaledLabelShown) {
        return scaledLabelShown;
      };
      var getElementRotationPoint = function getElementRotationPoint2(ele) {
        return getBoxCenter(getElementBox(ele));
      };
      var addTextMargin = function addTextMargin2(prefix, pt, ele) {
        var pre = prefix ? prefix + "-" : "";
        return {
          x: pt.x + ele.pstyle(pre + "text-margin-x").pfValue,
          y: pt.y + ele.pstyle(pre + "text-margin-y").pfValue
        };
      };
      var getRsPt = function getRsPt2(ele, x, y) {
        var rs = ele[0]._private.rscratch;
        return {
          x: rs[x],
          y: rs[y]
        };
      };
      var getLabelRotationPoint = function getLabelRotationPoint2(ele) {
        return addTextMargin("", getRsPt(ele, "labelX", "labelY"), ele);
      };
      var getSourceLabelRotationPoint = function getSourceLabelRotationPoint2(ele) {
        return addTextMargin("source", getRsPt(ele, "sourceLabelX", "sourceLabelY"), ele);
      };
      var getTargetLabelRotationPoint = function getTargetLabelRotationPoint2(ele) {
        return addTextMargin("target", getRsPt(ele, "targetLabelX", "targetLabelY"), ele);
      };
      var getElementRotationOffset = function getElementRotationOffset2(ele) {
        return getCenterOffset(getElementBox(ele));
      };
      var getSourceLabelRotationOffset = function getSourceLabelRotationOffset2(ele) {
        return getCenterOffset(getSourceLabelBox(ele));
      };
      var getTargetLabelRotationOffset = function getTargetLabelRotationOffset2(ele) {
        return getCenterOffset(getTargetLabelBox(ele));
      };
      var getLabelRotationOffset = function getLabelRotationOffset2(ele) {
        var bb = getLabelBox(ele);
        var p2 = getCenterOffset(getLabelBox(ele));
        if (ele.isNode()) {
          switch (ele.pstyle("text-halign").value) {
            case "left":
              p2.x = -bb.w;
              break;
            case "right":
              p2.x = 0;
              break;
          }
          switch (ele.pstyle("text-valign").value) {
            case "top":
              p2.y = -bb.h;
              break;
            case "bottom":
              p2.y = 0;
              break;
          }
        }
        return p2;
      };
      var eleTxrCache = r.data.eleTxrCache = new ElementTextureCache(r, {
        getKey: getStyleKey,
        doesEleInvalidateKey: backgroundTimestampHasChanged,
        drawElement,
        getBoundingBox: getElementBox,
        getRotationPoint: getElementRotationPoint,
        getRotationOffset: getElementRotationOffset,
        allowEdgeTxrCaching: false,
        allowParentTxrCaching: false
      });
      var lblTxrCache = r.data.lblTxrCache = new ElementTextureCache(r, {
        getKey: getLabelKey,
        drawElement: drawLabel,
        getBoundingBox: getLabelBox,
        getRotationPoint: getLabelRotationPoint,
        getRotationOffset: getLabelRotationOffset,
        isVisible: isLabelVisibleAtScale
      });
      var slbTxrCache = r.data.slbTxrCache = new ElementTextureCache(r, {
        getKey: getSourceLabelKey,
        drawElement: drawSourceLabel,
        getBoundingBox: getSourceLabelBox,
        getRotationPoint: getSourceLabelRotationPoint,
        getRotationOffset: getSourceLabelRotationOffset,
        isVisible: isLabelVisibleAtScale
      });
      var tlbTxrCache = r.data.tlbTxrCache = new ElementTextureCache(r, {
        getKey: getTargetLabelKey,
        drawElement: drawTargetLabel,
        getBoundingBox: getTargetLabelBox,
        getRotationPoint: getTargetLabelRotationPoint,
        getRotationOffset: getTargetLabelRotationOffset,
        isVisible: isLabelVisibleAtScale
      });
      var lyrTxrCache = r.data.lyrTxrCache = new LayeredTextureCache(r);
      r.onUpdateEleCalcs(function invalidateTextureCaches(willDraw, eles) {
        eleTxrCache.invalidateElements(eles);
        lblTxrCache.invalidateElements(eles);
        slbTxrCache.invalidateElements(eles);
        tlbTxrCache.invalidateElements(eles);
        lyrTxrCache.invalidateElements(eles);
        for (var _i = 0; _i < eles.length; _i++) {
          var _p = eles[_i]._private;
          _p.oldBackgroundTimestamp = _p.backgroundTimestamp;
        }
      });
      var refineInLayers = function refineInLayers2(reqs) {
        for (var i3 = 0; i3 < reqs.length; i3++) {
          lyrTxrCache.enqueueElementRefinement(reqs[i3].ele);
        }
      };
      eleTxrCache.onDequeue(refineInLayers);
      lblTxrCache.onDequeue(refineInLayers);
      slbTxrCache.onDequeue(refineInLayers);
      tlbTxrCache.onDequeue(refineInLayers);
    }
    CRp.redrawHint = function(group, bool) {
      var r = this;
      switch (group) {
        case "eles":
          r.data.canvasNeedsRedraw[CRp.NODE] = bool;
          break;
        case "drag":
          r.data.canvasNeedsRedraw[CRp.DRAG] = bool;
          break;
        case "select":
          r.data.canvasNeedsRedraw[CRp.SELECT_BOX] = bool;
          break;
      }
    };
    var pathsImpld = typeof Path2D !== "undefined";
    CRp.path2dEnabled = function(on) {
      if (on === void 0) {
        return this.pathsEnabled;
      }
      this.pathsEnabled = on ? true : false;
    };
    CRp.usePaths = function() {
      return pathsImpld && this.pathsEnabled;
    };
    CRp.setImgSmoothing = function(context, bool) {
      if (context.imageSmoothingEnabled != null) {
        context.imageSmoothingEnabled = bool;
      } else {
        context.webkitImageSmoothingEnabled = bool;
        context.mozImageSmoothingEnabled = bool;
        context.msImageSmoothingEnabled = bool;
      }
    };
    CRp.getImgSmoothing = function(context) {
      if (context.imageSmoothingEnabled != null) {
        return context.imageSmoothingEnabled;
      } else {
        return context.webkitImageSmoothingEnabled || context.mozImageSmoothingEnabled || context.msImageSmoothingEnabled;
      }
    };
    CRp.makeOffscreenCanvas = function(width, height) {
      var canvas;
      if ((typeof OffscreenCanvas === "undefined" ? "undefined" : _typeof(OffscreenCanvas)) !== "undefined") {
        canvas = new OffscreenCanvas(width, height);
      } else {
        canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
      }
      return canvas;
    };
    [CRp$a, CRp$9, CRp$8, CRp$7, CRp$6, CRp$5, CRp$4, CRp$3, CRp$2, CRp$1].forEach(function(props) {
      extend(CRp, props);
    });
    var renderer = [{
      name: "null",
      impl: NullRenderer
    }, {
      name: "base",
      impl: BR
    }, {
      name: "canvas",
      impl: CR
    }];
    var incExts = [{
      type: "layout",
      extensions: layout
    }, {
      type: "renderer",
      extensions: renderer
    }];
    var extensions = {};
    var modules = {};
    function setExtension(type, name, registrant) {
      var ext = registrant;
      var overrideErr = function overrideErr2(field) {
        warn("Can not register `" + name + "` for `" + type + "` since `" + field + "` already exists in the prototype and can not be overridden");
      };
      if (type === "core") {
        if (Core.prototype[name]) {
          return overrideErr(name);
        } else {
          Core.prototype[name] = registrant;
        }
      } else if (type === "collection") {
        if (Collection.prototype[name]) {
          return overrideErr(name);
        } else {
          Collection.prototype[name] = registrant;
        }
      } else if (type === "layout") {
        var Layout = function Layout2(options) {
          this.options = options;
          registrant.call(this, options);
          if (!plainObject(this._private)) {
            this._private = {};
          }
          this._private.cy = options.cy;
          this._private.listeners = [];
          this.createEmitter();
        };
        var layoutProto = Layout.prototype = Object.create(registrant.prototype);
        var optLayoutFns = [];
        for (var i2 = 0; i2 < optLayoutFns.length; i2++) {
          var fnName = optLayoutFns[i2];
          layoutProto[fnName] = layoutProto[fnName] || function() {
            return this;
          };
        }
        if (layoutProto.start && !layoutProto.run) {
          layoutProto.run = function() {
            this.start();
            return this;
          };
        } else if (!layoutProto.start && layoutProto.run) {
          layoutProto.start = function() {
            this.run();
            return this;
          };
        }
        var regStop = registrant.prototype.stop;
        layoutProto.stop = function() {
          var opts = this.options;
          if (opts && opts.animate) {
            var anis = this.animations;
            if (anis) {
              for (var _i = 0; _i < anis.length; _i++) {
                anis[_i].stop();
              }
            }
          }
          if (regStop) {
            regStop.call(this);
          } else {
            this.emit("layoutstop");
          }
          return this;
        };
        if (!layoutProto.destroy) {
          layoutProto.destroy = function() {
            return this;
          };
        }
        layoutProto.cy = function() {
          return this._private.cy;
        };
        var getCy = function getCy2(layout2) {
          return layout2._private.cy;
        };
        var emitterOpts = {
          addEventFields: function addEventFields(layout2, evt) {
            evt.layout = layout2;
            evt.cy = getCy(layout2);
            evt.target = layout2;
          },
          bubble: function bubble() {
            return true;
          },
          parent: function parent(layout2) {
            return getCy(layout2);
          }
        };
        extend(layoutProto, {
          createEmitter: function createEmitter() {
            this._private.emitter = new Emitter(emitterOpts, this);
            return this;
          },
          emitter: function emitter() {
            return this._private.emitter;
          },
          on: function on(evt, cb) {
            this.emitter().on(evt, cb);
            return this;
          },
          one: function one(evt, cb) {
            this.emitter().one(evt, cb);
            return this;
          },
          once: function once(evt, cb) {
            this.emitter().one(evt, cb);
            return this;
          },
          removeListener: function removeListener(evt, cb) {
            this.emitter().removeListener(evt, cb);
            return this;
          },
          removeAllListeners: function removeAllListeners() {
            this.emitter().removeAllListeners();
            return this;
          },
          emit: function emit(evt, params) {
            this.emitter().emit(evt, params);
            return this;
          }
        });
        define2.eventAliasesOn(layoutProto);
        ext = Layout;
      } else if (type === "renderer" && name !== "null" && name !== "base") {
        var BaseRenderer2 = getExtension("renderer", "base");
        var bProto = BaseRenderer2.prototype;
        var RegistrantRenderer = registrant;
        var rProto = registrant.prototype;
        var Renderer = function Renderer2() {
          BaseRenderer2.apply(this, arguments);
          RegistrantRenderer.apply(this, arguments);
        };
        var proto = Renderer.prototype;
        for (var pName in bProto) {
          var pVal = bProto[pName];
          var existsInR = rProto[pName] != null;
          if (existsInR) {
            return overrideErr(pName);
          }
          proto[pName] = pVal;
        }
        for (var _pName in rProto) {
          proto[_pName] = rProto[_pName];
        }
        bProto.clientFunctions.forEach(function(name2) {
          proto[name2] = proto[name2] || function() {
            error("Renderer does not implement `renderer." + name2 + "()` on its prototype");
          };
        });
        ext = Renderer;
      } else if (type === "__proto__" || type === "constructor" || type === "prototype") {
        return error(type + " is an illegal type to be registered, possibly lead to prototype pollutions");
      }
      return setMap({
        map: extensions,
        keys: [type, name],
        value: ext
      });
    }
    function getExtension(type, name) {
      return getMap({
        map: extensions,
        keys: [type, name]
      });
    }
    function setModule(type, name, moduleType, moduleName, registrant) {
      return setMap({
        map: modules,
        keys: [type, name, moduleType, moduleName],
        value: registrant
      });
    }
    function getModule(type, name, moduleType, moduleName) {
      return getMap({
        map: modules,
        keys: [type, name, moduleType, moduleName]
      });
    }
    var extension = function extension2() {
      if (arguments.length === 2) {
        return getExtension.apply(null, arguments);
      } else if (arguments.length === 3) {
        return setExtension.apply(null, arguments);
      } else if (arguments.length === 4) {
        return getModule.apply(null, arguments);
      } else if (arguments.length === 5) {
        return setModule.apply(null, arguments);
      } else {
        error("Invalid extension access syntax");
      }
    };
    Core.prototype.extension = extension;
    incExts.forEach(function(group) {
      group.extensions.forEach(function(ext) {
        setExtension(group.type, ext.name, ext.impl);
      });
    });
    var Stylesheet = function Stylesheet2() {
      if (!(this instanceof Stylesheet2)) {
        return new Stylesheet2();
      }
      this.length = 0;
    };
    var sheetfn = Stylesheet.prototype;
    sheetfn.instanceString = function() {
      return "stylesheet";
    };
    sheetfn.selector = function(selector) {
      var i2 = this.length++;
      this[i2] = {
        selector,
        properties: []
      };
      return this;
    };
    sheetfn.css = function(name, value) {
      var i2 = this.length - 1;
      if (string(name)) {
        this[i2].properties.push({
          name,
          value
        });
      } else if (plainObject(name)) {
        var map = name;
        var propNames = Object.keys(map);
        for (var j = 0; j < propNames.length; j++) {
          var key = propNames[j];
          var mapVal = map[key];
          if (mapVal == null) {
            continue;
          }
          var prop = Style.properties[key] || Style.properties[dash2camel(key)];
          if (prop == null) {
            continue;
          }
          var _name = prop.name;
          var _value = mapVal;
          this[i2].properties.push({
            name: _name,
            value: _value
          });
        }
      }
      return this;
    };
    sheetfn.style = sheetfn.css;
    sheetfn.generateStyle = function(cy) {
      var style = new Style(cy);
      return this.appendToStyle(style);
    };
    sheetfn.appendToStyle = function(style) {
      for (var i2 = 0; i2 < this.length; i2++) {
        var context = this[i2];
        var selector = context.selector;
        var props = context.properties;
        style.selector(selector);
        for (var j = 0; j < props.length; j++) {
          var prop = props[j];
          style.css(prop.name, prop.value);
        }
      }
      return style;
    };
    var version = "3.28.1";
    var cytoscape = function cytoscape2(options) {
      if (options === void 0) {
        options = {};
      }
      if (plainObject(options)) {
        return new Core(options);
      } else if (string(options)) {
        return extension.apply(extension, arguments);
      }
    };
    cytoscape.use = function(ext) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(cytoscape);
      ext.apply(null, args);
      return this;
    };
    cytoscape.warnings = function(bool) {
      return warnings(bool);
    };
    cytoscape.version = version;
    cytoscape.stylesheet = cytoscape.Stylesheet = Stylesheet;
    module.exports = cytoscape;
  }
});
export default require_cytoscape_cjs();
/*! Bundled license information:

cytoscape/dist/cytoscape.cjs.js:
  (*!
  Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
  Copyright (c) 2013-2014 Ralf S. Engelschall (http://engelschall.com)
  Licensed under The MIT License (http://opensource.org/licenses/MIT)
  *)
  (*!
  Event object based on jQuery events, MIT license
  
  https://jquery.org/license/
  https://tldrlegal.com/license/mit-license
  https://github.com/jquery/jquery/blob/master/src/event.js
  *)
  (*! Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License *)
  (*! Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License *)
*/
//# sourceMappingURL=cytoscape.js.map
