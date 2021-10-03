import random
import string

def read(bingo_text_file):
	list_of_bingos = open("./word_lists/bingo_list.txt").read().split("\n")
	return list_of_bingos

def generate_bingo_card(filename):
	list_of_bingos = read("./word_lists/bingo_list.txt")
	card = []
	bingo_card_name = f"./dev_storage/bingo_cards/card_{filename}.csv"
	bingo_card = open(bingo_card_name,"w")
	randRange = range(0, len(list_of_bingos))
	card = random.sample(randRange, 5 * 5)
	bingo_card.write("0,1,2,3,4\n")
	for i in range(5):
		string = ""
		for j in range(4):
			string +=  str(list_of_bingos[random.randint(0,len(list_of_bingos)-1)])+","
		string +=  str(list_of_bingos[random.randint(0,len(list_of_bingos)-1)])+"\n"
		bingo_card.write(string)
	bingo_card.close()

def random_string():
	return random.randint(1000,9999)