import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BooksList from '../components/BooksList';

// Mock do useBooks
jest.mock('../hooks/useBooks', () => {
  return jest.fn(() => ({
    books: [
      { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', readAt: '2023-01-01' },
      { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', readAt: '2023-02-01' },
    ],
    deleteBook: jest.fn(),
    fetchBooks: jest.fn(),
    notification: null,
  }));
});

describe('BooksList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of books', () => {
    render(
      <MemoryRouter>
        <BooksList />
      </MemoryRouter>
    );

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
  });
});