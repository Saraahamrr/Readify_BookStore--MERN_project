import React from "react";
import { useFavorites } from "../../context/fav";
import Card from "../BookCard/Card";

export default function Favs() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) return <div className="text-center mt-4">No favorite books found.</div>;

    return (
        <div className='d-flex flex-column align-items-center'>
            <h3 className='title text-start m-5 fw-bold'>Favorite Books</h3>

            <div className="row align-self-start mx-5">
                {favorites.map((book) => (
                    <Card key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
}
