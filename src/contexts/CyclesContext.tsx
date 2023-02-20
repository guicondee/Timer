import { createContext, ReactNode, useState, useReducer } from "react"


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

interface CyclesState {
  cycles: CyclesContextType[]
  activeCycleId: string | null
}

export const CyclesContext = createContext({} as CyclesProps)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null
        }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null
        }
      default:
        return state
    }
  }, {
    cycles: [],
    activeCycleId: null
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_ID',
      payload: {
        activeCycleId
      },
    })
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

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    setAmountSecondsPassed(0)
  }

  function interrupetCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      },
    })
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
        cyclesState
      }}>
      {children}
    </CyclesContext.Provider>
  )

}