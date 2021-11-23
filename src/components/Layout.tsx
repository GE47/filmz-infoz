import { Container } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW="container.xl">
      <NavBar />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
