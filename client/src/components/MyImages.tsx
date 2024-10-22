import { Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MyImages = () => {

    const navigate = useNavigate()
    return (
        <div onClick={() => { navigate('/myImages') }} >
            <Image color="#7e22ce" className='hover:scale-125 duration-150 transition-all cursor-pointer bg-black rounded-lg' />
        </div>
    )
}

export default MyImages