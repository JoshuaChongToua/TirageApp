export interface Partie {
  id: number;
  name: string;
  createur: string;
  state: boolean;
  hasJoined?: boolean;
  partieRejointId?: number;   
}
