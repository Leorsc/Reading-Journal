import BookForm from "../components/BookForm";
import NavBar from "../components/NavBar";


export default function Register() {

  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center h-screen w-full">
        <div className="flex items-center justify-center flex-col gap-8 w-2/3">
          <h1 className="text-5xl font-bold">Cadastrar</h1>
          <BookForm />

        </div>
      </main>
    </>
  )
}

