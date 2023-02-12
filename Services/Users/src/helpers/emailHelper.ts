import { v4 as uuidv4 } from "uuid";
import { User } from "../../database/src/entities/User";
import bcrypt from "bcrypt";
import { transporter } from "../server";
import jwt from "jsonwebtoken";

export class EmailHelper {
  static async sendVerifyEmail(user: User) {
    const currentURL = "http://localhost:7000";

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

  static async sendChangePasswordEmail(user: User) {
    const currentURL = "http://localhost:8080";

    const passwordToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ?? "",
      {
        expiresIn: "2h",
      }
    );

    const mailOptions = {
      from: "rentifyWD@gmail.com",
      to: user.email,
      subject: "Change password",
      html: `<p>Hello ${user.name}! To change your password click on the link below.</p>
          <p>Link expires in 1 hour</p>
          <p>Click<a href="${currentURL}/changePassword/${user.id}/${passwordToken}" here</a> to change password.</p>`,
    };

    transporter.sendMail(mailOptions);
  }
}
