import { useState } from "react";
import {
  Box,
  Select,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Card,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const servicePlans = {
  Weddings: [
    {
      name: "Weddings Bronze Package",
      coverage: 50,
      bgColor: "orange.100",
      progressColor: "orange.400",
      hit: "Pictures Only - £400",
      hitt: "Pictures & Video - £750",
      premium: "20 pictures with video",
      price: 300,
    },
    {
      name: "Weddings Silver Package",
      coverage: 70,
      bgColor: "gray.200",
      progressColor: "gray.500",
      hit: "Pictures Only - £600",
      hitt: "Pictures & Video - £1000",
      premium: "35 pictures with video",
      price: 400,
    },
    {
      name: "Weddings Gold Package",
      coverage: 90,
      bgColor: "yellow.100",
      progressColor: "yellow.400",
      hit: "Pictures Only - £1000",
      hitt: "Pictures & Video - £2500",
      premium: "50 pictures with video",
      price: 1000,
    },
  ],
  Photoshoots: [
    {
      name: "Photoshoots Bronze Package",
      coverage: 50,
      bgColor: "orange.100",
      progressColor: "orange.400",
      hit: "Home photoshoot",
      hitt: "10 edited pictures",
      premium: "Optional outfit change (£250 - 300)",
      price: 120,
    },
    {
      name: "Photoshoots Silver Package",
      coverage: 70,
      bgColor: "gray.200",
      progressColor: "gray.500",
      hit: "Outside/Studio photoshoot",
      hitt: "20 edited pictures",
      premium: "Optional outfit change (£300 - 400)",
      price: 160,
    },
    {
      name: "Photoshoots Gold Package",
      coverage: 90,
      bgColor: "yellow.100",
      progressColor: "yellow.400",
      hit: "Studio photoshoot",
      hitt: "30 edited pictures",
      premium: "Optional outfit change (£400 - 450)",
      price: 180,
    },
  ],
  Engagements: [
    {
      name: "Engagements Bronze Package",
      coverage: 50,
      bgColor: "orange.100",
      progressColor: "orange.400",
      hit: "Pictures Only - £400",
      hitt: "Pictures & Video - £750",
      premium: "20 pictures with video",
      price: 300,
    },
    {
      name: "Engagements Silver Package",
      coverage: 70,
      bgColor: "gray.200",
      progressColor: "gray.500",
      hit: "Pictures Only - £600",
      hitt: "Pictures & Video - £1000",
      premium: "35 pictures with video",
      price: 400,
    },
    {
      name: "Engagements Gold Package",
      coverage: 90,
      bgColor: "yellow.100",
      progressColor: "yellow.400",
      hit: "Pictures Only - £1000",
      hitt: "Pictures & Video - £2500",
      premium: "50 pictures with video",
      price: 1000,
    },
  ],
};

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const textColor = useColorModeValue("black", "black");

  return (
    <Box p={24}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading fontSize="lg">Select a service</Heading>
        <Select
          placeholder="Select a service"
          onChange={(e) => {
            setSelectedService(e.target.value);
            setSelectedPlan(null);
          }}
        >
          {Object.keys(servicePlans).map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </Select>
      </Flex>

      {selectedService && (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {servicePlans[selectedService].map((plan) => (
            <Card
              key={plan.name}
              p={6}
              bg={selectedPlan?.name === plan.name ? "blue.200" : plan.bgColor}
              boxShadow={selectedPlan?.name === plan.name ? "lg" : "md"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => {
                setSelectedPlan(plan);
                localStorage.setItem("selectedPlan", JSON.stringify(plan));
                navigate("/checkout");
              }}
              transition="all 0.3s"
              _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
              color={textColor}
            >
              <Heading size="md" mb={4} textAlign="center">
                {plan.name}
              </Heading>
              <Flex justify="center" mb={4}>
                <CircularProgress
                  value={plan.coverage}
                  size="80px"
                  color={plan.progressColor}
                >
                  <CircularProgressLabel fontWeight="bold">
                    {plan.coverage}%
                  </CircularProgressLabel>
                </CircularProgress>
              </Flex>
              <Text fontSize="sm" textAlign="center">
                {plan.hit} <br />
                {plan.hitt} <br />
                {plan.premium}
              </Text>
              <Text fontSize="sm" mt={3} textAlign="center">
                Deposite: ${plan.price}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Services;
