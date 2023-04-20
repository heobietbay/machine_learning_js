
const getPathCount = (paths) => {
  return paths.length;
}

const getPointCount = (paths) => {
  const allPoints = paths.flat();
  return allPoints.length;
};

const getBoundingBox = (paths) => {
  // topLeft, bottomLeft, topRight, bottomRight
  function get4Cordinates(path) {
    const xcordinates = path.map((point) => point[0]);
    const minX = Math.min(...xcordinates);
    const maxX = Math.max(...xcordinates);

    const ycordinates = path.map((point) => point[1]);
    const minY = Math.min(...ycordinates);
    const maxY = Math.max(...ycordinates);

    return { minX, maxX, minY, maxY };
  }
  let resultCordinate = null;
  for (let path of paths) {
    const cordinates = get4Cordinates(path);
    if (!resultCordinate) {
      resultCordinate = cordinates;
    } else {
      resultCordinate.maxX = Math.max(resultCordinate.maxX, cordinates.maxX);
      resultCordinate.minX = Math.min(resultCordinate.minX, cordinates.minX);
      resultCordinate.maxY = Math.max(resultCordinate.maxY, cordinates.maxY);
      resultCordinate.minY = Math.min(resultCordinate.minY, cordinates.minY);
    }
  }
  return !resultCordinate ? null : {
    topLeft: { x: resultCordinate.minX, y: resultCordinate.maxY },
    bottomLeft: { x: resultCordinate.minX, y: resultCordinate.minY },
    topRight: { x: resultCordinate.maxX, y: resultCordinate.maxY },
    bottomRight: { x: resultCordinate.maxX, y: resultCordinate.minY }
  };
}

const featuresUtil = {
  getPathCount, getPointCount, getBoundingBox
};

if (typeof module !== 'undefined') {
  module.exports = featuresUtil;
}
