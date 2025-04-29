package petallfriendly.BackEnd_Pet_All_Friendly.models;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDTO {
    private Long id;
    private String nome;
    private Boolean sexo;
    private String especie;
    private String raca;
    private Integer idade;
    private String imageData;
    private Double peso;
    private Double altura;
    private Boolean microchip;
    private List<String> vacinas;
    private DonoDTO dono;
}