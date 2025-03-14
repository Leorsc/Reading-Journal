import NavBar from "../components/NavBar";

export default function About() {
  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center h-screen w-full">
        <div className="flex items-center justify-center flex-col gap-8 w-2/3">
          <h1 className="text-5xl font-bold">Sobre</h1>
          <span
            className="text-xl text-center"
          >
            Esta é uma aplicação para um CRUD de um Reading Journal. Este Projeto foi elaborado na Disciplina Desenvolvimento de Sistemas Frontend do Curso de Graduação Online da PUCRS
          </span>
        </div>
      </main>
    </>
  )
}