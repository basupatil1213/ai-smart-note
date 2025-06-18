
export interface QAPair {
  question?: string;
  answer?: string;
}

export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  qaPairs?: QAPair[];
  embeddingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  qaPairs?: QAPair[];
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  summary?: string;
  tags?: string[];
  qaPairs?: QAPair[];
}