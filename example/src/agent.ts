import { getApiClient } from './util';

(async function () {
  const createRes = await getApiClient().createAgent({
    avatarStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    spriteStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    prompt: 'string',
    name: 'string',
    description: 'string',
    status: 'string',
    visibility: 'string',
  });
  console.log(createRes);

  const updateRes = await getApiClient().updateAgent({
    id: createRes.id,
    updates: { name: 'new name' },
  });
  console.log(updateRes);

  const list = await getApiClient().getAgentList();
  console.log(list);
})();
