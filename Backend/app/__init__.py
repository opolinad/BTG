import os

from flask import Flask
from flask_cors import CORS
from .routes import bp
from pymongo import MongoClient
from app.sql.service_quey import ServiceQuery


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MONGODB_URI=os.getenv('MONGODB_URI'),
        MONGODB_DATABASE_NAME=os.getenv('MONGODB_DATABASE_NAME')
    )
    CORS(app)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    app.register_blueprint(bp)

    client = MongoClient(app.config['MONGODB_URI'])
    db = client[app.config['MONGODB_DATABASE_NAME']]
    app.service_query = ServiceQuery(db)

    return app