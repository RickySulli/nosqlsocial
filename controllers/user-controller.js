const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req,res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: "-__v"
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
        },
        //get a single user by _id and populated thought and friend data
        getUserById({params}, res) {
        User.findOne({ _id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then((dbUserData) => {
            if(!dbUserData){
                res.status(404).json({message: 'NO USER WITH THAT ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //post a  new user
    newUser({body}, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
    // PUT to update a user byu its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({message: "NO USER WITH THIS ID!!!",});
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
      //DELETE to remove user by it's _id  cascade and remove user's associated thoughts 
      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "NO USER WITH THIS ID!!!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
      //POST  a new friend to a user's friend list
      addFriend({params}, res) {
          User.findOneAndUpdate(
              {_id: params.userId},
              {$push: {friends: params.friendId}},
              {new: true}
          )
            .then((dbUserData) => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No USER WITH THIS ID!!!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
      },
      
//Delete to remove a friend from a user's friend list
      removeFriend(req,res) {
          User.findOneAndUpdate(
              {_id: req.params.userId},
              {$pull: {friends: req.params.friendId}},
              {new: true}
          )
            .then((dbUserData) => {
                if(!dbUserData){
                    res.status(404).json({message: 'NO USER WITH THIS ID!!!'});
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
      }
};

module.exports = userController;














