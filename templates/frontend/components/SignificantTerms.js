import KeyValuePair from "./KeyValuePair"
import Image from "next/image"

export default function SignificantTerms() {
    return (
        <div className="p-4 mx-auto ">
            <h1 className="text-2xl text-white font-bold mb-2">Target words</h1>
            <div className=" relative rounded-md shadow-xl w-72 h-56">
                <Image
                    src="/keyword.webp"
                    alt="significant word image"
                    layout="fill"
                />
            </div>
            <KeyValuePair/>
        </div>
    )
}