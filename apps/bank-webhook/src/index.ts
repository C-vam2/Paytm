import express from "express";
import db from "@repo/db/client";


const app = express();

app.use(express.json());

app.post('/hdfcWebhook',async (req,res)=>{
    //TODO : Add zod validation here
    //TODO : Check if this request actually came from hdfc bank, use a webhook secret here
    const paymentInformation:{
        token:string,
        userId:string,
        amount:string
    } = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ]);
        res.json({
            message:"Captured"
        });
    } catch (err) {
        console.error(err);
        res.status(411).json({
            message:"Error while processing webhook"
        });
    }
    
    app.listen(8080,()=>{
        console.log("Server is listening on PORT: 8080")
    })

})