import { Box, chakra } from "@chakra-ui/react";

import "./arrows.css";

const Arrows: React.FC = () => {
  return (
    <>
      <StyledArrow className="flicking-arrow-prev" />
      <StyledArrow className="flicking-arrow-next" />
    </>
  );
};

const StyledArrow = chakra(Box, {
  baseStyle: {
    w: { base: "20px", md: "64px" },
    h: { base: "20px", md: "64px" },
    "::before, ::after": {
      w: { base: "14px", md: "24px" },
      h: { base: "5px", md: "6px" },
    },
  },
});

export default Arrows;
