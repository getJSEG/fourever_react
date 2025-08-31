import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Gallery extends React.Component {   
    
    render() {
        return (
            <div className="carousel-container" style={{height:"10em"}}>
                <Carousel transitionTime="500" infiniteLoop>
                    {this.props.varients?.map( (varient, i) => {
                        return (
                        <div key={i}>
                            <img src={varient?.image?.link} alt={varient?.image?.title} key={i}/>
                        </div>)
                    })}
                </Carousel>
            </div>
        )
    };
}
export default Gallery