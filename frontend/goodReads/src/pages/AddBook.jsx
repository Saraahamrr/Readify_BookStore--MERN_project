import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddBook = () => {
  const [categories,setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        console.log(response.data);
        setCategories(response.data.categories);
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
      publishedDate: new Date().toISOString().split("T")[0], // Current date in ISO 8601 format
      categories: "",
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
          "Authors should be comma-separated",
          (value) => value.split(",").length > 0
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
      categories: Yup.string()
        .required("Categories are required")
        .test(
          "comma-separated",
          "Categories should be comma-separated",
          (value) => value.split(",").length > 0
        ),
      language: Yup.string().required("Language is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number"),
    }),
    onSubmit: async (values) => {
      // Convert authors and categories to arrays
      const authorsArray = values.authors
        .split(",")
        .map((author) => author.trim());
      const categoriesArray = values.categories
        .split(",")
        .map((category) => category.trim());

      const bookData = {
        ...values,
        authors: authorsArray,
        categories: categoriesArray,
      };
      console.log("Submitting book data:", bookData); // Debugging  

      try {
        const response = await axios.post(
          "http://localhost:3000/api/books",
          bookData
        );
        console.log(response) // Debugging
        if (response.status === 201) {
          alert("Book added successfully!");
          formik.resetForm(); // Reset form
        }
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
  });

  return (
    <div>
      <h1 className="text-start m-5">Add New Book</h1>
      <form onSubmit={formik.handleSubmit} className="text-start p-5 mb-5 bg-light">
        <div className="mb-3 w-100">
          <label htmlFor="title" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
          <label htmlFor="authors" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
          <label htmlFor="description" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
          <label htmlFor="coverImage" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
          <label htmlFor="fullContent" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
          <label htmlFor="publisher" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
            <label htmlFor="publishedDate" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
            <label htmlFor="price" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
          <label htmlFor="categories" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
            Categories (comma separated)
          </label>
          <input
            type="text"
            className="form-control"
            id="categories"
            name="categories"
            value={formik.values.categories}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.categories && formik.errors.categories && (
            <div className="form-text text-danger">
              {formik.errors.categories}
            </div>
          )}
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="language" className="form-label fs-5 fw-bolder " style={{color: 'gray'}}>
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
        <button type="submit" className="btn btn-primary fs-4 fw-bold" style={{ backgroundColor: "rgb(16, 127, 187)", width:"7em", height:"2em" ,borderRadius:"0.7em"}}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
