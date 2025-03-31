import { useState, useEffect } from 'react';
import api from '../services/api';

function useBookProvider() {
  const [books, setBooks] = useState([]);
  const [notification, setNotification] = useState(null);

  // Buscar todos os livros (GET /books)
  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      setBooks([]);
    }
  };

  // Buscar um livro por ID (GET /books/:id)
  const fetchBook = async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw error;
    }
  };

  // Criar um livro (POST /books)
  const createBook = async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setNotification({ type: 'create', message: 'Livro criado com sucesso!' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      throw error;
    }
  };

  // Atualizar um livro (PUT /books)
  const updateBook = async (id, updatedData) => {
    try {
      const updatedBook = { id: parseInt(id), ...updatedData };
      await api.put('/books', updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? { ...book, ...updatedData } : book))
      );
      setNotification({ type: 'update', message: 'Livro atualizado com sucesso!' });
      setTimeout(() => setNotification(null), 3000); // Desaparece após 3 segundos
    } catch (error) {
      console.error('Erro ao editar livro:', error);
      throw error;
    }
  };

  // Deletar um livro (DELETE /books/:id)
  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setNotification({ type: 'delete', message: 'Livro deletado com sucesso!' });
      setTimeout(() => setNotification(null), 3000); // Desaparece após 3 segundos
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      throw error;
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    fetchBooks,
    fetchBook,
    createBook,
    deleteBook,
    updateBook,
    notification,
  };
}

export default useBookProvider;