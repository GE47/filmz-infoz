import { Container } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW="container.xl">
      <NavBar />
      <Container minH="80vh" maxW="container.lg">
        {children}
      </Container>
      <Footer />
    </Container>
  );
};

export default Layout;
