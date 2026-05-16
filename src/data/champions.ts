export type ChampionScope = 'federal' | 'state' | 'county';

export interface Champion {
  id: string;
  name: string;
  role: string;
  blurb: string;
  scope: ChampionScope;
}

// Source-of-truth facts for each elected official whose record or
// position makes Fox Point possible. Blurbs use plain language, no
// campaign framing, and stay close to the verified facts in the
// project brief. Heffernan's blurb is past-tense / completed-action
// because she announced in April 2026 that she is not seeking
// re-election. Cruce's blurb names him as the current state senator
// for Claymont without overstating a record that is still developing.
// McBride's blurb names her as advocate, not appropriator.

export const champions: Record<string, Champion> = {
  mcdowell: {
    id: 'mcdowell',
    name: 'Harris B. McDowell III',
    role: 'Former Delaware State Senator, District 1 (1976–2021)',
    blurb:
      'McDowell served Claymont in the Delaware State Senate for 45 years — the longest tenure in the General Assembly’s history. At the December 2023 dedication of the Claymont Transportation Center, Governor John Carney called him “the godfather of climate change legislation” in the state. The station is named the Harris B. McDowell III Transportation Center in his honor.',
    scope: 'state',
  },
  mcbride: {
    id: 'mcbride',
    name: 'Sarah McBride',
    role: 'U.S. Representative, Delaware at-large',
    blurb:
      'McBride has represented Delaware in the U.S. House since January 2025. Before that, she served Claymont in the Delaware State Senate (District 1, 2021–2025). In March 2026 she co-led a bipartisan letter with Rep. Seth Moulton urging full FY27 funding for Amtrak and the Northeast Corridor, and she has introduced the Highway Fair Share Act to make federal highway formula funding more equitable.',
    scope: 'federal',
  },
  cruce: {
    id: 'cruce',
    name: 'Dan Cruce',
    role: 'Delaware State Senator, District 1',
    blurb:
      'Cruce has held the District 1 seat since a February 2025 special election filled McBride’s vacancy. The district covers Claymont, Bellefonte, parts of Alapocas, Edgemoor, and northern Wilmington. He is COO of United Way of Delaware. His current term runs through November 3, 2026.',
    scope: 'state',
  },
  lambert: {
    id: 'lambert',
    name: 'Larry Lambert',
    role: 'Delaware State Representative, District 7',
    blurb:
      'A lifelong Claymont resident, Lambert has represented District 7 (Claymont, Brandywine Hundred, the Ardens) since 2020. He serves on the Natural Resources & Energy Committee, vice-chairs the Housing Committee, and chairs the Corrections Committee. He is active in Delaware Concerned Residents for Environmental Justice.',
    scope: 'state',
  },
  heffernan: {
    id: 'heffernan',
    name: 'Debra Heffernan',
    role: 'Delaware State Representative, District 11',
    blurb:
      'Heffernan has represented Bellefonte in the Delaware House since 2010 and co-chairs the Joint Capital Improvement Committee, one of two seats that must approve major capital authorizations. She pledged $3M in Bond Bill funding to meet state environmental requirements for the new Edgemoor port — $2.5M of that pledge is set aside for Fox Point wetland and park work, contingent on port construction starting and Diamond State Port Corporation approval. She also co-sponsored the April 2026 Wetlands Stewardship Act with Sen. Stephanie Hansen. Heffernan announced in April 2026 that she is not seeking re-election.',
    scope: 'state',
  },
  cartier: {
    id: 'cartier',
    name: 'John Cartier',
    role: 'New Castle County Councilman, District 8',
    blurb:
      'Cartier has held the District 8 seat — covering all of Claymont and parts of North Wilmington — for over a decade. He was re-elected November 5, 2024. His county-level record on Claymont environmental, community, and infrastructure work spans the same period.',
    scope: 'county',
  },
};

export function getChampions(ids: string[]): Champion[] {
  return ids
    .map((id) => champions[id])
    .filter((c): c is Champion => c !== undefined);
}
