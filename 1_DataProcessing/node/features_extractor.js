const constants = require('../../common/constants.js');
const features = require('../../common/featuresUtil.js');

const fs = require('fs');

console.log('Extracting features...');

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

for (let sample of samples) {
  const paths = JSON.parse(fs.readFileSync(`${constants.JSON_DIR}/${sample.id}.json`));
  sample.point = [features.getPathCount(paths), features.getPointCount(paths)];
}

const FEATURE_NAMES = ['Path count', 'Point count'];

fs.writeFileSync(constants.FEATURES, JSON.stringify({
  featureNames: FEATURE_NAMES,
  samples: samples.map(s => {
    return { point: s.point, label: s.label };
  })
}));

// this file contains full data
fs.writeFileSync(constants.FEATURES_JS,
  `const features = ${JSON.stringify({featureNames: FEATURE_NAMES,
    samples})}`);

console.log('Done!');