class Viewer {
    constructor(features, container, chartContainer) {
        const { samples, featureNames } = features;
        this.samples = samples;
        this.featureNames = featureNames;
        this.container = container;
        this.chartContainer = chartContainer;
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

    createGoogleChart() {
        const featureNames = this.featureNames;
        const samples = this.samples;
        const gchartOptions = {
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

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
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
            const chart = new google.visualization.ScatterChart(this.chartContainer);
            chart.draw(data, gchartOptions);

            // handle click a point in chart
            google.visualization.events.addListener(chart, 'select', () => {
                const selection = chart.getSelection();
                if (selection.length == 0) {
                    return;
                }
                const { row } = selection[0];
                const { id } = samples[row];
                const imgSrc = constants.IMG_DIR + '/' + id + '.png';
                window.open(imgSrc, '_blank');
            });
        });
    }
}