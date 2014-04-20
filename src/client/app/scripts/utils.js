/**
 * Created by Shlomi on 07/11/13.
 */
define(function (require) {
    'use strict';

    var Utils = {
        accessObjectByPath: function(o, s) {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            var a = s.split('.');
            while (a.length) {
                var n = a.shift();
                if (n in o) {
                    o = o[n];
                } else {
                    return;
                }
            }
            return o;
        }
    };

    return Utils;
});