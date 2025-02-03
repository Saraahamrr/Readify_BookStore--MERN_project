const router = require("express").Router();
const User = require("../models/user");
const {authToken} = require("./userAuth");

// add book to favourites
router.put("/add-favourite", authToken, async (req, res) => {
    try {
        const {bookId,id} = req.headers;
        if (!bookId) {
            return res.status(400).json({msg: "BookId is required"});
        };
        if (!id) {
            return res.status(400).json({msg: "UserId is required"});
        };
        const user = await User.findById(id);
        const bookexist = user.favourites.includes(bookId);
        if (bookexist) {
            return res.status(400).json({msg: "Book already in favourites"});
        };
        await User.findByIdAndUpdate(id, {$push: {favourites: bookId}});
        res.status(200).json({msg: "Book added to favourites"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal server error"});
    }
});

module.exports = router;
