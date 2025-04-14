import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookForm from '../components/BookForm';

// Mock do useBooks
const mockCreateBook = jest.fn().mockResolvedValue(); // Simula uma Promise resolvida
jest.mock('../hooks/useBooks', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    createBook: mockCreateBook,
  })),
}));

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BookForm Component', () => {
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <BookForm />
      </MemoryRouter>
    );

    return { mockCreateBook, mockNavigate };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateBook.mockClear();
    mockNavigate.mockClear();
  });

  it('renders the form correctly', () => {
    renderComponent();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
  });

  it('allows filling and submitting the form to add a new book', async () => {
    const { mockCreateBook } = renderComponent();

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText(/gênero/i), { target: { value: 'Fiction' } });
    fireEvent.change(screen.getByLabelText(/data/i), { target: { value: '2023-06-01' } });

    // Submete o formulário
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    // Verifica se o createBook foi chamado com os valores corretos
    await waitFor(() => {
      expect(mockCreateBook).toHaveBeenCalledWith({
        title: 'New Book',
        author: 'New Author',
        genre: 'Fiction',
        readAt: '2023-06-01',
      });
    });
  });

  it('navigates to the book list after successful submission', async () => {
    const { mockNavigate } = renderComponent();

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText(/gênero/i), { target: { value: 'Fiction' } });
    fireEvent.change(screen.getByLabelText(/data/i), { target: { value: '2023-06-01' } });

    // Submete o formulário
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    // Verifica se a navegação ocorreu
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/books');
    });
  });
});