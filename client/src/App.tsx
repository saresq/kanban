import Kanban from "./components/Kanban";

function App() {
  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="text-2xl font-bold leading-[4rem]">Kanban</header>
      <section className="">
        <Kanban />
      </section>
      <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} Saresq
      </footer>
    </main>
  );
}

export default App;
