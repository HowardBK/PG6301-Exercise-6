import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);

const tasks = [
  { id: 0, description: "Create project (server)", completed: true },
  { id: 1, description: "Create React webapp (server)", completed: true },
  { id: 2, description: "Create Hono backend", completed: true },
  { id: 3, description: "Update with Hono backend", completed: false },
];
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});

app.post("/api/tasks", async (c) => {
  const task = await c.req.json();
  tasks.push({ ...task, id: tasks.length });
  return c.newResponse(null, 201);
});

app.put(`/api/tasks/:id`, async (c) => {
  const id = parseInt(c.req.param().id);
  const { completed } = await c.req.json();
  for (const task of tasks) {
    if (task.id === id) task.completed = completed;
  }
  return c.newResponse(null, 201);
});
