import { InternalPageTemplate } from "@/components/InternalPageTemplate";

// TODO: set the real monitoring station system URL, or replace this with
// real data/charts once available.
export default function MonitoringStationPageEn() {
  return (
    <InternalPageTemplate
      title="Monitoring Station"
      description="Meteorological and hydrological monitoring data for the plant."
      externalUrl=""
      externalLabel="View monitoring data"
    />
  );
}
