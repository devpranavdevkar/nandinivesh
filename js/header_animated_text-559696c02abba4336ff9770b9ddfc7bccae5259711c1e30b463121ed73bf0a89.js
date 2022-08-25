$(document).ready(function () {
  function t(t, e) {
    $(t).addClass(e);
  }
  function e(t, e) {
    $(t).removeClass(e);
  }
  function i(t, e) {
    o.val(o.val() + t), m++, setTimeout(e, 100);
  }
  function n() {
    m < s.length
      ? i(s[m], n)
      : setTimeout(function () {
          t(o, "spin-to-top"),
            setTimeout(function () {
              t(o, "hide"),
                e(a, "hide"),
                t(a, "text-rotate"),
                setTimeout(function () {
                  e(a, "text-rotate"),
                    setTimeout(function () {
                      t(a, "spin-to-top"),
                        setTimeout(function () {
                          t(a, "hide"),
                            e(u, "hide"),
                            t(u, "text-rotate"),
                            setTimeout(function () {
                              e(d, "hide"), t(d, "fullstop");
                            }, 1500);
                        }, 1e3);
                    }, 1e3);
                }, 1500);
            }, 1e3);
        }, 1e3);
  }
  var o = $("#animated-header-input"),
    a = $("#animated-header-automated-text"),
    u = $("#animated-header-delivered-text"),
    d = $("#animated-header-fullstop"),
    s = "Simplified".split(""),
    m = 0;
  s.length;
  o.val(""), o.focus(), setTimeout(n, 1500);
});
