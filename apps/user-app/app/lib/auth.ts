import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import db from "@repo/db/client";

export const authOptions:AuthOptions={
    providers:[
        Credentials({
            name:"Credentials",
            credentials:{
                phone:{label:"Phone number",type:"text",placeholder:"",required:true},
                password:{label:"Password",type:"password",required:true}
            },
            async authorize(credentials:any, req) {
                const hashedPassword = await bcrypt.hash(credentials.password,10);
                const existingUser = await db.user.findFirst({where:{number:credentials.phone}});
                
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password,existingUser.password);
                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.number
                        }
                    }
                    return null;
                }

                try {
                    const user = await db.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword
                        }
                    });
                    return {
                        id:user.id.toString(),
                        name:user.name,
                        email:user.number
                    }
                } catch (err) {
                    console.log(err);
                }
                return null;
            },
        })
    ],
    secret:process.env.JWT_SECRET || "SECRET",
    callbacks:{
        async session({token,session}:any){
            session.user.id = token.id;
            return session;
        }
    }
}