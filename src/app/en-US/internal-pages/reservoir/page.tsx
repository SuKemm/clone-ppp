import { InternalPageTemplate } from "@/components/InternalPageTemplate";

// TODO: set externalUrl / children with real reservoir data once available
// (water level, flow rate, ...).
export default function ReservoirPageEn() {
  return (
    <InternalPageTemplate
      title="Reservoir"
      description="Water level and flow rate information for the plant's reservoir."
      externalUrl=""
      externalLabel="View reservoir information"
    />
  );
}
