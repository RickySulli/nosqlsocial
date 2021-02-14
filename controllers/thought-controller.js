const { Thought, User } = require('../models')

//(/api/thoughts)
//GET all thoughts
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    // GET a single thought by it's _id
    getThoughtById(req, res) {
        Thought.findOne({_id: URLSearchParams.thoughtId})
            .then((dbThoughtData) =>{
                if(!dbThoughtData) {
                    res.status(404).json({message: "No thought with this ID!!!"});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch((err) {
                console.log(err);
                res.sendStatus(400)
            });
    },

}

//POST to create a new thought (don't forget to push the created thought's _id to the associated user's [thoughts] array field)

//PUT to update a thought by it's _id

//DELETE to remove a thought by its _id


//(/api/thoughts/:thoughtId/reactions)


//POST to create a reaction stored in a single thought's [reactions] array field

//DELETE  to pull and remove a reaction by the reaction's reactionId value

module.exports = thoughtController;