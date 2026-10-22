import V2Home from "@/components/v2/V2Home";

// Alternative home page for comparing the revamp with the current site
export const metadata = {
  title: "Studio Ajid (revamp preview)",
  robots: { index: false },
};

export default function V2Page() {
  return <V2Home />;
}
