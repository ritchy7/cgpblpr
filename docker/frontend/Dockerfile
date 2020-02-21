FROM node:lts

VOLUME /usr/src/app

EXPOSE 3000

ADD entrypoint.sh /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT /entrypoint
