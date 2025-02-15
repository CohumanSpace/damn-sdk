import { getApiClient } from './util';

(async function () {
  const uploadRes = await getApiClient().upload('./damn-logo.png', 'damn-logo.png');
  console.log(uploadRes);
})();
