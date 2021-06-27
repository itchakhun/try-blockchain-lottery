import { useEffect, useState } from "react";
import web3 from "../web3";

export default function useBalance(account) {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => { 
      setBalance(await web3.eth.getBalance(account));
    }
    if (account) getBalance();
  }, [account]);

  return balance;
}
