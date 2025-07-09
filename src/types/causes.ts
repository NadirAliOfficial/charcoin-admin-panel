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
  updates: number;
  impact: {
    amount: string;
    payouts: number;
    status?: string;
  };
  type: "Infinite Impact" | "Cause" | "Draft" | "One time Only";
  image: string;
  status: string;
};
