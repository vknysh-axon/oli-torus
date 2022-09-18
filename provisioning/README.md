# Oli-Torus production instructions

**TL:DR**

1. Create oli.env from .example.

2. Create .haproxy.cfg from .example in config folder.

3. Run run.sh (with sudo priviliges), isnert DOMAIN_NAME and DOCKER_HOST IP.  

________________________________

## Instalation details  

**Config** folder contains a dummy certificate and config file for proper start of proxy server

**run.sh** - script create dc.env file for docker-compose.yaml and set DOMAIN_NAME environment varieble.
Then it subchange DOCKER_HOST IP in config/haproxy.cfg. After it copy dummy sertificate for proper running of proxy server in etc/haproxy/certs folder.
At last it start docker-compose command in detach mode.

**Dockerfile** - build file for Oli-Torus app.

**docker-compose.yml** - complicate compose file that have 3 containers.
[***Web***](https://github.com/Simon-Initiative/oli-torus) - web application with env file oli.env and port mapping 8080:8080.

[***Certbot***](https://certbot.eff.org/) - Let's Encrypt container for acquiring SSL sertificate for web application.
Certbot request SSL certificate for DOMAIN_NAME via http well-known [challenge](https://letsencrypt.org/docs/challenge-types/) on port 64111, then it copy certificate bundle to proxy certifcate folder.
After, it sleep for 14 days adn try to renew certificate. Certbot container should be alive all the time.

***Don forget to open 646111 port in your firewall***

[***Haproxy***](http://www.haproxy.org/) - proxy server that serve web application that configured fith config/haproxy.cfg file.

**stop.sh** - this script stops and remove docker containers from docker-compose.

**dc.env.example** - template file with DOMAIN_NAME. (you dont need to interact with this file)

**oli.example.env** - template file of Oli-Torus environmet variebles for web application.