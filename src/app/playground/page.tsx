'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const isProduction = process.env.NODE_ENV === 'production';
export default function PlaygroundPage() {
  const pointsNumber = 8;
  const width = 100;
  const height = 100;
  const { crossingPercentage, containerRef } = useCrossingPercentage();
  const points = useMemo(() => {
    return Array.from({ length: pointsNumber }, (_, index) => ({
      x: (index / pointsNumber) * width,
      y: Math.max(0, Math.min(height, Math.random() * height)),
    }));
  }, [pointsNumber, width, height]);
  console.log(points);
  if (isProduction) {
    return <div>EMPTY</div>;
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <style>
        {`.grid { stroke: #e0e0e0; stroke-dasharray: 5; }
        .axis { stroke: #333; stroke-width: 2; }
        .line { 
          fill: none; 
          stroke: #3498db; 
          stroke-width: 3; 
          animation: drawLine 2s linear forwards;
        }
        @keyframes drawLine {
          from { 
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
          }
          to { 
            stroke-dasharray: 500;
            stroke-dashoffset: 0;
          }
        }`}
      </style>
    
      
 
      
      {/* Clip Path for Animation */}
      <defs>
        <clipPath id="lineClip">
          <rect x="50" y="50" width="0" height="200">
            <animate 
              attributeName="width" 
              from="0" 
              to="300" 
              dur="2s" 
              fill="freeze"
            />
          </rect>
        </clipPath>
      </defs>
      
      {/* Line Chart Data */}
      <polyline 
        points="50,250 100,200 150,180 200,150 250,100 300,80 350,50" 
        // className="line"
        // clipPath="url(#lineClip)"
      />
   
    </svg>
  );
}

// * should add throttle
function useCrossingPercentage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [containerXstartAndFinal, setContainerXstartAndFinal] = useState({ start: 0, final: 0 });
  const crossingPercentage = useMemo(() => {
    return Math.min(1, Math.max(0, (cursorPosition.x - containerXstartAndFinal.start) / (containerXstartAndFinal.final - containerXstartAndFinal.start)));
  }, [cursorPosition, containerXstartAndFinal]);
  useEffect(() => {
    if (!containerRef.current) return;
    const boundingClientRect = containerRef.current.getBoundingClientRect();
    setContainerXstartAndFinal({ start: boundingClientRect.left, final: boundingClientRect.right });

    window.addEventListener('resize', () => {
      const boundingClientRect = containerRef?.current?.getBoundingClientRect();
      if (!boundingClientRect) return;
      setContainerXstartAndFinal({ start: boundingClientRect.left, final: boundingClientRect.right });
    });
    return () => {
      window.removeEventListener('resize', () => {
        const boundingClientRect = containerRef?.current?.getBoundingClientRect();
        if (!boundingClientRect) return;
        setContainerXstartAndFinal({ start: boundingClientRect.left, final: boundingClientRect.right });
      });
    };
  }, [containerRef]);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return { crossingPercentage, cursorPosition, containerXstartAndFinal, containerRef };
}
