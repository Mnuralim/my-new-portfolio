import { ogCard, ogSize } from "@/lib/og-card";

export const alt = "Izzy, IT Engineer & Full Stack Developer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ title: "Build. Deploy. Solve.", kicker: "IT Engineer & Full Stack Developer" });
}
