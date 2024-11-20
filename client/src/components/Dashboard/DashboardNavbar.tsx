import { Link } from 'react-router-dom'

const DashboardNavbar = () => {

    const params = window.location.pathname
    console.log(params)
    return (
        <div className=" min-h-[65vh] h-auto w-screen bg-black font-sans text-white ">
            <div className="flex justify-start gap-5 p-4 my-3   border border-purple-700 border-opacity-40  mt-16 text-purple-400 max-w-[1600px] m-auto" >
                <Link to={'/dashboard/exploreModels'} >
                    <div className={`p-4 ${params == "/dashboard/exploreModels" && 'bg-purple-700 text-white'} cursor-pointer 'text-white bg-purple-700'}  hover:bg-purple-700 hover:text-white  `}>
                        Explore Models
                    </div>
                </Link>
                <Link to={'/dashboard/myModels'} >
                    <div className={`p-4 cursor-pointer ${params == "/dashboard/myModels" && 'bg-purple-700 text-white'} 'text-white bg-purple-700'}  hover:bg-purple-700 hover:text-white  `}>
                        My Models
                    </div>
                </Link>
                <Link to={'/dashboard/myImages'} >
                    <div className={` ${params == "/dashboard/myImages" && 'bg-purple-700 text-white'} p-4 cursor-pointer hover:bg-purple-700 hover:text-white  `}
                    >My Images
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DashboardNavbar