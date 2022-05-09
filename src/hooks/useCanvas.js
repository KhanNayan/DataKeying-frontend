import React, { useState, useEffect, useRef } from 'react';

export const canvasWidth = 1280;
export const canvasHeight = 720;

export function draw(ctx, location){
  console.log("attempting to draw",location.x,location.y);
  
  ctx.beginPath();
  ctx.strokeStyle = '#ff0000';
  ctx.moveTo(location.x,location.y );
  ctx.lineTo(location.x,location.y);
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(location.x - 50/2,location.y);
  ctx.lineTo(location.x + 50/2,location.y);
  //ctx.lineWidth = 15;
  ctx.stroke();
};

export function useCanvas(){
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(()=>{
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        // clear the canvas area before rendering the coordinates held in state
        ctx.clearRect( 0,0, canvasWidth, canvasHeight );

        // draw all coordinates held in state
        coordinates.forEach((coordinate)=>{draw(ctx, coordinate)});
    });

    return [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ];
}

