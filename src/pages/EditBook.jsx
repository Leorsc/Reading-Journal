import { useParams } from 'react-router-dom';

import NavBar from '../components/NavBar';
import EditBookForm from '../components/EditBookForm';

export default function EditBook() {
  const { id } = useParams();


  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center h-screen w-full">
        <div className="flex items-center justify-center flex-col gap-8 w-2/3">
          <h1 className="text-5xl font-bold">Editar Livro</h1>
          <EditBookForm id={id} />
        </div>
      </main>
    </>
  );
}