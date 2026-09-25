import React, { useEffect, useState, type SubmitEvent } from "react";
import { createRoot } from "react-dom/client";

interface TaskItem {
  id: number;
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

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    await fetch("api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, completed: false }),
    });
    await loadTasks();
  }

  async function handleCompleted(taskId: number, completed: boolean) {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    await loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>My Task Manager</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={(e) => handleCompleted(t.id, e.target.checked)}
            />
            {t.description}
          </li>
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

createRoot(document.getElementById("root")!).render(<Application />);
