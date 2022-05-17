import React from "react";

import {Link }from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-dark navbar-dark fixed-top'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          Movies
        </a>

    <div>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navmenu'
          >
          <span className='navbar-toggler-icon'></span>
        </button>
        <Link to='/search'>
        <button className='navbar-toggler' type='button'>
          {/* <span className='navbar-toggler-icon'></span> */}
          <i className="bi bi-search"></i>
        </button>
        </Link>
          </div>

        <div className='collapse navbar-collapse' id='navmenu'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <a href='#learn' className='nav-link'>
                Movies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
