import { useEffect, useState } from "react";
import web3 from "../web3";

export default function useAccounts(init = []) {
  const [accounts, setAccounts] = useState(init);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3.eth.requestAccounts();
      setAccounts(accounts);
    };
    getAccounts();
  }, []);

  return accounts
}