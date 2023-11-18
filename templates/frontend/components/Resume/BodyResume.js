'use client'
import React, {useRef, useState} from 'react';
import {redirect} from 'next/navigation';
import { useSession } from 'next-auth/react';
import Result from './Result';
import AnalysisContainer from './AnalysisContainer';
import SignificantTerms from './SignificantTerms';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import Analysis from './AnalysisResult';
import GoogledocEditor from "@/components/Resume/GoogledocEditor";


export default function BodyResume() {
    const {data: session} = useSession({
        required: true, onUnauthenticated() {
            redirect('/');
        }
    });
    const [selectedFile, setSelectedFile] = useState('')
    const [keywords, setKeyWords] = useState('')
    const [loading, setLoading] = useState('')
    const [ai_recommendation, setAIRecommendation] = useState()
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(fileInputRef.current.files[0]);
        }
    };

    const handleKeyWords = (dict) => {
        setLoading(false); // Set loading to false
        setKeyWords(dict)
    }

    const uploadResumeButton = (
        <Button
            text="Upload Resume"
            customClass="bg-purple-900 w-1/2 shadow-xl text-white py-2 px-4 rounded cursor-pointer"
            onClick={handleUploadClick}
        />
    );

    const apryseEditorDiv = (
        <GoogledocEditor
            text="Identify Keys"
            customClass={""}
            handleKeyWords={handleKeyWords}
            selectedFile={selectedFile}
            loadingSpinnerResult={setLoading}
            showRecommendation={setAIRecommendation}

        />
    )

    return (
        <div className="p-4 h-auto bg-gradient-to-br from-purple-900 to-pink-200">
            <div className="">

                <div className="grid grid-cols-5 h-auto">
                    <div className="w-full mx-2 min-h-96 col-span-3">
                        {uploadResumeButton}
                        <input
                            type='file'
                            accept='.docx'
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                            ref={fileInputRef}
                        />
                        {selectedFile && apryseEditorDiv}
                    </div>
                    <div className="w-full col-span-2 ">
                        <Result className="min-h-150 h-auto">
                            {loading ? (
                                <LoadingSpinner customClass="w-24 h-24"/>
                            ) : (
                                keywords && (
                                    <AnalysisContainer>
                                        <SignificantTerms keywords={keywords}/>
                                    </AnalysisContainer>
                                )
                            )}
                        </Result>
                    </div>
                </div>

                <div className='flex'>
                    {ai_recommendation && <Analysis fileId={ai_recommendation}/>}
                </div>

            </div>
        </div>
    );
}