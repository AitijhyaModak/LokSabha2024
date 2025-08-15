export interface SearchItem {
    type: "state" | "constituency" | "party" | "candidate";
    itemDisplayName: string;
    itemData:
    | ConstituencySearchItem
    | CandidateSearchItem
    | StateSearchItem
    | PoliticalPartySearchItem;
}

interface ConstituencySearchItem {
    constituencyId: number;
}

interface CandidateSearchItem {
    candidateId: number;
}

interface StateSearchItem {
    steteId: number;
}

interface PoliticalPartySearchItem {
    partyId: string;
    partyColor: string;
}
