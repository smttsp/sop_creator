import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
const ApryseEditor = (props) => {
  const viewer = useRef(null);
  const [documentViewer, setDocumentViewer] = useState(null);
  useEffect(() => {
    import('@pdftron/webviewer').then(({ default: WebViewer }) => {
      if (typeof window !== 'undefined') {
        WebViewer(
          { 
          path: '/webviewer/lib',
          initialDoc:props.selectedFile,
          licenseKey: 'demo:1698352503737:7cf1a6ca0300000000099ad259d9fa3f9a59bc0274fbe417eeddcf4a18',
          extension: 'docx',
          enableOfficeEditing: true,
          enableAnnotationNumbering: true,
          enableFilePicker: true,
          },
          viewer.current
        ).then((instance) => {
          const { documentViewer } = instance.Core;
          setDocumentViewer(documentViewer);
        });
      }
    });
  }, []);
  const handleSave = () => {
    if (documentViewer) {
      const formData = new FormData();
      formData.append('docxFile', documentViewer.getDocument());
      console.log(documentViewer.getDocument())
      // axios.post('/backend-endpoint', formData)
      //   .then((response) => {
      //     console.log('Successfully sent to the backend');
      //   })
      //   .catch((error) => {
      //     console.log('Failed to send to the backend');
      //   });
      props.shower(true);
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
            customClass="bg-purple-900 w-1/2 shadow-xl text-white py-2 px-4 rounded-lg hover:text-gray-200 hover:font-semibold hover:bg-purple-800 active:text-gray-400 active:font-semibold cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
export default ApryseEditor;