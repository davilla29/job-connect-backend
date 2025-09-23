// import puppeteer from "puppeteer";

// export const generatePDF = async (html) => {
//   // const browser = await puppeteer.launch();
//   const browser = await puppeteer.launch({
//     headless: "new", // or true
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-dev-shm-usage",
//       "--disable-accelerated-2d-canvas",
//       "--no-first-run",
//       "--no-zygote",
//       "--disable-gpu",
//     ],
//   });
//   const page = await browser.newPage();
//   await page.setContent(html, { waitUntil: "networkidle0" });
//   const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
//   await browser.close();
//   return pdfBuffer;
// };

// src/utils/pdfGenerator.js
import { chromium } from "playwright";
let browser;

export const generatePDF = async (html) => {
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true, //needed for consistent stylng
    });

    await browser.close();
    return pdfBuffer;
  } catch (err) {
    console.error("Playwright PDF generation failed:", err);
    throw err;
  } finally {
    if (browser) await browser.close();
  }
};
