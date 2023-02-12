import { v4 as uuidv4 } from "uuid";
import { User } from "../../database/src/entities/User";
import bcrypt from "bcrypt";
import { transporter } from "../server";
import jwt from "jsonwebtoken";

export class EmailHelper {
  static async sendVerifyEmail(user: User) {
    const currentURL = "http://localhost:8080";

    const emailToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "1h",
    });

    const mailOptions = {
      from: "rentifyWD@gmail.com",
      to: user.email,
      subject: "Welcome to Rentify",
      html: `<p>Welcome to Rentify, ${user.name}! Please confirm your email address clicking on the link below.</p>
          <p>Link expirers in 6 hours</p>
          <p>Click<a href="${currentURL}/user/verify/${user.id}/${emailToken}" here</a> to verify.</p>`,
    };

    transporter.sendMail(mailOptions);
  }
}
