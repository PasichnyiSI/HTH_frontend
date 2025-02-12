import React, { useState, useEffect, useContext } from 'react';
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { Outlet } from 'react-router-dom';
import CategoryList from './CategoryList';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CallIcon from '@mui/icons-material/Call';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';
import UndoIcon from '@mui/icons-material/Undo';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


const Base = ({ categories, categoryProduct }) => {

    const [res, setRes] = useState("");
    const api = useAxios();
    const { authTokens, user, logoutUser } = useContext(AuthContext);
  
    useEffect(() => {
      if (authTokens) {
        const fetchData = async () => {
          try {
            const response = await api.get("/test/");
            setRes(response.data.response);
          } catch (error) {
            console.log(error);
            setRes("Something went wrong");
          }
        };
        fetchData();
      }
    }, [authTokens]);

  return (
  <div>
    <div className="above-header">
        <div className="above-header-container d-flex">
            <p>БАНЕР РЕКЛАМИ</p>
        </div>
    </div>
    <header className="header">
        <div className="header-container">
            <div className="burger_box">
                <div className="menu-icon-container">
                    <a href="#" className="menu-icon js-menu_toggle closed">
                        <span className="menu-icon_box">
                        <span className="menu-icon_line menu-icon_line--1"></span>
                        <span className="menu-icon_line menu-icon_line--2"></span>
                        <span className="menu-icon_line menu-icon_line--3"></span>
                        </span>
                    </a>
                </div>
            </div>
            <div className="header-logo">
                <a href="/"><img src="/static/img/21312.png" alt="" className="hth_logo"/></a>
            </div>
            <div className="catalogue-container">
                <li className="dropdown">
                    <a href="#">Каталог <i className="fa-solid fa-chevron-down"></i></a>
                    <div className="mega-menu d-flex">
                        <CategoryList categories={categories} categoryProduct={categoryProduct} />
                    </div>
                </li>
            </div>
            <div className="header-search-bar">
                <input type="text" placeholder="Пошук"/>
                <button className="header-search-bar-btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div className="header-btn">
            {user ? (
                <navbar className="header-nav-btn pt-4">
                    <ul className="header-nav-btn-list d-flex">
                        <li>
                            <a href="/wishlist" className="nav-a m-3">
                                <i className="fa-solid fa-heart"></i>
                            </a>
                        </li>
                        <li>
                            <a href="/comparison" className="nav-a m-3">
                                <i className="fa-solid fa-scale-balanced"></i>
                            </a>
                        </li>
                        <li>
                            <a href="/cart" className="nav-a m-3">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </a>
                        </li>

                        <li>
                            <a href="/dashboard" className="nav-a m-3">
                                <i className="fa-solid fa-user"></i>
                            </a>
                        </li>
                    </ul>
                </navbar>
                ) : (
                <navbar className="header-nav-btn pt-4">
                    <ul className="header-nav-btn-list d-flex">                    
                        <li>
                            <a href="/login" className="nav-a m-3">
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </a>
                        </li>
                    </ul>
                </navbar>
            )}
            </div>
        </div>
    </header>
    <div className="side_menu">
        <div className="container_menu">
            <div className="header-container-side-menu">
                <div className="header-side-menu-logo">
                    <a href="/"><img src="/static/img/21312.png" alt="" className="hth_logo"/></a>
                </div>
                <div className="burger_box_opened">
                    <div className="menu-icon-container-opened">
                        <a href="#" className="menu-icon js-menu_toggle opened">
                            <span className="menu-icon_box">
                            <span className="menu-icon_line menu-icon_line--1"></span>
                            <span className="menu-icon_line menu-icon_line--2"></span>                                <span className="menu-icon_line menu-icon_line--3"></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            {user ? (
            <ul className="list_load">
                <div className='list_group'>
                    <li className="list_item">
                        <a href="/" className='list_group_item d-flex align-items-center'>
                            <HomeIcon fontSize="medium" className='list-icons' />
                            <span>Головна</span>
                        </a>
                    </li>
                    <li className="list_item">
                        <a href="/products" className='list_group_item d-flex align-items-center'>
                            <ShoppingBagIcon fontSize='medium' className='list-icons' />
                            Товари
                        </a>
                    </li>
                </div>
                <div className='list_group'>
                    <li className="list_item">
                        <a href="/dashboard" className='list_group_item d-flex align-items-center'>
                            <AccountCircleIcon fontSize='medium' className='list-icons' />
                            Профіль
                        </a>
                    </li>
                </div>
                <div className='list_group'>
                    <li className="list_item">
                        <a href="/cart" className='list_group_item d-flex align-items-center'>
                        <LocalGroceryStoreIcon fontSize="medium" className='list-icons' />
                        Кошик
                        </a>
                    </li>
                    <li className="list_item">
                        <a href="/wishlist" className='list_group_item d-flex align-items-center'>
                        <FavoriteIcon fontSize='medium' className='list-icons' />
                        Список бажань
                        </a>
                    </li>
                </div>
                <div className='list_group'>
                    <li className="list_item">
                        <a href="/contacts" className='list_group_item d-flex align-items-center'>
                            <CallIcon fontSize='medium' className='list-icons' />
                            Контакти
                            </a>
                    </li>
                    <li className="list_item">
                        <a href="/aboutus" className='list_group_item d-flex align-items-center'>
                            <InfoIcon fontSize='medium' className='list-icons' />
                            Про нас
                            </a>
                    </li>
                    <li className="list_item">
                        <a href="/shipping" className='list_group_item d-flex align-items-center'>
                            <LocalShippingIcon fontSize='medium' className='list-icons' />
                            Доставка та оплата
                            </a>
                    </li>
                    <li className="list_item">
                        <a href="/return" className='list_group_item d-flex align-items-center'>
                            <UndoIcon fontSize='medium' className='list-icons' />
                            Повернення товару
                            </a>
                    </li>
                </div>
                <div className='list_group'>
                    <li className="list_item">
                        <a href="" onClick={logoutUser} className='list_group_item d-flex align-items-center'>
                            <LogoutIcon fontSize='medium' className='list-icons' />
                            Вихід
                            </a>
                    </li>
                </div>
            </ul>
            ):(
            <ul className="list_load">
                <div className='list_group'>
                    <li className="list_item">
                        <a href="/" className='list_group_item d-flex align-items-center'>
                            <HomeIcon fontSize="medium" className='list-icons' />
                            <span>Головна</span>
                        </a>
                    </li>
                    <li className="list_item">
                        <a href="/products" className='list_group_item d-flex align-items-center'>
                            <ShoppingBagIcon fontSize='medium' className='list-icons' />
                            Товари
                        </a>
                    </li>
                </div>
                <div className='list_group'>
                    <li className="list_item">
                        <a href="/login" className='list_group_item d-flex align-items-center'>
                            <LoginIcon fontSize='medium' className='list-icons' />
                            Вхід
                        </a>
                    </li>
                </div>
                <div className='list_group'>
                    <li className="list_item">
                        <a href="/contacts" className='list_group_item d-flex align-items-center'>
                            <CallIcon fontSize='medium' className='list-icons' />
                            Контакти
                            </a>
                    </li>
                    <li className="list_item">
                        <a href="/aboutus" className='list_group_item d-flex align-items-center'>
                            <InfoIcon fontSize='medium' className='list-icons' />
                            Про нас
                            </a>
                    </li>
                    <li className="list_item">
                        <a href="/shipping" className='list_group_item d-flex align-items-center'>
                            <LocalShippingIcon fontSize='medium' className='list-icons' />
                            Доставка та оплата
                            </a>
                    </li>
                    <li className="list_item">
                        <a href="/return" className='list_group_item d-flex align-items-center'>
                            <UndoIcon fontSize='medium' className='list-icons' />
                            Повернення товару
                            </a>
                    </li>
                </div>
            </ul>
            )}
        </div>
    </div>
        <main className='main'>
            <Outlet /> 
        </main>
    <footer className="footer-section">
        
    </footer>
  </div>
  );
};

export default Base;
