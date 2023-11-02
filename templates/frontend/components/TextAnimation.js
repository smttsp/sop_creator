import React, { useState, useEffect } from 'react';


const TextAnimation = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [text, currentIndex, speed]);

  const firstWord = displayText.split(' ')[0]; // Separate the first word
  const restOfText = displayText.substring(firstWord.length);

  return (
    <div className="typewriter my-8">
      <span className="first-word text-white mr-2">{firstWord}</span>
      <span className="rest-of-text font-semibold text-yellow-500">{restOfText}</span>
    </div>
  );
};

export default TextAnimation;
