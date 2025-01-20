import { create } from 'zustand'
import { calculateFromRolls, type Roll, type RollResult} from '@hldv/hldv-utility'
import {generateWords} from '@/utils/randomWord'

interface OwlbearState {
    database: string,
    roomName: string,
    playerName: string,

    updateRoom: (room: string) => void

    getRollCollectionName: () => string,

    formatToRollHistory: (rollFirestore: RollResultFirestore) => RollHistory,
    formatToRollResultFirestore: (rollResult: RollResult) => RollResultFirestore
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
    database: 'owlbear',
    roomName: generateWords(3),
    playerName: 'Default',

    getRollCollectionName: (): string => `${get().database}/${get().roomName}/rolls`,

    updateRoom: (roomName) => set(() => ({ roomName: roomName })),

    formatToRollResultFirestore: (rollResult: RollResult): RollResultFirestore => ({
        rolls: rollResult.rolls,
        playerName: get().playerName,
        timestamp: Date.now()
    }),

    formatToRollHistory: (rollFirestore: RollResultFirestore): RollHistory => ({
       data: calculateFromRolls(rollFirestore?.rolls),
       playerName: rollFirestore.playerName,
       timestamp: rollFirestore.timestamp
    })
}))

