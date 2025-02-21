import {
  Box,
  Text,
  Heading,
  Grid,
  Stack,
  List,
  ListItem,
  useColorMode,
} from "@chakra-ui/react";

const Price = ({ bg }) => {
  const { colorMode } = useColorMode();

  const bgg = colorMode === "light" ? "rgb(248,241,235)" : "rgba(88,56,38,255)";
  const headingColor =
    colorMode === "light" ? "rgba(88,56,38,255)" : "rgb(248,241,235)";
  const headingColor2 = colorMode === "light" ? "gray.800" : "gray.200";
  const listColor = colorMode === "light" ? "gray.600" : "gray.300";

  return (
    <Box bg={bg} py={24}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
        <header className="text-center mb-10">
          <Text color={headingColor} mt={2}>
            Packages for Weddings, Birthdays, Dinners, and More
          </Text>
        </header>

        <Stack spacing={8}>
          <section>
            <Heading
              as="h2"
              size="xl"
              fontWeight="semibold"
              color={headingColor}
            >
              Weddings
            </Heading>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={6}
              mt={4}
            >
              <Box p={6} bg={bgg} shadow="md" borderRadius="lg">
                <Heading
                  as="h3"
                  size="lg"
                  fontWeight="bold"
                  color={headingColor2}
                >
                  Bronze Package
                </Heading>
                <List mt={2} color={listColor}>
                  <ListItem>Pictures Only - £400</ListItem>
                  <ListItem>Pictures & Video - £750</ListItem>
                  <ListItem>20 pictures with Video</ListItem>
                </List>
              </Box>
              <Box p={6} bg={bgg} shadow="md" borderRadius="lg">
                <Heading
                  as="h3"
                  size="lg"
                  fontWeight="bold"
                  color={headingColor2}
                >
                  Silver Package
                </Heading>
                <List mt={2} color={listColor}>
                  <ListItem>Pictures Only - £600</ListItem>
                  <ListItem>Pictures & Video - £1,000</ListItem>
                  <ListItem>35 pictures with Video</ListItem>
                </List>
              </Box>
              <Box p={6} bg={bgg} shadow="md" borderRadius="lg">
                <Heading
                  as="h3"
                  size="lg"
                  fontWeight="bold"
                  color={headingColor2}
                >
                  Golden Package
                </Heading>
                <List mt={2} color={listColor}>
                  <ListItem>Pictures Only - £1,000</ListItem>
                  <ListItem>Pictures & Video - £2,500</ListItem>
                  <ListItem>50 pictures</ListItem>
                </List>
              </Box>
            </Grid>
          </section>

          <section>
            <Heading
              as="h2"
              size="xl"
              fontWeight="semibold"
              color={headingColor}
            >
              Photoshoots
            </Heading>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={6}
              mt={4}
            >
              <Box p={6} bg={bgg} shadow="md" borderRadius="lg">
                <Heading
                  as="h3"
                  size="lg"
                  fontWeight="bold"
                  color={headingColor2}
                >
                  Bronze Photoshoot
                </Heading>
                <List mt={2} color={listColor}>
                  <ListItem>Home photoshoot</ListItem>
                  <ListItem>3 hours session</ListItem>
                  <ListItem>10 edited pictures</ListItem>
                  <ListItem>Optional outfit change (£250-300)</ListItem>
                </List>
              </Box>
              <Box p={6} bg={bgg} shadow="md" borderRadius="lg">
                <Heading
                  as="h3"
                  size="lg"
                  fontWeight="bold"
                  color={headingColor2}
                >
                  Silver Photoshoot
                </Heading>
                <List mt={2} color={listColor}>
                  <ListItem>Outside/studio photoshoot</ListItem>
                  <ListItem>4 hours session</ListItem>
                  <ListItem>20 edited pictures</ListItem>
                  <ListItem>Optional outfit change (£300-400)</ListItem>
                </List>
              </Box>
              <Box p={6} bg={bgg} shadow="md" borderRadius="lg">
                <Heading
                  as="h3"
                  size="lg"
                  fontWeight="bold"
                  color={headingColor2}
                >
                  Golden Photoshoot
                </Heading>
                <List mt={2} color={listColor}>
                  <ListItem>Studio photoshoot</ListItem>
                  <ListItem>5 hours session</ListItem>
                  <ListItem>30 pictures</ListItem>
                  <ListItem>Professional video</ListItem>
                  <ListItem>Optional outfit change (£400-450)</ListItem>
                </List>
              </Box>
            </Grid>
          </section>

          <section>
            <Heading
              as="h2"
              size="xl"
              fontWeight="semibold"
              color={headingColor}
            >
              Add-Ons
            </Heading>
            <Box p={6} bg={bgg} shadow="md" borderRadius="lg" mt={4}>
              <List color={listColor}>
                <ListItem>Album - £100</ListItem>
              </List>
            </Box>
          </section>
        </Stack>
      </Box>
    </Box>
  );
};

export default Price;
