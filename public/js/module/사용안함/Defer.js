define(['module/Classer', 'module/Check'], function (Classer, Check) {
    //done, fail, then, getState
    var STATUS = {
        pending: 'pending',
        resolved: 'done',
        rejected: 'fail'
    }
    var Promise = Classer({
        Init: function () {

            function done(callback) {
                Check.map(['Function', callback]);
                var def = new Defer();
                this.Callbacks.done.push({
                    func: callback,
                    def: def
                });
                if (this.status == STATUS.resolved) {
                    callback(this.parameters[this.status]);
                }
                return def.promise;
            }
            function fail(callback) {
                Check.map(['Function', callback]);
                var def = new Defer();
                this.Callbacks.fail.push({
                    func: callback,
                    def: def
                });
                if (this.status == STATUS.rejected) {
                    callback(this.parameters[this.status]);
                }

                return def.promise;
            }
            function then(doneCallback, failCallback) {
                this.done(doneCallback);
                if (Check.isDefined) {
                    this.fail(failCallback);
                }

                return this;
            }
            function cancel(doneCallback, failCallback) {
                this.Callbacks.done = [];
                this.Callbacks.fail = [];

                return this;
            }


            this.Inheritor({
                done: done,
                fail: fail,
                then: then
            });

            this.Instancer({
                status: STATUS.pending,
                Callbacks: {
                    pending: [],
                    done: [],
                    fail: []
                },
                parameters: {
                    pending: undefined,
                    done: undefined,
                    fail: undefined
                }
            });
        }
    })
    //resolve, reject
    var Defer = Classer({
        Init: function () {
            function resolve(data) {
                this.promise.status = STATUS.resolved;
                this.promise.parameters[STATUS.resolved] = data;

                var excuteCallbacks = this.promise.Callbacks.done
                  , len = excuteCallbacks.length;

                for (var i = 0; i < len; i++) {
                    var result = excuteCallbacks[i].func(data);
                    excuteCallbacks[i].def.resolve(result);
                }
            }
            function reject(err) {
                this.promise.status = STATUS.rejected;
                this.promise.parameters[STATUS.rejected] = err;
                
                var excuteCallbacks = this.promise.Callbacks.done
                  , len = excuteCallbacks.length;

                for (var i = 0; i < len; i++) {
                    var result = excuteCallbacks[i].func(err);
                    excuteCallbacks[i].def.reject(result);
                }
            }

            this.Inheritor({
                resolve: resolve,
                reject: reject
            });
            this.Instancer({
                promise: new Promise()
            });

        },
        Statices: {
            when: function () {
                var def = new Defer()
                  , promiseNumber = arguments.length
                  , doneNumber = 0
                  , promise;

                for (var key in arguments) {
                    promise = arguments[key];
                    promise.then(
                    function (data) {
                        doneNumber++;
                        if (doneNumber == promiseNumber) {
                            def.resolve(data);
                        }
                    },
                    function (err) {
                        def.reject(err);
                    });
                }

                return def.promise;
            }
        }
    })
    return Defer;
});