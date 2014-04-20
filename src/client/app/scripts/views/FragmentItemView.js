/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');
    var Marionette = require('marionette');
    var template = require('stache!../../templates/fragmentItemView');

    var UserModel = require('models/UserModel');
    var FragmentModel = require('models/FragmentModel');

    var FragmentItemView = Backbone.Marionette.CompositeView.extend( {
        template: template,
        className: 'fragment',

        events: {
        },

        ui: {
        },

        initialize: function(options) {
        }
    });

    return FragmentItemView;
});