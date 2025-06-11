import type { CauseFormData } from "@/schemas/causes-schema";
import type { NewsSchemaType } from "@/schemas/news-schema";

export const dummyData: CauseFormData = {
  causeTitle: "Building 3 schools in the west side of Nicaragua",
  organization: "Schools for the Future",
  website: "https://schoolsforthefuture.org",
  country: "Nicaragua",
  campaign: "February 2025 (Feb 1 to Feb 20)",
  category: "Education",
  type: "One Time Only",
  wallet:
    "0xfd88987b67c265fe57fbdb3b57d97b717ef567e20bd18ba3c2a780040f15634dfe",
  responsibleContact: "Mr. Josué Eliseo Méndez",
  role: "Finance Director",
  email: "josue.mendez@foundation.org",
  phone: "+505-9856-98745",
  status: "Published",
  contractFile: "Final Formal Agreement - Nicaragua.pdf",
};

// Create a dummy video file
const dummyVideoFile = new File(
  [new ArrayBuffer(1024)], // 1KB dummy content
  "dummy-video.mp4",
  { type: "video/mp4" }
);

export const newsDummyData: NewsSchemaType = {
  title: "We are making a difference in water cleaning",
  short_description: "We are making a difference in water purification, bringing clean and safe water to communities in need. Every drop counts, and every effort changes lives. Join us in creating a cleaner future!",
  video: dummyVideoFile,
  category: "clean_water",
  status: "published",
};

export const contractFile = "Final Formal Agreement - Nicaragua.pdf";
