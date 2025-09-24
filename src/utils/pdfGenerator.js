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


// import { chromium } from "playwright";

// export const generatePDF = async (html) => {
//   let browser;
//   try {
//     // Launch Chromium with extra args for server environments
//     browser = await chromium.launch({
//       headless: true,
//       args: [
//         "--no-sandbox",
//         "--disable-setuid-sandbox",
//         "--disable-dev-shm-usage",
//         "--disable-accelerated-2d-canvas",
//         "--disable-gpu",
//         "--single-process",
//       ],
//     });

//     const page = await browser.newPage();

//     // Set content with timeout and networkidle
//     await page.setContent(html, { waitUntil: "networkidle", timeout: 60000 });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       preferCSSPageSize: true,
//     });

//     return pdfBuffer;
//   } catch (err) {
//     console.error("Playwright PDF generation failed:", err.message || err);
//     throw err;
//   } finally {
//     if (browser) {
//       try {
//         await browser.close();
//       } catch (closeErr) {
//         console.warn("Failed to close browser:", closeErr.message || closeErr);
//       }
//     }
//   }
// };

import pdf from "html-pdf-node";

export const generatePDF = async (html) => {
  try {
    const file = { content: html };

    const pdfBuffer = await pdf.generatePdf(file, {
      format: "A4",
      printBackground: true,
    });

    return pdfBuffer;
  } catch (err) {
    console.error("PDF generation failed:", err.message || err);
    throw err;
  }
};
