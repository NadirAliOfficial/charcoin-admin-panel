import { dummyData } from "@/lib/dummy-data";
import { CauseFormData, causeFormSchema } from "@/schemas/causes-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, useForm, FormProvider } from "react-hook-form";
import MainDetailsSection from "./edit/main-detail";
import ContactDetailsSection from "./edit/contract-detail";
import FormActions from "./edit/edit-action";
import { toast } from "sonner";

export const AddCauseForm = () => {
  const form = useForm<CauseFormData>({
    resolver: yupResolver(causeFormSchema),
  });

const onSubmit = (data: CauseFormData) => {
  const formData = new FormData();

 
};
  
  return (
    <div className="p-4 py-2">

      <div className="ml-10 mb-10">
        <h1 className="text-xl font-medium">Create a new cause / project</h1>
        <p className="text-gray-400 text-sm">
          Fill in the details step by step and see the preview in
          real-time before you submit.        </p>
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
