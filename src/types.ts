export type BaseResource = { _creationTime: number; _id: string };

export type PaginationOptions = { numItems: number; cursor: string | null };
export type PaginationResult<T> = {
  page: T[];
  isDone: boolean;
  continueCursor: string;
};

export type MusicResource = {
  audioStorageId: string;
  authUserId: string;
  coverStorageId: string;
  description: string;
  status: string;
  title: string;
  visibility: string;
} & BaseResource;

export type MapResource = {
  authUserId: string;
  storageId: string;
  title: string;
  description: string;
  status: string;
  visibility: string;
  width: number;
  height: number;
} & BaseResource;

export type AgentResource = {
  authUserId: string;
  avatarStorageId: string;
  spriteStorageId: string;
  prompt: string;
  name: string;
  description: string;
  status: number;
  visibility: number;
} & BaseResource;

export type GameResource = {
  name: string;
  authUserId: string;
  mapId: string;
  agentIds: string[];
  musicId: string;
  logoStorageId: string;
  backgroundStorageId: string;
  twitterHandle: string;
  title: string;
  description: string;
  status: string;
  visibility: string;
  views?: number;
  likes?: number;
} & BaseResource;

export type CreateOrUpdateResourceResponse = { id: string };

export type UploadResponse = {
  storageId: string;
};

export type CreateMusicRequestParams = {
  audioStorageId: string;
  coverStorageId: string;
  description: string;
  status: string;
  title: string;
  visibility: string;
};
export type UpdateMusicRequestParams = {
  id: string;
  updates: {
    audioStorageId?: string;
    coverStorageId?: string;
    title?: string;
    description?: string;
    status?: string;
    visibility?: string;
  };
};

export type MusicListResponse = MusicResource[];
export type CreateMusicResponse = CreateOrUpdateResourceResponse;
export type UpdateMusicResponse = CreateOrUpdateResourceResponse;

export type CreateMapRequestParams = {
  storageId: string;
  title: string;
  description: string;
  status: string;
  visibility: string;
  width: number;
  height: number;
};
export type UpdateMapRequestParams = {
  id: string;
  updates: {
    storageId?: string;
    title?: string;
    description?: string;
    status?: string;
    visibility?: string;
    width?: number;
    height?: number;
  };
};

export type MapListResponse = MapResource[];
export type CreateMapResponse = CreateOrUpdateResourceResponse;
export type UpdateMapResponse = CreateOrUpdateResourceResponse;

export type CreateAgentRequestParams = {
  avatarStorageId: string;
  spriteStorageId: string;
  prompt: string;
  name: string;
  description: string;
  status: string;
  visibility: string;
};
export type UpdateAgentRequestParams = {
  id: string;
  updates: {
    avatarStorageId?: string;
    spriteStorageId?: string;
    prompt?: string;
    name?: string;
    description?: string;
    status?: string;
    visibility?: string;
  };
};

export type AgentListResponse = AgentResource[];
export type CreateAgentResponse = CreateOrUpdateResourceResponse;
export type UpdateAgentResponse = CreateOrUpdateResourceResponse;

export type CreateGameRequestParams = {
  mapId: string;
  agentIds: string[];
  musicId: string;
  logoStorageId: string;
  backgroundStorageId: string;
  twitterHandle: string;
  title: string;
  description: string;
  visibility: string;
};
export type UpdateGameRequestParams = {
  id: string;
  updates: {
    mapId?: string;
    agentIds?: string[];
    musicId?: string;
    logoStorageId?: string;
    backgroundStorageId?: string;
    twitterHandle?: string;
    title?: string;
    description?: string;
    visibility?: string;
  };
};

export type GameListResponse = GameResource[];
export type CreateGameResponse = CreateOrUpdateResourceResponse;
export type UpdateGameResponse = CreateOrUpdateResourceResponse;

export namespace GameData {
  export type WorldStatus = {
    name: string;
    status: 'running' | 'stoppedByDeveloper' | 'inactive';
    humanPlayer: number;
    agentPlayer: number;
    onlineAgentPlayer: number;
    onlineHumanPlayer: number;
    _creationTime: number;
  };

  export type Player = {
    playerId: string;
    name: string;
    description: string;
    character: string;
    human?: string;
    inventory: {
      [x: string]: number;
    };
    agent?: { id: string; identity: string; plan: string };
  } & BaseResource;

  export type HumanPlayer = Omit<Player, 'agent'> & { human: string };
  export type AgentPlayer = Omit<Player, 'human'> & { agent: { id: string; identity: string; plan: string } };

  export type Conversation = {
    worldId: string;
    id: string;
    creator: string;
    created: number;
    ended: number;
    numMessages: number;
    participants: [string, string];
    lastMessage?: {
      author: string;
      timestamp: number;
    } & BaseResource;
  };

  export type Message = {
    worldId: string;
    conversationId: string;
    messageUuid: string;
    author: string;
    text: string;
  } & BaseResource;
}

export type GetWorldStatusResponse = GameData.WorldStatus;
export type GetAgentPlayerListResponse = GameData.AgentPlayer[];
export type GetHumanPlayerListResponse = PaginationResult<GameData.HumanPlayer>;
export type GetPlayerResponse = GameData.Player;
export type GetConversationListResponse = PaginationResult<GameData.Conversation>;
export type GetMessageListResponse = GameData.Message[];
