import { useState } from 'react';
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import DefaultLayout from "@/layouts/default";
import { useRouter } from 'next/router';
import { IExecWeb3mail } from '@iexec/web3mail';
import { IExecDataProtector } from '@iexec/dataprotector';
import { WEB3MAIL_IDAPPS_WHITELIST_SC } from '@/utils/authConfig';
import { submitFile } from '@/utils/submitFile';

const varname = "Email Address";

const web3Provider = typeof window !== 'undefined' && window.ethereum;
const dataProtector = web3Provider && new IExecDataProtector(web3Provider);

const dataProtectorCore = dataProtector?.core;
const web3mail = web3Provider && new IExecWeb3mail(web3Provider);

export default function DocsPage() {
  const { isConnected } = useAccount();
  const [email, setEmail] = useState('');
  const [protectedData, setProtectedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isConnected) {
      console.error("Wallet is not connected.");
      return;
    }

    setIsSubmitting(true);

    try {
      const protectedEmail = await dataProtectorCore.protectData({
        name: varname, data: { email: email },
      });

      setProtectedData(protectedEmail);
      window.protectedEmail = protectedEmail;

      await dataProtectorCore.grantAccess({
        protectedData: protectedEmail.address,
        authorizedApp: WEB3MAIL_IDAPPS_WHITELIST_SC.app,
        authorizedUser: WEB3MAIL_IDAPPS_WHITELIST_SC.user,
        numberOfAccess: 99999,
      });

      const response = await fetch('http://localhost:8000/retrieve-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: '0xcF10A8E7c907144cc87721aC1fD7Ac75a8aebeC7'}),
      });

      if (response.ok) {
      
        console.log("Users data retrieved successfully");
        const data = await response.json();

        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });

        const file = new File([blob], 'data.json', { type: 'application/json' });
        console.log(file.stream.toString());
        
        await submitFile({
          file: file,
        });

        
      } else {
        console.error("Failed to retrieve users data");
      }

      router.push('/home');
    } catch (error) {
      console.error("Error protecting email data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center h-screen gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
        <span className={title({ color: "violet" })}>Welcome to Incognito&nbsp;</span>
        <div className="inline-block max-w-lg text-center justify-center mt-8">
          <ConnectButton/>
        </div>
          {isConnected && (
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
              <Input 
                type="email" 
                label="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                className='mt-8'
              />
              <Button 
                type="submit" 
                color="primary" 
                isLoading={isSubmitting}
                className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg mt-8 text-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}