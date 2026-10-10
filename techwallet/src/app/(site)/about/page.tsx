import InfoPage from "@/components/InfoPage";

export const metadata = { title: "About | TechWallet" };

export default function About() {
  return (
    <InfoPage title="About TechWallet" intro="We help students and makers in Pakistan build IoT projects that actually work.">
      <p>TechWallet started from a simple problem: good components were hard to find, and nobody was around to help when a project would not work the night before a demo.</p>
      <h2>What we do</h2>
      <ul>
        <li>Sell genuine, tested ESP32, Arduino, Raspberry Pi, sensors and modules</li>
        <li>Build ready kits for popular final year projects</li>
        <li>Mentor students through hardware, firmware and documentation</li>
      </ul>
      <h2>Our promise</h2>
      <p>Honest specs, fair prices, fast delivery, and real engineers answering your questions.</p>
    </InfoPage>
  );
}
