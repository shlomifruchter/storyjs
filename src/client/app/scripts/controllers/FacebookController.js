/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var _ = require('underscore');
    var Marionette = require('marionette');
    var App = require('app');
    var FB = require('facebook');

    var UserModel = require('models/UserModel');

    var CordovaController = require('controllers/CordovaController');

    var FBController = Backbone.Marionette.Controller.extend({
        initialized: false,
        currentUser: null,
        currentFBUserObject: null,

        initialize:function (options) {
            this._subscribeToEvents();
            this.initialized = true;
        },

        _subscribeToEvents: function() {
            var _this = this;
            FB.Event.subscribe('auth.login', function(response) {
                App.log('auth.login event', 'FBController._subscribeToEvents');
                App.log('Fetching facebook user object...', 'FBController._subscribeToEvents');
                FB.api('/me', function(response) {
                    _this.currentFBUserObject = response;
                    _this.currentUser = response; // TODO: replace this with UserModel

                    _this.trigger('user:login', {
                        userObject: _this.currentUser
                    });

//                    this.currentUser = new UserModel({
//                        id: _this.currentFBUserObject.id
//                    });
//
//                    this.currentUser.fetch({
//                        // User already exists
//                        success: function(model, response, options) {
//                            debugger;
//                            _this.currentUser = model;
//                            _this.trigger('ser:login', {
//                                userObject: _this.currentUser
//                            });
//                        },
//                        // Fail to fetch user - try to create it
//                        error: function(model, response, options) {
//                            debugger;
//                            _this.currentUser = new UserModel({
//                                'fbuid': _this.currentFBUserObject.id,
//                                'username': _this.currentFBUserObject.username,
//                                'firstName': _this.currentFBUserObject.first_name,
//                                'lastName': _this.currentFBUserObject.last_name,
//                                'name': _this.currentFBUserObject.name,
//                                'email': _this.currentFBUserObject.email,
//                                'locale': _this.currentFBUserObject.locale
//                            });
//                            _this.currentUser.save(null, {
//                                success: function(model, response, options) {
//                                    _this.currentUser = model;
//                                    _this.trigger('ser:login', {
//                                        userObject: _this.currentUser
//                                    });
//                                },
//                                error: function(model, xhr, options) {
//                                    // TODO: handle error
//                                    App.log('failed to save user model', 'FBController._subscribeToEvents')
//                                }
//                            })
//                        }
//                    });
                });
            });

            FB.Event.subscribe('auth.logout', function(response) {
                App.log('auth.logout event', 'FBController._subscribeToEvents');
                _this.currentFBUserObject = null;
                _this.currentUser = null;
                _this.trigger("user:logout", {});
            });

            FB.Event.subscribe('auth.sessionChange', function(response) {
                App.log('auth.sessionChange event', 'FBController._subscribeToEvents');
                _this.trigger("auth:sessionChange", {});
            });

            FB.Event.subscribe('auth.statusChange', function(response) {
                App.log('auth.statusChange event', 'FBController._subscribeToEvents');
                _this.trigger("auth:statusChange", {});
            });

            this.listenTo(App.cordovaController, CordovaController.TRIGGERING.DEVICE_READY, this.onDeviceReady);
        },

        onDeviceReady: function() {
            if(_.isUndefined(window.FB)) {
                throw "FB global variable is undefined in FBController.onDeviceReady";
            }

            if(_.isUndefined(window.CDV)) {
                App.log("Facebook cordova plugin is missing, reverts to normal facebook integration.", "FBController.onDeviceReady")
                FB.init({
                    appId: App.config.fbAppId,
                    status    : true, // check login status
                    cookie	: true, // enable cookies to allow the server to access the session
                    xfbml	: true
                });
            } else {
                // Use Facebook cordova plugin (CDV)
                FB.init({
                    appId: App.config.fbAppId,
                    nativeInterface: CDV.FB,
                    status    : true, // check login status
                    // cookie	: true, // enable cookies to allow the server to access the session
                    // xfbml	: true,
                    useCachedDialogs: false
                });
            }
        },

        getLoginStatus: function (callback) {
            var _this = this;
            FB.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    App.log('logged in', 'FBController.getLoginStatus');
                    callback(true);
                } else {
                    App.log('not logged in', 'FBController.getLoginStatus');
                    callback(false);
                }
            });
        },

        logout: function () {
            FB.logout(function(response) {
                App.log('logged out', 'FBController.logout');
            });
        },

        login: function (callback) {
            App.log('Trying to log in...', 'FBController.login');
            FB.login(
                function(response) {
                    if (response.session) {
                        App.log('logged in', 'FBController.login');
                    }
                    else {
                        App.log('not logged in', 'FBController.login');
                    }
                }, { scope: "email" }
            );
        },

        getCurrentUser: function() {
            return this.currentUser;
        }
    });

    return FBController;
});