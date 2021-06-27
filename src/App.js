import { useMemo, useState } from "react";
import "./App.css";
import { useAccounts, useBalance, useManager, usePlayers } from "./hooks";
import lottery from "./lottery";
import web3 from "./web3";

function App() {
  const accounts = useAccounts();
  const players = usePlayers();
  const manager = useManager();
  const balance = useBalance(lottery.options.address);

  const [bet, setBet] = useState(0);
  const [message, setMessage] = useState("");

  const isUserManager = useMemo(() => accounts[0] === manager, [
    accounts,
    manager,
  ]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setMessage("Waiting for the transaction ...");
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(bet, "ether"),
        gasPrice: web3.utils.toWei("20", "gwei"),
      });
      setMessage("You has been entered to the pool!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const pickWinner = async () => {
    setMessage("Waiting for the transaction ...");
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    setMessage("Winner picked")
  }
  return (
    <div className="app">
      <div className="container">
        <div className="container__header">
          <h1 class="mb-1">Lottery</h1>
          <p>
            There are {players.length} players trying to win{" "}
            {web3.utils.fromWei(balance)} ethers right now!!
          </p>
        </div>
        <div className="container__body">
          <form className="mb-1" onSubmit={onSubmit}>
            <label htmlFor="amount">
              Enter amount
              <input
                id="amount"
                class="mb-1"
                value={bet}
                onChange={(ev) => setBet(ev.target.value)}
              />
            </label>
            <button type="submit" className="btn-grad btn--bet">Enter</button>
          </form>
          <p>
            {message}
          </p>
        </div>
        {isUserManager
          ? (
            <div class="container__footer">
              <button className="btn-grad btn--pick-winner" onClick={pickWinner}>
                Pick a winner
              </button>
            </div>
          )
          : null}
      </div>
      <div className="metadata">
        <span className="version">
          using web3 v{web3.version}
        </span>
      </div>
    </div>
  );
}

export default App;
