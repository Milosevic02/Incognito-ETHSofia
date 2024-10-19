import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import mockListings from "@/data/mockListings";
import ListingCard from "@/components/ListingCard";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title({ color: "violet" })}>Public Listings&nbsp;</span>
        </div>
        {/* Card Grid */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {mockListings.map((listing, index) => (
            <ListingCard
              key={index}
              title={listing.title}
              subtitle={listing.subtitle}
              description={listing.description}
              link={listing.link}
            />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
