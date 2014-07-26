define(function(){
  function nulled(thing) {
    return thing === null;
  }

  function defined(thing) {
    return thing !== undefined
  }

  function object(thing) {
    return typeof thing === 'object' && !nulled(thing) && !array(thing) && !date(thing) && !dom(thing)
  }

  function array(thing) {
    if (Array.isArray) {
      return Array.isArray(thing)
    }
    return Object.prototype.toString.call(thing) === '[object Array]'
  }

  function arguments(thing) {
    return object(thing) && positiveNumber(thing.length)
  }

  function date(thing) {
    return Object.prototype.toString.call(thing) === '[object Date]'
  }

  function fn(thing) {
    return typeof thing === 'function'
  }

  function webUrl(thing) {
    return unemptyString(thing) && /^https?:\/\/.+/.test(thing)
  }

  function gitUrl(thing) {
    return unemptyString(thing) && /^git\+(ssh|https?):\/\/.+/.test(thing)
  }

  function email(thing, msg) {
    return unemptyString(thing) && /\S+@\S+/.test(thing)
  }

  function unemptyString(thing, msg) {
    return string(thing) && thing !== ''
  }

  function string(thing, msg) {
    return typeof thing === 'string'
  }

  function oddNumber(thing, msg) {
    return number(thing) && (thing % 2 === 1 || thing % 2 === -1)
  }

  function evenNumber(thing, msg) {
    return number(thing) && thing % 2 === 0
  }

  function intNumber(thing, msg) {
    return number(thing) && thing % 1 === 0
  }

  function floatNumber(thing, msg) {
    return number(thing) && thing % 1 !== 0
  }

  function positiveNumber(thing, msg) {
    return number(thing) && thing > 0
  }

  function negativeNumber(thing, msg) {
    return number(thing) && thing < 0
  }

  function number(thing, msg) {
    return typeof thing === 'number' &&
      isNaN(thing) === false &&
      thing !== Number.POSITIVE_INFINITY &&
      thing !== Number.NEGATIVE_INFINITY
  }

  function dom(thing, msg) {
    return typeof Node === "object" ? thing instanceof Node :
      thing && typeof thing === "object" && typeof thing.nodeType === "number" && typeof thing.nodeName === "string"
  }

  var check = {
    'defined': defined,
    'object': object,
    'obj': object,
    'array': array,
    'arr': array,
    'arguments': arguments,
    'arg': arguments,
    'date': date,
    'fn': fn,
    'function': fn,
    'webUrl': webUrl,
    'gitUrl': gitUrl,
    'email': email,
    'unemptyString': unemptyString,
    'string': string,
    'str': string,
    'oddNumber': oddNumber,
    'odd': oddNumber,
    'evenNumber': evenNumber,
    'even': evenNumber,
    'intNumber': intNumber,
    'int': intNumber,
    'floatNumber': floatNumber,
    'float': floatNumber,
    'positiveNumber': positiveNumber,
    'positive': positiveNumber,
    'negativeNumber': negativeNumber,
    'negative': negativeNumber,
    'number': number,
    'num': number,
    'dom': dom
  };

  (function setUn_method(check) {
    for (var methodName in check) {
      check['un' + methodName] = (function (checker) {
        return function () {
          return !checker.apply(this, arguments)
        }
      })(check[methodName])
    }
  })(check)

  function initObj(targetObj, defaultObj) {
    if (!(object(targetObj) || array(targetObj)) && !(object(defaultObj) || array(defaultObj))) {
      throw TypeError()
    }

    for (var prop in defaultObj) {
      initObj(targetObj[prop], defaultObj[prop])
      targetObj[prop] = (targetObj[prop] === undefined) ? defaultObj[prop] : targetObj[prop]
    }
  }

  check.initObj = initObj

  return check
})