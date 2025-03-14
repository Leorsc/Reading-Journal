import { useContext } from 'react';
import BookContext from '../context/BookContext';

function useBooks() {
  return useContext(BookContext);
}

export default useBooks;