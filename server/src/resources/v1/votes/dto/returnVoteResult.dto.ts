export class ReturnVoteResultDto {
  constructor(restult: { votesForYes: number; votesForNo: number }) {
    this.yes = restult.votesForYes;
    this.no = restult.votesForNo;
  }

  yes: number;
  no: number;
}
