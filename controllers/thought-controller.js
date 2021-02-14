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
        //POST to create a new thought (don't forget to push the created thought's _id to the associated user's [thoughts] array field)
        newThought({body} , res) {
            Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                    );
                })
                .then((dbUserData) => {
                    if (!dbUserData) {
                        res.status(404).json({ message: "No user found with this id!" });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch((err) => res.json(err));
            },
            //PUT to update a thought by it's _id
     updateThought({params, body}, res) {
         Thought.findOneAndUpdate(
             {_id: params.thoughtId},
             {$set: body},
             {new: true, runValidators:true}
         )
         .then((thoughtData) => {
             if(!thoughtData) {
                return res.status(404).json({message: "No thought has this ID!!!"})
             }
             return res.json({message: "Thought Updated!!"})
         })
         .catch((err) => res.json(err));
     },
     //DELETE to remove a thought by its _id
     deleteThought({params}, res) {
         Thought.findOneAndDelete({_id:params.thoughtId})
         .then((thoughtData) => {
            if(!thoughtData) {
               return res.status(404).json({message: "No thought has this ID!!!"})
            }
            return res.json({message: "Thought Deleted!!"})
        })
        .catch((err) => res.json(err));
     },
     //(/api/thoughts/:thoughtId/reactions)
     //POST to create a reaction stored in a single thought's [reactions] array field
     newReaction({ params, body }, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.Id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },   
//DELETE  to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.Id},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new:true, runValidators:true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = thoughtController;