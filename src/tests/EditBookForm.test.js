import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditBookForm from '../components/EditBookForm';

// Mock do useBooks
const mockFetchBook = jest.fn();
const mockUpdateBook = jest.fn().mockResolvedValue();
jest.mock('../hooks/useBooks', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    fetchBook: mockFetchBook,
    updateBook: mockUpdateBook,
  })),
}));

// Mock do useNavigate e useParams
const mockNavigate = jest.fn();
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => {
  // Importa o módulo original para obter os componentes reais
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule, // Inclui todos os exports originais (como MemoryRouter)
    useNavigate: () => mockNavigate,
    useParams: mockUseParams, // Mock dinâmico para useParams
  };
});

describe('EditBookForm Component', () => {
  const mockBook = {
    id: 1,
    title: 'Original Book',
    author: 'Original Author',
    genre: 'Fiction',
    readAt: '2023-01-01',
  };

  const renderComponent = () => {
    // Define o retorno do useParams para o teste
    mockUseParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <EditBookForm id="1" />
      </MemoryRouter>
    );

    return { mockFetchBook, mockUpdateBook, mockNavigate };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchBook.mockClear();
    mockUpdateBook.mockClear();
    mockNavigate.mockClear();
    mockUseParams.mockClear();
  });

  it('renders the form with the book data pre-filled', async () => {
    mockFetchBook.mockResolvedValue(mockBook);

    renderComponent();

    // Espera o livro ser carregado e o formulário preenchido
    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toHaveValue('Original Book');
      expect(screen.getByLabelText(/autor/i)).toHaveValue('Original Author');
      expect(screen.getByLabelText(/gênero/i)).toHaveValue('Fiction');
      expect(screen.getByLabelText(/lido em/i)).toHaveValue('2023-01-01');
      expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    });
  });

  it('allows editing and submitting the form to update the book', async () => {
    mockFetchBook.mockResolvedValue(mockBook);

    const { mockUpdateBook } = renderComponent();

    // Espera o formulário ser preenchido com os dados do livro
    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toHaveValue('Original Book');
    });

    // Edita os campos do formulário
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Updated Book' } });
    fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'Updated Author' } });
    fireEvent.change(screen.getByLabelText(/gênero/i), { target: { value: 'Non-Fiction' } });
    fireEvent.change(screen.getByLabelText(/lido em/i), { target: { value: '2023-02-01' } });

    // Submete o formulário
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    // Verifica se o updateBook foi chamado com os valores atualizados
    await waitFor(() => {
      expect(mockUpdateBook).toHaveBeenCalledWith('1', {
        title: 'Updated Book',
        author: 'Updated Author',
        genre: 'Non-Fiction',
        readAt: '2023-02-01',
      });
    });
  });

  it('navigates to the book list after successful submission', async () => {
    mockFetchBook.mockResolvedValue(mockBook);

    const { mockNavigate } = renderComponent();

    // Espera o formulário ser preenchido com os dados do livro
    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toHaveValue('Original Book');
    });

    // Edita os campos do formulário
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Updated Book' } });
    fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'Updated Author' } });
    fireEvent.change(screen.getByLabelText(/gênero/i), { target: { value: 'Non-Fiction' } });
    fireEvent.change(screen.getByLabelText(/lido em/i), { target: { value: '2023-02-01' } });

    // Submete o formulário
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    // Verifica se a navegação ocorreu
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/books');
    });
  });

  it('navigates to the book list if the book is not found', async () => {
    mockFetchBook.mockRejectedValue(new Error('Livro não encontrado'));

    const { mockNavigate } = renderComponent();

    // Verifica se a navegação ocorreu devido ao erro
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/books');
    });
  });
});