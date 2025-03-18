import { createUserProfile, getUserProfileById, updateUserProfile, deleteUserProfile } from '../queries/users';

// Register a new user
export const registerUser = async (userId: string, fullName: string, email: string) => {
    try {
        const user = await createUserProfile(userId, fullName, email);
        return { status: 201, data: user };
    } catch (error) {
        return { status: 500, message: (error as Error).message };
    }
};

// Get user by ID
export const getUser = async (userId: string) => {
    try {
        const user = await getUserProfileById(userId);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        return { status: 200, data: user };
    } catch (error) {
        return { status: 500, message: (error as Error).message };
    }
};

// Update user profile
export const updateUser = async (userId: string, fullName?: string, email?: string) => {
    try {
        const updatedUser = await updateUserProfile(userId, fullName, email);
        return { status: 200, data: updatedUser };
    } catch (error) {
        return { status: 500, message: (error as Error).message };
    }
};

// Delete user profile
export const deleteUser = async (userId: string) => {
    try {
        await deleteUserProfile(userId);
        return { status: 204 }; // No content
    } catch (error) {
        return { status: 500, message: (error as Error).message };
    }
};
