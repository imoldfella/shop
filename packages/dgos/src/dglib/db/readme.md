
#

branches can just be numbers on servers, which improves anonymity.
23@s1.froov.net

branch can point to its parent group and to its host.

profiles can be based on the id public key. probably a shorter hash of it?

basic idea is to pin the pages and let the ui thread read the pages directly?
this might be hard to do with optimistic latching. It's probably better to send the slice to the ui and let it diff it with tupleids.

so if the watcher is triggered, it requeries and sends the data to interested clients.
