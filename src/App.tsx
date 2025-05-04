import DesksPlace from "./components/features/DesksPalce/DesksPlace";

function App() {
  const desks = ["To Do", "In Progress", "Done"];

  return (
    <>
      <DesksPlace desks={desks} />
    </>
  );
}

export default App;
