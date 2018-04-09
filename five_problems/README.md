These files are solutions to the five problems listed on this website: 

	https://www.shiftedup.com/2015/05/07/five-programming-problems-every-software-engineer-should-be-able-to-solve-in-less-than-1-hour

Here's a list that shows each problem's solution in order:

	1. sum.py
	2. altlists.py
	3. fib.py 
	4. largest.py
	5. ops.py

Technical notes on problems 4 and 5:


Problem #4: 

The author of these problems mentions the use of string-padding and type-casting for lexical comparison, a technique one may use to solve this problem.
The author detracted from using padding in favor of simply type-casting two integers to compare as strings, specifically the two possible strings that
the integers can form via concatenation  and then negating the value that compareTo() returns in order to compare the first digits of the "integers."


However, there is no need for lexical comparison; I  used the modulo operator to isolate the integer by dividing it by (10^n-1), where
n is the number of digits in the integer. This obviates using built-in functions for type-casting, which would anyway saddle
the algorithm with more operations and overhead.   

Problem #5:

As daunting as it may seem at first, this problem actually warrants a rather digestible solution. In order to realize this, I had to
concede that this problem is of the NP-complete sort; wWhen you do this, you humbly realize that you can only offer an approximate answer——or 
indeed offer an exact answer, but only by  "approximate" means (e.g. a greedy or brute-force algorithm).

The author of the problem purveys a divide-and-conquer approach that involves solving the individual calculations first before "stitching" them
together by methodically "cycling" through each of the three possible operations.  

However, I chose to generate random numbers to select the next operation, emphasizing the "brute-force" approach. Additionally, I chose to
put together the combination of operations and numbers first and then iterate through it to perform the operations, caching solutions and
terminating the algorithm once the total number of possible solutions is reached (eleven in this case).


  
  





