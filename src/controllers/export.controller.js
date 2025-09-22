import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
import { JOB_APPLICATIONS_PDF_TEMPLATE } from "../templates/jobApplicationsPdfTemplate.js";
import { generatePDF } from "../utils/pdfGenerator.js";

export const exportJobApplications = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Fetch job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).send("Job not found");

    // Fetch applications for this job, with applicant populated
    const applicants = await Application.find({ job: jobId })
      .populate("applicant", "fName lName email")
      .sort({ createdAt: -1 });

    // Build PDF
    const html = JOB_APPLICATIONS_PDF_TEMPLATE(job, applicants);
    const pdfBuffer = await generatePDF(html);

    res.contentType("application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${job.title}-applications.pdf`
    );
    console.log("Applicants in PDF:", applicants);

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate PDF");
  }
};
