import React, { useState, useEffect } from 'react';

const Carousel = (props)=> {
    var [imgs, setImgs] = useState([
        {
            id: 1,
            expanded: false,
            src: '../assets/showcase.jpg'
        },
        {
            id: 2,
            expanded: false,
            src: '../assets/showcase.jpg'
        },
        {
            id: 3,
            expanded: false,
            src: '../assets/showcase.jpg'
        },
        {
            id: 4,
            expanded: false,
            src: '../assets/showcase.jpg'
        }

    ]);

    const toggleExpand = (e, clickedImg)=>{
        imgs = imgs.filter(i => {return i.id != clickedImg.id });
        setImgs([...imgs, {...clickedImg, expanded: !clickedImg.expanded }]);
    }

    return (
        <div className="carousel">
            {
                imgs.map(i =>
                    <div onClick={(e) => {toggleExpand(e, i)}} id = {i.expanded===true ? "expanded" : " "} key ={i.id}>
                        <img src={i.src} alt={i.id} />
                    </div>
                )
            }

        </div>
    )
}


export default Carousel;