if test -z "$DOMAIN_NAME" 
then
      echo "DOMAIN_NAME varieble is empty, please enter Domain name (i.e. mydomain.com)"
      read -p 'Domain name: ' DOMAIN_NAME
      echo "Please, enter local IP-address of Docker host"
      read -p 'IP-address: '  LOCAL_IP
      cp dc.env.example dc.env
      sed -i "s|<DOMAIN_NAME>|$DOMAIN_NAME|g" dc.env
      sed -i "s|<LOCAL_IP>|$LOCAL_IP|g" config/haproxy.cfg
      sudo mkdir -p /etc/haproxy/certs/
      sudo cp config/dummy.pem /etc/haproxy/certs/cert.pem
      sudo docker-compose --env-file dc.env up -d
      echo "Asking for SSL certificate"
      sleep 10
      echo "$(docker logs certbot | head -n 22)"
      rm dc.env
      echo "Applying new certificate on proxy server"
      sudo docker restart haproxy
else
      echo "Please, enter local IP-address of Docker host"
      read -p 'IP-address: '  LOCAL_IP
      cp dc.env.example dc.env
      sed -i "s|<DOMAIN_NAME>|$DOMAIN_NAME|g" dc.env
      sed -i "s|<LOCAL_IP>|$LOCAL_IP|g" config/haproxy.cfg
      sudo mkdir -p /etc/haproxy/certs/
      sudo cp config/dummy.pem /etc/haproxy/certs/cert.pem
      sudo docker-compose --env-file dc.env up -d
      echo "Asking for SSL certificate"
      sleep 10
      echo "$(docker logs certbot | head -n 22)"
      rm dc.env
      echo "Applying new certificate on proxy server"
      sudo docker restart haproxy
fi
