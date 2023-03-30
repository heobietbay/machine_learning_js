const draw = require('../../common/draw.js');
const constants = require('../common/constants.js');
const utils = require('../common/utils.js');

const { createCanvas } = require('canvas');
const canvas = createCanvas(400,400);
const ctx = canvas.getContext('2d');

const fs = require('fs');
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];

let id = 1;
fileNames.forEach(fn => {
    const fcontent = fs.readFileSync(`${constants.RAW_DIR}/${fn}`)
    const jsonContent = JSON.parse(fcontent);
    const { session: student_id, student: student_name, drawings } = jsonContent;

    for (let label in drawings) {
        samples.push({
            id,
            label,
            student_name,
            student_id
        });
        const paths = drawings[label];
        fs.writeFileSync(`${constants.JSON_DIR}\/${id}.json`, JSON.stringify(paths));
        ctx.clearRect(0,0,canvas.width,canvas.height);
        generateImageFromPaths(`${constants.IMG_DIR}\/${id}.png`, paths, ctx);

        // each file would have 8 samples.
        utils.printProgress(id, fileNames.length * 8);
        id++;
    }
}
);
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFromPaths(outFile, paths, ctx) {
    draw.drawPaths(ctx, paths);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outFile, buffer);
}
