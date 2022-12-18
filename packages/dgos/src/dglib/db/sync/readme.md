
# sync secrets
server will not send sync on a branch unless the client know its sync secret
the sync key is just a random secret
when it is rotated it must be published to all readers and to the host.

a keypair would offer no additional security, since its value is only hidden to the server, and the server knows the lsn anyway.




