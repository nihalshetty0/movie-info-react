import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      id='navbar'
      className='navbar navbar-expand-lg fixed-top'
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className='container'>
        <Link
          to='/home'
          className='navbar-brand text-primary text-uppercase fw-bold fs-0'
        >
          Movies to watch
        </Link>

        {/* Navigation link */}
        <Link to='/search' className='nav-link text-primary'>
          <i className='bi bi-search'></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
