/*global require*/
'use strict';

require.config({
	baseUrl: "./scripts",
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        marionette:{
            deps: ["underscore", "backbone", "jquery"],
            exports:"Marionette"
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        parse: {
            exports: "Parse"
        },
        fastclick: {
            exports: "Fastclick"
        },
        facebook : {
            exports: "FB"
        }
    },
    paths: {
        jquery: "../bower_components/jquery/jquery",
        backbone: "../bower_components/backbone/backbone",
        deepmodel: "../bower_components/backbone-deep-model/distribution/deep-model",
		marionette: "vendor/backbone/backbone.marionette",
        underscore: "../bower_components/underscore/underscore",
        bootstrap: "vendor/bootstrap",
		Mustache: "vendor/mustache/mustache",
		text: "vendor/require/text",
        i18n: "vendor/require/i18n",
		stache: "vendor/require/stache",
        parse: "vendor/parse/parse",
        fastclick: "vendor/fastclick/fastclick",
        facebook: "//connect.facebook.net/en_US/all" // TODO: remove in phonegap build
    }
});

// Read locale from local storage
require({
    locale: localStorage.getItem('locale') || 'en-us'
});

// Main entry point
require(["app", "jquery", "routers/AppRouter", "controllers/AppController", "controllers/CordovaController",
    "controllers/FacebookController", "backbone", "marionette", "Mustache",
    "bootstrap", "fastclick", "i18n!nls/whatsyourstory"],
    function (App, $, AppRouter, AppController, CordovaController,
              FacebookController, Backbone, Marionette, Mustache,
              bootstrap, Fastclick, i18nDict) {

        Backbone.Marionette.Renderer.render = function(template, data){
            data.Dictionary = i18nDict;
            return template(data);
        };

        App.cordovaController = new CordovaController();
        App.facebookController = new FacebookController();

        App.appRouter = new AppRouter({
            controller: new AppController()
        });

        Fastclick.attach(document.body);

        App.start();
    }
);
