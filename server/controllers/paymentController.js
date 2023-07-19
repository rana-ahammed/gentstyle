import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentRequest = async (req, res) => {
    const line_items = req.body.data.cartProducts.map((product) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    metadata: {
                        id: product._id
                    }
                },
                unit_amount: product.price * 100
            },
            quantity: product.quantity
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        phone_number_collection: {
            enabled: true
        },
        shipping_address_collection: { allowed_countries: ['BD'] },
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`
    });

    res.send({ url: session.url });
};

export default paymentRequest;
