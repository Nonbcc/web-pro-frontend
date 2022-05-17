import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createdOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100? toPrice(0): toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () =>{
        dispatch(createdOrder({...cart, orderItems: cart.cartItems}));
    }

    useEffect(() =>{
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success]);
  return (
    <div className='placeOrder_background'>
      <div className='row top'>
          <div>
              <ul>
                  
                  <li>
                      <div className='card3 card-body3'>
                          <h2 className='order_topic'>Order Items</h2>
                          <ul>
                        {
                            cart.cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className='row'>
                                        <div>
                                            <img src={item.image} alt={item.name} className='small'></img>
                                        </div>
                                        <div className='min-30'>
                                            <Link className=' order_color' to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        
                                        <div className='order_price'>${item.price.toFixed(2)} x{item.qty} = ${(item.qty * item.price).toFixed(2)}</div>
                                        
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                      </div>
                  </li>
              </ul>
          </div>
          <div>
            <div>
                <div className='col-4'>
                    <ul>
                    <li>
                        <div className='card4 card-body4'>
                            <h2 className='order_ship'>Shipping</h2>
                            <p>
                                <strong className='order_ship'>Name:</strong> {cart.shippingAddress.fullName} <br/>
                                <strong className='order_ship'>Address: </strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className='card4 card-body4'>
                            <h2 className='order_ship'>Payment</h2>
                            <p>
                                <strong className='order_ship'>Method:</strong> {cart.paymentMethod}
                            </p>
                        </div>
                    </li>
                    <li>
                    <div className='card4 card-body4'>
                    <ul>
                        <li>
                            <h2 className='order_ship'>Order Summary</h2>
                        </li>
                        <li>
                            <div className='row'>
                                <div className='order_ship'>Subtotal</div>
                                <div>${cart.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div className='order_ship'>Delivery</div>
                                <div>${cart.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div className='order_ship'>Tax</div>
                                <div>${cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div className='order_ship'><strong>Total</strong></div>
                                <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div></div>
                                <button type='button' onClick={placeOrderHandler} className="placeOrder_button" disabled={cart.cartItems.length === 0}>
                                    Place Order
                                </button>
                            </div>
                        </li>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </ul>
                </div>
                    </li>
                    </ul>
                </div>
                
            </div>
          </div>
      </div>
    </div>
  )
}
