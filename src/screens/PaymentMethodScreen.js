import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

export default function PaymentMethodScreen(props) {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  if(!shippingAddress.address){
      props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      props.history.push('/placeorder');
  }
  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
          <div>
              <h1>Payment</h1>
          </div>
          <div>
              <div>
                  <input type="radio" id="paypal" value="PayPal" name="paymentMethod"
                  required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                  <label htmlFor='paypal'>PayPal</label>
              </div>
          </div>
          <div>
              <div>
                  <input type="radio" id="cash" value="Cash" name="paymentMethod"
                  required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                  <label htmlFor='cash'>Cash</label>
              </div>
          </div>
          <div>
              <button className='shipping_button' type="submit">Submit</button>
          </div>
      </form>
    </div>
  )
}
