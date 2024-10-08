from app.sql.service_quey import ServiceQuery

def get_user_history(user_id: str, service_query: ServiceQuery)->dict:
    return service_query.get_user_history(user_id)