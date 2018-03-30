class Trie:

    __slots__ = ['root']

    def __init__(self):
        self.root = {None: {chr(c): {} for c in xrange(97, 123)}}
        self.end = '_'  # terminating character

    def add(self, name):
        level = self.root[None]
        for c in name:
            level = level.setdefault(c, {})
        level.setdefault(self.end, {})

    def find(self, name):
        level = self.root[None]
        times_found = -1

        for c in name:
            if c not in level:
                return 0
            level = level[c]
        times_found += 1

        # search for terminating character(s) after finding the word
        def search_ends(level):
            for letter, branch in level.iteritems():
                yield letter, branch
                for l, b in search_ends(branch):
                    yield l, b

        for letter, branch in search_ends(level):
            if letter == self.end:
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
