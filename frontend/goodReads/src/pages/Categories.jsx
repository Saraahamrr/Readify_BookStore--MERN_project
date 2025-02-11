import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CategoryContext from '../context/category';

export default function Categories() {
    const { categories, loading } = useContext(CategoryContext);

    if (loading) return <div>Loading categories...</div>;

    return (
        <div className='container text-center'>
            <h1 className='title text-start my-5 fw-bold'> Categories </h1>

            <div className="d-flex flex-wrap justify-content-center gap-3">
                {categories.length > 0 ? categories.map((category) => (
                    <div key={category._id} 
                         className="d-flex align-items-center px-4 py-2 rounded-pill bg-light shadow-sm"
                         style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        <span className="me-3">{category.name}</span>
                        <Link to={`/categories/${category._id}/books`} 
                              className="btn btn-sm btn-warning">
                            Show Books
                        </Link>
                    </div>
                )) : <div>No categories found</div>}
            </div>
        </div>
    );
}
