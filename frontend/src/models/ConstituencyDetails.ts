export interface ConstituencyDetails {
    constituencyId: number;
    pcName: string;
    stName: string;  
    winnerCandidate?: string;
    winnerPartyName?: string;  
    winnerPartyColor?: string;
    votes?: number;
    margin?: number;
}