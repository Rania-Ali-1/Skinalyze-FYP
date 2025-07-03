import React from 'react';
import AnimatedText from './AnimatedText'; 
import './SectionTitle.css';

const SectionTitle = ({ title, description }) => {
  return (
    <div className="section-title">
      <div className="animated-text title">
        <AnimatedText text={title} fontSize="3rem" fontWeight="500" />
      </div>
      <div className="animated-text description">
        <AnimatedText text={description} fontSize="1.4rem" fontWeight="400" />
      </div>
    </div>
  );
};

export default SectionTitle;
