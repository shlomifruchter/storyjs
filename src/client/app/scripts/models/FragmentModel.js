/**
 * Created by Shlomi on 30/11/13.
 */
define(function (require) {
    "use strict";

    var BaseModel = require('models/BaseModel');

    var FragmentModel = BaseModel.extend({
        //url: '/fragment', // TODO: on linux we might need to use 'Fragment' to match the url on the server -> test it!
        urlRoot: 'http://localhost:1337/fragment/',
        default: {
            storyId: null,
            content: ""
        }
    });

    return FragmentModel;
});