#!/bin/bash
yum update -y
sudo su

amazon-linux-extras install -y nginx1
systemctl start nginx
systemctl enable nginx

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

nvm install 20