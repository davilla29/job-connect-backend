import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";
import { Applicant } from "../models/Applicant.js"; 

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    // const applicantId = req.user.id;
    const applicantId = req.userId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (!job.availability) {
      return res.status(403).json({
        success: false,
        message: "Applications are closed for this job.",
      });
    }

    // Check duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: applicantId,
    });
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    let resumeLink = null;

    if (job.resumeRequired) {
      const applicant = await Applicant.findById(applicantId);
      if (!applicant || !applicant.resumeLink) {
        return res
          .status(400)
          .json({ success: false, message: "Resume not found in profile" });
      }
      resumeLink = applicant.resumeLink;
    }

    const application = new Application({
      job: jobId,
      applicant: applicantId,
      resumeLink: resumeLink || null,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while applying to job" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const userId = req.userId;

    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status; // Optional status filter
    const skip = (page - 1) * limit;

    // Build dynamic filter
    const filter = { applicant: userId };
    if (
      status &&
      ["Pending", "Reviewed", "Accepted", "Rejected"].includes(status)
    ) {
      filter.status = status;
    }

    // Query with filter + pagination
    const [applications, total] = await Promise.all([
      Application.find(filter)
        .populate("job")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const from = total === 0 ? 0 : skip + 1;
    const to = skip + applications.length;

    if (applications.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No applications found for the selected criteria.",
        applications: [],
        pagination: {
          total,
          page,
          totalPages,
          limit,
          from,
          to,
        },
      });
    }

    res.status(200).json({
      success: true,
      applications,
      pagination: {
        total,
        page,
        totalPages,
        limit,
        from,
        to,
      },
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const loggedInCompany = req.userId;

    // 1. Find the job and validate ownership
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // 2. Check if the logged-in company owns the job
    if (job.postedBy.toString() !== loggedInCompany.toString()) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You are not allowed to view applications for this job.",
      });
    }

    // 3. Continue with pagination and response
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { job: jobId };

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .populate("applicant", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const from = total === 0 ? 0 : skip + 1;
    const to = skip + applications.length;

    if (applications.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No applications found for this job.",
        applications: [],
        pagination: {
          total,
          page,
          totalPages,
          limit,
          from,
          to,
        },
      });
    }

    res.status(200).json({
      success: true,
      applications,
      pagination: {
        total,
        page,
        totalPages,
        limit,
        from,
        to,
      },
    });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications for the job.",
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInCompany = req.userId;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Pending", "Reviewed", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    // Find the application
    const application = await Application.findById(id).populate("job");
    const owner = application.job.postedBy;
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    // Check if logged in company owns posted the job
    if (owner.postedBy.toString() !== loggedInCompany.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this application",
      });
    }

    // Update the status
    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Application status updated to "${status}"`,
      application,
    });
  } catch (error) {
    console.error("Error updating job application status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update job application status.",
    });
  }
};

export const updateInterviewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduled, date, location, notes } = req.body;

    const application = await Application.findById(id).populate("job");
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    // Check if application status is "Accepted"
    if (application.status !== "Accepted") {
      return res.status(403).json({
        success: false,
        message:
          "Interview details can only be updated if application status is 'Accepted'.",
      });
    }

    application.interview = {
      scheduled: scheduled ?? application.interview.scheduled,
      date: date ?? application.interview.date,
      location: location ?? application.interview.location,
      notes: notes ?? application.interview.notes,
    };

    await application.save();

    res.status(200).json({
      success: true,
      message: "Interview details updated successfully",
      interview: application.interview,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the application and populate job and applicant details
    const application = await Application.findById(id)
      .populate("job")
      .populate("applicant");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Error fetching application by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
