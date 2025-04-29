package petallfriendly.BackEnd_Pet_All_Friendly.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Boolean sexo; // true = macho / false = femea
    private String especie; // Cachorro, Gato, etc.
    private String raca;
    private Integer idade;

    private String fotoUrl; // URL da imagem ou caminho no sistema
    private Double peso; // em kg
    private Double altura; // em cm

    private Boolean microchip;

    @ElementCollection
    @CollectionTable(name = "pet_vacinas", joinColumns = @JoinColumn(name = "pet_id"))
    @Column(name = "vacina")
    private List<String> vacinas = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User dono;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    private List<Lembrete> lembretes;
}
