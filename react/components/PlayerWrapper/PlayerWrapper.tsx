import { Player, useThreekitInitStatus } from "@threekit-tools/treble";
import Skeleton from "../Skeleton/Skeleton";

const PlayerWrapper = () => {
  const loaded = useThreekitInitStatus();

  if (!loaded) return <Skeleton height="50vh" />;

  return <Player />;
};

export default PlayerWrapper;
