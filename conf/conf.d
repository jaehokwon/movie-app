server {
    listen 80;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://192.168.0.15;
    }
    
    error_page   500 502 503 504  /50x.html;
    
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}