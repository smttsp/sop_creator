import React, {useRef, useState} from 'react';
import Result from './Result';
import AnalysisContainer from './AnalysisContainer';
import SignificantTerms from './SignificantTerms';
import ApryseEditor from './ApryseEditor';
import Button from './Button';
import TextAnimation from './TextAnimation';
import LoadingSpinner from './LoadingSpinner';

export default function Body() {
    const [selectedFile, setSelectedFile] = useState('')
    const [keywords, setKeyWords] = useState('')
    const [loading, setLoading]=useState('')
    const fileInputRef = useRef(null);
    
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setSelectedFile(fileURL);
        }
    };

    const handleKeyWords = (dict) => {
        setLoading(false); // Set loading to false
        setKeyWords(dict)
    }

    return (
        <div className="p-4 h-auto bg-gradient-to-br from-purple-900 to-pink-200">
            <div className="">
                <TextAnimation text="Hello, I am AI tool to Assist you to build your carier"
                               speed={100}/>
                <div className="grid grid-cols-2 h-auto">
                    <div className="w-full mx-2 min-h-96">
                        {!selectedFile && (<Button
                            text="Upload Resume"
                            customClass="bg-purple-900 w-1/2 shadow-xl
                            text-white py-2 px-4 rounded cursor-pointer"
                            onClick={handleUploadClick}
                        />)
                        }
                        <input
                            type='file'
                            accept='.docx'
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                            ref={fileInputRef}/>
                        {selectedFile && (
                            // Render the ApryseEditor component when showEditor is true

                            <ApryseEditor text="Identify Keys"
                                          customClass={""}
                                          handleKeyWords={handleKeyWords}
                                          selectedFile={selectedFile}
                                          loadingSpinnerResult={setLoading}/>

                        )}

                    </div>
                    <div className="w-full ">
                        <Result className="min-h-150 h-auto">
                           {loading ? (
                                <LoadingSpinner customClass="w-24 h-24" />
                            ) : (
                                keywords && (
                                    <AnalysisContainer>
                                        <SignificantTerms keywords={keywords} />
                                    </AnalysisContainer>
                                )
                            )}
                        </Result>
                    </div>
                </div>
            </div>
        </div>
    );
}
