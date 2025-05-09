"use client";
import { DateSelector } from "@/components/reuseable/date-selector";
import StatisticsChart from "@/components/reuseable/static-chart";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const fakeData = [
  { month: "Jan", value: 15000 },
  { month: "Feb", value: 22000 },
  { month: "Mar", value: 30000 },
  { month: "Apr", value: 38000 },
  { month: "May", value: 45000 },
  { month: "Jun", value: 42000 },
  { month: "Jul", value: 50000 },
  { month: "Aug", value: 62000 },
  { month: "Sep", value: 68000 },
  { month: "Oct", value: 75000 },
  { month: "Nov", value: 80000 },
  { month: "Dec", value: 95000 },
];

const stakingData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 18000 },
  { month: "Mar", value: 22000 },
  { month: "Apr", value: 25000 },
  { month: "May", value: 24000 },
  { month: "Jun", value: 26000 },
  { month: "Jul", value: 28000 },
  { month: "Aug", value: 30000 },
  { month: "Sep", value: 34000 },
  { month: "Oct", value: 36000 },
  { month: "Nov", value: 40000 },
  { month: "Dec", value: 45000 },
];

const rewardsData = [
  { month: "Jan", value: 10000 },
  { month: "Feb", value: 14000 },
  { month: "Mar", value: 17000 },
  { month: "Apr", value: 19000 },
  { month: "May", value: 18000 },
  { month: "Jun", value: 20000 },
  { month: "Jul", value: 22000 },
  { month: "Aug", value: 26000 },
  { month: "Sep", value: 28000 },
  { month: "Oct", value: 31000 },
  { month: "Nov", value: 35000 },
  { month: "Dec", value: 38000 },
];

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className=" py-6 space-y-6">
      <div className=" flex justify-between max-sm:flex-col max-sm:items-end gap-4 ">
        <h1 className="text-3xl font-bold  max-sm:w-full">Dashboard</h1>
        <DateSelector date={date} setDate={setDate} />
      </div>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
        <StatisticsChart
          title="Donations Statistics"
          data={fakeData}
          tabs={["Monthly", "Yearly"]}
        />
        <div className="grid grid-rows-2  gap-8">
          <div className="!h-full">
            <div className="grid !h-full  grid-cols-[repeat(auto-fit,_minmax(320px,+1fr))] gap-8">
              <div className="bg-background  text-center gap-4  p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr,_2px,_1fr] max-md:grid-cols-1 ">
                <span className="space-y-2">
                  {" "}
                  <div className="text-3xl">0.0006587</div>
                  <p className="text-custom-light_text text-xs">
                    CHAR Coin Market Value
                  </p>
                </span>
                <hr className="min-w-[2px] h-full bg-custom-slate" />
                <span className="space-y-2">
                  {" "}
                  <div className="text-3xl flex justify-center items-center">
                    {" "}
                    <ArrowRight
                      className="-rotate-45 text-primary"
                      size={32}
                    />{" "}
                    12%
                  </div>
                  <p className="text-custom-light_text text-xs">
                    Up in the last 24 hours
                  </p>
                </span>
                <hr className="min-w-[2px] h-full bg-custom-slate" />

                <span className="space-y-2">
                  {" "}
                  <div className="text-3xl flex text-primary justify-center whitespace-nowrap items-center">
                    $ 260,000.00
                  </div>
                  <p className="text-custom-light_text text-xs">
                    CHAR Coin Global Donation
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="h-full">
            <div className="grid h-full grid-cols-[repeat(auto-fit,_minmax(320px,+1fr))] gap-8">
              <div className="bg-background text-center gap-4  p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr,_2px,_1fr] max-md:!grid-cols-1  ">
                <span className="space-y-2">
                  {" "}
                  <div className="text-3xl">0.0006587</div>
                  <p className="text-custom-light_text text-xs">
                    CHAR Coin Market Value
                  </p>
                </span>
                <hr className="min-w-[2px] h-full bg-custom-slate" />
                <span className="space-y-2">
                  {" "}
                  <div className="text-3xl flex justify-center items-center">
                    {" "}
                    <ArrowRight
                      className="-rotate-45 text-primary"
                      size={32}
                    />{" "}
                    12%
                  </div>
                  <p className="text-custom-light_text text-xs">
                    Up in the last 24 hours
                  </p>
                </span>
                <hr className="min-w-[2px] h-full bg-custom-slate" />

                <span className="space-y-2">
                  {" "}
                  <div className="text-3xl flex text-primary whitespace-nowrap justify-center items-center">
                    $ 260,000.00
                  </div>
                  <p className="text-custom-light_text text-xs">
                    CHAR Coin Global Donation
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="min-h-[2px]  w-[calc(100%-24px)] ml-[12px] bg-slate/60  " />
      <div className="bg-background px-5  rounded-xl  grid grid-cols-[1fr,_2px,_1fr] max-xl:grid-cols-1   gap-4 ">
        <StatisticsChart
          title="Staking Statistics"
          data={stakingData}
          tabs={["Monthly", "Yearly"]}
          containerClassName="h-[200px] w-full"
        />
        <hr className="min-w-[2px] h-full bg-custom-slate" />
        <div className="grid h-max my-auto grid-cols-[repeat(auto-fit,_minmax(320px,+1fr))] max-md:grid-cols-1  gap-8">
          <div className="text-center gap-4  p-4 py-8 max-md:w-max max-md:mx-auto    rounded-xl grid grid-cols-[1fr_,2px,_1fr,_2px,_1fr] max-md:grid-cols-1 ">
            <span className="space-y-2">
              {" "}
              <div className="text-3xl">0.0006587</div>
              <p className="text-custom-light_text text-xs">
                CHAR Coin Market Value
              </p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />
            <span className="space-y-2">
              {" "}
              <div className="text-3xl flex justify-center items-center">
                {" "}
                <ArrowRight className="-rotate-45 text-primary" size={32} /> 12%
              </div>
              <p className="text-custom-light_text text-xs">
                Up in the last 24 hours
              </p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />

            <span className="space-y-2">
              {" "}
              <div className="text-3xl flex whitespace-nowrap text-primary justify-center items-center">
                $ 260,000.00
              </div>
              <p className="text-custom-light_text text-xs">
                CHAR Coin Global Donation
              </p>
            </span>
          </div>
        </div>
      </div>

      <hr className="min-h-[2px]  w-[calc(100%-24px)] ml-[12px] bg-slate/60  " />

      <div className="bg-background px-5  rounded-xl  grid grid-cols-[1fr,_2px,_1fr] max-xl:grid-cols-1  gap-4 ">
        <StatisticsChart
          title="Rewards Statistics"
          data={rewardsData}
          tabs={["Monthly", "Yearly"]}
          containerClassName="h-[200px] w-full"
        />
        <hr className="min-w-[2px] h-full bg-custom-slate" />
        <div className="grid h-max my-auto grid-cols-[repeat(auto-fit,_minmax(320px,+1fr))] max-md:grid-cols-1  gap-8">
          <div className="text-center gap-4  p-4 py-8 max-md:w-max max-md:mx-auto    rounded-xl grid grid-cols-[1fr_,2px,_1fr,_2px,_1fr] max-md:grid-cols-1 ">
            <span className="space-y-2">
              {" "}
              <div className="text-3xl">0.0006587</div>
              <p className="text-custom-light_text text-xs">
                CHAR Coin Market Value
              </p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />
            <span className="space-y-2">
              {" "}
              <div className="text-3xl flex justify-center items-center">
                {" "}
                <ArrowRight className="-rotate-45 text-primary" size={32} /> 12%
              </div>
              <p className="text-custom-light_text text-xs">
                Up in the last 24 hours
              </p>
            </span>
            <hr className="min-w-[2px] h-full bg-custom-slate" />

            <span className="space-y-2">
              {" "}
              <div className="text-3xl flex whitespace-nowrap text-primary justify-center items-center">
                $ 260,000.00
              </div>
              <p className="text-custom-light_text text-xs">
                CHAR Coin Global Donation
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
