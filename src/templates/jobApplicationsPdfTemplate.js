export const JOB_APPLICATIONS_PDF_TEMPLATE = (
  job,
  applicants,
  formattedDate,
  formattedTime
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Applications for ${job.title}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      color: #1f2937;
      line-height: 1.6;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header img {
      max-height: 60px;
      margin-bottom: 12px;
    }
    .header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .header p {
      margin: 5px 0 0;
      font-size: 1rem;
      opacity: 0.9;
    }
    .container {
      background: #ffffff;
      max-width: 950px;
      margin: -30px auto 40px;
      padding: 35px;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }
    h2 {
      margin-top: 0;
      font-size: 1.6rem;
      font-weight: 600;
      color: #111827;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 10px;
    }
    .summary {
      margin: 15px 0 25px;
      font-size: 1rem;
      color: #4b5563;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-top: 20px;
      font-size: 0.95rem;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
    }
    th, td {
      padding: 14px 12px;
      text-align: left;
    }
    th {
      background-color: #f3f4f6;
      font-weight: 600;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }
    tr {
      transition: background 0.2s ease-in-out;
    }
    tr:nth-child(even) {
      background-color: #fafafa;
    }
    tr:hover {
      background-color: #eef2ff;
    }
    td {
      border-bottom: 1px solid #e5e7eb;
      color: #1f2937;
    }
    td:first-child, th:first-child {
      text-align: center;
      width: 50px;
    }
    footer {
      text-align: center;
      margin: 30px 0 20px;
      font-size: 0.9rem;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="header">
     <img src="https://img.icons8.com/ios-filled/100/ffffff/briefcase.png" 
         alt="JobConnect Logo" width="60" height="60" />
    <h1>JobConnect</h1>
    <p>Connecting Talent with Opportunity</p>
  </div>
  <div class="container">
    <h2>Applications for ${job.title}</h2>
    <p class="summary">Total Applications: <strong>${
      applicants.length
    }</strong></p>
    <table>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Date Applied</th>
        </tr>
      </thead>
      <tbody>
       ${applicants
         .map(
           (app, idx) => `
    <tr>
     <td>${idx + 1 || "N/A"}</td>
      <td>${
        app.applicant?.name ||
        (app.applicant?.fName
          ? app.applicant?.fName + " " + app.applicant?.lName
          : "N/A")
      }</td>
      <td>${app.applicant?.email || "N/A"}</td>
      <td>${app.status || "Pending"}</td>
      <td>${new Date(app.createdAt).toLocaleDateString()}</td>
    </tr>`
         )
         .join("")}
      </tbody>
    </table>
  </div>
  <footer>
    Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      Generated on ${formattedDate} at ${formattedTime}
  </footer>
</body>
</html>
`;
