import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ParkIcon from '@mui/icons-material/Park';
import Button from '@mui/material/Button';

function App() {

  const cart = useSelector(state => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }
  const productCategoryList = useSelector(state => state.productCategoryList);
  const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList;
  useEffect(() =>{
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="row">
            <div>
              <button type='button' className='open-sidebar' onClick={() =>setSidebarIsOpen(true)}>
                <i className='fa fa-bars'></i>
              </button>
              <ParkIcon className="tree"/>
                <Link className="brand" to="/">KAI TON MAI</Link>
            </div>
            <div className='search_zone'>
              <Route render={({history}) => <SearchBox history={history}></SearchBox>}></Route>
            </div>
            <div>
                {
                  userInfo ? (
                    <div className='dropdown'>
                      <Link to="#">
                        {userInfo.name} <i className='fa fa-caret-down'></i> 
                      </Link>
                      <ul className='dropdown-content'>
                        <li>
                          <Link to="profile">Profile</Link>
                        </li>
                        <li>
                          <Link to="/orderhistory">History</Link>
                        </li>
                        <li>
                          <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                        </li>
                      </ul>
                    </div>
                  ) :
                  (
                    <Link to="/signin">
                      <Button className='sigin_button' style={{
                        borderRadius: 8,
                        backgroundColor: "#D6A123",
                        color: '#FAFAFA',
                        fontSize: "1.5rem"

                    }}  variant="contained">Sign in</Button>
                    </Link>
                  )
                }
                {userInfo && userInfo.isAdmin && (
                  <div className='dropdown'>
                    <Link to="#admin">Admin {' '} <i className='fa fa-caret-down'></i></Link>
                    <ul className='dropdown-content'>
                      <li>
                        <Link to="/productlist">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">Orders</Link>
                      </li>
                      <li>
                        <Link to="/userlist">Users</Link>
                      </li>
                      <li>
                        <Link to="/support">Support</Link>
                      </li>
                    </ul>
                  </div>
                )}
                <Link to="/cart"><ShoppingBagIcon className="bag"/>
                {cartItems.length > 0 && (
                  <span className='badge'>{cartItems.length}</span>
                )}
                </Link>
            </div>
        </header>
        <aside className={sidebarIsOpen? 'open': ''}>
          <ul className='categories'>
            <li>
              <strong>Categories</strong>
              <button onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type='button'
              >
                <i className='fa fa-close'></i>
              </button>
            </li>
            {loadingCategories? (<LoadingBox></LoadingBox>)
            :
            errorCategories? (<MessageBox variant='danger'>{errorCategories}</MessageBox>)
            : (
              categories.map((c) =>(
                <li key={c}>
                  <Link to={`/search/category/${c}`} onClick={() =>setSidebarIsOpen(false)}>{c}</Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/order/:order" component={SearchScreen} exact></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}/>}
        <footer className='footer'>
          <div className='footer-left'>
            <ParkIcon className="tree_footer"/>
                  <Link className="logo" to="/">KAI TON MAI</Link>
            <div>
               <p>We help you find the best</p>
               <p>plants you are looking for</p>
            </div>
            <div className='socials'>
              <Link to='#'><i className='fa fa-facebook'></i></Link>
              <Link to='#'><i className='fa fa-instagram'></i></Link>
              <Link to='#'><i className='fa fa-twitter'></i></Link>
            </div>
          </div>
          <ul className='info'>
              <li>
                <ul>
                  <p className='info-name'>Information</p>
                  <li className='info_list'>About</li>
                  <li className='info_list'>Product</li>
                  <li className='info_list'>Blog</li>
                </ul>
              </li>
          </ul>
          <ul className='info_2'>
              <li>
                <ul>
                  <p className='info-name'>Company</p>
                  <li className='info_list2'>Community</li>
                  <li className='info_list2'>Career</li>
                  <li className='info_list2'>Our story</li>
                </ul>
              </li>
          </ul>
          <ul className='info_3'>
              <li>
                <ul>
                  <p className='info-name'>Contract</p>
                  <li className='info_list'>Crafting started</li>
                  <li className='info_list'>Pricing</li>
                  <li className='info_list'>Resources</li>
                </ul>
              </li>
          </ul>
          <div className='footer-bottom'>
            <p>@2022. All Right Reserved Term of Use KAI TON MAI</p>
          </div>
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
