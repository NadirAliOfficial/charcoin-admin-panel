import { CategorySchemaType } from "@/schemas/category-schema";
import CategoryForm from "./category-form";

const AddCategory = () => {
    const handleSubmit = (data: CategorySchemaType) => {
        console.log(data);
        // Handle form submission logic here
    };

    return (
        <CategoryForm
            mode="add"
            onSubmit={handleSubmit}
        />
    );
};

export { AddCategory};