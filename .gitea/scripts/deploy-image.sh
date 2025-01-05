# /bin/bash -eux

## docker imageのbuildとpush
cd "../../"

proj="d-next-resources"
commit=`git rev-parse HEAD`

login_docker() {
  echo "" | docker login harbor.example.com -u "admin" --password-stdin
}

next_tag=harbor.example.com/$proj/next:$commit
echo "$next_tag"
login_docker
docker buildx build -f ./docker/dockerfile.yaml --target next -t "$next_tag" --output type=docker .
docker push "$next_tag"
