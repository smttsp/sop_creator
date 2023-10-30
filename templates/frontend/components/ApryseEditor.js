import React, { useState, useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import Button from './Button';

const ApryseEditor = (props) => {
  const viewer = useRef(null);
  const [documentViewer, setDocumentViewer] = useState(null)
  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/webviewer/lib',
          licenseKey: 'demo:1698352503737:7cf1a6ca0300000000099ad259d9fa3f9a59bc0274fbe417eeddcf4a18',
          enableOfficeEditing: true,
          enableMeasurement: true,
          enableFilePicker: true,
          enableAnnotationNumbering: true,
        },
        viewer.current
      ).then((instance) => {
        const { documentViewer } = instance.Core;
        
        setDocumentViewer(documentViewer)
      });
    });
  }, []);

  const handleSave = () =>{
      const formData = new FormData();
      formData.append('docxFile', documentViewer.getDocument());
      console.log(documentViewer.getDocument())

        // axios.post('/backend-endpoint', formData)
        //   .then((response) => {
      
        //     console.log('Successfully send to the backend');
        //   })
        //   .catch((error) => {

        //     console.log("failed to send to the backend") 
        //   });
      
        props.shower(true)

  }

  return (
    <div className="h-150 mt-1 flex flex-col">
      <div className="flex-1 bg-gray-100" ref={viewer}></div>
      <div className='ml-24 my-4'>
        {documentViewer && <Button onClick={handleSave} 
                text = {"Identify keys"}
                customClass = {"w-1/2 bg-purple-900 flex-auto hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-2xl shadow-xl"}
                />

        }
        </div>
      </div>
  );
};

export default ApryseEditor;