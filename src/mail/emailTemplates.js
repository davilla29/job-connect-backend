export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Verify Your Email - JobConnect</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f5;">

  <!-- Header / Logo -->
  <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 30px; text-align: center;">
    <img src="https://img.icons8.com/ios-filled/100/ffffff/briefcase.png" 
         alt="JobConnect Logo" width="50" height="50" style="display:block; margin:0 auto 10px;" />
    <h1 style="color: white; margin: 0; font-size: 1.8rem; font-weight: bold;">
      JobConnect
    </h1>
    <p style="color: #e0e7ff; margin-top: 5px; font-size: 0.95rem;">
      Connecting Talent with Opportunity
    </p>
  </div>

  <!-- Body -->
  <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h2 style="color: #1f2937; margin-top: 0;">Verify Your Email</h2>
    <p style="color: #374151; font-size: 0.95rem;">Hello, <strong>{userName}</strong> 👋</p>
    <p style="color: #374151; font-size: 0.95rem;">Thanks for signing up with <strong>JobConnect</strong>! To complete your registration, please verify your email address using the code below:</p>

    <!-- Verification Code -->
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 1.8rem; font-weight: bold; letter-spacing: 6px; color: #2563eb; background-color:#eff6ff; padding:10px 20px; border-radius:8px; display:inline-block;">
        {verificationCode}
      </span>
    </div>

    <p style="color: #374151; font-size: 0.9rem;">Enter this code on the verification page. For security reasons, this code will expire in <strong>15 minutes</strong>.</p>

    <!-- CTA Button -->
    <div style="text-align:center; margin: 35px 0;">
      <a href="{verificationLink}" 
         style="background: linear-gradient(to right, #3b82f6, #2563eb); color:#ffffff; text-decoration:none; font-weight:600; padding:12px 24px; border-radius:8px; display:inline-block; font-size:0.95rem;">
        Verify My Account
      </a>
    </div>

    <p style="color: #6b7280; font-size: 0.85rem;">If you didn’t sign up for JobConnect, you can safely ignore this email.</p>

    <p style="margin-top: 30px; color:#374151; font-size:0.9rem;">
      Best regards,<br/>
      <strong>JobConnect Team</strong><br/>
      Connecting Talent with Opportunity
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 0.75rem;">
    <p>This is an automated message from JobConnect. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to JobConnect!</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f5;">

  <!-- Header / Logo -->
  <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 30px; text-align: center;">
    <img src="https://img.icons8.com/ios-filled/100/ffffff/briefcase.png" 
         alt="JobConnect Logo" width="50" height="50" style="display:block; margin:0 auto 10px;" />
    <h1 style="color: white; margin: 0; font-size: 1.8rem; font-weight: bold;">
      JobConnect
    </h1>
    <p style="color: #e0e7ff; margin-top: 5px; font-size: 0.95rem;">
      Connecting Talent with Opportunity
    </p>
  </div>

  <!-- Body -->
  <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h2 style="color: #1f2937; margin-top: 0;">Welcome to JobConnect!</h2>
    <p style="color: #374151; font-size: 0.95rem;">Hello, <strong>{userName}</strong> 👋</p>
    <p style="color: #374151; font-size: 0.95rem;">
      We're thrilled to have you join our community! JobConnect is all about connecting talented individuals like you with amazing opportunities.
    </p>

    <!-- Introduction / Highlights -->
    <ul style="color: #374151; font-size: 0.95rem; padding-left: 20px;">
      <li>Showcase your skills and experience on your profile.</li>
      <li>Explore curated job opportunities tailored to you.</li>
      <li>Stay updated with our latest blog articles and resources.</li>
    </ul>

    <!-- Portfolio / CTA -->
    <div style="text-align:center; margin: 30px 0;">
      <a href="https://bolarinwadavid.vercel.app/" 
         style="background: linear-gradient(to right, #3b82f6, #2563eb); color:#ffffff; text-decoration:none; font-weight:600; padding:12px 24px; border-radius:8px; display:inline-block; font-size:0.95rem;">
        View My Portfolio
      </a>
    </div>

    <p style="color: #374151; font-size: 0.9rem;">
      We encourage you to explore, connect, and grow. Your journey starts here!
    </p>

    <p style="margin-top: 30px; color:#374151; font-size:0.9rem;">
      Best regards,<br/>
      <strong>Bolarinwa David</strong><br/>
      JobConnect Team<br/>
      Connecting Talent with Opportunity
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 0.75rem;">
    <p>This is an automated message from JobConnect. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reset Your Password - JobConnect</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f5;">

  <!-- Header / Logo -->
  <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 30px; text-align: center;">
    <img src="https://img.icons8.com/ios-filled/100/ffffff/briefcase.png" 
         alt="JobConnect Logo" width="50" height="50" style="display:block; margin:0 auto 10px;" />
    <h1 style="color: white; margin: 0; font-size: 1.8rem; font-weight: bold;">
      JobConnect
    </h1>
    <p style="color: #e0e7ff; margin-top: 5px; font-size: 0.95rem;">
      Connecting Talent with Opportunity
    </p>
  </div>

  <!-- Body -->
  <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h2 style="color: #1f2937; margin-top: 0;">Reset Your Password</h2>
    <p style="color: #374151; font-size: 0.95rem;">Hello 👋</p>
    <p style="color: #374151; font-size: 0.95rem;">We received a request to reset your <strong>JobConnect</strong> password. If you did not request this, you can safely ignore this email.</p>

    <!-- CTA Button -->
    <div style="text-align:center; margin: 35px 0;">
      <a href="{resetURL}" 
         style="background: linear-gradient(to right, #3b82f6, #2563eb); color:#ffffff; text-decoration:none; font-weight:600; padding:12px 24px; border-radius:8px; display:inline-block; font-size:0.95rem;">
        Reset Password
      </a>
    </div>

    <p style="color: #374151; font-size: 0.9rem;">This link will expire in <strong>10 minutes</strong> for security reasons.</p>

    <p style="margin-top: 30px; color:#374151; font-size:0.9rem;">
      Best regards,<br/>
      <strong>JobConnect Team</strong>
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 0.75rem;">
    <p>This is an automated message from JobConnect. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Password Reset Successful - JobConnect</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f5;">

  <!-- Header / Logo -->
  <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 30px; text-align: center;">
    <img src="https://img.icons8.com/ios-filled/100/ffffff/briefcase.png" 
         alt="JobConnect Logo" width="50" height="50" style="display:block; margin:0 auto 10px;" />
    <h1 style="color: white; margin: 0; font-size: 1.8rem; font-weight: bold;">
      JobConnect
    </h1>
    <p style="color: #e0e7ff; margin-top: 5px; font-size: 0.95rem;">
      Connecting Talent with Opportunity
    </p>
  </div>

  <!-- Body -->
  <div style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h2 style="color: #1f2937; margin-top: 0;">Password Reset Successful</h2>
    <p style="color: #374151; font-size: 0.95rem;">Hello 👋</p>
    <p style="color: #374151; font-size: 0.95rem;">This is a confirmation that your <strong>JobConnect</strong> account password has been successfully updated.</p>

    <!-- Success Icon -->
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #3b82f6; color: white; width: 55px; height: 55px; line-height: 55px; border-radius: 50%; display: inline-block; font-size: 28px; font-weight: bold;">
        ✓
      </div>
    </div>

    <p style="color: #374151; font-size: 0.95rem;">If you didn’t perform this action, please contact our support team immediately.</p>
    <p style="color: #374151; font-size: 0.9rem;">For stronger security, we recommend that you:</p>
    <ul style="color: #374151; font-size: 0.9rem; padding-left: 20px;">
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication</li>
      <li>Avoid reusing passwords across sites</li>
    </ul>

    <p style="margin-top: 30px; color:#374151; font-size:0.9rem;">
      Stay safe,<br/>
      <strong>JobConnect Security Team</strong>
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 0.75rem;">
    <p>This is an automated message from JobConnect. Please do not reply.</p>
  </div>
</body>
</html>
`;

