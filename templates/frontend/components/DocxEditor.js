import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";

function Editor({ content }) {
  const { quill } = useQuill();

  useEffect(() => {
    if (quill && content) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [quill, content]);

  return (
    <div className="w-3/4 mx-auto">
      <div style={{ height: "300px" }} />
    </div>
  );
}

export default Editor;

