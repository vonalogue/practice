# -*- coding: utf-8 -*-
import string
import random
import getopt
import sys
import re

# Handles command line parameters
def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:], 's:rt:h')
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    s = ''; k = ''
    randomize = False
    for opt, arg in opts:
        if opt == '-s':
            s = arg
        elif opt == '-r':
            randomize = True
        elif opt == '-t':
            k = arg
        elif opt == '-h':
            usage()
            sys.exit(0)
    encrypt(s, randomize, k)

def encrypt(s, randomize, k):
    if type(s) is str:
        abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if randomize == True:
            rnd = random.SystemRandom()
            keyStr = []
            for n in range(26):
                num = rnd.randint(0,9)
                keyStr.append(num)
                #print 'ADDED {num}'.format(num=num)
            keyStr = ''.join(map(str, keyStr))
            #print '{keyStrLen}'.format(keyStrLen=len(keyStr))
            #print '{keyStr}'.format(keyStr=keyStr)
            key = string.maketrans(abc, keyStr)
        else:
            keyStr = k
            try:
                key = string.maketrans(abc, keyStr)
            except ValueError:
                return 'TABLE \'{key}\' HAS INSUFFICIENT LENGTH (LENGTH IS {len}; MUST BE 26)'.format(key=keyStr, len=len(keyStr))
        print 'TRANSLATION'
        print '###########'
        translation = s.translate(key)
        print 'Original:\t{original}'.format(original=s)
        print 'Translation:\t{translation}\n'.format(translation=translation)
        print 'Key:\t{keyStr}\n'.format(keyStr=keyStr)
        if not re.search(r'\b0[0-9]', s):
            return 'INVALID TRANSLATION (found prefix \'0\')'
        return translation
    else:
        return '{input} IS INVALID DATA TYPE ({type})'.format(input=s, type=type(s))

if __name__ == '__main__':
    args = len(sys.argv)
    if args < 2:
        print 'Insufficient arguments provided ({args} provided; 2 required)'.format(args=str(args))
        sys.exit(2)
    main()
