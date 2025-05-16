package petallfriendly.BackEnd_Pet_All_Friendly.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Cuidados {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;  // esse campo vai estar escrito o nome de uma raça ou especie e os cuidados dessa raça ou especie
    @Lob private String alimentacao;
    @Lob private String habitat;
    @Lob private String legislacao;
    @Lob private String cuidadosGerais;
}
