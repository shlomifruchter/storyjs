define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var template = require('stache!../../templates/writeStoryView');

    var UserModel = require('models/UserModel');
    var StoryModel = require('models/StoryModel');
    var FragmentModel = require('models/FragmentModel');

    var WriteStoryView = Backbone.Marionette.Layout.extend( {
        template: template,

        // View Event Handlers
        events: {
            'click .go-button': 'onGoButtonClicked',
            'keypress .fragment-content': 'onKeyPressedFragmentInput'
        },

        ui: {
            storyTitle: '.story-title',
            fragmentContent: '.fragment-content',
            goButton: '.go-button',
            goButtonContent: '.go-button .content'
        },

        initialize: function(options) {
        },

        onGoButtonClicked: function(){
            // Create fragment
            var fragment = new FragmentModel({
                storyId: this.model.id,
                content: this.ui.fragmentContent.val()
            });

            // Show loading
            this.ui.goButtonContent.text("Writing...");
            this.ui.goButton.prop("disabled", true);
            this.ui.goButton.addClass("loading");

            var _this = this;
            fragment.save({}, {
                success: function(model, response, options) {
                    _this.trigger("page:done", {
                        action: "fragmentCreated",
                        model: model
                    });
                },
                error: function(model, xhr, options) {
                    // TODO: handle error here
                }
            });
        },

        onKeyPressedFragmentInput: function(event) {
            if(event.which === 13) {
                this.onGoButtonClicked();
            }
        }
    });

    return WriteStoryView;
});