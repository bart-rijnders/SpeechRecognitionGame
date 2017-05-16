import json

f = open('wordlist.txt', 'r')
words = [line.rstrip() for line in f if len(line) > 4]

def write_words(filename, amount):
   file = open(filename, 'w+')
   file.write(json.dumps(words[0:amount]))
   file.close()

write_words("top_100_words.json", 100)
write_words("top_1000_words.json", 1000)
write_words("top_10000_words.json", 10000)
