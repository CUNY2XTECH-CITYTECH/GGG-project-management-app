import { updateTaskStatus } from "@/controllers/taskController";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        return await updateTaskStatus(req, res);
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
