define(['LazyRegister'], function (LazyRegister) {
    LazyRegister.service("slideModel", (function () {
        var menu_file_src = "/pages";
        return {
            sliders: [
            {
                link: "#test1",
                img: "images/test1.jpg"
            },
            {
                link: "#test2",
                img: "images/test2.jpg"
            },
            {
                link: "#test3",
                img: "images/test3.jpg"
            },
            {
                link: "#test4",
                img: "images/test4.jpg"
            }]
        }
    })());
});