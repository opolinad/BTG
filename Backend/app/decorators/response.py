from functools import wraps

from app.common.response import Response
from app.common.exception import CommonException

def response(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            response = func(*args, **kwargs)

            if isinstance(response, tuple):
                return Response(response[0], response[1]).get_response()

            return Response(response).get_response()
        except CommonException as e:
            return Response(e, e.status_code).get_response()
    return wrapper