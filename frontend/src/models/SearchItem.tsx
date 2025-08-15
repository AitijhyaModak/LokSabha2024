export interface SearchItem {
    type: "state" | "constituency" | "party" | "candidate";
    itemData:
        | ConstituencySearchItem
        | CandidateSearchItem
        | StateSearchItem
        | PoliticalPartySearchItem;
}

interface ConstituencySearchItem {
    constituencyId: number;
    constituencyName: string;
}

interface CandidateSearchItem {
    candidateId: number;
    candidateName: string;
}

interface StateSearchItem {
    stateName: string;
}

interface PoliticalPartySearchItem {
    partyName: string;
    partyColor: string;
}
