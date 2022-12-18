
#

branches can just be numbers on servers, which improves anonymity.
23@s1.froov.net

branch can point to its parent group and to its host.

profiles can be based on the id public key. probably a shorter hash of it?

basic idea is to pin the pages and let the ui thread read the pages directly?
this might be hard to do with optimistic latching. It's probably better to send the slice to the ui and let it diff it with tupleids.

so if the watcher is triggered, it requeries and sends the data to interested clients.

admin creates a revoke/grant command, signs it, creates a new publishing key, winds the reader key, then publishes the new reader key.

how do you revoke an admin? problem, admin already knows the winding key, so that needs to be replaced. In this case we need to create a new winding key and include both keys, drop extra key when lazy encryption is complete.

we could create admin sets, then the admin sets would could reuse their key setup on multiple branches.
the problem with this is that most branches have unique admin sets! roughly a DM + friends on both sides of the dm.
