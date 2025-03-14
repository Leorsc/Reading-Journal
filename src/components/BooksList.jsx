import { NotebookPen, Trash } from 'lucide-react';
import useBooks from '../hooks/useBooks';
import { useNavigate } from 'react-router-dom';
import handleDateFormat from '../functions/formateDate';

export default function BooksList() {
  const { books, deleteBook } = useBooks();
  const navigate = useNavigate();

  function handleRegisterBook() {
    navigate('/register');
  }

  function handleEditBook(id) {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="flex flex-col items-end w-full">
      <div className="flex flex-col gap-2 justify-between w-full text-center border border-solid border-border-input rounded-2xl p-4">
        <div className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr] gap-2 w-full">
          <span className="font-bold">Título</span>
          <span className="font-bold">Autor(a)</span>
          <span className="font-bold">Gênero</span>
          <span className="font-bold">Data</span>
          <span className="font-bold">Ações</span>
        </div>
        {books.length === 0 ? (
          <p className="mt-12 text-center text-input-form">Nenhum livro cadastrado.</p>
        ) : (
          books.map((book) => (
            <div
              className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr] gap-2 w-full border-solid border-t-2 border-border-input pt-1"
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
      <button
        className="w-1/4 mt-4 border border-solid border-border-input text-label-form cursor-pointer py-2 px-4 rounded-lg"
        onClick={handleRegisterBook}
      >
        Cadastrar
      </button>
    </div>
  );
}