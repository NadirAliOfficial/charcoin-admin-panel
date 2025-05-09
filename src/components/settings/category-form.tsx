import * as yup from "yup";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema, CategorySchemaType } from "@/schemas/category-schema";
import FormField from "../causes/edit/form-field";
import { HeaderWrapper } from "../custom/header-wrapper";
import FormSectionTitle from "../causes/edit/form-section-title";
import IconUploadSection from "../reuseable/icon-upload-field";
import { ArrowRight } from "@mynaui/icons-react";
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'
import { useState } from "react";
import ColorPickerPopover from "../reuseable/color-picker-selector";
import { rgbaToHex } from "@/lib/helper";

const CategoryForm = ({
    mode,
    initialData,
    onSubmit,
}: {
    mode: "add" | "edit";
    initialData?: CategorySchemaType; // Optional, for edit mode
    onSubmit: (data: CategorySchemaType) => void;
}) => {
    const form = useForm<CategorySchemaType>({
        resolver: yupResolver(categorySchema),
        defaultValues: initialData || { name: "", accentColor: "", icon: [] }, // Set default values for "edit"
        mode: "all"
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        register,
        reset,
    } = form

    const { setSolid, setGradient } = useColorPicker(watch("accentColor"), (value) => setValue("accentColor", value));


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
                    <FormField
                        id="accent-color"
                        label="Accent color"
                        description="Enter a HEX Code to highlight this category"
                        error={errors?.accentColor?.message as string | undefined}
                    >
                        <div className="flex items-center ">
                            <Input
                                variant="newly_secondary"
                                inputSize="lg"
                                id="accent-color"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...register("accentColor")}
                            />
                            <ColorPickerPopover className="w-10 h-4 absolute !right-8" color={watch("accentColor")} setColor={(clr) => setValue("accentColor", rgbaToHex(clr as string))} />
                        </div>

                    </FormField>

                    <IconUploadSection fieldName="icon" label="Icon" description="Choose an SVG image file, below you will see a preview thumbnail of the icon" accentColor="red" />

                    <hr className="!border-accent mb-5" />

                    <Button type="submit" className="w-max  font-semibold"
                        iconProps={{
                            className: "!h-5 !w-5",
                        }}
                        endIcon={ArrowRight}
                    >
                        {mode === "add" ? "Add Category" : "Update Category"}
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};

export default CategoryForm;
