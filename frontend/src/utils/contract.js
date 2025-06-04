import vendingAbi from "../../../artifacts/contracts/VendingMachine.sol/VendingMachine.json" assert { type: "json" };
import addressJson from "../../../address.json" assert { type: "json" };
import { ethers } from "ethers";

export function getContract() {
  if (!window.ethereum) throw new Error("Metamask required");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(addressJson.address, vendingAbi.abi, signer);
}
