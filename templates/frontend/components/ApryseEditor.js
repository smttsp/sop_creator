import React, {useEffect, useRef} from 'react';
import WebViewer from '@pdftron/webviewer';
import Button from './Button';

const ApryseEditor = (props) => {
    const viewer = useRef(null);
    const webViewerInstance = useRef(null);

    useEffect(() => {
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
            webViewerInstance.current = instance;
        });
    }, []);

    const handleSave = async () => {
        props.shower(true)
        // this is to send data to the back end
        // if (webViewerInstance.current) {
        //   const docxData = await webViewerInstance.current.getFileData({ xfdfString: true });
        //   console.log("its edited file")
        //   console.log(docxData)
        // //   // Send docxData to the backend using Axios
        // //   axios.post('/your-backend-endpoint', { docxData })
        // //     .then((response) => {
        // //       // Handle the response from the backend (e.g., display a success message or update UI)
        // //     })
        // //     .catch((error) => {
        // //       console.error('Error while saving:', error);
        // //     });
        //  }
    };

    return (
        <div className="h-150 mt-1 flex flex-col">
            <div className="flex-1 bg-gray-100" ref={viewer}></div>
            <div className='ml-24 my-4'>
                <Button onClick={handleSave}
                        text={"Identify keys"}
                        customClass={"w-1/2 bg-purple-900 flex-auto hover:bg-purple-600 text-white font-semibold py-2 px-4 rounde-2xl shadow-xl"}
                />
            </div>
        </div>

    );
};

export default ApryseEditor;
