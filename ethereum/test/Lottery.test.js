const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface: abi, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
  it("deploys an instance", () => {
    assert.ok(lottery.options.address);
  });

  it("contains user who has entered", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });
    assert.strictEqual(players[0], accounts[0]);
    assert.strictEqual(players.length, 1);
  });

  it("contains multiple users who have entered", async () => {
    const TOTAL_USERS = 5;
    for (let i = 0; i < TOTAL_USERS; i++) {
      await lottery.methods.enter().send({
        from: accounts[i],
        value: web3.utils.toWei("0.02", "ether"),
      });
    }
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });
    for (let i = 0; i < TOTAL_USERS; i++) {
      assert.strictEqual(players[i], accounts[i]);
    }
    assert.strictEqual(players.length, TOTAL_USERS);
  });

  it("allows at least the minimum money to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("0", "ether"),
      });
      assert(false);
    } catch (error) {
      assert(!(error instanceof assert.AssertionError));
    }
  });

  it("allows only manager to pick a winner", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei("0.02", "ether"),
      });
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(!(error instanceof assert.AssertionError));
    }
  });

  it("send reward and reset players and reward", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    assert(difference < web3.utils.toWei("2", "ether"));
    
    const finalPlayers = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });
    assert(finalPlayers.length === 0);
    
    const lotteryMoney = await web3.eth.getBalance(lottery.options.address);
    assert.strictEqual(lotteryMoney, "0");
  });
});
