import { Route, Routes } from 'react-router-dom';
import { BookProvider } from './context/BookContext.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import Books from './pages/Books.jsx';
import EditBook from './pages/EditBook.jsx';


export default function App() {

  return (
    <BookProvider>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/about' element={<About />} />
        <Route path="/edit/:id" element={<EditBook />} />

        <Route path='*' element={<NotFound />} />
      </Routes >
    </BookProvider>
  );
}