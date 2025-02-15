import { getApiClient } from './util';

(async function () {
  const createRes = await getApiClient().createMap({
    storageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    title: 'string',
    description: 'string',
    status: 'string',
    visibility: 'string',
    width: 1000,
    height: 1000,
  });
  console.log(createRes);

  const updateRes = await getApiClient().updateMap({
    id: createRes.id,
    updates: { title: 'new title' },
  });
  console.log(updateRes);

  const list = await getApiClient().getMapList();
  console.log(list);
})();
