import { CategorySchemaType } from "@/schemas/category-schema";
import CategoryForm from "./category-form";

const EditCategory = () => {
    const handleSubmit = (data: CategorySchemaType) => {
        console.log(data);
        // Handle form submission logic here
    };

    const initialData = {
        name: "Education & Literacy Programs",
        accentColor: "#3DD83A",
    }
    

    
    return (
        <CategoryForm
            mode="edit"
            onSubmit={handleSubmit}
            initialData={initialData}
        />
    );
};

export { EditCategory };