import pandas as pd

def create_user():
	print("ok")

def win(username,df):
	row_num = df[df["username"] == username].index[0]
	df.at[row_num,"wins"] = df.at[row_num,"wins"]+1

	df.to_csv("./dev_storage/users.csv", index=False)

def update_new_bingo_card(df,newval,field):
	row_num = df[df[field] == newval].index[0]
	df.at[row_num,"current_card"] = newval
	df.to_csv("./dev_storage/users.csv", index=False)