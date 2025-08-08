import {Company} from "../models/Company.js";

export const getCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res
        .status(403)
        .json({ succes: false, message: "Access denied: Not your profile" });
    }

    const company = await Company.findById(id).select("-password");
    if (!company) {
      return res
        .status(404)
        .json({ succes: false, message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company profile:", error);
    res.status(500).json({ succes: false, message: "Server error" });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res
        .status(403)
        .json({ succes: false, message: "Access denied: Not your profile" });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res
        .status(404)
        .json({ succes: false, message: "Company not found" });
    }

    const { cName, phone, address, industry, profilePictureURL } = req.body;

    if (cName) company.cName = cName;
    if (phone) company.phone = phone;
    if (address) company.address = address;
    if (industry) company.industry = industry;
    if (profilePictureURL) company.profilePictureURL = profilePictureURL;

    await company.save();

    res.status(200).json({
      message: "Company profile updated successfully",
      company,
    });
  } catch (error) {
    console.error("Error updating company profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
