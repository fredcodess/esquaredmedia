import {
  Box,
  Container,
  Grid,
  Image,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

const Team = ({ bg }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={bg} py={28}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          alignItems="stretch"
        >
          {/* Emmanuel Snr Section */}
          <Box
            bg={
              colorMode === "light" ? "rgb(248,241,235)" : "rgba(88,56,38,255)"
            }
            p={6}
            rounded="2xl"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Image
              src="/media/emmSnr.png"
              alt="Emma Snr"
              w="100%"
              h="250px"
              objectFit="contain"
              rounded="lg"
              mb={4}
              sx={{
                border: "2px solid rgba(238,92,9,1)",
              }}
            />
            <VStack spacing={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "light" ? "gray.800" : "gray.200"}
              >
                Emmanuel Snr (Founder & Photographer)
              </Text>
              <Text
                fontSize="md"
                color={colorMode === "light" ? "gray.600" : "gray.300"}
              >
                Hi guys! Meet Emmanuel—our Photographer, Editor, and founder of
                ESQUAREDMEDIA! A true Jack of all Trades. His goal? To entertain
                and create unforgettable memories through our lenses. 📸 Aka
                "NANA"—the man behind the cameras!
              </Text>
            </VStack>
          </Box>

          {/* Hedna Section */}
          <Box
            bg={
              colorMode === "light" ? "rgb(248,241,235)" : "rgba(88,56,38,255)"
            }
            p={6}
            rounded="2xl"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Image
              src="/media/hedna.png"
              alt="Hedna"
              w="100%"
              h="250px"
              objectFit="contain"
              rounded="lg"
              mb={4}
              sx={{
                border: "2px solid rgba(238,92,9,1)",
              }}
            />
            <VStack spacing={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "light" ? "gray.800" : "gray.200"}
              >
                Hedna (Social Media & Content Creator)
              </Text>
              <Text
                fontSize="md"
                color={colorMode === "light" ? "gray.600" : "gray.300"}
              >
                Meet Hedna—our head of social media and planning! She’s also
                specialized in photography & content creation. As a fashion
                designer with marketing experience, she brings the creative
                energy! Fun fact? She has a twin brother! 😌
              </Text>
            </VStack>
          </Box>

          {/* Emmanuel (Jojo) Section */}
          <Box
            bg={
              colorMode === "light" ? "rgb(248,241,235)" : "rgba(88,56,38,255)"
            }
            p={6}
            rounded="2xl"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Image
              src="/media/emma.png"
              alt="Jojo"
              w="100%"
              h="250px"
              objectFit="contain"
              rounded="lg"
              mb={4}
              sx={{
                border: "2px solid rgba(238,92,9,1)",
              }}
            />

            <VStack spacing={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "light" ? "gray.800" : "gray.200"}
              >
                Emmanuel (Jojo) - Team Manager
              </Text>
              <Text
                fontSize="md"
                color={colorMode === "light" ? "gray.600" : "gray.300"}
              >
                Meet Emmanuel aka Jojo or Kojoskiii! Our Team Manager &
                specialist in photography, videography, and editing. Fun fact?
                He’s a huge F1 fan 🏎️ and known for always bringing GOOD
                VIBESSS!🔥
              </Text>
            </VStack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
