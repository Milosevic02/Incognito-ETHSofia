import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import DefaultLayout from "@/layouts/default";
import AnimatedGradientDiv from '@/components/AnimatedGradientDiv';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <div className="flex flex-col items-center mt-8">
            <h1 className={title({ size: 'sm' })}>
              Your one-stop service for connecting web3 enthusiasts with exciting new projects
            </h1>
          </div>
          <div className="flex items-center justify-center mt-8 space-x-4"> {/* Added space-x-4 for spacing */}
            <Button
              radius="full"
              className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg text-xl font-bold"
              onPress={() => window.location.href = '/jobs'}
            >
              Look at Listings!
            </Button>
            <Button
              radius="full"
              className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg text-xl font-bold"
              onPress={() => window.location.href = '/post'}
            >
              Post a Listing!
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
