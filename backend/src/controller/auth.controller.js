import { User } from "../model/auth.model.js";
// import { generateToken } from "./../config/utils.config.js";

export const signup = async (req, res) => {
  const { username, password, lastName, firstName, middleInitial } = req.body;
  try {
    // Check if there's input
    if (!username || !password || !lastName || !firstName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Plan to add sanitization

    // Check if username is taken
    const userNameTaken = User.isUsernameTaken(username);
    if (userNameTaken) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hash(password, salt);

    const newUser = await User.createUser({
      username: username,
      password: hashedPassword,
      lastName: lastName,
      firstName: firstName,
      middleInitial: middleInitial,
    });

    if (newUser) {
      // Generate JWT token WIP
      //   const token = generateToken({});

      // Respond with success message and user information and check if middle name exists
      const fullName = `${newUser.first_name} ${newUser.middle_name ? newUser.middle_name + " " : ""}${newUser.last_name}`;

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        token: token,
        data: {
          id: newUser.user_id,
          fullName: fullName,
        },
      });
    }
  } catch (error) {
    console.error("DEBUGGING Signup error:", error.stack);

    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
