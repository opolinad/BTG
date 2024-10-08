from flask import Blueprint, g, current_app

from app.handler.fund import add_fund
from app.handler.user import get_user_history
from app.decorators.validations import user_exists
from app.decorators.response import response

from app.common.exception import CommonException

bp = Blueprint('user', __name__, url_prefix='/user')

@bp.get('<string:user_id>/history')
@user_exists
@response
def history_for_user(user_id: str):
    if g.get("user"):
        return get_user_history(g.user['id'], current_app.service_query)

    raise CommonException(
        'User not found',
        'User with the id provided doesn\'t exist',
        404
    )
