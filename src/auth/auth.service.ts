import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import  * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ){}

    async hashPassword(password: string):Promise<string>{
        return bcrypt.hash(password, 12);
    }


    async register(name:string,email:string, password:string){
        const existingUser = await this.userService.findByEmail(email);

        if(existingUser){
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.userService.create(name,email,hashedPassword);

        const { password:_,...result} = newUser.toObject();

        const jwt = await this.jwtService.signAsync({ result });

        const userData = {...result,token:jwt}

        return userData;

    }

    async validateUser(email:string, password:string):Promise<any>{
        const user = await this.userService.findByEmail(email);

        if(user && (await bcrypt.compare(password,user.password))){
            const { password, ...result} = user.toObject();

            
            return result;
        }

        return null;
    }

    async login(email:string, password:string){
        const user = await this.validateUser(email,password);

        if(!user){
            throw new UnauthorizedException('Invalid email or password');
        }

        const jwt = await this.jwtService.signAsync({ user });

        const userData = {...user,token:jwt}

        return userData;
    }
}
