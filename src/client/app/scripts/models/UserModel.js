/**
 * Created with JetBrains PhpStorm.
 * User: Shlomi
 * Date: 14/10/13
 * Time: 16:53
 * To change this template use File | Settings | File Templates.
 */
define(function (require) {
    "use strict";

    var BaseModel = require('models/BaseModel');

    var UserModel = BaseModel.extend({
        urlRoot: 'http://localhost:1337/user',

        default: {
            "username": "",
            "firstName": "",
            "lastName": "",
            "name": "",
            "email": "",
            "locale": "en-us"
        },

        initialize: function(options) {
        }
    });

    return UserModel;
});