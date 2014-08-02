define(['check'], function(check){
  function loop(o, callback, that) {
    if (check.array(o) || check.likeArray(o)) {
      for (var i = 0, len = o.length ; i < len ; i++) {
        if (callback.call(that, o[i], i) === false) {
          return false
        }
      }
    }
    else if (check.object(o)) {
      for (var propName in o) {
        if (o.hasOwnProperty(propName)) {
          if (callback.call(that, o[propName], propName) === false) {
            return false
          }
        }
      }
    }

    return true
  }

  return loop
})