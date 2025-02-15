import { getApiClient } from './util';

(async function () {
  const gameId = 'jd7bkfbhwe6tj3m5dpgstxw7vn7advns';
  const worldStaus = await getApiClient().gameData.getWorldStatus(gameId);
  console.log(worldStaus);

  const agentPlayerList = await getApiClient().gameData.getAgentPlayerList(gameId);
  console.log(agentPlayerList);

  const humanPlayerList = await getApiClient().gameData.getHumanPlayerList(gameId, { numItems: 10, cursor: null });
  console.log(humanPlayerList);

  const agentPlayer = agentPlayerList[0];
  if (agentPlayer) {
    const player = await getApiClient().gameData.getPlayer(gameId, agentPlayer.playerId);
    console.log(player);
  }

  const conversationList = await getApiClient().gameData.getConversationList(gameId, { numItems: 10, cursor: null });
  console.log(conversationList);

  const conversation = conversationList.page[0];
  if (conversation) {
    const messageList = await getApiClient().gameData.getMessageList(gameId, conversation.id);
    console.log(messageList);
  }
})();
