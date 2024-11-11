import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 font-sans border-t border-purple-700 border-opacity-40">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-purple-400">PixelBrew AI</h2>
                        <p className="mt-2 text-gray-300">Pixel perfect thumbnails, brewed by AI</p>
                        <div className="mt-4 flex space-x-4">
                            <Link to="#" className="text-gray-400 hover:text-purple-400">
                                <Facebook className="h-6 w-6" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-purple-400">
                                <Twitter className="h-6 w-6" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-purple-400">
                                <Instagram className="h-6 w-6" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-purple-400">
                                <Linkedin className="h-6 w-6" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-purple-400">
                                <Github className="h-6 w-6" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-purple-400 mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link to="#howitworks" className="text-gray-300 hover:text-purple-400">Features</Link></li>
                            <li><Link to="shop" className="text-gray-300 hover:text-purple-400">Pricing</Link></li>
                            <li><Link to="explore" className="text-gray-300 hover:text-purple-400">Gallery</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-purple-400 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-300 hover:text-purple-400">About Us</Link></li>
                            <li><Link to="#" className="text-gray-300 hover:text-purple-400">Careers</Link></li>
                            <li><Link to="#" className="text-gray-300 hover:text-purple-400">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="text-sm text-gray-400">
                            © {new Date().getFullYear()} PixelBrew AI. All rights reserved.
                        </div>
                        {/* <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-purple-400 mb-2">Subscribe to our newsletter</h3>
                            <form className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-gray-800 text-white border-gray-700 focus:border-purple-400"
                                />
                                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Subscribe
                                </Button>
                            </form>
                        </div> */}
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                        <Link to="#" className="hover:text-purple-400">Privacy Policy</Link>
                        {' | '}
                        <Link to="#" className="hover:text-purple-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}