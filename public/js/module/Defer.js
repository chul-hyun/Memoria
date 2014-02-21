define(['Classer', 'Check', 'Err'], function (Classer, Check, Err) {
    //done, fail, then, getState
    var STATUS = {
        pending: 'pending',
        resolved: 'resolved',
        rejected: 'rejected'
    }
    var Promise = Classer({
        Init: function () {
           
            function done(callback) {
                var callbackDefer = new Defer();
                Check.map(['Function', callback]);
                this.Callbacks.push({
                    func: callback,
                    defer: callbackDefer
                });
                if (this.status == STATUS.resolved) {

                    this._executeCallback({
                        func: callback,
                        defer: callbackDefer
                    }, this.parameters)
                }
                return callbackDefer.promise;
            }
            function cancel(doneCallback, failCallback) {
                this.Callbacks = [];
                return this;
            }
            function executeCallback(callbackData, result) {
                window.setTimeout(function () {
                    var res = callbackData.func(result);
                    if (res instanceof Promise) {
                        callbackData.defer._bind(res);
                    } else {
                        callbackData.defer.resolve(res);
                    }
                }, 0);
            }

            this.Inheritor({
                done: done,
                _executeCallback: executeCallback
            });

            this.Instancer({
                status: STATUS.pending,
                Callbacks: [],
                parameters: undefined,
                binding: undefined
            });
        }
    })
    //resolve, reject
    var Defer = Classer({
        Init: function () {
            function resolve(data) {
                var resovePromise = this.promise;
                resovePromise.status = STATUS.resolved;
                resovePromiseparameters = data;
                var excuteCallbacks = resovePromise.Callbacks
                  , len = excuteCallbacks.length;

                for (var i = 0; i < len; i++) {
                    resovePromise._executeCallback(excuteCallbacks[i], data);
                }
            }
            function reject(err) {
                var resovePromise = this.promise;
                resovePromise.status = STATUS.rejected;
                throw new Err.DeferError(err);
            }

            function bind(promise) {
                var that = this;
                promise.done(function (data) {
                    that.resolve(data);
                });
            }

            this.Inheritor({
                resolve: resolve,
                reject: reject,
                _bind:bind
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
                    promise.done(
                    function (data) {
                        doneNumber++;
                        if (doneNumber == promiseNumber) {
                            def.resolve(data);
                        }
                    });
                }

                return def.promise;
            }
        }
    })
    return Defer;
});