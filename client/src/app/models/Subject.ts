import { Vote } from './Vote';

export type SubjectWithVotes = {
  id: string;
  title: string;
  description: string;
  category: string;
  activeUntil: string;
  votes: Vote[];
};

export type SubjectWithId = {
  id: string;
  title: string;
  description: string;
  category: string;
  activeUntil: string;
};

export type Subject = {
  title: string;
  description: string;
  category: string;
  activeUntil: string;
};
