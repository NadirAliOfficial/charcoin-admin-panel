"use client";
import FormField from "@/components/causes/edit/form-field";
import { HeaderWrapper } from "@/components/custom/header-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputWithText from "@/components/ui/input-with-text";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowRight, Menu, Minus } from "@mynaui/icons-react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "@/stores/use-toast";
import { Program, } from '@coral-xyz/anchor';

import idl from '@/components/idl.json';
import { getConfig,configAccount,stakingPool, PROGRAM_ID } from '@/components/const';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
    import { Transaction,
  } from "@solana/web3.js";
const settingsSchema = yup.object().shape({
  tokens: yup.number().min(1, "Must be at least 1 token").required("Required"),
  days: yup.number().min(1, "Must be at least 1 day").required("Required"),
  percentofToken: yup
    .number()
    .min(0)
    .max(100, "Must be between 0-100")
    .required("Required"),
  percentage: yup
    .number()
    .min(0)
    .max(100, "Must be between 0-100")
    .required("Required"),
});

type VotingConfig = {
  id: string;
  days: number;
  votesPerToken: number;
  maxReturn: number;
  penalty: number;
};

const SettingsGovernance = () => {
  const form = useForm();
    const {sendTransaction,wallet,publicKey} = useWallet();
  const { connection } = useConnection();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = form;
  const [votingConfigs, setVotingConfigs] = useState<VotingConfig[]>([
    { id: "1", days: 0, votesPerToken: 0, maxReturn: 0,penalty:0  },
    { id: "2", days: 0, votesPerToken: 0, maxReturn: 0,penalty:0  },
    { id: "3", days: 0, votesPerToken: 0, maxReturn: 0,penalty:0  },
    { id: "4", days: 0, votesPerToken: 0, maxReturn: 0,penalty:0  },
  ]);



  const [mintStakingDurationForVoting,setMintStakingDurationForVoting] = useState(0)
  const [minStakeForGovernance,setMinStakeForGovernance] = useState(0)


useEffect(()=>{
  async function fetchConfig() {
   const { provider } = getConfig(wallet?.adapter);
    const program = new Program(idl, provider);
    let data = await program.account.configAccount.fetch(configAccount)
    console.log("Config Data:", data);
    setMintStakingDurationForVoting(Number(data.config.minStakeDurationVoting)/86400);
    setMinStakeForGovernance(Number(data.config.minGovernanceStake)/1e9);
  }
  fetchConfig()
},[])
useEffect(()=>{
  async function fetchConfig() {
   const { provider } = getConfig(wallet?.adapter);
    const program = new Program(idl, provider);
    let data = await program.account.stakingPool.fetch(stakingPool)
    console.log("staking Data:", data.stakeLockupRewardArray);

setVotingConfigs([
    { id: "1", days: data.stakeLockupRewardArray[0].lockupDays, votesPerToken: Number(data.stakeLockupRewardArray[0].votePower)/1000, maxReturn:Number(data.stakeLockupRewardArray[0].rewardBps )/10,penalty:Number(data.stakeLockupRewardArray[0].penalty )/10 },
    { id: "2", days: data.stakeLockupRewardArray[1].lockupDays, votesPerToken: Number(data.stakeLockupRewardArray[1].votePower)/1000, maxReturn: Number(data.stakeLockupRewardArray[1].rewardBps)/10,penalty: Number(data.stakeLockupRewardArray[1].penalty)/10 },
    { id: "3", days: data.stakeLockupRewardArray[2].lockupDays, votesPerToken: Number(data.stakeLockupRewardArray[2].votePower)/1000, maxReturn: Number(data.stakeLockupRewardArray[2].rewardBps)/10,penalty: Number(data.stakeLockupRewardArray[2].penalty)/10  },
    { id: "4", days: data.stakeLockupRewardArray[3].lockupDays, votesPerToken: Number(data.stakeLockupRewardArray[3].votePower)/1000, maxReturn: Number(data.stakeLockupRewardArray[3].rewardBps)/10,penalty: Number(data.stakeLockupRewardArray[3].penalty)/10  },
])
  }
  fetchConfig()
},[])


  const handleVotingConfigChange = (updatedConfig: VotingConfig) => {
    setVotingConfigs((prevConfigs) => {
      return prevConfigs.map((config) => {
        if (config.id === updatedConfig.id) {
          return { ...config, ...updatedConfig };
        }
        return config;
      });
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setVotingConfigs((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   toast({
  //     title: "The action has been completed successfully",
  //     description: "This notification will close automatically in 5 seconds",
  //     variant: "success",
  //   });
  // };




 const updateSettings= async() => 
    {
    try{
      if(minStakeForGovernance == 0 || mintStakingDurationForVoting == 0){
        toast({
          title: "Error",
          description: "Please fill all the fields before updating settings.",
          variant: "destructive",
        });
        return;

      }
    const { provider } = getConfig(wallet?.adapter);
    const program = new Program(idl, provider);
      let transaction = new Transaction();

    const updateSettingsIx = await program.methods
      .updateSettings(
        new anchor.BN(minStakeForGovernance*1e9),// min_governance_stake = 10 token
        new anchor.BN(mintStakingDurationForVoting*86400), // min_stake_duration_voting = 400 sec
      )
      .accounts({
        config: configAccount,
        admin:publicKey
      })
      .instruction();
        transaction.add(updateSettingsIx);
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (await program.provider.connection.getLatestBlockhash()).blockhash;
        const txSignature = transaction && (await sendTransaction(transaction, connection));
        console.log("Transaction Signature:", txSignature);
        toast({
          title: "Settings Updated",
          description: "The settings have been updated successfully.",
          variant: "success",
        });
    }catch(err){
      console.error("Error updating settings:", err);
      toast({
          title: "Error",
          description: "Error updating settings",
          variant: "destructive",
        });
    }

  };

  const setRewardPercentages = async () => {
    try{
       const { provider } = getConfig(wallet?.adapter);
    const program = new Program(idl, provider);
      let transaction = new Transaction();

    const updateSettingsIx = 
     await program.methods
      .setRewardPercentageHandler(
        // reward       , lockup          ,   vote power      
        new anchor.BN(Number(votingConfigs[0].maxReturn)*10),new anchor.BN(votingConfigs[0].days),new anchor.BN(Number(votingConfigs[0].votesPerToken)*1000),new anchor.BN(Number(votingConfigs[0].penalty)*10), //  5 , 1, 0.5 ,100
        new anchor.BN(Number(votingConfigs[1].maxReturn)*10),new anchor.BN(votingConfigs[1].days),new anchor.BN(Number(votingConfigs[1].votesPerToken)*1000),new anchor.BN(Number(votingConfigs[1].penalty)*10), // 7, 90, 1,100
        new anchor.BN(Number(votingConfigs[2].maxReturn)*10),new anchor.BN(votingConfigs[2].days),new anchor.BN(Number(votingConfigs[2].votesPerToken)*1000),new anchor.BN(Number(votingConfigs[2].penalty)*10),  // 15, 180, 3,100
        new anchor.BN(Number(votingConfigs[3].maxReturn)*10),new anchor.BN(votingConfigs[3].days),new anchor.BN(Number(votingConfigs[3].votesPerToken)*1000),new anchor.BN(Number(votingConfigs[3].penalty)*10), // 15, 180, 3,100

      )
      .accounts({
        stakingPool: stakingPool,
        configAccount: configAccount,
        admin:publicKey
      })
      .instruction();
        transaction.add(updateSettingsIx);
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (await program.provider.connection.getLatestBlockhash()).blockhash;
        const txSignature = transaction && (await sendTransaction(transaction, connection));
        console.log("Transaction Signature:", txSignature);
        toast({
          title: "Settings Updated",
          description: "The settings have been updated successfully.",
          variant: "success",
        });
    }catch(err){
      console.error("Error setting reward percentages:", err);
      toast({
          title: "Error",
          description: "Error updating settings",
          variant: "destructive",
        });
    }
  };


const save10Causes = async () => {
console.log("Add backend api for Saving 10 causes distribution settings...");
}
  return (
  

        <div>
            <HeaderWrapper
          title={"Dapp Global Settings - Governance"}
          description={
            "Manage settings related to the governance of the CharCoin ecosystem"
          }
        
        />
          <Card className="bg-background">
            <CardHeader className="space-y-0">
              <CardTitle className="text-xl">Main Setup</CardTitle>
              <p className="text-sm mt-0 text-muted-foreground">
                Voting and Staking Configuration
              </p>
            </CardHeader>
            <CardContent>
              <hr className="h-[2px] rounded-xl bg-muted-foreground mb-5" />

              <p className="font-bold text-lg">
                Causes / Projects compensation distribution factor
              </p>
              <p className="text-muted-foreground mb-4 text-xs">
              The distribution factor will dynamically allocate donations based on the number of active causes within a campaign. As the number of causes increases, the percentage distribution adjusts accordingly. For example, if a campaign has two active causes, donations will be split 60% for the first place and 40% for the second place. If there are three causes, the distribution shifts to 50% for the first, 30% for the second, and 20% for the third. This factor ensures a fair and proportional allocation of funds as more causes participate in the campaign. 
                <b className="text-white">
                  {" "}
                  Currently the ecosystem supports a maximum of 10 causes/projects running on each campaign.
                </b>
              </p>

              <div className="grid grid-cols-2 max-md:grid-cols-1 w-full justify-between gap-4 mt-4 mb-12">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <InputWithText
                    key={num}
                    label={`${num} participants`}
                    className="w-full "
                    placeholder="Enter distribution values"
                  />
                ))}
              </div>

            <Button className="mb-5" onClick={()=>save10Causes()}>
              Save Settings
              <ArrowRight className="w-5 h-5" />
            </Button>

              <HeaderWrapper
                title="Token Economy and Staking"
                description={
                  "Manage the main logic setup for the governance system"
                }
              />
              <hr className="h-[2px] rounded-xl bg-muted-foreground mb-5" />
              <HeaderWrapper
                title="Voting power per staked token"
                description="Define how many votes each staked CHAR token grants (e.g., 1 CHAR = 1 vote, or scale based on staking duration)"
                size={"sm"}
              />

              {/* DnD Kit Implementation */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={votingConfigs.map((config) => config.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {votingConfigs.map((config) => (
                    <SortableVotingCalculator
                      key={config.id}
                      config={config}
                      onConfigChange={handleVotingConfigChange}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            <Button className="my-10" onClick={()=> setRewardPercentages()}>
              Save Settings
              <ArrowRight className="w-5 h-5" />
            </Button>
              <div className="grid grid-cols-2 items-end max-md:grid-cols-1 h-full  gap-4 ">
                <FormField
                  id="tokens"
                  label="Minimum Staking Requirement for Governance Participation"
                  description="Specify the minimum amount of CharCoin Tokens that must be staked to participate in governance voting"
                  error={errors.tokens?.message as string | undefined}
                >
                  <InputWithText
                    id="tokens"
                    label="Tokens"
                    rootClassName="flex-row-reverse"
                    className="bg-gray-800  border-gray-700 w-full text-white"
                    type="number"
                    value={minStakeForGovernance}
                    onChange={(e)=>setMinStakeForGovernance(e.target.valueAsNumber)}
                  />
                </FormField>
                <FormField
                  id="days"
                  label="Staking Duration for Voting Eligibility"
                  description="Determine the minimum staking period required for a user to be eligible to vote"
                  error={errors.days?.message as string | undefined}
                  
                >
                  <InputWithText
                    id="days"
                    label="Days"
                    rootClassName="flex-row-reverse"
                    className="bg-gray-800   border-gray-700 !w-full text-white"
                    type="number"
                    value={mintStakingDurationForVoting}
                    onChange={(e)=>setMintStakingDurationForVoting(e.target.valueAsNumber)}
                  />
                </FormField>
              </div>

              {/* <div className="grid grid-cols-2 items-end max-md:grid-cols-1 h-full  gap-4 ">
                <FormField
                  id="percentageOfToken"
                  label="Penalty for Early Staking Withdrawal"
                  description="Set the burn percentage applied to users withdrawing staked tokens before the locked period ends."
                  error={errors.percentageOfToken?.message as string}
                >
                  <InputWithText
                    id="percentageOfToken"
                    label="Percentage Of Token"
                    rootClassName="flex-row-reverse"
                    className="bg-gray-800 border-gray-700 text-white"
                    type="number"
                    value={penaltyPercentage}
                    onChange={(e)=>setPenaltyPercentage(e.target.valueAsNumber)}
                  />
                </FormField>
              
                    
              </div> */}
              <Button className="mb-5" onClick={()=>updateSettings()}>
              Save Settings
              <ArrowRight className="w-5 h-5" />
            </Button>
            </CardContent>
          </Card>
        </div>
  
  );
};

// Sortable Voting Calculator Component
type SortableVotingCalculatorProps = {
  config: VotingConfig;
  onConfigChange: (updatedConfig: VotingConfig) => void;
};

function SortableVotingCalculator({
  config,
  onConfigChange,
}: SortableVotingCalculatorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: config.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-grab active:cursor-grabbing"
    >
      <VotingCalculator config={config} onConfigChange={onConfigChange} />
    </div>
  );
}

// Voting Calculator Component
type VotingCalculatorProps = {
  config: VotingConfig;
  onConfigChange: (updatedConfig: VotingConfig) => void;
};

function VotingCalculator({
  config,
  onConfigChange,
}: VotingCalculatorProps) {
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDays = Number(e.target.value);
    onConfigChange({ ...config, days: newDays });
  };

  const handleVotesPerTokenChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVotesPerToken = Number(e.target.value);
    onConfigChange({ ...config, votesPerToken: newVotesPerToken });
  };
  const handlePenaltyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPenalty = Number(e.target.value);
    onConfigChange({ ...config, penalty: newPenalty });
  };

  const handleMaxReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxReturn = Number(e.target.value);
    onConfigChange({ ...config, maxReturn: newMaxReturn });
  };

  const handleMaxReturnIncrement = (increment: number) => {
    const currentValue = config.maxReturn || 0;
    const newMaxReturn = Math.max(0, currentValue + increment);
    onConfigChange({ ...config, maxReturn: newMaxReturn });
  };

  return (
    <div className="flex items-center w-full justify-between gap-1 sm:gap-2 rounded-lg flex-nowrap ">
      <Menu className="!w-3 !h-3 sm:!w-4 sm:!h-4 shrink-0" />

      <span className="whitespace-nowrap text-white text-xs flex-shrink-0">Days</span>
      <Input
        type="number"
        value={config.days}
        onChange={handleDaysChange}
        placeholder="Days"
        className="w-[50px] min-w-12 sm:w-16 md:w-full"
        inputSize="sm"
      />

      <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 hidden sm:inline">Votes per token</span>
      <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 sm:hidden">Votes</span>
      <Input
        type="number"
        step="0.1"
        value={config.votesPerToken}
        onChange={handleVotesPerTokenChange}
        placeholder="Votes"
        className="w-12 sm:w-16 md:w-full min-w-12"
        inputSize="sm"
      />

      <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 hidden sm:inline">Early Unstake Penalty</span>
      <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 sm:hidden">Penalty</span>
      <Input
        type="number"
        value={config.penalty}
        onChange={handlePenaltyChange}
        placeholder="Penalty"
        className="w-12 sm:w-16 md:w-full min-w-12"
        inputSize="sm"
      />
      
      <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 hidden sm:inline">Max monthly return</span>
      <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 sm:hidden">Max</span>

      <div className="flex items-center gap-1">
        <div className="bg-[#3d3c44]  flex rounded-md items-center px-2 pl-0 focus-within:ring-2 ring-primary ring-offset-2 ring-offset-secondary ">
          <Input
            placeholder="Max"
            type="number"
            value={config.maxReturn}
            onChange={handleMaxReturnChange}
            className="w-12 min-w-12 sm:w-14 !ring-0 !ring-offset-0 md:w-[10vw] border-0"
            inputSize="sm"
          />

          <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 hidden sm:inline">percentage</span>
          <span className="whitespace-nowrap text-white text-[10px] md:text-xs flex-shrink-0 sm:hidden">%</span>
        </div>


        <div className="flex gap-1 flex-shrink-0">
          <Button
            type="button"
            size={"icon"}
            variant={"outline"}
            className="size-5 sm:size-6 rounded-full p-0"
            onClick={() => handleMaxReturnIncrement(1)}
          >
            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            type="button"
            size={"icon"}
            variant={"outline"}
            className="size-5 sm:size-6 rounded-full p-0"
            onClick={() => handleMaxReturnIncrement(-1)}
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingsGovernance;