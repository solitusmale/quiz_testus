import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.css';

class CourseGrid01 extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [
                {
                    id: 1,
                    author: 'Jpsephin',
                    price: '$200 ',
                    review: '4.5 ',
                    reviewCount: '40',
                    students :  '80',
                    duration :  '6.5',
                    lessons :  '97 ',
                    img :  'assets/images/course/img_06.jpg',
                    authorImg :  'assets/images/course/course-2.jpg',
                    title: ' Data Competitive Strategy law & Organization ',
                    desc: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, culpa. At voluptatem autem ipsam deleniti',
                },
                {
                    id: 2,
                    author: 'Mikel',
                    price: '$300',
                    review: '4.5 ',
                    reviewCount: '40',
                    students :  '51',
                    duration :  '6.5',
                    lessons :  '97 ',
                    img :  'assets/images/course/img_02.jpg',
                    authorImg :  'assets/images/course/course-2.jpg',
                    title: 'Data Competitive Strategy law & Organization 2',
                    desc: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, culpa. At voluptatem autem ipsam deleniti',

                },
                {
                    id: 3,
                    author: 'John',
                    price: '$450',
                    review: '4.5 ',
                    reviewCount: '40',
                    students :  '41',
                    duration :  '6.5',
                    lessons :  '97 ',
                    img :  'assets/images/course/img_03.jpg',
                    authorImg :  'assets/images/course/course-2.jpg',
                    title: ' Data Competitive Strategy law & Organization 3',
                    desc: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, culpa. At voluptatem autem ipsam deleniti',

                }
            ]
        }
    }
    render() {
        return (

        //Course style 1
        <section className="course-wrapper section-padding ">
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
                    this.state.courses.map((data,i)=> (
                        
                        <div className="col-xl-4 col-lg-4 col-md-6" key={data.id}>
                            <div className="course-grid bg-shadow tooltip-style">
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
                                        <span className="students"><i className="far fa-user-alt me-2"></i>{data.students} Students</span>
                                        <span className="lessons"><i className="far fa-play-circle me-2"></i>{data.lessons} Lessons</span>
                                    </div>
                                </div>
            
                                <div className="course-hover-content">
                                    <div className="price">{data.price}</div>
                                    <h3 className="course-title mb-20 mt-30"> <Link to="#" >{data.title}</Link> </h3>
                                    <div className="course-meta d-flex align-items-center mb-20">
                                        <div className="author me-4">
                                            <img src={data.authorImg} alt="{data.title}" className="img-fluid"/>
                                            <Link to="#">{data.author}</Link>
                                        </div>
                                        <span className="lesson"> <i className="far fa-file-alt"></i> {data.lessons} lessons</span>
                                    </div>
                                    <p className="mb-20">{data.desc}</p>
                                    <Link to="#" className="btn btn-grey btn-sm rounded">Join Now <i className="fal fa-angle-right"></i></Link>
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

export default CourseGrid01;