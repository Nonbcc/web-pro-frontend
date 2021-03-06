import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;

  const dispatch = useDispatch();
  useEffect(() =>{
      if(successUpdate){
          dispatch({type: USER_UPDATE_RESET});
          props.history.push('/userlist');
      }
      if(!user){
          dispatch(detailsUser(userId));
      } else {
          setName(user.name);
          setEmail(user.email);
      }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) =>{
      e.preventDefault();
      // dispatch update user
      dispatch(updateUser({_id: userId, name, email}))
  }
  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
          <div>
            <h1>Edit User {name}</h1>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
          </div>
          {loading? <LoadingBox/>:
          error? <MessageBox variant='danger'>{error}</MessageBox>
          :
          <>
          <div className='shipping_input'>
              <label htmlFor='name'>Name</label>
              <input id='name' type='text' placeholder='Enter name' value={name} onChange={(e) =>setName(e.target.value)}></input>
          </div>
          <div className='shipping_input'>
              <label htmlFor='email'>Email</label>
              <input id='email' type='email' placeholder='Enter email' value={email} onChange={(e) =>setEmail(e.target.value)}></input>
          </div>
          <div>
              <button type='submit' className='update_button'>
                  Update
              </button>
          </div>
          </>
          }
      </form>
    </div>
  )
}
