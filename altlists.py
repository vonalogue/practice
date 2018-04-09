def alternate(arr_1, arr_2):
    new = [x for y in zip(arr_1, arr_2) for x in y]
    return new
