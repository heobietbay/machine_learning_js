class Viewer {
  constructor(features, container, chartContainer) {
    const { samples, featureNames } = features;
    this.samples = samples;
    this.featureNames = featureNames;
    this.container = container;
    this.chartContainer = chartContainer;
    this.chart = null;
  }

  createRows() {
    const groups = utils.groupBy(this.samples, "student_id");
    let count = 0;
    for (let student_id in groups) {
      const samples = groups[student_id];
      const studentName = samples[0].student_name;
      createRow(this.container, studentName, samples);
      count++;
      // due to memory limit in browser, have to render only first 128
      if (count == 128) {
        break;
      }
    }
  }

  addNewItemToChart(item) {
    if (!this.chart) {
      return;
    }
    const newItem = {
      point: [item.pathCount, item.pointCount],
      label: 'current drawing',
    };
    const existingIdx = this.samples.findIndex((item) => item.label === newItem.label);
    if(existingIdx !== -1) {
      this.samples.splice(existingIdx,1);
    }
    this.samples.push(newItem);
    const featureNames = this.featureNames;
    const samples = this.samples;

    this.chart.draw(
      this.#prepareChartData(featureNames, samples),
      this.#defaultGchartOptions(featureNames)
    );
  }

  createGoogleChartFirstTime() {
    const featureNames = this.featureNames;
    const samples = this.samples;
    const gchartOptions = this.#defaultGchartOptions(featureNames);

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const data = this.#prepareChartData(featureNames, samples);

      const chart = new google.visualization.ScatterChart(this.chartContainer);
      this.chart = chart;

      chart.draw(data, gchartOptions);

      // handle click a point in chart
      google.visualization.events.addListener(chart, 'select', () => {
        const selection = chart.getSelection();
        if (selection.length == 0) {
          return;
        }
        const { row } = selection[0];
        const { id } = samples[row];
        if (id) {
          const imgSrc = constants.IMG_DIR + '/' + id + '.png';
          window.open(imgSrc, '_blank');
        }
      });
    });
  }

  #defaultGchartOptions(featureNames) {
    return {
      width: 500,
      height: 500,
      hAxis: { title: featureNames[0] },
      vAxis: { title: featureNames[1] },
      legend: { position: 'none' },
      explorer: {
        maxZoomIn: 0.01,
        actions: ['dragToZoom', 'rightClickToReset']
      }
    };
  }

  #prepareChartData(featureNames, samples) {
    const data = new google.visualization.DataTable();
    data.addColumn('number', featureNames[0]);
    data.addColumn('number', featureNames[1]);
    data.addColumn({ type: 'string', role: 'style' });
    data.addColumn({ type: 'string', role: 'tooltip' });
    data.addRows(samples.map(sample => [
      ...sample.point,
      utils.styles[sample.label],
      `${sample.label} - (${sample.point})`
    ]));
    return data;
  }
}