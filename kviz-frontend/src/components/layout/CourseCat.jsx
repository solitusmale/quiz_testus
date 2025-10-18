import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseCat01 extends Component {
    constructor(props){
        super(props);

        this.state = {
            category: [
                {
                    id: 1,
                    title: 'Prva godina',
                    img :  'assets/images/icon/Roman1.png',
                    extraClassName: 'bg-1',
                },
                {
                    id: 2,
                    title: 'Druga godina',
                    img :  'assets/images/icon/Roman2.png',
                    extraClassName: 'bg-2',
                },
                {
                    id: 3,
                    title: 'Treća godina',
                    img :  'assets/images/icon/Roman3.png',
                    extraClassName: 'bg-3',
                },
                {
                    id: 4,
                    title: 'Četvrta godina',
                    img :  'assets/images/icon/Roman4.png',
                    extraClassName: 'bg-4',
                },
                
                
            ]
        }
    }

    render() {
        // Course category

        return (      
            <section className="course-category-3 section-padding">
                <div className="container">
                    <div className="row mb-70 justify-content-center">
                        <div className="col-xl-8">
                            <div className="section-heading text-center">
                                <h2 className="font-lg">Pretraga po godinama</h2>
                                <p>Izaberite godinu studija za koju želite da pretražujete kurseve</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {
                             this.state.category.map((data,i)=> (
                                 
                                <div className="col-xl col-lg-4 col-sm-6" key={data.id}>
                                    <div className={`single-course-category style-3 ${data.extraClassName}`}> 
                                        <div className="course-cat-icon">
                                            <img src={data.img} alt="" className="img-fluid"/>
                                        </div>

                                        <div className="course-cat-content">
                                            <h4 className="course-cat-title">
                                                <Link to="#">{data.title}</Link>
                                            </h4>
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
export default CourseCat01;