import mongoose from "mongoose";
import { Applicant } from "../models/Applicant.js";

let gfsBucket;

// Initialize GridFSBucket when DB connects
mongoose.connection.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "resumes",
  });
  console.log("✅ GridFSBucket initialized (resumes)");
});

export const uploadResume = async (req, res) => {
  try {
    const applicantId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!gfsBucket) {
      return res.status(500).json({ message: "File system not ready" });
    }

    const filename = `${Date.now()}-${req.file.originalname}`;

    // Create upload stream
    const uploadStream = gfsBucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer); // write buffer to MongoDB

    uploadStream.on("finish", async () => {
      try {
        // ✅ Get file info manually after upload
        const files = await gfsBucket.find({ filename }).toArray();
        if (!files || files.length === 0) {
          return res.status(500).json({ message: "File upload incomplete" });
        }

        const file = files[0];
        const resumeLink = `/api/applicants/resume/${file.filename}`;

        const updatedApplicant = await Applicant.findByIdAndUpdate(
          applicantId,
          { resumeLink },
          { new: true }
        );

        if (!updatedApplicant) {
          return res.status(404).json({ message: "Applicant not found" });
        }

        res.status(200).json({
          message: "Resume uploaded successfully",
          applicant: updatedApplicant,
          file: {
            id: file._id,
            filename: file.filename,
          },
        });
      } catch (err) {
        console.error("Finish Event Error:", err);
        res.status(500).json({ message: "File metadata retrieval failed" });
      }
    });

    uploadStream.on("error", (err) => {
      console.error("Upload Stream Error:", err);
      res.status(500).json({ message: "File upload failed" });
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📂 Download résumé
export const getResume = async (req, res) => {
  try {
    if (!gfsBucket) {
      return res.status(500).json({ message: "File system not ready" });
    }

    const files = await gfsBucket
      .find({ filename: req.params.filename })
      .toArray();

    if (!files || files.length === 0)
      return res.status(404).json({ message: "File not found" });

    const file = files[0];
    res.set("Content-Type", file.contentType || "application/pdf");

    const readStream = gfsBucket.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  } catch (error) {
    console.error("Get Resume Error:", error);
    res.status(500).json({ message: error.message });
  }
};
