import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  if (
    req.body.status != "Processing" ||
    req.headers.bankSecret != process.env.BANK_SECRET_HDFC
  ) {
    res.status(403).json({ message: "Error processing request" });
    return;
  }

  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  console.log(paymentInformation);
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      message: "Captured",
    });
  } catch (err) {
    console.error(err);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(8010, () => {
  console.log("Server is listening on PORT: 8080");
});
