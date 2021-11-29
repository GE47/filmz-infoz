import { Box } from "@chakra-ui/react";
import "@egjs/react-flicking/dist/flicking.css";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow, AutoPlay } from "@egjs/flicking-plugins";

import Arrows from "../Arrows";
import CarouselImage from "./CarouselImage";

type data = {
  id: number;
  url: string;
};

interface IProps {
  items: data[];
}

const MainCarousel: React.FC<IProps> = ({ items }) => {
  const plugins = [
    new Arrow(),
    new AutoPlay({ duration: 5000, direction: "NEXT", stopOnHover: false }),
  ];

  return (
    <Flicking
      renderOnlyVisible={true}
      align="center"
      plugins={plugins}
      circular={true}
    >
      {items.map((item) => (
        <Box w="full" key={item.id}>
          <CarouselImage id={item.id} src={item.url} />
        </Box>
      ))}
      <ViewportSlot>
        <Arrows />
      </ViewportSlot>
    </Flicking>
  );
};

export default MainCarousel;
