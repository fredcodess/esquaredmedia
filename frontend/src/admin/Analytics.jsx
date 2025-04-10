import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Box,
  Heading,
  Spinner,
  Container,
  Grid,
  GridItem,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Analytics = () => {
  const [bookingCounts, setBookingCounts] = useState(null);
  const [visitorCounts, setVisitorCounts] = useState(null);

  // Color mode values for backgrounds
  const chartBg = useColorModeValue("white", "gray.800");
  const containerBg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  const paddingY = useBreakpointValue({ base: 8, md: 16, lg: 24 });
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const chartHeadingSize = useBreakpointValue({ base: "sm", md: "md" });
  const chartPadding = useBreakpointValue({ base: 2, md: 4 });
  const chartHeight = useBreakpointValue({ base: 200, md: 300, lg: 350 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5002/api/admin/analytics");
        const data = await res.json();
        setBookingCounts(data.bookingCounts);
        setVisitorCounts(data.visitorCounts);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: useColorModeValue(
            "rgba(0, 0, 0, 0.1)",
            "rgba(255, 255, 255, 0.1)"
          ),
        },
        ticks: {
          color: textColor,
          font: {
            size: useBreakpointValue({ base: 10, md: 12 }),
          },
        },
      },
      x: {
        grid: {
          color: useColorModeValue(
            "rgba(0, 0, 0, 0.1)",
            "rgba(255, 255, 255, 0.1)"
          ),
        },
        ticks: {
          color: textColor,
          font: {
            size: useBreakpointValue({ base: 10, md: 12 }),
          },
          maxRotation: useBreakpointValue({ base: 45, md: 0 }),
          minRotation: useBreakpointValue({ base: 45, md: 0 }),
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: useBreakpointValue({ base: 10, md: 12 }),
          },
        },
        position: useBreakpointValue({ base: "bottom", md: "top" }),
      },
      tooltip: {
        backgroundColor: useColorModeValue(
          "rgba(0, 0, 0, 0.8)",
          "rgba(255, 255, 255, 0.8)"
        ),
        titleColor: useColorModeValue("white", "black"),
        bodyColor: useColorModeValue("white", "black"),
        titleFont: { size: useBreakpointValue({ base: 12, md: 14 }) },
        bodyFont: { size: useBreakpointValue({ base: 10, md: 12 }) },
      },
    },
  };

  if (!bookingCounts || !visitorCounts) return <Spinner size="xl" mt={10} />;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const bookingData = {
    labels: days,
    datasets: [
      {
        label: "Bookings per Day",
        data: days.map((day) => bookingCounts[day.toLowerCase()]),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const visitorData = {
    labels: days,
    datasets: [
      {
        label: "Visitors per Day",
        data: days.map((day) => visitorCounts[day.toLowerCase()]),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const combinedData = {
    labels: days,
    datasets: [
      {
        label: "Bookings",
        data: days.map((day) => bookingCounts[day.toLowerCase()]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
      {
        label: "Visitors",
        data: days.map((day) => visitorCounts[day.toLowerCase()]),
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Container maxW="container.xl" py={paddingY} bg={containerBg}>
      <Heading textAlign="center" mb={6} color={textColor} size={headingSize}>
        Analytics Dashboard
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <GridItem>
          <Box
            bg={chartBg}
            p={chartPadding}
            boxShadow="md"
            borderRadius="lg"
            h={chartHeight}
          >
            <Heading
              size={chartHeadingSize}
              textAlign="center"
              mb={4}
              color={textColor}
            >
              Booking Counts
            </Heading>
            <Bar
              data={bookingData}
              options={chartOptions}
              height={chartHeight}
            />
          </Box>
        </GridItem>

        <GridItem>
          <Box
            bg={chartBg}
            p={chartPadding}
            boxShadow="md"
            borderRadius="lg"
            h={chartHeight}
          >
            <Heading
              size={chartHeadingSize}
              textAlign="center"
              mb={4}
              color={textColor}
            >
              Visitor Counts
            </Heading>
            <Bar
              data={visitorData}
              options={chartOptions}
              height={chartHeight}
            />
          </Box>
        </GridItem>
      </Grid>

      <Box
        bg={chartBg}
        p={chartPadding}
        boxShadow="md"
        borderRadius="lg"
        mt={6}
        h={chartHeight}
      >
        <Heading
          size={chartHeadingSize}
          textAlign="center"
          mb={4}
          color={textColor}
        >
          Combined Visits and Bookings
        </Heading>
        <Line data={combinedData} options={chartOptions} height={chartHeight} />
      </Box>
    </Container>
  );
};

export default Analytics;
