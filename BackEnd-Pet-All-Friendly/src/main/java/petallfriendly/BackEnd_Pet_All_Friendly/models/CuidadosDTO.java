package petallfriendly.BackEnd_Pet_All_Friendly.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CuidadosDTO {
    private Long id;
    private String nome;
    private String alimentacao;
    private String habitat;
    private String legislacao;
    private String cuidadosGerais;
}