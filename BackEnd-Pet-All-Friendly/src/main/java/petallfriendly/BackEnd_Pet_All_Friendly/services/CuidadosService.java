package petallfriendly.BackEnd_Pet_All_Friendly.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petallfriendly.BackEnd_Pet_All_Friendly.models.Cuidados;
import petallfriendly.BackEnd_Pet_All_Friendly.repositories.CuidadosRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CuidadosService {
    @Autowired
    private CuidadosRepository repository;

    
    public List<Cuidados> findAll() {
        return repository.findAll();
    }

    
    public Optional<Cuidados> findById(Long id) {
        return repository.findById(id);
    }

    
    public Cuidados save(Cuidados cuidados) {
        return repository.save(cuidados);
    }

    
    public Cuidados update(Long id, Cuidados cuidados) {
        Cuidados existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuidados não encontrados com ID: " + id));

        existing.setNome(cuidados.getNome());
        existing.setAlimentacao(cuidados.getAlimentacao());
        existing.setHabitat(cuidados.getHabitat());
        existing.setLegislacao(cuidados.getLegislacao());
        existing.setCuidadosGerais(cuidados.getCuidadosGerais());

        return repository.save(existing);
    }

    
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
