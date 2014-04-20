/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var App = require('app');
    var template = require('stache!../../templates/loginView');

    var LoginView = Backbone.Marionette.ItemView.extend({
        template: template,
        className: "login-container",

        events: {
        },

        // -------------------------------------------------------------------------------------------------------------

        initialize: function() {

        },

        // -------------------------------------------------------------------------------------------------------------

        onRender: function() {
        }
    });

    return LoginView;
});