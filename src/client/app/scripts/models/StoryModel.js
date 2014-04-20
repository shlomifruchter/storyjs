/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var BaseModel = require('models/BaseModel');

    var StoryModel = BaseModel.extend({
        //url: '/story', // TODO: on linux we might need to use 'Story' to match the url on the server -> test it!
        urlRoot: 'http://localhost:1337/story',
        default: {
            title: "",
            creatorData: {
                userId: "",
                fbUserId: ""
            }
        }
    });

    return StoryModel;
});