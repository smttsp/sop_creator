import {useState} from 'react';
import ProfileDetail from './ProfileDetail';
import Image from "next/image"

export default function Profile({user}) {
    const [showDetail, setShowDetail] = useState(false)

    const handleShowDetail = () => {
        setShowDetail(true)
    }
    const closeDetail = () => {
        setShowDetail(false)
    }
    return <div className="mr-8">
        <button className="h-12 w-12 rounded-full overflow-hidden bg-white "
                onClick={handleShowDetail}>
            <Image src={user.imageUrl}
                   alt="profile"
                   className="object-cover w-full h-full"
                   width={20}
                   height={20}
            />
        </button>
        {
            showDetail &&
            <ProfileDetail
                userName={user.name}
                profileImage={user.imageUrl}
                closeDetail={closeDetail}
            />
        }

    </div>
}


