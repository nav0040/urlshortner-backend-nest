import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService:UrlService){}

    @UseGuards(JwtGuard)
    @Post('shorten')
    async shortenUrl(@Body('originalUrl') originalUrl:string,@Body('userId') userId:string){
        return this.urlService.shortenUrl(originalUrl,userId);
    }


    @Get(':shortCode')
    async getUrl(@Param('shortCode') shortCode:string, @Res() res:Response){
        // return this.urlService.getUrl(shortCode);

        try {
            const originalUrl = await this.urlService.getUrl(shortCode);
            return res.redirect(originalUrl);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message:'Shortened URL is not found'
            })
        }
    }

    @UseGuards(JwtGuard)
    @Post('all')
    async allUserUrls(@Body('userId') userId:string){
        const urls = await this.urlService.allUrls(userId);

        return urls;
    }


    
}
