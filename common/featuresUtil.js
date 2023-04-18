
const getPathCount = (paths) => {
    return paths.length;
}

const getPointCount = (paths) => {
  const allPoints = paths.flat();
  return allPoints.length;
};

const featuresUtil = {
  getPathCount, getPointCount
};

if(typeof module !== 'undefined') {
  module.exports = featuresUtil;
}
