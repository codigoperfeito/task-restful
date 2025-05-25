import { ApiProperty } from "@nestjs/swagger";

export class Task {
  @ApiProperty({
    description: 'Id da tarefa tipo Inteiro',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Titulo da tarefa',
    example: 'Comprar pão',
  })
  title: string;
  @ApiProperty({
    description: 'Descricao ou lembrancas da tarefa',
    example: 'Comparar mortadela e queijo',
  })
  description: string;
  @ApiProperty({
    description: 'Status da tarefa se ja foi completada',
    example: true,
  })
  complete: boolean;
}