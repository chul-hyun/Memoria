var PCH = PCH || {};

PCH.namespace = function(ns_string){
     var parts = ns_string.split('.'),
         parent =PCH,i;
     if(parts[0]==="PCH"){
         parts = parts.slice(1);
     }

     for(i=0; i< parts.length ;i++){
         if (typeof parent[parts[i]] ==="undefined"){
             parent[parts[i]] ={};
         }

         parent = parent[parts[i]];
     }
     return parent;
};
PCH.inherit = function (c, p) {
    var pp = p.prototype;
    var cp = c.prototype;
    var newPrototype = $.extend({}, cp);
    var F = function () {
        for (var pro in newPrototype) {
            this[pro] = newPrototype[pro];
        }
    };
    F.prototype = pp;
    c.prototype = new F();
};
/* 클래스 구조
var className;

        className = (function () {

            /*private static member*
            var counter = 0;
            /*private static method.*
            function incrementCounter() {
                return counter++;
            };


            /*class constructor.*
            var constructorFn = function (id, t, s) {
                this.constructor(id, t)
                this.sss = s;
                var self = this;
                /*private instance member*
                var index = incrementCounter();
                /*private instance method*
                var setIndex = function (i) {
                    index = i
                }
                /*public instance member.*
                this.pubInstVar = id;
                /*public instance method.*
                this.getIndex = function () {
                    return index;
                };
            };
            /*public static method.*
            constructorFn.clidrenName = "myclass";
            /*public static method.*
            constructorFn.getNoOfInsts = function () {
                return counter;
            };
            /*return the constructor.*
            return constructorFn;
        })();
*/