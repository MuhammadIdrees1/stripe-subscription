// const express = require("express");
// const app = express();
// const cors = require("cors");

// // This is your test secret API key.
// const stripe = require("stripe")(
//   "sk_test_51Ng5EQJxOIuzERdmkbqrz2TFJV7kCV6nrmzNx0XuCmJ0qQJfn0Tsm61FhyTVKiu1Ss6hV49CZ8kLLECb5KUoIPMi00NRsPmkgm"
// );

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.use(express.static("public"));
// app.use(express.json());

// const priceIDs = {
//   free: "prod_R4q7mJNZKCmaUV",
//   basic: "price_1QCgOQJxOIuzERdmAUDxk8zq",
//   premium: "price_1QCgPkJxOIuzERdmtHTUgP1g",
// };

// // Helper function to create subscription

// const createSubscription = async (customerId, priceId) => {
//   console.log(priceId, customerId);
//   return stripe.subscriptions.create({
//     customer: customerId,
//     items: [{ price: priceId }],
//     payment_behavior: "default_incomplete",
//     expand: ["latest_invoice.payment_intent"],
//   });
// };

// app.post("/create-subscription", async (req, res) => {
//   const { email, pricePlan } = req.body;

//   try {
//     // Check for existing customer by email
//     const existingCustomers = await stripe.customers.list({ email });
//     const customer =
//       existingCustomers.data.length > 0
//         ? existingCustomers.data[0]
//         : await stripe.customers.create({ email });

//     // Create a Checkout Session for the subscription
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "subscription",
//       customer: customer.id,
//       line_items: [
//         {
//           price: priceIDs[pricePlan],
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:3000/success", // Adjust the URL as needed
//       cancel_url: "http://localhost:3000/cancel", // Adjust the URL as needed
//     });

//     // Send session ID to frontend
//     res.send({ sessionId: session.id });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(400).send({ error: { message: error.message } });
//   }
// });

// const endpointSecret =
//   "whsec_1c2f192d3c65b5da8468d0b1136d82dafb67d33829b6f7373c943e6939a6f58c"; // Replace with your actual webhook secret from Stripe

// const handleSubscriptionCreated = (subscription) => {
//   console.log("Subscription created:", subscription.id);
//   // Add logic to handle subscription creation, e.g., saving to your database
// };

// // const handleSubscriptionUpdated = (subscription) => {
// //   console.log("Subscription updated:", subscription.id);
// //   // Add logic to handle subscription updates, e.g., status changes (paused, resumed, etc.)
// // };

// const handleSubscriptionDeleted = (subscription) => {
//   console.log("Subscription deleted:", subscription.id);
//   // Add logic to handle subscription cancellation
// };

// const handlePaymentSucceeded = (invoice) => {
//   console.log("Payment succeeded for invoice:", invoice.id);
//   // Handle successful payment
// };

// const handlePaymentFailed = (invoice) => {
//   console.log("Payment failed for invoice:", invoice.id);
//   // Handle failed payment, e.g., notify the user or take action on subscription
// };

// const handleSubscriptionUpdated = (subscription) => {
//   const status = subscription.status;
//   console.log(`Subscription ${subscription.id} updated with status: ${status}`);

//   switch (status) {
//     case "active":
//       console.log("Subscription resumed or active.");
//       // Handle active or resumed subscription
//       break;
//     case "paused":
//       console.log("Subscription paused.");
//       // Handle paused subscription
//       break;
//     case "canceled":
//       console.log("Subscription canceled.");
//       // Handle canceled subscription
//       break;
//     // Handle other statuses like 'incomplete', 'past_due', etc.
//   }
// };

// app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.log(`⚠️  Webhook signature verification failed.`, err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case "customer.subscription.created":
//       handleSubscriptionCreated(event.data.object);
//       break;
//     case "customer.subscription.updated":
//       handleSubscriptionUpdated(event.data.object);
//       break;
//     case "customer.subscription.deleted":
//       handleSubscriptionDeleted(event.data.object);
//       break;
//     case "invoice.payment_succeeded":
//       handlePaymentSucceeded(event.data.object);
//       break;
//     case "invoice.payment_failed":
//       handlePaymentFailed(event.data.object);
//       break;
//     // Add other event types here as needed
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   res.status(200).send("Received");
// });

// app.post("/check-subscription-status", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const existingCustomers = await stripe.customers.list({ email });
//     if (existingCustomers.data.length === 0) {
//       return res.json({ subscriptionStatus: "No customer found" });
//     }

//     const customer = existingCustomers.data[0];

//     const subscriptions = await stripe.subscriptions.list({
//       customer: customer.id,
//       status: "all",
//       limit: 1,
//     });

//     if (subscriptions.data.length === 0) {
//       return res.json({ subscriptionStatus: "No active subscription" });
//     }

//     const subscription = subscriptions.data[0];
//     console.log(subscription, "subscription");
//     res.json({ subscriptionStatus: subscription.status });
//   } catch (error) {
//     console.error("Error checking subscription status:", error);
//     res.status(400).send({ error: { message: error.message } });
//   }
// });

// app.listen(5000, () => console.log("Node server listening on port 5000!"));

const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Ng5EQJxOIuzERdmkbqrz2TFJV7kCV6nrmzNx0XuCmJ0qQJfn0Tsm61FhyTVKiu1Ss6hV49CZ8kLLECb5KUoIPMi00NRsPmkgm"
); // Secret key

// Webhook to handle subscription events
const endpointSecret =
  "whsec_1c2f192d3c65b5da8468d0b1136d82dafb67d33829b6f7373c943e6939a6f58c"; // Replace with your webhook secret

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

// Subscription Price IDs
const priceIDs = {
  Starter: "prod_R4q7mJNZKCmaUV",
  Company: "price_1QCgOQJxOIuzERdmAUDxk8zq",
  Enterprise: "price_1QCgPkJxOIuzERdmtHTUgP1g",
};

// Helper function to update subscription status
const updateSubscription = async (subscriptionId, data) => {
  return stripe.subscriptions.update(subscriptionId, data);
};

// 1. Create or Update Subscription API
app.post("/create-subscription", async (req, res) => {
  const { email, pricePlan } = req.body;

  try {
    // Check if customer exists
    const customers = await stripe.customers.list({ email });
    const customer =
      customers.data.length > 0
        ? customers.data[0]
        : await stripe.customers.create({ email });

    // Create a new subscription or update the existing one
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceIDs[pricePlan], quantity: 1 }],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.send({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(400).send({ error: { message: error.message } });
  }
});

// 2. Pause Subscription API
app.post("/pause-subscription", async (req, res) => {
  const { email } = req.body;
  try {
    const customer = await stripe.customers.list({ email });
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      status: "active",
      limit: 1,
    });
    const subscription = subscriptions.data[0];

    if (subscription) {
      await updateSubscription(subscription.id, {
        pause_collection: { behavior: "void" }, // Pause subscription
      });
      res.send({ status: "paused" });
    } else {
      res.status(404).send({ error: "No active subscription found" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// 3. Resume Subscription API
app.post("/resume-subscription", async (req, res) => {
  const { email } = req.body;
  try {
    const customer = await stripe.customers.list({ email });
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      status: "paused",
      limit: 1,
    });
    const subscription = subscriptions.data[0];

    if (subscription) {
      await updateSubscription(subscription.id, {
        pause_collection: null, // Resume subscription
      });
      res.send({ status: "resumed" });
    } else {
      res.status(404).send({ error: "No paused subscription found" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// 4. Cancel Subscription API
// app.post("/cancel-subscription", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const customer = await stripe.customers.list({ email });
//     const subscriptions = await stripe.subscriptions.list({
//       customer: customer.data[0].id,
//       status: "active",
//       limit: 1,
//     });
//     const subscription = subscriptions.data[0];

//     if (subscription) {
//       await stripe.subscriptions.del(subscription.id); // Cancel subscription
//       res.send({ status: "canceled" });
//     } else {
//       res.status(404).send({ error: "No active subscription found" });
//     }
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

app.post("/cancel-subscription", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email is provided
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    // Fetch the customer by email
    const customers = await stripe.customers.list({ email });

    // Handle case where no customer is found
    if (customers.data.length === 0) {
      return res
        .status(404)
        .send({ error: "No customer found with this email" });
    }

    const customer = customers.data[0];

    // Fetch active subscription for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    // Handle case where no active subscription is found
    if (subscriptions.data.length === 0) {
      return res.status(404).send({ error: "No active subscription found" });
    }

    const subscription = subscriptions.data[0];

    // Cancel the subscription
    await stripe.subscriptions.cancel(subscription.id);

    res.send({ status: "canceled" });
  } catch (error) {
    console.error("Error canceling subscription:", error); // Log the error
    res.status(500).send({ error: error.message });
  }
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case "customer.subscription.created":
      console.log("Subscription created:", event.data.object.id);
      break;
    case "customer.subscription.updated":
      console.log("Subscription updated:", event.data.object.status);
      break;
    case "customer.subscription.deleted":
      console.log("Subscription deleted:", event.data.object.id);
      break;
    case "invoice.payment_succeeded":
      console.log("Payment succeeded:", event.data.object.id);
      break;
    case "invoice.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("Received");
});

// app.post("/check-subscription-status", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const existingCustomers = await stripe.customers.list({ email });
//     if (existingCustomers.data.length === 0) {
//       return res.json({ subscriptionStatus: "No customer found" });
//     }

//     const customer = existingCustomers.data[0];

//     const subscriptions = await stripe.subscriptions.list({
//       customer: customer.id,
//       status: "all",
//       limit: 1,
//     });

//     if (subscriptions.data.length === 0) {
//       return res.json({ subscriptionStatus: "No active subscription" });
//     }

//     const subscription = subscriptions.data[0];
//     console.log(subscription, "subscription");
//     res.json({ subscriptionStatus: subscription.status });
//   } catch (error) {
//     console.error("Error checking subscription status:", error);
//     res.status(400).send({ error: { message: error.message } });
//   }
// });

// Start the server
app.listen(5000, () => console.log("Node server listening on port 5000!"));
