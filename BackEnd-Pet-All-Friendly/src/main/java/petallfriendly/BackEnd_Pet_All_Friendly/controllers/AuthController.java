package petallfriendly.BackEnd_Pet_All_Friendly.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import petallfriendly.BackEnd_Pet_All_Friendly.models.UserDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.repositories.UserRepository;
import petallfriendly.BackEnd_Pet_All_Friendly.services.JwtService;

import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO loginDTO) {
        var userOpt = userRepository.findByEmail(loginDTO.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado.");
        }

        var user = userOpt.get();

        if (!passwordEncoder.matches(loginDTO.getSenha(), user.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha inválida.");
        }

        var token = jwtService.generateToken(user.getEmail());

        var response = new HashMap<String, String>();
        response.put("token", token);
        response.put("nome", user.getNome());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }

}
