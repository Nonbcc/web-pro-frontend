import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFormCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]): 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) =>{
        // delete action
        dispatch(removeFormCart(id));
    }

    const checkoutHandler = () =>{
        props.history.push('/signin?redirect=shipping');
    }
    return(
        <div className='cart_background'>
            <div className='row top'>
                <div className='col-2'>
                    <h1 className='your_bag'>Your bag</h1>
                    {cartItems.length === 0?<MessageBox>
                        Bag is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                    :
                    (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <li className='bag_between' key={item.product}>
                                        <div className='row'>
                                            <div>
                                                <img src={item.image} alt={item.name} className='small'></img>
                                            </div>
                                            <div>
                                                <div className='bag_name'>
                                                    <Link to={`/product/${item.product}`} className='bag_nameColor'>{item.name}</Link>
                                                </div>
                                                <button className='delete_button' type="button" onClick={() => removeFromCartHandler(item.product)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                            </div>
                                            <div>
                                                <div className='bag_price'>${item.price.toFixed(2)}</div>
                                                <div className='qty'>
                                                    <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map( x => (
                                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                    }
                </div>
                <div className='col-3'>
                    <div className='card2 card-body2'>
                        <ul>
                            <li>
                                <h2 className='subtotal'>
                                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a,c) => a + c.price * c.qty, 0).toFixed(2)}
                                </h2>
                            </li>
                            <li>
                                <button type='button' onClick={checkoutHandler} className='proceed' disabled={cartItems.length === 0}>
                                    Proceed to checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}