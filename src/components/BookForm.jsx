import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import InputForm from './InputForm';
import { registerBookValidationSchema } from '../utils/yupValidations/registerBookValidation';
import api from '../services/api';

export default function BookForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerBookValidationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const bookData = {
        title: data.title,
        author: data.author,
        genre: data.genre,
        readAt: data.readAt,
      };

      await api.post('/books', bookData);

      reset();
      navigate('/books');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      alert('Erro ao cadastrar livro. Tente novamente.');
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-96 p-8 rounded-2xl bg-zinc-100 border border-border-input border-solid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 w-full">
        <InputForm
          className=""
          title={'Título'}
          name={'title'}
          errors={errors.title}
        >
          <input
            className="w-full text-base text-input-form outline-none"
            type="text"
            {...register('title')}
            placeholder=""
          />
        </InputForm>
        <InputForm
          className=""
          title={'Autor(a)'}
          name={'author'}
          errors={errors.author}
        >
          <input
            className="w-full text-base text-input-form outline-none"
            type="text"
            {...register('author')}
            placeholder=""
          />
        </InputForm>
        <InputForm
          className=""
          title={'Gênero'}
          name={'genre'}
          errors={errors.genre}
        >
          <input
            className="w-full text-base text-input-form outline-none"
            type="text"
            {...register('genre')}
            placeholder=""
          />
        </InputForm>
        <InputForm
          className=""
          title={'Data'}
          name={'readAt'}
          errors={errors.readAt}
        >
          <input
            className="w-full text-base text-input-form outline-none"
            type="date"
            {...register('readAt')}
            placeholder=""
          />
        </InputForm>
      </div>
      <button
        className="h-12 bg-border-input text-input-form border-label-form border border-solid rounded-lg cursor-pointer text-xl hover:scale-102"
      >
        Adicionar
      </button>
    </form>
  );
}