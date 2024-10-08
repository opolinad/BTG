from flask import Blueprint, current_app, g

from app.handler.fund import add_fund, cancel_fund
from app.decorators.validations import user_exists, fund_exists
from app.decorators.response import response
from app.common.exception import CommonException

bp = Blueprint('fund', __name__, url_prefix='/fund/<fund_id>/')

@bp.post('add')
@user_exists
@fund_exists
@response
def add_fund_to_user(fund_id: str):
    user = g.get("user")
    fund = g.get("fund")

    if user is None:
        raise CommonException(
            'User not found',
            'User with the id provided doesn\'t exist',
            404
        )

    if fund is None:
        raise CommonException(
            'Fund not found',
            'Fund with the id provided doesn\'t exist',
            404
        )

    return add_fund(user, fund, current_app.service_query)

@bp.post('cancel')
@user_exists
@fund_exists
@response
def cancel_fund_for_user(fund_id: str):
    user = g.get("user")
    fund = g.get("fund")

    if user is None:
        raise CommonException(
            'User not found',
            'User with the id provided doesn\'t exist',
            404
        )

    if fund is None:
        raise CommonException(
            'Fund not found',
            'Fund with the id provided doesn\'t exist',
            404
        )

    return cancel_fund(user["id"], fund, current_app.service_query)