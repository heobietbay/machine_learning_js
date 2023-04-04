const formatPercent = (value) => {
  return `${(value*100).toFixed(2)}%`;
};

const printProgress = (current, total) => {
  const percent = (current / total);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Progress: ${current}/${total} (${formatPercent(percent)})`);
};

if(typeof module !== 'undefined') {
  module.exports = { printProgress };
}
