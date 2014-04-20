/**
 * StoryController
 *
 * @module        :: Controller
 * @description    :: Contains logic for handling requests.
 */

module.exports = {

    fragments: function (req, res) {
        // Read parameters from the request
        var storyId = req.param("id");

        // Access database to fetch fragments
        Fragment.find({storyId: storyId}, function(err, fragments) {
            res.send(fragments);
        });

//        User.find()
//            .where({ id: { '>': 100 }})
//            .where({ age: 21 })
//            .limit(100)
//            .sort('name')
//            .exec(function(err, users) {
//                // Do stuff here
//            });
    }
};
