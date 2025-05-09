"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

// Define the form validation schema using Zod
const formSchema = z.object({
  projectTitle: z.string().min(3, {
    message: "Project title must be at least 3 characters.",
  }),
  organization: z.string().min(2, {
    message: "Organization name is required.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  mainCategory: z.string({
    required_error: "Please select a category.",
  }),
  projectType: z.string({
    required_error: "Please select a project type.",
  }),
  revenueModel: z.string().min(5, {
    message: "Revenue model is required.",
  }),
  responsibleContact: z.string().min(2, {
    message: "Contact name is required.",
  }),
  role: z.string().min(2, {
    message: "Role is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  status: z.string().optional(),
});

export function AddCauseForm() {
  const [activeTab, setActiveTab] = useState("preview");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      organization: "",
      country: "",
      mainCategory: "",
      projectType: "",
      revenueModel: "",
      responsibleContact: "",
      role: "",
      email: "",
      phone: "",
      status: "Open",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission logic here
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen  text-white">
      <div className="w-full max-w-4xl mx-auto p-4 bg-background">
        <Card className="bg-background border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Create a new cause / project</CardTitle>
              <CardDescription className="text-zinc-400">
                Fill in the details step by step and see the preview in
                real-time before you submit.
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Main details</h3>

                  <FormField
                    control={form.control}
                    name="projectTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project/cause title</FormLabel>
                        <FormDescription className="text-zinc-500 text-xs">
                          This is what donors/backers will see when searching
                          the cause in the directory.
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Enter the cause or project name..."
                            className="bg-zinc-800 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormDescription className="text-zinc-500 text-xs">
                          The organization in charge of distributing the
                          donations received.
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Enter the organization name..."
                            className="bg-zinc-800 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormDescription className="text-zinc-500 text-xs">
                            Select the country where the cause / project will be
                            operating.
                          </FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-800 ">
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-zinc-800 ">
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mainCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main category</FormLabel>
                          <FormDescription className="text-zinc-500 text-xs">
                            Select the category that best matches the cause /
                            project.
                          </FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-800 ">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-zinc-800 ">
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="environment">
                                Environment
                              </SelectItem>
                              <SelectItem value="health">Health</SelectItem>
                              <SelectItem value="humanitarian">
                                Humanitarian
                              </SelectItem>
                              <SelectItem value="animals">Animals</SelectItem>
                              <SelectItem value="arts">
                                Arts & Culture
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormDescription className="text-zinc-500 text-xs">
                            Select the type of cause / project.
                          </FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-zinc-800 ">
                                <SelectValue placeholder="Select a type of project" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-zinc-800 ">
                              <SelectItem value="nonprofit">
                                Non-profit
                              </SelectItem>
                              <SelectItem value="community">
                                Community
                              </SelectItem>
                              <SelectItem value="emergency">
                                Emergency Relief
                              </SelectItem>
                              <SelectItem value="startup">
                                Social Startup
                              </SelectItem>
                              <SelectItem value="personal">
                                Personal Cause
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="revenueModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Revenue model</FormLabel>
                          <FormDescription className="text-zinc-500 text-xs">
                            Enter the SOLANA Network USDT Address.
                          </FormDescription>
                          <FormControl>
                            <Input
                              placeholder="Enter SOLANA Network USDT Address"
                              className="bg-zinc-800 "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormLabel>Featured image</FormLabel>
                    <FormDescription className="text-zinc-500 text-xs mb-2 block">
                      Choose a featured image (PNG, JPEG), which will be shown
                      on the campaign page.
                    </FormDescription>

                    <div className="mt-2">
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="bg-zinc-800">
                          <TabsTrigger value="upload">
                            Upload an image
                          </TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                          <TabsTrigger value="replace">Replace</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upload" className="mt-2">
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer  hover:border-zinc-500"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-zinc-400" />
                                <p className="mb-2 text-sm text-zinc-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-zinc-500">
                                  PNG, JPG (MAX. 2MB)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={handleImageUpload}
                              />
                            </label>
                          </div>
                        </TabsContent>
                        <TabsContent value="preview" className="mt-2">
                          {imagePreview ? (
                            <div className="relative w-full h-32 bg-zinc-800 rounded-lg overflow-hidden">
                              <Image
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-full h-32 bg-zinc-800 rounded-lg">
                              <p className="text-zinc-500">
                                No image uploaded yet
                              </p>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium pt-4">Contact details</h3>

                  <FormField
                    control={form.control}
                    name="responsibleContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsible Contact</FormLabel>
                        <FormDescription className="text-zinc-500 text-xs">
                          Enter the PERSON who will be responsible for the
                          fundraising.
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Enter a name and surname"
                            className="bg-zinc-800 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role / Position</FormLabel>
                        <FormDescription className="text-zinc-500 text-xs">
                          Enter the personapos;s role/position in the organization.
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Enter a role or position"
                            className="bg-zinc-800 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormDescription className="text-zinc-500 text-xs">
                            Enter the contact email.
                          </FormDescription>
                          <FormControl>
                            <Input
                              placeholder="Enter an email"
                              type="email"
                              className="bg-zinc-800 "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormDescription className="text-zinc-500 text-xs">
                            Enter the contact phone.
                          </FormDescription>
                          <FormControl>
                            <Input
                              placeholder="Enter a phone with international area code"
                              className="bg-zinc-800 "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormLabel>Contact</FormLabel>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        type="button"
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        Connect your Tally <Check className="ml-2 h-4 w-4" />
                      </Button>
                      <span className="text-xs text-zinc-500">
                        No account yet
                      </span>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormDescription className="text-zinc-500 text-xs">
                          Select the status of the cause / project.
                        </FormDescription>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-800 ">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-800 ">
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <CardFooter className="px-0 pt-6 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Create Cause / Project
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
