import readchar
import random
import time

def find_seq(it):

    class Data():
        __slots__ = ['_passes']
        TARGET = 100
        OPS = ['+', '-', '|']
        NUMS = [x for x in xrange(1, 10)]
        _passes = {}
        _runtime = 0
        _cycles = 0
        _rnd = random.SystemRandom()

    def search():
        while Data._cycles < it or not it:
            start_time = time.time()
            total = None
            op = ''
            seq = []
            left, right, idx = 0, 0, 0

            while idx < len(Data.NUMS):
                prev_num = left
                prev_op = op

                left = Data.NUMS[idx]
                right = Data.NUMS[idx+1]

                op = Data.OPS[Data._rnd.randint(0,2)]
                if seq and int(seq[-1])/10 >= 10:       # If left-hand number already has 3 digits, avoid using the | operator for concatenating
                    op = Data.OPS[Data._rnd.randint(0,1)]

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
                    left = int(seq[idx])
                    op = seq[idx+1]
                    right = int(seq[idx+2])

                    if total is None:
                        total = 0
                        total += int(seq[idx])
                    if op == '+':
                        total += int(seq[idx+2])
                    elif op == '-':
                        total -= int(seq[idx+2])
                idx += 1

            result = ''.join(seq)
            assert total == eval(result), '{r} = {t}\n'.format(r=result,t=total)

            if total == Data.TARGET:
                if result in Data._passes:
                    Data._passes[result] += 1
                else:
                    Data._passes.setdefault(result, 1)
                    print 'SUCCESS!'
                if len(Data._passes) == 11:
                    return Data._passes
            else:
                print 'FAILED!'
            print '{r} = {t}'.format(r=result,t=total)

            total = None
            Data._cycles += 1
            Data._runtime += (time.time() - start_time)
        # end while
        return Data._passes
    # end create()

    seqs = search()
    n = len(seqs)
    if n == 11:
        n = 'ALL'
    print 'FOUND {n} POSSIBLE SEQUENCES in {rt} seconds!'.format(n=n,rt=Data._runtime)
    print '########################################\n'
    for s in seqs:
        print s, '= 100 | OCCURED {t} TIME(S)'.format(t=seqs[s])
# end find_seq


if __name__ == '__main__':
    it = int(raw_input('# of CYCLES: ').strip())
    print '(0 for infinite cycles)'
    find_seq(it)
