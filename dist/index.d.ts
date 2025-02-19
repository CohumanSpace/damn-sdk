import { ReadStream } from 'fs';

type BaseResource = {
    _creationTime: number;
    _id: string;
};
type PaginationOptions = {
    numItems: number;
    cursor: string | null;
};
type PaginationResult<T> = {
    page: T[];
    isDone: boolean;
    continueCursor: string;
};
type MusicResource = {
    audioStorageId: string;
    authUserId: string;
    coverStorageId: string;
    description: string;
    status: string;
    title: string;
    visibility: string;
} & BaseResource;
type MapResource = {
    authUserId: string;
    storageId: string;
    title: string;
    description: string;
    status: string;
    visibility: string;
    width: number;
    height: number;
} & BaseResource;
type AgentResource = {
    authUserId: string;
    avatarStorageId: string;
    spriteStorageId: string;
    prompt: string;
    name: string;
    description: string;
    status: number;
    visibility: number;
} & BaseResource;
type GameResource = {
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
type CreateOrUpdateResourceResponse = {
    id: string;
};
type UploadResponse = {
    storageId: string;
};
type CreateMusicRequestParams = {
    audioStorageId: string;
    coverStorageId: string;
    description: string;
    status: string;
    title: string;
    visibility: string;
};
type UpdateMusicRequestParams = {
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
type MusicListResponse = MusicResource[];
type CreateMapRequestParams = {
    storageId: string;
    title: string;
    description: string;
    status: string;
    visibility: string;
    width: number;
    height: number;
};
type UpdateMapRequestParams = {
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
type MapListResponse = MapResource[];
type CreateAgentRequestParams = {
    avatarStorageId: string;
    spriteStorageId: string;
    prompt: string;
    name: string;
    description: string;
    status: string;
    visibility: string;
};
type UpdateAgentRequestParams = {
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
type AgentListResponse = AgentResource[];
type CreateGameRequestParams = {
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
type UpdateGameRequestParams = {
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
type GameListResponse = GameResource[];
declare namespace GameData {
    type WorldStatus = {
        name: string;
        status: 'running' | 'stoppedByDeveloper' | 'inactive';
        humanPlayer: number;
        agentPlayer: number;
        onlineAgentPlayer: number;
        onlineHumanPlayer: number;
        _creationTime: number;
    };
    type Player = {
        playerId: string;
        name: string;
        description: string;
        character: string;
        human?: string;
        inventory: {
            [x: string]: number;
        };
        agent?: {
            id: string;
            identity: string;
            plan: string;
        };
    } & BaseResource;
    type HumanPlayer = Omit<Player, 'agent'> & {
        human: string;
    };
    type AgentPlayer = Omit<Player, 'human'> & {
        agent: {
            id: string;
            identity: string;
            plan: string;
        };
    };
    type Conversation = {
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
    type Message = {
        worldId: string;
        conversationId: string;
        messageUuid: string;
        author: string;
        text: string;
    } & BaseResource;
}
type GetAgentPlayerListResponse = GameData.AgentPlayer[];
type GetHumanPlayerListResponse = PaginationResult<GameData.HumanPlayer>;
type GetConversationListResponse = PaginationResult<GameData.Conversation>;
type GetMessageListResponse = GameData.Message[];

type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>;
interface ClientOptions {
    baseUrl: string;
    apiKey: string;
    fetch?: Fetch;
}
declare abstract class BaseClient {
    baseUrl: string;
    apiKey: string;
    private fetch;
    constructor({ baseUrl, apiKey, fetch }: ClientOptions);
    private buildUrl;
    private request;
    get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T>;
    post<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T>;
    put<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T>;
    delete<T>(endpoint: string, params?: Record<string, string | number>): Promise<T>;
    patch<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T>;
}

declare class ApiClient extends BaseClient {
    constructor({ baseUrl, apiKey, fetch }: ClientOptions);
    upload(file: Buffer | ReadStream, fileName: string): Promise<UploadResponse>;
    getMusicList(): Promise<MusicListResponse>;
    createMusic(params: CreateMusicRequestParams): Promise<CreateOrUpdateResourceResponse>;
    updateMusic(params: UpdateMusicRequestParams): Promise<CreateOrUpdateResourceResponse>;
    getMapList(): Promise<MapListResponse>;
    createMap(params: CreateMapRequestParams): Promise<CreateOrUpdateResourceResponse>;
    updateMap(params: UpdateMapRequestParams): Promise<CreateOrUpdateResourceResponse>;
    getAgentList(): Promise<AgentListResponse>;
    createAgent(params: CreateAgentRequestParams): Promise<CreateOrUpdateResourceResponse>;
    updateAgent(params: UpdateAgentRequestParams): Promise<CreateOrUpdateResourceResponse>;
    getGameList(): Promise<GameListResponse>;
    createGame(params: CreateGameRequestParams): Promise<CreateOrUpdateResourceResponse>;
    updateGame(params: UpdateGameRequestParams): Promise<CreateOrUpdateResourceResponse>;
    private gameServiceApi;
    gameData: {
        getWorldStatus: (gameId: string) => Promise<GameData.WorldStatus>;
        getAgentPlayerList: (gameId: string) => Promise<GetAgentPlayerListResponse>;
        getHumanPlayerList: (gameId: string, paginationOptions: PaginationOptions) => Promise<GetHumanPlayerListResponse>;
        getPlayer: (gameId: string, playerId: string) => Promise<GameData.Player>;
        getConversationList: (gameId: string, paginationOptions: PaginationOptions) => Promise<GetConversationListResponse>;
        getMessageList: (gameId: string, conversationId: string) => Promise<GetMessageListResponse>;
    };
}

export { ApiClient };
