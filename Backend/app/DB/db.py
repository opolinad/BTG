from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

class MongoDBConnection:
    def __init__(self, uri, database_name):
        self.uri = uri
        self.database_name = database_name
        self.client = None
        self.connection = None

    def connect(self):
        self.client = MongoClient(self.uri)
        self.connection = self.client[self.database_name]

    def close(self):
        if self.client:
            self.client.close()
