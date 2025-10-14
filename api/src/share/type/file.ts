interface FileBaseI {
  public_id: string;
  url: string;
  original_name: string;
  file_type: string;
  size: number;
  viewable_url?: string | null;
}

export interface FileI extends FileBaseI {
  id: number;
}

export interface FileReqI extends FileBaseI {}

export interface FileResI extends FileI {}