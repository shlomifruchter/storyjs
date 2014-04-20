/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var App = require('app');

    var template = require('stache!../../templates/storyView');

    var FragmentItemView = require('views/FragmentItemView');

    var FragmentCollection = require('collections/FragmentCollection');

    var UserModel = require('models/UserModel');
    var StoryModel = require('models/StoryModel');
    var FragmentModel = require('models/FragmentModel');

    var StoryView = Backbone.Marionette.CompositeView.extend( {
        template: template,
        className: 'story',
        itemView: FragmentItemView,
        itemViewContainer: ".fragments",

        events: {
            'click .go-button': 'onGoButtonClicked',
            'keypress .fragment-content': 'onKeyPressedFragmentInput'
        },

        ui: {
            fragmentContent: '.fragment-content',
            goButton: '.go-button',
            goButtonContent: '.go-button .content'
        },

        initialize: function(options) {
            this.collection = new FragmentCollection({
                storyId: options.storyId
            });

            this.collection.fetch({
                success: function(collection, response, options) {
                    App.log('got collection, length = ' + collection.length);
                },
                error: function(collection, response, options) {
                    // TODO: handle error here
                }
            });
        },

        onGoButtonClicked: function() {
            // Create fragment
            var fragment = new FragmentModel({
                storyId: this.model.id,
                content: this.ui.fragmentContent.val()
            });

            // Show loading
            this._toggleButtonLoader(true);

            var _this = this;
            fragment.save({}, {
                success: function(model, response, options) {
                    _this.collection.add(model);
                    _this._toggleButtonLoader(false);
                    _this.ui.fragmentContent.val('')
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
        },

        _toggleButtonLoader: function(flag) {
            if(flag) {
                this.ui.goButtonContent.text("Writing...");
                this.ui.goButton.prop("disabled", true);
                this.ui.goButton.addClass("loading");
            } else {
                this.ui.goButtonContent.text("Go");
                this.ui.goButton.prop("disabled", false);
                this.ui.goButton.removeClass("loading");
            }
        }
    });

    return StoryView;
});