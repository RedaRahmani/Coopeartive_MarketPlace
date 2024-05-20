import Order from '../models/order.model.js';

// Controller function to create an order
export const createOrder = async (req, res) => {
  try {
    // Extract data from the request body
    const { userRef, items } = req.body;
    console.log(userRef);
    // Create a new order document
    const order = new Order({ userRef, items });
    // Save the order to the database
    await order.save();
    // Respond with the created order
    return res.status(201).json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};