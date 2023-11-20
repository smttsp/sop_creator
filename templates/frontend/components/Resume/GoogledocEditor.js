import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {useEffect, useState, useRef} from 'react';
import {fetchData} from '@/redux/features/recommend-slice';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Button from './Button';

const GoogledocEditor = ({handleKeyWords, loadingSpinnerResult, selectedFile}) => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    }
  });
  const dispatch=useDispatch();
  const [googleDocsUrl, setGoogleDocsUrl] = useState('');
  const [fileId, setFileId] = useState('');
  const [editorFullyShown, setEditorFullyShown] = useState(false);
  const editorRef=useRef(null);

  useEffect(() => {
    const handleSendToDrive = async () => {
      if (selectedFile) {
        const refreshResponse = await axios.post(
            "https://accounts.google.com/o/oauth2/token",
            new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              refresh_token: session.refreshToken,
              grant_type: "refresh_token",
            })
          );
        session.accessToken = refreshResponse.data.access_token;
        const body = new FormData();
        const metadata = {
          name: selectedFile.name,
        };
        body.append("metadata", new Blob([JSON.stringify(metadata)], {type: "application/json"}));
        body.append('file', selectedFile);

        try {
          const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            body: body,
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            params: {
              key: process.env.GOOGLE_APIKEY,
            },
          });

          const uploadedFile = await response.json();
          const url = `https://docs.google.com/document/d/${uploadedFile.id}/edit`;

          setGoogleDocsUrl(url);
          setFileId(uploadedFile.id);

          const iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.style.width = '100%';
          iframe.style.height = '700px';

          const container = document.getElementById("container-id");
          container.innerHTML = "";
          container.appendChild(iframe);

          if (editorRef.current) {
            editorRef.current.scrollIntoView({behavior: "smooth", block: "start"});
            setEditorFullyShown(true);
          }
        } catch (error) {
          alert("Ouch, something went wrong. Try again by choosing a file.");
        }
      } else {
        alert("Please choose a file before sending it to Drive.");
      }
    };

    handleSendToDrive();
  }, [selectedFile]);

  const handleFetchFromDriveAndSendToBackend = async () => {
    if (!googleDocsUrl) {
      alert('Please send the file to Google Drive first.');
      return;
    }

    axios.post('/api', {
      accessToken: session.accessToken,
      fileId: fileId,
    })
      .then(response => {
        handleKeyWords(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching file from Google Drive:', error);
        alert('Failed to fetch the document from Google Drive.');
      });
  };

  const handleIdentifyKeys = () => {
    loadingSpinnerResult(true);
    handleFetchFromDriveAndSendToBackend();
  };

  const handleAnalysis = () => {
    const recommendPost={
      fileId:fileId,
      accessToken:session.accessToken
    }
    dispatch(fetchData(recommendPost));
  };

  return (
    <div className='mt-1 h-auto '>
      <div id="container-id" ref={editorRef}></div>
      {editorFullyShown && (
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
      )}
    </div>
  );
};
export default GoogledocEditor;
