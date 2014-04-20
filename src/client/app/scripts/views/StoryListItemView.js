/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var App = require('app');

    var template = require('stache!../../templates/storyListItemView');

    var UserModel = require('models/UserModel');
    var StoryModel = require('models/StoryModel');

    var StoryListItemView = Backbone.Marionette.CompositeView.extend( {
        template: template,
        tagName: 'li',
        className: 'story-list-item',

        events: {
            'click': 'onItemClicked'
        },

        ui: {
        },

        initialize: function(options) {
        },

        onItemClicked: function() {
            // Navigate to story writing page
            App.appRouter.navigate('story/' + this.model.get('id') + '/view', {trigger: true});
        }
    });

    return StoryListItemView;
});