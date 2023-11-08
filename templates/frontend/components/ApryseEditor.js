import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Button from './Button';


const ApryseEditor = ({handleKeyWords,loadingSpinnerResult,selectedFile, showRecommendation}) => {
    const viewer = useRef(null);
    const [documentViewer, setDocumentViewer] = useState(null);
   
    const [showAnalysisBtn, setShowAnalysisBtn]=useState("")

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
                    const {documentViewer,Search, annotationManager, Annotations} = instance.Core;
                    setDocumentViewer(documentViewer);
                    // documentViewer.setSearchHighlightColors({
                    //     searchResult: new Annotations.Color(0, 0, 255, 0.5),
                    //     activeSearchResult: 'rgba(0, 255, 0, 0.5)',
                    //   });
                
                    documentViewer.addEventListener("annotationsLoaded", ()=>{
                        const FitMode = instance.UI.FitMode;
                        instance.UI.setFitMode(FitMode.FitWidth)
                        // instance.UI.setFitMode(FitMode.FitWidth)
                        // const searchText = 'computer';
                        // const mode = Search.Mode.PAGE_STOP | Search.Mode.HIGHLIGHT;
                        // const searchOptions = {
                        //   fullSearch: true,
                        //   onResult: (result) => {
                        //     console.log("quads results", result);
                        //     if (result.resultCode === Search.ResultCode.FOUND) {
                        //       const textQuad = result.quads[0].getPoints();
                        //       const annot = new Annotations.TextHighlightAnnotation({
                        //         PageNumber: result.pageNum,
                        //         Quads: [textQuad],
                        //         StrokeColor: new Annotations.Color(255, 0, 0, 1),
                        //       });
                  
                        //       annotationManager.addAnnotation(annot);
                        //       annotationManager.redrawAnnotation(annot);
                        //     }
                        //   }
                        // };
                  
                        // documentViewer.textSearchInit(searchText, mode, searchOptions);
                        
                    }) 
                    
                });
            }
        });
    }, []);

    const handleSave = () => {
        loadingSpinnerResult(true)
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
                            setShowAnalysisBtn(true)

                            
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
    const handleAnalysis=()=>{
        showRecommendation(true)
    }

    return (
        <div className="h-auto mt-1">
            <div className="flex-1 h-150 bg-gray-100" ref={viewer}></div>
            <div className="  my-4 h-16 flex justify-between px-16">
                {documentViewer && (
                    <Button
                        onClick={handleSave}
                        text="Identify keys"
                        customClass="result"
                    />
                )}
                {showAnalysisBtn && (
                    <Button 
                          onClick={handleAnalysis}
                          text="Analyse Resume"
                          customClass="result"
                          />
                )}
            </div>
            
        </div>
    );
};
export default ApryseEditor;

      