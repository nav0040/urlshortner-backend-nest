import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class Url extends Document{
    @Prop({ required: true })
    originalUrl: string;

    @Prop({ required:true, unique: true})
    shortCode:string;

    @Prop({ required:true, ref:'User'})
    userId:string;

}


export const UrlSchema = SchemaFactory.createForClass(Url);