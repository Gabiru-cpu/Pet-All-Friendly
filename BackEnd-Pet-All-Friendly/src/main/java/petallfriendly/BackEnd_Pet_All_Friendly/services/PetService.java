package petallfriendly.BackEnd_Pet_All_Friendly.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import petallfriendly.BackEnd_Pet_All_Friendly.models.DonoDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.models.Pet;
import petallfriendly.BackEnd_Pet_All_Friendly.models.PetDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.models.User;
import petallfriendly.BackEnd_Pet_All_Friendly.repositories.PetRepository;
import petallfriendly.BackEnd_Pet_All_Friendly.repositories.UserRepository;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public ResponseEntity<?> getMyPets() {
        User user = authService.getAuthenticatedUser();
        List<PetDTO> petDTOs = user.getPets().stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(petDTOs);
    }

    public ResponseEntity<?> getPetById(Long id) {
        return petRepository.findById(id).map(pet -> {
            if (!pet.getDono().equals(authService.getAuthenticatedUser())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Você não pode acessar este pet.");
            }
            PetDTO petDTO = convertToDTO(pet);
            return ResponseEntity.ok(petDTO);
        }).orElse(ResponseEntity.notFound().build());
    }

    private PetDTO convertToDTO(Pet pet) {
        DonoDTO donoDTO = new DonoDTO(pet.getDono().getId(), pet.getDono().getNome());

        return PetDTO.builder()
                .id(pet.getId())
                .nome(pet.getNome())
                .sexo(pet.getSexo())
                .especie(pet.getEspecie())
                .raca(pet.getRaca())
                .idade(pet.getIdade())
                .imageData(pet.getImageData())
                .peso(pet.getPeso())
                .altura(pet.getAltura())
                .microchip(pet.getMicrochip())
                .vacinas(pet.getVacinas())
                .dono(donoDTO)
                .build();
    }

    public ResponseEntity<?> createPet(Pet petDTO) {
        // Validações
        if (petDTO.getNome() == null || petDTO.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O nome do pet não pode ser vazio.");
        }

        if (petDTO.getIdade() == null || petDTO.getIdade() <= 0) {
            return ResponseEntity.badRequest().body("A idade do pet deve ser maior que 0.");
        }

        User user = authService.getAuthenticatedUser();

        petDTO.setDono(user);
        // Salva o pet no banco de dados, e o id será gerado automaticamente
        Pet savedPet = petRepository.save(petDTO);

        // Convertendo para PetDTO e retornando a resposta
        PetDTO savedPetDTO = convertToDTO(savedPet);
        return ResponseEntity.ok(savedPetDTO); // Retorna o PetDTO com o id gerado
    }

    public ResponseEntity<?> updatePet(Long id, PetDTO petDTO) {
        return petRepository.findById(id).map(pet -> {
            if (!pet.getDono().equals(authService.getAuthenticatedUser())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Você não pode editar este pet.");
            }

            // Validações
            if (petDTO.getNome() == null || petDTO.getNome().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("O nome do pet não pode ser vazio.");
            }

            if (petDTO.getIdade() == null || petDTO.getIdade() <= 0) {
                return ResponseEntity.badRequest().body("A idade do pet deve ser maior que 0.");
            }

            pet.setNome(petDTO.getNome());
            pet.setSexo(petDTO.getSexo());
            pet.setEspecie(petDTO.getEspecie());
            pet.setRaca(petDTO.getRaca());
            pet.setIdade(petDTO.getIdade());
            pet.setImageData(petDTO.getImageData());
            pet.setPeso(petDTO.getPeso());
            pet.setAltura(petDTO.getAltura());
            pet.setMicrochip(petDTO.getMicrochip());
            pet.setVacinas(petDTO.getVacinas());

            petRepository.save(pet);
            return ResponseEntity.ok("Pet atualizado.");
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> deletePet(Long id) {
        return petRepository.findById(id).map(pet -> {
            if (!pet.getDono().equals(authService.getAuthenticatedUser())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Você não pode deletar este pet.");
            }
            petRepository.delete(pet);
            return ResponseEntity.ok("Pet deletado.");
        }).orElse(ResponseEntity.notFound().build());
    }

}
