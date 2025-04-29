package petallfriendly.BackEnd_Pet_All_Friendly.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import petallfriendly.BackEnd_Pet_All_Friendly.models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // usado pelo AuthService

    boolean existsByEmail(String email);
}
