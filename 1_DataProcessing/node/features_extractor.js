const constants = require('../../common/constants.js');
const featuresUtil = require('../../common/featuresUtil.js');

const fs = require('fs');

console.log('Extracting features...');

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

for (let sample of samples) {
  const paths = JSON.parse(fs.readFileSync(`${constants.JSON_DIR}/${sample.id}.json`));
  // sample.point = [featuresUtil.getPathCount(paths), featuresUtil.getPointCount(paths)];  
  const boundingBox = featuresUtil.getBoundingBox(paths);
  sample.point = [boundingBox.topRight.x - boundingBox.topLeft.x,
                  boundingBox.topRight.y - boundingBox.bottomRight.y];
}

// const FEATURE_NAMES = ['Path count', 'Point count'];
const FEATURE_NAMES = ['Width', 'Height'];

fs.writeFileSync(constants.FEATURES, JSON.stringify({
  featureNames: FEATURE_NAMES,
  samples: samples.map(s => {
    return { point: s.point, label: s.label };
  })
}));

// this file contains full data
fs.writeFileSync(constants.FEATURES_JS,
  `const features = ${JSON.stringify({
    featureNames: FEATURE_NAMES,
    samples
  })}`);

console.log('Done!');