import emailjs from "emailjs-com";

export const sendOrderEmail = (orderDetails) => {
  if (!orderDetails || !orderDetails.customer_email) {
    console.error("Order details or customer email is missing!");
    return;
  }

  const emailParams = {
    email: orderDetails.customer_email, 
    order_id: orderDetails.order_number,  // Fix key name to match template
    "cost.shipping": orderDetails.shipping_cost, // Fix key name
    "cost.tax": orderDetails.tax_amount,
    "cost.total": orderDetails.total_cost,
    orders: orderDetails.orders, // Ensure correct array key
  };
  
  emailjs
    .send(
      "service_bc95y5s",  
      "template_7ea2fbv", 
      emailParams,
      "qZvXNer7TdQtHGWTw" 
    )
    .then((response) => {
      console.log("Email sent successfully!", response);
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
    });
};