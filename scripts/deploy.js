const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Vending = await hre.ethers.getContractFactory("VendingMachine");
  const vending = await Vending.deploy();
  await vending.waitForDeployment();
  const address = await vending.getAddress();
  console.log("VendingMachine deployed to:", address);
  // путь к корню проекта, где находится этот скрипт
  const root = path.resolve(__dirname, "..");
  // сохраняем адрес для backend
  fs.writeFileSync(
    path.join(root, "address.json"),
    JSON.stringify({ address }, null, 2)
  );
  // фронтенд берёт адрес из src/address.json
  fs.writeFileSync(
    path.join(root, "frontend", "src", "address.json"),
    JSON.stringify({ address }, null, 2)
  );
  // копируем ABI, чтобы фронт использовал актуальный контракт
  const artifact = path.join(
    root,
    "artifacts",
    "contracts",
    "VendingMachine.sol",
    "VendingMachine.json"
  );
  fs.copyFileSync(
    artifact,
    path.join(root, "frontend", "src", "VendingMachine.json")
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => { console.error(error); process.exit(1); });
