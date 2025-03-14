import { useReducer } from 'react';
import { saveBooks, getBooks } from '../utils/bookStorage';

const initialState = {
  books: getBooks(),
};

const ACTIONS = {
  CREATE_BOOK: 'CREATE_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CREATE_BOOK: {
      const newBook = { ...action.payload, id: Date.now() };
      const updatedBooks = [...state.books, newBook];
      saveBooks(updatedBooks);
      return { ...state, books: updatedBooks };
    }
    case ACTIONS.DELETE_BOOK: {
      const filteredBooks = state.books.filter((book) => book.id !== action.payload);
      saveBooks(filteredBooks);
      return { ...state, books: filteredBooks };
    }
    case ACTIONS.UPDATE_BOOK: {
      const updatedBooks = state.books.map((book) =>
        book.id === action.payload.id ? { ...book, ...action.payload.updatedData } : book
      );
      saveBooks(updatedBooks);
      return { ...state, books: updatedBooks };
    }
    default:
      return state;
  }
}

const pages = [
  {
    name: "Página Inicial",
    path: "/"
  },
  {
    name: "Sobre",
    path: "/about"
  },
  {
    name: "Cadastrar",
    path: "/register"
  },
  {
    name: "Livros",
    path: "/books"
  },
]

function useBookProvider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createBook = (bookData) => {
    dispatch({ type: ACTIONS.CREATE_BOOK, payload: bookData });
  };

  const deleteBook = (id) => {
    dispatch({ type: ACTIONS.DELETE_BOOK, payload: id });
  };

  const updateBook = (id, updatedData) => {
    dispatch({ type: ACTIONS.UPDATE_BOOK, payload: { id, updatedData } });
  };

  return {
    books: state.books,
    pages,
    createBook,
    deleteBook,
    updateBook,
  };
}

export default useBookProvider;