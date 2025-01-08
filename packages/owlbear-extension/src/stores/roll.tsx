import { create } from 'zustand'

interface RollState {
    counter: number,
    update: (set: number) => void
}

export const rollStore = create<RollState>((set) => ({
    counter: 1,

    update: (newCount) => set((state) => ({
        counter: state.counter + newCount
    }))
}))

