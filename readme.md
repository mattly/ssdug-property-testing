# Property-Based Testing

1. intro - what property tesing does
    a. there and back - deserializing the output of a serialzier
    b,c. test examples require imagination to be thorough

2. some mathematical properties for pure functions
    a. idempotent: repeated calls have no further effect    f(a) = f(f(a))
    b. involutive: repeated calls reverse the effect        a = f(f(a))
    c. commutative: order of arguments doesn't matter       a + b = b + a
    d. distributive: order of operations doesn't matter     f(a+b) = f(a) + f(b)
    e. associative: grouping doesn't matter                 a + (b + c) = (a + b) + c
        generally applies to any concatenation-type operation
    f. identity operations                                  f(a,b) = a where a = 1
        there's a special argument that makes the operation return the other argument
    g. zeroing operations                                   f(a,b) = b where a = 0
        there's a special argument that makes the operation return the special argument
    h. injective operations                                 f(x) = z & f(y) = z ∴ x = y
    i. bijective operations
        all inputs map to exactly one output, and vise versa; operation is therefore reversible
        - reverse
        - push/pop, shift/unshift
        - serializers/deserializers, encoders/decoders

3. mindset, other ideas for application
    a. mindsets
        Easier:
            - things "mathy" in nature
            - "pure" operations with no side-effects
        Medium:
            - things involving state / dependednt operations
            - things with complex inputs/outputs
            - side effects that are deterministic
        Hard:
            - things with opaque state
            - non-deterministic side-effects
        - triangle inequality: https://en.wikipedia.org/wiki/Triangle_inequality
        - what are the boundaries of the thing I'm testing?
        - what does the thing I'm testing actually _do_?
        - Matthew's Three Types of Bugs
            i.   it doesn't do what it's supposed to
            ii.  it does what it's supposed to do, but what it's supposed to do is wrong
            iii. we don't know what it's supposed to do, and we don't like what it's doing
    b. equivalent / reference implementations
        - various sorting algorithms
        - query engines:
            - generating data for the database, variables for query
            - parallel implement query operation in code (which is presumably more readable/predictable)
            - does the database query results equal the code results
    c. state machines
        - generate sequences of operations
    d. race conditions
        - generate sequences of operations over time, validate nothing bad happens
    e. UI fuzzing
        - https://medium.com/criteo-engineering/detecting-the-unexpected-in-web-ui-fuzzing-1f3822c8a3a5
    f. random data for fuzzing
    g. random data for demos
    h. abuse them as solvers
        - water pouring puzzle: https://en.wikipedia.org/wiki/Water_pouring_puzzle
         (prettier example of this for Python's Hypothesis: https://hypothesis.works/articles/how-not-to-die-hard-with-hypothesis/ )

4. generating values
    This part is tedious, varies highly from library to library

    in general, you are building a Rose tree: https://en.wikipedia.org/wiki/Rose_tree
        each branch / leaf has a notion of magnitude, and can be "shrunk" or removed

    I suggest composing from primitives and mapping/filtering them into "subtypes"

5. some language libraries:
    - the OG QuickCheck: https://hackage.haskell.org/package/QuickCheck
    - JavaScript & variants: FastCheck https://fast-check.dev
    - Clojure (where I was introduced to it): https://github.com/clojure/test.check
    - .NET: FsCheck https://fscheck.github.io/FsCheck/
    - Go: Rapid https://github.com/flyingmutant/rapid
    - Java: Junit-Quickcheck https://github.com/pholser/junit-quickcheck
    - Python: Hypothesis https://hypothesis.works
    - Swift: SwiftCheck https://github.com/typelift/SwiftCheck
    - Ruby: Rantly https://github.com/rantly-rb/rantly

    and so many more: https://github.com/topics/quickcheck
