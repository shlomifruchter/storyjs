define(function (require) {
    "use strict";

    var _ = require('underscore');
    var Marionette = require('marionette');
    var App = require('app');

    var PageLayout = require('views/PageLayout');
    var WelcomeView = require('views/WelcomeView');
    var HeaderView = require('views/HeaderView');
    var WriteStoryView = require('views/WriteStoryView');
    var StoryView = require('views/StoryView');

    var UserModel = require('models/UserModel');
    var StoryModel = require('models/StoryModel');

    var AppController = Backbone.Marionette.Controller.extend({

        initialize:function (options) {
            this._createPageLayout();
            this._bindEvents();
        },

        // -------------------------------------------------------------------------------------------------------------

        _createPageLayout: function() {
            this._createHeaderView();
            this._createFooterView();

            this.pageLayout = new PageLayout({
                headerView: this.headerView,
                footerView: this.footerView
            });
        },

        // -------------------------------------------------------------------------------------------------------------

        _createHeaderView: function() {
            this.headerView = new HeaderView();

            this.listenTo(this.headerView, 'button:clicked', function(buttonId){
                switch(buttonId) {
                    case 'home':
                        this.onHomeButtonClicked();
                        break;
                    case 'login':
                        this.onLoginButtonClicked();
                        break;
                    case 'logout':
                        this.onLogoutButtonClicked();
                        break;
                    case 'signup':
                        this.onSignupButtonClicked();
                        break;
                    case 'logout':
                        App.logOut();
                        break;
                }
            });
        },

        // -------------------------------------------------------------------------------------------------------------

        _createFooterView: function() {
            this.footerView = new Backbone.Marionette.View();
        },

        // -------------------------------------------------------------------------------------------------------------

        _bindEvents: function() {
            this.listenTo(App.facebookController, 'user:login', function() {
                App.vent.trigger('user:login');
            });
            this.listenTo(App.facebookController, 'user:logout', function(){
                App.vent.trigger('user:logout');
            });
            this.listenTo(App.vent, 'user:login', this._onUserLogin);
            this.listenTo(App.vent, 'user:logout', this._onUserLogout);
        },

        // -------------------------------------------------------------------------------------------------------------
        // Router handlers (pages)
        // -------------------------------------------------------------------------------------------------------------

        index:function () {
            this._showView(new WelcomeView(), _.bind(this.onWelcomePageDone, this));
        },

        // -------------------------------------------------------------------------------------------------------------

        storyView: function(storyId) {
            this._fetchStoryWithCache(storyId, _.bind(function(story){
                this._showView(new StoryView({
                    storyId: storyId,
                    model: story,
                }), _.bind(this.onStoryViewPageDone, this));
            }, this));
        },

        // -------------------------------------------------------------------------------------------------------------

        storyWrite: function(storyId) {
            this._fetchStoryWithCache(storyId, _.bind(function(story){
                this._showView(new WriteStoryView({
                    storyId: storyId,
                    model: story,
                }), _.bind(this.onWriteStoryPageDone, this));
            }, this));
        },

        // -------------------------------------------------------------------------------------------------------------
        // EO Router handlers
        // -------------------------------------------------------------------------------------------------------------

        // -------------------------------------------------------------------------------------------------------------
        // Event handlers
        // -------------------------------------------------------------------------------------------------------------

        onHomeButtonClicked: function() {
            App.appRouter.navigate('/', {trigger: true});
        },

        // -------------------------------------------------------------------------------------------------------------

        onLoginButtonClicked: function() {
            App.facebookController.login(function(isConnected){

            });
        },

        // -------------------------------------------------------------------------------------------------------------

        onLogoutButtonClicked: function() {
            App.facebookController.logout();
        },

        // -------------------------------------------------------------------------------------------------------------

        onSignupButtonClicked: function() {
            App.appRouter.navigate('signup', {trigger: true});
        },

        // -------------------------------------------------------------------------------------------------------------

        onWelcomePageDone: function(eventParams) {
            if(eventParams.action === 'storyCreated') {
                console.log('story created with title\'' + eventParams.model.get('title') + '\'');

                // Navigate to story writing page
                App.appRouter.navigate('story/' + eventParams.model.id + '/write', {trigger: true});
            }
        },

        // -------------------------------------------------------------------------------------------------------------

        onWriteStoryPageDone: function(eventParams) {
            // Navigate to story writing page
            App.appRouter.navigate('story/' + eventParams.model.get('storyId') + '/view', {trigger: true});
        },

        // -------------------------------------------------------------------------------------------------------------

        onStoryViewPageDone: function(eventParams) {

        },


        // -------------------------------------------------------------------------------------------------------------

        /**
         * Handle the event of user login.
         * @private
         */
        _onUserLogin: function() {
        },

        /**
         * Handle the event of user logout.
         * @private
         */
        _onUserLogout: function() {
        },

        // -------------------------------------------------------------------------------------------------------------
        // EO Event handlers
        // -------------------------------------------------------------------------------------------------------------

        /**
         * Show a view in the main layout
         * @param view
         * @private
         */
        _showView: function(view, onPageDone) {
            // Show the page layout if not already visible
            if(App.mainContainerRegion.currentView !== this.pageLayout) {
                App.mainContainerRegion.show(this.pageLayout);
            }
            this.mainView = view;

            // Bind listener to page done event
            if(_.isFunction(onPageDone)) {
                this.listenTo(this.mainView, 'page:done', onPageDone);
            }

            this.pageLayout.mainRegion.show(this.mainView);
        },

        // -------------------------------------------------------------------------------------------------------------

        _fetchStoryWithCache: function(id, success, error) {
            if(_.isUndefined(this.currentStory) || this.currentStory.get('id') !== id) {
                var story = new StoryModel({
                    id: id
                });

                story.fetch({
                    success: success,
                    error: error
                });
            } else {
                success(this.currentStory);
            }
        }
    });

    return AppController;
});