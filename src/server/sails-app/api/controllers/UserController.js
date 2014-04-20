/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  facebook: function (req, res) {
      // Read parameters from the request
      var fbuid = req.param("id");

      // Get user by facebook id
      User.findOne({fbuid: fbuid}, function(err, user) {
          res.send(user);
      });
  }

};
