import { useState } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import toast, { Toaster } from "react-hot-toast";

export default function IndexPage() {
  const [formData, setFormData] = useState({
    listingName: "",
    description: "",
    numberOfUsers: "",
    walletBalance: "",
    nativeBalance: "",
    lastTransactionYear: "2024",
    firstTransactionYear: "2017",
    numberOfNFTs: "0",
    numberOfTransactions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const dataToSend = {
      listingName: formData.listingName,
      description: formData.description,
      numberOfUsers: parseInt(formData.numberOfUsers, 10),
      walletBalance: parseFloat(formData.walletBalance),
      nativeBalance: parseFloat(formData.nativeBalance),
      yearOfLastTransaction: parseInt(formData.lastTransactionYear, 10),
      yearOfFirstTransaction: parseInt(formData.firstTransactionYear, 10),
      numberOfNFTs: parseInt(formData.numberOfNFTs, 10),
      numberOfTransactions: parseInt(formData.numberOfTransactions, 10),
    };
  
    try {
      const response = await fetch("http://localhost:8000/send-mails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        toast.success("Data sent successfully!");
        setFormData({
          listingName: "",
          description: "",
          numberOfUsers: "",
          walletBalance: "",
          nativeBalance: "",
          lastTransactionYear: "2024",
          firstTransactionYear: "2009",
          numberOfNFTs: "0",
          numberOfTransactions: "",
        });
      } else {
        toast.error("Failed to send data");
      }
    } catch (error) {
      toast.error("Error sending data");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <Toaster />
      <section className="flex flex-col items-center justify-center gap-6 py-10 md:py-12">
        <div className="inline-block max-w-3xl text-center justify-center">
          <span className={title({ color: "violet", size: "lg" })}>Post a Listing&nbsp;</span>
          <section className="flex flex-col items-center justify-center gap-6 py-10 md:py-12">
            <div className="p-[3px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              <div className="p-8 bg-black rounded-xl">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center w-full"
                >
                  <div className="flex flex-col gap-6 md:col-span-1">
                    <Input
                      radius="lg"
                      label="Listing Name"
                      className="max-w-[360px]"
                      name="listingName"
                      size="lg"
                      value={formData.listingName}
                      onChange={handleChange}
                    />
                    <Input
                      radius="lg"
                      label="Number of Users"
                      className="max-w-[360px]"
                      name="numberOfUsers"
                      size="lg"
                      value={formData.numberOfUsers}
                      onChange={handleChange}
                    />
                    <Textarea
                      radius="lg"
                      label="Description"
                      className="max-w-[360px]"
                      name="description"
                      size="lg"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                    />
                  </div>

                  <div className="flex flex-col gap-6 md:col-span-1">
                    <Input
                      radius="lg"
                      label="Wallet Balance"
                      className="max-w-[260px]"
                      name="walletBalance"
                      size="lg"
                      value={formData.walletBalance}
                      onChange={handleChange}
                    />
                    <Input
                      radius="lg"
                      label="Number of Transactions"
                      className="max-w-[260px]"
                      name="numberOfTransactions"
                      size="lg"
                      value={formData.numberOfTransactions}
                      onChange={handleChange}
                    />
                    <Input
                      radius="lg"
                      label="Native Balance"
                      className="max-w-[260px]"
                      name="nativeBalance"
                      size="lg"
                      value={formData.nativeBalance}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-6 md:col-span-1">
                    <Input
                      radius="lg"
                      label="Year of Last Transaction"
                      className="max-w-[260px]"
                      name="lastTransactionYear"
                      size="lg"
                      value={formData.lastTransactionYear}
                      onChange={handleChange}
                      defaultValue="2024"
                    />
                    <Input
                      radius="lg"
                      label="Year of First Transaction"
                      className="max-w-[260px]"
                      name="firstTransactionYear"
                      size="lg"
                      value={formData.firstTransactionYear}
                      onChange={handleChange}
                      defaultValue="2009"
                    />
                    <Input
                      radius="lg"
                      label="Number of NFTs"
                      className="max-w-[260px]"
                      name="numberOfNFTs"
                      size="lg"
                      value={formData.numberOfNFTs}
                      onChange={handleChange}
                      defaultValue="0"
                    />
                  </div>

                  <div className="col-span-3 flex justify-center">
                    <Button
                      type="submit"
                      color="primary"
                      isLoading={isSubmitting}
                      size="lg"
                      className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg mt-10 text-xl"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </section>
    </DefaultLayout>
  );
}