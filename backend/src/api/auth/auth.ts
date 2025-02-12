import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from '../services/userService';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    // 1. Validate credentials
    const user = await UserService.authenticateUser(email, password);

    // 2. Create SuperTokens session
    await superTokensNextWrapper(
      async (next) => {
        await verifySession()(req as SessionRequest, res, next);
      },
      req,
      res
    );

    // 3. Return user data
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
