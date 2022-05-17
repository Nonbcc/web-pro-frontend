import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from '../../node_modules/react-router-dom/index';
import { listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { prices } from '../utils';

export default function SearchScreen(props) {
    const {name = 'all', category = 'all', min=0, max=0, order = 'newest'} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const productCategoryList = useSelector(state => state.productCategoryList);
    const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList;
    useEffect(() =>{
        dispatch(listProducts({name: name !== 'all' ? name: '', 
        category: category !== 'all' ? category: '',
        min, max, order
        }))
    }, [category ,dispatch, max, min, name, order]);

    const getFilterUrl = (filter) =>{
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0? 0: min;
        const filterMax = filter.max ? filter.max : filter.max === 0? 0: max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}`;
    }
  return (
  <div className='filter'>
    <div className='row-sort'>
        {loading? (<LoadingBox></LoadingBox>)
        :
            error? (<MessageBox variant='danger'>{error}</MessageBox>)
        :
        <div>{products.length} Results</div>
        }
        <div>
            <select className='custom-select' value={order} onChange={e => {props.history.push(getFilterUrl({order: e.target.value}))}}>
                <option value='newest'>Sort by: Newest</option>
                <option value='lowest'>Sort by: Low to high</option>
                <option value='highest'>Sort by: High to low</option>
            </select>
        </div>
    </div>
    <div className='row top'>
        <div>
            <h3>Department</h3>
            <div>
                {loadingCategories? (<LoadingBox></LoadingBox>)
                :
                errorCategories? (<MessageBox variant='danger'>{errorCategories}</MessageBox>)
                :
                <ul>
                    <li>
                    <Link
                        className={'all' === category? 'active': ''}
                        to={getFilterUrl({category:'all'})}>Any</Link>
                    </li>
                    {categories.map(c =>(
                        <li key={c}> 
                        <Link
                        className={c === category? 'active': ''}
                        to={getFilterUrl({category:c})}>{c}</Link>
                        </li>
                    ))}
                </ul>
                }
            </div>
            <div>
                <h3>Price</h3>
                <ul>
                    {prices.map((p) =>(
                    <li key={p.name}>
                        <Link to={getFilterUrl({min: p.min, max: p.max})} className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active': ''}>
                            {p.name}
                        </Link>
                    </li>))}
                </ul>
            </div>
        </div>
        <div className='col-3-sort'>
        {loading? (<LoadingBox></LoadingBox>)
        :
            error? (<MessageBox variant='danger'>{error}</MessageBox>)
        :
        <>
        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
                {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                ))}
            </div>
        </>
        }
        </div>
    </div>
  </div>
  )
}
