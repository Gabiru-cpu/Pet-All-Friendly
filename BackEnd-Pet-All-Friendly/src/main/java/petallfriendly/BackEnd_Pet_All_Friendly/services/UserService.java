package petallfriendly.BackEnd_Pet_All_Friendly.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import petallfriendly.BackEnd_Pet_All_Friendly.models.User;
import petallfriendly.BackEnd_Pet_All_Friendly.models.UserDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.repositories.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<?> register(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email já cadastrado.");
        }

        User user = User.builder()
                .nome(userDTO.getNome())
                .email(userDTO.getEmail())
                .senha(passwordEncoder.encode(userDTO.getSenha()))
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }

    public ResponseEntity<?> forgotPassword(String email) {
        // lógica simples de esqueci minha senha (em produção, envie e-mail ou token de reset)
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Email não encontrado.");
        }

        return ResponseEntity.ok("Instruções enviadas para o e-mail.");
    }

    public ResponseEntity<?> updateUser(Long id, UserDTO userDTO) {
        return userRepository.findById(id).map(user -> {
            user.setNome(userDTO.getNome());
            user.setEmail(userDTO.getEmail());
            if (userDTO.getSenha() != null && !userDTO.getSenha().isBlank()) {
                user.setSenha(passwordEncoder.encode(userDTO.getSenha()));
            }
            userRepository.save(user);
            return ResponseEntity.ok("Usuário atualizado.");
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("Usuário deletado.");
    }
}

