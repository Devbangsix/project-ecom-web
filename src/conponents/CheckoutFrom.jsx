import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import '../stripe.css'
import { saveOrder } from '../api/user'
import uesEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export default function CheckoutForm({dpmCheckerLink}) {
  const token = uesEcomStore((s) => s.token)
  const clearCart = uesEcomStore((s) => s.clearCart)

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
    //   confirmParams: {
    //     // Make sure to change this to your payment completion page
    //     return_url: "http://localhost:3000/complete",
    //   },
    redirect: 'if_required'
    });
    
    if (payload.error) {
      setMessage(payload.error.message);
      toast.error(payload.error.message)
    } else if (payload.paymentIntent.status === 'succeeded'){
            console.log('Ready or saveorder')
            saveOrder(token,payload)
            .then((res) => {
                console.log(res)
                clearCart()
                toast.success('Payment Success')
                navigate('/user/history')
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
      toast.warning('Unsuccessful Payment')
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  }

  return (
    <>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="stripe-button" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
          <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</a>
        </p>
      </div>
    </>
  );
}