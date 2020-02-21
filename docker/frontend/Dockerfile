FROM node:lts

VOLUME /usr/src/cgpy

EXPOSE 3000

ADD entrypoint.sh /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT /entrypoint
