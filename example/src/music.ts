import { getApiClient } from './util';

(async function () {
  const createRes = await getApiClient().createMusic({
    audioStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    coverStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    description: 'string',
    status: 'string',
    title: 'string',
    visibility: 'string',
  });
  console.log(createRes);

  const updateRes = await getApiClient().updateMusic({
    id: createRes.id,
    updates: { title: 'new title' },
  });
  console.log(updateRes);

  const list = await getApiClient().getMusicList();
  console.log(list);
})();
