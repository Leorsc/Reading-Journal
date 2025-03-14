import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center h-screen w-full">
        <div className="flex items-center justify-center flex-col gap-8 w-2/3">
          <h1 className="text-5xl font-bold">Página Inicial</h1>
          <span className="text-xl">Bem Vindo ao Reading Journal</span>
        </div>
      </main>
    </>
  )
}