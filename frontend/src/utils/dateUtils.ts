import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatarData(date?: Date | string): string {
    if (!date) return "Data inválida";
    const dataFormatada = format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
    });
    return dataFormatada;
}

export { formatarData };
