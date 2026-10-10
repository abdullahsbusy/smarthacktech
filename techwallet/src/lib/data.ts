export type Category = { slug: string; name: string; blurb: string };
export type Product = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  compare?: number;
  stock: number;
  tag?: string;
  short: string;
  specs: [string, string][];
};

export const categories: Category[] = [
  { slug: "esp32", name: "ESP32 & ESP8266", blurb: "WiFi + Bluetooth boards" },
  { slug: "arduino", name: "Arduino", blurb: "Uno, Nano, Mega & clones" },
  { slug: "raspberry-pi", name: "Raspberry Pi", blurb: "Boards, cases, power" },
  { slug: "sensors", name: "Sensors", blurb: "Temperature, motion, gas" },
  { slug: "motors", name: "Motors & Drivers", blurb: "Servo, DC, stepper" },
  { slug: "displays", name: "Displays", blurb: "OLED, LCD, TFT" },
  { slug: "power", name: "Power & Modules", blurb: "Relays, regulators, batteries" },
  { slug: "kits", name: "FYP Kits", blurb: "Complete project bundles" },
];

export const products: Product[] = [
  { slug: "esp32-devkit-v1", name: "ESP32 DevKit V1 (30-pin)", category: "esp32", brand: "Espressif", price: 1450, compare: 1750, stock: 48, tag: "Best seller", short: "Dual-core WiFi + Bluetooth microcontroller board for IoT projects.", specs: [["Chip", "ESP32-WROOM-32"], ["CPU", "Dual-core 240 MHz"], ["Wireless", "WiFi 802.11 b/g/n, BLE 4.2"], ["GPIO", "25 usable"], ["Operating voltage", "3.3 V"], ["Interface", "UART, SPI, I2C, ADC, DAC"]] },
  { slug: "esp8266-nodemcu", name: "NodeMCU ESP8266 CP2102", category: "esp32", brand: "Ai-Thinker", price: 850, stock: 62, short: "Low-cost WiFi board, ideal for simple sensor nodes.", specs: [["Chip", "ESP8266 (ESP-12E)"], ["CPU", "80 MHz"], ["Wireless", "WiFi 802.11 b/g/n"], ["GPIO", "11 usable"], ["USB bridge", "CP2102"]] },
  { slug: "arduino-uno-r3", name: "Arduino Uno R3 (Compatible)", category: "arduino", brand: "Generic", price: 1250, stock: 35, short: "The classic board for learning and prototyping.", specs: [["MCU", "ATmega328P"], ["Clock", "16 MHz"], ["Digital I/O", "14"], ["Analog inputs", "6"], ["Operating voltage", "5 V"]] },
  { slug: "arduino-nano", name: "Arduino Nano V3", category: "arduino", brand: "Generic", price: 780, stock: 54, short: "Breadboard-friendly compact Arduino.", specs: [["MCU", "ATmega328P"], ["Clock", "16 MHz"], ["Digital I/O", "14"], ["USB", "CH340"]] },
  { slug: "raspberry-pi-5-8gb", name: "Raspberry Pi 5 (8GB)", category: "raspberry-pi", brand: "Raspberry Pi", price: 38500, stock: 6, tag: "Low stock", short: "Fastest Raspberry Pi yet for vision, AI and servers.", specs: [["CPU", "Quad-core Cortex-A76 2.4 GHz"], ["RAM", "8 GB LPDDR4X"], ["Wireless", "WiFi 5, Bluetooth 5.0"], ["Video", "2x micro-HDMI 4Kp60"]] },
  { slug: "raspberry-pi-4-4gb", name: "Raspberry Pi 4 Model B (4GB)", category: "raspberry-pi", brand: "Raspberry Pi", price: 24500, stock: 12, short: "Reliable all-rounder for projects and learning.", specs: [["CPU", "Quad-core Cortex-A72 1.8 GHz"], ["RAM", "4 GB LPDDR4"], ["Wireless", "WiFi 5, Bluetooth 5.0"]] },
  { slug: "dht22-sensor", name: "DHT22 Temperature & Humidity Sensor", category: "sensors", brand: "Aosong", price: 690, stock: 80, short: "Accurate digital temperature and humidity sensing.", specs: [["Temp range", "-40 to 80 °C"], ["Humidity", "0-100% RH"], ["Accuracy", "±0.5 °C, ±2% RH"], ["Supply", "3.3-5 V"]] },
  { slug: "hc-sr04", name: "HC-SR04 Ultrasonic Sensor", category: "sensors", brand: "Generic", price: 260, stock: 120, short: "Distance measurement from 2 cm to 400 cm.", specs: [["Range", "2-400 cm"], ["Supply", "5 V"], ["Interface", "Trig / Echo"]] },
  { slug: "mq2-gas-sensor", name: "MQ-2 Gas / Smoke Sensor Module", category: "sensors", brand: "Generic", price: 340, stock: 40, short: "Detects LPG, smoke, propane and hydrogen.", specs: [["Detects", "LPG, smoke, H2, CO"], ["Supply", "5 V"], ["Output", "Analog + Digital"]] },
  { slug: "sg90-servo", name: "SG90 Micro Servo Motor", category: "motors", brand: "TowerPro", price: 320, stock: 95, short: "Lightweight 180° servo for robotics and mechanisms.", specs: [["Torque", "1.8 kg·cm"], ["Rotation", "180°"], ["Supply", "4.8-6 V"]] },
  { slug: "l298n-driver", name: "L298N Dual Motor Driver", category: "motors", brand: "Generic", price: 480, stock: 44, short: "Drive two DC motors or one stepper.", specs: [["Channels", "2"], ["Max current", "2 A / channel"], ["Logic voltage", "5 V"]] },
  { slug: "oled-096-i2c", name: "0.96 inch OLED Display I2C", category: "displays", brand: "Generic", price: 640, stock: 70, short: "Crisp 128x64 display, only four wires.", specs: [["Resolution", "128 x 64"], ["Interface", "I2C"], ["Driver", "SSD1306"]] },
  { slug: "relay-4ch", name: "4-Channel Relay Module 5V", category: "power", brand: "Generic", price: 720, stock: 30, short: "Switch mains appliances from a microcontroller.", specs: [["Channels", "4"], ["Coil voltage", "5 V"], ["Contact rating", "10 A 250 VAC"]] },
  { slug: "kit-smart-home", name: "Smart Home Automation FYP Kit", category: "kits", brand: "TechWallet", price: 7900, compare: 9400, stock: 15, tag: "FYP kit", short: "ESP32, relays, sensors and app-ready code for a full smart home FYP.", specs: [["Includes", "ESP32, 4ch relay, DHT22, PIR, LDR, wires"], ["Code", "Provided + documentation"], ["Support", "1 consultation call"]] },
];

export const fypIdeas = [
  { slug: "smart-agriculture", title: "Smart Agriculture Monitoring", dept: "Electrical / CS", level: "Medium", budget: "PKR 8-12k" },
  { slug: "smart-home", title: "IoT Based Smart Home", dept: "CS / Software", level: "Easy", budget: "PKR 6-9k" },
  { slug: "patient-monitoring", title: "Patient Health Monitoring", dept: "Biomedical / EE", level: "Hard", budget: "PKR 12-18k" },
  { slug: "line-follower-robot", title: "Autonomous Line-Follower Robot", dept: "Mechatronics", level: "Medium", budget: "PKR 7-10k" },
];

export const pkr = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
