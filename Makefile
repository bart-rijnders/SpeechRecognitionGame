.DEFAULT_GOAL := all

all:
	go generate
	go install
