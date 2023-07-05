// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Mock {
    function value() external view returns (address) {
        return msg.sender;
    }

    event EventAddress(address sender);
    function log() external {
        emit EventAddress(msg.sender);
    }

    error ErrorAddress(address sender);
    function rev() external view {
        revert ErrorAddress(msg.sender);
    }
}
