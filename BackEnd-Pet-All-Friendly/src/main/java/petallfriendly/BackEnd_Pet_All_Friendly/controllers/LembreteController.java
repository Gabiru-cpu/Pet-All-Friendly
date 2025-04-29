package petallfriendly.BackEnd_Pet_All_Friendly.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petallfriendly.BackEnd_Pet_All_Friendly.models.LembreteDTO;
import petallfriendly.BackEnd_Pet_All_Friendly.services.LembreteService;

@RestController
@RequestMapping("/api/lembretes")
@RequiredArgsConstructor
public class LembreteController {

    private final LembreteService lembreteService;

    @GetMapping("/meus")
    public ResponseEntity<?> getAllMyPetsLembretes() {
        return lembreteService.getAllLembretesFromUser();
    }

    @GetMapping("/pet/{petId}")
    public ResponseEntity<?> getLembretesByPetId(@PathVariable Long petId) {
        return lembreteService.getLembretesByPetId(petId);
    }

    @PostMapping
    public ResponseEntity<?> createLembrete(@RequestBody LembreteDTO lembreteDTO) {
        return lembreteService.createLembrete(lembreteDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLembrete(@PathVariable Long id, @RequestBody LembreteDTO lembreteDTO) {
        return lembreteService.updateLembrete(id, lembreteDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLembrete(@PathVariable Long id) {
        return lembreteService.deleteLembrete(id);
    }
}

