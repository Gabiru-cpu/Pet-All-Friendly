package petallfriendly.BackEnd_Pet_All_Friendly.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    private String senha;


    @OneToMany(mappedBy = "dono", cascade = CascadeType.ALL)
    private List<Pet> pets = new ArrayList<>();
}
