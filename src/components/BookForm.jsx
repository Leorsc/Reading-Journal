import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import InputForm from './InputForm';
import { registerBookValidationSchema } from '../utils/yupValidations/registerBookValidation';
import useBooks from '../hooks/useBooks';

export default function BookForm() {
  const navigate = useNavigate();
  const { createBook } = useBooks();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerBookValidationSchema),
  });

  const onSubmit = (data) => {
    try {
      createBook(data);
      reset();
      navigate('/books');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
    }
  };

  return (
    <form className="flex flex-col gap-6 w-96" onSubmit={handleSubmit(onSubmit)}>
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
          name={'date'}
          errors={errors.date}
        >
          <input
            className="w-full text-base text-input-form outline-none"
            type="date"
            {...register('date')}
            placeholder=""
          />
        </InputForm>
      </div>
      <button
        className="h-12 bg-border-input border-label-form border border-solid rounded-lg cursor-pointer text-xl hover:scale-102"
      >
        Adicionar
      </button>
    </form>
  );
}