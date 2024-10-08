from app.common.exception import CommonException

class Response:
    def __init__(self, param, code = 200):
        self.code = code
        if isinstance(param, (list, dict)):
            self.response = {
                'data': param,
                'status': 'success'
            }
        elif isinstance(param, CommonException):
            self.response = {
                'error':  param.to_dict(),
                'status': 'error'
            }
        else:
            raise ValueError("Invalid parameter type. Must be list, dict, or Exception.")

    def get_response(self):
        return self.response, self.code