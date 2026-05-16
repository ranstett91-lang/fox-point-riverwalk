export type ResourceType = 'pdf' | 'web';

export interface Resource {
  title: string;
  file: string;
  type: ResourceType;
  label: string;
  size: string;
  description: string;
  source: string;
}

export const resources: Resource[] = [
  {
    title: 'Amtrak Climate Vulnerability Assessment Summary',
    file: '/docs/reference/amtrak-climate-vulnerability-assessment-summary-2022.pdf',
    type: 'pdf',
    label: 'Report',
    size: '60.1 MB',
    description:
      'An Amtrak report on heat, storms, wind, and rising water across the corridor. It names Wilmington as a high-risk shoreline area.',
    source: 'Main Amtrak source on climate risk',
  },
  {
    title: 'Amtrak Climate Resilience Strategic Plan',
    file: '/docs/reference/amtrak-climate-resilience-strategic-plan-2022.pdf',
    type: 'pdf',
    label: 'Report',
    size: '16.3 MB',
    description:
      "Amtrak’s main plan for dealing with stronger storms, hotter weather, and rising water.",
    source: 'Main Amtrak plan for climate response',
  },
  {
    title: 'Phase III NEC Climate Change Pilot Study Adaptation Plan',
    file: '/docs/reference/nec-climate-change-pilot-adaptation-plan-2017.pdf',
    type: 'pdf',
    label: 'Report',
    size: '18.7 MB',
    description:
      'An earlier Amtrak plan focused on the Wilmington area. It shows this part of the corridor has already been studied in detail.',
    source: 'Amtrak example for the Wilmington area',
  },
  {
    title: 'Final DARP Public Notice for Fox Point State Park',
    file: 'https://dnrec.delaware.gov/public-notices/whs20250010/',
    type: 'web',
    label: 'Web',
    size: 'Jan 12, 2025 · DNREC',
    description:
      "DNREC’s public notice for the final restoration plan. It shows the project area, the shoreline goals, and where the full record is posted.",
    source: 'Good DNREC starting point for the final plan',
  },
  {
    title: 'DNREC Facility Detail: Fox Point Park Phase II',
    file: 'https://den.dnrec.delaware.gov/Detail/FacilityDetail.aspx?id=10002152&piid=26871',
    type: 'web',
    label: 'Web',
    size: 'Live record',
    description:
      "DNREC’s live record for Fox Point Park Phase II. It links to site documents, inspections, and cleanup status.",
    source: 'Live DNREC record for the site',
  },
  {
    title: 'Approved Federal Mitigation Plan for Edgemoor Expansion',
    file: 'https://port.delaware.gov/wp-content/uploads/sites/227/2025/07/Approved-Federal-Mitigation-Plan.pdf',
    type: 'pdf',
    label: 'Report',
    size: 'Jul 2025 · Port of Delaware',
    description:
      'The Port of Delaware plan that links Fox Point wetland work to required offset work for the Edgemoor expansion.',
    source: 'Port of Delaware source on the link to Fox Point',
  },
  {
    title: '2025 Delaware Climate Action Plan',
    file: 'https://documents.dnrec.delaware.gov/energy/Climate-Plan/2025-Delaware-Climate-Action-Plan.pdf',
    type: 'pdf',
    label: 'Report',
    size: 'Dec 2025 · DNREC',
    description:
      "Delaware’s statewide climate plan. It gives broader context for sea-level rise, public safety, and public infrastructure.",
    source: 'Statewide climate source',
  },
  {
    title: 'NOAA Settlement for Restoration at the DuPont Hay Road Site',
    file: 'https://darrp.noaa.gov/hazardous-waste/settlement-finalized-restoration-dupont-hay-road-hazardous-waste-site',
    type: 'web',
    label: 'Web',
    size: 'Feb 2023',
    description:
      "NOAA’s summary of the settlement that sets aside $808,500 for restoration tied to the Edge Moor and Hay Road site.",
    source: 'Official source for the Chemours settlement amount',
  },
  {
    title: 'Fox Point Riverview Trail Overview',
    file: 'https://delawaregreenways.org/trail/fox-point-riverview-trail/',
    type: 'web',
    label: 'Web',
    size: 'Delaware Greenways',
    description:
      'A public-facing trail page that helps show Fox Point as a place for shoreline access, habitat, and movement at the same time.',
    source: 'Quick source on public benefit',
  },
];
