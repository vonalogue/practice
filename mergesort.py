#!/bin/python
import sys


def merge_sort(arr):

    class Context:
        count = 0                  # count operations

    def merge(*indices):           # indices = first, last, and pivot indices, respectively
        head, tail = indices[0], indices[1]
        pivot = indices[2]

        i = head
        j = pivot+1
        k = 0

        while (i <= pivot and j <= tail):
            if new[i] <= new[j]:
                aux[k] = new[i]
                i += 1
                k += 1
            else:
                aux[k] = new[j]
                j += 1
                k += 1
                Context.count += 1

        while (i <= pivot):
            aux[k] = new[i]
            i += 1
            k += 1
        while (j <= tail):
            aux[k] = new[j]
            j += 1
            k += 1

        print '{a}'.format(a=aux)
        for x in xrange(head, tail+1):
            new[x] = aux[x-head]
        # end merge

    def split(a, *indices):      # indices = first and last indices, respectively
        head, tail = indices[0], indices[1]
        pivot = (head+tail) / 2

        if head < tail:
            l_sub = a[head:pivot+1]
            r_sub = a[pivot+1:tail+1]

            split(l_sub, head, pivot)
            split(r_sub, pivot+1, tail)
            merge(head, tail, pivot)
        # end split

    new = arr
    aux = list(new)
    tail = len(new)-1

    split(new, 0, tail)
    print 'Operations: %d' % Context.count
    return new
    # end merge_sort


if __name__ == "__main__":
    t = int(raw_input().strip())
    for _ in xrange(t):
        arr = map(int, raw_input().strip().split(' '))
        result = merge_sort(arr)
        print result
