import NavBar from "../components/NavBar";
import BgReadingJournal from "../assets/background.png";

export default function About() {
  return (
    <>
      <NavBar />
      <main
        className="flex items-center justify-center h-screen w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${BgReadingJournal})` }}
      >
        <div className="flex items-center justify-center flex-col font-semibold gap-8 w-3/5 text-gray-700">
          <span
            className="text-xl text-center"
          >
            Esta é uma aplicação para um CRUD de um Reading Journal.
          </span>
          <span
            className="text-xl text-center"
          >
            Este Projeto foi elaborado na Disciplina Desenvolvimento de Sistemas Frontend do Curso de Graduação Online da PUCRS
          </span>
        </div>
      </main>
    </>
  );
}