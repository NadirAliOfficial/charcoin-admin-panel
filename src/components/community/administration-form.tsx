import { Administrator, administrators } from "@/schemas/adminstration-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../ui/input";
import FormSectionTitle from "../causes/edit/form-section-title";
import FormField from "../causes/edit/form-field";
import { HeaderWrapper } from "../custom/header-wrapper";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@mynaui/icons-react";

type PermissionPath = {
  path: string;
  label: string;
  description?: string;
  children?: PermissionPath[];
};

type AdministratorFormProps = {
  mode: "add" | "edit";
  initialData?: Administrator; // Optional for edit mode
  onSubmit: (data: Administrator) => void;
  onDelete?: () => void; // Only for edit mode
};

export const AdministratorForm = ({
  mode,
  initialData,
  onSubmit,
  onDelete,
}: AdministratorFormProps) => {
  const defaultValues: Administrator = {
    username: "",
    name: "",
    email: "",
    accessPin: "",
    password: "",
    phone: "",
    authenticatorApp: "",
    permissions: {
      dashboard: false,
      causes: {
        view: false,
        create: false,
        update: false,
        delete: false,
      },
      rewards: {
        topTier: { view: false },
        charityLottery: { view: false },
        nfts: { view: false, create: false },
        staking: { view: false },
      },
      community: {
        news: {
          view: false,
          create: false,
          update: false,
          delete: false,
        },
        users: {
          view: false,
          blockUnblock: false,
        },
        administrators: {
          view: false,
          create: false,
          update: false,
          updateOwnAccount: false,
          delete: false,
        },
      },
      dappGlobalSettings: {
        causes: false,
        governance: false,
        rewards: false,
        walletsManagement: false,
      },
    },
    ...initialData, // Override with initialData if provided
  };

  const formMethods = useForm<Administrator>({
    resolver: yupResolver(administrators),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    register,
    reset,
  } = formMethods;

  const permissions = watch("permissions");

  // Permission structure remains the same
  const permissionStructure: PermissionPath[] = [
    {
      path: "dashboard",
      label: "Dashboard",
    },
    {
      path: "causes.view",
      label: "Causes",
      description: "View access for causes",
      children: [
        { path: "causes.create", label: "Create new causes" },
        { path: "causes.update", label: "Update existing causes" },
        { path: "causes.delete", label: "Delete causes" },
      ],
    },
    {
      path: "rewards.topTier.view",
      label: "Rewards",
      description: "Top tier rewards management",
      children: [
        {
          path: "rewards.charityLottery.view",
          label: "Charity Lottery",
          description: "View charity lottery rewards",
        },
        {
          path: "rewards.nfts.view",
          label: "NFTs",
          description: "View NFT rewards",
          children: [
            {
              path: "rewards.nfts.create",
              label: "Create NFTs",
              description: "Create new NFT rewards",
            },
          ],
        },
        {
          path: "rewards.staking.view",
          label: "Staking",
          description: "View staking rewards",
        },
      ],
    },
    {
      path: "community.news.view",
      label: "Community",
      description: "News management",
      children: [
        { path: "community.news.create", label: "Create news posts" },
        { path: "community.news.update", label: "Update news posts" },
        { path: "community.news.delete", label: "Delete news posts" },
        { path: "community.users.view", label: "View users" },
        {
          path: "community.users.blockUnblock",
          label: "Block/Unblock users",
        },
        {
          path: "community.administrators.view",
          label: "Administrators",
          description: "View administrators",
          children: [
            { path: "community.administrators.create", label: "Create admins" },
            { path: "community.administrators.update", label: "Update admins" },
            {
              path: "community.administrators.updateOwnAccount",
              label: "Update own account",
            },
            { path: "community.administrators.delete", label: "Delete admins" },
          ],
        },
      ],
    },
    {
      path: "dappGlobalSettings.causes",
      label: "Dapp Settings",
      description: "Global cause settings",
      children: [
        { path: "dappGlobalSettings.governance", label: "Governance" },
        { path: "dappGlobalSettings.rewards", label: "Rewards" },
        {
          path: "dappGlobalSettings.walletsManagement",
          label: "Wallets",
        },
      ],
    },
  ];

  const getNestedValue = (obj: any, path: string): boolean => {
    return path.split(".").reduce((o, k) => (o || {})[k], obj);
  };

  const handleToggle = (path: string) => {
    const currentValue = getNestedValue(permissions, path);
    setValue(`permissions.${path}` as any, !currentValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const renderPermissionSwitch = (permission: PermissionPath, depth = 0) => {
    const value = getNestedValue(permissions, permission.path);
    const hasChildren = permission.children && permission.children.length > 0;
    const id = `permission-${permission.path.replace(/\./g, "-")}`;
    const isParentWithChildren = hasChildren;
    const isChild = depth > 0;

    return (
      <div
        key={permission.path}
        className={`
          ${isChild ? "mt-3" : ""} 
          ${isParentWithChildren ? "" : ""}
        `}
        style={{ marginLeft: `${depth * 24}px` }}
      >
        <div
          className={`
          flex items-center justify-start gap-4
          ${
            isParentWithChildren ? " items-center " : "flex-row flex-wrap gap-2"
          }
        `}
        >
          <Switch
            id={id}
            checked={value}
            onCheckedChange={() => handleToggle(permission.path)}
            className={isParentWithChildren ? "self-end mt-1" : ""}
          />
          <div className="flex flex-col  space-y-1">
            <Label htmlFor={id} className="text-sm font-medium leading-none">
              {permission.label}
            </Label>
            {permission.description && (
              <span className="text-xs text-muted-foreground">
                {permission.description}
              </span>
            )}
          </div>
        </div>

        {hasChildren && value && (
          <div
            className={cn(
              "space-y-3 mt-3 flex  ",
              isParentWithChildren ? "flex-col" : "flex-row"
            )}
          >
            {permission.children?.map((child) =>
              renderPermissionSwitch(child, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-5 max-md:p-3">
      <div className="mx-8 mt-2">
        <HeaderWrapper
          title={mode === "add" ? "Add Administrator" : "Edit Administrator"}
          description={
            mode === "add"
              ? "Create a new administrator account"
              : "Edit administrator details"
          }
          size={"xs"}
        />
      </div>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 grid grid-cols-2 max-md:!grid-cols-1 gap-4">
            {/* Main Details Section */}
            <FormSectionTitle title="Main details" className="col-span-2 max-md:grid-cols-1" />

            {/* Main Details Section */}
           <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 w-full  col-span-2">
           <FormField
              id="username"
              label="Username"
              description="Choose a unique username"
              error={errors.username?.message as string | undefined}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                id="username"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("username")}
              />
            </FormField>
            <FormField
              id="name"
              label="Name"
              description="Enter a full name"
              error={errors.name?.message as string | undefined}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                id="name"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("name")}
              />
            </FormField>
            <FormField
              id="email"
              label="Email"
              description="Enter a CharCoin official email to receive OTP verifications"
              error={errors.email?.message as string | undefined}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                id="email"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("email")}
              />
            </FormField>
            <FormField
              id="phone"
              label="Phone"
              description="Enter a phone to receive SMS OTP verifications"
              error={errors.phone?.message as string | undefined}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                id="phone"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("phone")}
              />
            </FormField>
            <FormField
              id="accessPin"
              label="Access PIN"
              description="Enter a six-digit PIN code"
              error={errors.accessPin?.message as string | undefined}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                type="password"
                id="accessPin"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("accessPin")}
              />
            </FormField>
            <FormField
              id="password"
              label="Password"
              description="Enter a safe password"
              error={errors.password?.message as string | undefined}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                type="password"
                id="password"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("password")}
              />
            </FormField>
            <FormField
              id="authenticatorApp"
              label="Authenticator Application"
              description="Choose your login OTP verification application"
              error={errors.authenticatorApp?.message as string | undefined}
            >
              <Input
                variant="newly_secondary"
                inputSize="lg"
                id="authenticatorApp"
                className="bg-gray-800 border-gray-700 text-white"
                {...register("authenticatorApp")}
              />
            </FormField>

            {/* Authenticator section */}
            <div className="h-full flex items-center justify-between gap-4">
              <div className="text-xs">
                <h3 className="font-medium">
                  {mode === "add" ? "Set up" : "Update"} Authenticator
                </h3>
                <p className="text-muted-foreground">
                  {mode === "add"
                    ? "Scan the QR code to enable 2FA"
                    : "Rescan if changing authenticator app"}
                </p>
              </div>
              <Image
                src="/qr-code.png"
                alt="QR code for 2FA setup"
                width={100}
                height={100}
                className="object-cover w-20 h-20 "
              />
            </div>
           </div>

            {/* Permissions Section */}
            <FormSectionTitle title="Permissions" className="col-span-2 mt-6" />
            <p className="text-muted-foreground col-span-2 text-xs mb-4">
              Configure administrator access permissions
            </p>

            <div className="col-span-2 space-y-4 ">
              {permissionStructure?.map((permission) =>
                renderPermissionSwitch(permission)
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 my-8 max-md:flex-col">
           
            <Button
              type="submit"
              size="lg"
              className="bg-primary  hover:bg-primary/90"
              disabled={isSubmitting}
              endIcon={ArrowRight}
              iconProps={{
                className: cn("!h-5 !w-5"),
              }}
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : mode === "add" ? (
                "Create Administrator"
              ) : (
                "Update Administrator"
              )}
            </Button>
            {mode === "edit" && onDelete && (
              <Button
                type="button"
                variant="destructive"
                size="lg"
                onClick={onDelete}
                disabled={isSubmitting}
                startIcon={Trash2}
              >
                Delete 
              </Button>
            )}
            
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
