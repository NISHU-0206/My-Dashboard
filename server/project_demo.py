import json
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/blackcoffer"
mongo = PyMongo(app)

# Load JSON data into MongoDB
def load_data():
    if "dataset" not in mongo.db.list_collection_names():
        with open(r"C:\Users\Asus\OneDrive\Desktop\python\spyder\jsondata.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            mongo.db.dataset.insert_many(data)

@app.route("/data", methods=["GET"])
def get_data():
    """Fetch all data with filters"""
    query = {}
    for param in ["end_year", "topic", "sector", "region", "country"]:
        if request.args.get(param):
            query[param] = request.args.get(param)

    data = mongo.db.dataset.find(query)
    return dumps(data), 200

if __name__ == "__main__":
    load_data()
    app.run(debug=True)
