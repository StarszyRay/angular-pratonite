export interface IStep {
  _id?: string;
  price: number;
  description: string;
  patronsNum: number;
  additions: {
    videoId: string;
    pictureUrl: string;
    text: string;
  };
}
