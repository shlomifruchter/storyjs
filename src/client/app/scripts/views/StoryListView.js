/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var App = require('app');

    var template = require('stache!../../templates/storyListView');

    var StoryListItemView = require('views/StoryListItemView');

    var StoryCollection = require('collections/StoryCollection');

    var UserModel = require('models/UserModel');
    var StoryModel = require('models/StoryModel');

    var StoryListView = Backbone.Marionette.CompositeView.extend( {
        template: template,
        className: 'story-list',
        itemView: StoryListItemView,
        itemViewContainer: '.stories-container',

        events: {
        },

        ui: {
        },

        initialize: function(options) {
            this.collection = new StoryCollection({
                //userId: options.userId
            });

            this.collection.fetch({
                success: function(collection, response, options) {
                    App.log('got collection, length = ' + collection.length);
                },
                error: function(collection, response, options) {
                    // TODO: handle error here
                }
            });
        }
    });

    return StoryListView;
});