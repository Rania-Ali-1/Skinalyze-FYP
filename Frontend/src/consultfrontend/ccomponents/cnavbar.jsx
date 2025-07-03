import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cnavbar = () => {
    const state = useSelector(state => state.handleCart);
    
    return (
        <>
            <style>
                {`
                    .navbar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: #f8f9fa;
                        padding: 15px 2px;
                        position: sticky;
                        top: 0;
                        width: 100%;
                        z-index: 1000;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .navbar-brand {
                        font-weight: bold;
                        font-size: 1.5rem;
                        text-decoration: none;
                        color: black;
                    }
                    .nav-links {
                        display: flex;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    .nav-links li {
                        margin: 0 15px;
                    }
                    .nav-links a {
                        text-decoration: none;
                        color: black;
                        font-size: 1rem;
                        transition: color 0.3s;
                    }
                    .nav-links a:hover {
                        color: gray;
                    }
                   
                `}
            </style>
            <nav className="navbar">
               <NavLink className="navbar-brand" to="/">Doctor Consultation</NavLink>
               <ul className="nav-links">
                 <li><NavLink to="/ecommerce/Home">Home</NavLink></li>
                 <li><NavLink to="/ecommerce/product">Speciality</NavLink></li>
                 
               </ul>
            </nav>

        </>
    );
}

export default Cnavbar;