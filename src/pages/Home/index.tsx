import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdowButton,
  StopCountdowButton,
} from "./style";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdow } from "./components/Countdow";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormProvider } from "react-hook-form";

interface CyclesProps {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: CyclesProps | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCyrcleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// interface NewCyrcleFormData {
//   task: string
//   minutesAmount: number
// }

// .função typeScript utilizando o zod, me dando a tipagem acima dos meus inputs
type NewCyrcleFormData = zod.infer<typeof newCyrcleFormValidationSchema>

export function Home() {
  const [cycle, setCycle] = useState<CyclesProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCyrcleFormData>({
    resolver: zodResolver(newCyrcleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { handleSubmit, reset, watch } = newCycleForm

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

  function handleStopButton() {
    setActiveCycleId(null)
  }

  function handleCreateNewCycle(props: NewCyrcleFormData) {
    const id = String(new Date().getTime())

    const newCycle: CyclesProps = {
      id,
      task: props.task,
      minutesAmount: props.minutesAmount,
      startDate: new Date()
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed
          }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdow />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdowButton onClick={handleStopButton} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdowButton>
        ) : (
          <StartCountdowButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdowButton>
        )}

      </form>
    </HomeContainer>
  )
}