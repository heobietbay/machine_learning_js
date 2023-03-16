const draw = require('../../common/draw.js');

const constants = {};
constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.IMG_DIR = constants.DATASET_DIR + "/img";
constants.SAMPLES = constants.DATASET_DIR + "/samples.json";

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
        const paths = JSON.stringify(drawings[label]);
        fs.writeFileSync(`${constants.JSON_DIR}\/${id}.json`, paths);
        generateImageFromPaths(`${constants.IMG_DIR}\/${id}.png`, paths)
        id++;
    }
}
);
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFromPaths(outFile, paths) {
   draw.drawPaths(ctx, paths);

   const buffer = canvas.toBuffer('image/png');
   fs.writeSync(outFile, buffer);
}
