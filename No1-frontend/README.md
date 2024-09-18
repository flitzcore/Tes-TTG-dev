# Running Frontend
Install ```light-server```:
``` [bash]
npm install -g http-server
```
Run in port 3000 :
``` [bash]
light-server -s . -p 3000
```

# Error Solving

If open by directly runs ```index.html```, it will run into CORS error because some website block it for security reasons because the request does not come from a supported protocol (like http or https).