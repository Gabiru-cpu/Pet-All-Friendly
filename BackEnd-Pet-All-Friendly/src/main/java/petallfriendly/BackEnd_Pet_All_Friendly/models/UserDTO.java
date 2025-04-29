package petallfriendly.BackEnd_Pet_All_Friendly.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String nome;
    private String email;
    private String senha;
}