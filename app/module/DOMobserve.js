define(['jquery', 'check', 'loop'], function ($, check, loop) {
  var getNamespace = (function () {
    var pid = 0
    return function () {
      return 'DOMobserve'+(pid++)
    }
  })()

  function DOMobserve(dom, option) {
    if (!(this instanceof DOMobserve)) {
      return new DOMobserve(dom, option)
    }

    option = option || {}
    option = $.extend({}, {
      events  : ['change'],
      delay   : 50
    }, option)

    var namespace = getNamespace()
    loop(option.events, function (event, i) {
      option.events[i] = event + '.' + namespace
    })

    this.callbacks  = []
    this.delay      = option.delay
    this._checkerID = -1
    this._$dom      = $(dom)
    this._namespace = namespace
    this._events    = option.events
    this._preHTML   = this._$dom.html()
  }
  DOMobserve.prototype = {
    start: function () {
      if (this._checkerID !== -1) {
        return
      }

      this._preHTML = this._$dom.html()
      this._$dom.on(this._events, this.runCallbacks)
      this._checkerID = setInterval(function () {
        if (this._$dom.html() !== this._preHTML) {
          this.runCallbacks()
          this._preHTML = this._$dom.html()
        }
      }.bind(this), this.delay)

      return this
    },
    stop: function () {
      this._$dom.off(this._namespace)
      clearInterval(this._checkerID)
      this._checkerID = -1

      return this
    },
    register: function(callback){
      if(check.unfunction(callback)){
        throw TypeError()
      }
      this.callbacks.push(callback)

      return this
    },
    disconnect: function () {
      return this.callbacks.splice(0, this.callbacks.length)

      return this
    },
    runCallbacks:function(){
      loop(this.callbacks,function(callback){
        callback.apply(this.dom)
      }, this)

      return this
    }
  }

  return DOMobserve
})