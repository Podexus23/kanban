import { useState } from "react";

import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";

function DesksPlace({ desks }) {
  const [usedDesks, setUsedDesks] = useState(desks);

  function handleClick(e) {
    setUsedDesks((desks) => [...desks, `New Desk #${desks.length}`]);
  }

  function handleDeleteDesk(id) {
    setUsedDesks((desks) => desks.filter((desk) => desk != id));
  }

  function handleRenameDeskTitle(oldName, newName) {
    setUsedDesks((desks) =>
      desks.map((desk) => (desk === oldName ? newName : desk))
    );
  }

  return (
    <>
      <button onClick={handleClick}>Add Desk</button>
      <div className={styles.DesksPlace}>
        {usedDesks.map((desk) => (
          <Desk
            deskTitle={desk}
            key={desk}
            onDeleteDesk={handleDeleteDesk}
            onRenameDeskTitle={handleRenameDeskTitle}
          />
        ))}
      </div>
    </>
  );
}

export default DesksPlace;
