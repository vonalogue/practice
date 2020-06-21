""" Add increments of 1, 3, and 5 to determine how many operations it would take to
equalize all numbers in a given array (while leaving one arbitrary number unchanged
per operation).
"""

def count_ops(arr):
    INCR = [1, 3, 5]
    to_add = []
    new_arr = arr
    class Var():
        count = 0

    def operate(arr):
        idx = 0
        while len(set(new_arr)) > 1:
            size = len(new_arr)
            if idx+1 == size:
                idx = 0
                continue

            idx_same = idx+1
            diff = arr[idx+1]-arr[idx]
            if diff < 0:
                diff = diff*-1
                idx_same = idx
            elif diff == 0:
                idx += 1
                continue

            if diff not in INCR:
                find_factors(diff)
            else:
                to_add.append(diff)
            for a in to_add:
                for x in xrange(size):
                    if x != idx_same:
                        new_arr[x] += a
                Var.count += 1
                print '{na} | added {ta}'.format(na=new_arr,ta=a)
            to_add[:] = []
            idx += 1
        return Var.count

    def find_factors(n):
        greatest = 0
        for x in INCR:
            if n >= x:
                greatest = x
            else:
                break
        mltp = n/greatest
        rmdr = n%greatest
        to_add.extend([greatest]*mltp)
        if rmdr:
            return find_factors(rmdr)
        return to_add

    return operate(arr)
    # end count_ops()


if __name__ == "__main__":
    t = int(raw_input().strip())
    for _ in xrange(t):
        arr = map(int, raw_input().strip().split(' '))
        result = count_ops(arr)
        print result
