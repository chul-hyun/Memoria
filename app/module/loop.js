define(['check'], function(check){
  function loop(o, callback) {
    if (check.array(o)) {
      for (var i = 0, len = o.length ; i < len ; i++) {
        if (callback.apply(o, o[i], i) === false) {
          return false
        }
      }
    }
    else if (check.object(o)) {
      for (var propName in o) {
        if (o.hasOwnProperty(propName)) {
          if (callback.apply(o, o[propName], propName) === false) {
            return false
          }
        }
      }
    }
    else {
      throw TypeError()
    }
  }
})