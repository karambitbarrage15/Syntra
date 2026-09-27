import { Request, Response, NextFunction } from "express";
import DescopeClient from "@descope/node-sdk";
import dotenv from "dotenv";

dotenv.config();

const descopeClient = DescopeClient({
  projectId: process.env.DESCOPE_PROJECT_ID || "",
  managementKey: process.env.DESCOPE_MANAGEMENT_KEY,
});

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email?: string;
    name?: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.headers.authorization?.replace("Bearer ", "");

    if (!sessionToken) {
      res.status(401).json({ error: "No session token provided" });
      return;
    }

    const authInfo = await descopeClient.validateSession(sessionToken);

    if (!authInfo?.token) {
      res.status(401).json({ error: "Invalid session token" });
      return;
    }

    req.user = {
      userId: authInfo.token.sub || "",
      email: authInfo.token.email as string | undefined,
      name: authInfo.token.name as string | undefined,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

export { descopeClient };
