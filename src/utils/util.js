const buyArray = (items) => {
  const lineItems = [];
  for (const i in items) {
    lineItems.push({ price: i, quantity: items[i].quantity });
  }
  return lineItems;
};

export const handleClick = async (cart, stripePromise, site) => {
  // When the customer clicks on the button, redirect them to Checkout.
  const { host, port } = site;
  const siteName = `${port==="8000" ? `http://` : `https://`}${host}${port ? `:${port}` : ``}`;
  const lineItems = buyArray(cart);

  // console.log(lineItems);

  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems,
    mode: "payment",
    successUrl: `${siteName}/success`,
    cancelUrl: `${siteName}/cart`,
    billingAddressCollection: "required",
    shippingAddressCollection: {
      allowedCountries: ["US"],
    },
  });
  if (error) {
    alert(error.message);
  }

  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
};
