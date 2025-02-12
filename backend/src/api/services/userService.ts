import { db } from "../../db/drizzle";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { PasswordService } from "./passwordService";

export class UserService {
  static async authenticateUser(email: string, password: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) throw new Error("User not found");

    const isValid = await PasswordService.comparePassword(
      password,
      user.passwordHash
    );

    if (!isValid) throw new Error("Invalid password");

    return user;
  }
}
