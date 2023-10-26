import React from 'react';
import axios from 'axios';

export default function FileUploadComponent({
                                                file
                                            }) {
    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            axios.post('/upload', formData)
                .then(response => {
                    console.log('File uploaded successfully:', response.data.message);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        } else {
            alert('Please select a file to upload.');
        }
    };

    // const handleUpload = () => {
    //   if (file) {
    //
    //     console.log('Uploading file:', file);
    //   } else {
    //     alert('Please select a file to upload.');
    //   }
    // };

    return (<
            div>
            <
                h2> File Upload Component < /h2> {
            file ? (<
                    div>
                    <
                        p> Selected File: {
                        file.name
                    } < /p>
                    <
                        button onClick={
                        handleUpload
                    }> Upload
                    < /button>
                <
                /div>
            ) : (<
                    p> No file selected. < /p>
            )
        } <
        /div>
    );
}