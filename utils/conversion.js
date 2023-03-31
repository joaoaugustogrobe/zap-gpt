const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

async function convertOggToMp3(input) {
  console.log('convertOggToMp3', input)
  if (!fs.existsSync(input))
    throw 'Input path doesn\'t exists';

	let segments = input.split('/');

	let filename = segments[segments.length - 1];

	let name = filename.split('.')[0];

	let folder = input.replace(filename, '');
	let output = folder + name + '.mp3';

  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .inputFormat('ogg')
      .noVideo()
      .audioChannels(2)
      .audioFrequency(44100) // -ar 44100
      .audioBitrate('192k')
      .format('mp3')
      .save(output)
      .on('end', function() {
        console.log('!')
        resolve(output)
      })
      .on('error', function(err, stdout, stderr) {
        reject({...err, ...stdout, ...stderr})
      });
    
  })
}

module.exports = {
  convertOggToMp3
}