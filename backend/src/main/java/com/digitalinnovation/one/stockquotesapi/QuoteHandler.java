package com.digitalinnovation.one.stockquotesapi;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@AllArgsConstructor
public class QuoteHandler {
    private final QuoteRepository repository;

    public Mono<ServerResponse> getAll(ServerRequest req) {
        Flux<Quote> quotes = repository.findAll();
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(quotes, Quote.class);
    }

    public Mono<ServerResponse> getLastQuote(ServerRequest req) {
        Mono<Quote> quote = repository.findAll().last();
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(quote, Quote.class);
    }
}