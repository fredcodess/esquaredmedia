import { Box, Text, Grid, Link, Icon, Stack } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = ({ bg }) => {
  return (
    <Box bg={bg} py={8}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={8}
        px={6}
      >
        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Contact
          </Text>
          <Box mb={4}>
            <Text mb={1}>attendai@htmail.com</Text>
            <Text>0908934837</Text>
          </Box>
          <Box>
            <Text mb={1}>67 Oalm Road</Text>
            <Text mb={1}>Birmingham</Text>
            <Text>B7 9DH</Text>
          </Box>
        </Box>

        {/* Sitemap Section */}
        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Sitemap
          </Text>
          <Stack spacing={2}>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              About
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Team
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Reviews
            </Link>
            <Link href="#" _hover={{ textDecoration: "underline" }}>
              Free Trial
            </Link>
          </Stack>
        </Box>

        {/* Social Media Section */}
        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Connect with us
          </Text>
          <Stack direction="row" spacing={4}>
            <Link href="https://www.facebook.com" isExternal>
              <Icon
                as={FaFacebook}
                w={6}
                h={6}
                color="gray.400"
                _hover={{ color: "white" }}
              />
            </Link>
            <Link href="https://www.instagram.com" isExternal>
              <Icon
                as={FaInstagram}
                w={6}
                h={6}
                color="gray.400"
                _hover={{ color: "white" }}
              />
            </Link>
            <Link href="https://www.linkedin.com" isExternal>
              <Icon
                as={FaLinkedin}
                w={6}
                h={6}
                color="gray.400"
                _hover={{ color: "white" }}
              />
            </Link>
            <Link href="https://x.com" isExternal>
              <Icon
                as={FaTwitter}
                w={6}
                h={6}
                color="gray.400"
                _hover={{ color: "white" }}
              />
            </Link>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
