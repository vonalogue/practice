""" This returns the running median of a growing sequence of numbers fed by user input.

A min heap and a max heap (two user-defined "Heap" objects) are used to store the numbers in relative order.

To test the algorithm's functionality against an existing set of solutions, one may provide command-line parameters that accept a file that provides input for the sequence and a file that contains solutions,
the expected lines of output that correspond to the input:

    median.py -i <inputfile> -o <outputfile>

"""

__name__ = 'median.py'
__author__ = 'Dennis Golanov'

import sys
import getopt


class Heap:

    def __init__(self, prop):
        self._data = [0]
        self._prop = prop
        self._root = None
        self._size = 0

    @property
    def root(self):
        if self.size:
            self._root = self.get(1)
        return self._root

    @property
    def data(self):
        if self.size:
            return self._data[1:]
        return []

    @property
    def prop(self):
        return self._prop

    @property
    def size(self):
        self._size = len(self._data) - 1
        return self._size

    def get(self, index):
        return self._data[index]

    def set(self, index, val):
        self._data[index] = val

    def unheapified(self, child, parent):
        return child < parent if self.prop == 'min' else child > parent

    def insert(self, node):
        self._data.append(node)
        prop = self.prop.swapcase()

        c_i = self.size
        p_i = c_i >> 1
        child = self.get(c_i)
        parent = self.get(p_i)

        print '\n%s: ADDING %d...\n' % (prop, child)

        while c_i > 1:
            if self.unheapified(child, parent):
                print 'SWAPPING %d and PARENT %d...' % (child, parent)
                self.set(c_i, parent)
                self.set(p_i, child)
                c_i = p_i
                p_i = c_i >> 1
                child = self.get(c_i)
                parent = self.get(p_i)
            else:
                break

    def delete(self):
        prop = self.prop.swapcase()

        if self.size == 1:
            return self._data.pop()
        elif self.size > 1:
            print '\n%s: DELETING ROOT %d...\n' % (prop, self.root)
            self.set(1, self._data.pop())

        c_i = 2
        p_i = 1
        l_i = self.size + 1

        while c_i < l_i:
            child = self.get(c_i)
            parent = self.get(p_i)

            if c_i+1 < l_i and self.unheapified(self.get(c_i+1), child):
                c_i += 1
                child = self.get(c_i)

            if self.unheapified(child, parent):
                print 'SWAPPING %d and PARENT %d...' % (child, parent)
                self.set(c_i, parent)
                self.set(p_i, child)
                p_i = c_i
                c_i = p_i << 1
            else:
                break


def print_info(Max, median, Min, nums):
    max_root = 0 if not Max.root else Max.root
    min_root = 0 if not Min.root else Min.root

    print '********'
    print 'MAX HEAP\n********\nDATA: {data}\nROOT: {root}\n'.format(data=Max.data, root=max_root)
    print 'MEDIAN: {med}\n'.format(med=median)
    print '********'
    print 'MIN HEAP\n********\nDATA: {data}\nROOT: {root}\n'.format(data=Min.data, root=min_root)
    print 'TOTAL INPUT: {all_nums}'.format(all_nums=nums)


def build_heaps(in_file=None, out_file=None):
    median = 0
    nums = []
    MinHeap = Heap('min')
    MaxHeap = Heap('max')
    testing = True if in_file else False

    if testing:
        with open(in_file, 'r') as i, open(out_file, 'r') as o:
            in_lines = i.readlines()
            out_lines = o.readlines()
            n = int(in_lines[0])
            nums = [int(x) for x in in_lines[1:]]
            output = [float(x) for x in out_lines]
    else:
        n = int(raw_input('# OF ELEMENTS: ').strip())

    for x in xrange(n):
        new_num = nums[x] if testing else int(raw_input('> ').strip())

        if not MinHeap.root:
            MinHeap.insert(new_num)
        else:
            MinHeap.insert(new_num) if new_num >= MinHeap.root else MaxHeap.insert(new_num)

        if MinHeap.size - MaxHeap.size == 2:
            MaxHeap.insert(MinHeap.root)
            MinHeap.delete()
        elif MaxHeap.size - MinHeap.size == 2:
            MinHeap.insert(MaxHeap.root)
            MaxHeap.delete()

        if MinHeap.size > MaxHeap.size:
            median = MinHeap.root / 1.0
        elif MinHeap.size < MaxHeap.size:
            median = MaxHeap.root / 1.0
        else:
            median = (MaxHeap.root+MinHeap.root) / 2.0

        if testing:
            print 'LINE #{line}\nGOT {median}(EXPECTED: {expected})'.format(line=x+1,
                median=median, expected=output[x])
            assert median == output[x]

        nums.append(new_num)
        print_info(MaxHeap, median, MinHeap, nums)


def main(argv):
    try:
        opts, args = getopt.getopt(argv, 'i:o:')
    except getopt.GetoptError:
        print 'Invalid argument(s). Must enter:'
        print 'median.py -i <input> -o <output>'
        sys.exit(2)

    if len(opts) == 1:
        print 'Insufficient arguments. Must enter:'
        print 'median.py -i <input> -o <output>'
        sys.exit(2)

    in_file = None
    out_file = None

    for opt, arg in opts:
        if opt == '-i':
            in_file = arg
        if opt == '-o':
            out_file = arg

    build_heaps(in_file, out_file)


if __name__ == '__main__':
    main(sys.argv[1:])
