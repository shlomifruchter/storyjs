define(function (require) {
    "use strict";

    var Marionette = require('marionette');
    var UserModel = require('models/UserModel');
    var i18nDict = require('i18n!nls/whatsyourstory');
    var Utils = require('utils');

    var App = new Backbone.Marionette.Application();

    App.addRegions({
        mainContainerRegion: '.main-container'
    });

    App.addInitializer(function () {
        Backbone.history.start();
    });

    /**
     * Global configuration
     */
    App.config = {
        dataAPIRootUrl: 'http://localhost:1337',
        fbAppId: '532530546840982'
    };

    /**
     * Globally accessible method for logging
     */
    App.log = function(message, namespace, object) {
        namespace = namespace || '';
        if(_.isUndefined(console)) {
            alert(message + " [in " + namespace + "]");
        } else {
            console.log(message + " [in " + namespace + "]");
        }
    };

    /**
     * Globally accessible method for setting the locale
     * @returns {*}
     */
    App.setLocale = function(locale){
        var currentLocale = localStorage.getItem('locale');
        if(currentLocale === locale) {
            return;
        }
        localStorage.setItem('locale', locale);
        location.reload();
    };

    App.translate = function(key) {
        return Utils.accessObjectByPath(i18nDict, key);
    };

    /**
     * Globally accessible method for getting the locale
     * @returns {*}
     */
    App.getLocale = function(){
        var currentLocale = localStorage.getItem('locale');
        return currentLocale;
    };

    /**
     * Globally accessible method for getting the current user
     * @returns {*}
     */
    App.getCurrentUser = function() {
        return App.facebookController.getCurrentUser();
    };

    /**
     * Globally accessible method for history back
     * @returns {*}
     */
    App.backButtonClicked = function() {
        window.history.back();
    };

    App.SocialShare = function() {
        // Call PhoneGap Social Share
        alert('SHARE!');
    };



    return App;
});