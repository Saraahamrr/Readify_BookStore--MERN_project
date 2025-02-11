import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import AuthorsContext from "../context/authors";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { use } from "react";

export default function UpdateAuthor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {fetchAuthors } = useContext(AuthorsContext);

    const [author, setAuthor] = useState({
        name: "",
        image: "",
        dateOfBirth: "",
        gender: "",
        bio: "",
    });

    const { authors, setAuthors, loading } = useContext(AuthorsContext);

    const formik = useFormik({
        initialValues: {
            name: author?.name || "",
            image: author?.image || "",
            dateOfBirth: author?.dateOfBirth || "",
            gender: author?.gender || "",
            bio: author?.bio || "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(2, "Name must be at least 2 characters"),
            image: Yup.string(),
            dateOfBirth: Yup.string().matches(
                /^\d{4}-\d{2}-\d{2}$/,
                "Published date must be in the format YYYY-MM-DD"
            ),
            gender: Yup.string(),
            bio: Yup.string()
        }),
        onSubmit: async (values) => {
            try {
                console.log("Submitting values:", values);
                axios.defaults.withCredentials = true;
                const response = await axios.patch(
                    `https://readify.railway.internal/api/authors/${id}`,
                    values
                );
                
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
                    fetchAuthors()
                    navigate("/authors");
                    formik.resetForm();
                }
            } catch (error) {
                console.error("Error updating author:", error);
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
        const foundAuthor = authors.find((author) => author._id === id);
        if (foundAuthor) {
            setAuthor(foundAuthor);
            formik.setValues(foundAuthor);
        }
    }, [authors, id]);

    if (loading) return <Loader />;

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-start m-5 fw-bold">Update {author ? author.name : "Author"}</h1>
            <form
                onSubmit={formik.handleSubmit}
                className="text-start p-5 mb-5 mx-5 bg-light d-flex flex-column w-75"
            >
                <div className="mb-3 w-100">
                    <label htmlFor="name" className="form-label fs-5 fw-bolder" style={{ color: "gray" }}>
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="form-text text-danger">{formik.errors.name}</div>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="image" className="form-label fs-5 fw-bolder" style={{ color: "gray" }}>
                        Image URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.image && formik.errors.image && (
                        <div className="form-text text-danger">{formik.errors.image}</div>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="dateOfBirth" className="form-label fs-5 fw-bolder" style={{ color: "gray" }}>
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                        <div className="form-text text-danger">{formik.errors.dateOfBirth}</div>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="gender" className="form-label fs-5 fw-bolder" style={{ color: "gray" }}>
                        Gender
                    </label>
                    <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                        <div className="form-text text-danger">{formik.errors.gender}</div>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="bio" className="form-label fs-5 fw-bolder" style={{ color: "gray" }}>
                        Bio
                    </label>
                    <textarea
                        className="form-control"
                        id="bio"
                        name="bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.bio && formik.errors.bio && (
                        <div className="form-text text-danger">{formik.errors.bio}</div>
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