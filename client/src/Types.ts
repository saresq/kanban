interface Task {
  _id: string;
  name: string;
  description: string;
  state: "Por hacer" | "En progreso" | "Hecho";
  created_at: Date;
}

export default Task;
