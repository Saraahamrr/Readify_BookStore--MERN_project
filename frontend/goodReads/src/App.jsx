import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { BooksProvider } from "./context/books";
import { AuthorsProvider } from "./context/authors";
import AddBook from "./pages/AddBook";

const Home = lazy(() => import("./pages/Home"));
const AllBooks = lazy(() => import("./pages/AllBooks"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const AuthorDetails = lazy(() => import("./pages/AuthorDetails"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp/Signup"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BookManagement = lazy(() =>
  import("./pages/BookManagement/BookManagement")
);
const UpdateBook = lazy(() => import("./pages/UpdateBook"));

function App() {
  return (
    <BooksProvider>
      <AuthorsProvider>
        <BrowserRouter>
          <Header />

          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/allbooks" element={<AllBooks />} />
              <Route path="/BookDetails/:id" element={<BookDetails />} />
              <Route path="/AuthorDetails/:id" element={<AuthorDetails />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/update-book/:id" element={<UpdateBook />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
        </BrowserRouter>
      </AuthorsProvider>
    </BooksProvider>
  );
}

export default App;
