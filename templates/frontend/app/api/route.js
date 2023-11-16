import fetch from 'node-fetch';
import axios from 'axios';
export async function POST(req) {
  const body = await req.json();
  console.log('this is body jfdkljfdskl kljfdkl gdf', body);

  try {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${body.fileId}?alt=media`, {
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        Accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      responseType: 'arraybuffer',
      params: {
        key: process.env.GOOGLE_APIKEY,
      },
      timeout: 20000,
    });

    const contentType = response.headers.get('Content-Type');
    // Use arrayBuffer() to get the response data
    const arrayBuffer = await response.arrayBuffer();
    // Create a Blob from the ArrayBuffer
    const fetchedFile = new Blob([arrayBuffer], {
      type:'application/octet-stream'
    });
    // const blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
    const formData = new FormData();
    formData.append('resume_file', fetchedFile, 'document.docx');

    axios.post('http://localhost:5000/upload', formData)
        .then((response) => {
          console.log('Successfully sent to the backend');
          console.log("Content-Type:", response.headers.get('Content-Type'));
          console.log(response.data.message)
          const responseData = {
            message: 'Successfully sent to the backend',
            data: response.data.message,  // Assuming dict is the key in your response
          };

          return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
              'Content-Type': 'application/json', // Set the content type as JSON
            }
          });
        })
  .catch((error) => {
    console.log('Failed to send to the backend');
  });
                  
    console.log("this is fetched file", fetchedFile);
    
    return new Response(fetchedFile, {
      status: 200,
      headers: {
        'Content-Type': contentType, // Set the content type dynamically
      }
    });
  } catch (error) {
    console.error(error);
    return new Response('Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
