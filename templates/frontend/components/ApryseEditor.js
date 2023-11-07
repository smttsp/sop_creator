import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Button from './Button';

const ApryseEditor = ({handleKeyWords, selectedFile}) => {
    const viewer = useRef(null);
    const [documentViewer, setDocumentViewer] = useState(null);
    const webViewer_dict = {
        path: '/webviewer/lib',
        initialDoc: selectedFile,
        licenseKey: 'demo:1698352503737:7cf1a6ca0300000000099ad259d9fa3f9a59bc0274fbe417eeddcf4a18',
        extension: 'docx',
        enableOfficeEditing: true,
        enableAnnotations: true,
        enableAnnotationNumbering: true,
        enableFilePicker: true,
        enableRedaction: true,
    }

    useEffect(() => {
        import('@pdftron/webviewer').then(({default: WebViewer}) => {
            if (typeof window !== 'undefined') {
                WebViewer(
                    webViewer_dict,
                    viewer.current
                ).then((instance) => {
                    const {documentViewer} = instance.Core;
                    setDocumentViewer(documentViewer);
                    documentViewer.addEventListener("annotationsLoaded", ()=>{
                        const FitMode = instance.UI.FitMode;
                        instance.UI.setFitMode(FitMode.FitWidth)
                    }) 
                    
                });
            }
        });
    }, []);

    const handleSave = () => {
        if (documentViewer) {
            documentViewer.getDocument().getFileData()
                .then((arrayBuffer) => {
                    const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
                    const formData = new FormData();
                    formData.append('resume_file', blob, 'document.docx');

                    axios.post('http://localhost:5000/upload', formData)
                        .then((response) => {
                            console.log('Successfully sent to the backend');
                            handleKeyWords(response.data.message)
                            
                        })
                        .catch((error) => {
                            console.log('Failed to send to the backend');
                        });
                })
                .catch((error) => {
                    console.error('Error getting file data:', error);
                });
        }
    };

    return (
        <div className="h-150 mt-1 flex flex-col">
            <div className="flex-1 bg-gray-100" ref={viewer}></div>
            <div className="ml-24 my-4">
                {documentViewer && (
                    <Button
                        onClick={handleSave}
                        text="Identify keys"
                        customClass="bg-purple-900 w-1/2 shadow-xl text-white py-2 px-4 rounded-lg
                        hover:text-gray-200 hover:font-semibold hover:bg-purple-800
                        active:text-gray-400 active:font-semibold cursor-pointer"
                    />
                )}
            </div>
        </div>
    );
};
export default ApryseEditor;