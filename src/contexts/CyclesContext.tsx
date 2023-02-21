import { createContext, ReactNode, useState, useReducer, useEffect } from "react"
import { CyclesContextType, cyclesReducer } from "../reducers/cycles/reducer"
import { differenceInSeconds } from 'date-fns'
import { ActionTypes, addNewCycleAction, interrupetCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions"

interface CyclesProps {
  cycles: CyclesContextType[]
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

  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    }
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
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

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interrupetCurrentCycle() {
    dispatch(interrupetCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupetCurrentCycle,
      }}>
      {children}
    </CyclesContext.Provider>
  )

}