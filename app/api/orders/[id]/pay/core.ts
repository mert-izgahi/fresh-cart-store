import { IOrder } from "@/server/models/Order.model";
import { ICartItem } from "@/types";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (order: IOrder) => {
    try {
        console.log("Generating Stripe Session");
        const session = await stripe.checkout.sessions.create({
            line_items: order.orderItems.map((product: ICartItem) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: [product.image],
                            description: product.name,
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: product.quantity,
                };
            }),
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
            customer_email: order.email,
            client_reference_id: order._id.toString(),
            metadata: {
                orderId: order._id.toString(),
                email: order.email,
                name: order.name,
                address: order.shippingAddress?.address,
                postalCode: order.shippingAddress?.postalCode,
            },
        });

        return session;
    } catch (e: any) {
        throw new Error(e);
    }
};
