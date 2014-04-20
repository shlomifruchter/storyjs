define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var App = require('app');

    var template = require('stache!../../templates/welcomeView');

    var StoryModel = require('models/StoryModel');

    var StoryListView = require('views/StoryListView');

    var WelcomeView = Backbone.Marionette.Layout.extend( {
        template: template,

        // View Event Handlers
        events: {
            'click .go-button': 'onGoButtonClicked',
            'keypress .story-title': 'onKeyPressedTitleInput'
        },

        ui: {
            storyTitle: ".story-title",
            goButton: ".go-button",
            goButtonContent: ".go-button .content"
        },

        regions: {
            storyListRegion: ".story-list-container"
        },

        initialize: function() {
            this.storyListView = new StoryListView();
        },

        onRender: function() {
            this.storyListRegion.show(this.storyListView);
        },

        onGoButtonClicked: function(){
            // Create story
            var story = new StoryModel({
                title: this.ui.storyTitle.val()
            });

            // Show loading
            this.ui.goButtonContent.text("Creating...");
            this.ui.goButton.prop("disabled", true);
            this.ui.goButton.addClass("loading");

            var _this = this;
            story.save({}, {
                success: function(model, response, options) {
                    _this.trigger("page:done", {
                        action: "storyCreated",
                        model: model
                    });
                },
                error: function(model, xhr, options) {
                    // TODO: handle error here
                }
            });
        },

        onKeyPressedTitleInput: function(event) {
            if(event.which === 13) {
                this.onGoButtonClicked();
            }
        }
    });

    return WelcomeView;
});