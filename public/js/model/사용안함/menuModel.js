define(['LazyRegister'], function (LazyRegister) {

    LazyRegister.service("menuModel", (function () {
        var menu_file_src = "/pages";
        return {
            menus: [
        {
            name: "Home",
            url: menu_file_src + "/home/home.html"
        },
        {
            name: "App",
            url: menu_file_src + "/app/app.html"
        },
        {
            name: "Program",
            url: menu_file_src + "/program/program.html"
        },
        {
            name: "Site",
            url: menu_file_src + "/site/site.html"
        },
        {
            name: "개나소나?",
            url: menu_file_src + "/about/about.html"
        }]
        }
    })());
});