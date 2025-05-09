import { dummyData } from "@/lib/dummy-data";
import { CauseFormData, causeFormSchema } from "@/schemas/causes-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, useForm, FormProvider } from "react-hook-form";
import MainDetailsSection from "./edit/main-detail";
import ContactDetailsSection from "./edit/contract-detail";
import FormActions from "./edit/edit-action";

export const EditCause = () => {
  const form = useForm<CauseFormData>({
    resolver: yupResolver(causeFormSchema),
    defaultValues: dummyData,
  });

  const onSubmit = (data: CauseFormData) => {
    console.log(data);
  };
  return (
    <div>
      {/* Header */}
      <div className="ml-10 mb-10">
        <h1 className="text-xl font-medium">Edit running cause details</h1>
        <p className="text-gray-400 text-sm">
          Warning: You are editing a cause or project that is currently running
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MainDetailsSection />
          <ContactDetailsSection />
          <FormActions />
        </form>
      </FormProvider>
    </div>
  );
};
