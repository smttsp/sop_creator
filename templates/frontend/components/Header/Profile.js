import Image from "next/image"
export default function Profile(){
    return <div className=" h-12 w-12 rounded-full rounded-full overflow-hidden bg-white ">
            <Image src="/profile-image.jpeg"
                   alt="profile"
                   class="object-cover w-full h-full"
                   width={20}
                   height={20}/>
                   
    </div>
}