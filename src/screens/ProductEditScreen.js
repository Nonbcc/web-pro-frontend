import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [nickname, setNickname] = useState('');
    const [botanical_name, setBotanical_name] = useState('');
    const [category, setCategory] = useState('');
    const [count_in_stock, setCount_in_stock] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImage_url] = useState('');
    const [image_file, setImage_file] = useState('');
    
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, products} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(successUpdate){
            props.history.push('/productlist');
        }
        if(!products || (products._id !== productId) || successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        } else{
            setName(products.name);
            setPrice(products.price);
            setNickname(products.nickname);
            setBotanical_name(products.botanical_name);
            setCategory(products.category);
            setCount_in_stock(products.count_in_stock);
            setDescription(products.description);
            setImage_url(products.image_url);
            setImage_file(products.image_file);
        }
    }, [products, dispatch, productId, props.history, successUpdate]);
  const submitHandler = (e) => {
      e.preventDefault();
      // TODO: dispatch update product
      dispatch(updateProduct({_id: productId,
    name, price, nickname, botanical_name, category, count_in_stock, description, image_url, image_file}))
  }
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const uploadFileHandler = async(e) =>{
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('image_file', file);
      setLoadingUpload(true);
      try{
          const {data} = await Axios.post('/api/uploads', bodyFormData, {
              headers: {'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
            }
          });
          setImage_file(data);
          setLoadingUpload(false);
      } catch (error) {
          setErrorUpload(error.message);
          setLoadingUpload(false);
      }
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
          <div>
              <h1>Edit Product {productId}</h1>
          </div>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
          {loading? <LoadingBox></LoadingBox>
          :
          error? <MessageBox variant='danger'>{error}</MessageBox>
          :
          <>
            <div className='shipping_input'>
                <label htmlFor='name'>Name</label>
                <input id='name' type='text' placeholder='Enter name' value={name}
                onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='price'>Price</label>
                <input id='price' type='text' placeholder='Enter price' value={price}
                onChange={(e) => setPrice(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='nickname'>Nickname</label>
                <input id='nickname' type='text' placeholder='Enter nickname' value={nickname}
                onChange={(e) => setNickname(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='botanical_name'>Botanical_name</label>
                <input id='botanical_name' type='text' placeholder='Enter botanical_name' value={botanical_name}
                onChange={(e) => setBotanical_name(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='category'>Category</label>
                <input id='category' type='text' placeholder='Enter category' value={category}
                onChange={(e) => setCategory(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='count_in_stock'>Count_in_stock</label>
                <input id='count_in_stock' type='text' placeholder='Enter count_in_stock' value={count_in_stock}
                onChange={(e) => setCount_in_stock(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='description'>Description</label>
                <textarea id='description' rows='3' type='text' placeholder='Enter description' value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className='shipping_input'>
                <label htmlFor='image_url'>Image url</label>
                <input id='image_url' type='text' placeholder='Enter image_url' value={image_url}
                onChange={(e) => setImage_url(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='image_file'>Image file</label>
                <input id='image_file' type='text' placeholder='Enter image_file' value={image_file}
                onChange={(e) => setImage_file(e.target.value)}></input>
            </div>
            <div className='shipping_input'>
                <label htmlFor='imageFile'>Choose image file</label>
                <input type="file" id='imageFile' label='Choose Image'
                onChange={uploadFileHandler}></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && <MessageBox variant='danger'>{errorUpload}</MessageBox>}
            </div>
            <div>
                <label></label>
                <button className='update_button' type='submit'>
                    Update
                </button>
            </div>
          </>
          }
      </form>
    </div>
  )
}
