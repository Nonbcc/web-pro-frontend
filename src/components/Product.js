import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
    const {product} = props;
    return (
        <div key={product._id} className="card_home">
                    <Link to={`/product/${product._id}`}>
                        <img className="medium" src={product.image_file} alt={product.name}/>
                    </Link>
                    <div className="card-body_home">
                        <Link to={`/product/${product._id}`}>
                            <h2 className='card_name'>{product.name}</h2>
                        </Link>
                        <div className="botanical_name">
                            {product.botanical_name.toUpperCase()}
                        </div>
                        <div className="price">${product.price.toFixed(2)}</div>
                    </div>
        </div>
    );
}