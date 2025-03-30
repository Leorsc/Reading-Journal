import { useParams } from 'react-router-dom';
import BgReadingJournal from "../assets/background.png";
import NavBar from '../components/NavBar';
import EditBookForm from '../components/EditBookForm';

export default function EditBook() {
  const { id } = useParams();


  return (
    <>
      <NavBar />
      <main
        className="flex justify-center h-screen w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${BgReadingJournal})` }}
      >
        <div className="flex items-center flex-col gap-8 w-2/3 mt-20">
          <h1 className="text-5xl font-bold text-gray-700">Editar Livro</h1>
          <EditBookForm id={id} />
        </div>
      </main>
    </>
  );
}