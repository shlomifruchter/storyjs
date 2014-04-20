/**
 * Created with JetBrains PhpStorm.
 * User: Shlomi
 * Date: 22/10/13
 * Time: 09:02
 * To change this template use File | Settings | File Templates.
 */
define(function (require) {
    "use strict";

    var Marionette = require('marionette');
    var template = require('stache!../../templates/pageLayout');

    var PageLayout = Backbone.Marionette.Layout.extend( {
        template: template,
        regions: {
            "headerRegion": ".header",
            "mainRegion": ".main",
            "footerRegion": ".footer"
        },
        initialize: function(options){
            this.headerView = options.headerView;
            this.footerView = options.footerView;
        },
        onRender: function() {
            this.headerRegion.show(this.headerView);
            this.footerRegion.show(this.footerView);
        }
    });

    return PageLayout;
});