import { Applicant } from "../models/Applicant.js";

export const getApplicantProfile = async (req, res) => {
  try {
    const { id } = req.params;

    //   To allow only logged in user to access their profile
    if (req.user.id !== id) {
      return res.status(403).json({
        succes: false,
        message: "Access denied",
      });
    }

    const applicant = await Applicant.findById(id).select("-password");

    if (!applicant) {
      return res
        .status(404)
        .json({ succes: false, message: "Applicant not found" });
    }

    res.status(200).json(applicant);
  } catch (error) {
    console.error("Error fetching applicant profile:", error);
    res.status(500).json({ succes: false, message: "Server error" });
  }
};

export const updateApplicantProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the logged-in user is updating their own profile
    if (req.user.id !== id) {
      return res
        .status(403)
        .json({ message: "Access denied: Not your profile" });
    }

    const applicant = await Applicant.findById(id);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    // Fields you allow to update
    const {
      fName,
      lName,
      phone,
      address,
      education,
      skills,
      experience,
      resumeLink,
      profilePictureURL,
    } = req.body;

    // Conditionally update fields
    if (fName) applicant.fName = fName;
    if (lName) applicant.lName = lName;
    if (phone) applicant.phone = phone;
    if (address) applicant.address = address;
    if (education) applicant.education = education;
    if (skills) {
      applicant.skills = Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim());
    }
    if (experience) applicant.experience = experience;
    if (resumeLink) applicant.resumeLink = resumeLink;
    if (profilePictureURL) applicant.profilePictureURL = profilePictureURL;

    await applicant.save();

    res.status(200).json({
      message: "Profile updated successfully",
      applicant,
    });
  } catch (error) {
    console.error("Error updating applicant profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
