package main

//go:generate go-bindata -debug -o static.go -prefix static static/...

import (
	"bytes"
	"io"
	"net/http"
	"log"
	"flag"
)

const (
	directory = "static"
	defaultPort = "8080"
)

func main() {
	port := flag.String("p", defaultPort, "Port for the file server.")
	flag.Parse()

	http.Handle("/", http.StripPrefix("/", http.HandlerFunc(handleStaticFiles)))

	log.Printf("Serving directory `%s` on HTTP port: `%s`\n", directory, *port)
	log.Fatal(http.ListenAndServe(":" + *port, nil))
}

func handleStaticFiles(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if path == "" {
		path = "index.html"
	}
	if bs, err := Asset(path); err != nil {
		w.WriteHeader(http.StatusNotFound)
	} else {
		reader := bytes.NewBuffer(bs)
		io.Copy(w, reader)
	}
}
