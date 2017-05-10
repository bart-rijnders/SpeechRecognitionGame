package main

import (
	"flag"
	"net/http"
	"log"
)

const (
	defaultDirectory = "static"
	defaultPort = "8080"
)

func main() {
	port := flag.String("p", defaultPort, "Port for the file server.")
	directory := flag.String("d", defaultDirectory, "The directory for the static files.")
	flag.Parse()

	http.Handle("/", http.FileServer(http.Dir(*directory)))

	log.Printf("Serving directory `%s` on HTTP port: `%s`\n", *directory, *port)
	log.Fatal(http.ListenAndServe(":" + *port, nil))
}
