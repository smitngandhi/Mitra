from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URL"))
db = client["mydatabase"]

# User Collection
users_collection = db["users"]
