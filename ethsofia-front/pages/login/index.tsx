import { useState } from 'react';
import { title } from "@/components/primitives";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import DefaultLayout from "@/layouts/default";
import { useRouter } from 'next/router';
import { IExecWeb3mail } from '@iexec/web3mail';
import { IExecDataProtector } from '@iexec/dataprotector';
import { type GrantAccessParams } from '@iexec/dataprotector';
import { WEB3MAIL_IDAPPS_WHITELIST_SC } from '@/utils/authConfig';

const varname = "Email Address";
var protectedDataAddress = "";

const web3Provider = typeof window !== 'undefined' && window.ethereum;
const dataProtector = web3Provider && new IExecDataProtector(web3Provider);

const dataProtectorCore = dataProtector?.core;
const web3mail = web3Provider && new IExecWeb3mail(web3Provider);

export default function DocsPage() {
  const { isConnected } = useAccount();
  const [email, setEmail] = useState('');
  const [protectedData, setProtectedData] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isConnected) {
      console.error("Wallet is not connected.");
      return;
    }

    try {
      // Protect the email data on form submission
      const protectedEmail = await dataProtectorCore.protectData({
        name: varname, data: { email: email },
      });

      setProtectedData(protectedEmail);
      // Save the protected email to a global variable
      window.protectedEmail = protectedEmail;
      // Grant access after protecting the email
      const grantedAccess = await dataProtectorCore.grantAccess({
        protectedData: protectedEmail.address,
        authorizedApp: WEB3MAIL_IDAPPS_WHITELIST_SC.app,
        authorizedUser: WEB3MAIL_IDAPPS_WHITELIST_SC.user,
        numberOfAccess: 99999,
      });

      console.log("Access granted:", grantedAccess);
      router.push('/');
    } catch (error) {
      console.error("Error protecting email data:", error);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Login</h1>
          <ConnectButton />
          {isConnected && (
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="border p-2 rounded mb-2"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit
              </button>
            </form>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
