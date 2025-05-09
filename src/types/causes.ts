export type Cause = {
  id: number;
  name: string;
  category: string;
  organization: string;
  currentlyWinning: {
    amount: string;
    position: number;
  };
  startedOn: string;
  endsOn: string;
  benefactors: number;
  points: {
    count: number;
    label: string;
  };
  type: "Infinite Impact" | "Cause";
  image: string;
};
