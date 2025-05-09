import { Administrator } from "@/schemas/adminstration-schema";
import { AdministratorForm } from "./administration-form";

// Example dummy data for an administrator

  
  // Example usage in parent components:
  
  // For adding a new admin
  export const AddAdministrator = () => {
    const handleSubmit = (data: Administrator) => {
      console.log("Creating new admin:", data);
      // API call would go here
    };
  
    return (
      <AdministratorForm
        mode="add"
        onSubmit={handleSubmit}
      />
    );
  };
  