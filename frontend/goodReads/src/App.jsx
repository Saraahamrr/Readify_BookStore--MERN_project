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
import { BooksProvider } from './context/books'; // Import BooksProvider
import BookManagement from './pages/BookManagement/BookManagement';

function App() {
  return (
    <BooksProvider> 
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/allbooks' element={<AllBooks />} />
          <Route path="/BookDetails" element={<BookDetails />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add-book' element={<BookManagement />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </BooksProvider>
  );
}

export default App;
