const TitleCard=({upper, middle,lower, elaboration})=>{
    return (
        <div className = "px-8 py-4 items-center">
                <div className = "font-bold text-5xl text-gray-700">
                    <div className="text-blue-500">{upper}</div>
                    <div className="ml-6">{middle}</div>
                    <div>{lower}</div>

                </div>
                <div className = "text-center opacity-50">
                    <p>{elaboration}</p>

                </div>  
            </div>

    )

}
export default TitleCard