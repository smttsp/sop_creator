import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Button from './Button';

const ApryseEditor = ({ handleKeyWords, loadingSpinnerResult, selectedFile, showRecommendation }) => {
  const { data: session } = useSession({ required: true, onUnauthenticated() { redirect('/'); } });
  const [googleDocsUrl, setGoogleDocsUrl] = useState('');

  useEffect(() => {
    const handleSendToDrive = async () => {
      if (selectedFile) {
        const body = new FormData();
        const metadata = {
          name: selectedFile.name,
        };
        body.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        body.append('file', selectedFile);

        try {
          const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            body: body,
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          const uploadedFile = await response.json();
          const url = `https://docs.google.com/document/d/${uploadedFile.id}/edit`;

          setGoogleDocsUrl(url); // Save the Google Docs URL
          
          const iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.style.width = '100%';
          iframe.style.height = '700px';

          const container = document.getElementById("container-id");
          container.innerHTML = "";
          container.appendChild(iframe);
        } catch (error) {
          alert("Ouch, something went wrong. Try again by choosing a file.");
        }
      } else {
        alert("Please choose a file before sending to Drive.");
      }
    };

    handleSendToDrive();
  }, [selectedFile, session.accessToken]);

  const handleFetchFromDriveAndSendToBackend = async () => {
    if (!googleDocsUrl) {
      alert('Please send the file to Google Drive first.');
      return;
    }
  
    try {
      console.log("this is google doc link", googleDocsUrl);
      const response=await fetch('/api', {
        method:"POST",
        body:JSON.stringify({googleDocsUrl:googleDocsUrl, accessToken:session.accessToken})
      })
      console.log("this is imageresponse",response)
      // handleKeyWords(response.data.message)
     
    } catch (error) {
      console.error('Error fetching file from Google Drive:', error);
      alert('Failed to fetch the document from Google Drive.');
    }
  };

  const handleIdentifyKeys = () => {
    // You may want to add additional logic here if needed
    loadingSpinnerResult(true)
    handleFetchFromDriveAndSendToBackend();
  };

const handleAnalysis=()=>{
    console.log("analysis is selected")
}

  return (
    <div className='mt-1 h-auto '>
      <div id="container-id"></div>
      <div className='my-4 h-16 flex justify-between px-16'>
        <Button
          onClick={handleIdentifyKeys}
          text="Identify keys"
          customClass="result"
        />
        <Button
          onClick={handleAnalysis}
          text="AI analysis"
          customClass="result"
        />
      </div>
    </div>
  );
};

export default ApryseEditor;




// .then((arrayBuffer) => {
//   const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
//   const formData = new FormData();
//   formData.append('resume_file', blob, 'document.docx');

//   axios.post('http://localhost:5000/upload', formData)
//       .then((response) => {
//           console.log('Successfully sent to the backend');
//           handleKeyWords(response.data.message)
//           image_data = get_wc_as_binary(resume.wc)
//           data_dict = resume.wf
//           data_list = [
//               {"id": k, "name": round(v, 2)} for k, v in data_dict.items()
//           ]
  
//           response_data = {"image": image_data, "dict": data_list}
  
//           return jsonify({"message": response_data}), 200
//       })
//       .catch((error) => {
//           console.log('Failed to send to the backend');
//       });
// })
// .catch((error) => {
//   console.error('Error getting file data:', error);
// });
// }
// };

// import React, {useEffect, useRef, useState} from 'react';
// import axios from 'axios';
// import Button from './Button';


// const ApryseEditor = ({handleKeyWords, loadingSpinnerResult, selectedFile, showRecommendation,passDocumentViwer}) => {
//     const viewer = useRef(null);
//     const [documentViewer, setDocumentViewer] = useState(null);
//  
//     const handleIdentifyKeys = () => {
//         loadingSpinnerResult(true)
//         if (documentViewer) {
//             documentViewer.getDocument().getFileData()
//                 .then((arrayBuffer) => {
//                     const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
//                     const formData = new FormData();
//                     formData.append('resume_file', blob, 'document.docx');

//                     axios.post('http://localhost:5000/upload', formData)
//                         .then((response) => {
//                             console.log('Successfully sent to the backend');
//                             handleKeyWords(response.data.message)
//                         })
//                         .catch((error) => {
//                             console.log('Failed to send to the backend');
//                         });
//                 })
//                 .catch((error) => {
//                     console.error('Error getting file data:', error);
//                 });
//         }
//     };
//     const handleAnalysis = () => {
//         showRecommendation(true)
//         passDocumentViwer(documentViewer)
//     }

//     return (
//         <div className="h-auto mt-1">
//             <div className="flex-1 h-150 bg-gray-100" ref={viewer}></div>
//             {documentViewer && <div className='my-4 h-16 flex justify-between px-16'>
//                 <Button
//                     onClick={handleIdentifyKeys}
//                     text="Identify keys"
//                     customClass="result"
//                 />
//                 <Button
//                     onClick={handleAnalysis}
//                     text="AI analysis"
//                     customClass="result"
//                 />
//             </div>

//             }
//         </div>
//     );
// };
// export default ApryseEditor;

      