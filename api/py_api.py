import  pandas as pd
from api import user_management, bingo

def api(action,username):
	to_return = {}
	if action =="load_card":
		df = load_db()
		this_row = df.loc[df["username"]==username]
		if this_row.isnull().values.any():
			new_card_name = str(bingo.random_string())
			bingo.generate_bingo_card(new_card_name)
			update_new_bingo_card(df,username,new_card_name)
			bingo_card = read_csv(f"./dev_storage/bingo_cards/card_{new_card_name}.csv")
		else:
			card_no = (str(int(this_row["current_card"])))
			bingo_card = read_csv(f"./dev_storage/bingo_cards/card_{card_no}.csv")
		to_return = bingo_card.to_json()
	# See if the user exists in CSV
	elif action == "login":
		df = load_db()
		list_usernames = df["username"].to_numpy()
		if username in list_usernames:
			to_return = {"username":username,"status":"SUCSESS"}
		else:
			to_return = {"error":"User not found"}
	elif action == "update_card":
		df = load_db()
		this_row = df.loc[df["username"]==username]
		print(this_row)
		#bingo.update(username,item,row)
		to_return = {"OK":"OK"}
	else:
		to_return={"message":"CHEAT"}
	return to_return

def load_db():
	df = pd.read_csv("./dev_storage/users.csv")
	return df
def read_csv(path):
	df = pd.read_csv(path)
	return df
def update_new_bingo_card(df,username,newfilename):
	row_num = df[df["username"] == username].index[0]
	df.at[row_num,"current_card"] = newfilename
	df.to_csv("./dev_storage/users.csv", index=False)