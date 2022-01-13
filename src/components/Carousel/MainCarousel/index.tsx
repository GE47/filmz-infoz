import { Box } from "@chakra-ui/react";
import "@egjs/react-flicking/dist/flicking.css";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow, AutoPlay } from "@egjs/flicking-plugins";

import Arrows from "../Arrows";
import CarouselImage from "./CarouselImage";
import { MainCarouselProps } from "../../../store/movies/moviesSlice";

interface IProps {
  items: MainCarouselProps[] | null;
}

const MainCarousel: React.FC<IProps> = ({ items }) => {
  const plugins = [
    new Arrow(),
    new AutoPlay({ duration: 5000, direction: "NEXT", stopOnHover: false }),
  ];

  return (
    <Flicking align="center" plugins={plugins} circular={true}>
      {items?.map((item) => (
        <Box w="full" key={item.id}>
          <CarouselImage id={item.id} poster={item.poster} title={item.title} />
        </Box>
      ))}
      <ViewportSlot>
        <Arrows />
      </ViewportSlot>
    </Flicking>
  );
};

export default MainCarousel;
