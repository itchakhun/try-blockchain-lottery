import web3 from "./web3";

const CONTRACT_ABI = [
  {
      "constant": true,
      "inputs": [],
      "name": "manager",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "pickWinner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "getPlayers",
      "outputs": [
          {
              "name": "",
              "type": "address[]"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [],
      "name": "enter",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "players",
      "outputs": [
          {
              "name": "",
              "type": "address"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
  }
];

const CONTRACT_ADDRESS = '0xE175Ec7a39a70ebD089CED58089153eD7EF244cc';
export default new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

