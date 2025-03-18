import { NextResponse } from 'next/server';
import { createNewTask, getTask, updateExistingTask, deleteExistingTask, getAllTasksForProject } from '../../../lib/controllers/taskController';

export async function POST(request: Request) {
    const body = await request.json();
    return createNewTask(body.taskId, body.taskName, body.description, body.projectId, body.assignedTo);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const projectId = searchParams.get('projectId');

    if (id) {
        return getTask(id);
    } else if (projectId) {
        return getAllTasksForProject(projectId);
    }
}

export async function PUT(request: Request) {
    const body = await request.json();
    const id = body.id; // Assuming the ID is sent in the body
    return updateExistingTask(id, body.taskName, body.description, body.projectId, body.assignedTo);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    return deleteExistingTask(id);
}
