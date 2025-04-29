package petallfriendly.BackEnd_Pet_All_Friendly.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import petallfriendly.BackEnd_Pet_All_Friendly.models.Pet;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
}
