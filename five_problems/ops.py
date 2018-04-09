import readchar
import random


def find_seq(it):

    class Data():
        TARGET = 100
        OPS = ['+', '-', '|']
        NUMS = [x for x in xrange(1, 10)]
        total = None

    rnd = random.SystemRandom()
    passes = []

    def operate(op, left, right):
        if Data.total is None:
            Data.total = 0
            Data.total += int(left)
        if op == '+':
            Data.total += int(right)
        elif op == '-':
            Data.total -= int(right)

    def create(it):
        for x in xrange(it):
            op = ''
            seq = []
            left, right, idx = 0, 0, 0

            while idx < 8:
                prev_num = left
                prev_op = op
                left = Data.NUMS[idx]
                right = Data.NUMS[idx+1]

                if prev_op == '|':
                    op = Data.OPS[rnd.randint(0,1)]
                else:
                    op = Data.OPS[rnd.randint(0,2)]

                if op == '|':
                    if idx > 0:
                        seq.append(seq.pop() + str(right))
                    else:
                        seq.append(str(left) + str(right))
                else:
                    if idx > 0:
                        seq.extend([op, str(right)])
                    else:
                        seq.extend([str(left), op, str(right)])
                idx += 1
            # end while

            idx = 0
            while idx < len(seq):
                if idx % 2 == 0 and idx <= len(seq)-2:
                    operate(seq[idx+1], seq[idx], seq[idx+2])
                idx += 1

            result = ''.join(seq)
            print result, '= {total}'.format(total=Data.total)
            assert Data.total == eval(result)

            if Data.total == Data.TARGET:
                passes.append(result)
                print 'SUCCESS!\n'
            else:
                print 'FAILURE!\n'
            Data.total = None
        # end while
        return passes
    # end create()
    return create(it)
# end find_seq


if __name__ == '__main__':
    it = int(raw_input('# of CYCLES: ;').strip())
    seqs = find_seq(it)
    if seqs:
        print '{n} SUCCESSFUL SEQUENCES'.format(n=len(seqs))
        for x in seqs:
            print x, '= 100'
