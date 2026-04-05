import nodemailer from 'nodemailer';

// Configure your email provider (example using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOrderConfirmation = async (order, customerEmail, customerName) => {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₦${(item.price * 1550).toLocaleString()}</td>
    </tr>
  `).join('');

  const html = `
    <h1>Thank you for your order, ${customerName}!</h1>
    <p>Your order <strong>#${order._id}</strong> has been received.</p>
    <p>Total: ₦${(order.totalAmount * 1550).toLocaleString()}</p>
    <h3>Items:</h3>
    <table border="1" cellpadding="5">
      <tr><th>Product</th><th>Qty</th><th>Price</th></tr>
      ${itemsHtml}
    </table>
    <p>We'll notify you when your order ships.</p>
  `;

  await transporter.sendMail({
    from: `"Cherry Classic" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: `Order Confirmation #${order._id}`,
    html
  });
};

export const sendOrderStatusUpdate = async (order, customerEmail, customerName) => {
  await transporter.sendMail({
    from: `"Cherry Classic" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: `Your order #${order._id} is now ${order.status}`,
    html: `<h1>Hello ${customerName},</h1><p>Your order status has been updated to: <strong>${order.status}</strong>.</p>`
  });
};
