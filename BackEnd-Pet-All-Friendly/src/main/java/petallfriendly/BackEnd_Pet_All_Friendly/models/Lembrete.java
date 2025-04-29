package petallfriendly.BackEnd_Pet_All_Friendly.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Lembrete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;         // Ex: Vacina, Consulta, Banho
    private String descricao;      // Detalhes adicionais
    private LocalDateTime dataHora; // Data e hora agendada

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;
}
