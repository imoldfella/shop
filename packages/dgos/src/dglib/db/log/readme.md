# 

A portion of shared memory

32 byte header
1. flags: 4 bytes (quit)
2. signal: 4 bytes
3. tail: 8 bytes (write here, monotonic increasing, wrap around)
4. head: 8 bytes (read here, don't overwrite)
5. filler: 8 bytes
6. size - 32 bytes is the buffer. Must be a power of 2.

spin if buffer fills, only return buffers that aren't split, pad and retry if necessary.

each entry begins with a 4 byte length in bytes, the lower two bits are flags.
bit 0: 1 = padding
bit 1: 1 = committed


the log writer writes in order, it sleeps if all records are written up to the first uncommitted entry or tail.

