import React, { useEffect, useState, type SubmitEvent } from "react";
import { createRoot } from "react-dom/client";

interface TaskItem {
  description: string;
  completed: boolean;
}

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [description, setDescription] = useState("");

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    fetch("api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    loadTasks();
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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Save Task</button>
        </div>
      </form>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <h1>
    <Application />
  </h1>,
);
