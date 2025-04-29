package petallfriendly.BackEnd_Pet_All_Friendly.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petallfriendly.BackEnd_Pet_All_Friendly.models.PetDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.services.PetService;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @GetMapping("/me")
    public ResponseEntity<?> getMyPets() {
        return petService.getMyPets();
    }

    @PostMapping
    public ResponseEntity<?> createPet(@RequestBody PetDTO petDTO) {
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