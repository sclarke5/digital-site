#!/usr/bin/env bash

mkdir ssl 2>/dev/null

PATH_SSL="ssl"
PATH_KEY="${PATH_SSL}/${1}.key"
PATH_CSR="${PATH_SSL}/${1}.csr"
PATH_CRT="${PATH_SSL}/${1}.crt"

if [ ! -f $PATH_KEY ] || [ ! -f $PATH_CSR ] || [ ! -f $PATH_CRT ]
then
  openssl genrsa -out "$PATH_KEY" 2048 2>/dev/null
  openssl req -new -key "$PATH_KEY" -out "$PATH_CSR" -subj "/CN=$1/O=AstoundLab.com/C=US" 2>/dev/null
  openssl x509 -req -days 3650 -in "$PATH_CSR" -signkey "$PATH_KEY" -out "$PATH_CRT" 2>/dev/null
fi

echo "Self-signed SSL certificate for successfully ${1} created"
