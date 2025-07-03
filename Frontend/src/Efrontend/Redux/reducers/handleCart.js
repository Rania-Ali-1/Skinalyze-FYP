// handleCart.js Retrieve initial state from localStorage if available
// src/Efrontend/Redux/reducers/handleCart.js

const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const handleCart = (state = getInitialCart(), action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      // Ensure the product has an 'id'. If it doesn't, use a unique identifier like 'name'
      const productWithId = { ...product, id: product.name }; // Using 'name' as a fallback for ID

      // Check if the product exists in the cart based on its 'id'
      const exist = state.find((x) => x.id === productWithId.id);
      if (exist) {
        // If product exists, increment its quantity
        updatedCart = state.map((x) =>
          x.id === productWithId.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        // Otherwise, add a new product with quantity 1
        updatedCart = [...state, { ...productWithId, qty: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "DELITEM":
      const exist2 = state.find((x) => x.id === product.id);
      if (exist2.qty === 1) {
        // If the quantity is 1, remove the product from the cart
        updatedCart = state.filter((x) => x.id !== exist2.id);
      } else {
        // Otherwise, decrement the product quantity
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;

