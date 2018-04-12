s = ''
for n in xrange(1, 101):
    if n % 3 == 0:
        s += 'Fizz'
    if n % 5 == 0:
        s += 'Buzz'
    print s if s else n
    s = ''
