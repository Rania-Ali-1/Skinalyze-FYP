const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:8000/api/shipments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: shippingInfo.fullName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip_code: shippingInfo.zipCode,
        country: shippingInfo.country
      }),
    });
    
    const data = await response.json();
    if (response.ok) {
      alert('Shipping information submitted successfully!');
      onSubmit(shippingInfo);  // Call the original onSubmit function
    } else {
      alert('Error: ' + JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit shipping information. Please try again.');
  }
};