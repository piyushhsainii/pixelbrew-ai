import { useRecoilState } from "recoil"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { userCompleteInfo } from "../../atoms/atoms"


const AllPurchases = () => {

    const [userPayments, setuserPayments] = useRecoilState(userCompleteInfo)
    console.log(userPayments)
    return (
        <div className="bg-black text-white font-sans">
            <Table className="font-sans text-white">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader >
                    <TableRow className="text-white ">
                        <TableHead className="w-[100px] text-white">Payment ID</TableHead>
                        <TableHead className="text-white ">Status</TableHead>
                        <TableHead className="text-white ">Method</TableHead>
                        <TableHead className="text-right text-white">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userPayments?.user?.Payments?.map((paymentInfo) => {
                        <TableRow className="text-white" >
                            <TableCell className="font-medium">{paymentInfo.paymentId}1</TableCell>
                            <TableCell className="font-medium">{paymentInfo.status}2</TableCell>
                            <TableCell className="font-medium">{paymentInfo.method}3</TableCell>
                            <TableCell className="font-medium">{paymentInfo.tokensPurchased.toString()}4</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

        </div>
    )
}

export default AllPurchases