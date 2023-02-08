import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
//
import { MinutesAmountInput, TaskInput } from "../../style"
import { FormContainer } from "./styles"


const newCyrcleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

export function NewCycleForm() {

  // interface NewCyrcleFormData {
  //   task: string
  //   minutesAmount: number
  // }

  // .função typeScript utilizando o zod, me dando a tipagem acima dos meus inputs
  type NewCyrcleFormData = zod.infer<typeof newCyrcleFormValidationSchema>

  const { register, handleSubmit, watch, reset } = useForm<NewCyrcleFormData>({
    resolver: zodResolver(newCyrcleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });


  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        id="task"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        placeholder="00"
        type="number"
        id="minutesAmount"
        disabled={!!activeCycle}
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}