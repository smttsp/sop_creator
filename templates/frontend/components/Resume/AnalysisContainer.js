export default function Result({children}) {
    return (
        <div className="flex h-full bg-red-50 shadow-xl p-4 rounded-xl pt-2 bg-opacity-10">
            {children}
        </div>
    )
}