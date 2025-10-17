import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.css';

class CourseGridPopular extends Component {
    constructor(props){
        super(props);
        this.state = {
            coursePopular: [
                {
                    id: 1,
                    price: '$200 ',
                    review: '4.5 ',
                    reviewCount: '40',
                    duration :  '6.5',
                    lessons :  '97 ',
                    img :  'assets/images/course/img_01.jpg',
                    title: 'SQL-Data Analysis: Crash Course',
                },
                {
                    id: 2,
                    review: '4.5 ',
                    reviewCount: '40',
                    duration :  '6.5',
                    lessons :  '97 ',
                    img :  'assets/images/course/img_05.jpg',
                    title: 'Learn How to Start an Amazon FBA Store',

                },
                {
                    id: 3,
                    price: '$450',
                    review: '4.5 ',
                    reviewCount: '40',
                    duration :  '6.5',
                    lessons :  '97 ',
                    img :  'assets/images/course/img_03.jpg',
                    title: 'Emotional Intelligence at Work: Learn Emotions',
                },
                {
                    id: 4,
                    price: '$250',
                    review: '4.5 ',
                    reviewCount: '40',
                    duration :  '6.5',
                    lessons :  '97 ',
                    img :  'assets/images/course/img_02.jpg',
                    title: ' Competitive Strategy law & Organization',

                }
            ]
        }
    }
    render() {
        return (

        //Course style 1
        <section className="course-wrapper section-padding  bg-gray">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="section-heading mb-70 text-center">
                            <h2 className="font-lg">Popular Courses</h2>
                            <p>Discover Your Perfect Program In Our Courses.</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-lg-center">

                {
                    this.state.coursePopular.map((data,i)=> (
                        <div className="col-xl-3 col-lg-6 col-md-6" key={data.id}>
                            <div className="course-grid tooltip-style bg-white hover-shadow">
                                <div className="course-header">
                                    <div className="course-thumb">
                                        <img src={data.img} alt="{data.title}" className="img-fluid"/>
                                        <div className="course-price">{data.price}</div>
                                    </div>
                                </div>
            
                                <div className="course-content">
                                    <div className="rating mb-10">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>

                                        <span>{data.review} ({data.reviewCount} reviews)</span>
                                    </div>

                                    <h3 className="course-title mb-20"> <Link to="#" >{data.title}</Link> </h3>


                                    <div className="course-footer mt-20 d-flex align-items-center justify-content-between ">
                                        <span className="duration"><i className="far fa-clock me-2"></i>{data.duration} hr</span>
                                        <span className="lessons"><i className="far fa-play-circle me-2"></i>{data.lessons} Lessons</span>
                                    </div>
                                </div>
            
                               
                            </div>
                        </div>
                    ))
                }

                </div>
            </div>
        </section>

        );
    }
}

export default CourseGridPopular;