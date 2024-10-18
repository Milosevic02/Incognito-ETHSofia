// components/ListingCard.tsx

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

interface ListingCardProps {
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ title, subtitle, description, link }) => (
  <Card className="w-[400px] h-[300px]"> {/* Add margin here */}
    <CardHeader className="flex gap-3">
      <div className="flex flex-col">
        <p className="text-lg font-bold">{title}</p> {/* Increase font size and add bold */}
        <p className="text-small text-default-500">{subtitle}</p>
      </div>
    </CardHeader>
    <Divider />
    <CardBody className="flex-grow">
      <p>{description}</p>
    </CardBody>
    <Divider />
    <CardFooter>
      <Link isExternal showAnchorIcon href={link}>
        Apply
      </Link>
    </CardFooter>
  </Card>
);

export default ListingCard;
