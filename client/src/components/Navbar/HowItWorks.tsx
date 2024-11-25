import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function Page() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-blue-600">swimm</span>
                            </Link>
                            <div className="hidden md:block ml-10">
                                <div className="flex items-center space-x-8">
                                    <div className="relative group">
                                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                                            <span>Product</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                                            <span>Use Cases</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                                            <span>Resources</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
                                        Pricing
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <Button variant="ghost" className="text-gray-600">
                                    Log in
                                </Button>
                            </div>
                            <Button variant="outline" className="hidden sm:inline-flex">
                                Sign up
                            </Button>
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                Get a demo
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-blue-600 mb-4">The Swimm Engine</h2>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            All your code knowledge.
                            <br />
                            Analyzed, updated, always available
                        </h1>
                    </div>
                </div>
            </section>

            {/* Diagram Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <img
                                src="/placeholder.svg?height=800&width=800"
                                alt="Swimm Engine Diagram"
                                width={800}
                                height={800}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-16">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-2xl font-semibold text-blue-600">01</span>
                                    <h3 className="text-2xl font-bold text-gray-900">Multi-layered contextual analysis</h3>
                                </div>
                                <p className="text-gray-600">
                                    Swimm indexes and runs static analysis on your sources of code knowledge. Patented algorithms convert your
                                    codebase into Swimm Generated Documents describing complex code flows in a compact and cohesive way as the
                                    perfect input for LLMs.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-2xl font-semibold text-blue-600">02</span>
                                    <h3 className="text-2xl font-bold text-gray-900">Continuously updated knowledge base</h3>
                                </div>
                                <p className="text-gray-600">
                                    The Swimm Engine builds a documentation knowledge base capturing and generating new information. Swimm
                                    Auto-sync automatically keeps your documentation current and in-sync with your code.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-2xl font-semibold text-blue-600">03</span>
                                    <h3 className="text-2xl font-bold text-gray-900">Contextual answers directly in the IDE</h3>
                                </div>
                                <p className="text-gray-600">
                                    The Swimm Engine understands user intent and uses Retrieval Augmented Generation techniques to
                                    contextualize responses. Feedback loops continuously add to documentation improving the knowledge base.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                        Get a demo
                    </Button>
                </div>
            </section>
        </div>
    )
}
