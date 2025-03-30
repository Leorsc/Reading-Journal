import BooksList from "../components/BooksList";
import NavBar from "../components/NavBar";
import BgReadingJournal from "../assets/background.png";

export default function Books() {
  return (
    <>
      <NavBar />
      <main
        className="flex justify-center h-screen min-h-screen w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${BgReadingJournal})` }}
      >
        <div className="flex items-center flex-col gap-8 w-2/3 mt-20">
          <h1 className="text-5xl font-bold text-gray-700">Listas de Livros</h1>
          <BooksList />
        </div>
      </main>
    </>
  )
}

