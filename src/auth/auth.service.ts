import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from './dto/user-register.dto';
import { v4 } from 'uuid';
import { validate } from 'email-validator';
import { createTransport } from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(userData: UserDto) {
    const user = await this.userModel.findOne({ email: userData.email }).exec();

    if (user)
      return {
        status: 403,
        text: 'Пользователь с такой почтой уже существует',
      };
    if (!validate(userData.email))
      return { status: 403, text: 'Проверьте адрес электронной почты' };
    const activateCode = v4();
    const newUser = new this.userModel({
      ...userData,
      uid: (await this.userModel.count()) + 1,
      activateCode,
    });

    const transporter = createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      auth: {
        user: 'noreply@voronin.xyz', // generated ethereal user
        pass: 'Qpwoei@123456', // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: 'Movie Seach App <noreply@voronin.xyz>', // sender address
      to: userData.email, // list of receivers
      subject: 'Подтверждение аккаунта', // Subject line
      text: `Ваш код подтверждения`, // plain text body
      html: `
      <div>
        <h1>Подтверждение аккаунта</h1>
        <p>Для подтверждения аккаунта нажмите на кнопку ниже. Если Вы ничего не делали просто проигнорируйте это письмо.</p>
        <a href="//localhost:3000/verify?key=${activateCode}" class="button">Продолжить</a>
      </div>
      <style>
        h1, p {
          text-align: center;
        }
        p {
          margin-top: 30px;
          margin-bottom: 30px;
        }
        a {
          padding: 15px 25px;
          color: white;
          background: #4080e5;
          display: block;
          margin: 0 auto;
          text-decoration: none;
          max-width: 450px;
          text-align: center;
          border-radius: 8px;
        }
      </style>
      `, // html body
    });

    return newUser.save();
  }

  async authUser(userData: UserDto) {
    const user = await this.userModel.findOne({email: userData.email, password: userData.password}).exec()

    if(!user) return {status: 404, text: "Пользователь не найден"}

    return user
  }

}
