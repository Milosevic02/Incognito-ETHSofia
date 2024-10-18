// src/components/AnimatedGradientDiv.tsx
import React from 'react';
import { useRouter } from "next/router";

const AnimatedGradientDiv: React.FC = () => {
    const router = useRouter();
    if (router.pathname !== "/home") {
        return null; 
    }

    return (
        <>
            <div style={{
                width: '100vw',
                height: '30vh',
                background: 'linear-gradient(270deg, #FF1CF7, #b249f8)', // Text gradient becomes the background
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 10s ease infinite', // Speeded up to 10s
                marginTop: '10vh', // Add top margin
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                <h1 style={{
                    fontSize: '6rem', // Big letters
                    margin: 0, // Remove default margin
                }}>
                    Welcome to Incognito!
                </h1>
            </div>

            <style jsx>{`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </>
    );
};

export default AnimatedGradientDiv;
