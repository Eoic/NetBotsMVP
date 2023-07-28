'use client'

import React from 'react';
import { ShapeRenderer, Rectangle } from '../utils/shapes';
import { useRef, useEffect, useState } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

    useEffect(() => {
        if (canvasRef.current === null || animationFrameId !== null) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        const parentWidth = canvas.parentElement!.clientWidth;
        const parentHeight = canvas.parentElement!.clientHeight;
        canvas.width = parentWidth;
        canvas.height = parentWidth / (parentWidth / parentHeight);

        if (context === null) {
            return;
        }

        const shapeRenderer = new ShapeRenderer();

        shapeRenderer.addShape(
            new Rectangle(100, 100)
                .setColor('#FF0000')
                .setPosition(0, 0)
        );

        const renderShapes = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            shapeRenderer.render(context);
        }

        setAnimationFrameId(requestAnimationFrame(renderShapes));

        // const handleResize = () => {
        //     canvas.width = window.innerWidth;
        //     canvas.height = 3 * window.innerWidth / 4;
        //     console.log('resize')
        //     setAnimationFrameId(requestAnimationFrame(renderShapes));
        // }

        // window.addEventListener('resize', handleResize);

        return () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }

            // window.removeEventListener('resize', handleResize);
        }
    }, [animationFrameId]);

    return (
        <canvas ref={canvasRef} className='canvas-background' />
    );
};

export { CanvasBackground };
export default CanvasBackground;
