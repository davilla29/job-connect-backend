import { Job } from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      location,
      type,
      description,
      salary,
      resumeRequired,
      availability,
    } = req.body;

    if (!title || !location || !description || !salary) {
      return res
        .status(400)
        .json({ success: false, message: "Fill all fields" });
    }

    const job = new Job({
      title,
      company: req.user.cName,
      postedBy: req.userId,
      location,
      type,
      workMode,
      description,
      salary,
      resumeRequired,
      availability,
    });

    await job.save();

    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if logged-in user's company matches the job's postedBy
    if (job.postedBy.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot update this job",
      });
    }

    // Update allowed fields
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // // To check ownership
    // if (job.postedBy !== req.user.company) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Forbidden: You cannot update this job",
    //   });
    // }

    // const updates = req.body;
    // Object.assign(job, updates);

    // await job.save();

    res.status(200).json({ success: true, updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    if (job.postedBy.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot delete this job",
      });
    }

    await job.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPostedJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      workMode,
      location,
      title, // search keyword for job title
      resumeRequired,
      availability,
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter starting with postedBy = user's company
    const filter = { postedBy: req.userId };

    if (type) filter.type = type;
    if (location) filter.location = location;
    if (resumeRequired) filter.resumeRequired = resumeRequired;
    if (availability) filter.availability = availability;
    if (workMode) filter.workMode = workMode;
    if (title) filter.title = { $regex: title, $options: "i" };

    const total = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      jobs,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      from: skip + 1,
      to: Math.min(skip + jobs.length, total),
    });
  } catch (error) {
    console.error("Error fetching posted jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getJobsById = async (req, res) => {
  try {
    const jobId = req.params.id;
    // Optional: validate if jobId is a valid Mongo ObjectId
    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job ID" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    // Destructure query params with defaults
    const {
      page = 1,
      limit = 10,
      company,
      type,
      workMode,
      location,
      title, // optional: search by title keyword
      resumeRequired,
      availability,
    } = req.query;

    // Build dynamic filter object
    const filter = {};
    if (company) filter.company = company;
    if (type) filter.type = type;
    if (location) filter.location = location;
    if (availability) filter.availability = availability;
    if (workMode) filter.workMode = workMode;
    if (title) filter.title = { $regex: title, $options: "i" }; // case-insensitive partial match
    if (resumeRequired) filter.resumeRequired = resumeRequired;

    const skip = (Number(page) - 1) * Number(limit);

    // Query jobs with filter, pagination, and descending order
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(Number(limit));

    const total = await Job.countDocuments(filter);

    if (jobs.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No jobs available matching your criteria.",
        jobs: [],
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
    }

    res.status(200).json({
      success: true,
      message: `Found ${total} job(s)`,
      jobs,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
      from: skip + 1,
      to: Math.min(skip + jobs.length, total),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
