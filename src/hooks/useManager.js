import { useEffect, useState } from "react";
import lottery from "../lottery";

export default function useManager(init = '') {
  const [manager, setManager] = useState(init);

  useEffect(() => {
    const getManager = async () => {
      const accounts = await lottery.methods.manager().call()
      setManager(accounts);
    };
    getManager();
  }, []);

  return manager
}