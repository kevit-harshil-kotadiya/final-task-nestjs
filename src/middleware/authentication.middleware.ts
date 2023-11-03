import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('Administration') private readonly Administration: Model<any>,
    @InjectModel('Student') private readonly Student: Model<any>,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('************************************');
      console.log('inside Middleware');

      const token = req.headers.authorization?.replace('Bearer ','');

      if(!token){
          throw new UnauthorizedException('Please login')
      }

      const decoded = this.jwtService.verify(token,{secret:process.env.KEY});

      const student = await this.Student.findOne({
          _id:decoded._id,
          'tokens.token':token
      })
        // console.log(student);

      const administrator = await this.Administration.findOne({
          _id:decoded._id,
          'tokens.token':token
      })
        // console.log(administrator);
      if(!student && !administrator){
          throw new UnauthorizedException('Please login');
      }

      if (student){
          req.headers['token']=token;
          req['user']=student;
      }

      else if(administrator){
          req.headers['token']=token;
          req['user'] = administrator;
      }
      next();

    } catch (e) {
      throw new UnauthorizedException('Please Authentication');
    }
  }
}
