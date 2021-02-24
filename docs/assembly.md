# Assembly

## Instructions

### Int32

#### Constants

- `const [n:int]`: push `n`

#### Stack Operations
- `dup`: duplicate
- `get [n:int]`: get the `n`th element
  - if `n` is non-negative, count from the bottom of the stack
  - if `n` is negative, count from the top of the stack
- `set [n:int]`: set the `n`th element
  - if n is non-negative, count from the bottom of the stack
  - if n is negative, count from the top of the stack
- `drop`

#### Bitwise Operations

- `not`: bitwise not
- `and`: bitwise and
- `or`: bitwise or
- `xor`: bitwise xor
- `shl`: shift left
- `shr_u`: shift right (unsigned)
- `shr_s`: shift left (signed)

#### Arithmetic Operations

- `add`: add
- `sub`: subtract
- `mul10`: multiply 10, but faster than `mul`
- `mul`: multiply

#### Comparison Operations

- `eqz`: equal to 0
- `nez`: not equal to 0
- `eq`: equal to
- `lt_s`: less than (signed)
- `le_s`: less than or equal to (signed)
- `lt_u`: less than (unsigned)
- `le_u`: less than or equal to (unsigned)
- `gt_s`: greater than (signed)
- `ge_s`: greater than or equal to (signed)
- `gt_u`: greater than (unsigned)
- `ge_u`: greater than or equal to (unsigned)

#### Input/Output Operations

- `scan`
- `print`

#### Control Instructions
