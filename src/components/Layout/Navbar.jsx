import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      id='navbar'
      className='navbar navbar-expand-lg bg-dark navbar-dark fixed-top'
    >
      <div className='container'>
        <Link to='/home' className='navbar-brand'>
          Movies
        </Link>

        {/* Navigation link */}
        <div className='row text-white'>
          <div className='col px-4'>
            <Link to='/home' className='nav-link'>
              Popular
            </Link>
          </div>
          <div className='col'>
            <Link to='/search' className='nav-link'>
              <i className='bi bi-search'></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
