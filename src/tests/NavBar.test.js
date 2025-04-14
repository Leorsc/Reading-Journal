import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';

// Mock da imagem do logo
jest.mock('../assets/logo-reading-journal.png', () => 'mocked-logo.png');

// Mock do useLocation para controlar o pathname
const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantém outros exports reais, como NavLink
  useLocation: () => mockUseLocation(),
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all navigation links correctly', () => {
    // Mock do useLocation para simular estar em qualquer página
    mockUseLocation.mockReturnValue({ pathname: '/books' });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verifica se os links "Sobre", "Cadastrar" e "Livros" estão presentes
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
    expect(screen.getByText('Livros')).toBeInTheDocument();

    // Verifica se os links têm os atributos corretos
    expect(screen.getByText('Sobre')).toHaveAttribute('href', '/about');
    expect(screen.getByText('Cadastrar')).toHaveAttribute('href', '/register');
    expect(screen.getByText('Livros')).toHaveAttribute('href', '/books');
  });

  it('applies active styles to the current page link', () => {
    // Mock do useLocation para simular estar na página "/about"
    mockUseLocation.mockReturnValue({ pathname: '/about' });

    render(
      <MemoryRouter initialEntries={['/about']}>
        <NavBar />
      </MemoryRouter>
    );

    // Verifica se o link "Sobre" tem a classe de ativo
    const aboutLink = screen.getByText('Sobre');
    expect(aboutLink).toHaveClass('opacity-60 cursor-not-allowed');

    // Verifica se os outros links têm a classe de inativo
    const registerLink = screen.getByText('Cadastrar');
    const booksLink = screen.getByText('Livros');
    expect(registerLink).toHaveClass('font-semibold cursor-pointer hover:underline hover:scale-110');
    expect(booksLink).toHaveClass('font-semibold cursor-pointer hover:underline hover:scale-110');
  });

  it('renders the logo when not on the home page', () => {
    // Mock do useLocation para simular estar em "/books"
    mockUseLocation.mockReturnValue({ pathname: '/books' });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verifica se o logo está presente
    const logo = screen.getByAltText('Logo Reading Journal');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-logo.png');
    expect(logo.parentElement).toHaveAttribute('href', '/');
  });

  it('does not render the logo on the home page', () => {
    // Mock do useLocation para simular estar na página inicial "/"
    mockUseLocation.mockReturnValue({ pathname: '/' });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verifica que o logo não está presente
    expect(screen.queryByAltText('Logo Reading Journal')).not.toBeInTheDocument();
  });
});