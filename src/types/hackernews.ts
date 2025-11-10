export enum HNItemType {
  Job = 'job',
  Story = 'story',
  Comment = 'comment',
  Poll = 'poll',
  PollOpt = 'pollopt',
}

export type HNItemId = number;

export interface HNItem {
  id: HNItemId;
  deleted?: boolean;
  type?: HNItemType;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: HNItemId;
  poll?: HNItemId;
  kids?: HNItemId[];
  url?: string;
  score?: number;
  title?: string;
  parts?: HNItemId[];
  descendants?: number;
}

export interface PostsState {
  newPostItems: Partial<HNItem>[];
  topPostItems: Partial<HNItem>[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

export interface CommentsState {
  items: Partial<HNItem>[];
  loading: boolean;
  error: string | null;
  parentId: HNItemId | null;
}
