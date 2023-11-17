"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from "next/link"
import { disconnect } from 'process';
import { useRef, useState } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

export default function Home() {

  const [totalDistance,setTotalDistance] = useState(0);

  const testRef = useRef<ReactSketchCanvasRef>(null)

  function calculateDistance(x1:any, y1:any, x2:any, y2:any) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return distance;
  }

  function extractPoints(positions:any){


    positions.forEach(async(element:any) => {
      
      const x1 = await element.paths[0].x
    const y1 = await element.paths[0].y

    let lastPos = element.paths.length-1


    const x2 = await element.paths[lastPos].x;
    const y2 = await element.paths[lastPos].y;
    const distance = calculateDistance(x1,y1,x2,y2);
    setTotalDistance((prev)=>{const newPrev = prev+distance;console.log({totalDistance:newPrev});return newPrev})
    });

    // const x1 = positions[0].paths[0].x
    // const y1 = positions[0].paths[0].y
    // console.log(x1,y1);
    // let lastPos = positions[0].paths.length-1
    // const x2 = positions[0].paths[lastPos].x;
    // const y2 = positions[0].paths[lastPos].y;
    // console.log(x2,y2);

    // calculateDistance(x1,y1,x2,y2);
  }

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};
  return (<>
  <div style={{width:"50rem" , height:"400px"}}>    
 <ReactSketchCanvas
      ref={testRef}
      onStroke={async()=>{extractPoints(await testRef.current?.exportPaths())}}
      style={styles}
      strokeWidth={4}
      strokeColor="red"
      /> 
      </div>
      <Button disabled={totalDistance>300 ? false : true}>SUBMIT</Button>
   </>)
}
  