import { campaignSchema, CampaignSchemaType } from "@/schemas/campaign-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight } from "@mynaui/icons-react";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "../causes/edit/form-field";
import FormSectionTitle from "../causes/edit/form-section-title";
import { SelectField } from "../causes/edit/form-select";
import { HeaderWrapper } from "../custom/header-wrapper";
import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/date-time-picker";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

const generateYearRange = (startYear: number, endYear: number) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(Number(year));
    }
    return years;
};



const CampaignForm
    = ({
        mode,
        initialData,
        onSubmit,
    }: {
        mode: "add" | "edit";
        initialData?: CampaignSchemaType; // Optional, for edit mode
        onSubmit: (data: CampaignSchemaType) => void;
    }) => {
        const form = useForm<CampaignSchemaType>({
            resolver: yupResolver(campaignSchema),
            defaultValues: initialData || { name: "" }, // Set default values for "edit"
            mode: "all"
        });

        const {
            handleSubmit,
            formState: { errors },
            watch,
            setValue,
            register,
        } = form
        const currentYear = new Date().getFullYear();
        const yearRange = generateYearRange(1900, currentYear);



        //   // Reset form with initial data when edit mode is active
        //   React.useEffect(() => {
        //     if (mode === "edit" && initialData) {
        //       reset(initialData); // Populate form with initial data for editing
        //     }
        //   }, [mode, initialData, reset]);

        return (
            <div>
                <div className="mx-8 mt-2">
                    <HeaderWrapper
                        title={mode === "add" ? "Create a new category" : "Update a category"}
                        description={
                            mode === "add"
                                ? "Complete the following fields to create and publish a new category"
                                : "Complete the following fields to update and publish a category"
                        }
                        size={"xs"}
                    />
                </div>
                {mode == "edit" && (
                    <div className="flex flex-col gap-4 mb-5">
                        <FormSectionTitle title="Statistics" className="mb-2" />
                        <div className="bg-accent/50 text-center gap-4  p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr,_2px,_1fr] max-md:!grid-cols-1  ">
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
                )}


                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <FormSectionTitle title="Main details" />

                        <FormField
                            id="category-name"
                            label="Category name"
                            description="Describe the category name, this will be visible for causes / projects and news"
                            error={errors.name?.message as string | undefined}
                        >
                            <Input
                                variant="newly_secondary"
                                inputSize="lg"
                                id="category-name"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...register("name")}
                            />
                        </FormField>

                        <div className="flex gap-4">
                            <Switch
                                checked={watch("annualSpecialCampaign") as boolean}
                                onCheckedChange={(value) => setValue("annualSpecialCampaign", value)}
                                className={
                                    errors.annualSpecialCampaign?.message && "ring-2 ring-offset-2 ring-offset-background ring-destructive"
                                }
                            />
                            <div className="text-sm tracking-wide">
                                <span>Annual special campaign</span>
                                <p className="text-muted-foreground text-xs">
                                    Enable this option if this is the final campaign of the year. Activating it will allow all users who interacted with the ecosystem throughout the entire current year—whether through transactions, staking, voting, or other activities—to participate in the special annual rewards. Additionally, an extra donation will be evenly distributed among all causes and projects that took part during the year (status of the cause/project must be “Completed” and should be type “Infinite Impact”).
                                </p>
                            </div>
                        </div>


                        <hr className="!border-accent mb-5" />
                        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 ">
                          {(watch("annualSpecialCampaign")) &&   <FormField
                                id="year"
                                label="Year"
                                description="Select the current year"
                                error={errors?.year?.message as string | undefined}
                            >
                                <SelectField
                                    variant="newly_secondary"
                                    selectSize="lg"
                                    placeholder="Select year"
                                    value={watch("year")}
                                    onValueChange={(value) => {
                                        console.log("This is the values", value, typeof value)
                                        setValue("year", value)
                                    }}
                                    options={yearRange?.reverse()?.map(year => ({ value: `${year}`, label: `${year}` }))} // Format the options
                                />

                            </FormField>}

                            {
                                !(watch("annualSpecialCampaign")) && <FormField
                                id="start_date"
                                label="Start date"
                                description="Enter the last day of the campaign"
                                error={errors?.endDate?.message as string | undefined}
                            >
                                <DateTimePicker position="right" date={watch("startDate") as Date} setDate={(date) => setValue("startDate", date as Date)} size="lg" className="w-full px-4" iconClassName="!w-5 !h-5"  />

                            </FormField>
                            }

                            <FormField
                                id="end_date"
                                label="End date"
                                description="Enter the last day of the campaign"
                                error={errors?.endDate?.message as string | undefined}
                            >
                                <DateTimePicker position="right" date={watch("endDate") as Date} setDate={(date) => setValue("endDate", date as Date)} size="lg" className="w-full px-4" iconClassName="!w-5 !h-5"  />

                            </FormField>
                        </div>

                        <hr className="!border-accent mb-5" />


                        <Button type="submit" className="w-max  font-semibold"
                            iconProps={{
                                className: "!h-5 !w-5",
                            }}
                            endIcon={ArrowRight}
                        >
                            {mode === "add" ? "Add Campaign" : "Update Campaign"}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        );
    };

export default CampaignForm
    ;
