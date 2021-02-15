const router = require('express').Router();
const {
    getAllUsers,
    newUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');
//get all users
//post a  new user
router
    .route('/')//localhost:3001/api/users/
    .get(getAllUsers)
    .post(newUser)
    router
    .route('/:id')
    //get a single user by _id and populated thought and friend data
    .get(getUserById)
    // PUT to update a user byu its _id
    .put(updateUser)
    //DELETE to remove user by it's _id  cascade and remove user's associated thoughts 
    .delete(deleteUser)
//{/api/users/:userId/friends/:friendId}
router
.route('/:userId/friends/:friendId')
//POST  a new friend to a user's friend list
.post(addFriend)
//Delete to remove a friend from a user's friend list
    .delete(removeFriend)

module.exports = router;