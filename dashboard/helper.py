def jsonToDict(json_array):
    data = dict()
    for json_item in json_array:
        data[json_item[0]] = json_item[1]
    return data