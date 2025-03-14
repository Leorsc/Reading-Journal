import { createContext } from 'react';
import useBookProvider from '../hooks/useBookProvider';

const BookContext = createContext({});

export function BookProvider({ children }) {
  const bookProvider = useBookProvider();

  return (
    <BookContext.Provider value={bookProvider}>
      {children}
    </BookContext.Provider>
  );
}

export default BookContext;