export const customerTemplate = (
  links: { s3Url: string; emailTemplateHtml: string }[],
  orderId: string,
  name: string
) => {
  const eachMessage = links.join('');

  return `
  <html>
    <div style="max-width: 1200px; margin: auto; padding: 50px; font-family: 'Roboto', sans-serif; background-color: #fff;">
      <div class="header-container" style="display: flex; justify-content: space-between;">
        <div
          style="
            width: 170px;
            height: 170px;
            border-radius: 50%;
            overflow: hidden;
            background-image: url(https://d2j3yisnywcb30.cloudfront.net/pix/NaeemGitonga.jpg);
            background-position: 50% 20%;
            background-size: 163%;
          "
        ></div>
        <h1 class="logo-subtext" style="margin: auto ; color: black">Thank you for your purchase!</h1>
      </div>
  
      <div class="value-section" style="margin: 25px auto; max-width: 800px; font-size: 24px; margin-bottom: 0">
        <p style="color: black">
          Thank you ${name}, I am truly grateful that you have chosen to shop with me! 
        </p>
  
        ${eachMessage}
  
        <p style="color: black; text-align: left; font-size: 14px; margin-bottom: 0;">
          If you have any questions regarding this order, contact 
          Naeem at <a href="mailto:gtngbooks@gmail.com">gtngbooks@gmail.com</a> and reference this order ID: <strong style="font-weight">${orderId}</strong>.
        </p>
      <footer id="footer"></footer>
    </div>
  </html>
`;
};
