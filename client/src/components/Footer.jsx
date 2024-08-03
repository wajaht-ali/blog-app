import { Link } from "react-router-dom";
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import logo from "../assets/logoImg1.png";

const Footer = () => {
    return (
        <div className="px-4 pt-16 mx-auto md:px-24 lg:px-8 border border-gray-300">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <Link
                        to="/"
                        aria-label="Go home"
                        title="Company"
                        className="inline-flex items-center"
                    >
                        <img width={"80px"} height={"100px"} src={logo} alt="imgLogo" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Blog Byte
                        </span>
                    </Link>
                    <div className="mt-6 lg:max-w-sm">
                        <p className="text-sm text-gray-800">
                            Blog Byte is an athuntic platform for the daily updates on lifestyle, events, and current affairs all around the world.
                        </p>
                        <p className="mt-4 text-sm text-gray-800">
                            And we earned this trust by delivering content with proofs in a most responsible way ever.
                        </p>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <p className="text-base font-bold tracking-wide text-gray-900">
                        Contacts
                    </p>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Phone:</p>
                        <Link
                            to="tel:850-123-5021"
                            aria-label="Our phone"
                            title="Our phone"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            1111-111-111
                        </Link>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Email:</p>
                        <Link
                            to="mailto:info@lorem.mail"
                            aria-label="Our email"
                            title="Our email"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            info@blogbyte.com
                        </Link>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Address:</p>
                        <Link
                            to="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Our address"
                            title="Our address"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            312 York Street, NY
                        </Link>
                    </div>
                </div>
                <div>
                    <span className="text-base font-bold tracking-wide text-gray-900">
                        Social
                    </span>
                    <div className=''>
                        <ul className='flex flex-row items-center'>
                            <li className='md:mx-3 p-2'>
                                <Link className='' to="https://facebook.com" target='_blank'><FaFacebookSquare size={20} /></Link>
                            </li>
                            <li className='md:mx-3 p-2'>
                                <Link className='' to="https://twitter.com" target='_blank'><FaTwitterSquare size={20} /></Link>
                            </li>
                            <li className='md:mx-3 p-2'>
                                <Link className='' to="https://youtube.com" target='_blank'><FaYoutubeSquare size={20} /></Link>
                            </li>
                            <li className='md:mx-3 p-2'>
                                <Link className='rounded' to="https://instagram.com" target='_blank'><FaInstagramSquare size={20} /></Link>
                            </li>
                            <li className='md:mx-3 p-2'>
                                <Link className='rounded' to="https://linkedin.com" target='_blank'><AiFillLinkedin size={20} /></Link>
                            </li>
                        </ul>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        You can get notifications of our latest posts by following our social media handles too.
                    </p>
                </div>
            </div>
            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                <p className="text-sm text-gray-600">
                    © Copyright 2024. All rights reserved.
                </p>
                <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    <li>
                        <Link
                            to="/"
                            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                            F.A.Q
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                            Terms &amp; Conditions
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;