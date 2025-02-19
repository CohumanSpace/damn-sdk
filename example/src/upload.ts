import { createReadStream } from 'fs';
import { getApiClient } from './util';

(async function () {
  const uploadRes = await getApiClient().upload(createReadStream('./damn-logo.png'), 'damn-logo.png');
  console.log(uploadRes);
})();
