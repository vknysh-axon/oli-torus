FROM ubuntu:20.04

# Install preps
RUN apt-get update && apt-get install curl unzip -y 

# Install Oli-Torus
RUN curl --fail -L https://oli-torus-releases.s3.amazonaws.com/oli-0.21.4-ba552a0.zip -o oli-0.21.4-ba552a0.zip
RUN unzip oli-*.zip -d oli
RUN chmod -R +x ./oli
RUN rm -rf ./oli-*.zip

# Install Nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs

# Entrypoint
ENTRYPOINT ["bash",  "/oli/bin/oli", "start"]
