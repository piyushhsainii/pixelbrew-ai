import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useRecoilState } from 'recoil'
import { userCompleteInfo } from '../../atoms/atoms'
import DashboardNavbar from '../Dashboard/DashboardNavbar'

const MyModels = () => {

    const [userInfo, setuserInfo] = useRecoilState(userCompleteInfo)
    console.log(userInfo?.user)
    return (
        <div className=" min-h-screen h-auto w-screen bg-black font-sans text-white ">
            <DashboardNavbar />
            <div className='text-white mt-10'>
                <Table className="font-sans text-white">
                    <TableCaption   >A list of your recent invoices.</TableCaption>
                    <TableHeader >
                        <TableRow className="text-white border-purple-700 border border-opacity-30 ">
                            <TableHead className=" w-[30%] text-white">ID</TableHead>
                            <TableHead className=" text-white">Model name</TableHead>
                            <TableHead className="text-white ">Training Status</TableHead>
                            <TableHead className="text-white ">Style Mode</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userInfo?.user.FalAI.map((data) => (
                            <TableRow className="text-white" >
                                <TableCell className="font-sans text-base  text-white">{data?.id}</TableCell>
                                <TableCell className="font-sans text-base  text-white">{data?.modelName}</TableCell>
                                <TableCell className={`font-sans text-base  text-white ${data.status == 'completed' ? "text-green-400" : ""}`}>
                                    {data?.status}
                                </TableCell>
                                <TableCell className="font-sans text-base text-white font-light" >
                                    {data?.isDataSet == true ?
                                        "Style Based" :
                                        "Subject Based"
                                    }
                                </TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default MyModels 