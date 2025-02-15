import { getApiClient } from './util';

(async function () {
  const createMapRes = await getApiClient().createMap({
    storageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    title: 'string',
    description: 'string',
    status: 'string',
    visibility: 'string',
    width: 1000,
    height: 1000,
  });
  const createMusicRes = await getApiClient().createMusic({
    audioStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    coverStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    description: 'string',
    status: 'string',
    title: 'string',
    visibility: 'string',
  });
  const createAgentRes = await getApiClient().createAgent({
    avatarStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    spriteStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    prompt: 'string',
    name: 'string',
    description: 'string',
    status: 'string',
    visibility: 'string',
  });

  const createRes = await getApiClient().createGame({
    mapId: createMapRes.id,
    agentIds: [createAgentRes.id],
    musicId: createMusicRes.id,
    logoStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    backgroundStorageId: 'kg289xxs1d2fechcmhjacnacp17aatps',
    twitterHandle: 'string',
    title: 'string',
    description: 'string',
    visibility: 'string',
  });
  console.log(createRes);

  const updateRes = await getApiClient().updateGame({
    id: createRes.id,
    updates: { title: 'new title' },
  });
  console.log(updateRes);

  const list = await getApiClient().getGameList();
  console.log(list);
})();
