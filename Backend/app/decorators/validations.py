from functools import wraps
from flask import request, jsonify, g, current_app

from app.common.exception import CommonException
from app.common.response import Response
from app.utils.format import parse_id_str

def user_exists(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user_id = kwargs.get('user_id') or request.get_json().get('user_id')

        user = current_app.service_query.get_user_by_id(user_id)

        if user:
            g.user = user

        return f(*args, **kwargs)

    return wrapper

def fund_exists(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        fund_id = kwargs.get('fund_id')

        fund = current_app.service_query.get_fund_by_id(fund_id)

        if fund:
            g.fund = fund

        return f(*args, **kwargs)

    return wrapper