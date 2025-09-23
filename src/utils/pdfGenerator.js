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

// // src/utils/pdfGenerator.js
// import { chromium } from "playwright";
// let browser;

// export const generatePDF = async (html) => {
//   try {
//     browser = await chromium.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });
//     const page = await browser.newPage();

//     await page.setContent(html, { waitUntil: "networkidle" });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       preferCSSPageSize: true, //needed for consistent stylng
//     });

//     await browser.close();
//     return pdfBuffer;
//   } catch (err) {
//     console.error("Playwright PDF generation failed:", err);
//     throw err;
//   } finally {
//     if (browser) await browser.close();
//   }
// };

import { chromium } from "playwright";

export const generatePDF = async (html) => {
  let browser;
  try {
    // Launch Chromium with extra args for server environments
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--single-process",
      ],
    });

    const page = await browser.newPage();

    // Set content with timeout and networkidle
    await page.setContent(html, { waitUntil: "networkidle", timeout: 60000 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return pdfBuffer;
  } catch (err) {
    console.error("Playwright PDF generation failed:", err.message || err);
    throw err;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeErr) {
        console.warn("Failed to close browser:", closeErr.message || closeErr);
      }
    }
  }
};
