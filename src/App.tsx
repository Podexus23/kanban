import DesksPlace from "./components/features/DesksPlace/DesksPlace";
import styles from "./App.module.css";

function App() {
  const desks = ["To Do", "In Progress", "Done"];

  return (
    <div className={styles.app}>
      <DesksPlace desks={desks} />
    </div>
  );
}

export default App;
