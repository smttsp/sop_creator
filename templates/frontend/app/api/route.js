import fetch from 'node-fetch';
import axios from 'axios';

export async function GET(req) {
  return new Response('OK', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}

export async function POST(req) {
  const body = await req.json();
  console.log('this is body jfdkljfdskl kljfdkl gdf', body);

  try {
      const response = await fetch(body.googleDocsUrl, {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
        timeout: 20000,
      });
  
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
      const formData = new FormData();
      formData.append('resume_file', blob, 'document.docx');
      axios.post('http://localhost:5000/upload', formData)
      .then((response) => {
        console.log('Successfully sent to the backend');
        console.log(response.data)
        return new Response(JSON.stringify(response.data), {
          headers: { 'Content-Type': 'application/json' },
          status: 200, // Set the appropriate status code
        });
        console.log("this is result fromt eh back end",response.data)
      })
      .catch((error) => {
        console.log('Failed to send to the backend', error);
        return new Response('find file, but back end not working', {
          status: 404,
          headers: {
            'Content-Type': 'text/plain'
          }
        });
      });

  } catch (error) {
    console.error(error);
    return new Response('Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
