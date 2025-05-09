import { CampaignSchemaType } from "@/schemas/campaign-schema";
import CampaignForm from "./campaign-form";

const AddCampaign = () => {
    const handleSubmit = (data: CampaignSchemaType) => {
        console.log(data);
        // Handle form submission logic here
    };

    return (
        <CampaignForm
            mode="add"
            onSubmit={handleSubmit}
        />
    );
};

export { AddCampaign };
