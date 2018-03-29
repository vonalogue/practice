#!/bin/python
import sys


def merge_sort(arr):

    def merge(*indices):           # indices = first, last, and pivot indices, respectively
        head, tail = indices[0], indices[1]
        pivot = indices[2]

        i = head
        j = pivot+1
        k = 0
        temp = list(new_arr)

        while (i <= pivot and j <= tail):
            if new_arr[i] < new_arr[j]:
                temp[k] = new_arr[i]
                i += 1
                k += 1
            else:
                temp[k] = new_arr[j]
                j += 1
                k += 1

        while (i <= pivot):
            temp[k] = new_arr[i]
            i += 1
            k += 1
        while (j <= tail):
            temp[k] = new_arr[j]
            j += 1
            k += 1

        print temp
        print 'head: %d | pivot: %d | tail: %d' % (head, pivot, tail)
        for x in xrange(head, tail+1):
            new_arr[x] = temp[x-head]

    def split(arr, *indices):      # indices = first and last indices, respectively
        head, tail = indices[0], indices[1]
        pivot = (head+tail) / 2

        if head < tail:
            l_sub = arr[head:pivot+1]
            r_sub = arr[pivot+1:tail+1]

            split(l_sub, head, pivot)
            split(r_sub, pivot+1, tail)
            merge(head, tail, pivot)

    new_arr = arr
    tail = len(new_arr)-1
    split(new_arr, 0, tail)

    return new_arr


if __name__ == "__main__":
    loops = int(raw_input().strip())
    for _ in xrange(loops):
        arr = map(int, raw_input().strip().split(' '))
        result = merge_sort(arr)
        print result
