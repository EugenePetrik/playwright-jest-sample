## Sample project for UI testing

### Test Services

https://the-internet.herokuapp.com/

### Requirements

- NodeJS
- GIT

### Install project

```bash
npm i
```

### Run tests

```bash
npm t
```

### Run tests from a specific file

```bash
npm t -- ./src/tests/main.test.js
```

### Run tests in docker

- Build Docker image:

```bash
docker build . -t <image_name:image_tag>
```

For example,

```bash
docker build . -t the-internet-playwright:latest
```

- Run tests:

```bash
docker run -it --rm <image_name:image_tag>
```

For example,

```bash
docker run -it --rm the-internet-playwright:latest
```

- Save test report:

```bash
docker run -v ${PWD}/reports:/app/reports -it --rm the-internet-playwright
```

- Touch to container:

```bash
docker run --name <container_name> -it <image_name:image_tag>
```

```bash
docker start <container_name>
```

```bash
docker exec -it <container_name> bash
```

```bash
docker stop <container_name>
```

For example,

```bash
docker run --name the-internet-container -it the-internet-playwright:1.0
```

```bash
docker start the-internet-container
```

```bash
docker exec -it the-internet-container bash
```

```bash
docker stop the-internet-container
```

- Container logs:

```bash
docker logs <container_name>
```

- Remove container:

```bash
docker container rm <container_name>
```

- Remove image:

```bash
docker rmi <image_name:image_tag>
```

### Run tests in docker-compose

```bash
docker-compose up
```

```bash
docker-compose down
```

### Run tests in docker-compose

```bash
docker-compose up
```

```bash
docker-compose down
```
