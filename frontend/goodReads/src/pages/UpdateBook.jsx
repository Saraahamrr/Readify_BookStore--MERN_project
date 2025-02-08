import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import BooksContext from "../context/books";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { fetchData } from "./AddBook";

export default function UpdateBook() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [Book, setBook] = useState({
        title: "",
        authors: [],
        description: "",
        coverImage: "",
        fullContent: "",
        publisher: "",
        publishedDate: "",
        categories: [],
        language: "",
        price: 0,
    });
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [authorError, setAuthorError] = useState("");
    const [newAuthor, setNewAuthor] = useState({ name: "" });
    const [showNewAuthorInput, setShowNewAuthorInput] = useState(false);
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [categoryError, setCategoryError] = useState("");


    const { books, setBooks, loading } = useContext(BooksContext);
    const formik = useFormik({
        initialValues: Book || {
            title: "",
            authors: [],
            description: "",
            coverImage: "",
            fullContent: "",
            publisher: "",
            publishedDate: "",
            categories: [],
            language: "",
            price: 0
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Title is required")
                .min(2, "Title must be at least 2 characters"),
            authors: Yup.array().min(1, "At least one author is required"),
            description: Yup.string().required("Description is required"),
            coverImage: Yup.string().required("Cover image is required"),
            fullContent: Yup.string().required("Full content is required"),
            publisher: Yup.string().required("Publisher is required"),
            publishedDate: Yup.string()
                .required("Published date is required")
                .matches(
                    /^\d{4}-\d{2}-\d{2}$/,
                    "Published date must be in the format YYYY-MM-DD"
                ),
            categories: Yup.array().min(1, "At least one category is required"),
            language: Yup.string().required("Language is required"),
            price: Yup.number()
                .required("Price is required")
                .positive("Price must be a positive number"),
        }),
        onSubmit: async (values) => {
            console.log(id)
            const bookData = {
                ...values,
            };
            console.log("Submitting book data:", bookData);


            try {
                axios.defaults.withCredentials = true;
                const response = await axios.patch(
                    `http://localhost:3000/api/books/${id}`,
                    bookData,

                );
                console.log(response);
                if (response.status === 200) {
                    toast.success(response.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                    navigate("/allbooks")
                    formik.resetForm();
                }
            } catch (error) {
                console.error("Error adding book:", error);
                toast.error(error.response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        },
    });

    useEffect(() => {
        let foundBook = books.find((book) => book.id === Number(id));
        if (foundBook) {
            foundBook = {
                ...foundBook,
                publishedDate: foundBook.publishedDate.split('T')[0],
                authors: foundBook.authors.map(author => author._id),
                categories: foundBook.categories.map(cat => cat._id),
            };
            console.log("Transformed Book:", foundBook);
            setBook(foundBook);
            fetchData(setCategories, setAuthors);
        }
    }, [books, id]);


    if (loading) return <Loader />;

    const handleChange = (e) => {
        setBook((prevBook) => ({
            ...prevBook,
            [e.target.name]: e.target.value
        }));
    };


    const handleCategoryChange = (categoryId) => {
        if (formik.values.categories.includes(categoryId)) {
            formik.setFieldValue(
                "categories",
                formik.values.categories.filter((id) => id !== categoryId)
            );
        } else {
            formik.setFieldValue("categories", [
                ...formik.values.categories,
                categoryId,
            ]);
        }
    };

    const handleAuthorChange = (authorId) => {
        if (formik.values.authors.includes(authorId)) {
            formik.setFieldValue(
                "authors",
                formik.values.authors.filter((id) => id !== authorId)
            );
        } else {
            formik.setFieldValue("authors", [...formik.values.authors, authorId]);
        }
    };

    const handleNewCategorySubmit = async () => {
        if (!newCategory.trim()) {
            setCategoryError("Category name is required");
            return;
        } else {
            setCategoryError("");
        }
        try {
            const response = await axios.post(
                "http://localhost:3000/api/categories",
                { name: newCategory }
            );
            if (response.status === 201) {
                setCategories([...categories, response.data.category]);
                console.log(response.data);
                const categoryId = response.data.category["_id"];
                toast.success(response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                formik.setFieldValue("categories", [
                    ...formik.values.categories,
                    categoryId,
                ]);
                setNewCategory("");
                setShowNewCategoryInput(false);
            }
        } catch (error) {
            console.error("Error adding new category:", error);
            toast.error(error.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };
    const handleNewAuthorSubmit = async () => {
        if (!newAuthor.name.trim()) {
            setAuthorError("Author name is required");
            return;
        } else {
            setAuthorError("");
        }

        try {
            console.log(newAuthor);

            const response = await axios.post(
                "http://localhost:3000/api/authors",
                newAuthor
            );
            if (response.status === 201) {
                setAuthors((prevAuthors) => [...prevAuthors, response.data.author]);
                formik.setFieldValue("authors", [
                    ...formik.values.authors,
                    response.data.author._id,
                ]);
                toast.success(response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setNewAuthor({
                    name: "",
                    image: "",
                    dateOfBirth: "",
                    gender: "",
                    bio: "",
                });
                setShowNewAuthorInput(false);
            }
        } catch (error) {
            console.error("Error adding new author:", error);
            toast.error(error.response.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                      });
        }
    };



    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-start m-5 fw-bold">Update {Book ? Book.title : "Book"}</h1>
            <form
                onSubmit={formik.handleSubmit}
                className="text-start p-5 mb-5 mx-5 bg-light d-flex flex-column w-75"
            >
                <div className="mb-3 w-100">
                    <label
                        htmlFor="title"
                        className="form-label fs-5 fw-bolder "
                        style={{ color: "gray" }}
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="form-text text-danger">{formik.errors.title}</div>
                    )}
                </div>
                <div className="mb-3 w-100 d-flex gap-4 align-items-start">
                    <div className="mb-3 w-100">
                        <label
                            className="form-label fs-5 fw-bolder"
                            style={{ color: "gray" }}
                        >
                            Authors
                        </label>
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                style={{ backgroundColor: "#fbb02d", color: "white" }}
                            >
                                Choose Authors
                            </button>
                            <ul className="dropdown-menu">
                                {authors.length > 0 ? (
                                    authors.map((author) => (
                                        <li key={author._id} className="dropdown-item">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={formik.values.authors.includes(author._id)}
                                                    onChange={() => handleAuthorChange(author._id)}
                                                />
                                                <label className="form-check-label">
                                                    {author.name}
                                                </label>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="dropdown-item">No authors available</li>
                                )}
                                <li>
                                    <a
                                        className="dropdown-item text-primary"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowNewAuthorInput(true);
                                        }}
                                    >
                                        + Add New Author
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {showNewAuthorInput && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter new author's name"
                                    value={newAuthor.name}
                                    onChange={(e) =>
                                        setNewAuthor({ ...newAuthor, name: e.target.value })
                                    }
                                />
                                {authorError && <div className="text-danger">{authorError}</div>}
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    placeholder="Enter new author's image"
                                    onChange={(e) =>
                                        setNewAuthor({ ...newAuthor, image: e.target.value })
                                    }
                                />
                                <div className="my-3 w-100 d-flex gap-4 align-items-start justify-content-between align-items-center">
                                    <div className="w-100 mb-2 d-flex gap-4 align-items-center " style={{ minWidth: "8rem" }}>
                                        <label
                                            htmlFor="dateOfBirth"
                                            className="f fs-5 fw-bolder "
                                            style={{ color: "gray" }}
                                        >
                                            dateOfBirth
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            onChange={(e) =>
                                                setNewAuthor({
                                                    ...newAuthor,
                                                    dateOfBirth: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="dropdown">
                                        <select
                                            className="form-control my-2"
                                            onChange={(e) =>
                                                e.target.value &&
                                                setNewAuthor({ ...newAuthor, gender: e.target.value })
                                            }
                                            style={{ backgroundColor: "gray", color: "white" }}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <textarea
                                    className="form-control my-2"
                                    placeholder="Enter author's bio"
                                    onChange={(e) =>
                                        setNewAuthor({ ...newAuthor, bio: e.target.value })
                                    }
                                />
                                <button
                                    type="button"
                                    className="btn mt-2"
                                    onClick={handleNewAuthorSubmit}
                                    style={{ backgroundColor: "#fbb02d", color: "white" }}
                                >
                                    Add Author
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary mt-2 ms-2"
                                    onClick={() => setShowNewAuthorInput(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        {formik.touched.authors && formik.errors.authors && (
                            <div className="form-text text-danger">
                                {formik.errors.authors}
                            </div>
                        )}
                    </div>
                    <div className="mb-3 w-100">
                        <label
                            className="form-label fs-5 fw-bolder"
                            style={{ color: "gray" }}
                        >
                            Categories
                        </label>
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                style={{ backgroundColor: "#fbb02d", color: "white" }}
                            >
                                Choose Categories
                            </button>
                            <ul className="dropdown-menu">
                                {categories.length > 0 ? (
                                    categories.map((category) => {
                                        return (
                                            <li key={category._id} className="dropdown-item">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={formik.values.categories.includes(
                                                            category._id
                                                        )}
                                                        onChange={() => handleCategoryChange(category._id)}
                                                    />
                                                    <label className="form-check-label">
                                                        {category.name}
                                                    </label>
                                                </div>
                                            </li>

                                        )
                                    })
                                ) : (
                                    <li className="dropdown-item">No categories available</li>
                                )}
                                <li>
                                    <a
                                        className="dropdown-item text-primary"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowNewCategoryInput(true);
                                        }}
                                    >
                                        + Add New Category
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {showNewCategoryInput && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter new category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                {categoryError && <div className="text-danger">{categoryError}</div>}
                                <button
                                    type="button"
                                    className="btn mt-2"
                                    onClick={handleNewCategorySubmit}
                                    style={{ backgroundColor: "#fbb02d" }}
                                >
                                    Add Category
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary mt-2 ms-2"
                                    onClick={() => setShowNewCategoryInput(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        {formik.touched.categories && formik.errors.categories && (
                            <div className="form-text text-danger">
                                {formik.errors.categories}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-3 w-100">
                    <label
                        htmlFor="description"
                        className="form-label fs-5 fw-bolder "
                        style={{ color: "gray" }}
                    >
                        Description
                    </label>
                    <div className="ms-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    {formik.touched.description && formik.errors.description && (
                        <div className="form-text text-danger">
                            {formik.errors.description}
                        </div>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label
                        htmlFor="coverImage"
                        className="form-label fs-5 fw-bolder "
                        style={{ color: "gray" }}
                    >
                        Cover Image
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="coverImage"
                        name="coverImage"
                        value={formik.values.coverImage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.coverImage && formik.errors.coverImage && (
                        <div className="form-text text-danger">
                            {formik.errors.coverImage}
                        </div>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label
                        htmlFor="fullContent"
                        className="form-label fs-5 fw-bolder "
                        style={{ color: "gray" }}
                    >
                        Full Content
                    </label>
                    <input
                        className="form-control"
                        id="fullContent"
                        name="fullContent"
                        value={formik.values.fullContent}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="url"
                    />
                    {formik.values.fullContent && (
                        <div className="mt-2">
                            <a
                                href={formik.values.fullContent}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary"
                                style={{ wordBreak: "break-word" }}
                            >
                                {formik.values.fullContent}
                            </a>
                        </div>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label
                        htmlFor="publisher"
                        className="form-label fs-5 fw-bolder "
                        style={{ color: "gray" }}
                    >
                        Publisher
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="publisher"
                        name="publisher"
                        value={formik.values.publisher}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.publisher && formik.errors.publisher && (
                        <div className="form-text text-danger">
                            {formik.errors.publisher}
                        </div>
                    )}
                </div>
                <div className="mb-3 w-100 d-flex gap-4 align-items-start">
                    <div className="w-50">
                        <label
                            htmlFor="publishedDate"
                            className="form-label fs-5 fw-bolder "
                            style={{ color: "gray" }}
                        >
                            Published Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="publishedDate"
                            name="publishedDate"
                            value={formik.values.publishedDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.publishedDate && formik.errors.publishedDate && (
                            <div className="form-text text-danger">
                                {formik.errors.publishedDate}
                            </div>
                        )}
                    </div>
                    <div className="w-50">
                        <label
                            htmlFor="price"
                            className="form-label fs-5 fw-bolder "
                            style={{ color: "gray" }}
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.price && formik.errors.price && (
                            <div className="form-text text-danger">{formik.errors.price}</div>
                        )}
                    </div>
                </div>

                <div className="mb-3 w-100">
                    <label
                        htmlFor="language"
                        className="form-label fs-5 fw-bolder "
                        style={{ color: "gray" }}
                    >
                        Language
                    </label>
                    <input
                        type="text"
                        className="form-control "
                        id="language"
                        name="language"
                        value={formik.values.language}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.language && formik.errors.language && (
                        <div className="form-text text-danger">
                            {formik.errors.language}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary fs-4 fw-bold align-self-center"
                    style={{
                        backgroundColor: "#fbb02d",
                        width: "7em",
                        height: "2em",
                        borderRadius: "0.7em",
                        border: "0"
                    }}
                >
                    Update
                </button>
            </form>
        </div>
    );

}
