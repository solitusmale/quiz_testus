import React from 'react';
import { Link } from 'react-router-dom';

const FooterOne = () => {
   
    return (
        <>
             <section className="footer footer-3 pt-250">
                <div className="footer-mid">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-sm-8 me-auto">
                                <div className="widget footer-widget mb-5 mb-lg-0">
                                    <div className="footer-logo">
                                        <img src="assets/images/logo-white.png" alt="" className="img-fluid"/>
                                    </div>
                                    
                                    <p className="mt-4">Quiz Zone</p>

                                    <div className="footer-socials mt-5">
                                        <span className="me-2">Connect :</span>
                                        <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                                        <Link to="#"><i className="fab fa-linkedin-in"></i></Link>
                                        <Link to="#"><i className="fab fa-pinterest"></i></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-2 col-sm-4">
                                <div className="footer-widget mb-5 mb-lg-0">
                                    <h5 className="widget-title">Explore</h5>
                                    <ul className="list-unstyled footer-links">
                                        <li><Link to="#">About us</Link></li>
                                        <li><Link to="#">Contact us</Link></li>
                                        <li><Link to="#">Services</Link></li>
                                        <li><Link to="#">Support</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-2 col-sm-4">
                                <div className="footer-widget mb-5 mb-lg-0">
                                    <h5 className="widget-title ">Programs</h5>
                                    <ul className="list-unstyled footer-links">
                                        <li><Link to="#">SEO Business</Link></li>
                                        <li><Link to="#">Digital Marketing</Link></li>
                                        <li><Link to="#">Graphic Design</Link></li>
                                        <li><Link to="#">Social Marketing</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-2 col-sm-4">
                                <div className="footer-widget mb-5 mb-lg-0">
                                    <h5 className="widget-title">Links</h5>
                                    <ul className="list-unstyled footer-links">
                                        <li><Link to="#">News & Blogs</Link></li>
                                        <li><Link to="#">Privacy Policy</Link></li>
                                        <li><Link to="#">Support</Link></li>
                                        <li><Link to="#">Return Policy</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-2 col-sm-4">
                                <div className="footer-widget mb-5 mb-lg-0">
                                    <h5 className="widget-title">Address</h5>
                                    <ul className="list-unstyled footer-links">
                                        <li><Link to="#">+0800 327 8534</Link></li>
                                        <li><Link to="#">support@edumel.com</Link></li>
                                        <li><Link to="#">123 Fifth Floor East 26th Street,New York, NY 10011</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-btm">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-sm-12 col-lg-6">
                                <p className="mb-0 copyright text-sm-center text-lg-start">© 2025 Quiz Zone All rights reserved by Alpix </p>
                            </div>

                            <div className="col-xl-6 col-sm-12 col-lg-6">
                                <div className="footer-btm-links text-start text-sm-center text-lg-end">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><Link to="#"> Terms of Service</Link></li>
                                        <li className="list-inline-item"><Link to="#">Join Us</Link></li>
                                        <li className="list-inline-item"><Link to="#">Privacy Policy</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed-btm-top">
                    <Link to="#top-header" className="js-scroll-trigger scroll-to-top"><i className="fa fa-angle-up"></i></Link>
                </div>
                
            </section>
        </>
    )
}

export default FooterOne;