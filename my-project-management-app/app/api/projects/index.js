import { createProject, getAllProjects } from "@/controllers/projectController";

export default async function handler(req, res) {
    if (req.method === "POST") {
        return await createProject(req, res);
    } else if (req.method === "GET") {
        return await getAllProjects(req, res);
    } else {
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
