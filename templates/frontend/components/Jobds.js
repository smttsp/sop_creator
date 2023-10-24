"use client"
import React, { useState, useEffect } from 'react';

export default function Jobds(props) {
  const [jobDescription, setJobDescription] = useState('');

  useEffect(() => {
   
    setJobDescription(props.description);
  }, [props.description]); 

  const handleInputChange = (event) => {
    setJobDescription(event.target.value);
  };

  return (
    <div className="mb-4 relative">
      <div className="relative">
        <textarea
          id="jobDescription"
          name="jobDescription"
          className={`w-full p-2 border mt-4 h-60 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            jobDescription ? 'pt-4' : ''
          }`}
          rows="4"
          value={jobDescription}
          onChange={handleInputChange}
        ></textarea>
        <label
          htmlFor="jobDescription"
          className={`absolute left-2 top-0 transition-all text-white text-sm font-bold ${
            jobDescription ? '-top-3 text-xs text-blue-500' : ''
          }`}
        >
          
        </label>
      </div>
    </div>
  );
}
