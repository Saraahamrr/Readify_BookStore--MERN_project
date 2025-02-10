import React, { useEffect } from "react";
import { useFavorites } from "../../context/fav";
import Card from "../BookCard/Card";

export default function Favs() {
    const { favorites, toggleFavorite } = useFavorites();
    useEffect(() => {}, favorites);
    if (favorites.length === 0) return <div className="text-center mt-4">No favorite books found.</div>;

    

    return (
        <div className="container mt-5">
            <h3 className="title text-start fw-bold">Favorite Books</h3>
            <p className="text-muted">Favorites Count: {favorites.length}</p>

            <div className="row g-5"> 
                {favorites.map((book) => (
                    <div key={book._id} className="col-12 col-sm-6 col-md-4 col-lg-3"> 
                        <Card book={book} toggleFavorite={toggleFavorite} />
                    </div>
                ))}
            </div>
        </div>
    );
}
