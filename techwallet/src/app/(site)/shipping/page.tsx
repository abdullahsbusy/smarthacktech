import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Shipping & Delivery | TechWallet" };

export default function Shipping() {
  return (
    <InfoPage title="Shipping & Delivery" intro="We deliver across Pakistan with trusted couriers.">
      <h2 className="!mt-0">Delivery time</h2>
      <ul>
        <li>Major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad): 2-3 working days</li>
        <li>Other cities and towns: 3-5 working days</li>
        <li>Orders confirmed before 3pm are dispatched the same day</li>
      </ul>
      <h2>Shipping charges</h2>
      <ul>
        <li>Orders above Rs 5,000: free shipping</li>
        <li>Orders below Rs 5,000: flat Rs 250</li>
      </ul>
      <h2>Cash on Delivery</h2>
      <p>Pay in cash when the parcel arrives. Please check the parcel in front of the rider and contact us on WhatsApp straight away if anything is wrong.</p>
      <h2>Order tracking</h2>
      <p>Once your order ships we send the courier name and tracking number on WhatsApp. You can also check status on the Track Order page.</p>
    </InfoPage>
  );
}
