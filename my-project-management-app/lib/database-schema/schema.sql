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
    user_id SERIAL PRIMARY KEY,      -- Unique user ID
    username VARCHAR(255) UNIQUE NOT NULL,   -- Username for login
    email VARCHAR(255) UNIQUE NOT NULL,      -- User's email address
    password_hash VARCHAR(255) NOT NULL,    -- Password hash for authentication
    full_name VARCHAR(255) NOT NULL,         -- Full name of the user
    role VARCHAR(50) DEFAULT 'user',        -- Role of the user (e.g., user, admin)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the account was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When the account was last updated
);

-- Projects Table
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,     -- Unique project ID
    project_name VARCHAR(255) NOT NULL, -- Name of the project
    description TEXT,                  -- Detailed description of the project
    created_by INT NOT NULL,           -- Foreign key to users table
    start_date DATE,                   -- Start date of the project
    due_date DATE,                     -- Due date of the project
    status VARCHAR(50) DEFAULT 'active', -- Status (e.g., active, completed, on hold)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the project was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the project was last updated
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Tasks Table
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,        -- Unique task ID
    task_name VARCHAR(255) NOT NULL,    -- Name of the task
    description TEXT,                   -- Description of the task
    project_id INT NOT NULL,            -- Foreign key to projects table
    assigned_to INT,                    -- Foreign key to users table (optional, task assignee)
    priority VARCHAR(50) DEFAULT 'medium', -- Priority of the task (e.g., low, medium, high)
    due_date DATE,                      -- Due date for the task
    status VARCHAR(50) DEFAULT 'pending', -- Task status (e.g., pending, in progress, completed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the task was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the task was last updated
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Attachments Table (to store file attachments for tasks)
CREATE TABLE attachments (
    attachment_id SERIAL PRIMARY KEY,   -- Unique attachment ID
    task_id INT NOT NULL,               -- Foreign key to tasks table
    file_url VARCHAR(255) NOT NULL,      -- URL to the file
    file_name VARCHAR(255) NOT NULL,     -- Name of the file
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the attachment was added
    FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE
);

-- Messaging Table (to store messages between users)
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,      -- Unique message ID
    sender_id INT NOT NULL,              -- Foreign key to users table (sender)
    receiver_id INT NOT NULL,            -- Foreign key to users table (receiver)
    project_id INT,                      -- Foreign key to projects table (optional)
    message_text TEXT NOT NULL,          -- Message content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the message was sent
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE SET NULL
);

-- Project Membership Table (to define which users belong to which projects)
CREATE TABLE project_memberships (
    project_id INT NOT NULL,            -- Foreign key to projects table
    user_id INT NOT NULL,               -- Foreign key to users table
    role VARCHAR(50) DEFAULT 'member',  -- Role of the user within the project (e.g., member, admin)
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the user joined the project
    PRIMARY KEY (project_id, user_id),  -- Composite primary key
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
