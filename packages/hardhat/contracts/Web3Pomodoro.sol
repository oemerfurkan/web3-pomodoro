//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Web3Pomodoro {
  mapping(address => uint256) public totalSuccessful;
  mapping(address => uint256) public totalUnsuccessful;
  mapping(address => uint256) public endTimes;
  mapping(address => uint256) public timers;

  event Success(address _worker, uint256 _time);
  event Attempt(address _worker, uint256 _time);

  function startTimer(uint256 _time) public {
    require(endTimes[msg.sender] == 0, "You have a timer running.");
    timers[msg.sender] = _time;
    endTimes[msg.sender] = block.timestamp + _time;
  }

  function endTimer() public {
    require(endTimes[msg.sender] > 0);
    if (endTimes[msg.sender] > block.timestamp) {
      totalUnsuccessful[msg.sender] += timers[msg.sender];
      emit Attempt(msg.sender, timers[msg.sender]);
    } else {
      totalSuccessful[msg.sender] += timers[msg.sender];
      emit Success(msg.sender, timers[msg.sender]);
    }
    timers[msg.sender] = 0;
    endTimes[msg.sender] = 0;
  }
}
