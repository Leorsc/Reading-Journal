import { renderHook, act, waitFor } from '@testing-library/react';
import useBookProvider from '../hooks/useBookProvider';
import api from '../services/api';

jest.mock('../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('useBookProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch books on mount', async () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', readAt: '2023-01-01' },
    ];
    api.get.mockResolvedValueOnce({ data: mockBooks });

    const { result } = renderHook(() => useBookProvider());

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books');
      expect(result.current.books).toEqual(mockBooks);
    });
  });

  it('should create a book and show notification', async () => {
    const mockBook = { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', readAt: '2023-02-01' };
    api.get.mockResolvedValueOnce({ data: [] }); // Mock para fetchBooks
    api.post.mockResolvedValueOnce({ data: mockBook });

    const { result } = renderHook(() => useBookProvider());

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books');
    });

    await act(async () => {
      await result.current.createBook({
        title: 'Book 2',
        author: 'Author 2',
        genre: 'Genre 2',
        readAt: '2023-02-01',
      });
    });

    expect(api.post).toHaveBeenCalledWith('/books', {
      title: 'Book 2',
      author: 'Author 2',
      genre: 'Genre 2',
      readAt: '2023-02-01',
    });
    expect(result.current.books).toContainEqual(mockBook);
    expect(result.current.notification).toEqual({
      type: 'create',
      message: 'Livro criado com sucesso!',
    });

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.notification).toBeNull();
  });

  it('should update a book and show notification', async () => {
    const initialBooks = [{ id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', readAt: '2023-01-01' }];
    api.get.mockResolvedValueOnce({ data: initialBooks });
    api.put.mockResolvedValueOnce({});

    const { result } = renderHook(() => useBookProvider());

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books');
    });

    await act(async () => {
      await result.current.updateBook(1, { title: 'Updated Book' });
    });

    expect(api.put).toHaveBeenCalledWith('/books', { id: 1, title: 'Updated Book' });
    expect(result.current.books[0].title).toBe('Updated Book');
    expect(result.current.notification).toEqual({
      type: 'update',
      message: 'Livro atualizado com sucesso!',
    });

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.notification).toBeNull();
  });

  it('should delete a book and show notification', async () => {
    const initialBooks = [{ id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', readAt: '2023-01-01' }];
    api.get.mockResolvedValueOnce({ data: initialBooks });
    api.delete.mockResolvedValueOnce({});

    const { result } = renderHook(() => useBookProvider());

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books');
    });

    await act(async () => {
      await result.current.deleteBook(1);
    });

    expect(api.delete).toHaveBeenCalledWith('/books/1');
    expect(result.current.books).toHaveLength(0);
    expect(result.current.notification).toEqual({
      type: 'delete',
      message: 'Livro deletado com sucesso!',
    });

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.notification).toBeNull();
  });

  it('should handle API errors gracefully', async () => {
    // Suprimir console.error durante este teste
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    api.get.mockResolvedValueOnce({ data: [] }); // Mock para fetchBooks
    api.post.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useBookProvider());

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/books');
    });

    await expect(
      act(async () => {
        await result.current.createBook({ title: 'Test' });
      })
    ).rejects.toThrow('API Error');

    expect(result.current.books).toEqual([]);
    expect(result.current.notification).toBeNull();

    // Restaurar console.error
    consoleErrorSpy.mockRestore();
  });
});

jest.useFakeTimers();