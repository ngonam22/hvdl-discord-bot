import { create } from 'zustand'
import { calculateFromRolls, type Roll, type RollResult} from '@hldv/hldv-utility'
import {generateWords} from '@/utils/randomWord'

interface OwlbearState {
    metadataKey: string
    database: string,
    roomName: string,
    playerName: string,

    updateRoom: (room: string) => void
    updatePlayerName: (name: string) => void

    getRollCollectionName: () => string,

    formatToRollHistory: (rollFirestore: RollResultFirestore) => RollHistory,
    formatToRollResultFirestore: (rollResult: RollResult) => RollResultFirestore
    initNewMetadata: () => {}
}

export interface RollResultFirestore {
    rolls: Roll[]
    playerName: string
    timestamp: number
}

export interface RollHistory {
    data: RollResult,
    playerName: string,
    timestamp: number
}

export const owlbearStore = create<OwlbearState>((set, get) => ({
    metadataKey: 'com.huyenvietdailuc.owlbear/metadata',
    database: 'owlbear',
    roomName: '',
    playerName: '',

    getRollCollectionName: (): string => `${get().database}/${get().roomName}/rolls`,

    updateRoom: (roomName) => set(() => ({ roomName: roomName })),
    updatePlayerName: (name) => set(() => ({ playerName: name })),

    formatToRollResultFirestore: (rollResult: RollResult): RollResultFirestore => ({
        rolls: rollResult.rolls,
        playerName: get().playerName,
        timestamp: Date.now()
    }),

    formatToRollHistory: (rollFirestore: RollResultFirestore): RollHistory => ({
       data: calculateFromRolls(rollFirestore?.rolls),
       playerName: rollFirestore.playerName,
       timestamp: rollFirestore.timestamp
    }),

    initNewMetadata: () => {
        return {
            [get().metadataKey]: {
                roomName: generateWords(3)
            }
        }      
    }
}))

