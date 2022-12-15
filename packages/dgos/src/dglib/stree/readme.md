#


// tree built to share with sharedarraybuffer
// lsm where mem tree is a pam tree

// we might want to compress before storing. we need special log stuff. we might want to be able to use chrome file access.
// ReadableStreamBYOBReader not in safari.
// can read blobs directly into webassembly
// https://wicg.github.io/file-system-access/
// file system access not in firefox.
// https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
// FileSystemWritableStream, not in safari, not in firefox

// disk pointers should have two size classes: compressed and uncompressed
// does lz4 allow decompression in place? not a big deal



Each l1+ block is integer[] key, followed by integer[] pointer

l0 block is integer[]start followed by blobs.

we need an extra int array for start of key
and an extra byte array for the keys.

1. merge the lsm snapshots into the local btree with bulk mvcc
2. generate snapshots the same way.

what about logical pages? what about using shared buffers as pages?

can each page be a cow? single threaded writer.

javascript needs madvise to make this efficient;

basic idea is start by sharing a large array of shared buffers (512KB)?

resizeable array buffers are a stage 3 draft.

<https://db.in.tum.de/~freitag/papers/p2797-freitag.pdf?lang=en>
