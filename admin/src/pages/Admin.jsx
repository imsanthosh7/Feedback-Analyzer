import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { ChevronDown, LogOut, Menu, ThumbsDown, ThumbsUp, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardFooter } from "@/components/ui/card";
import { Piechart } from "@/components/Piechart";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const chartConfig = {
    POSITIVE: {
        label: "Positive",
        color: "green",
    },
    NEGATIVE: {
        label: "Negative",
        color: "red",
    },
    NEUTRAL: {
        label: "Neutral",
        color: "gray",
    },
};




const Admin = () => {



    const [showSidebar, setShowSidebar] = useState(false);
    const [adminName, setAdminName] = useState('');
    const [chartData, setChartData] = useState([])
    const [feedBackData, setFeedBackData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate()


    // pagination 
    const itemsPerPage = 10; // 

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const currentData = (Array.isArray(filteredData) ? filteredData : []).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));


    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const getData = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/api/feedback/feedbacks`, {
                withCredentials: true,
            });


            const monthMap = {};

            data.feedbacks.forEach((item) => {
                const month = dayjs(item.createdAt).format("MMM");

                if (!monthMap[month]) {
                    monthMap[month] = { month, POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 }
                }

                const sentiment = item.sentiment?.toUpperCase();

                if (sentiment && monthMap[month][sentiment] !== undefined) {
                    monthMap[month][sentiment]++;
                }

            });

            const formatttedData = Object.values(monthMap);
            setChartData(formatttedData);

            if (data.feedbacks) {
                setAdminName(data.adminName)
                setFilteredData(data.feedbacks);
                setFeedBackData(data.feedbacks)

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    const logOut = async () => {
        try {
            const { data } = await axios.post(`${backendurl}/api/admin/logout`, {
                withCredentials: true
            })

            if (data.success) {
                setAdminName('')
                setFilteredData([]);
                setFeedBackData([]);
                setChartData([])
                navigate('/login')
            }

        } catch (error) {
            toast.error(error.message)
        }
    }






    useEffect(() => {
        getData();
    }, []);

    const handleFilter = (sentiment) => {
        const filtered = sentiment === "ALL"
            ? feedBackData
            : feedBackData.filter(item => item.sentiment === sentiment);

        setFilteredData(filtered);
        setCurrentPage(1);
    };





    return (
        <>
            <Toaster richColors />
            <div className="flex h-screen ">
                {/* Mobile Sidebar Overlay */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
                        onClick={() => setShowSidebar(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed md:static z-50 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
                    transition-transform duration-300 md:translate-x-0 w-64 border-2 bg-gray-50 text-black 
                    flex flex-col py-6 px-4  h-full overflow-y-auto`}

                >
                    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                    <nav className="flex flex-col space-y-4">
                        <a href="#" className="hover:bg-gray-300 px-3 py-2 rounded">Dashboard</a>
                        <a href="#" className="hover:bg-gray-300 px-3 py-2 rounded">Feedback</a>
                        <a href="#" className="hover:bg-gray-300 px-3 py-2 rounded">Analytics</a>
                    </nav>
                    <div className="mt-auto pt-6 border-t-2">
                        <button onClick={() => logOut()} className="flex items-center cursor-pointer  gap-2 hover:text-red-400">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col  overflow-y-auto">
                    {/* Navbar */}
                    <header className="flex items-center justify-between bg-gray-50 shadow px-4 md:py-6 py-10 md:px-8">
                        <button className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
                            <Menu />
                        </button>
                        <h1 className="text-xl font-semibold">Welcome, {adminName}</h1>
                        <p className="hidden md:flex w-8 h-8 rounded-full items-center justify-center bg-black text-white font-bold">{adminName ? adminName[0].toUpperCase() : "A"}</p>
                    </header>

                    <main className="p-4 md:p-8 bg-gray-100 ">
                        {/* Dashboard charts section */}
                        <div className="flex flex-col justify-center md:flex-row gap-6 mb-8">
                            {/* Bar Chart Card */}
                            <div className="w-full md:w-[50%] ">
                                <Card className="bg-gray-100">
                                    <ChartContainer config={chartConfig}>
                                        <BarChart data={chartData}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="POSITIVE" fill="green" radius={4} />
                                            <Bar dataKey="NEGATIVE" fill="red" radius={4} />
                                            {/* <Bar dataKey="NEUTRAL" fill="gary" radius={4} /> */}
                                        </BarChart>
                                    </ChartContainer>

                                    <CardFooter className="flex-col items-start gap-2 text-sm">
                                        <div className="flex gap-2 font-medium leading-none">
                                            Feedback volume grew by 5.2% this month <TrendingUp className="h-4 w-4" />
                                        </div>
                                        <div className="leading-none text-muted-foreground">
                                            Summary based on user sentiment data over the last 6 months
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>

                            {/* Pie Chart */}
                            <div className="w-full md:w-[40%]">
                                <Piechart value={feedBackData} />
                            </div>
                        </div>


                        {/* Feedback List Table */}
                        <div className="bg-gray-100 rounded shadow p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="md:text-xl font-semibold mb-4">Feedback Submissions</h2>
                                </div>
                                <div className=" -mt-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="px-4 cursor-pointer py-2 flex bg-gray-100 text-gray-800 rounded shadow hover:bg-gray-200 focus:outline-none">
                                            <p className="font-semibold">Filter Feedback</p>
                                            <ChevronDown className="h-5 w-5 mt-1" />
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="bg-white border rounded shadow-md">
                                            <DropdownMenuItem onClick={() => {
                                                const filtered = feedBackData.filter(item => item.sentiment === "POSITIVE");
                                                setFilteredData(filtered);
                                                setCurrentPage(1);
                                            }}
                                                className="hover:bg-gray-100 cursor-pointer">
                                                <ThumbsUp size={16} className="text-green-600" />
                                                Positive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => {
                                                const filtered = feedBackData.filter(item => item.sentiment === "NEGATIVE");
                                                setFilteredData(filtered);
                                                setCurrentPage(1);

                                            }}
                                                className="hover:bg-gray-100 cursor-pointer">
                                                <ThumbsDown size={16} className="text-red-600" />
                                                Negative
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleFilter("ALL")} className="hover:bg-gray-100 cursor-pointer">All</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </div>
                            </div>

                            <div>


                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-sm text-gray-700">
                                            <th className="p-3">No</th>
                                            <th className="p-3">Date</th>
                                            <th className="p-3">Feedback</th>
                                            <th className="p-3">Sentiment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((item, id) => (
                                            <tr key={item._id} className="border-t">
                                                <td className="p-3">{(currentPage - 1) * itemsPerPage + id + 1}.</td>
                                                <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td className="p-3">{item.text}</td>
                                                <td
                                                    className={
                                                        item.sentiment === "POSITIVE"
                                                            ? "border bg-[#008000] text-white p-3"
                                                            : "text-white border bg-[#FF0000] p-3"
                                                    }
                                                >
                                                    {item.sentiment.toLowerCase()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination Controls */}
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentPage === 1}
                                        className="bg-gray-300 cursor-pointer text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                                    >
                                        Prev
                                    </button>
                                    <span className="text-sm md:-ml-15 text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages}
                                        className="bg-gray-300 cursor-pointer text-gray-700 px-3 py-1 rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>

                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </>
    );
};

export default Admin;
