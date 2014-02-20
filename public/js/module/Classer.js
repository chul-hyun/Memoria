define([], function () {

    /**
    * prototype 기반 임시생성자를 이용한 상속.
    * 상속이 완료되면 자식 객체에서 this.fn으로 자신의 prototype에 접근가능하며
    * this.base로 부모클래스에 접근 가능하다.
    */
    var inherit = (function () {
        var F = function () { };
        return function (P, C) {
            F.prototype = P.prototype;
            C.prototype = new F();
            C.prototype.constructor = C;

            C.prototype.fn = C.prototype;
            C.prototype.base = P;

            for (var staticProperty in P) {
                if (P.hasOwnProperty(staticProperty)) {
                    C[staticProperty] = P[staticProperty];
                }
            }
        }
    })();

    /**
    * 상속기능이 있는 클래스가 만들어진다.
    * @param superClass 상속받을 클래스. 기본값: Object. (생략 가능)
    * @param classInfo 클래스 정보를 가지고 있는 객체. Init, Instances, Statices, Inherits의 속성이 있다.
    * ex)
    * person = makeClass({
    *      Init: function (name) {
    *          this.Instancer({
    *              propName: name
    *          });
    *          this.Inheritor({
    *              propName: name
    *          });
    *      },
    *      Instances: {
    *          Title: "personTest"
    *      },
    *      Statices: {
    *          classType: "test",
    *          className: "person"
    *      },
    *      Inherits: {
    *          inName: "pch"
    *      }
    *  });
    *
    *  pch = new person("김쒸");
    *  rure = new person("쿠로네코");
    *
    *  superman = makeClass(person, {
    *      Init: function (name) {
    *          this.Instancer({ propName: name });
    *      },
    *      Instances: {
    *          testTTT: "PL"
    *      },
    *      Statices: {
    *          className: "super"
    *      },
    *      Inherits: {
    *          otherName: "batbat"
    *      }
    *
    *  });
    *
    *
    *  superRure = new superman("냥");
    */
    function Classer(superClass, classInfo) {
        //superClass, classInfo 설정.
        if (arguments.length < 2) {
            classInfo = arguments[0];
            superClass = Object;
        }

        //생성자 함수.(클래스) 리턴되는 값.
        function Init() {
            //Instance property, Inherit property 들 설정.
            if (classInfo.hasOwnProperty('Instances')) {
                Instancer.call(this, classInfo.Instances);
            }
            if (classInfo.hasOwnProperty('Inherits')) {
                Inheritor.call(this, classInfo.Inherits);
            }
            this.Instancer = function () {
                Instancer.apply(this, arguments);
            };

            this.Inheritor = function () {
                Inheritor.apply(this, arguments);
            };
            // classInfo.Init 실행(생성자 함수 실행)
            if (classInfo.hasOwnProperty('Init')) {
                classInfo.Init.apply(this, arguments);
            }
        }

        /*
        function _pass(values) {
        return values;
        }
        */

        //상속설정.
        inherit(superClass, Init);

        //Init.fn.Instancer = Instancer;
        //Init.fn.Inheritor = Inheritor;


        //static property 설정.
        if (classInfo.hasOwnProperty('Statices')) {
            Staticer.call(Init, classInfo.Statices);
        }

        //생성자 함수 리턴.
        return Init;



        //this에 저장되는 instatnce property를 초기화하는 helper함수.
        function Instancer(values) {
            return _dataLoop.call(this, values, function (val, name) {
                if (typeof val === 'function') {
                    this[name] = function proxy(){
                        return val.apply(this, arguments);
                    }
                } else {
                    this[name] = val;
                }

            })
        }
        //함수(클래스) 자체에 저장되는 static property를 초기화하는 helper함수.
        function Staticer(values) {
            return _dataLoop.call(this, values, function (val, name) {
                Init[name] = val;
            })
        }
        //prototype에 저장되는 Inheritor property(상속되는 값)를 초기화하는 helper함수.
        function Inheritor(values) {
            return _dataLoop.call(this, values, function (val, name) {
                if (typeof val === 'function') {
                    this.fn[name] = function proxy(){
                        return val.apply(this, arguments);
                    }
                } else {
                    this.fn[name] = val;
                }
            })
        }

        //위 함수들에 이용되는 loop 중복구문. (매개변수를 검사하고 알맞은 루프(hasOwnProperty검사가 된)를 돌게 해준다.)
        function _dataLoop(values, iterator) {
            if (typeof values !== "object") {
                throw new Error("올바른 매개변수가 아닙니다.")
            }
            for (var name in values) {
                if (values.hasOwnProperty(name)) {
                    iterator.call(this, values[name], name)
                }
            }

            return values;
        }

    }
    return Classer;
});