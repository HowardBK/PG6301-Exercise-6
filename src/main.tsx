import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

interface TaskItem {
  description: string;
  completed: boolean;
}
function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>My Task Manager</h1>
      <ul>
        {tasks.map((t) => (
          <li>{t.description}</li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <h1>
    <Application />
  </h1>,
);
