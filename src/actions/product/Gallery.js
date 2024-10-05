import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
class Gallery extends React.Component {    
    render() {
        return (
            <div className="carousel-container">
                <Carousel transitionTime="500" infiniteLoop>
                    <div>
                        <img src="https://shop.wantable.com/cdn/shop/files/Variant_512939_stream_master-1713805230.jpg?v=1715623296" alt="" />
                    </div>
                    <div>
                        <img src="https://shop.wantable.com/cdn/shop/files/Variant_512939_stream_master-1713552895.jpg?v=1715623296" alt="" />
                    </div>
                    <div>
                        <img src="https://shop.wantable.com/cdn/shop/files/Variant_512939_stream-1713552907.jpg?v=1715623296" alt="" />
                    </div>
                    <div>
                        <img src="https://shop.wantable.com/cdn/shop/files/Variant_512939_stream_master-1713552893.jpg?v=1715623296" alt="" />
                    </div>
                </Carousel>
            </div>
        )
    };
}
export default Gallery