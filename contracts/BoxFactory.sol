pragma solidity ^0.4.22;

contract BoxFactory {
  struct Box {
    address owner;
    uint32 color;   // FFFFFF = 16777215 なので、32あれば十分
    int8 x;         // +-127程度を確保
    int8 y;
  }

  Box[] public boxes;

  function _createBox(address _owner, uint32 _color, int8 _x, int8 _y) private {
    require(_checkCoordinate(_owner, _x, _y));
    boxes.push(Box({
      owner: _owner,
      color: _color,
      x: _x,
      y: _y
    }));
  }

  function createBox(uint32 _color, int8 _x, int8 _y) external {
    _createBox(msg.sender, _color, _x, _y);
  }

  /**
   * 同じ所有者で、同座標のボックスがない判定
   */
  function _checkCoordinate(address _owner, int8 _x, int8 _y) private view returns(bool) {
    for (uint i = 0; i < boxes.length; i++) {
      Box memory box = boxes[i];
      if (box.owner == _owner && box.x == _x && box.y == _y) {
        return false;
      }
    }
    return true;
  }

  function getBoxes() external view returns(address[], uint32[], int8[], int8[]) {
    uint boxCount = _getBoxCount(msg.sender);
    address[] memory owners = new address[](boxCount);
    uint32[] memory colors = new uint32[](boxCount);
    int8[] memory x = new int8[](boxCount);
    int8[] memory y = new int8[](boxCount);

    uint counter = 0;
    for (uint i = 0; i < boxes.length; i++) {
      Box memory box = boxes[i];
      if (box.owner == msg.sender) {
        owners[counter] = box.owner;
        colors[counter] = box.color;
        x[counter] = box.x;
        y[counter] = box.y;
        counter++;
      }
    }

    return (owners, colors, x, y);
  }

  function _getBoxCount(address _owner) private view returns(uint count) {
    for (uint i = 0; i < boxes.length; i++) {
      if (boxes[i].owner == _owner) {
        count++;
      }
    }
  }

  function getBoxCount() external view returns(uint count) {
    return _getBoxCount(msg.sender);
  }
}
