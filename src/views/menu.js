import React from 'react';
import '../assets/css/menu.css'

const Menu = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light" id="ftco-navbar">
            <div className="container">
              <a className="navbar-brand" href="https://web.imonitorplus.com/dev_testing/index.html">iMonitor<sup>+</sup></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="oi oi-menu"></span> Menu
              </button>

              <div className="collapse navbar-collapse" id="ftco-nav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item"><a href={"https://web.imonitorplus.com/dev_testing/"} className="nav-link">Home</a></li>
                  <li className="nav-item"><a href={"https://web.imonitorplus.com/dev_testing/createApp.html"} className="nav-link">How it works</a></li>
                  <li className="nav-item"><a href={"https://web.imonitorplus.com/dev_testing/pricing.html"} className="nav-link">Pricing</a></li>
                  
                  <li className="nav-item"><a href={"https://web.imonitorplus.com/dev_testing/blog.html"} className="nav-link">Case Studies</a></li>
                  <li className="nav-item"><a href={"https://web.imonitorplus.com/dev_testing/contact.html"} className="nav-link">Contact</a></li>
                  <li className="nav-item active"><a href="/dev_testing/product/" className="nav-link">Login</a></li>
                  
                  {/* <li className="nav-item cta"><a href="https://web.imonitorplus.com/dev_testing/#" className="nav-link" data-toggle="modal" data-target="#modalRequest"><span>Get a Quote</span></a></li>  */}
                </ul>
              </div>
            </div>
          </nav>
    )
};

export default Menu;