import Header from './components/Header/header';
import Footer from './components/Footer/Footer';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import Signup from './pages/SignUp/Signup';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import BookDetails from './pages/BookDetails';
import SearchResult from './pages/SearchResult';
import NotFound from './pages/NotFound';
import AddBook from './pages/AddBook';
import { BooksProvider } from './context/books'; 
import BookManagement from './pages/BookManagement/BookManagement';
import UpdateBook from './pages/UpdateBook';

function App() {
  return (
    <BooksProvider> 
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/allbooks' element={<AllBooks />} />
          <Route path="/BookDetails/:id" element={<BookDetails />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add-book' element={<BookManagement />} />
          <Route path='/update-book/:id' element={<UpdateBook />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </BooksProvider>
  );
}

export default App;
