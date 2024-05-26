export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Refresh {
  access_token: string;
  refresh_token: string;
}

export interface File {
  id: number;
  name: string;
  file: string;
  format: string;
  created_at: Date | string;
  updated_at: Date | string;
  user_id: number;
  should_delete: boolean;
}

export interface Files {
  data: File;
}

export interface FilesFavorite extends Files {
  fav: number | null;
}
