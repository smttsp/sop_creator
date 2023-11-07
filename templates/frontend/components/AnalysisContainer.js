export default function Result({children}) {
    return (
        <div className="bg-opacity-50 flex h-full bg-red-50 shadow-xl p-4 rounded-xl pt-2 ">
            {children}
        </div>
    )
}