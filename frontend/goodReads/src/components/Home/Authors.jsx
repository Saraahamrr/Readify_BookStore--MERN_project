import React, { useContext } from 'react';
import Card from '../BookCard/Card';
import AuthorsContext from '../../context/authors';

export default function Authors() {
    const { authors, loading } = useContext(AuthorsContext);

    if (loading) return <div>Loading authors...</div>;

    return (
        <div>
            <h4 className='title' style={{ marginTop: "20px", fontSize: "40px" }}> Authors </h4>

            <div className="row">
                {authors.length > 0 ? authors.map((author) => (
                    <Card key={author._id} author={author} />  
                )) : <div>No authors found</div>}
            </div>

        </div>
    );
}
