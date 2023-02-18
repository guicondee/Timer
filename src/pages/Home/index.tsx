import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdowButton,
  StopCountdowButton,
} from "./style";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdow } from "./components/Countdow";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormProvider } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCyrcleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// interface NewCyrcleFormData {
//   task: string
//   minutesAmount: number
// }
// .função typeScript utilizando o zod, me dando a tipagem acima dos meus inputs
type NewCycleFormData = zod.infer<typeof newCyrcleFormValidationSchema>

export function Home() {
  const {
    createNewCycle,
    activeCycle,
    interrupetCurrentCycle
  } = useContext(CyclesContext)


  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCyrcleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdow />

        {activeCycle ? (
          <StopCountdowButton onClick={interrupetCurrentCycle} type="button">
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