import NavBar from "../components/NavBar";
import ReadingJournal from "../assets/reading-journal.png";

export default function Home() {
  return (
    <>
      <NavBar />
      <main
        className="flex items-center justify-center w-full h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${ReadingJournal})` }}
      >

      </main>
    </>
  );
}