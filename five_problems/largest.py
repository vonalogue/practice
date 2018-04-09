import collections

def find_largest(arr):
    aux = collections.deque()

    def first_digit(num):
        digits = len(str(num))
        first = num
        if digits > 1:
            first = num / (10**(digits - 1))
        return first

    for x in arr:
        current = first_digit(x)
        if not aux:
            aux.append(x)
        else:
            aux_size = len(aux)
            for y in xrange(aux_size):
                aux_num = first_digit(aux[y])
                if current < aux_num:
                    if y == aux_size-1:
                        aux.append(x)
                else:
                    aux.appendleft(x)
                    break
    return ''.join(str(x) for x in aux)


print find_largest([52, 5, 3])
