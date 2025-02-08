import React, { useContext } from 'react';
import Card from '../BookCard/Card';
import AuthorsContext from '../../context/authors';

export default function Authors() {
    const { authors, loading } = useContext(AuthorsContext);

    if (loading) return <div>Loading authors...</div>;

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='title text-start m-5 fw-bold'> Authors </h1>

            <div className="row  align-self-start mx-5">
                {authors.length > 0 ? authors.map((author) => (
                    <Card key={author._id} author={author} />  
                )) : <div>No authors found</div>}
            </div>

        </div>
    );
}
