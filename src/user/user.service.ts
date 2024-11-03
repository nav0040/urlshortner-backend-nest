import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDetails } from './user-details.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel:Model<User>){}

    async findByEmail(email:string): Promise<User | null>{
        return this.userModel.findOne({email}).exec();
    }

    async findById(id:string):Promise<User | null>{
        const user= this.userModel.findById(id).exec();
        if(!user) return null;
        return user;
    }

  

    async create(name:string,email:string,hashedPassword:string):Promise<User>{
        const newUser = new this.userModel({
            name,
            email,
            password:hashedPassword,
        })

        return newUser.save()
    }

}
