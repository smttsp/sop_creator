import React, {useState, useEffect} from "react";
export default function KeyValuePair(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // simulating fetching data from backend
    useEffect(() => {
       
        setTimeout(() => {
          const fetchedData = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Alice' },
            { id: 3, name: 'Bob' },
            { id: 1, name: 'John' },
            
          ];
          setData(fetchedData);
          setLoading(false);
        }, 2000); 
      }, []);


    return <div className="container mx-auto mt-4">
        <table className="w-full border border-collapse">
            <thead>
                <tr>
                <th className="border p-2">key</th>
                <th className="border p-2">value</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                <tr>
                    <td className="border p-2" colSpan="2">
                    Loading...
                    </td>
                </tr>
                ) : (
                data.map((row) => (
                    <tr key={row.id}>
                    <td className="border p-2">{row.id}</td>
                    <td className="border p-2">{row.name}</td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
  </div>
            
}