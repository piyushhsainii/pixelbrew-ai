import ImagesComponent from "../ImagesComponent"

const MyImagesPage = () => {
    return (
        <div className='bg-black h-full min-h-screen text-white font-sans' >
            <div className="font-mono text-2xl p-8 pt-5" >
                History
            </div>
            <ImagesComponent />
        </div>
    )
}

export default MyImagesPage