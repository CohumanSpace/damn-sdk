import { BaseClient, ClientOptions } from './base';
import {
  AgentListResponse,
  CreateAgentRequestParams,
  CreateAgentResponse,
  CreateGameRequestParams,
  CreateGameResponse,
  CreateMapRequestParams,
  CreateMapResponse,
  CreateMusicRequestParams,
  CreateMusicResponse,
  GameListResponse,
  GetAgentPlayerListResponse,
  GetConversationListResponse,
  GetHumanPlayerListResponse,
  GetMessageListResponse,
  GetPlayerResponse,
  GetWorldStatusResponse,
  MapListResponse,
  MusicListResponse,
  PaginationOptions,
  UpdateAgentRequestParams,
  UpdateAgentResponse,
  UpdateGameRequestParams,
  UpdateGameResponse,
  UpdateMapRequestParams,
  UpdateMapResponse,
  UpdateMusicRequestParams,
  UpdateMusicResponse,
  UploadResponse,
} from './types';

export class ApiClient extends BaseClient {
  constructor({ baseUrl, apiKey }: ClientOptions) {
    super({ baseUrl, apiKey });
  }

  public upload(file: Blob | File, fileName: string) {
    const form = new FormData();
    form.append('file', file, fileName);
    return this.post<UploadResponse>('/upload', form);
  }

  public getMusicList() {
    return this.get<MusicListResponse>('/music');
  }

  public createMusic(params: CreateMusicRequestParams) {
    return this.post<CreateMusicResponse>('/music', params);
  }

  public updateMusic(params: UpdateMusicRequestParams) {
    return this.patch<UpdateMusicResponse>('/music', params);
  }

  public getMapList() {
    return this.get<MapListResponse>('/map');
  }

  public createMap(params: CreateMapRequestParams) {
    return this.post<CreateMapResponse>('/map', params);
  }

  public updateMap(params: UpdateMapRequestParams) {
    return this.patch<UpdateMapResponse>('/map', params);
  }

  public getAgentList() {
    return this.get<AgentListResponse>('/agent');
  }

  public createAgent(params: CreateAgentRequestParams) {
    return this.post<CreateAgentResponse>('/agent', params);
  }

  public updateAgent(params: UpdateAgentRequestParams) {
    return this.patch<UpdateAgentResponse>('/agent', params);
  }

  public getGameList() {
    return this.get<GameListResponse>('/game');
  }

  public createGame(params: CreateGameRequestParams) {
    return this.post<CreateGameResponse>('/game', params);
  }

  public updateGame(params: UpdateGameRequestParams) {
    return this.patch<UpdateGameResponse>('/game', params);
  }

  private gameServiceApi<T>(gameId: string, action: string, restData?: any) {
    return this.post<T>('/manage-game', { action, data: { gameId, ...restData } });
  }

  public gameData = {
    getWorldStatus: (gameId: string) => {
      return this.gameServiceApi<GetWorldStatusResponse>(gameId, 'getWorldStatus');
    },
    getAgentPlayerList: (gameId: string) => {
      return this.gameServiceApi<GetAgentPlayerListResponse>(gameId, 'getAgentPlayerList');
    },
    getHumanPlayerList: (gameId: string, paginationOptions: PaginationOptions) => {
      return this.gameServiceApi<GetHumanPlayerListResponse>(gameId, 'getHumanPlayerList', { paginationOptions });
    },
    getPlayer: (gameId: string, playerId: string) => {
      return this.gameServiceApi<GetPlayerResponse>(gameId, 'getPlayer', { playerId });
    },
    getConversationList: (gameId: string, paginationOptions: PaginationOptions) => {
      return this.gameServiceApi<GetConversationListResponse>(gameId, 'getConversationList', { paginationOptions });
    },
    getMessageList: (gameId: string, conversationId: string) => {
      return this.gameServiceApi<GetMessageListResponse>(gameId, 'getMessageList', { conversationId });
    },
  };
}
