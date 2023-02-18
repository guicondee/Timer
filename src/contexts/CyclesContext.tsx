import { createContext, ReactNode, useState } from "react"


interface CyclesContextType {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesProps {
  cycle: CyclesContextType[]
  activeCycle: CyclesContextType | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interrupetCurrentCycle: () => void
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextProviderProps {
  children: ReactNode
}


export const CyclesContext = createContext({} as CyclesProps)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cycle, setCycle] = useState<CyclesContextType[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)


  function markCurrentCycleAsFinished() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(props: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: CyclesContextType = {
      id,
      task: props.task,
      minutesAmount: props.minutesAmount,
      startDate: new Date()
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interrupetCurrentCycle() {
    setCycle((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupetCurrentCycle,
        cycle
      }}>
      {children}
    </CyclesContext.Provider>
  )

}