import { Play } from "phosphor-react";
import {
  CountDowContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdowButton,
  TaskInput
} from "./style";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            id="task"
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
            step={5}
            min={5}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDowContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDowContainer>

        <StartCountdowButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountdowButton>

      </form>
    </HomeContainer>
  )
}