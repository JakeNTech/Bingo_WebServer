from flask import Flask, jsonify, request
from api import bingo,py_api

app = Flask(__name__)

#Send Index.html
@app.route('/')
def load_index():
    return app.send_static_file('index.html')

# Send Files to make index.html look nice and fancy
@app.route('/assets/js/<file>')
def send_js(file):
    js_path = "assets/js/"+file
    return app.send_static_file(js_path)
@app.route('/assets/css/<file>')
def send_css(file):
    css_path = "assets/css/"+file
    return app.send_static_file(css_path)
@app.route('/assets/img/<file>')
def send_img(file):
    img_path = "assets/img/"+file
    return app.send_static_file(img_path)

# Deal with API requests..by passing them to the other python file and then back to JS.
@app.route('/api/<action>',methods=['GET'])
def api_call(action):
    username = request.args.get("username")
    to_return = py_api.api(action,username)
    #print(to_return)
    return to_return

if __name__ == "__main__":
    print("Configuration Loaded!")
    app.run()