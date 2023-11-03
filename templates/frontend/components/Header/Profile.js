import Image from "next/image"
export default function Profile({user}){
    return <div className="flex gap-2 ">
            <div className="bg-white h-6 my-auto text-black"><p>{user.name}</p></div>
            <div className="h-12 w-12 rounded-full overflow-hidden bg-white "><Image src={user.imageUrl}
                   alt="profile"
                   className="object-cover w-full h-full"
                   width={20}
                   height={20}/>
                   </div>
        
            
            
    </div>
}