# Running the thing

- Run `run_docker.sh`, make sure you don't have anything else running on port 8000
- GET request to `http://localhost:8000/` should return `Hello MVP`
- If you interact with [this contract](https://sepolia.etherscan.io/address/0x65d9a74a333324710c1227ff3653e409199465e4#events) and either call `remove` or `set` you should see output in the console

## Deploying this to the cloud

`aws` folder has definitions for the bare EC2 instance where you should deploy this. There is no automation set up, because there was no time left, steps needed for deploy

- Make sure you have nginx up and running on EC2
- Make sure you have docker installed
- Simplest way to copy everything is to just run `scp` on this folder (without `aws` subfolder) and then just run `run_docker.sh` script
- `http://aleksa.dev.mvpworkshop.co/` points to the IP of this EC2 instance
- nginx file should have the following:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name aleksa.dev.mvpworkshop.co www.aleksa.dev.mvpworkshop.co;
        
    location / {
        proxy_pass http://127.0.0.1:8000;
        include proxy_params;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- Certbot should be set up in order to use 443 instead of 80 as the default port, honestly, I just followed the guide from <https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04> to be completely honest since It's been a while since I've done this. I'm currently mostly using <https://caddyserver.com/> for reverse proxy, since it has more out-of-the-box setup than nginx.
