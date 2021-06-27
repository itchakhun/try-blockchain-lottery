import { useEffect, useState } from "react";
import lottery from "../lottery";

export default function usePlayers() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const players = await lottery.methods.getPlayers().call()
      setPlayers(players);
    };
    getPlayers();
  }, []);

  return players
}