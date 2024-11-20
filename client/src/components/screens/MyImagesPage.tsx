import DashboardNavbar from "../Dashboard/DashboardNavbar"
import ImagesComponent from "../ImagesComponent"

const MyImagesPage = () => {
    return (
        <div className=" min-h-screen h-auto w-screen bg-black font-sans text-white ">
            <DashboardNavbar />
            <ImagesComponent />
        </div>
    )
}

export default MyImagesPage