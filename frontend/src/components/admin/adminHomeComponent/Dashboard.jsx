import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import { MdOutlineTour } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { useSelector } from "react-redux";

// Separate Chart Components
const TourChart = ({ data }) => {
  const chartData = [
    { name: "Jan", tours: 45 },
    { name: "Feb", tours: 52 },
    { name: "Mar", tours: 38 },
    { name: "Apr", tours: 65 },
    { name: "May", tours: 72 },
    { name: "Jun", tours: 58 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="tours"
            stroke="#10b981"
            fill="url(#colorTours)"
            fillOpacity={0.6}
          />
          <defs>
            <linearGradient id="colorTours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const BookingChart = ({ data }) => {
  const chartData = [
    { name: "Mon", bookings: 32 },
    { name: "Tue", bookings: 45 },
    { name: "Wed", bookings: 28 },
    { name: "Thu", bookings: 60 },
    { name: "Fri", bookings: 75 },
    { name: "Sat", bookings: 65 },
    { name: "Sun", bookings: 84 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const UserChart = ({ data }) => {
  const pieData = [
    { name: "New Users", value: 28 },
    { name: "Active Users", value: 134 },
    { name: "Returning", value: 42 },
  ];

  const COLORS = ["#8b5cf6", "#a855f7", "#c084fc"];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const chartCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-tours", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTours(res.data.tours));
    axios
      .get("http://localhost:8000/api/get-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data.booking));
    axios
      .get("http://localhost:8000/api/get-users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.users));
  }, []);
  const steps = [
    {
      icon: <MdOutlineTour className="text-3xl" />,
      title: "Tours",
      count: tours.length,
      change: "+15%",
      changeType: "up",
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      chart: <TourChart />,
      details: [
        { label: "Active Tours", value: 8 },
        { label: "Upcoming", value: 4 },
      ],
    },
    {
      icon: <TbBrandBooking className="text-3xl" />,
      title: "Bookings",
      count: bookings.length,
      change: "+8%",
      changeType: "up",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      chart: <BookingChart />,
      details: [
        { label: "Confirmed", value: 72 },
        { label: "Pending", value: 12 },
      ],
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Users",
      count: users.length,
      change: "+22%",
      changeType: "up",
      color: "from-purple-500 to-violet-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      chart: <UserChart />,
      details: [
        { label: "New Users", value: 28 },
        { label: "Active", value: 134 },
      ],
    },
  ];
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8  min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center lg:text-left mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className={`relative overflow-hidden rounded-2xl p-6 ${step.bgColor} backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`}
            ></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`p-3 rounded-full bg-gradient-to-r ${step.color} w-fit shadow-lg mb-3`}
              >
                <div className="text-white">{step.icon}</div>
              </motion.div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  {step.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {step.count}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={chartCardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 + index * 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {step.title} Analytics
              </h3>
              <div
                className={`p-2 rounded-full bg-gradient-to-r ${step.color}`}
              >
                <div className="text-white">{step.icon}</div>
              </div>
            </div>
            {step.chart}
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default Dashboard;
