const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  try {
    console.log("Tạo transporter...");
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "leduyquan2574@gmail.com",
        pass: "cjng hojw uiwr ooll", // Mật khẩu ứng dụng (app password)
      },
    });

    console.log("Cấu hình nội dung email...");
    const mailOptions = {
      from: "leduyquan2574@gmail.com",
      to: options.email, // đảm bảo options.email là địa chỉ hợp lệ
      subject: options.subject,
      text: options.text,
    };

    console.log("Gửi email...");
    const info = await transporter.sendMail(mailOptions);

    console.log("Email đã gửi:", info.response);
  } catch (error) {
    console.error("Gửi email thất bại:", error);
    throw new Error("Gửi email thất bại!");
  }
};

module.exports = { sendMail };
