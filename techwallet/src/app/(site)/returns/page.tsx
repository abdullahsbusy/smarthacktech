import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Returns & Warranty | TechWallet" };

export default function Returns() {
  return (
    <InfoPage title="Returns & Warranty" intro="Every component is tested before dispatch. If something is wrong, we fix it.">
      <h2 className="!mt-0">7-day replacement</h2>
      <p>If you receive a dead-on-arrival, damaged or wrong item, tell us within 7 days of delivery with a photo or short video and we will replace it free of charge.</p>
      <h2>What is covered</h2>
      <ul>
        <li>Items that do not power on or are defective out of the box</li>
        <li>Wrong or missing items</li>
        <li>Damage during shipping</li>
      </ul>
      <h2>What is not covered</h2>
      <ul>
        <li>Burnt or damaged boards from wrong wiring, over-voltage or reverse polarity</li>
        <li>Items with soldering changes or physical damage after delivery</li>
      </ul>
      <h2>How to claim</h2>
      <p>Message us on WhatsApp with your order number and a clear photo or video. We reply within one working day.</p>
    </InfoPage>
  );
}
