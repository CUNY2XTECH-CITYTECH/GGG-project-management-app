import { NextResponse, NextRequest } from 'next/server';
import db from '../../../lib/db'; // Your Drizzle database configuration
import { users } from '../../../lib/database-schema/schema'; // Assuming this is where your schema is defined
import { ensureSuperTokensInit } from '../../config/backend'; // Assuming this ensures SuperTokens is initialized
import { eq, ne, and } from 'drizzle-orm';
ensureSuperTokensInit();

export async function POST(request: NextRequest) {
  const { full_name, email } = await request.json();
  
  const userId = request.headers.get('x-user-id'); // Get the user ID from the session
  
  // Authentication check
  if (!userId) {
    return new NextResponse('Authentication required', { status: 401 });
  }

  // Check if email already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email)).execute();
  if (existingUser.length > 0) {
    return new NextResponse('Email is already taken', { status: 400 });
  }

  try {
    // Insert the user profile into the database
    await db.insert(users).values({
      user_id: userId,
      full_name,
      email,
    });

    return new NextResponse('Profile created successfully', { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return new NextResponse('Error creating profile', { status: 500 });
  }
}
export async function GET(request: NextRequest) {
    const userId = request.headers.get('x-user-id'); // Get the user ID from the session
    
    // Authentication check
    if (!userId) {
      return new NextResponse('Authentication required', { status: 401 });
    }
  
    try {
      // Retrieve user profile from the database
      const userProfile = await db.select().from(users).where(eq(users.user_id, userId)).execute();
  
      if (userProfile.length === 0) {
        return new NextResponse('Profile not found', { status: 404 });
      }
  
      return NextResponse.json(userProfile[0]);
    } catch (error) {
      console.error('Error retrieving profile:', error);
      return new NextResponse('Error retrieving profile', { status: 500 });
    }
  }

  export async function PUT(request: NextRequest) {
    const { full_name, email } = await request.json();
    const userId = request.headers.get('x-user-id'); // Get the user ID from the session
    
    // Authentication check
    if (!userId) {
      return new NextResponse('Authentication required', { status: 401 });
    }
  
    // Check if the email already exists (ensure uniqueness)
    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(and(eq(users.email, email), ne(users.user_id, userId)))
        .execute();

      if (existingUser.length > 0) {
        return new NextResponse('Email is already taken', { status: 400 });
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return new NextResponse('Internal server error', { status: 500 });
    }
    
    try {
      // Update the user profile in the database
      await db.update(users).set({ full_name, email }).where(eq(users.user_id, userId)).execute();
  
      return new NextResponse('Profile updated successfully', { status: 200 });
    } catch (error) {
      console.error('Error updating profile:', error);
      return new NextResponse('Error updating profile', { status: 500 });
    }
  }

  export async function DELETE(request: NextRequest) {
    const userId = request.headers.get('x-user-id'); // Get the user ID from the session
    
    // Authentication check
    if (!userId) {
      return new NextResponse('Authentication required', { status: 401 });
    }
  
    try {
      // Optional: You may want to delete related records (tasks, attachments, messages) for referential integrity.
      await db.delete(users).where(eq(users.user_id, userId)).execute();
  
      return new NextResponse('Profile deleted successfully', { status: 200 });
    } catch (error) {
      console.error('Error deleting profile:', error);
      return new NextResponse('Error deleting profile', { status: 500 });
    }
  }