import { useState } from "react"
import ImagesComponent from "../ImagesComponent"

export type active = "MyModels" | "MyImages" | "Dashboard" | "TrainModels"
const Dashboard = () => {

    const [ActiveComponent, setActiveComponent] = useState<active>("MyImages")

    return (
        <div className=" min-h-screen w-screen bg-black font-sans text-white ">
            <div className="flex justify-start gap-5 p-4 m-3  border border-purple-700 border-opacity-40  mt-16 text-purple-400 " >
                <div className={`p-4 cursor-pointer ${ActiveComponent == "Dashboard" && 'text-white bg-purple-700'}  hover:bg-purple-700 hover:text-white  `}
                    onClick={() => setActiveComponent("Dashboard")}
                >
                    Dashboard
                </div>
                <div className={`p-4 cursor-pointer ${ActiveComponent == "TrainModels" && 'text-white bg-purple-700'}  hover:bg-purple-700 hover:text-white  `}
                    onClick={() => setActiveComponent("TrainModels")}
                >
                    Train Model
                </div>
                <div className={`p-4 cursor-pointer ${ActiveComponent == "MyModels" && 'text-white bg-purple-700'}  hover:bg-purple-700 hover:text-white  `}
                    onClick={() => setActiveComponent("MyModels")}
                >
                    My Models
                </div>
                <div
                    className={`${ActiveComponent === "MyImages" && 'bg-purple-700 text-white'} p-4 cursor-pointer hover:bg-purple-700 hover:text-white  `}
                    onClick={() => setActiveComponent("MyImages")} >My Images
                </div>
            </div>
            <div>
                {
                    ActiveComponent == "MyImages" ?
                        <ImagesComponent />
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Dashboard