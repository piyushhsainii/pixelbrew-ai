"use client"
import { useEffect, useState } from "react"
import { Plus, Minus, ShoppingCart, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useRecoilState } from "recoil"
import { authUser, userCompleteInfo } from "../../atoms/atoms"
import { BACKEND_URL } from "../../lib/url"
import axios from "axios"
import { useToast } from "../../hooks/use-toast"
import { useNavigate } from "react-router-dom"

interface Token {
    id: number
    name: string
    price: number
    tokenAmt: number,
    description: string
}
declare global {
    interface Window {
        Razorpay: any;
    }
}
interface CartItem extends Token {
    quantity: number
}
const availableTokens: Token[] = [
    { id: 1, name: "Basic", price: 39, tokenAmt: 10, description: "Ideal for trying out our platform." },
    { id: 2, name: "Standard", price: 69, tokenAmt: 20, description: "Perfect for moderate usage, offering better value for professionals or teams with consistent needs." },
    { id: 3, name: "Super Saver", price: 99, tokenAmt: 30, description: "Designed to provide great savings and more flexibility for larger projects." },
    { id: 4, name: "Training Card", price: 249, tokenAmt: 80, description: "Best for intensive usage like model training or enterprise-level tasks. Maximum value for power users or larger teams." },
]

export default function AddToCart() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [user, setUser] = useRecoilState(authUser)
    const [totalPrice, setTotalPrice] = useState<Number | null>(null)
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userCompleteInfo)
    const [TokenCount, setTokenCount] = useState<any>(0)
    const { toast } = useToast()
    const navigate = useNavigate()
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const addToCart = (token: Token) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === token.id)
            if (existingItem) {
                // Increase quantity if token is already in cart
                return prevCart.map((item) =>
                    item.id === token.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            } else {
                // Add new item to cart with quantity 1
                return [...prevCart, { ...token, quantity: 1 }]
            }
        })
    }
    const removeFromCart = (tokenId: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === tokenId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) // Remove items with quantity 0
        )
    }
    async function displayRazorpay() {
        setLoading(true);
        try {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

            if (!res) {
                alert('Razorpay SDK failed to load');
                return;
            }
            // Fetch order details from your backend
            const { data } = await axios.post(`${BACKEND_URL}/purchaseTokens`, {
                amount: totalPrice
            });

            const options = {
                key: 'rzp_live_Z8ObYvmttZQHYh', // Enter the Key ID generated from the Dashboard
                amount: data.response.amount, // Amount is in currency subunits
                currency: "INR",
                name: "Pixel Brew AI",
                description: TokenCount + " " + "Tokens Purchased:",
                image: "https://res.cloudinary.com/dzow59kgu/image/upload/v1731608964/Screenshot_2024-11-14_235851_tqvdhi.png",
                app_name: "PixelBrew AI",
                order_id: data.response.id, // Use the order ID from your backend response
                handler: async function (response) {                //Handler Response
                    //response_order_id && //response_payment_id && response.signature
                    const { data, status } = await axios.post(`${BACKEND_URL}/fetchPayments`, {
                        paymentID: response.razorpay_payment_id
                    })
                    if (status == 200) {
                        window.location.reload()
                        toast({
                            title: "Tokens purchase successfull",
                            variant: "default",
                            className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                        });
                    }
                },
                prefill: {
                    name: user.user_metadata.name, // Add customer name if available
                    email: user.email, // Add customer email if available
                    contact: "", // Add customer phone if available
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                },

            };
            // Create a new instance using the window.Razorpay
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
            // Handle payment failure
            razorpayInstance.on('payment.failed', function (response) {
                alert("Payment failed. Please try again.");
                console.log("Payment failed:", response.error);
            });

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setTotalPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))
    }, [cart])
    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 mt-8 text-purple-600">
                    Token Purchase
                </h1>
                <div className="">
                    <h2 className="text-2xl font-semibold mb-4  text-white">Available Tokens</h2>
                    <div className="flex items-end justify-evenly flex-wrap h-full w-full gap-3">
                        {availableTokens.map((token) => (
                            <Card key={token.id} className="flex flex-col justify-between bg-gray-900 border-purple-600 h-[22rem] w-[17rem] p-2 shadow-purple-700  shadow-[3px_2px_1px_[1]px_rgba(2,4,4,0.2)]">
                                <CardHeader>
                                    <CardTitle className="text-gray-300 flex items-center  text-center text-xl">
                                        {token.name} {'('} {token.tokenAmt} <Zap color="#9333ea " size={14} className="mx-1" />  {')'}
                                    </CardTitle>
                                    <div className="flex text-2xl">
                                        <p className="text-gray-300 font-semibold" > ₹{token.price}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between">
                                    <div className="text-sm text-white text-pretty"> {token.description} </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        disabled={userInfo == null ? true : false}
                                        onClick={() => {
                                            addToCart(token)
                                            setTokenCount((tokenCount) => {
                                                let newTokenCount = tokenCount;
                                                if (token.id == 1) {
                                                    newTokenCount = tokenCount + 10
                                                }
                                                if (token.id == 2) {
                                                    newTokenCount = tokenCount + 20
                                                }
                                                if (token.id == 3) {
                                                    newTokenCount = tokenCount + 30
                                                }
                                                if (token.id == 4) {
                                                    newTokenCount = tokenCount + 80
                                                }
                                                return newTokenCount
                                            })
                                        }}
                                        className="w-full bg-white text-black hover:bg-purple-600 active:scale-95
                                        hover:scale-110 transition-all duration-200
                                        ">
                                        <Plus className="mr-2 h-4 w-4" /> Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold my-4 text-purple-300">Your Cart</h2>
                    <Card className="bg-gray-900 border-purple-500">
                        <CardHeader>
                            <CardTitle className="flex items-center text-purple-300">
                                <ShoppingCart className="mr-2" /> Cart Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {cart.length === 0 ? (
                                <p className="text-gray-400">Your cart is empty</p>
                            ) : (
                                <ul>
                                    {cart.map((item, index) => (
                                        <div key={index} >
                                            <li key={index} className="flex justify-between items-center mb-2 text-white">
                                                <span>{item.name} (x{item.quantity})</span>
                                                <div>
                                                    <span className="mr-4">₹{item.price * item.quantity}</span>
                                                    <Button
                                                        onClick={() => {
                                                            removeFromCart(item.id)
                                                            setTokenCount((tokenCount) => {
                                                                let newTokenCount = tokenCount;
                                                                if (item.id == 1) {
                                                                    newTokenCount = tokenCount - 10
                                                                }
                                                                if (item.id == 2) {
                                                                    newTokenCount = tokenCount - 20
                                                                }
                                                                if (item.id == 3) {
                                                                    newTokenCount = tokenCount - 30
                                                                }
                                                                if (item.id == 4) {
                                                                    newTokenCount = tokenCount - 80
                                                                }
                                                                return newTokenCount
                                                            })
                                                        }}
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 border-purple-500 bg-purple-700 hover:bg-purple-900"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </li>
                                        </div>
                                    ))}
                                    <div className="flex justify-end text-sm text-purple-400 underline cursor-pointer"
                                        onClick={() => {
                                            setCart([])
                                            setTotalPrice(0)
                                            setTokenCount(0)
                                        }}
                                    >
                                        clear all
                                    </div>
                                </ul>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between items-center text-white bg-white  rounded-md ">
                            <div className="flex items-center mt-5 font-semibold text-gray-800">Total:</div>
                            <div className="flex items-center mt-5 font-semibold text-gray-800">₹{totalPrice?.toString()}</div>
                        </CardFooter>
                    </Card>
                    <Button
                        onClick={displayRazorpay}
                        disabled={totalPrice == 0 ? true : false}
                        className={`w-full mt-4 ${totalPrice == 0 ? "bg-gray-500 " : "bg-purple-600"} hover:bg-purple-700" `} >
                        Checkout ₹{totalPrice?.toString()} ({TokenCount} {" "} Tokens)
                    </Button>
                </div>
            </div>
        </div>
    )
}
