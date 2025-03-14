import * as yup from 'yup';

export const registerBookValidationSchema = yup.object().shape({
  title: yup.string().required('Este campo deve ser preenchido'),
  author: yup.string().required('Este campo deve ser preenchido'),
  genre: yup.string().required('Este campo deve ser preenchido'),
  date: yup
    .string()
    .required('Este campo deve ser preenchido')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'A data deve estar no formato YYYY-MM-DD'),
});