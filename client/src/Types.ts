export interface Task {
  _id: string;
  name: string;
  description: string;
  state: "Por hacer" | "En progreso" | "Hecho";
  created_at: Date;
}

export interface NewTask {
  name: string;
  description: string;
  state: string;
}
