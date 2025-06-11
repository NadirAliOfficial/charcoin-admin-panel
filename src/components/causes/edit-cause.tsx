import { dummyData } from "@/lib/dummy-data";
import { CauseFormData, causeFormSchema } from "@/schemas/causes-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import MainDetailsSection from "./edit/main-detail";
import ContactDetailsSection from "./edit/contract-detail";
import FormActions from "./edit/edit-action";
import { Cause } from "@/types/causes";
import { useEffect } from "react";

interface EditCauseProps {
  initialData: Cause | null;
}

export const EditCause = ({ initialData }: EditCauseProps) => {
  const form = useForm<CauseFormData>({
    resolver: yupResolver(causeFormSchema),
    // defaultValues will be overwritten by reset if initialData exists
    defaultValues: { // Provide default values for all fields in CauseFormData
      causeTitle: '',
      organization: '',
      website: '',
      country: '',
      campaign: '',
      category: '',
      type: '',
      wallet: '',
      responsibleContact: '',
      role: '',
      email: '',
      phone: '',
      status: '',
      featuredImages: [], // Assuming it's an array of files/strings
      contractFile: undefined, // Assuming it can be optional or null initially
    }
  });

  const onSubmit = (data: CauseFormData) => {
    console.log(data);
    // Handle form submission (e.g., update API)
  };

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      // Map initialData (Cause) to CauseFormData structure for the form
      form.reset({
        causeTitle: initialData.name || '',
        organization: initialData.organization || '',
        category: initialData.category || '',
        type: initialData.type || '',
        // Provide default or mapped values for other CauseFormData fields
        website: '', // Cause type doesn't have website
        country: '', // Cause type doesn't have country
        campaign: initialData.endsOn || '', // Using endsOn as placeholder for campaign
        wallet: '', // Cause type doesn't have wallet
        responsibleContact: '', // Cause type doesn't have responsibleContact
        role: '', // Cause type doesn't have role
        email: '', // Cause type doesn't have email
        phone: '', // Cause type doesn't have phone
        status: '', // Cause type doesn't have a simple status string
        featuredImages: initialData.image ? [initialData.image as any] : [], // Assuming image can be mapped to featuredImages, needs type adjustment
        contractFile: undefined, // Cause type doesn't have contractFile
      } as CauseFormData); // Type assertion for now, refine mapping as needed
    } else {
      // Reset to default empty values if initialData is null
       form.reset({ // Provide default values for all fields in CauseFormData
        causeTitle: '',
        organization: '',
        website: '',
        country: '',
        campaign: '',
        category: '',
        type: '',
        wallet: '',
        responsibleContact: '',
        role: '',
        email: '',
        phone: '',
        status: '',
        featuredImages: [], 
        contractFile: undefined, 
      });
    }
  }, [initialData, form]);

  return (
    <div>
      {/* Header */}
      <div className="ml-10 mb-10 font-WFVisualSansRegular bg-[#232226]">
        {/* You might want to dynamically change the header based on the cause status */}
        <h1 className="text-xl font-WFVisualSansRegular ">Edit Cause / Project</h1>
        <p className="text-gray-400 text-xs mt-2">
          {/* You might want to dynamically change this message */}
          You are editing a cause or project.
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* These components will automatically get form context */}
          <MainDetailsSection />
          <ContactDetailsSection />
          <FormActions />
        </form>
      </FormProvider>
    </div>
  );
};
