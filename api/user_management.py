import pandas as pd
import os

def create_user():
	print("ok")

def win(username,df):
	row_num = df[df["username"] == username].index[0]
	df.at[row_num,"wins"] = df.at[row_num,"wins"]+1
	df.to_csv("./dev_storage/users.csv", index=False)
	clear_boards(df)

def clear_boards(df):
	os.system("rm ./dev_storage/bingo_cards/*")
	df = df.drop(columns="current_card")
	df["current_card"] = ""
	df.to_csv("./dev_storage/users.csv", index=False)

def leaderboard(df):
	df = df.drop(columns="current_card")
	df.wins = pd.to_numeric(df.wins, errors='coerce')
	df = df.sort_values("wins",ascending=False)
	return df.to_json()