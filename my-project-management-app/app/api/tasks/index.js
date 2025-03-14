import { createTask, getAllTasks } from "@/controllers/taskController";

export default async function handler(req, res) {
    if (req.method === "POST") {
        return await createTask(req, res);
    } else if (req.method === "GET") {
        return await getAllTasks(req, res);
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
