define([], function () {

    var $filterProvider;

    function setFilterProvider(value) {
        $filterProvider = value;
    }

    function register(filter) {
        if (!$filterProvider) {
            throw new Error("$setProvide is not set!");
        }
        $filterProvider.register(filter[0], filter[1]);
    }

    return {
        setFilterProvider: setFilterProvider,
        register: register
    }
})
