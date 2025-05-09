import * as yup from "yup";

const campaignSchema = yup
  .object({
    name: yup.string().required("Campaign name is required"),
    year: yup.string().when("annualSpecialCampaign", (annualSpecialCampaign, schema) => {
      return annualSpecialCampaign ? schema.notRequired() : schema.required("Year is Required")
    }),
    endDate: yup
      .date()
      // .when("annualSpecialCampaign", (annualSpecialCampaign, schema) => {
      //   return !annualSpecialCampaign
      //     ? schema.notRequired()
      // : schema
      .required("End date is required when annual campaign is not active"),
    // }),
    startDate: yup
      .date()
      .when("annualSpecialCampaign", (annualSpecialCampaign, schema) => {
        return annualSpecialCampaign
          ? schema.notRequired()
          : schema.required("Start date is required when annual campaign is not active");
      }),
    annualSpecialCampaign: yup
      .boolean()
      .default(false)
      .required("Annual special campaign status is required"),
  })
  .required();

export type CampaignSchemaType = yup.InferType<typeof campaignSchema>;

export { campaignSchema };