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

    ])

    // const toggleExpand()
    const expand = (e, clickedImg)=>{
        imgs = imgs.filter(i => {return i.id != clickedImg.id });
        setImgs([...imgs, {...clickedImg, expanded: true}]);
    }


    return (
        <div className="carousel">
            {
                imgs.map((i, index)=> 
                    <div id = {i.expanded===true ? "expanded" : " "}>
                        <img onClick={(e) => {expand(e, i)}} key ={i.id} src={i.src} alt={i.id} />
                    </div>
                )
            }

        </div>
    )
}


export default Carousel;