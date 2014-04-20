define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var App = require('app');

    var BaseModel = require('models/BaseModel');

    var template = require('stache!../../templates/headerView');

    var HeaderView = Backbone.Marionette.ItemView.extend({
        template: template,
        className: "header-container",

        events: {
            "click [data-button-id]": "_onButtonClicked"
        },

        ui: {
            userName: ".user-name"
        },

        modelEvents: {
            'change': '_renderUserDetails'
        },

        // -------------------------------------------------------------------------------------------------------------

        initialize: function() {
            this.model = new BaseModel({
                currentUser: null
            });
            this._bindEvents();
        },

        // -------------------------------------------------------------------------------------------------------------

        onRender: function() {
            if(App.getCurrentUser()) {
                this._setUserLoggedIn(true);
            }
        },

        // -------------------------------------------------------------------------------------------------------------

        _bindEvents: function() {
            this.listenTo(App.vent, 'user:login', this._onUserLogin);
            this.listenTo(App.vent, 'user:logout', this._onUserLogout);
        },

        // -------------------------------------------------------------------------------------------------------------

        _onButtonClicked: function(event) {
            var buttonId = $(event.currentTarget).data("button-id");
            this.trigger("button:clicked", buttonId);
        },

        // -------------------------------------------------------------------------------------------------------------

        _onUserLogin: function() {
            var currentUser = App.getCurrentUser();
            this.model.set('currentUser', {
                name: currentUser.name
            });
            this._setUserLoggedIn(true);
        },

        // -------------------------------------------------------------------------------------------------------------

        _onUserLogout: function() {
            this._setUserLoggedIn(false);
        },

        // -------------------------------------------------------------------------------------------------------------

        _setUserLoggedIn: function(isLoggenIn) {
            this.$el.toggleClass('logged-in', isLoggenIn);
        },

        // -------------------------------------------------------------------------------------------------------------

        _renderUserDetails: function() {
            this.ui.userName.text(this.model.get('currentUser.name'));
        }
    });

    return HeaderView;
});