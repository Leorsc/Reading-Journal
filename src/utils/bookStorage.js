export const saveBooks = (books) => {
  sessionStorage.setItem('booksList', JSON.stringify(books));
};

export const getBooks = () => {
  const books = sessionStorage.getItem('booksList');
  return books ? JSON.parse(books) : [];
};