//AngularJS 참고.
define([], function () {
    var uid = ['0', '0', '0'];

    function get() {
        var index = uid.length;
        var digit;

        while (index) {
            index--;
            digit = uid[index].charCodeAt(0);
            if (digit == 57 /*'9'*/) {
                uid[index] = 'A';
                return uid.join('');
            }
            if (digit == 90  /*'Z'*/) {
                uid[index] = '0';
            } else {
                uid[index] = String.fromCharCode(digit + 1);
                return uid.join('');
            }
        }
        uid.unshift('0');
        return uid.join('');
    }

    function reset() {
        uid = ['0', '0', '0'];
    }
    return {
        get: get,
        reset: reset
    }
});