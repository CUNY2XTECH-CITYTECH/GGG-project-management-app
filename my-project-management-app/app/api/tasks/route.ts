import { NextResponse } from 'next/server';
import { createNewTask, getTask, updateExistingTask, deleteExistingTask, getAllTasksForProject } from '../../../lib/controllers/taskController';

export async function POST(request: Request) {
    const body = await request.json();
    return createNewTask(body.taskName, body.description, body.projectId, body.assignedTo);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const id = searchParams.get('id');

    if (id) {
        return getTask(parseInt(id));
    } else if (projectId) {
        return getAllTasksForProject(parseInt(projectId));
    } else {
        return NextResponse.json({ status: 400, message: 'Project ID or Task ID is required.' });
    }
}

export async function PUT(request: Request) {
    const body = await request.json();
    return updateExistingTask(body.id, body.taskName, body.description, body.projectId, body.assignedTo);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ status: 400, message: 'Task ID is required.' });
    }
    return deleteExistingTask(parseInt(id));
}
