import { useRecoilState } from "recoil"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { userCompleteInfo } from "../../atoms/atoms"
import Loader from "../Loader"
import { Link } from "react-router-dom"
import ShadowBtn from "../ShadowBtn"

const AllPurchases = () => {
    const [userPayments, setuserPayments] = useRecoilState(userCompleteInfo)
    console.log(userPayments)
    return (
        <>{userPayments?.user?.Payments.length == null ?
            <div className=" h-[75vh] md:h-[60vh] bg-black flex flex-col md:flex-row items-center justify-center md:justify-evenly">
                <iframe
                    src="https://lottie.host/embed/b9548532-b6c3-439f-aa46-f3b6829d7bd1/KTuAP0GVNT.lottie"
                    className=" w-36 md:w-48 md:h-48"
                ></iframe>
                <div className="flex flex-col text-white text-pretty font-sans justify-center items-center gap-7 text-2xl select-none">
                    <div className="text-center">
                        Buy some tokens to generate awesome AI images!
                        <div className="text-center text-base mt-2"> No invoices yet! </div>
                    </div>
                    <div><Link to={'/shop'}><ShadowBtn string="BUY TOKENS " classname="text-lg " /></Link></div>
                </div>
            </div> :
            userPayments ?
                <div className="bg-black text-white font-sans mt-16">
                    <Table className="font-sans text-white">
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader >
                            <TableRow className="text-white border-purple-700 border border-opacity-30 ">
                                <TableHead className="w-[100px] text-white">Payment ID</TableHead>
                                <TableHead className="text-white ">Status</TableHead>
                                <TableHead className="text-white ">Method</TableHead>
                                <TableHead className=" text-white">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userPayments?.user?.Payments?.map((paymentInfo) => (
                                <TableRow className="text-white" >
                                    <TableCell className="font-sans text-base  text-white">{paymentInfo.paymentId}</TableCell>
                                    <TableCell className="font-sans text-base  text-white">
                                        {paymentInfo.status == "captured" ?
                                            <span className="text-green-400 font-semibold"> Paid </span> :
                                            <span className={`font-semibold ${paymentInfo.status == "failed" ? "text-red-500" : ""}`}> {paymentInfo.status} </span>
                                        }
                                    </TableCell>
                                    <TableCell className="font-sans text-base  text-white">{paymentInfo.method}</TableCell>
                                    <TableCell className="font-sans text-base text-white font-semibold" > ₹{(paymentInfo.tokensPurchased / 100).toString()}</TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </div> :
                <Loader />}
        </>)
}

export default AllPurchases