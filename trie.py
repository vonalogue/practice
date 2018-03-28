class Trie:

    __slots__ = ['trie']

    def __init__(self):
        self.trie = {None: {chr(c): {} for c in xrange(97, 123)}}
        self.root = self.trie[None]
        self.end = '_'

    def add(self, name):
        if len(name) < 2:
            return
        level = self.root[name[0]]
        tokens = [name[1:x] for x in xrange(2, len(name)+1)]
        current = tokens[0]

        for x in xrange(0, len(tokens)):
            current = tokens[x]
            if x < len(tokens)-1 and current in level and tokens[x+1] not in level:
                print '{token} exists'.format(token=current)
                level = level[current]
                for t in xrange(x+1, len(tokens)):      # slice the pre-existing prefix off the rest of the tokens
                    tokens[t] = tokens[t][len(current):]
            else:
                level.setdefault(current, {})
        level[current].setdefault(self.end, {})

        print self.trie

    def find(self, name):
        if len(name) < 2:
            return 0
        level = self.root[name[0]]
        tokens = [name[1:x] for x in xrange(2, len(name)+1)]
        times_found = 0

        # search for the _ terminating character to count supersets
        def search_ends(level):
            for token, suffixes in level.iteritems():
                yield token, suffixes
                for t, s in search_ends(suffixes):
                    yield t, s

        for x in xrange(0, len(tokens)):
            current = tokens[x]
            if current not in level:
                return 0

            if x < len(tokens)-1 and tokens[x+1] not in level:      # if the next token is nested...
                    level = level[current]
                    for t in xrange(x+1, len(tokens)):              # again, slice the pre-existing prefix off the rest of the tokens
                        tokens[t] = tokens[t][len(current):]

            elif x == len(tokens)-1:
                    #print 'FOUND {t} IN {lvl}'.format(t=current,lvl=level)
                    for token, branch in search_ends(level):
                        if token == self.end:
                            #print 'END FOUND IN {lvl}'.format(lvl=level)
                            times_found += 1

        return times_found


n = int(raw_input().strip())
contacts = Trie()
searches = []

for _ in xrange(n):
    op, contact = raw_input().strip().split(' ')
    if op == 'add':
        contacts.add(contact)
    elif op == 'find':
        searches.append(contacts.find(contact))

for s in searches:
    print s
