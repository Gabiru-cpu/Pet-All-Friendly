package petallfriendly.BackEnd_Pet_All_Friendly.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import petallfriendly.BackEnd_Pet_All_Friendly.models.Lembrete;
import petallfriendly.BackEnd_Pet_All_Friendly.models.LembreteDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.models.Pet;
import petallfriendly.BackEnd_Pet_All_Friendly.models.User;
import petallfriendly.BackEnd_Pet_All_Friendly.repositories.LembreteRepository;
import petallfriendly.BackEnd_Pet_All_Friendly.repositories.PetRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LembreteService {

    private final LembreteRepository lembreteRepository;
    private final PetRepository petRepository;
    private final AuthService authService;

    public ResponseEntity<?> getAllLembretesFromUser() {
        User user = authService.getAuthenticatedUser();
        List<LembreteDTO> lembretesDTO = user.getPets().stream()
                .flatMap(pet -> pet.getLembretes().stream())
                .map(this::convertToDTO)
                .toList();

        return ResponseEntity.ok(lembretesDTO);
    }

    public ResponseEntity<?> getLembretesByPetId(Long petId) {
        Optional<Pet> petOpt = petRepository.findById(petId);
        if (petOpt.isEmpty() || !petOpt.get().getDono().equals(authService.getAuthenticatedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
        }
        List<LembreteDTO> lembretesDTO = petOpt.get().getLembretes().stream()
                .map(this::convertToDTO)
                .toList();

        return ResponseEntity.ok(lembretesDTO);
    }

    private LembreteDTO convertToDTO(Lembrete lembrete) {
        return LembreteDTO.builder()
                .id(lembrete.getId())
                .petId(lembrete.getPet().getId())
                .petNome(lembrete.getPet().getNome())
                .titulo(lembrete.getTitulo())
                .descricao(lembrete.getDescricao())
                .dataHora(lembrete.getDataHora())
                .build();
    }

    public ResponseEntity<?> createLembrete(LembreteDTO dto) {
        Pet pet = petRepository.findById(dto.getPetId()).orElse(null);
        if (pet == null || !pet.getDono().equals(authService.getAuthenticatedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
        }

        Lembrete lembrete = new Lembrete();
        lembrete.setTitulo(dto.getTitulo());
        lembrete.setDescricao(dto.getDescricao());
        lembrete.setDataHora(dto.getDataHora());
        lembrete.setPet(pet);

        lembreteRepository.save(lembrete);
        return ResponseEntity.ok("Lembrete criado.");
    }

    public ResponseEntity<?> updateLembrete(Long id, LembreteDTO dto) {
        return lembreteRepository.findById(id).map(lembrete -> {
            if (!lembrete.getPet().getDono().equals(authService.getAuthenticatedUser())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
            }

            lembrete.setTitulo(dto.getTitulo());
            lembrete.setDescricao(dto.getDescricao());
            lembrete.setDataHora(dto.getDataHora());

            lembreteRepository.save(lembrete);
            return ResponseEntity.ok("Lembrete atualizado.");
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> deleteLembrete(Long id) {
        return lembreteRepository.findById(id).map(lembrete -> {
            if (!lembrete.getPet().getDono().equals(authService.getAuthenticatedUser())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
            }
            lembreteRepository.delete(lembrete);
            return ResponseEntity.ok("Lembrete removido.");
        }).orElse(ResponseEntity.notFound().build());
    }
}

