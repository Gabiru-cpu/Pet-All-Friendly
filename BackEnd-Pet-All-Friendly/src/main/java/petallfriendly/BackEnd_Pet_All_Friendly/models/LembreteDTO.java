package petallfriendly.BackEnd_Pet_All_Friendly.models;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LembreteDTO {
    private Long id;
    private Long petId;
    private String petNome;
    private String titulo;
    private String descricao;
    private LocalDateTime dataHora;
}
