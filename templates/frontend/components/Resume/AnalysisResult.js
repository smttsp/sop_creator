import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from 'react-redux';
import { redirect } from "next/navigation";
import Button from "./Button";

export default function Analysis() {
  const [acceptedRows, setAcceptedRows] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const { data, status, error } = useSelector((state) => state.data);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  if (status === 'loading') {
    return <LoadingSpinner customClass="w-24 h-24" /> ;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const handleButtonClick = (rowId) => {
    if (acceptedRows.includes(rowId)) {
      setAcceptedRows(acceptedRows.filter((id) => id !== rowId));
    } else {
      setAcceptedRows([...acceptedRows, rowId]);
    }
    setSelectedButton(null);
  };

  if (status === 'succeeded' && data.length > 0) {
  return (
    <>
        <div className="container mx-auto mt-4 h-72 w-screen overflow-scroll rounded-lg">
            <table className="w-full border border-collapse bg-opacity-5">
              <thead>
                <tr>
                  <th className="border p-2">Current</th>
                  <th className="border p-2">Recommendation</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Acceptance</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((row) => (
                  <tr key={row.id}>
                    <td className="border text-cente ">{row.current}</td>
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
        </div>
    </>
  );}
}
