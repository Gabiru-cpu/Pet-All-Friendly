package petallfriendly.BackEnd_Pet_All_Friendly.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import petallfriendly.BackEnd_Pet_All_Friendly.models.*;
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

    private List<Lembrete> convertToLembretes(List<LembreteDTO> lembretesDTO, Pet pet) {
        if (lembretesDTO == null) return null;

        return lembretesDTO.stream().map(dto -> {
            Lembrete lembrete = new Lembrete();
            lembrete.setId(dto.getId()); // cuidado: normalmente não setamos ID em novos lembretes
            lembrete.setTitulo(dto.getTitulo());
            lembrete.setDescricao(dto.getDescricao());
            lembrete.setDataHora(dto.getDataHora());
            lembrete.setPet(pet); // importante!
            return lembrete;
        }).collect(Collectors.toList());
    }

    private PetDTO convertToDTO(Pet pet) {
        DonoDTO donoDTO = new DonoDTO(pet.getDono().getId(), pet.getDono().getNome());

        List<LembreteDTO> lembretesDTO = pet.getLembretes().stream().map(lembrete ->
                LembreteDTO.builder()
                        .id(lembrete.getId())
                        .titulo(lembrete.getTitulo())
                        .descricao(lembrete.getDescricao())
                        .dataHora(lembrete.getDataHora())
                        .petId(pet.getId())
                        .petNome(pet.getNome())
                        .build()
        ).collect(Collectors.toList());

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
                .lembretes(lembretesDTO)
                .dono(donoDTO)
                .build();
    }


    public ResponseEntity<?> createPet(PetDTO petDTO) {
        // Validações
        if (petDTO.getNome() == null || petDTO.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O nome do pet não pode ser vazio.");
        }

        if (petDTO.getIdade() == null || petDTO.getIdade() <= 0) {
            return ResponseEntity.badRequest().body("A idade do pet deve ser maior que 0.");
        }

        User user = authService.getAuthenticatedUser();

        Pet pet = new Pet();
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
        List<Lembrete> lembretes = convertToLembretes(petDTO.getLembretes(), pet);
        pet.setLembretes(lembretes);
        pet.setDono(user);

        // Salva o pet no banco de dados, e o id será gerado automaticamente
        Pet savedPet = petRepository.save(pet);

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
            List<Lembrete> lembretes = convertToLembretes(petDTO.getLembretes(), pet);
            pet.setLembretes(lembretes);

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
