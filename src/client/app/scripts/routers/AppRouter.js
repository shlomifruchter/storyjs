define(function (require) {
    "use strict";

    var Marionette = require('marionette');

    var AppRouter = Backbone.Marionette.AppRouter.extend({
        //"index" must be a method in AppRouter's controller
        appRoutes: {
            "": "index",
            "story/:storyid/write": "storyWrite",
            "story/:storyid/view": "storyView"
        }
    });

    return AppRouter;
});