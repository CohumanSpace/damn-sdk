import { getApiClient } from './util';
import fs from 'fs';

(async function () {
  const fileBuffer = fs.readFileSync('damn-logo.png');
  const blob = new Blob([fileBuffer], { type: 'image/png' });

  const uploadRes = await getApiClient().upload(blob, 'damn-logo.png');
  console.log(uploadRes);
})();
