import { useEffect } from "react";
import AppRoutes from "./components/Routes";
import { useUserStore } from "./store/useUserStore";
import { Spinner, Center, Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAdmin = user?.role === "admin";
  // if (checkingAuth) {
  //   return (
  //     <Center>
  //       <Spinner size="xl" color="blue.500" />
  //     </Center>
  //   );
  // }
  return (
    <Box minH={"100vh"} bg={useColorModeValue("#ffffff", "black ")}>
      <Navbar />
      <AppRoutes user={user} />
      {!isAdmin && <Footer />}
    </Box>
  );
}

export default App;
