// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// Кириешки-вендинг: продаёт пачки сухариков за 0.01 ETH
contract VendingMachine {
    address public owner;
    uint256 public constant PRICE = 0.01 ether;

    mapping(address => uint256) public packsOwned;
    uint256 public stock;

    event Bought(address indexed buyer, uint256 amount);
    event Restocked(uint256 amount);

    constructor() {
        owner = msg.sender;
        stock = 1_000;           // стартовый запас
    }

    /// покупка `amount` пачек
    function buy(uint256 amount) external payable {
        require(amount > 0, "Amount must be >0");
        require(msg.value == amount * PRICE, "Incorrect ETH sent");
        require(stock >= amount, "Not enough stock");
        stock -= amount;
        packsOwned[msg.sender] += amount;
        emit Bought(msg.sender, amount);
    }

    /// владелец пополняет склад
    function restock(uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        stock += amount;
        emit Restocked(amount);
    }
}
