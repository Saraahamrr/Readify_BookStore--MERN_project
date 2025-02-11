import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CategoryContext from '../context/category';

export default function Categories() {
    const { categories, loading } = useContext(CategoryContext);

    if (loading) return <div>Loading categories...</div>;

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='title text-start m-5 fw-bold'> Categories </h1>

            <div className="row align-self-start mx-5">
                {categories.length > 0 ? categories.map((category) => (
                    <div key={category._id} className="card mx-2 my-4 p-3 text-center" style={{ width: '200px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
                        <h3>{category.name}</h3>
                        <Link to={`/categories/${category._id}/books`} className="btn btn-warning mt-2">
                            Show Books
                        </Link>
                    </div>
                )) : <div>No categories found</div>}
            </div>
        </div>
    );
}
