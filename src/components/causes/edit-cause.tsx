import { dummyData } from "@/lib/dummy-data";
import { CauseFormData, causeFormSchema } from "@/schemas/causes-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import MainDetailsSection from "./edit/main-detail";
import ContactDetailsSection from "./edit/contract-detail";
import FormActions from "./edit/edit-action";
import { Cause } from "@/types/causes";
import { useEffect } from "react";
import { Program, } from '@coral-xyz/anchor';

import idl from '@/components/idl.json';
import { getConfig,configAccount,stakingPool, PROGRAM_ID } from '@/components/const';
import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
    import { PublicKey, Transaction,
  } from "@solana/web3.js";
import { toast } from "@/stores/use-toast";
interface EditCauseProps {
  initialData: Cause | null;
}

export const EditCause = ({ initialData }: EditCauseProps) => {
    const {sendTransaction,wallet,publicKey} = useWallet();
  const { connection } = useConnection();
  const form = useForm<CauseFormData>({
    resolver: yupResolver(causeFormSchema),
    // defaultValues will be overwritten by reset if initialData exists
    defaultValues: { // Provide default values for all fields in CauseFormData
      causeTitle: '',
      organization: '',
      website: '',
      country: '',
      campaign: '',
      category: '',
      type: '',
      wallet: '',
      responsibleContact: '',
      role: '',
      email: '',
      phone: '',
      status: '',
      featuredImages: [], // Assuming it's an array of files/strings
      contractFile: undefined, // Assuming it can be optional or null initially
    }
  });
 const onSubmit = async (data: CauseFormData) => {
 }
  const onSubmitBut = async () => {
    const data = form.getValues();
    console.log("Form Data:", data);
    try{
    const { provider } = getConfig(wallet?.adapter);
    const program = new Program(idl, provider);
      let transaction = new Transaction();
      const charityId = 0;
    const [charityAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('charity'), new anchor.BN(charityId).toArrayLike(Buffer, "le", 8)],
      program.programId
    );
const startDate  = new Date();
const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days later
 
    const updateSettingsIx = await program.methods
      .registerCharityHandler(
        data.causeTitle,
        new PublicKey(data.wallet),
        new anchor.BN(startDate.getTime() / 1000), // Convert to seconds
        new anchor.BN(endDate.getTime() / 1000), // Convert to seconds
      )
      .accounts({
        config: configAccount,
        admin:publicKey,
        charity: charityAccount,
        registrar: data.wallet, // Assuming this is the registrar's wallet
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .instruction();
        transaction.add(updateSettingsIx);
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (await program.provider.connection.getLatestBlockhash()).blockhash;
        const txSignature = transaction && (await sendTransaction(transaction, connection));
        console.log("Transaction Signature:", txSignature);
        toast({
          title: "Charity registered",
          description: "Charity registered successfully.",
          variant: "success",
        });
    }catch(err){
      console.error("Error :", err);
      toast({
          title: "Error",
          description: "Error registering charity.",
          variant: "destructive",
        });
    }
  };

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      // Map initialData (Cause) to CauseFormData structure for the form
      form.reset({
        causeTitle: initialData.name || '',
        organization: initialData.organization || '',
        category: initialData.category || '',
        type: initialData.type || '',
        // Provide default or mapped values for other CauseFormData fields
        website: 'https://google.com', // Cause type doesn't have website
        country: 'Nicaragua', // Cause type doesn't have country
        campaign: initialData.endsOn || '', // Using endsOn as placeholder for campaign
        wallet: 'CrepGjpjjaHiXEPhEw2rLywEtjgR9sRvL3LfUrPQq9im', // Cause type doesn't have wallet
        responsibleContact: '', // Cause type doesn't have responsibleContact
        role: 'admin', // Cause type doesn't have role
        email: 'admin@charcoin.com', // Cause type doesn't have email
        phone: '+15446546456', // Cause type doesn't have phone
        status: 'published', // Cause type doesn't have a simple status string
        featuredImages: initialData.image ? [initialData.image as any] : [], // Assuming image can be mapped to featuredImages, needs type adjustment
        contractFile: undefined, // Cause type doesn't have contractFile
      } as CauseFormData); // Type assertion for now, refine mapping as needed
    } else {
      // Reset to default empty values if initialData is null
       form.reset({ // Provide default values for all fields in CauseFormData
        causeTitle: '',
        organization: '',
        website: '',
        country: '',
        campaign: '',
        category: '',
        type: '',
        wallet: '',
        responsibleContact: '',
        role: '',
        email: '',
        phone: '',
        status: '',
        featuredImages: [], 
        contractFile: undefined, 
      });
    }
  }, [initialData, form]);

  return (
    <div>
      {/* Header */}
      <div className="ml-10 mb-10 font-WFVisualSansRegular bg-[#232226]">
        {/* You might want to dynamically change the header based on the cause status */}
        <h1 className="text-xl font-WFVisualSansRegular ">Edit Cause / Project</h1>
        <p className="text-gray-400 text-xs mt-2">
          {/* You might want to dynamically change this message */}
          You are editing a cause or project.
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* These components will automatically get form context */}
          <MainDetailsSection />
          <ContactDetailsSection />
          <FormActions />
        </form>
        <button onClick={()=>onSubmitBut()}>test</button>
      </FormProvider>
    </div>
  );
};
