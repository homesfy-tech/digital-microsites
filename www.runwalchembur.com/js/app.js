window.$zopim || (function (g, a) {
    var f = $zopim = function (d) {
        f._.push(d)
    },
        b = f.s = g.createElement(a),
        c = g.getElementsByTagName(a)[0];
    f.set = function (d) {
        f.set._.push(d)
    };
    f._ = [];
    f.set._ = [];
    b.async = !0;
    b.setAttribute("charset", "utf-8");
    b.src = "//v2.zopim.com/?2F4uasrDz8AwB7cxrCz3igHZtZovK0w4";
    f.t = +new Date;
    b.type = "text/javascript";
    c.parentNode.insertBefore(b, c)
})(document, "script");
$zopim(function () {
    $zopim.livechat.button.setOffsetVerticalMobile(55);
    $zopim.livechat.button.setOffsetHorizontalMobile(10)
})

