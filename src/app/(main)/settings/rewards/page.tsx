import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Rewards = () => {
  return (
    <HeaderWrapper
      title="Dapp Global Settings - Rewards"
      description="Manage settings related to the rewards logic of the ecosystem"
      actions={<Button size={"lg"}>Save settings →</Button>}
    >
      <div className="bg-background p-5 rounded-xl">
        <HeaderWrapper
          title="Token Economy and Staking"
          description="Manage the main logic setup for the rewards system"
          size={"sm"}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className=" p-4 rounded-lg">
            <h3 className="text-md ">
              Number of Wallets to Reward in the “Top Tier” Program{" "}
            </h3>
            <p className="text-sm text-muted-foreground">
              Define how many top-performing wallets will be rewarded based on
              the highest transaction volume within a given period (monthly or
              yearly). Rewards are distributed based on ranking (e.g., 1st
              place, 2nd place, 3rd place, etc.). The higher the rank, the
              greater the reward.
            </p>
            <div className="relative mt-2">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                Wallet
              </div>
              <Input defaultValue={10} />
            </div>
          </div>

          <div className=" p-4 rounded-lg">
            <h3 className="text-md ">
              Number of Wallets to Reward in the “Charity Lottery” Program{" "}
            </h3>
            <p className="text-sm text-muted-foreground">
              Specify the number of wallets that will be randomly selected for
              the Charity Lottery program. The selected wallets will share the
              total reward pool equally, ensuring a fair and inclusive
              distribution among participants. Only the wallets with
              transactions on the month/year (accordingly to the current
              campaign) are elegible to participate.
            </p>
            <div className="relative mt-2">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                Wallet
              </div>
              <Input defaultValue={10} />
            </div>{" "}
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Rewards;
