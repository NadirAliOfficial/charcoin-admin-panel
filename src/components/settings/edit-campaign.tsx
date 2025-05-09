import { CategorySchemaType } from "@/schemas/category-schema";
import CategoryForm from "./category-form";
import CampaignForm from "./campaign-form";
import { CampaignSchemaType } from "@/schemas/campaign-schema";

const EditCampaign = () => {
    const handleSubmit = (data: CampaignSchemaType) => {
        console.log(data);
        // Handle form submission logic here
    };

    const initialData: CampaignSchemaType = {
        name: "Education & Literacy Programs",
        year: "2025",
        endDate: new Date("2025-05-20T00:00:00.000Z"),
        annualSpecialCampaign: true,
    }
    

    
    return (
        <CampaignForm
            mode="edit"
            onSubmit={handleSubmit}
            initialData={initialData}
        />
    );
};

export { EditCampaign };