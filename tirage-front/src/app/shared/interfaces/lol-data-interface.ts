import {Champion} from "./champion-interface";

export interface LolData {
    version: string;
    champions: Champion[];
}
