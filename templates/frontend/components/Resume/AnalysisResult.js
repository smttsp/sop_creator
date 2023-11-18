import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { redirect } from "next/navigation";
import axios from "axios";
import Button from "./Button";

const fetchAIAnalysis = async (fileId, accessToken) => {
  try {
    const response = await axios.post("api/recommendation", {
      fileId: fileId,
      accessToken: accessToken,
    });
    const analysisData = response.data.message;
    return analysisData;
  } catch (error) {
    console.error("Failed to send to the backend:", error);
    return null;
  }
};

export default function Analysis({ fileId }) {
  const [AIAnalysis, setAIAnalysis] = useState([]);
  const [acceptedRows, setAcceptedRows] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analysisData = await fetchAIAnalysis(
          fileId,
          session.accessToken
        );
        console.log("return analysis", analysisData)
        setAIAnalysis(analysisData);
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching AI analysis:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [fileId, session.accessToken]);

  const handleButtonClick = (rowId) => {
    if (acceptedRows.includes(rowId)) {
      setAcceptedRows(acceptedRows.filter((id) => id !== rowId));
    } else {
      setAcceptedRows([...acceptedRows, rowId]);
    }
    setSelectedButton(null);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner customClass="w-24 h-24" />
      ) : (
        <div className="container mx-auto mt-4 h-72 w-screen overflow-scroll bg-gray-50 rounded-lg">
          {AIAnalysis && (
            <table className="w-full border border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Current</th>
                  <th className="border p-2">Recommendation</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Acceptance</th>
                </tr>
              </thead>
              <tbody>
                {AIAnalysis.map((row) => (
                  <tr key={row.id}>
                    <td className="border text-center">{row.current}</td>
                    <td className="border text-center">{row.recommendation}</td>
                    <td className="border p-2 text-center">{row.reason}</td>
                    <td className="border p-2 flex justify-center">
                      {acceptedRows.includes(row.id) ? (
                        <Button
                          text="Revert"
                          customClass=" h-6  w-20 rounded-xl bg-gray-500 hover:bg-gray-700 active:bg-gray-900"
                          onClick={() => handleButtonClick(row.id)}
                        />
                      ) : (
                        <Button
                          text="Accept"
                          customClass=" h-6  w-20 rounded-xl bg-green-500 hover:bg-green-700 active:bg-green-900 a "
                          onClick={() => handleButtonClick(row.id)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}
