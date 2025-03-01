// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../../contracts/OnlyWethReceiver.sol";

contract WethReceiverMock is OnlyWethReceiver {
    constructor(address WETH) OnlyWethReceiver(WETH) {}
}
