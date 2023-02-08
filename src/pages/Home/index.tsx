import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdowButton,
  StopCountdowButton,
} from "./style";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdow } from "./components/Countdow";


interface CyclesProps {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
export function Home() {
  const [cycle, setCycle] = useState<CyclesProps[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


  const task = watch('task')
  const isSubmitDisable = !task

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

  function handleStopButton() {
    setCycle((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)

  }

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')



  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <NewCycleForm />
        <Countdow
          activeCycleId={activeCycleId}
          setCycle={setCycle}
          activeCycle={activeCycle}
        />
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