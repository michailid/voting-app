import { OptionVote } from "./option-vote.models";

export interface Poll {
    id: number;
    question: string;
    options: OptionVote[];
}
