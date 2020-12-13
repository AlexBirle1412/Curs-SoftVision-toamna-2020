const spaceRangerBase = {
  x: 0,
  y: 0,
  width: 195,
  height: 191,
};
const pinkLadyBase = {
  x: 775,
  y: 481,
  width: 185,
  height: 159,
};

function verifyCoordinatesForSpaceRangerBase(x, y) {
  if (
    x >= spaceRangerBase.x &&
    x <= spaceRangerBase.width &&
    y >= spaceRangerBase.y &&
    y <= spaceRangerBase.height
  )
    return false;
  return true;
}

function verifyCoordinatesForPinkLadyBase(x, y) {
  if (
    x + 50 >= pinkLadyBase.x &&
    x + 50 <= pinkLadyBase.x + pinkLadyBase.width &&
    y + 50 >= pinkLadyBase.y &&
    y + 50 <= pinkLadyBase.y + pinkLadyBase.height
  )
    return false;
  return true;
}

const RIGHT_EDGE = 860;
const DOWN_EDGE = 540;

class Diamond {
  constructor() {
    this.x = Math.floor(Math.random() * RIGHT_EDGE + 50);
    this.y = Math.floor(Math.random() * DOWN_EDGE + 50);

    while (
      verifyCoordinatesForSpaceRangerBase(this.x, this.y) == 0 ||
      verifyCoordinatesForPinkLadyBase(this.x, this.y) == 0
    ) {
      this.x = Math.floor(Math.random() * RIGHT_EDGE + 50);
      this.y = Math.floor(Math.random() * DOWN_EDGE + 50);
    }
    this.imageId = "diamond";
    this.width = 26;
    this.height = 21;
  }

  forDraw() {
    return {
      imageId: this.imageId,
      drawImageParameters: [this.x, this.y],
    };
  }
}

module.exports = Diamond;
