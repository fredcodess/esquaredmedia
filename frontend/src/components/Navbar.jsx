import {
  Box,
  Flex,
  IconButton,
  Image,
  Button,
  VStack,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useUserStore } from "../store/useUserStore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const logo =
    colorMode === "light" ? "/media/logo.png" : "/media/whitelogo.jpg";
  const bg = colorMode === "light" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
  const textColor = colorMode === "light" ? "black" : "white";

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      bg={bg}
      backdropFilter="blur(10px)"
      zIndex="50"
      px={12}
      py={4}
    >
      <Flex justify="space-between" align="center" maxW="1300px" mx="auto">
        <NavLink to="/" display="flex" alignItems="center">
          <Image src={logo} alt="Logo" h="48px" w="auto" />
        </NavLink>

        <Flex display={{ base: "none", md: "flex" }} gap={12} color={textColor}>
          {isAdmin ? (
            <>
              <NavLink to="/manage-bookings">Manage Booking</NavLink>
              <NavLink to="/analytics">Analytics</NavLink>
              <NavLink to="/enquiries">Enquiries</NavLink>
              <NavLink to="/dates">Availability</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/team">Team</NavLink>
              <NavLink to="/price">Prices</NavLink>
              <NavLink to="/toolkit">Remove BG</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </>
          )}
        </Flex>

        <Flex align="center" gap={4} display={{ base: "none", md: "flex" }}>
          <IconButton
            icon={colorMode === "light" ? <BedtimeIcon /> : <WbSunnyIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle Dark Mode"
            bg="transparent"
            color="gray.200"
            _hover={{ bg: "gray.700" }}
          />

          {user && !isAdmin && (
            <Button as={NavLink} to="/booking" bg="black" color="white">
              Book Now
            </Button>
          )}
          {user ? (
            <Button bg="black" color="white" onClick={handleLogout}>
              <LogoutIcon />
            </Button>
          ) : (
            <Button as={NavLink} to="/login" bg="black" color="white">
              Login
            </Button>
          )}
        </Flex>

        {/* Mobile view with hamburger and color mode toggle */}
        <Flex align="center" gap={2} display={{ base: "flex", md: "none" }}>
          <IconButton
            icon={colorMode === "light" ? <BedtimeIcon /> : <WbSunnyIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle Dark Mode"
            bg="transparent"
            color={textColor}
            _hover={{ bg: "gray.700" }}
          />
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onOpen}
            aria-label="Open Menu"
            color={textColor}
            bg="transparent"
            _hover={{ bg: "gray.700" }}
          />
        </Flex>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900" color="white">
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="start" spacing={6} mt={10} fontSize="2xl">
              {!isAdmin && (
                <>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/team">Team</NavLink>
                  <NavLink to="/price">Pricing</NavLink>
                  <NavLink to="/toolkit">Remove BG</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                </>
              )}
              {user && !isAdmin && <NavLink to="/gallery">Gallery</NavLink>}
              {isAdmin && (
                <>
                  <NavLink to="/manage-bookings">Manage Bookings</NavLink>
                  <NavLink to="/analytics">Analytics</NavLink>
                  <NavLink to="/enquiries">Customer Service</NavLink>
                  <NavLink to="/dates">Availability</NavLink>
                </>
              )}
              {user && !isAdmin && (
                <Button as={NavLink} to="/booking" bg="gray.100" color="black">
                  Book Now
                </Button>
              )}
              {user ? (
                <Button bg="gray.100" color="black" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button as={NavLink} to="/login" bg="gray.100" color="black">
                  Login
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
