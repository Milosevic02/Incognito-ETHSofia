import { useState } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function IndexPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    adName: "",
    description: "",
    numberOfUsers: "",
    walletBalance: "",
    nativeBalance: "",
    lastTransactionYear: "2024",
    firstTransactionYear: "2009",
    numberOfNFTs: "0",
  });

  // Handler for input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form data here, such as sending it to an API
    console.log(formData);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title({ color: "violet" })}>Post&nbsp;</span>
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <Input
              radius="lg"
              label="Ad Name"
              className="max-w-[220px]"
              name="adName"
              value={formData.adName}
              onChange={handleChange}
            />
            <Input
              radius="lg"
              label="Description"
              className="max-w-[220px]"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              radius="lg"
              label="Number of Users"
              className="max-w-[220px]"
              name="numberOfUsers"
              value={formData.numberOfUsers}
              onChange={handleChange}
            />
            <Input
              radius="lg"
              label="Wallet Balance"
              className="max-w-[220px]"
              name="walletBalance"
              value={formData.walletBalance}
              onChange={handleChange}
            />
            <Input
              radius="lg"
              label="Native Balance"
              className="max-w-[220px]"
              name="nativeBalance"
              value={formData.nativeBalance}
              onChange={handleChange}
            />
            <Input
              radius="lg"
              label="Year of Last Transaction"
              className="max-w-[220px]"
              name="lastTransactionYear"
              value={formData.lastTransactionYear}
              onChange={handleChange}
              defaultValue="2024"
            />
            <Input
              radius="lg"
              label="Year of First Transaction"
              className="max-w-[220px]"
              name="firstTransactionYear"
              value={formData.firstTransactionYear}
              onChange={handleChange}
              defaultValue="2009"
            />
            <Input
              radius="lg"
              label="Number of NFTs"
              className="max-w-[220px]"
              name="numberOfNFTs"
              value={formData.numberOfNFTs}
              onChange={handleChange}
              defaultValue="0"
            />
            <Button
              radius="full"
              className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg"
            >Submit</Button>
          </form>
          </section>
        </div>
      </section>
    </DefaultLayout>
  );
}
