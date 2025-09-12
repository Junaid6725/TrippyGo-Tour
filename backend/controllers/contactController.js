import { mailToAdmin, mailToUser } from "../helper/mail.js";

export const contactController = async (req, res) => {
  const { fullName, email, message } = req.body;
  try {
    await Promise.all([
      mailToAdmin(fullName, email, message),
      mailToUser(fullName, email),
    ]);
    return res
      .status(200)
      .json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Failed to send emails" });
  }
};
