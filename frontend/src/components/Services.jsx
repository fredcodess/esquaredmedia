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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const servicePlans = {
  Weddings: [
    {
      name: "Bronze Package",
      coverage: 50,
      bgColor: "orange.100",
      progressColor: "orange.400",
      premium: "LOWEST",
      outOfPocket: "HIGHEST",
      price: 500,
    },
    {
      name: "Silver Package",
      coverage: 70,
      bgColor: "gray.200",
      progressColor: "gray.500",
      premium: "LOWER",
      outOfPocket: "MODERATE",
      price: 1000,
    },
    {
      name: "Gold Package",
      coverage: 90,
      bgColor: "yellow.100",
      progressColor: "yellow.400",
      premium: "HIGHER",
      outOfPocket: "LOWER",
      price: 2000,
    },
  ],
  Photoshoots: [
    {
      name: "Bronze Package",
      coverage: 50,
      bgColor: "orange.100",
      progressColor: "orange.400",
      premium: "LOWEST",
      outOfPocket: "HIGHEST",
      price: 500,
    },
    {
      name: "Silver Package",
      coverage: 70,
      bgColor: "gray.200",
      progressColor: "gray.500",
      premium: "LOWER",
      outOfPocket: "MODERATE",
      price: 1000,
    },
    {
      name: "Gold Package",
      coverage: 90,
      bgColor: "yellow.100",
      progressColor: "yellow.400",
      premium: "HIGHER",
      outOfPocket: "LOWER",
      price: 2000,
    },
  ],
  Engagements: [
    {
      name: "Engagements Bronze Package",
      coverage: 50,
      bgColor: "orange.100",
      progressColor: "orange.400",
      premium: "LOWEST",
      outOfPocket: "HIGHEST",
      price: 500,
    },
    {
      name: "Engagements Silver Package",
      coverage: 70,
      bgColor: "gray.200",
      progressColor: "gray.500",
      premium: "LOWER",
      outOfPocket: "MODERATE",
      price: 1000,
    },
    {
      name: "Engagements Gold Package",
      coverage: 90,
      bgColor: "yellow.100",
      progressColor: "yellow.400",
      premium: "HIGHER",
      outOfPocket: "LOWER",
      price: 2000,
    },
  ],
};

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  return (
    <Box p={6}>
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
                <strong>Premiums:</strong> {plan.premium} <br />
                <strong>Out-of-Pocket:</strong> {plan.outOfPocket}
              </Text>
              <Text fontSize="sm" mt={3} textAlign="center">
                Price: ${plan.price}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Services;
