import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { BooksProvider } from "./context/books";
import { AuthorsProvider } from "./context/authors";
import AddBook from "./pages/AddBook/AddBook";
import Authors from "./components/Home/Authors";
import Categories from './pages/Categories'
import { FavoritesProvider } from "./context/fav";
import { CategoryProvider } from "./context/category";
import { CartProvider } from "./context/CartContext";
import OTP from "./pages/VerifyOtp/OTP";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import ForgetPass from "./pages/forgetPassword/ForgetPass";
import ResetPass from "./pages/forgetPassword/ResetPass";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import BookManagement from "./components/Profile/BookManagement/BookManagement";
import AllOrders from "./pages/AllOrders";
import PaymentPage from "./pages/checkout/PaymentPage";
import VerifyEmail from "./pages/forgetPassword/Verifyemail";
import PaymentSuccess from "./pages/checkout/PaymentSuccess";
import Subsription from './pages/subscription/Subscription';
import PaymentSuccessSubscribe from './pages/subscription/PaymentSuccessSubscribe';
import CategoryResults from "./pages/CategoryResults";
import UpdateAuthor from "./pages/UpdateAuthor";

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
const ReadBook = lazy(()=>import("./pages/ReadBook"))
const UpdateBook = lazy(() => import("./pages/UpdateBook"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  return (
    <>
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

      <BooksProvider>
        <AuthorsProvider>
          <FavoritesProvider>
            <CartProvider>
              <CategoryProvider>
              <Header />
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/allbooks" element={<AllBooks />} />
                  <Route path="/authors" element={<Authors />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:categoryId/books" element={<CategoryResults />} />

                  <Route path="/BookDetails/:id" element={<BookDetails />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/paymentSuccess" element={<PaymentSuccess />} />
                  <Route
                    path="/subscription"
                    element={<Subsription />}
                  />
                  <Route
                    path="/subscription-success"
                    element={<PaymentSuccessSubscribe />}
                  />                  <Route path="/verifyEmail" element={<VerifyEmail />} />

                  <Route
                    path="/AuthorDetails/:id"
                    element={<AuthorDetails />}
                  />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/read/:id" element={<ReadBook />} />

                  {isLoggedIn && (
                    <Route path="/profile" element={<Profile />}>
                      <Route path="settings" element={<Settings />} />
                      {isLoggedIn && role === "user" ? (
                        <>
                          <Route
                            index
                            path="favourites"
                            element={<Favourites />}
                          />

                          <Route
                            path="orderHistory"
                            element={<UserOrderHistory />}
                          />
                        </>
                      ) : (
                        <>
                          <Route path="allOrders" element={<AllOrders />} />
                          <Route
                          index
                            element={<BookManagement />}
                          />
                          <Route path="/profile/add-book" element={<AddBook />} />
                        </>
                      )}
                    </Route>
                  )}
                  {isLoggedIn && role === "admin" && (
                    <>
                      <Route path="/update-book/:id" element={<UpdateBook />} />
                      <Route path="/update-author/:id" element={<UpdateAuthor/>} />

                    </>
                  )}
                  <Route path="/search" element={<SearchResult />} />
                  <Route path="/otp" element={<OTP />} />
                  <Route path="/forget-pass" element={<ForgetPass />} />
                  <Route path="/reset-pass" element={<ResetPass />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>

              <Footer />
              </CategoryProvider>
            </CartProvider>
          </FavoritesProvider>
        </AuthorsProvider>
      </BooksProvider>
    </>
  );
}

export default App;