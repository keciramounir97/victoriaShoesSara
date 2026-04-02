
import React from 'react';
import image from "../assets/hero.jpg";

export default function HeroGrid() {
    return (
        <div className="h-full w-full relative overflow-hidden">
            <img
                src={image}
                alt="hero image"
                className="h-full w-full object-cover object-center"
            />
           
        </div>
    );
}