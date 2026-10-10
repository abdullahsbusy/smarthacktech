// Editorial content (FYP idea details, blog posts, reviews). Moves to the database later.

export const ideaDetails: Record<string, { summary: string; features: string[]; parts: { slug: string; qty: number }[]; steps: string[] }> = {
  "smart-agriculture": {
    summary: "Monitor soil moisture, temperature and humidity in a field and switch the water pump automatically. Data is sent to a phone dashboard over WiFi.",
    features: ["Soil moisture based auto irrigation", "Live temperature and humidity dashboard", "Pump on/off from phone", "Alerts when moisture is low"],
    parts: [{ slug: "esp32-devkit-v1", qty: 1 }, { slug: "dht22-sensor", qty: 1 }, { slug: "relay-4ch", qty: 1 }, { slug: "oled-096-i2c", qty: 1 }],
    steps: ["Finalize sensors and pump", "Build and test the circuit on a breadboard", "Write ESP32 firmware and connect to cloud", "Build the dashboard", "Prepare report and demo"],
  },
  "smart-home": {
    summary: "Control lights and appliances from a mobile app or voice, with temperature sensing and a security alert.",
    features: ["Mobile app control of 4 appliances", "Temperature and humidity display", "Motion alert notification", "Works locally and over internet"],
    parts: [{ slug: "esp32-devkit-v1", qty: 1 }, { slug: "relay-4ch", qty: 1 }, { slug: "dht22-sensor", qty: 1 }, { slug: "oled-096-i2c", qty: 1 }],
    steps: ["Design the relay wiring safely", "Flash firmware and test each relay", "Connect the app or web dashboard", "Add sensors and alerts", "Enclosure, report and demo"],
  },
  "patient-monitoring": {
    summary: "Measure body temperature and heart rate and send readings to a doctor dashboard with emergency alerts.",
    features: ["Heart rate and temperature sensing", "Live dashboard for doctor", "Threshold based SMS or app alerts", "Data history and charts"],
    parts: [{ slug: "esp32-devkit-v1", qty: 1 }, { slug: "oled-096-i2c", qty: 1 }, { slug: "dht22-sensor", qty: 1 }],
    steps: ["Choose and calibrate sensors", "Filter and validate the readings", "Send data to the cloud", "Dashboard and alert rules", "Testing, report and demo"],
  },
  "line-follower-robot": {
    summary: "A two-wheel robot that follows a line using IR sensors and a PID controller, with obstacle stop.",
    features: ["PID line following", "Obstacle detection and stop", "Adjustable speed", "Battery level display"],
    parts: [{ slug: "arduino-uno-r3", qty: 1 }, { slug: "l298n-driver", qty: 1 }, { slug: "hc-sr04", qty: 1 }, { slug: "sg90-servo", qty: 1 }],
    steps: ["Assemble chassis and motors", "Wire the driver and sensors", "Implement basic then PID control", "Tune on the track", "Report and demo"],
  },
};

export const posts = [
  {
    slug: "esp32-vs-arduino",
    title: "ESP32 vs Arduino: which should you pick for your project?",
    date: "2026-09-12",
    read: "5 min",
    tag: "Guide",
    excerpt: "Both are great, but they solve different problems. Here is a simple way to choose.",
    body: [
      "If your project needs WiFi or Bluetooth, start with an ESP32. It has both built in, runs at 240 MHz and costs about the same as an Arduino Uno clone.",
      "Choose an Arduino Uno or Nano when you are learning electronics, need 5 V logic for older modules, or want the simplest possible setup with huge community support.",
      "Rule of thumb: connected to the internet, pick ESP32. Standalone, simple, 5 V, pick Arduino.",
    ],
  },
  {
    slug: "best-iot-fyp-ideas",
    title: "10 IoT final year project ideas that examiners like",
    date: "2026-09-02",
    read: "6 min",
    tag: "FYP",
    excerpt: "Practical ideas with realistic budgets, from smart agriculture to health monitoring.",
    body: [
      "A good FYP solves a real problem, has a working demo and shows clear engineering decisions. Avoid ideas that only blink an LED.",
      "Strong choices: smart irrigation, home automation with energy monitoring, patient vitals dashboard, air quality station, and a line-follower or obstacle-avoiding robot.",
      "Pick something you can finish in your timeline, then add one extra feature that makes it yours.",
    ],
  },
  {
    slug: "dht22-esp32-tutorial",
    title: "Read temperature and humidity with ESP32 and DHT22",
    date: "2026-08-20",
    read: "4 min",
    tag: "Tutorial",
    excerpt: "Wire a DHT22 to an ESP32 and print readings in under ten minutes.",
    body: [
      "Connect the DHT22 VCC to 3.3 V, GND to GND and the data pin to GPIO 4 with a 10 k pull-up resistor if your module does not include one.",
      "Install the DHT sensor library in Arduino IDE, create a DHT object on pin 4, and read temperature and humidity every two seconds.",
      "Print the values to the Serial Monitor at 115200 baud. From here you can show them on an OLED or send them to a dashboard.",
    ],
  },
];

export const reviews = [
  { name: "Hassan R.", rating: 5, text: "Board arrived well packed and worked on the first try. Delivery to Lahore took two days.", date: "Sep 2026" },
  { name: "Maryam S.", rating: 5, text: "Got the complete FYP kit and the guidance call saved me a lot of time.", date: "Aug 2026" },
  { name: "Daniyal K.", rating: 4, text: "Genuine product at a fair price. Would like more colours of jumper wires.", date: "Aug 2026" },
];

export const testimonials = [
  { name: "Ahmed Khan", role: "BSCS, FAST Islamabad", text: "Got my smart home kit and code the same week. The engineer on WhatsApp explained everything." },
  { name: "Ayesha Siddiqui", role: "BSEE, UET Lahore", text: "Components were original and tested. My supervisor was impressed with the demo." },
  { name: "Talha Mehmood", role: "Maker, Karachi", text: "Fast delivery and honest pricing. My go-to shop for ESP32 boards now." },
];
