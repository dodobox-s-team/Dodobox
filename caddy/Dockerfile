FROM caddy:builder-alpine as builder

RUN xcaddy build --with github.com/dodobox-s-team/acmerelay-provider

FROM caddy:2-alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy
COPY ./Caddyfile /etc/caddy/Caddyfile

WORKDIR /etc/caddy