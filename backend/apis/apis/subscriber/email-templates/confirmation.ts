export function confirmationTemplate(name: string, confirmUrl: string, origin: string): string {
  const photoUrl = 'https://d2j3yisnywcb30.cloudfront.net/pix/idle-loop-poster-new.png';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm your subscription</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <tr>
            <td style="padding:0;line-height:0;">
              <img src="${photoUrl}" alt="Naeem Gitonga" width="560"
                   style="display:block;width:100%;max-width:560px;" />
            </td>
          </tr>
          <tr>
            <td style="background-color:#111827;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;">
                Naeem Gitonga
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#374151;">
                Hi ${name},
              </p>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#374151;">
                Thanks for signing up. Click below to confirm your subscription — you'll get an email whenever a new article goes live.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:#111827;">
                    <a href="${confirmUrl}"
                       style="display:inline-block;padding:14px 36px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Confirm Subscription
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#9ca3af;">
                If the button doesn't work, copy and paste this link into your browser:<br />
                <a href="${confirmUrl}" style="color:#6b7280;word-break:break-all;">${confirmUrl}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;">
                You're receiving this because you signed up at naeemgitonga.com.<br />
                If you didn't sign up, you can safely ignore this email.<br /><br />
                This email was sent from an unmonitored address. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
