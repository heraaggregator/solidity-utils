// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;
pragma abicoder v1;

abstract contract EthReceiver {
    receive() external payable {
        // solhint-disable-next-line avoid-tx-origin
        require(msg.sender != tx.origin, "ETH deposit rejected");
    }
}
