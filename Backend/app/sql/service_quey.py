import datetime

from pymongo import MongoClient
from bson.objectid import ObjectId

from app.utils.format import parse_id_str

class ServiceQuery:
    def __init__(self, connection):
        self.connection = connection

    def get_user_by_id(self, user_id):
        users_collection = self.connection['user']
        result = users_collection.find_one({"_id": ObjectId(user_id)})

        if not result:
            return None

        parse_id_str(result)

        return result

    def get_fund_by_id(self, fund_id):
        funds_collection = self.connection['fund']
        result = funds_collection.find_one({"_id": ObjectId(fund_id)})

        if not result:
            return None

        parse_id_str(result)

        return result

    def get_user_history(self, user_id):
        history_collection = self.connection['history']
        history = list(history_collection.find({"user_id": ObjectId(user_id)}))

        if not history:
            return []

        for h in history:
            parse_id_str(h)
            parse_id_str(h, 'fund_id')
            parse_id_str(h, 'user_id')


        return history

    def add_user_fund(self, user_id: str, fund: dict) -> None:
        self.insert_into_history(user_id, fund["id"], "add")
        self.update_user_capital(user_id, -fund["capital"])

    def cancel_user_fund(self, user_id: str, fund: dict) -> None:
        self.insert_into_history(user_id, fund["id"], "cancel")
        self.update_user_capital(user_id, fund["capital"])

    def update_user_capital(self, user_id: str, amount: float) -> dict:
        users_collection = self.connection['user']
        users_collection.update_one({"_id": ObjectId(user_id)}, {
            "$inc": {"capital": amount}
        })

    def insert_into_history(self, user_id:str, fund_id:str, transaction_type:str)->None:
        history_collection = self.connection['history']
        history_collection.insert_one({
            "user_id": ObjectId(user_id),
            "fund_id": ObjectId(fund_id),
            "transaction_type": transaction_type,
            "created": datetime.datetime.utcnow()
        })