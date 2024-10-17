import { useState } from 'react';
import { title } from "@/components/primitives";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import DefaultLayout from "@/layouts/default";
import { useRouter } from 'next/router';

export default function DocsPage() {
  const { isConnected } = useAccount();
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    router.push('/');
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
