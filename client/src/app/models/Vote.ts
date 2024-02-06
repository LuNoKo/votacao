export type Vote = {
  userId: string;
  subjectId: string;
  answer: boolean;
};

export type VoteResult = {
  yes: number;
  no: number;
};
