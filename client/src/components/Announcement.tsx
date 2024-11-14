import { PartyPopper } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { announcement } from './Data/data'

const Announcement = () => {
    return (
        <div className='fixed left-4 bottom-4 z-[100]'>
            <Dialog>
                <DialogTrigger>
                    <PartyPopper
                        color='purple'
                        size={50}
                        className='m-2 border border-purple-700 p-2  rounded-full hover:bg-purple-700 hover:bg-opacity-40 cursor-pointer'
                    />
                </DialogTrigger>
                <DialogContent className='w-[70vw] overflow-y-auto h-[70vh] bg-black text-white border border-purple-700 ' >
                    <div className='font-sans ' >
                        <div className='text-xl m-3'>  {announcement.announcement.title} </div>
                        <div className='mx-3'> {announcement.announcement.intro} </div>
                        <div>
                            {announcement.announcement.sections.map((data) => (
                                <>
                                    <div className='text-lg m-3'>{data.heading}</div>
                                    <div className='mx-3'>
                                        {data.features?.map((data) => (
                                            <>
                                                <div className='m-2'> {data.title}  </div>
                                                <div className='m-2'> {data.description} </div>
                                            </>
                                        ))}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Announcement