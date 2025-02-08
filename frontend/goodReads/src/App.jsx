import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { BooksProvider } from "./context/books";
import { AuthorsProvider } from "./context/authors";
import AddBook from "./pages/AddBook";
import { CartProvider } from './context/CartContext'; 
import Checkout from './pages/checkout/Checkout';
import Success from "./pages/checkout/Success";
import Cancel from "./pages/checkout/Cancel";
import Authors from "./components/Home/Authors";
import OTP from "./pages/VerifyOtp/OTP";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import ForgetPass from "./pages/forgetPassword/ForgetPass";
import ResetPass from "./pages/forgetPassword/ResetPass";

const Home = lazy(() => import("./pages/Home"));
const AllBooks = lazy(() => import("./pages/AllBooks"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const AuthorDetails = lazy(() => import("./pages/AuthorDetails"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp/Signup"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BookManagement = lazy(() =>
  import("./pages/BookManagement/BookManagement")
);
const UpdateBook = lazy(() => import("./pages/UpdateBook"));

function App() {
  return (
<CartProvider>
    <BooksProvider>
      <AuthorsProvider>
        <BrowserRouter>
          <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
          <Header />
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/allbooks" element={<AllBooks />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/BookDetails/:id" element={<BookDetails />} />
              <Route path="/AuthorDetails/:id" element={<AuthorDetails />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/book-management" element={<BookManagement />} />
              <Route path="/update-book/:id" element={<UpdateBook />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="/success" element={<Success/>} />
              <Route path="/cancel" element={<Cancel/>} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/forget-pass" element={<ForgetPass />} />
              <Route path="/reset-pass" element={<ResetPass />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
        </BrowserRouter>
      </AuthorsProvider>
    </BooksProvider>
</CartProvider>
  );
}

export default App;
