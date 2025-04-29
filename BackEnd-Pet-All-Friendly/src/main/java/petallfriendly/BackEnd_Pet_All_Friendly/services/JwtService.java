package petallfriendly.BackEnd_Pet_All_Friendly.services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET = "47a8e0a3b2b12f7bd9cea68c475d253d11f5b25fc24854c5593b6ce93acad1b7cf57d8ef042c361f4aa9fe48499ccac116f79b5daedb3b40e1503ab5d348d80935da0fcee7261801a9b55c64076c0ed2ed339547874db7738341da49f81c3b6cd0ab4e10c88d0e0ae94a7a15969e13d6a3d04139ccc9b0a4db80a60fd56d916f";
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 4; // 4 horas

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}