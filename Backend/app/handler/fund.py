from app.sql.service_quey import ServiceQuery
from app.common.exception import CommonException

def add_fund(user:dict, fund:dict, service_query:ServiceQuery)->tuple:
    if user['capital'] < fund['capital']:
        raise CommonException(
            'Insufficient funds',
            f'No tiene saldo disponible para vincularse al fondo {fund['nombre']}.',
            400
        )

    service_query.add_user_fund(user['id'], fund)
    return {}, 204

def cancel_fund(user_id:str, fund:dict, service_query:ServiceQuery)->tuple:
    service_query.cancel_user_fund(user_id, fund)
    return {}, 204