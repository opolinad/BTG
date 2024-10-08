def parse_id_str(entity:dict, key:str = 'id')->None:
    model_key = '_id' if key == 'id' else key
    entity[key] = entity.get(model_key).__str__()

    if model_key == '_id':
        del entity[model_key]