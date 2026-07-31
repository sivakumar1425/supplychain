const Web3 = require("web3");
const path = require("path");

// ===============================
// 🔹 Load contract artifact
// ===============================
const contractPath = path.join(
  __dirname,
  "../blockchain/build/contracts/SupplyChain.json"
);
const contractJson = require(contractPath);

// ===============================
// 🔹 Connect to Ganache
// ===============================
const web3 = new Web3("http://127.0.0.1:7545");

// ===============================
// 🔹 Network & deployment
// ===============================
const networkId = "5777";
const deployedNetwork = contractJson.networks[networkId];

if (!deployedNetwork) {
  throw new Error("❌ SupplyChain contract not deployed on this network");
}

// ===============================
// 🔹 Contract instance
// ===============================
const contract = new web3.eth.Contract(
  contractJson.abi,
  deployedNetwork.address
);

// ===============================
// 🔹 Account helpers
// ===============================
const getAccounts = async () => {
  return await web3.eth.getAccounts();
};

const getAccount = async () => {
  const accounts = await getAccounts();
  return accounts[0];
};

// ===============================
// 🔹 Test connection
// ===============================
const testConnection = async () => {
  const account = await getAccount();

  return {
    message: "Blockchain connected successfully",
    networkId,
    contractAddress: contract.options.address,
    account
  };
};

// ===============================
// 🔹 Role helpers
// ===============================
const getMyRole = async () => {
  const account = await getAccount();
  return await contract.methods.getMyRole().call({ from: account });
};

const assignRole = async (userAddress, role) => {
  const account = await getAccount();

  await contract.methods
    .assignRole(userAddress, role)
    .send({
      from: account,
      gas: 300000
    });

  return true;
};

// ===============================
// 🔹 Product lifecycle
// ===============================
const addProduct = async (name, origin, price) => {
  const account = await getAccount();

  await contract.methods
    .addProduct(name, origin, price)
    .send({
      from: account,
      gas: 300000
    });

  return true;
};

const shipProduct = async (productId) => {
  const account = await getAccount();

  await contract.methods
    .shipProduct(productId)
    .send({
      from: account,
      gas: 300000
    });

  return true;
};

const deliverProduct = async (productId) => {
  const account = await getAccount();

  await contract.methods
    .deliverProduct(productId)
    .send({
      from: account,
      gas: 300000
    });

  return true;
};

const getProduct = async (id) => {
  return await contract.methods.getProduct(id).call();
};

// ===============================
// 🔹 EXPORTS
// ===============================
module.exports = {
  web3,
  contract,
  getAccounts,
  getAccount,
  testConnection,
  getMyRole,
  assignRole,
  addProduct,
  shipProduct,
  deliverProduct,
  getProduct
};
