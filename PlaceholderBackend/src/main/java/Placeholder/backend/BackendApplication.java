package Placeholder.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@SpringBootApplication
public class BackendApplication {
	@Component
	public class CorsFilter extends OncePerRequestFilter {

		@Override
		protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
										final FilterChain filterChain) throws ServletException, IOException {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, HEAD");
			response.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			response.addHeader("Access-Control-Expose-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
			response.addHeader("Access-Control-Allow-Credentials", "true");
			response.addIntHeader("Access-Control-Max-Age", 10);
			filterChain.doFilter(request, response);
		}

	}

	public static void main(String[] args) {
		System.out.println("Starting App!!");
		SpringApplication.run(BackendApplication.class, args);
	}

}
