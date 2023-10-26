"use client"
import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import mammoth from "mammoth";

function DocxArranger({ setShowButton }) {
  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState("");
  const [editorVisible, setEditorVisible] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContents = e.target.result;

      // Use mammoth to convert .docx to HTML
      mammoth.convertToHtml({ arrayBuffer: fileContents })
        .then((result) => {
          const html = result.value;
          setFileContent(html);

          // Show the editor after the file is uploaded and processed
          setEditorVisible(true);

          
          setShowButton(true);
        })
        .catch((error) => {
          console.error("Error converting .docx to HTML", error);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (quill && fileContent) {
      quill.clipboard.dangerouslyPasteHTML(fileContent);
    }
  }, [quill, fileContent]);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <div className="w-3/4 mx-auto my-4">
        <input
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          className="hidden"
          id="docxInput"
        />
        <div className="">
        <label
          htmlFor="docxInput"
          className="bg-purple-900 hover-bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
        >
          Upload Resume
        </label>

        </div>
        
      </div>
      {editorVisible && (
        <div className="w-3/4 mx-auto bg-white ">
          <div style={{ height: "500px" }} ref={quillRef} />
        </div>
      )}
    </div>
  );
}

export default DocxArranger;
