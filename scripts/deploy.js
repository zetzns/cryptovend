const hre = require("hardhat");

async function main() {
  const Vending = await hre.ethers.getContractFactory("VendingMachine");
  const vending = await Vending.deploy();
  await vending.waitForDeployment();
  const address = await vending.getAddress();
  console.log("VendingMachine deployed to:", address);
  // сохраняем адрес для backend и копируем его для фронтенда
  require("fs").writeFileSync(
    "./address.json",
    JSON.stringify({ address }, null, 2)
  );
  // фронтенд берёт адрес из src/address.json
  require("fs").writeFileSync(
    "./frontend/src/address.json",
    JSON.stringify({ address }, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => { console.error(error); process.exit(1); });
