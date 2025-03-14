import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main className="flex items-center justify-center h-screen w-full">
        <div className="flex items-center justify-center flex-col gap-8 w-2/3">
          <h1 className="text-5xl font-bold">Página não encontrada!</h1>
          <Link to="/" className="hover:underline">Clique aqui e retorne para a Página Inicial</Link>
        </div>
      </main>
    </>
  )
}