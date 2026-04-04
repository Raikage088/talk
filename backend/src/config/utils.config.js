import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

// Generate JWT token
export const generateToken = (user, res) => {
  if (!secretKey) {
    console.error("Missing JWT_SECRET in environment variables!");
    throw new Error("Internal Server Error");
  }

  try {
    const token = jwt.sign({ id: user.user_id }, secretKey, {
      expiresIn: "7d",
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Set cookie expiration to 7 days
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};
