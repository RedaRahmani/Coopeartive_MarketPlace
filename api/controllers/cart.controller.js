
import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import stripe from "stripe";

export const addItemToCart = async (req, res) => {
  try {
    const { userRef, productId, quantity, regularPrice, discountPrice, imageUrls, name , sellerId } = req.body;
    console.log(sellerId)
    let cart = await Cart.findOne({ userRef });

    if (!cart) {
      cart = new Cart({ userRef, items: [] });
    }

    // Check if the item is already in the cart
    const existingItem = cart.items.find(item => item.productId === productId);

    // If the item is already in the cart, update its quantity
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Otherwise, add the item to the cart
      cart.items.push({ productId, quantity, regularPrice, discountPrice, imageUrls, name ,sellerId });
    }

    // Save the cart to the database
    await cart.save();

    return res.status(201).json({ cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get the user's cart
export const getUserCart = async (req, res) => {
  try {
    const { userRef } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ userRef });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching user cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update an item's quantity in the cart
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { userRef } = req.params;
    const { productId } = req.body;
    const { quantity } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userRef });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the item in the cart
    const index = cart.items.findIndex(item => item.productId === productId);

    if (index === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    // Update the quantity of the item
    cart.items[index].quantity = quantity;

    // Save the updated cart to the database
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { userRef, productId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ userRef });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Filter out the item to be removed from the cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    // Save the updated cart to the database
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkoutSession = async (req, res) => {
  try {
    const { userRef } = req.params; // Assuming userRef is in the request body
    const stripeSecretKey = process.env.STRIPE_KEY;
    const stripeInstance = stripe(stripeSecretKey);

    console.log(userRef)
    // Retrieve the user's cart from the database
    const cart = await Cart.findOne({ userRef });
    console.log(cart)
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const lineItems = cart.items.map(item => ({
      price_data: {
        currency: 'mad',
        product_data: {
          name: item.name,
          description: 'Product Description',
        },
        unit_amount: item.regularPrice * 100, // Price in cents
      },
      quantity: item.quantity,
    }));
    
    console.log(lineItems)
    // Create a checkout session with Stripe
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems, // Use prepared line items
      success_url: "http://localhost:5173/thankyou",
      cancel_url: "https://example.com/cancel",
    });
    // Return the session ID to the client
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Retrieve cart data based on the session ID
    const cart = await Cart.findOne({ userRef: req.user.id }); // Assuming user is authenticated

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const items = cart.items.map(item => ({
      name: item.name,
      productId: item.productId,
      sellerId: item.sellerId,
      quantity: item.quantity,
      price: item.discountPrice, // or item.regularPrice depending on your logic
    }));

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Assuming you want to create a separate order for each seller
    const orders = await Promise.all(items.map(async (item) => {
      const order = new Order({
        userRef: item.sellerId, // Store the sellerId in userRef
        items: [item],
        totalAmount: item.price * item.quantity,
        status: 'Paid',
      });

      await order.save();
      return order;
    }));

    // Clear the cart after order creation
    await Cart.findOneAndDelete({ userRef: req.user.id });

    return res.status(201).json({ orders });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};