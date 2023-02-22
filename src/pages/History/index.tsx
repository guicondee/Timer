import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <pre>
      </pre>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.task}</td>
                  <td>{data.minutesAmount} Minutos</td>
                  <td>{formatDistanceToNow(new Date(data.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}</td>
                  <td>
                    {data.finishedDate && (
                      <Status statusColor="green">
                        Concluído
                      </Status>
                    )}

                    {data.interruptedDate && (
                      <Status statusColor="red">
                        Interrompido
                      </Status>
                    )}

                    {!data.interruptedDate && !data.finishedDate && (
                      <Status statusColor="yellow">
                        Em andamento
                      </Status>
                    )}
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}