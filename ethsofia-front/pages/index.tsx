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

const varname = "Email Address";

const web3Provider = typeof window !== 'undefined' && window.ethereum;
const dataProtector = web3Provider && new IExecDataProtector(web3Provider);

const dataProtectorCore = dataProtector?.core;
const web3mail = web3Provider && new IExecWeb3mail(web3Provider);

export default function DocsPage() {
  const { isConnected } = useAccount();
  const [email, setEmail] = useState('');
  const [protectedData, setProtectedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button loading
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isConnected) {
      console.error("Wallet is not connected.");
      return;
    }

    setIsSubmitting(true); // Set loading to true when form is submitted

    try {
      // Protect the email data on form submission
      const protectedEmail = await dataProtectorCore.protectData({
        name: varname, data: { email: email },
      });

      setProtectedData(protectedEmail);
      // Save the protected email to a global variable
      window.protectedEmail = protectedEmail;

      // Grant access after protecting the email
      await dataProtectorCore.grantAccess({
        protectedData: protectedEmail.address,
        authorizedApp: WEB3MAIL_IDAPPS_WHITELIST_SC.app,
        authorizedUser: WEB3MAIL_IDAPPS_WHITELIST_SC.user,
        numberOfAccess: 99999,
      });

      // Send the protected email address to the backend
      const response = await fetch('http://localhost:8000/retrieve-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: protectedEmail.address }),
      });

      if (response.ok) {
        console.log("Users data retrieved successfully");
      } else {
        console.error("Failed to retrieve users data");
      }
      router.push('/home');
    } catch (error) {
      console.error("Error protecting email data:", error);
    } finally {
      setIsSubmitting(false); // Reset loading state once submission is complete
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center h-screen gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
        <span className={title({ color: "violet" })}>Welcome to Icognito&nbsp;</span>
          {isConnected && (
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
              <ConnectButton/>
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
