import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import uesEcomStore from '../../store/ecom-store';
import CheckoutForm from "../../conponents/CheckoutFrom";

const stripePromise = loadStripe("pk_test_51QQc3ZCv7hEP4aSNrRqxzaSOHJyJohHwyxP45c1i31gGnr9MScSxgEev4EYR3fuVQ7pSFG1RGiW9RWAc0qgjwoii00muBP3iBC");

const Payment = () => {
  const token = uesEcomStore((s) => s.token)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
   payment(token) 
   .then((res) => {
    console.log(res)
    setClientSecret(res.data.clientSecret)
   })
   .catch((err) => {
    console.log(err)
   })
  },[])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      }
    </div>
  )
}

export default Payment