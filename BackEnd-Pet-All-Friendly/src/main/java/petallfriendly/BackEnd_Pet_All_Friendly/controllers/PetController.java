package petallfriendly.BackEnd_Pet_All_Friendly.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import petallfriendly.BackEnd_Pet_All_Friendly.models.PetDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.services.PetService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @GetMapping("/me")
    public ResponseEntity<?> getMyPets() {
        return petService.getMyPets();
    }

    /*@PostMapping
    public ResponseEntity<?> createPet(@RequestBody PetDTO petDTO) {
        return petService.createPet(petDTO);
    }*/

    @PostMapping
    public ResponseEntity<?> createPet(@RequestParam("image")MultipartFile file) throws IOException {
        PetDTO petDTO = new PetDTO();
        

        List<String> vacinas = new ArrayList<>();
        vacinas.add("x");
        
        petDTO.setNome("rex");
        petDTO.setSexo(true);
        petDTO.setEspecie("dog");
        petDTO.setRaca("srd");
        petDTO.setIdade(3);
        petDTO.setImageData(file.getBytes());
        petDTO.setPeso(10.5);
        petDTO.setAltura(3.5);
        petDTO.setMicrochip(true);
        petDTO.setVacinas(vacinas);


        return petService.createPet(petDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Long id, @RequestBody PetDTO petDTO) {
        return petService.updatePet(id, petDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        return petService.deletePet(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPetById(@PathVariable Long id) {
        return petService.getPetById(id);
    }
}