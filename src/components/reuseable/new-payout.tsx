import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeaderWrapper } from '../custom/header-wrapper';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import FormField from '../causes/edit/form-field';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { payoutSchema, PayoutForm } from '@/schemas/payout-schema';
import { Textarea } from '../ui/textarea';

interface PayoutInterfaceProps {
  walletName: string;
}

// Type helper for nested auth error fields
type AuthFieldErrors = Partial<Record<keyof PayoutForm['auth1'], { message?: string }>>;

export default function PayoutInterface({ walletName }: PayoutInterfaceProps) {
  const formMethods = useForm<PayoutForm>({
    resolver: yupResolver(payoutSchema),
    defaultValues: {
      amount: 0,
      description: '',
      receiverWallet: '',
      confirmWallet: '',
      auth1: {
        username: '',
        password: '',
        pin: '',
        otp: '',
      },
      auth2: {
        username: '',
        password: '',
        pin: '',
        otp: '',
      },
      auth3: {
        username: '',
        password: '',
        pin: '',
        otp: '',
      },
    },
  });

  const { handleSubmit, formState: { errors }, register } = formMethods;

  const onSubmit = (data: PayoutForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen text-white px-4">
      <HeaderWrapper
        title={`Make a new payout`}
        description={`Place a new transaction, multi-signature from 3 random administrators is needed to proceed`}
        size={'sm'}
        mainClassName="ml-5 [&_h1]:font-bold"
      />

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-lg mb-10 border-b border-secondary pb-5">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-2">{walletName}</h2>
                <p className="text-cyan-400 font-mono text-sm">
                  9JH7XWqE221B5VjKshp3Gn8Y7TCqP6ZMoJFkxuAWhqKv
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$847,214.00</div>
                <div className="text-gray-400 text-sm">Current Balance</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Transaction details</h3>

            <div className="space-y-6">
              <FormField
                id="amount"
                label="Amount"
                description="Enter the total amount to be sent in USDT on the Solana network. Ensure the value is within the allowed limits"
                error={errors.amount?.message}
              >
                <Input
                  type="number"
                  placeholder="Enter an amount in USDT (SOLANA)"
                  {...register('amount')}
                />
              </FormField>

              <FormField
                id="description"
                label="Description / Notes"
                description="Provide a brief note or reason for the transaction. This helps track payments and justifications"
                error={errors.description?.message}
              >
                <Textarea
                  placeholder="Enter details describing the reason for this transaction"
                  {...register('description')}
                />
              </FormField>

              <FormField
                id="receiverWallet"
                label="Receiver Wallet"
                description="Enter the recipient's Solana wallet address where the USDT will be sent"
                error={errors.receiverWallet?.message}
              >
                <Input
                  type="text"
                  placeholder="Enter a USDT (SOLANA) Wallet Address"
                  {...register('receiverWallet')}
                />
              </FormField>

              <FormField
                id="confirmWallet"
                label="Confirm Receiver Wallet"
                description="Double-check the receiver wallet for accuracy"
                error={errors.confirmWallet?.message}
              >
                <Input
                  type="text"
                  placeholder="Confirm Wallet Address"
                  {...register('confirmWallet')}
                />
              </FormField>
            </div>
          </div>

          <div className="border-b border-secondary flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">Authorizations</h3>
            <p className="text-gray-400 text-sm mb-6">
              Approval required from authorized administrators before the transaction is processed
            </p>

            {[1, 2, 3].map((authIndex) => {
              const authKey = `auth${authIndex}` as keyof PayoutForm;
              const authErrors = errors[authKey] as AuthFieldErrors | undefined;

              return (
                <div key={authIndex} className="relative rounded-lg px-2 pl-6">
                  <div className="absolute left-0 h-full top-0 !w-[6px] md:!w-[10px] rounded-3xl bg-secondary"></div>
                  <h4 className="text-lg font-semibold">Authorization #{authIndex}</h4>
                  <p className="text-gray-400 text-sm">
                    Complete the fields below with an administrator's details to proceed
                  </p>

                  <div className="grid grid-cols-2 items-start lg:grid-cols-4 gap-4">
                    <FormField
                      id={`${authKey}-username`}
                      label="Administrator Username"
                      error={authErrors?.username?.message}
                    >
                      <Input
                        type="text"
                        placeholder="Enter a username"
                        {...register(`${authKey}.username` as any)}
                      />
                    </FormField>
                    <FormField
                      id={`${authKey}-password`}
                      label="Password"
                      error={authErrors?.password?.message}
                    >
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        {...register(`${authKey}.password` as any)}
                      />
                    </FormField>
                    <FormField
                      id={`${authKey}-pin`}
                      label="PIN"
                      error={authErrors?.pin?.message}
                    >
                      <Input
                        type="password"
                        placeholder="• • • • • •"
                        {...register(`${authKey}.pin` as any)}
                      />
                    </FormField>
                    <FormField
                      id={`${authKey}-otp`}
                      label="OTP Code"
                      description="Request via email"
                      error={authErrors?.otp?.message}
                      className='[&_label]:mb-0 [&_span]:mb-1'
                    >
                      <Input
                        type="text"
                        placeholder="• • • • • •"
                        {...register(`${authKey}.otp` as any)}
                      />
                    </FormField>
                  </div>
                </div>
              );
            })}
          </div>

          <Button type="submit" className="mt-5">
            Send Transfer
            <ArrowRight size={20} />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
