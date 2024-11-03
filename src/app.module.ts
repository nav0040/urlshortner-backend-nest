import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://naveendev004:DmbM4xcafWh9W9tm@cluster0.u6a6pdz.mongodb.net/urlshortner?retryWrites=true&w=majority"),
    AuthModule, 
    UserModule, UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
