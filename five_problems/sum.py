def sum_for(arr):
    sum = 0
    for x in xrange(len(arr)):
        sum += arr[x]
    return sum

def sum_while(arr):
    sum = 0
    x = 0
    while x < len(arr):
        sum += arr[x]
        x += 1
    return sum

def sum_recursion(arr, sum=0):
    while arr:
        return sum_recursion(arr[1:], sum+arr[0])
    return sum
