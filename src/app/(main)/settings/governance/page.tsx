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
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

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
};

const SettingsGovernance = () => {
  const form = useForm();
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = form;
  const [votingConfigs, setVotingConfigs] = useState<VotingConfig[]>([
    { id: "1", days: 30, votesPerToken: 0.5, maxReturn: 5 },
    { id: "2", days: 60, votesPerToken: 1, maxReturn: 7 },
    { id: "3", days: 120, votesPerToken: 3, maxReturn: 10 },
    { id: "4", days: 180, votesPerToken: 5, maxReturn: 15 },
  ]);

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

  const onSubmit = (data: any) => {};

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderWrapper
          title={"Dapp Global Settings - Governance"}
          description={
            "Manage settings related to the governance of the CharCoin ecosystem"
          }
          actions={
            <Button>
              Save Settings
              <ArrowRight className="w-5 h-5" />
            </Button>
          }
        />

        <div>
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
              <p className="text-muted-foreground mb-4 text-sm">
                The distribution factor dynamically allocates donations based on
                the number of active causes within a campaign.
                <b>
                  {" "}
                  Currently, the ecosystem supports a maximum of 10
                  causes/projects running on each campaign.
                </b>
              </p>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 mb-12">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <InputWithText
                    key={num}
                    label={`${num} participants`}
                    placeholder="Enter distribution values"
                  />
                ))}
              </div>

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
                    <SortableVotingCalculator key={config.id} config={config} />
                  ))}
                </SortableContext>
              </DndContext>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-12">
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
                    className="bg-gray-800 border-gray-700 text-white"
                    {...register("tokens")}
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
                    className="bg-gray-800 border-gray-700 text-white"
                    {...register("days")}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    {...register("percentageOfToken")}
                  />
                </FormField>
                <FormField
                  id="percentage"
                  label="Annual Staking Yield (%)"
                  description="Configure the yearly staking reward percentage (APY) distributed to stakers."
                  error={errors.percentage?.message as string}
                >
                  <InputWithText
                    id="percentage"
                    label="Percentage"
                    className="bg-gray-800 border-gray-700 text-white"
                    rootClassName="flex-row-reverse"
                    {...register("percentage")}
                  />
                </FormField>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

// Sortable Voting Calculator Component
type SortableVotingCalculatorProps = {
  config: VotingConfig;
};

function SortableVotingCalculator({ config }: SortableVotingCalculatorProps) {
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
      <VotingCalculator config={config} />
    </div>
  );
}

// Voting Calculator Component
type VotingCalculatorProps = {
  config: VotingConfig;
};

function VotingCalculator({ config }: VotingCalculatorProps) {
  const [days, setDays] = useState(config.days);
  const [votesPerToken, setVotesPerToken] = useState(config.votesPerToken);
  const [maxReturn, setMaxReturn] = useState(config.maxReturn);
  const [multiplier, setMultiplier] = useState(1553);
  const [factor, setFactor] = useState(26);

  return (
    <div className="flex items-center gap-4 max-sm:flex-col rounded-lg">
      <Menu className="!w-5 !h-5 shrink-0" />
      <Input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        placeholder="Days"
      />
      <Input
        type="number"
        value={votesPerToken}
        onChange={(e) => setVotesPerToken(Number(e.target.value))}
        placeholder="Votes per Token"
      />
      <div className="px-4 py-2 whitespace-nowrap rounded-md text-white">
        {multiplier} × {factor}
      </div>
      <InputWithText
        label="Max Return"
        placeholder="Max Return"
        type="number"
        className="md:w-28 lg:w-40"
        rootClassName="flex-row-reverse"
        value={maxReturn}
        onChange={(e) => setMaxReturn(Number(e.target.value))}
      />
      <span className="tw-text-gray-400">Percentage</span>
      <div className="flex gap-2">
        <Button
          size={"icon"}
          variant={"outline"}
          className="size-7 rounded-full p-0"
          onClick={() => setFactor(factor + 1)}
        >
          <PlusIcon className="w-5 h-5" />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          className="size-7 rounded-full p-0"
          onClick={() => setFactor(factor - 1)}
        >
          <Minus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default SettingsGovernance;
