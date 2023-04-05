function createRow(container, studentName, samples) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);

    const rowLabel = renderRowLabel();
    row.appendChild(rowLabel);

    for (let sample of samples) {
        const { id, label } = sample;

        const sampleContainer = createSampleContainer(id);

        const sampleLabel = document.createElement('div');
        sampleLabel.innerHTML = label;
        sampleContainer.appendChild(sampleLabel);

        const img = renderImg(id);
        sampleContainer.appendChild(img);

        row.appendChild(sampleContainer);
    }


    function createSampleContainer(id) {
        const sampleContainer = document.createElement('div');
        sampleContainer.id = `sample_${id}`;
        sampleContainer.classList.add('sampleContainer');
        return sampleContainer;
    }

    function renderRowLabel() {
        const rowLabel = document.createElement('div');
        rowLabel.innerHTML = studentName;
        rowLabel.classList.add('rowLabel');
        return rowLabel;
    }

    function renderImg(id) {
        const img = document.createElement('img');
        img.setAttribute('loading', 'lazy');
        img.src = constants.IMG_DIR + '/' + id + '.png';
        img.classList.add('thumb');
        return img;
    }
}