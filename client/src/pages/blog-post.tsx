import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Phone, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";
import { SEOHead } from "@/components/seo/seo-head";
import { ArticleSchema, HowToSchema, LocalBusinessSchema } from "@/components/seo/structured-data";

import hotWater1    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.35_PM_1766462914108.jpeg";
import gasUnit      from "@assets/WhatsApp_Image_2025-12-18_at_6.50.36_PM_1766462914109.jpeg";
import drainCleaning from "@assets/WhatsApp_Image_2025-12-18_at_6.52.14_PM_1766462914110.jpeg";
import toiletUnblock from "@assets/WhatsApp_Image_2025-12-18_at_6.52.15_PM_1766462914110.jpeg";
import pvcPipe      from "@assets/WhatsApp_Image_2025-12-18_at_6.52.13_PM_1766462914110.jpeg";
import sewerLine    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(3)_1766462914110.jpeg";
import outdoorTap   from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(2)_1766462914111.jpeg";
import pipeRepair   from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(1)_1766462914111.jpeg";
import waterPipe    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_1766462914111.jpeg";
import tapRepair    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.32_PM_(1)_1766462914112.jpeg";
import bathroomReno from "@assets/WhatsApp_Image_2025-12-18_at_6.50.32_PM_1766462914112.jpeg";

const blogPosts: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
  content: string[];
  relatedPosts: string[];
}> = {
  "how-to-shut-off-water-mains": {
    title: "How to Shut Off Water at the Mains",
    category: "DIY Tutorial",
    readTime: "5 min read",
    date: "2024-01-15",
    image: waterPipe,
    imageAlt: "Water pipe and mains shut-off valve",
    content: [
      "Knowing how to shut off your water at the mains is an essential skill that every homeowner should have. In an emergency like a burst pipe, being able to quickly stop the water flow can save you thousands of dollars in water damage.",
      "## Finding Your Water Meter",
      "Your water meter is typically located at the front of your property, near the street or footpath. It's usually housed in a rectangular box with a lid that can be lifted.",
      "## Steps to Shut Off the Water",
      "1. **Locate the meter box** - Look for a rectangular or round cover near the street boundary of your property.",
      "2. **Open the meter box** - Use a flat screwdriver or meter key to lift the lid. Be careful of any insects or debris inside.",
      "3. **Find the shut-off valve** - There will be a tap or lever on the pipe leading from the meter to your house.",
      "4. **Turn off the valve** - Turn the tap clockwise (righty-tighty) until it stops, or move the lever perpendicular to the pipe.",
      "5. **Verify it's off** - Go inside and turn on a tap to confirm no water is flowing.",
      "## Important Tips",
      "- Know where your meter is BEFORE an emergency happens",
      "- Keep a meter key or screwdriver handy in an accessible location",
      "- Label your shut-off valve for quick identification",
      "- If the valve is stuck or corroded, call a licensed plumber",
      "## When to Call a Professional",
      "If you're unable to locate your meter, the valve is seized, or you're dealing with a major emergency, don't hesitate to call Complete Flow Plumbing for 24/7 emergency assistance.",
    ],
    relatedPosts: ["burst-pipe-emergency-checklist", "check-hidden-leaks-meter-test"],
  },
  "burst-pipe-emergency-checklist": {
    title: "What to Do If You Have a Burst Pipe",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2024-01-10",
    image: pipeRepair,
    imageAlt: "Emergency burst pipe excavation and repair",
    content: [
      "A burst pipe is one of the most stressful plumbing emergencies you can face. Quick action is crucial to minimise water damage and repair costs. Follow this emergency checklist to handle the situation effectively.",
      "## Immediate Steps",
      "1. **Shut off the water** - Turn off the main water supply immediately. This is the most important step.",
      "2. **Turn off electricity** - If water is near electrical outlets or appliances, switch off power at the circuit breaker.",
      "3. **Open taps** - Open cold taps to drain remaining water from the system and reduce pressure.",
      "4. **Collect the water** - Use buckets, towels, and mops to contain and collect leaking water.",
      "5. **Document damage** - Take photos and videos for your insurance claim.",
      "## Protecting Your Property",
      "- Move furniture and valuables away from the affected area",
      "- Use towels around the base of the leak to absorb water",
      "- If the ceiling is bulging with water, carefully puncture it to release water into a bucket",
      "- Open windows to improve ventilation and help drying",
      "## What Causes Burst Pipes?",
      "- Corrosion in older pipes",
      "- Tree root intrusion",
      "- High water pressure",
      "- Freezing temperatures (rare in Sydney but possible in Southern Highlands)",
      "- Poor installation or aged fittings",
      "## Call Emergency Plumber",
      "Once you've contained the immediate damage, call Complete Flow Plumbing for emergency repairs. We're available 24/7 across Sydney and the Southern Highlands.",
    ],
    relatedPosts: ["how-to-shut-off-water-mains", "check-hidden-leaks-meter-test"],
  },
  "how-to-plunge-blocked-toilet": {
    title: "How to Plunge a Blocked Toilet Correctly",
    category: "DIY Tutorial",
    readTime: "3 min read",
    date: "2024-01-05",
    image: toiletUnblock,
    imageAlt: "Blocked toilet repair and plunging technique",
    content: [
      "A blocked toilet is one of the most common plumbing problems, and knowing how to use a plunger correctly can save you an emergency call-out fee. Here's the proper technique.",
      "## Choose the Right Plunger",
      "Not all plungers are created equal. For toilets, you need a flange plunger (with an extended rubber flap) rather than a cup plunger (flat bottom). The flange creates a better seal in the curved toilet bowl.",
      "## The Correct Technique",
      "1. **Don't flush again** - If the toilet is already full, adding more water will cause overflow.",
      "2. **Get a good seal** - Insert the plunger at an angle to remove air, then position the flange into the drain opening.",
      "3. **Push and pull** - Use firm, controlled up-and-down motions. The pull is as important as the push.",
      "4. **Maintain the seal** - Keep the plunger submerged throughout. Don't break the seal.",
      "5. **Be patient** - It may take 15-20 plunges to clear the blockage.",
      "6. **Test with a flush** - Once you feel the blockage release, flush to confirm it's clear.",
      "## When Plunging Doesn't Work",
      "If several minutes of plunging doesn't clear the blockage, there may be a more serious issue:",
      "- A foreign object stuck in the trap",
      "- A blockage further down the drain line",
      "- Tree root intrusion in the sewer line",
      "In these cases, professional equipment like a drain camera or high-pressure jetter is needed. Call Complete Flow Plumbing for expert blocked toilet services.",
    ],
    relatedPosts: ["clear-slow-drain-safely", "blocked-drains-bowral"],
  },
  "clear-slow-drain-safely": {
    title: "How to Clear a Slow Drain Safely",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2023-12-28",
    image: drainCleaning,
    imageAlt: "Slow drain cleaning and unblocking",
    content: [
      "A slow-draining sink or shower is annoying, but before reaching for harsh chemical drain cleaners, try these safer and often more effective methods.",
      "## Why Avoid Chemical Drain Cleaners?",
      "- They can damage older pipes, especially PVC joints",
      "- They're harmful to the environment",
      "- They can cause burns if they splash back",
      "- They often don't work on serious blockages",
      "## Safe Methods to Try First",
      "### Boiling Water",
      "Pour a kettle of boiling water directly down the drain. This can dissolve soap buildup and grease. Repeat 2-3 times.",
      "### Baking Soda and Vinegar",
      "1. Pour 1/2 cup baking soda down the drain",
      "2. Follow with 1/2 cup white vinegar",
      "3. Cover the drain and wait 15-30 minutes",
      "4. Flush with hot water",
      "### Manual Removal",
      "Remove the drain cover and pull out any visible hair or debris. A bent wire coat hanger or drain cleaning tool works well.",
      "### Plunger",
      "A cup plunger can work on sink and shower drains. Block the overflow hole with a wet cloth for better suction.",
      "## When to Call a Plumber",
      "If these methods don't work, or if multiple drains are slow, you may have a bigger issue in your main drain line. Complete Flow Plumbing can use CCTV drain cameras to identify the problem and hydro-jetting to clear it.",
    ],
    relatedPosts: ["how-to-plunge-blocked-toilet", "when-to-book-cctv-drain-inspection"],
  },
  "check-hidden-leaks-meter-test": {
    title: "How to Check for Hidden Leaks (Meter Test)",
    category: "DIY Tutorial",
    readTime: "3 min read",
    date: "2023-12-20",
    image: outdoorTap,
    imageAlt: "Outdoor tap and water meter for leak testing",
    content: [
      "Hidden water leaks can cost you hundreds of dollars in wasted water and cause significant property damage. The water meter test is a simple way to check if you have a leak.",
      "## The Water Meter Test",
      "1. **Turn off all water** - Make sure no taps, toilets, washing machines, or irrigation systems are running.",
      "2. **Read your meter** - Note the current reading, including all numbers and the dial.",
      "3. **Wait 1-2 hours** - Don't use any water during this time.",
      "4. **Read again** - Check the meter reading.",
      "5. **Compare** - If the reading has changed, you likely have a leak.",
      "## Understanding Your Meter",
      "Most water meters have a small triangle or dial that spins when water flows. If this is moving when all water is off, there's definitely a leak.",
      "## Common Hidden Leak Locations",
      "- Underground supply lines",
      "- Toilet cisterns (running constantly)",
      "- Hot water system relief valves",
      "- Irrigation systems",
      "- Under slab plumbing",
      "## Signs of Hidden Leaks",
      "- Unexplained high water bills",
      "- Sound of running water when nothing is on",
      "- Damp or warm spots on floors",
      "- Mould or mildew in unusual places",
      "- Decreased water pressure",
      "## Professional Leak Detection",
      "If you suspect a leak but can't find it, Complete Flow Plumbing uses advanced leak detection equipment including thermal imaging and acoustic listening devices to pinpoint hidden leaks without unnecessary excavation.",
    ],
    relatedPosts: ["low-water-pressure-quick-checks", "how-to-shut-off-water-mains"],
  },
  "low-water-pressure-quick-checks": {
    title: "Why Your Water Pressure is Low (Quick Checks)",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2023-12-15",
    image: tapRepair,
    imageAlt: "Low water pressure tap and valve inspection",
    content: [
      "Low water pressure can make showers frustrating and dishwashing tedious. Before calling a plumber, try these quick checks to identify and possibly fix the issue yourself.",
      "## Check If It's Localised",
      "Is the low pressure affecting just one tap, one bathroom, or the whole house?",
      "- **One tap** - The tap aerator may be clogged",
      "- **One fixture** - The supply line to that fixture may be restricted",
      "- **Whole house** - The issue is likely with your main supply or the water authority",
      "## Quick Fixes to Try",
      "### Clean the Aerator",
      "Unscrew the aerator from the end of the tap and clean out any debris or mineral buildup. Soak in vinegar overnight for stubborn deposits.",
      "### Check the Stop Valve",
      "Make sure the main stop valve (where water enters your property) is fully open. Sometimes these get partially closed accidentally.",
      "### Check the Meter Valve",
      "Similar to the stop valve, ensure the valve at your water meter is fully open.",
      "### Inspect Your Hot Water System",
      "If only hot water pressure is low, the issue may be with your hot water system or its inlet/outlet connections.",
      "## Common Causes of Low Pressure",
      "- Corroded galvanised pipes (common in older homes)",
      "- Partially closed valves",
      "- Leaks in the supply line",
      "- Peak usage times (neighbourhood demand)",
      "- Water authority issues",
      "## When to Call a Plumber",
      "If the quick checks don't solve the problem, you may have corroded pipes, a leak, or pressure regulator issues. Complete Flow Plumbing can diagnose and fix water pressure problems throughout Sydney and the Southern Highlands.",
    ],
    relatedPosts: ["check-hidden-leaks-meter-test", "no-hot-water-troubleshooting"],
  },
  "no-hot-water-troubleshooting": {
    title: "No Hot Water Troubleshooting Guide",
    category: "DIY Tutorial",
    readTime: "5 min read",
    date: "2023-12-10",
    image: hotWater1,
    imageAlt: "Hot water system troubleshooting and repair",
    content: [
      "Waking up to a cold shower is nobody's idea of a good morning. Here's how to troubleshoot your hot water system before calling for repairs.",
      "## Electric Hot Water Systems",
      "### Check the Power",
      "- Is the circuit breaker tripped? Check your switchboard.",
      "- Is the hot water on off-peak tariff? It may not heat until overnight.",
      "- Has there been a power outage?",
      "### Check for Leaks",
      "- Look for water pooling around the base of the unit",
      "- Check the relief valve for dripping",
      "### Reset the System",
      "Some electric systems have a reset button. Press it and wait to see if it starts heating.",
      "## Gas Hot Water Systems",
      "### Check the Pilot Light",
      "- Is the pilot light on? Follow manufacturer instructions to relight it.",
      "- Can you smell gas? If yes, don't try to relight - call a gas fitter immediately.",
      "### Check Gas Supply",
      "- Is other gas appliances working?",
      "- Has the gas been turned off at the meter?",
      "### Check Water Flow",
      "Continuous flow (instantaneous) systems need minimum water flow to activate. Try opening the tap further.",
      "## Solar Hot Water Systems",
      "- Has it been cloudy? Solar systems may need the electric booster activated.",
      "- Is the booster switch on?",
      "- Check the controller for error codes.",
      "## When to Call a Professional",
      "If basic troubleshooting doesn't restore your hot water, the issue likely requires professional repair. Common problems include failed thermostats, heating elements, gas valves, or the tank itself. Complete Flow Plumbing services all brands and types of hot water systems.",
    ],
    relatedPosts: ["low-water-pressure-quick-checks", "signs-of-gas-leak"],
  },
  "signs-of-gas-leak": {
    title: "Signs of a Gas Leak and What to Do Immediately",
    category: "Safety",
    readTime: "3 min read",
    date: "2023-12-05",
    image: gasUnit,
    imageAlt: "Gas unit and gas leak safety inspection",
    content: [
      "A gas leak is a serious safety hazard that requires immediate action. Knowing the warning signs and proper response could save lives.",
      "## Warning Signs of a Gas Leak",
      "### The Smell",
      "Natural gas is odourless, but an additive called mercaptan gives it a distinctive rotten egg or sulphur smell. If you smell this, take it seriously.",
      "### Visual Signs",
      "- Dead or dying plants near gas lines",
      "- Bubbles in water or puddles",
      "- White mist or fog near a gas line",
      "- Dust blowing from the ground",
      "### Sound",
      "- Hissing or whistling near gas appliances or lines",
      "### Physical Symptoms",
      "- Headaches, dizziness, or nausea",
      "- Difficulty breathing",
      "- Fatigue or flu-like symptoms that improve when leaving the area",
      "## What to Do Immediately",
      "1. **Do NOT** create any sparks - no light switches, phones, appliances, or matches",
      "2. **Leave immediately** - Get everyone out of the building",
      "3. **Leave doors open** - Allow gas to escape as you leave",
      "4. **Go to a safe distance** - Move at least 50 metres away",
      "5. **Call 000** - Report the gas leak to emergency services",
      "6. **Call your gas supplier** - They have 24-hour emergency lines",
      "## What NOT to Do",
      "- Don't turn light switches on or off",
      "- Don't use your phone inside the building",
      "- Don't start your car if it's in the garage",
      "- Don't go back inside until cleared by authorities",
      "## Prevention",
      "Have your gas appliances serviced regularly by a licensed gas fitter. Complete Flow Plumbing provides gas safety checks and repairs across Sydney and the Southern Highlands.",
    ],
    relatedPosts: ["no-hot-water-troubleshooting"],
  },
  "blocked-drains-bowral": {
    title: "Blocked Drains in Bowral: Causes & Fixes",
    category: "Local Tips",
    readTime: "4 min read",
    date: "2023-11-28",
    image: drainCleaning,
    imageAlt: "Blocked drain cleaning in Bowral Southern Highlands",
    content: [
      "Bowral and the Southern Highlands have unique plumbing challenges due to local conditions. Here's what causes blocked drains in this area and how to prevent them.",
      "## Common Causes in Bowral",
      "### Tree Roots",
      "The beautiful established gardens of Bowral come with a downside - mature tree roots seeking moisture. European trees, particularly willows and oaks, are notorious for invading sewer lines.",
      "### Old Clay Pipes",
      "Many older Bowral homes still have original clay sewer pipes, which are prone to cracking and root intrusion at the joints.",
      "### Leaf Fall",
      "The deciduous trees that make autumn in Bowral so beautiful also clog stormwater drains with leaves.",
      "### Cold Weather",
      "The colder Highland temperatures can cause grease to solidify more quickly in drain pipes.",
      "## Prevention Tips for Bowral Homes",
      "1. **Know your pipes** - Get a CCTV drain inspection to understand your system",
      "2. **Root treatment** - Consider annual root foaming treatment for vulnerable lines",
      "3. **Gutter guards** - Install guards to prevent leaf buildup",
      "4. **Hot water flush** - Regularly flush drains with hot water to prevent grease buildup",
      "5. **Drain covers** - Use guards on outdoor drains during autumn",
      "## Local Solutions",
      "Complete Flow Plumbing understands the unique challenges of Bowral plumbing. We offer:",
      "- CCTV drain inspections",
      "- Hydro-jetting to clear blockages",
      "- Pipe relining for damaged clay pipes",
      "- Regular maintenance programs",
      "We service all Southern Highlands suburbs including Mittagong, Moss Vale, Bundanoon, and surrounds.",
    ],
    relatedPosts: ["when-to-book-cctv-drain-inspection", "what-is-pipe-relining"],
  },
  "when-to-book-cctv-drain-inspection": {
    title: "When to Book a CCTV Drain Inspection",
    category: "Advice",
    readTime: "4 min read",
    date: "2023-11-20",
    image: pvcPipe,
    imageAlt: "CCTV drain camera inspection of underground pipes",
    content: [
      "CCTV drain inspection uses a small camera to see inside your pipes, revealing problems that would otherwise require expensive excavation to find. Here's when you should consider booking one.",
      "## Signs You Need an Inspection",
      "### Recurring Blockages",
      "If you're calling a plumber regularly for the same blocked drain, a camera inspection can identify the underlying cause - whether it's tree roots, a collapsed pipe, or buildup.",
      "### Slow Drains Throughout the House",
      "When multiple drains are slow, the problem is likely in your main sewer line. A camera can locate exactly where.",
      "### Buying or Selling Property",
      "A pre-purchase drain inspection can reveal expensive hidden problems before settlement. Many buyers request this as part of their due diligence.",
      "### Older Property",
      "If your home is more than 40 years old with original plumbing, an inspection can assess pipe condition and predict future issues.",
      "### After Major Tree Work",
      "Removing large trees can disturb nearby pipes. An inspection confirms no damage occurred.",
      "### Unexplained Sewage Smells",
      "Bad smells from drains may indicate a broken or blocked vent pipe, which the camera can locate.",
      "## What the Inspection Reveals",
      "- Tree root intrusion",
      "- Collapsed or broken pipes",
      "- Pipe material and condition",
      "- Joint separations",
      "- Buildup and blockages",
      "- Incorrect fall (gradient)",
      "## The Inspection Process",
      "A waterproof camera on a flexible cable is inserted into your drain. You'll see real-time footage on a monitor, and we provide a full report with recommendations. Complete Flow Plumbing offers comprehensive CCTV drain inspections throughout Sydney and the Southern Highlands.",
    ],
    relatedPosts: ["what-is-pipe-relining", "blocked-drains-bowral"],
  },
  "what-is-pipe-relining": {
    title: "What is Pipe Relining? A Simple Explanation",
    category: "Advice",
    readTime: "5 min read",
    date: "2023-11-15",
    image: pvcPipe,
    imageAlt: "Pipe relining with new PVC liner inside old pipe",
    content: [
      "Pipe relining is a modern \"no-dig\" method of repairing damaged pipes without excavating your property. Here's how it works and when it's the right solution.",
      "## How Pipe Relining Works",
      "1. **Inspection** - A CCTV camera assesses the damage and pipe condition",
      "2. **Cleaning** - The pipe is cleared of debris and roots using hydro-jetting",
      "3. **Liner preparation** - A flexible liner coated with resin is prepared to the exact length",
      "4. **Installation** - The liner is inserted and inflated against the pipe walls",
      "5. **Curing** - The resin hardens, creating a new pipe within the old one",
      "6. **Final inspection** - A camera confirms proper installation",
      "## Benefits of Pipe Relining",
      "### No Excavation",
      "- No digging up your lawn, driveway, or garden",
      "- No damage to landscaping or structures",
      "- No restoration costs",
      "### Durability",
      "- The new liner typically lasts 50+ years",
      "- It's resistant to tree roots and corrosion",
      "- Joints are sealed, preventing future intrusion",
      "### Cost-Effective",
      "- Often cheaper than traditional dig-and-replace",
      "- Faster installation means less labour",
      "- No restoration costs for property damage",
      "## When Relining is Suitable",
      "- Cracked or broken pipes",
      "- Root-damaged pipes",
      "- Leaking joints",
      "- Corroded pipes",
      "- Pipes with minor bellies or sags",
      "## When Relining Isn't Possible",
      "- Completely collapsed pipes",
      "- Severely misaligned pipes",
      "- Very large diameter pipes",
      "Complete Flow Plumbing offers professional pipe relining services. We'll inspect your pipes and recommend whether relining is the right solution for your situation.",
    ],
    relatedPosts: ["when-to-book-cctv-drain-inspection", "prevent-tree-root-damage-pipes"],
  },
  "prevent-tree-root-damage-pipes": {
    title: "Preventing Tree Root Damage in Pipes",
    category: "Maintenance",
    readTime: "4 min read",
    date: "2023-11-10",
    image: sewerLine,
    imageAlt: "Sewer line excavation revealing tree root pipe damage",
    content: [
      "Tree roots are the number one cause of sewer line damage in Australian homes. Prevention is much cheaper than repair - here's how to protect your pipes.",
      "## Why Roots Invade Pipes",
      "Tree roots naturally seek water and nutrients. Your sewer line provides both, plus the joints and cracks emit vapour that roots can detect. Once a root finds a way in, it grows rapidly in the ideal conditions.",
      "## High-Risk Trees",
      "Some trees are more aggressive than others:",
      "- Willows (the worst offenders)",
      "- Poplars and cottonwoods",
      "- Figs and Morton Bay figs",
      "- Eucalyptus",
      "- Paperbark and melaleucas",
      "- Bamboo (not technically a tree but highly invasive)",
      "## Prevention Strategies",
      "### Know Your Pipes",
      "Get a drain inspection to understand where your sewer line runs and its condition. This helps you plan tree placement and identify vulnerable areas.",
      "### Smart Planting",
      "- Plant large trees at least 3 metres from sewer lines",
      "- Choose slow-growing, less aggressive species near pipes",
      "- Consider installing root barriers when planting",
      "### Regular Maintenance",
      "- Annual or bi-annual camera inspections for older systems",
      "- Preventative root treatment with copper sulphate or foaming root killer",
      "- Clear any early root intrusion before it becomes major",
      "### Upgrade Vulnerable Pipes",
      "If your pipes are old clay or damaged, consider:",
      "- Pipe relining to create a seamless, root-resistant barrier",
      "- Pipe replacement in critical areas",
      "## Signs of Root Intrusion",
      "- Recurring drain blockages",
      "- Gurgling sounds from drains",
      "- Slow draining throughout the house",
      "- Sewer smells in the yard",
      "Complete Flow Plumbing offers root cutting, preventative maintenance, and pipe relining to protect your home from tree root damage.",
    ],
    relatedPosts: ["what-is-pipe-relining", "when-to-book-cctv-drain-inspection"],
  },
  "emergency-plumber-sydney-when-to-call": {
    title: "Emergency Plumber Sydney: When to Call vs DIY",
    category: "Advice",
    readTime: "5 min read",
    date: "2024-02-10",
    image: sewerLine,
    imageAlt: "Emergency plumber excavation and repair in Sydney",
    content: [
      "Not every plumbing problem requires an emergency callout. Knowing when to call an emergency plumber in Sydney — and when to handle it yourself — can save you significant money while keeping your home safe.",
      "## Always Call an Emergency Plumber Immediately For:",
      "- **Burst pipes** — Turn off the mains first, then call immediately. Water damage escalates rapidly.",
      "- **Gas leaks** — Leave the property, don't touch any switches, and call a licensed gas plumber.",
      "- **Sewage backing up** — Health hazard. Do not use any fixtures. Call immediately.",
      "- **No hot water in winter with young children or elderly residents** — Priority same-day service.",
      "- **Flooding from broken appliances or pipes** — Every minute counts.",
      "- **Toilet overflow that won't stop** — Can't be shut off at the cistern.",
      "## Can Usually Wait Until Business Hours:",
      "- A single dripping tap (turn off under-sink valve if annoying)",
      "- Slow drain in one sink (try a plunger first)",
      "- Running toilet (turn off at wall valve temporarily)",
      "- Low water pressure in one fixture",
      "- Minor leak under sink (put a bucket under it)",
      "## The DIY Test",
      "Before calling anyone, ask yourself:",
      "1. Is there any risk of electrical hazard from water?",
      "2. Could this get significantly worse overnight?",
      "3. Does it affect the ability to use essential facilities (toilet, hot water)?",
      "If any answer is yes, call a plumber. Complete Flow Plumbing provides 24/7 emergency plumbing across Sydney with no call-out fee during business hours.",
      "## What to Expect from an Emergency Sydney Plumber",
      "A reputable emergency plumber will arrive within 60 minutes, diagnose the issue on the spot, provide a written quote before starting work, and fix the problem completely — not just temporarily.",
      "Always ask for their NSW plumbing licence number before they start work.",
    ],
    relatedPosts: ["burst-pipe-emergency-checklist", "signs-of-gas-leak"],
  },
  "how-much-does-a-plumber-cost-sydney": {
    title: "How Much Does a Plumber Cost in Sydney? (2024 Guide)",
    category: "Pricing",
    readTime: "6 min read",
    date: "2024-02-05",
    image: bathroomReno,
    imageAlt: "Plumbing work costs and bathroom renovation Sydney",
    content: [
      "Sydney plumbing costs vary widely depending on the job, timing, and which plumber you call. Here's an honest breakdown of what you can expect to pay in 2024.",
      "## Typical Sydney Plumbing Prices",
      "### Standard Callout (Business Hours)",
      "Most Sydney plumbers charge a callout fee of $80–$150 plus labour. Some, like Complete Flow Plumbing, charge no callout fee during business hours.",
      "### Common Job Prices in Sydney",
      "- **Leaking tap repair**: $120–$250",
      "- **Blocked drain (simple)**: $150–$350",
      "- **Blocked drain (CCTV + hydro jet)**: $350–$700",
      "- **Hot water system replacement (gas)**: $1,200–$2,500",
      "- **Hot water system replacement (electric)**: $800–$1,800",
      "- **Toilet replacement**: $400–$800",
      "- **Pipe relining (per metre)**: $400–$700",
      "- **Gas appliance installation**: $200–$600",
      "- **Emergency callout (after hours)**: Add $150–$300 surcharge",
      "## What Affects Sydney Plumbing Costs",
      "**Location**: Inner Sydney suburbs can attract higher rates than outer western suburbs. Southern Highlands is typically similar to outer Sydney pricing.",
      "**Urgency**: After-hours and weekend callouts add 50–100% to standard rates.",
      "**Access**: Difficult-to-reach pipes (under slabs, inside walls) add labour time.",
      "**Age of home**: Older homes with clay pipes or mixed systems cost more to work on.",
      "## How to Avoid Being Overcharged",
      "- Always get a written quote before work starts",
      "- Ask if the quote is 'fixed price' or 'hourly'",
      "- Verify the plumber's NSW licence on the Fair Trading website",
      "- Get 2–3 quotes for major jobs (hot water replacement, pipe relining)",
      "- Check Google reviews from verified local customers",
      "Complete Flow Plumbing provides upfront, fixed-price quotes with no hidden fees. Call us for a free estimate.",
    ],
    relatedPosts: ["emergency-plumber-sydney-when-to-call", "no-hot-water-troubleshooting"],
  },
  "best-hot-water-system-sydney-homes": {
    title: "Best Hot Water System for Sydney Homes in 2024",
    category: "Advice",
    readTime: "7 min read",
    date: "2024-01-28",
    image: hotWater1,
    imageAlt: "Best hot water systems for Sydney homes - Rheem comparison",
    content: [
      "Choosing the right hot water system for your Sydney home can save you thousands over 10 years. With gas, electric, heat pump, and solar options all available, here's what actually suits Sydney's conditions.",
      "## Sydney's Climate Considerations",
      "Sydney's mild coastal climate (average 17°C) makes it ideal for heat pump systems and solar hot water. The Southern Highlands is cooler (average 12°C), which slightly reduces solar efficiency but heat pumps still perform well.",
      "## The 4 Main Options",
      "### 1. Gas Continuous Flow (Our Top Pick for Most Sydney Homes)",
      "**Best for**: Families, high-demand households, those with gas connected",
      "**Pros**: Endless hot water, energy efficient, smaller upfront cost than solar",
      "**Cons**: Requires gas connection, annual service recommended",
      "**Brands we recommend**: Rinnai, Rheem, Bosch",
      "**Cost installed**: $1,400–$2,200",
      "### 2. Heat Pump",
      "**Best for**: Homes without gas, environmentally conscious households",
      "**Pros**: 3–4x more efficient than electric, lower running costs",
      "**Cons**: Higher upfront cost, needs space for outdoor unit",
      "**Cost installed**: $2,500–$4,000 (rebates available)",
      "### 3. Solar Hot Water",
      "**Best for**: Homes with north-facing roof, high hot water usage",
      "**Pros**: Very low running costs, government rebates available",
      "**Cons**: Needs roof space, backup element needed for cloudy days",
      "**Cost installed**: $3,000–$6,000",
      "### 4. Electric Storage",
      "**Best for**: Budget-conscious buyers, renters (short term)",
      "**Pros**: Lowest upfront cost",
      "**Cons**: Most expensive to run — avoid unless no other option",
      "**Cost installed**: $700–$1,500",
      "## Government Rebates Available in NSW",
      "Heat pump and solar systems qualify for Small-scale Technology Certificates (STCs) which reduce the purchase price by $300–$1,500 depending on system size. Ask your plumber to apply these at point of sale.",
      "Complete Flow Plumbing installs and services all brands. Call us for a recommendation based on your home's specific needs.",
    ],
    relatedPosts: ["no-hot-water-troubleshooting", "how-much-does-a-plumber-cost-sydney"],
  },
  "blocked-drains-sydney-tree-roots": {
    title: "Blocked Drains Sydney: Why Tree Roots Are the #1 Cause",
    category: "Local Tips",
    readTime: "5 min read",
    date: "2024-01-22",
    image: sewerLine,
    imageAlt: "Tree root blocked drain excavation in Sydney suburb",
    content: [
      "If you live in Sydney's older suburbs — Newtown, Marrickville, Parramatta, Campbelltown — your blocked drain is almost certainly caused by tree roots. Here's why, and what you should do about it.",
      "## Why Tree Roots Love Sydney's Old Pipes",
      "Most homes built before 1980 in Sydney have clay or terracotta sewer pipes. These joints crack over time, and tree roots sense the moisture and nutrients inside. They infiltrate through hairline cracks and grow rapidly.",
      "Sydney's water table and clay soil create the perfect conditions for this. Once roots enter, they quickly form a net that catches toilet paper, grease, and debris — creating a full blockage.",
      "## Warning Signs of Root Intrusion",
      "- Recurring blocked drains (every 6–12 months)",
      "- Gurgling sounds from toilet when other drains are used",
      "- Multiple drains blocking at once",
      "- Slow draining throughout the house",
      "- Sewer smell in garden or yard",
      "## The Most Common Culprit Trees in Sydney",
      "- Ficus (fig trees) — Most destructive, found everywhere in inner Sydney",
      "- Jacaranda — Beautiful but aggressive roots",
      "- Bottlebrush — Common in local gardens",
      "- Liquid amber — Popular street tree",
      "- Eucalyptus — Especially problematic in Hills District and Campbelltown",
      "## What a Sydney Plumber Will Do",
      "**Step 1: CCTV Drain Camera Inspection** — Confirms root intrusion and shows pipe condition",
      "**Step 2: Hydro Jetting** — High-pressure water cuts and flushes roots out",
      "**Step 3: Assessment** — Are pipes repairable, or do they need relining/replacement?",
      "**Step 4: Pipe Relining (if needed)** — Creates a seamless epoxy liner inside old pipes, permanently blocking root entry",
      "## Prevention",
      "Annual hydro jetting prevents roots from blocking completely. CCTV inspection every 2–3 years on older Sydney homes is strongly recommended.",
      "Complete Flow Plumbing clears blocked drains across Sydney with same-day service. We use CCTV to diagnose the real cause — not just clear the symptom.",
    ],
    relatedPosts: ["when-to-book-cctv-drain-inspection", "what-is-pipe-relining"],
  },
  "gas-plumber-sydney-licence-requirements": {
    title: "Gas Plumber Sydney: What Work Requires a Licensed Plumber?",
    category: "Safety",
    readTime: "4 min read",
    date: "2024-01-18",
    image: gasUnit,
    imageAlt: "Licensed gas plumber installing gas unit in Sydney",
    content: [
      "Gas work in NSW is regulated for a very good reason — incorrect gas installations kill people. Here's exactly what requires a licensed gas plumber in Sydney, and why you should never attempt DIY gas work.",
      "## What the Law Says",
      "Under the NSW Gas and Electricity (Consumer Safety) Act, all gas work must be performed by a licensed gas plumber or gas fitter. Attempting DIY gas work carries fines up to $110,000 for individuals and can void your home insurance.",
      "## Work That ALWAYS Requires a Licensed Gas Plumber",
      "- Installing or connecting a gas cooktop, oven, or stove",
      "- Installing or replacing a gas hot water system",
      "- Installing or repairing gas heaters and fireplaces",
      "- Connecting gas to a new barbecue point",
      "- Any work on gas meters or regulators",
      "- Installing gas lines to new rooms or extensions",
      "- Pressure testing gas lines after any work",
      "- Repairing gas leaks (call immediately — this is an emergency)",
      "## What You Can DIY",
      "- Connecting and disconnecting bayonet-type appliances (BBQ, portable heater)",
      "- Replacing a gas cylinder on a BBQ",
      "## How to Verify a Gas Licence in NSW",
      "Visit the NSW Fair Trading licence check website (onlineservices.fairtrading.nsw.gov.au) and search the plumber's name or licence number. Always verify before allowing gas work.",
      "## After Gas Work is Complete",
      "Your licensed plumber must provide a Certificate of Compliance (CoC) for all gas work. Keep this document — you'll need it for insurance claims and when selling your home.",
      "Complete Flow Plumbing holds all required NSW gas fitting licences. We provide Certificates of Compliance for every job.",
    ],
    relatedPosts: ["signs-of-gas-leak", "emergency-plumber-sydney-when-to-call"],
  },
  "pipe-relining-vs-replacement-sydney": {
    title: "Pipe Relining vs Pipe Replacement: Which Is Better for Sydney Homes?",
    category: "Advice",
    readTime: "6 min read",
    date: "2024-01-12",
    image: pvcPipe,
    imageAlt: "Pipe relining vs pipe replacement comparison Sydney",
    content: [
      "If your Sydney home has damaged or root-infested pipes, you've probably been told you need either pipe relining or full pipe replacement. Here's an honest comparison to help you decide.",
      "## What Is Pipe Relining?",
      "Pipe relining is a no-dig repair method where a flexible epoxy liner is inserted into the damaged pipe and inflated to create a seamless new pipe within the old one. It requires no excavation — your garden, driveway, and landscaping stay intact.",
      "## What Is Pipe Replacement?",
      "Traditional pipe replacement involves digging up the ground above the pipe, removing the old damaged pipe, and installing new PVC or HDPE pipe. Disruptive but sometimes necessary.",
      "## Pipe Relining: Pros & Cons",
      "**Pros:**",
      "- No digging — garden, tiles, and concrete stay intact",
      "- Often faster (1–2 days vs weeks for replacement)",
      "- 50-year product warranty on quality liners",
      "- Creates a seamless barrier against future root intrusion",
      "- Can repair multiple sections in one job",
      "**Cons:**",
      "- More expensive per metre than traditional pipe ($400–$700/m vs $150–$350/m)",
      "- Not suitable for collapsed pipes or severely misaligned joints",
      "- Slightly reduces pipe diameter",
      "## Pipe Replacement: When It's Necessary",
      "Relining isn't always possible. You'll need full replacement when:",
      "- The pipe has completely collapsed",
      "- The pipe has moved significantly out of alignment",
      "- The pipe diameter is too small for lining equipment",
      "- Large sections need replacement (sometimes cheaper overall)",
      "## The Sydney Context",
      "Sydney's inner suburbs (Newtown, Marrickville, Parramatta) are full of pre-1950 clay pipes. Pipe relining is extremely popular here because excavating established gardens and concrete driveways is enormously disruptive and expensive.",
      "In newer suburbs (Campbelltown, Camden), pipes are often PVC which is less prone to root intrusion but still benefits from relining when damaged.",
      "## Cost Comparison for a Typical Sydney Job",
      "**50m of damaged sewer pipe:**",
      "- Pipe relining: $20,000–$35,000 (but no excavation costs)",
      "- Full replacement: $15,000–$25,000 pipe + $10,000–$30,000 excavation, restoration = $25,000–$55,000 total",
      "Complete Flow Plumbing provides CCTV assessment and honest recommendations — we'll tell you which option actually suits your situation.",
    ],
    relatedPosts: ["what-is-pipe-relining", "blocked-drains-sydney-tree-roots"],
  },
  "hot-water-not-working-sydney": {
    title: "No Hot Water in Sydney? Here's What to Check First",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2024-01-08",
    image: hotWater1,
    imageAlt: "No hot water system check and repair Sydney",
    content: [
      "Waking up to cold water is miserable, especially in Sydney's cooler months. Before calling a plumber, try these quick checks — you might save yourself a callout fee.",
      "## For Gas Hot Water Systems",
      "### Check 1: Is the pilot light on?",
      "Look at the front of your gas hot water unit. There should be a small flame visible through a viewing window. If it's out, follow the relight instructions on the unit label (usually hold the button for 30–60 seconds while pressing ignite).",
      "### Check 2: Is the gas on?",
      "Check that your gas meter tap is in the 'on' position (parallel to the pipe). If you have a gas bottle, check it isn't empty.",
      "### Check 3: Continuous flow units",
      "If you have a Rinnai or similar continuous flow system, check there's power to it (the display should show something), and that the tap flow rate is high enough (some units need minimum pressure).",
      "## For Electric Hot Water Systems",
      "### Check 1: Circuit breaker",
      "Go to your switchboard. Find the circuit breaker labelled 'Hot Water' or 'HWS'. If it's tripped to the middle position, switch it fully off then back on.",
      "### Check 2: Off-peak timer",
      "Some electric systems run on off-peak tariffs and heat water at night. Check your meter — if it's a controlled load system, hot water may have run out if usage was unusually high.",
      "### Check 3: Temperature/pressure relief valve",
      "The T&P valve on the side of your tank may have discharged. This is a safety device. If it's leaking continuously, there's a pressure or temperature problem — call a plumber.",
      "## For Heat Pump Systems",
      "Check that the outdoor unit has power and isn't blocked. Heat pumps need airflow around them. In very cold weather (below 5°C), some systems run less efficiently.",
      "## When to Call a Plumber",
      "Call Complete Flow Plumbing if:",
      "- The pilot light won't relight after 3 attempts",
      "- The circuit breaker keeps tripping",
      "- The system is more than 10 years old (likely nearing end of life)",
      "- Water is discoloured or smells",
      "- You hear banging or rumbling from the tank",
      "We offer same-day hot water repairs across Sydney and Southern Highlands.",
    ],
    relatedPosts: ["best-hot-water-system-sydney-homes", "no-hot-water-troubleshooting"],
  },
  "plumber-campbelltown-local-guide": {
    title: "Finding a Reliable Plumber in Campbelltown: Local Guide",
    category: "Local Tips",
    readTime: "4 min read",
    date: "2024-01-02",
    image: tapRepair,
    imageAlt: "Licensed plumber tap repair in Campbelltown",
    content: [
      "Campbelltown and the surrounding Macarthur region is one of Sydney's fastest-growing areas. With a mix of established older homes and new developments, knowing how to find a good local plumber is essential.",
      "## What to Look For in a Campbelltown Plumber",
      "### 1. NSW Plumbing Licence",
      "Always verify the licence on the NSW Fair Trading website before hiring. Licensed plumbers must carry professional indemnity and public liability insurance.",
      "### 2. Local Knowledge",
      "Campbelltown and surrounding suburbs (Narellan, Camden, Ingleburn, Minto) have a mix of soil types and pipe systems. A local plumber will know whether your area has predominantly clay or PVC pipes, common local drainage issues, and the best solutions.",
      "### 3. Same-Day Availability",
      "With Campbelltown's rapid population growth, response times from plumbers have increased. Look for a plumber who specifically services the Macarthur region with a local team — not one travelling from the city.",
      "## Common Plumbing Issues in Campbelltown Area",
      "- **Blocked drains**: Tree roots in older Campbelltown suburbs (particularly established areas near the Nepean River)",
      "- **Hot water failures**: Both older storage systems and newer continuous flow units common in the area",
      "- **New estate plumbing issues**: Pressure problems and appliance connections in Oran Park, Gregory Hills, and Mount Annan",
      "- **Gas fitting**: High proportion of gas-connected homes across the region",
      "## Red Flags to Avoid",
      "- No licence number on quote or vehicle",
      "- Won't provide written quote before starting",
      "- Cash only with no receipt",
      "- Excessive callout fees on top of labour",
      "- Can't provide references or has no Google reviews",
      "## About Complete Flow Plumbing in Campbelltown",
      "Complete Flow Plumbing services all of Campbelltown, Narellan, Camden, Oran Park, Gregory Hills, Minto, Ingleburn, and surrounding suburbs. Same-day service, no call-out fee during business hours, and upfront fixed pricing.",
    ],
    relatedPosts: ["how-much-does-a-plumber-cost-sydney", "emergency-plumber-sydney-when-to-call"],
  },
};

function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderContent(content: string[]) {
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`list-${listKey}`} className="list-disc pl-6 mb-4 space-y-1">
            {listItems.map((item, i) => (
              <li key={i} className="text-foreground/80">{formatText(item)}</li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${listKey}`} className="list-decimal pl-6 mb-4 space-y-1">
            {listItems.map((item, i) => (
              <li key={i} className="text-foreground/80">{formatText(item)}</li>
            ))}
          </ol>
        );
      }
      listKey++;
      listItems = [];
      listType = null;
    }
  };

  content.forEach((line, index) => {
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl font-bold text-foreground mt-8 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-semibold text-foreground mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(line.replace('- ', ''));
    } else if (line.match(/^\d+\.\s/)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(line.replace(/^\d+\.\s/, ''));
    } else {
      flushList();
      elements.push(
        <p key={`p-${index}`} className="text-foreground/80 mb-4 leading-relaxed">
          {formatText(line)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <Layout>
        <SEOHead
          title="Blog Post Not Found"
          description="The requested blog post could not be found."
          canonical={`/blog/${slug}`}
        />
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the blog post you're looking for.
            </p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "DIY Tutorial":
        return "bg-primary/10 text-primary";
      case "Safety":
        return "bg-destructive/10 text-destructive";
      case "Local Tips":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const relatedPostsData = post.relatedPosts
    .map(relatedSlug => blogPosts[relatedSlug] ? { slug: relatedSlug, ...blogPosts[relatedSlug] } : null)
    .filter(Boolean);

  return (
    <Layout>
      <SEOHead
        title={`${post.title} | Plumbing Tips`}
        description={post.content[0]}
        canonical={`/blog/${slug}`}
        keywords={[
          post.category.toLowerCase(), 
          "plumbing tips", 
          "diy plumbing", 
          "sydney plumber",
          "plumbing guide",
          "how to fix plumbing",
          "plumbing advice sydney",
          "southern highlands plumber tips"
        ]}
      />
      <LocalBusinessSchema />
      <ArticleSchema 
        title={post.title}
        description={post.content[0]}
        datePublished={post.date}
      />
      {post.category === "DIY Tutorial" && (
        <HowToSchema 
          title={post.title}
          steps={post.content.filter(line => line.match(/^\d+\./))}
        />
      )}

      <article className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
            data-testid="back-to-blog"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          <header className="mb-8">
            <Badge className={`mb-4 ${getCategoryColor(post.category)}`}>
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-AU', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Hero image */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {renderContent(post.content)}
          </div>

          <Card className="mt-12 p-6 bg-primary text-primary-foreground">
            <h3 className="font-bold text-lg mb-2">Need Professional Help?</h3>
            <p className="text-primary-foreground/90 mb-4">
              If you're dealing with a plumbing issue beyond DIY, our licensed plumbers are ready to help 24/7.
            </p>
            <Button asChild variant="secondary">
              <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call {BUSINESS_INFO.phone}
              </a>
            </Button>
          </Card>

          {relatedPostsData.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid gap-4">
                {relatedPostsData.map((related: any) => (
                  <Link 
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="flex items-center justify-between p-4 rounded-md border border-border hover-elevate"
                    data-testid={`related-${related.slug}`}
                  >
                    <span className="font-medium text-foreground">{related.title}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
