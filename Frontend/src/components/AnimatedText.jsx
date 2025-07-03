import React, { useEffect, useRef } from 'react';
import './AnimatedText.css'; // Import the CSS file

const AnimatedText = ({ text, color, fontSize, ...props }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;

    const handleScroll = () => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate-text');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <span
      ref={textRef}
      className="animated-text"
      style={{ color, fontSize }}
      {...props}
    >
      {text}
    </span>
  );
};

export default AnimatedText;
