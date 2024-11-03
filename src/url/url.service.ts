import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './url.schema';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
    constructor(@InjectModel('Url') private urlModel:Model<Url>){}

    async shortenUrl(originalUrl:string, userId:string): Promise<Url>{

        const existingUrl = await this.urlModel.findOne({ originalUrl, userId});
        if(existingUrl){
            throw new BadRequestException("This URL has already been shortened");
        }

        const shortCode = shortid.generate();

        const url = new this.urlModel({ originalUrl,shortCode,userId});
        return url.save();
    }

    async getUrl(shortCode:string):Promise<string>{
        const url = await this.urlModel.findOne({ shortCode});

        if(!url){
            throw new NotFoundException('Shortened URL not found.');
        }

        return url.originalUrl;

    }


    async allUrls(userId:string):Promise<Url[]>{
        return this.urlModel.find({ userId });
    }




}
