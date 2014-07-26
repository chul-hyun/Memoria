define(function(){
  function DOMobserve(dom, delay){
    this.callbacks  = []
    this.delay      = delay || 50
    this.puse       = true
    setInterval()

    var preHTML = dom.innerHTML
    function checkDOM(){
      if(dom.innerHTML !== preHTML){
        runCallbacks()
      }
    }
  }
  DOMobserve.prototype = {
    changed:function(callback){
      this.callbacks.push(callback)
    },
    puse:function(puse){
      this.puse = !!puse
    },
    delay: function (delay) {
      this.delay = delay
    },
    reset:function(){
      this.callbacks = []
    },
    stop:function(){
    },
    runCallbacks:function(){

    }
  }
})