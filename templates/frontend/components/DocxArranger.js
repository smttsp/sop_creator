import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import mammoth from "mammoth";

function DocxArranger({ setShowButton }) {
  const { quill, quillRef } = useQuill();
  const [editorVisible, setEditorVisible] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [editedContent, setEditedContent] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContents = e.target.result;

      
      mammoth.convertToHtml({ arrayBuffer: fileContents })
        .then((result) => {
          const html = result.value;
          setFileContent(html);

    
          setEditorVisible(true);

          setShowButton(true);
        })
        .catch((error) => {
          console.error("Error converting .docx to HTML", error);
        });
    };

    useEffect(() => {
        if (quill && fileContent) {
            quill.clipboard.dangerouslyPasteHTML(fileContent);
        }
    }, [quill, fileContent]);


  const handleSave = () => {
    if (quill) {
      const editedHTML = quill.root.innerHTML;
      setEditedContent(editedHTML);

      // Create a Blob from the edited content
      const blob = new Blob([editedHTML], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      
      
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    }
  };

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
        <div>
          <label
            htmlFor="docxInput"
            className="bg-purple-900 hover-bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
          >
            Upload Resume
          </label>
        </div>
      </div>

      {editorVisible && (
        <div className="w-full mx-auto bg-white relative">
          <div className="quill-toolbar">
            <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
              Save
            </button>
          </div>
          <div style={{ height: "500px", width:"650px" }} ref={quillRef} />
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="edited_resume.docx"
              className="absolute top-0 h-10 right-0 bg-green-500 text-white py-2 px-4 rounded"
            >
              Download File
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default DocxArranger;
