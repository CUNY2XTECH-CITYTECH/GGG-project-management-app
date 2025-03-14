import { getProjectById, updateProject, deleteProject } from "@/controllers/projectController";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        return await getProjectById(req, res);
    } else if (req.method === "PUT") {
        return await updateProject(req, res);
    } else if (req.method === "DELETE") {
        return await deleteProject(req, res);
    } else {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
