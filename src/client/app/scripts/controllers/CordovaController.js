/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var $ = require('jquery');
    var _ = require('underscore');
    var Marionette = require('marionette');
    var App = require('app');

    var TRIGGERING = {
        DEVICE_READY: 'deviceready'
    };

    var CordovaController = Backbone.Marionette.Controller.extend({

        mockCordova: false, // should we mock the Cordova functionality?

        initialize:function (options) {
            if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) {
                App.log('Cordova does not exist. Reverts to mocking Cordova.', 'CordovaController.initialize');
                this.mockCordova = true;
            }
            this._bindEvents();
        },

        _bindEvents: function() {
            var _this = this;
            if(this.mockCordova) {
                $(document).ready( function() {
                    // Use defer to make sure anyone who want to listen to this event is already intialized
                    _.defer(function(){
                        _this.trigger(TRIGGERING.DEVICE_READY);
                    });
                });
            } else {
                $(document).on('deviceready', function() {
                    // Use defer to make sure anyone who want to listen to this event is already intialized
                    _.defer(function(){
                        _this.trigger(TRIGGERING.DEVICE_READY);
                    });
                });
            }
        },

        onClose: function() {
            $(document).off('deviceready');
        }
    });

    CordovaController.TRIGGERING = TRIGGERING;

    return CordovaController;
});