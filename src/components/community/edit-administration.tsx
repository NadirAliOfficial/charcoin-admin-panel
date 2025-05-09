import { Administrator } from "@/schemas/adminstration-schema";
import { AdministratorForm } from "./administration-form";

export const dummyAdministratorData: Administrator & {id: string, createdAt: string, updatedAt: string} = {
    id: "admin-123",
    username: "johndoe",
    name: "John Doe",
    email: "john.doe@example.com",
    accessPin: "123456",
    password: "securePassword123!", // Note: In real apps, you wouldn't expose passwords
    phone: "+15551234567",
    authenticatorApp: "Google Authenticator",
    permissions: {
      dashboard: true,
      causes: {
        view: true,
        create: true,   
        update: false,
        delete: false,
      },
      rewards: {
        topTier: { view: true },
        charityLottery: { view: false },
        nfts: { 
          view: true, 
          create: false 
        },
        staking: { view: false },
      },
      community: {
        news: {
          view: true,
          create: false,
          update: false,
          delete: false,
        },
        users: {
          view: true,
          blockUnblock: false,
        },
        administrators: {
          view: false,
          create: false,
          update: false,
          updateOwnAccount: true,
          delete: false,
        },
      },
      dappGlobalSettings: {
        causes: false,
        governance: false,
        rewards: true,
        walletsManagement: false,
      },
    },
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
  };



const EditAdministrator = () => {
  // For editing an existing admin
  const handleSubmit = (data: Administrator) => {
    console.log("Updating admin:", data);
    // API call would go here
  };

  const handleDelete = () => {
    console.log("Deleting admin");
    // API call would go here
  };

  return (
    <AdministratorForm
      mode="edit"
      initialData={dummyAdministratorData}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
};

export { EditAdministrator };
