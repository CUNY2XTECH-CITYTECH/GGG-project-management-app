import { useState, useEffect } from "react";

interface Task {
  id?: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: "Low" | "Medium" | "High";
}

interface TaskFormProps {
  onSave: (task: Task) => void;
  existingTask?: Task | null;
}

export default function TaskForm({ onSave, existingTask }: TaskFormProps) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  useEffect(() => {
    if (existingTask) {
      setText(existingTask.text);
      setDueDate(existingTask.dueDate || "");
      setPriority(existingTask.priority || "Medium");
    }
  }, [existingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSave({ id: existingTask?.id, text, completed: existingTask?.completed || false, dueDate, priority });
    setText("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-80 flex flex-col space-y-2">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 rounded w-full"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} />

            <select
              className="border p-2 rounded w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
      
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {existingTask ? "Update Task" : "Add Task"}
            </button>
          </form>
        );
      }
      