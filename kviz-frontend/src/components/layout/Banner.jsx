import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.css';

class Banner extends Component {
    
    render() {
        return (
        <section className="banner-style-4 banner-padding">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-12 col-xl-6 col-lg-6">
                        <div className="banner-content">
                            <span className="subheading">Over 3000 Course Available</span>
                            <h1>Upgrade your learning Skills & Upgrade your life</h1>
                            <p className="mb-40"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ullam libero magni reiciendis 
                                quam ipsa blanditiis, facilis velit eaque illo?</p>

                            <div className="btn-container">
                                <Link to="#" className="btn btn-main rounded">Find Courses</Link>
                                <Link to="#" className="btn btn-white rounded ms-2">Get started </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-xl-6 col-lg-6 ">
                        <div className="banner-img-round mt-5 mt-lg-0 ps-5">
                            <img src="assets/images/banner/banner_img.png" alt="Banner" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        );
    }
}

export default Banner;

