import InfoPage from "@/components/InfoPage";
import TrackForm from "@/components/TrackForm";

export const metadata = { title: "Track Order | TechWallet" };

export default function Track() {
  return (
    <InfoPage title="Track your order" intro="Enter your order number and phone number to see where your parcel is.">
      <TrackForm />
    </InfoPage>
  );
}
