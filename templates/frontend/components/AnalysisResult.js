import Button from "./Button"
export default function Analysis(){
    const keyValue = [{"id":1, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl", "reason":"iouodsjidsoijodsjidsohfs"},
                    {"id":2, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl", "reason":"iouodsjidsoijodsjidsohfs"},
                    {"id":3, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl", "reason":"iouodsjidsoijodsjidsohfs"},
                    {"id":4, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl", "reason":"iouodsjidsoijodsjidsohfs"},
                    {"id":5, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl", "reason":"iouodsjidsoijodsjidsohfs"},
                    {"id":6, "current":"jhadjshfdsjhuuds","recomend": "jlkj;akldjklajdsfkljdkljdsl", "reason":"iouodsjidsoijodsjidsohfs"},
                ]
    return <div className="container mx-auto mt-4 h-72 w-screen overflow-scroll bg-gray-50 rounded-lg">
    <table className="w-full border border-collapse">
        <thead>
        <tr>
            <th className="border p-2">current</th>
            <th className="border p-2">Recommendataion</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Acceptance</th>
        </tr>
        </thead>
        <tbody>
        {keyValue.map((row) => (
            <tr key={row.id}>
                <td className="border text-center">{row.current}</td>
                <td className="border text-center">{row.recomend}</td>
                <td className="border p-2 text-center">{row.reason}</td>
                <td  className="border p-2 flex">
                    <div className="mx-auto flex gap-8 text-sm text-white">
                    <Button
                          text="Accept"
                          customClass=" h-6  w-20 rounded-xl bg-green-500 hover:bg-green-700 active:bg-green-900"
                          />
                    <Button
                          text="Revert"
                          customClass="h-6  w-20 rounded-xl bg-gray-500 hover:bg-gray-700 active:bg-gray-900 a "
                          />

                    </div>
                   
                </td>

            </tr>
        ))}
        </tbody>
    </table>
</div>
}