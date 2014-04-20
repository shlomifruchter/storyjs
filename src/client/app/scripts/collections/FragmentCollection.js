/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var BaseCollection = require('collections/BaseCollection');
    var FragmentModel = require('models/FragmentModel');

    var FragmentCollection = BaseCollection.extend({
        model: FragmentModel,

        url: function() {
            return "http://localhost:1337/story/fragments/" + this.storyId;
        },

        initialize: function(options) {
            this.storyId = options.storyId;
        }
    });

    return FragmentCollection;
});