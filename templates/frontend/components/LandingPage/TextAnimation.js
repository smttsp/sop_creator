import React, { useEffect, useState } from 'react';

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

  const firstWords = text.split(' ').slice(0, 3).join(' '); // Get the first 4 words
  const restOfText = displayText.substring(firstWords.length);

  return (
    <div className="typewriter my-8 h-24 ">
      <span className="first-words text-3xl text-gray-850 mr-2">{firstWords}</span>
      <div>
        <span className="rest-of-text font-semibold text-3xl text-blue-500">{restOfText}</span>
      </div>
    </div>
  );
};

export default TextAnimation;
