import React from "react";

export default function KeyValuePair({keyValue}) {

    return <div className="container mx-auto mt-4 h-72 overflow-scroll bg-gray-50">
        <table className="w-full border border-collapse">
            <thead>
            <tr>
                <th className="border p-2">key</th>
                <th className="border p-2">value</th>
            </tr>
            </thead>
            <tbody>
            {keyValue.map((row) => (
                <tr key={row.id}>
                    <td className="border p-2">{row.id}</td>
                    <td className="border p-2">{row.name}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}
