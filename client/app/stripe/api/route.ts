import { ProductInfo } from "@/types";
import { NextRequest } from "next/server";

const Stripe = require("stripe");

const stripe = Stripe( process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const requestHeaders = new Headers(req.headers);
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1Ob4w3EcGCnFBxMmlsre3ZNS" },
        { shipping_rate: "shr_1Ob4xBEcGCnFBxMmgMpHYM1q" },
      ],
      line_items: data.map((item: ProductInfo) => {

        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            `https://cdn.sanity.io/images/qi9trivd/production/`
          )
          .replace("-webp", ".webp");
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${requestHeaders.get("origin")}/success`,
      cancel_url: `${requestHeaders.get("origin")}/canceled`,
    };
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);

    return new Response(JSON.stringify(session), {
      headers: {
        "Authorization": `${process.env.STRIPE_SECRET_KEY}`
      },
      status: 200,
    });
  } catch (err: any) {
    // res.status(err.statusCode || 500).json(err.message);
    return new Response(err.message, {
      status: err.statusCode || 500,
    });
  }
  // } else {
  //   res.setHeader("Allow", "POST");
  //   res.status(405).end("Method Not Allowed");
  // }
}