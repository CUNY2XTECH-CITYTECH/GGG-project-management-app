import { getTaskById, updateTask, deleteTask } from "@/controllers/taskController";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        return await getTaskById(req, res);
    } else if (req.method === "PUT") {
        return await updateTask(req, res);
    } else if (req.method === "DELETE") {
        return await deleteTask(req, res);
    } else {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
