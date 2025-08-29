import mongoose from "mongoose";
import dotenv from "dotenv";

import {Job} from "./src/models/Job.js";       // Adjust path if needed
import {Company} from "./src/models/Company.js"; // Import your Company model

dotenv.config();

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL_URI);
    console.log("MongoDB connected");

    // Fetch companies to get their _id
    const companies = await Company.find({});
    if (companies.length === 0) {
      throw new Error("No companies found. Please seed companies first.");
    }

    await Job.deleteMany({});
    console.log("Existing jobs deleted");

    // Example jobs with different workMode, companies, etc.
    const jobs = [
      {
        title: "Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        type: "Full-time",
        workMode: "Onsite",
        description: "Develop scalable web applications.",
        salary: "$120,000 - $150,000",
        postedBy: companies.find((c) => c.cName === "Google")._id,
        resumeRequired: false,
        availability: false,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      },
      {
        title: "Frontend Developer",
        company: "Amazon",
        location: "Seattle, WA",
        type: "Contract",
        workMode: "Remote",
        description: "Build and maintain web frontends.",
        salary: "$80,000 - $100,000",
        postedBy: companies.find((c) => c.cName === "Amazon")._id,
        resumeRequired: false,
        availability: false,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      },
      {
        title: "Data Analyst Intern",
        company: "Microsoft",
        location: "Redmond, WA",
        type: "Internship",
        workMode: "Hybrid",
        description: "Analyze data trends for product improvement.",
        salary: "$25/hr",
        postedBy: companies.find((c) => c.cName === "Microsoft")._id,
        resumeRequired: false,
        availability: false,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      },
      {
        title: "Product Manager",
        company: "Netflix",
        location: "Los Gatos, CA",
        type: "Full-time",
        workMode: "Onsite",
        description: "Lead product development cycles.",
        salary: "$140,000 - $180,000",
        postedBy: companies.find((c) => c.cName === "Netflix")._id,
        resumeRequired: true,
        availability: true,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      },
      {
        title: "Backend Developer",
        company: "Spotify",
        location: "New York, NY",
        type: "Full-time",
        workMode: "Remote",
        description: "Design and maintain backend services.",
        salary: "$110,000 - $130,000",
        postedBy: companies.find((c) => c.cName === "Spotify")._id,
        resumeRequired: true,
        availability: true,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      },
      {
        title: "UX Designer",
        company: "Google",
        location: "Mountain View, CA",
        type: "Part-time",
        workMode: "Hybrid",
        description: "Design intuitive user experiences.",
        salary: "$60,000 - $80,000",
        postedBy: companies.find((c) => c.cName === "Google")._id,
        resumeRequired: false,
        availability: true,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      },
      {
        title: "DevOps Engineer",
        company: "Amazon",
        location: "Seattle, WA",
        type: "Full-time",
        workMode: "Onsite",
        description: "Manage deployment pipelines and cloud infrastructure.",
        salary: "$130,000 - $160,000",
        postedBy: companies.find((c) => c.cName === "Amazon")._id,
        resumeRequired: true,
        availability: true,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      },
      {
        title: "Marketing Specialist",
        company: "Netflix",
        location: "Los Gatos, CA",
        type: "Contract",
        workMode: "Remote",
        description: "Drive marketing campaigns and engagement.",
        salary: "$50,000 - $70,000",
        postedBy: companies.find((c) => c.cName === "Netflix")._id,
        resumeRequired: false,
        availability: true,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      },
      {
        title: "Customer Support Rep",
        company: "Spotify",
        location: "New York, NY",
        type: "Full-time",
        workMode: "Hybrid",
        description: "Assist customers with account and technical issues.",
        salary: "$40,000 - $55,000",
        postedBy: companies.find((c) => c.cName === "Spotify")._id,
        resumeRequired: false,
        availability: false,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      },
      {
        title: "HR Manager",
        company: "Microsoft",
        location: "Redmond, WA",
        type: "Full-time",
        workMode: "Onsite",
        description: "Manage HR policies and recruitment.",
        salary: "$90,000 - $110,000",
        postedBy: companies.find((c) => c.cName === "Microsoft")._id,
        resumeRequired: false,
        availability: false,
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      },
    ];

    const createdJobs = await Job.insertMany(jobs);
    console.log(`Seeded ${createdJobs.length} jobs`);

    process.exit();
  } catch (error) {
    console.error("Error seeding jobs:", error);
    process.exit(1);
  }
}

seedJobs();
