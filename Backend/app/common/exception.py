class CommonException(Exception):
    def __init__(self, error, message, status_code):
        self.error = error
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {
            'error': self.error,
            'message': self.message,
            'status_code': self.status_code
        }