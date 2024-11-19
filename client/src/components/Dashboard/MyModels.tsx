import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import CustomModelCard from './CustomModelCard'

const MyModels = () => {

    const data = [
        {
            id: "",
            status: false
        }
    ]

    return (
        <div className='text-white mt-10'>
            <Table className="font-sans text-white">
                <TableCaption   >A list of your recent invoices.</TableCaption>
                <TableHeader >
                    <TableRow className="text-white border-purple-700 border border-opacity-30 ">
                        <TableHead className=" text-white">ID</TableHead>
                        <TableHead className=" text-white">Name</TableHead>
                        <TableHead className="text-white ">Status</TableHead>
                        <TableHead className="text-white ">Style Mode</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((data) => (
                        <TableRow className="text-white" >
                            <TableCell className="font-sans text-base  text-white">{data.id}</TableCell>
                            <TableCell className="font-sans text-base  text-white">
                                {data.status ?
                                    <span className="text-green-400 font-semibold"> Paid </span> : null
                                }
                            </TableCell>
                            <TableCell className="font-sans text-base  text-white"></TableCell>
                            <TableCell className="font-sans text-base text-white font-semibold" > ₹</TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
        </div>
    )
}

export default MyModels 