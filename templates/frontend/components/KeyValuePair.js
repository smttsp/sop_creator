import React, {useEffect, useState} from "react";

export default function KeyValuePair({keywords}) {
    
    return <div className="container mx-auto mt-4">
        <table className="w-full border border-collapse">
            <thead>
            <tr>
                <th className="border p-2">key</th>
                <th className="border p-2">value</th>
            </tr>
            </thead>
            <tbody>
          
               {keywords.map((row) => (
                    <tr key={row.id}>
                        <td className="border p-2">{row.id}</td>
                        <td className="border p-2">{row.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}