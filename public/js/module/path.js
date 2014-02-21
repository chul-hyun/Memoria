define(['Check', 'Loop'], function (Check, Loop) {
    /**
    * 경로들을 가지고있는 배열 paths에 root경로를 적용시킨 새로운 배열을 반환한다.
    * paths값이 문자열일시 root+'/'+paths 를 반환한다.
    *
    * @params root: 적용시킬 root값. (string)
    * @params paths: 적용될 path모음. string값으로 단일path도 가능하다.
    */
    function applyRoot(root, paths) {
        Check.map(['String', root], ['Array', 'Object', 'String', paths]);

        if (root === '') {
            return paths;
        }

        if (Check.isString(paths)) {
            return [root, paths].join('/');
        }

        var resultPaths = [];
        Loop.each(paths, function (val) {
            resultPaths.push([root, val].join('/'));
        })

        return resultPaths;
    }

    /**
    * Converts snake_case to camelCase.
    * Also there is special case for Moz prefix starting with upper case letter.
    * @param name Name to normalize
    */
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;

    function camelCase(name) {
        return name.
    replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).
    replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    function noCamelCase(name) {
        console.log(name)
        return name.match(/^(?:[^A-Z]+)|[A-Z](?:[^A-Z]*)+/g)
                    .join("-")
                    .toLowerCase();
    }

    /**
    * 
    */
    function getFileName(pathString) {
        Check.map(['String', pathString]);
        console.log(pathString.split('/').pop());
        return pathString.split('/').pop();
    }

    return {
        applyRoot: applyRoot,
        camelCase: camelCase,
        noCamelCase: noCamelCase,
        getFileName: getFileName
    };
});