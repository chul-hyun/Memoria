define(['Err'], function (Err) {
    var isArray = Array.isArray;

    function isUndefined(value) { return typeof value === 'undefined'; }

    function isDefined(value) { return typeof value !== 'undefined'; }

    function isObject(value) { return value != null && typeof value === 'object'; }

    function isPlainObject(value) {
        var class2type = {},
            core_hasOwn = class2type.hasOwnProperty;
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (jQuery.type(value) !== "object" || value.nodeType || jQuery.isWindow(value)) {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try {
            if (value.constructor &&
					!core_hasOwn.call(value.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |value| is a plain object, created by {} or constructed with new Object
        return true;
    }

    function isString(value) { return typeof value === 'string'; }

    function isNumber(value) { return typeof value === 'number'; }

    function isDate(value) {
        return toString.call(value) === '[object Date]';
    }

    function isArrayLike(obj) {
        if (obj == null || isWindow(obj)) {
            return false;
        }

        var length = obj.length;

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return isString(obj) || isArray(obj) || length === 0 ||
         typeof length === 'number' && length > 0 && (length - 1) in obj;
    }

    function isFunction(value) { return typeof value === 'function'; }

    function isRegExp(value) {
        return toString.call(value) === '[object RegExp]';
    }

    function isWindow(obj) {
        return obj && obj.document && obj.location && obj.alert && obj.setInterval;
    }

    function isFile(obj) {
        return toString.call(obj) === '[object File]';
    }

    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    var Check = {
        isUndefined: isUndefined,
        isDefined: isDefined,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isString: isString,
        isNumber: isNumber,
        isDate: isDate,
        isArray: isArray,
        isArrayLike: isArrayLike,
        isFunction: isFunction,
        isRegExp: isRegExp,
        isWindow: isWindow,
        isFile: isFile,
        isBoolean: isBoolean
    }
    /**
    * 값의 type을 검사하여 조건에 불만족시 ParameterTypeError가 발생한다.
    * map([[type1, type2, ... ,value],])
    * ex)
    * var arr = [1,3,"hi"];
    * map(["Array", arr]); =>통과
    * map(["String", "Array", arr]); =>통과
    * map(["Object", arr]); =>통과
    * map(["String", arr]); => ParameterTypeError 발생
    * map(["String", "Function", arr]); => ParameterTypeError 발생
    * var str = "hello";
    * map(["String", "Array", arr], ["String", str]); => 통과
    */
    function map() {
        for (var i in arguments) {
            if (!Check.isArray(arguments[i])) {
                throw new Err.ParameterTypeError();
            }

            var types = arguments[i]
              , checkValue = types.pop()
              , pass = false
              , checkFn;

            for (var t_i = 0; t_i < types.length; t_i++) {
                checkFn = Check["is" + types[t_i]];
                if (!isFunction(checkFn)) {
                    throw new Err.ParameterError();
                }
                if (checkFn(checkValue)) {
                    pass = true;
                }
            }
            if (!pass) {
                throw new Err.ParameterTypeError();
            }
        }
    }

    Check.map = map;
    return Check;
});