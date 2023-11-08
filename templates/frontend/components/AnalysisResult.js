import Button from "./Button"
export default function Analysis(){
    const keyValue = [{"id":1, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl"},
                    {"id":1, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl"},
                    {"id":1, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl"},
                    {"id":1, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl"},
                ]
    return <div className="container mx-auto mt-4 h-72 overflow-scroll bg-gray-50 rounded-lg">
    <table className="w-full border border-collapse">
        <thead>
        <tr>
            <th className="border p-2">current</th>
            <th className="border p-2">recommendataion</th>
            <th className="border p-2">acceptance</th>
        </tr>
        </thead>
        <tbody>
        {keyValue.map((row) => (
            <tr key={row.id}>
                <td className="border p-2">{row.current}</td>
                <td className="border p-2">{row.recomend}</td>
                <td  className="border p-2 ">
                    <div className="ml-6 flex gap-8 text-sm text-white">
                    <Button
                          text="Accept"
                          customClass=" h-4  w-16 rounded-xl bg-green-500 hover:bg-green-700 active:bg-green-900"
                          />
                    <Button
                          text="Revert"
                          customClass="h-4  w-16 rounded-xl bg-gray-500 hover:bg-gray-700 active:bg-gray-900 a "
                          />

                    </div>
                   
                </td>

            </tr>
        ))}
        </tbody>
    </table>
</div>
}