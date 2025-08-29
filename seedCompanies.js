import mongoose from "mongoose";
import dotenv from "dotenv";
import { Company } from "./src/models/Company.js"; // Adjust path as needed


dotenv.config();

const companies = [
  {
    email: "google@example.com",
    password: "password123", // in real apps, hash your passwords
    cName: "Google",
    phone: "+1 650-253-0000",
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    industry: "Technology",
  },
  {
    email: "amazon@example.com",
    password: "password123",
    cName: "Amazon",
    phone: "+1 206-266-1000",
    address: "410 Terry Ave N, Seattle, WA",
    industry: "E-commerce",
  },
  {
    email: "microsoft@example.com",
    password: "password123",
    cName: "Microsoft",
    phone: "+1 425-882-8080",
    address: "One Microsoft Way, Redmond, WA",
    industry: "Technology",
  },
  {
    email: "netflix@example.com",
    password: "password123",
    cName: "Netflix",
    phone: "+1 408-540-3700",
    address: "100 Winchester Circle, Los Gatos, CA",
    industry: "Entertainment",
  },
  {
    email: "spotify@example.com",
    password: "password123",
    cName: "Spotify",
    phone: "+1 212-555-0198",
    address: "4 World Trade Center, New York, NY",
    industry: "Music Streaming",
  },
];

async function seedCompanies() {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL_URI);
    console.log("MongoDB connected");

    await Company.deleteMany({});
    console.log("Existing companies deleted");

    const createdCompanies = await Company.insertMany(companies);
    console.log(`Seeded ${createdCompanies.length} companies`);

    process.exit();
  } catch (error) {
    console.error("Error seeding companies:", error);
    process.exit(1);
  }
}

seedCompanies();
