const formatPercent = (value) => {
  return `${(value*100).toFixed(2)}%`;
};

const printProgress = (current, total) => {
  const percent = (current / total);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Progress: ${current}/${total} (${formatPercent(percent)})`);
};

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    const val = currentValue[key];
    result[val] = result[val] || [];
    result[val].push(currentValue);
    return result;
  }, {});
};

const utils = {
  printProgress, groupBy
};

if(typeof module !== 'undefined') {
  module.exports = utils;
}
