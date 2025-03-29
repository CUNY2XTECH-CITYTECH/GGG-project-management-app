-- Drop the database if it exists
DROP DATABASE IF EXISTS project_management;

-- Create the database
CREATE DATABASE project_management;

-- Connect to the newly created database
\c project_management;

-- Drop tables if they exist
DROP TABLE IF EXISTS project_memberships CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS attachments CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- Users Table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,          -- Unique identifier for the user (UUID)
    full_name VARCHAR(255) NOT NULL,  -- User's full name
    email VARCHAR(255) UNIQUE NOT NULL -- User's email (unique)
);

-- Projects Table
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,     -- Unique project ID
    project_name VARCHAR(255) NOT NULL, -- Name of the project
    description TEXT,                  -- Detailed description of the project
    created_by UUID NOT NULL,          -- Foreign key to users table (UUID from SuperTokens)
    start_date DATE,                   -- Start date of the project
    due_date DATE,                     -- Due date of the project
    status VARCHAR(50) DEFAULT 'to-do' -- Status (e.g., to-do, in progress, done)
);
-- Tasks Table
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,        -- Unique task ID
    task_name VARCHAR(255) NOT NULL,   -- Name of the task
    description TEXT,                  -- Description of the task
    project_id INTEGER NOT NULL,          -- Foreign key to projects table (integer)
    assigned_to UUID,                  -- Foreign key to users table (UUID from SuperTokens)
    priority VARCHAR(50) DEFAULT 'medium', -- Priority of the task (e.g., low, medium, high)
    due_date DATE,                     -- Due date for the task
    status VARCHAR(50) DEFAULT 'to-do' -- Task status (e.g., to-do, in progress, done)
);

-- Attachments Table (to store file attachments for tasks)
CREATE TABLE attachments (
    attachment_id SERIAL PRIMARY KEY,   -- Unique attachment ID
    task_id INTEGER NOT NULL,               -- Foreign key to tasks table (integer)
    file_url VARCHAR(255) NOT NULL,      -- URL to the file
    file_name VARCHAR(255) NOT NULL,     -- Name of the file
    uploaded_by UUID NOT NULL             -- Foreign key to users table (UUID from SuperTokens)
);

-- Messaging Table (to store messages between users)
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,       -- Unique message ID
    sender_id UUID NOT NULL,             -- Foreign key to users table (UUID from SuperTokens)
    receiver_id UUID NOT NULL,           -- Foreign key to users table (UUID from SuperTokens)
    project_id INTEGER,                     -- Foreign key to projects table (optional)
    message_text TEXT NOT NULL            -- Message content
);
-- Project Membership Table (to define which users belong to which projects)
CREATE TABLE project_memberships (
    project_id INTEGER NOT NULL,            -- Foreign key to projects table (integer)
    user_id UUID NOT NULL,               -- Foreign key to users table (UUID from SuperTokens)
    role VARCHAR(50) DEFAULT 'member',   -- Role of the user within the project (e.g., member, admin)
    PRIMARY KEY (project_id, user_id)    -- Composite primary key
);