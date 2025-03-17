import { useState } from 'react';
import { NotebookPen, Search, Trash } from 'lucide-react';
import useBooks from '../hooks/useBooks';
import { useNavigate } from 'react-router-dom';
import handleDateFormat from '../functions/formatDate';

export default function BooksList() {
  const { books, deleteBook } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('all');
  const navigate = useNavigate();

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
        return handleDateFormat(book.date).includes(searchTerm);
      case 'all':
      default:
        return [book.title, book.author, book.genre, handleDateFormat(book.date)].some((field) =>
          typeof field === 'string' && field.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
  });

  return (
    <div className="flex flex-col items-end w-full">
      <div className="flex w-full mb-4 gap-4">
        <div className="relative w-2/4">
          <input
            className="w-full p-2 pr-12 border border-solid border-border-input rounded-lg text-input-form outline-none focus:border-label-form"
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
            className="w-full p-2 border border-solid border-border-input rounded-lg text-input-form cursor-pointer outline-none focus:border-label-form"
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
          className="w-1/4 font-bold border border-solid border-border-input text-input-form cursor-pointer py-2 px-4 rounded-lg hover:scale-102"
          onClick={handleRegisterBook}
        >
          Cadastrar
        </button>
      </div>

      <div className="flex flex-col gap-2 justify-between w-full text-center border border-solid border-border-input rounded-2xl p-4">
        <div className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr] gap-2 w-full">
          <span className="font-bold">Título</span>
          <span className="font-bold">Autor(a)</span>
          <span className="font-bold">Gênero</span>
          <span className="font-bold">Data</span>
          <span className="font-bold">Ações</span>
        </div>
        {filteredBooks.length === 0 ? (
          <p className="text-center text-input-form">
            {searchTerm ? 'Nenhum livro encontrado.' : 'Nenhum livro cadastrado.'}
          </p>
        ) : (
          filteredBooks.map((book) => (
            <div
              className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr] gap-2 w-full border-solid border-t-2 border-gray-100 pt-2"
              key={book.id}
            >
              <span>{book.title}</span>
              <span>{book.author}</span>
              <span>{book.genre}</span>
              <span>{handleDateFormat(book.date)}</span>
              <span className="flex items-center justify-center gap-4">
                <NotebookPen
                  className="cursor-pointer hover:scale-110"
                  size={20}
                  onClick={() => handleEditBook(book.id)}
                />
                <Trash
                  className="cursor-pointer hover:scale-110"
                  size={20}
                  onClick={() => deleteBook(book.id)}
                />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}