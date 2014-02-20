$.getDiv = function (id) {
    var $div = $("[id='" + id + "']");
    return ($div.length == 0) ? $("<div>").attr("id", id).appendTo("body") : $div;
}

$.setPage = function ($this, url, data, callback) {
    if (callback == undefined) {
        callback = function () { };
    }
    if (data == undefined) {
        data = {};
    } else if (typeof data == "function") {
        data = {};
        callback = data;
    }
    var getter = new Array();
    $.get(url,data).done(function (html_data) {
        $this.html($.tagContent(html_data, "body"));
        $(html_data).filter("script").each(function (index, script) {
            getter.push($.getScript($(script).attr("src")));
        })
        $(html_data).filter("link").each(function (index, link) {
            getter.push($.getCSS($(link).attr("href")));
            getter.push($.getCSS($(link).attr("href")));
        })
        $.when(getter).done(callback);
    })
}

$.getCSS = function (url) {
    var $getCSS_div = $.getDiv("getCSS_box").hide();

    if ($getCSS_div.find("[getCSSsrc='" + url + "']").length != 0) {
        return $("[getCSSsrc='" + url + "']").data("getCSS_deferred");
    }
    var reulst_deferred = $.get(url);
    var $styleDiv = $("<div>").attr("getCSSsrc", url).data("getCSS_deferred", reulst_deferred);
    $getCSS_div.append($styleDiv);
    reulst_deferred.done(function (data) {
        $styleDiv.append($("<style>").text(data));
    }).fail(function () {
        $styleDiv.remove();
    })
};

$.setStyle = function (style, name, change) {
    var $setStyle_div = $.getDiv("setStyle_box");
    var $styleDiv = $("<div>");
    console.log(name);
    if (name != undefined) {
        console.log("len: " + $styleDiv.find("[name='" + name + "']").length);
        if ($styleDiv.find("[name='" + name + "']").length != 0) {
            if (change) {
                $styleDiv.find("[name='" + name + "']").remove();
            } else {
                return;
            }
        }
        $styleDiv.attr("name", name);
    }
    $styleDiv.append($("<style>").html(style));
    $setStyle_div.append($styleDiv);
}

$.tagContent = function(text, tag){
    return new RegExp("<"+tag+"[^>]*>(.*?)<\/"+tag+">","ig").exec(text)[1];
}

$.is = function (selector) {
    return $("html").is(selector);
}
