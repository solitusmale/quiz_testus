import React, { Component } from 'react';
import CountUp from 'react-countup';
import '../../styles/style.css';

class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter: [
                {
                    id: 1,
                    title: '20',
                    suffix: '+',
                    text: 'Predmeta'
                },
                {
                    id: 2,
                    title: '1000',
                    suffix: '+',
                    text: 'Pitanja'
                },
                // {
                //     id: 3,
                //     title: '2256',
                //     suffix: '',
                //     text: 'Finished Seasons'
                // },
                {
                    id: 4,
                    title: '100',
                    suffix: '%',
                    text: 'Zadovoljnih korisnika'
                }
            ]
        }
    }

    render() {
        return (
            <section className="counter-section4">
                <div className="container">
                    <div className="row justify-content-center" >
                        <div className="col-xl-12 counter-inner">
                            <div className="row">
                            {
                                this.state.counter.map((data,i) => (
                                    <div className="col-lg-2 col-md-6" key={data.id}>
                                        <div className="counter-item mb-5 mb-lg-0">
                                            <div className="count">
                                                <span className="counter h2">
                                                    <CountUp end={data.title} enableScrollSpy />
                                                    {data.suffix}
                                                </span>
                                            </div>
                                            <p>{data.text}</p>
                                        
                                        </div>
                                    </div>
                                    
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Counter;
