const router = require("express").Router();
const User = require("../models/user");
const { authToken } = require("../middleWare/userAuth");
const Book = require("../models/book");
// add book to favourites
router.put("/add-favourite", authToken, async (req, res) => {
     
    try {
        const { bookid } = req.headers;
        const { id } = req.body; 

        console.log("Received bookid:", bookid);
        console.log("Received user id:", id);

        if (!bookid) {
            return res.status(400).json({ msg: "BookId is required" });
        };
        if (!id) {
            return res.status(400).json({ msg: "UserId is required" });
        };
        
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }


        const booksList = await Book.find().distinct("_id");
        const userFavs = [...user.favourites];
         const usernewFavs = userFavs.filter(favId => booksList.map(id => id.toString()).includes(favId.toString()));
        user.favourites = usernewFavs;
        await user.save();


        const bookexist = user.favourites.includes(bookid);
        if (bookexist) {
            return res.status(400).json({ msg: "Book already in favourites" });
        };

        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        res.status(200).json({ msg: "Book added to favourites" });
    } catch (error) {
        console.error("Error in add-favourite:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


// remove book to favourites
router.delete("/remove-favourite", authToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { id } = req.body

        if (!bookid) {
            return res.status(400).json({ msg: "BookId is required" });
        };
        if (!id) {
            return res.status(400).json({ msg: "UserId is required" });
        };
        const user = await User.findById(id);
        const bookexist = user.favourites.includes(bookid);
        if (!bookexist) {
            return res.status(400).json({ msg: "Book is not in favourites" });
        }
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        res.status(200).json({ msg: "removed book from favourites" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

//get all favourites
router.get("/get-favourite", authToken, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ msg: "UserId is required" });
        };
        const user = await User.findById(id).populate("favourites");
        const favourites = user?.favourites;
        if (!favourites) {
            return res.status(400).json({ msg: "No favourite feild exists" });
        }
        if (favourites.length === 0) {
            return res.status(404).json({ msg: "No favourites found" });
        }
        res.status(200).json({ data: favourites });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
module.exports = router;