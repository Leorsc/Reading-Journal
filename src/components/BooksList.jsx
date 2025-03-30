import { useEffect, useState } from 'react';
import { BookX, NotebookPen, Search, SearchX, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import handleDateFormat from '../functions/formatDate';
import api from '../services/api';

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;
  const navigate = useNavigate();


  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);

      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  function handleRegisterBook() {
    navigate('/register');
  }

  function handleEditBook(id) {
    navigate(`/edit/${id}`);
  }

  const filteredBooks = books.filter((book) => {
    if (!searchTerm) return true;
    switch (searchCriteria) {
      case 'title':
        return book.title.toLowerCase().includes(searchTerm.toLowerCase());
      case 'author':
        return book.author.toLowerCase().includes(searchTerm.toLowerCase());
      case 'genre':
        return book.genre.toLowerCase().includes(searchTerm.toLowerCase());
      case 'date':
        return handleDateFormat(book.readAt).includes(searchTerm); // Ajustado para readAt
      case 'all':
      default:
        return [book.title, book.author, book.genre, handleDateFormat(book.readAt)].some((field) =>
          typeof field === 'string' && field.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
    if (filteredBooks.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredBooks, totalPages, currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-end w-[1080px] min-h-[530px] relative">
      <div className="flex w-full mb-4 gap-4">
        <div className="relative w-2/4 bg-zinc-100">
          <input
            className="w-full p-2 pr-12 border border-border-input rounded-lg text-input-form outline-none focus:border-label-form"
            type="text"
            placeholder="Buscar por título, autor, gênero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={20}
            color="#667085"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <div className="w-1/4">
          <select
            className="w-full p-2 bg-zinc-100 border border-border-input rounded-lg text-input-form cursor-pointer outline-none focus:border-label-form"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <option value="all">Todos os campos</option>
            <option value="title">Título</option>
            <option value="author">Autor</option>
            <option value="genre">Gênero</option>
            <option value="date">Data</option>
          </select>
        </div>
        <button
          className="w-1/4 font-bold bg-zinc-100 border border-border-input text-input-form cursor-pointer py-2 px-4 rounded-lg hover:scale-102"
          onClick={handleRegisterBook}
        >
          Cadastrar
        </button>
      </div>

      {filteredBooks.length > booksPerPage && (
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`absolute left-[-70px] top-1/2 transform -translate-y-1/2 p-3 rounded-full border border-border-input ${currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-zinc-100 text-gray-700 cursor-pointer hover:bg-gray-200 hover:scale-105 transition-transform'
            }`}
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <div className="relative w-full">
        <div className="flex flex-wrap gap-6 w-full min-h-48">
          {filteredBooks.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full mt-10">
              <div className="flex flex-col items-center gap-3">
                {searchTerm ? (
                  <SearchX size={40} className="text-gray-500" />
                ) : (
                  <BookX size={40} className="text-gray-500" />
                )}
                <p className="text-center text-gray-500 text-4xl">
                  {searchTerm ? 'Nenhum livro encontrado.' : 'Nenhum livro cadastrado.'}
                </p>
              </div>
            </div>
          ) : (
            currentBooks.map((book) => (
              <div
                key={book.id}
                className="relative bg-zinc-100 border border-border-input text-input-form rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 w-[528px]"
              >
                <div className="flex flex-col gap-2 text-left w-4/5 p-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Título:</span>
                    <span className="max-w-[250px] truncate" title={book.title}>{book.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Autor(a):</span>
                    <span>{book.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Gênero:</span>
                    <span>{book.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Lido em:</span>
                    <span>{handleDateFormat(book.readAt)}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <NotebookPen
                    className="cursor-pointer hover:scale-110 text-blue-500"
                    size={20}
                    onClick={() => handleEditBook(book.id)}
                  />
                  <Trash
                    className="cursor-pointer hover:scale-110 text-red-500"
                    size={20}
                    onClick={() => deleteBook(book.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {filteredBooks.length > booksPerPage && (
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`absolute right-[-70px] top-1/2 transform -translate-y-1/2 p-3 rounded-full border border-border-input ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-zinc-100 text-gray-700 cursor-pointer hover:bg-gray-200 hover:scale-105 transition-transform'
            }`}
        >
          <ChevronRight size={32} />
        </button>
      )}

      {filteredBooks.length > booksPerPage && (
        <div className="absolute bottom-0 right-0">
          <span className="text-gray-700 text-sm">
            Página {currentPage} de {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}