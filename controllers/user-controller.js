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
    newUser({body}, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
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
      removeFriend(req,res) {
          User.findOneAndUpdate(
              {_id: params.friendId},
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
    




//get a single user by _id and populated thought and friend data

//post a  new user

// PUT to update a user byu its _id

//DELETE to remove user by it's _id  cascade and remove user's associated thoughts 

//{/api/users/:userId/friends/:friendId}

//POST  a new friend to a user's friend list

//Delete to remove a friend from a user's friend list

