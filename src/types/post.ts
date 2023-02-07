export type TPostFromDB = {
  _id: number;
  title: string;
  message: string;
  creatorId: string;
  creatorName: string,
  tags: string[];
  selectedFile: string;
  likes: number[];
  comments: string[];
  createdAt: string;
  __v: number;
};

export type TPostDataFromDB = {
  posts: TPostFromDB[],
  currentPage: number,
  countPages: number
}

export type TFileBase = {
  name: string;
  size: string;
  type: string;
  file: {
    lastModified: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  };
  base64: string;
};

export type TPostFromClient = {
  title: string;
  message: string;
  tags: string[];
  selectedFile: string;
  creatorName?: string;
};

export type TUpdatePostMutation = {
    id: number,
    updatedFields: TPostFromClient
}

export type TMessageFromServer = {
    message: string
}