import { create } from 'zustand'

interface OwlbearState {
    database: string,
    roomName: string,

    updateRoom: (room: string) => void

    getRollCollectionName: () => string
}

export const owlbearStore = create<OwlbearState>((set, get) => ({
    database: 'owlbear',
    roomName: 'owl-default',

    getRollCollectionName: (): string => `${get().database}/${get().roomName}/rolls`,

    updateRoom: (roomName) => set(() => ({ roomName: roomName })),
}))

