package petallfriendly.BackEnd_Pet_All_Friendly.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petallfriendly.BackEnd_Pet_All_Friendly.models.Cuidados;
import petallfriendly.BackEnd_Pet_All_Friendly.services.CuidadosService;

import java.util.List;

@RestController
@RequestMapping("/api/cuidados")
@RequiredArgsConstructor
public class CuidadosController {
    @Autowired
    private CuidadosService cuidadosService;

    @GetMapping
    public List<Cuidados> getAll() {
        return cuidadosService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cuidados> getById(@PathVariable Long id) {
        return cuidadosService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cuidados> create(@RequestBody Cuidados cuidados) {
        return ResponseEntity.ok(cuidadosService.save(cuidados));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cuidados> update(@PathVariable Long id, @RequestBody Cuidados cuidados) {
        try {
            return ResponseEntity.ok(cuidadosService.update(id, cuidados));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cuidadosService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
