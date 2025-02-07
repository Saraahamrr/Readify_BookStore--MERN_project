import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddBook = () => {
  const [categories, setCategories] = useState([]);
  const [showNewCategoryInput,setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCat = await axios.get("http://localhost:3000/api/categories");
        console.log(responseCat.data);
        setCategories(responseCat.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      authors: "",
      description: "",
      coverImage: "",
      fullContent: "",
      publisher: "",
      publishedDate: new Date().toISOString().split("T")[0], // ISO 8601 
      categories: [],
      language: "",
      price: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(2, "Title must be at least 2 characters"),
        authors: Yup.string()
        .required("Authors are required")
        .test(
          "comma-separated",
          "Each author name must be non-empty",
          (value) => value.split(",").map(a => a.trim()).filter(a => a).length > 0
        ),
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
      const authorsArray = values.authors
        .split(",")
        .map((author) => author.trim());
      const bookData = {
        ...values,
        authors: authorsArray,
      };
      console.log("Submitting book data:", bookData);   

      try {
        const response = await axios.post(
          "http://localhost:3000/api/books",
          bookData,
          {headers: { "auth-token": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjp7Im5hbWUiOiJtZW5uYSIsImVtYWlsIjoiZW1haWxtYWVubmFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTczODc4NjA2MiwiZXhwIjoxNzQxMzc4MDYyfQ.GIZD47utk9sEgH4eHEOBWzW1LX2131yW3UYgQz4jIdE`, id:"67a0ff2e2bd5b05cb1cc4f07" }}
        );
        console.log(response);
        if (response.status === 201) {
          alert("Book added successfully!");
          formik.resetForm(); // Reset form
        }
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
  });

  const handleCategoryChange = (categoryId) => {
    if (formik.values.categories.includes(categoryId)) {
      formik.setFieldValue(
        "categories",
        formik.values.categories.filter((id) => id !== categoryId)
      );
    } else {
      formik.setFieldValue("categories", [...formik.values.categories, categoryId]);
    }
  };

  const handleNewCategorySubmit = async () => {
    if (!newCategory.trim()) return;
    try {
      const response = await axios.post("http://localhost:3000/api/categories", { name: newCategory });
      setCategories([...categories, response.data.category]);
      formik.setFieldValue("categories", [...formik.values.categories, response.data.category._id]);
      setNewCategory("");
      setShowNewCategoryInput(false);
    } catch (error) {
      console.error("Error adding new category:", error);
    }
  };

  return (
    <div>
      <h1 className="text-start m-5">Add New Book</h1>
      <form onSubmit={formik.handleSubmit} className="text-start p-5 mb-5 mx-5 bg-light">
        <div className="mb-3 w-100">
          <label htmlFor="title" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
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
        <div className="mb-3 w-100">
          <label htmlFor="authors" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
            Authors (comma separated)
          </label>
          <input
            type="text"
            className="form-control"
            id="authors"
            name="authors"
            value={formik.values.authors}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.authors && formik.errors.authors && (
            <div className="form-text text-danger">{formik.errors.authors}</div>
          )}
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="description" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
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
          <label htmlFor="coverImage" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
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
          <label htmlFor="fullContent" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
            Full Content
          </label>
          <input
            className="form-control"
            id="fullContent"
            name="fullContent"
            value={formik.values.fullContent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullContent && formik.errors.fullContent && (
            <div className="form-text text-danger">
              {formik.errors.fullContent}
            </div>
          )}
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="publisher" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
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
            <label htmlFor="publishedDate" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
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
            <label htmlFor="price" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
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
        <label className="form-label fs-5 fw-bolder" style={{ color: 'gray' }}>Categories</label>
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Choose Categories
            </button>
            <ul className="dropdown-menu">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category._id} className="dropdown-item">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formik.values.categories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                      />
                      <label className="form-check-label">{category.name}</label>
                    </div>
                  </li>
                ))
              ) : (
                <li className="dropdown-item">No categories available</li>
              )}
              <li>
                <a className="dropdown-item text-primary" href="#" onClick={(e) => { e.preventDefault(); setShowNewCategoryInput(true); }}>
                  + Add New Category
                </a>
              </li>
            </ul>
          </div>
          {showNewCategoryInput && (
            <div className="mt-2">
              <input type="text" className="form-control" placeholder="Enter new category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
              <button type="button" className="btn btn-success mt-2" onClick={handleNewCategorySubmit}>Add Category</button>
              <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => setShowNewCategoryInput(false)}>Cancel</button>
            </div>
          )}
          {formik.touched.categories && formik.errors.categories && (
            <div className="form-text text-danger">{formik.errors.categories}</div>
          )}
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="language" className="form-label fs-5 fw-bolder " style={{ color: 'gray' }}>
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
        <button type="submit" className="btn btn-primary fs-4 fw-bold" style={{ backgroundColor: "rgb(16, 127, 187)", width: "7em", height: "2em", borderRadius: "0.7em" }}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
