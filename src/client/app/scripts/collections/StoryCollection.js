/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var BaseCollection = require('collections/BaseCollection');
    var StoryModel = require('models/StoryModel');

    var StoryCollection = BaseCollection.extend({
        model: StoryModel,

        url: function() {
            return "http://localhost:1337/story";
        },

        initialize: function(options) {
        }
    });

    return StoryCollection;
});