const fs = require('fs');
const path = require('path');
const tempFolder = '.temp';
const { convertOggToMp3 } = require('./conversion');

async function downloadMessageMedia(message) {
  console.log('downloadMessageMedia');
  const media = await message.downloadMedia();
  if (!media) { // Excluded from device
    throw 'Could not download media'
  }

  await assertTempFolder(tempFolder);
  const oggPath = path.join(tempFolder, `${message.timestamp}.ogg`);
  fs.writeFileSync(oggPath, media.data, "base64");

  return convertOggToMp3(oggPath)
}
async function assertTempFolder(folder) {
  if(!fs.existsSync(folder))
    fs.mkdirSync(folder);
}

module.exports = {
  downloadMessageMedia
}