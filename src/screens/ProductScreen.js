import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector( state => state.productDetails);
    const {loading, error, products} = productDetails;
    console.log(products)

    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);
    
    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty= ${qty}`);
    }
    return (
    <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div>
            <Link to="/"><ArrowBackIcon className='arrowBack'/></Link>
            <div className="wrapper">
                <div className="product-img">
                    <img src={products.image_file} height="500" width="500" alt={products.name}/>
                </div>
                <div className="product-info">
                <div className="product-text">
                    <h1>{products && products.name}</h1>
                    <h2>{products.botanical_name}</h2>
                    <h2>{products.nickname}</h2>
                    <div className='plant_price_count'>${products.price.toFixed(2)}  {products.count_in_stock > 0 ? (
                        <span className='success'>In Stock</span>
                        ) : (
                        <span className='danger'>Unavailable</span>
                        )}</div>
                    <div className='des_header'>Why we love {products.name}</div>
                    <p>{products.description}</p>
                    <div className="product-price-btn">
                        <span>{products.count_in_stock > 0 && (
                                    <>
                                    
                                        <div className='row'>
                                            <div>
                                                <select className='qty_cnt' value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(products.count_in_stock).keys()].map( x => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                    
                                )}</span>
                        <div>
                            {products.count_in_stock > 0 ? (
                                <button onClick={addToCartHandler}>Add to bag</button>
                            ) : null}
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
        )}
    </div>

    
    )
}