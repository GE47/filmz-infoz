import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface Iprops {
  value: number;
}

const Rating: React.FC<Iprops> = ({ value }) => {
  return (
    <CircularProgress value={value} min={0} max={10} size="45px">
      <CircularProgressLabel>{value.toFixed(1)}/10</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Rating;
