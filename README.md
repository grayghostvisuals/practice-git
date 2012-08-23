Practice-Git
============

This is a repository where you can eff up as much as you'd like. Here we learn all things git.
Feel free to send Pull Requests to see what it's like when someone asks you 
"Can you squash your commits for us" and you're all like "how the hell do I do that"


## Typical and highly used git commands

``git clone git@github.com:&lt;user_name&gt;/the-repo-you-are-cloning.git``
Clones your remote origin repo locally

``git fetch upstream``
Pulls in the remote changes not present in your local repo.
Downloads objects and references from another repository.

``git merge upstream/master``
Merges any changes fetched into your working files

``git add [file]``
Add the file you wish to place in the working tree

``git rebase``
Rebase allows you to [easily change a series of commits, reordering, editing, or squashing commits together into a single commit](https://help.github.com/articles/interactive-rebase).
*Be warned: it's considered bad practice to rebase commits which you have already pushed to a remote repo. Doing so may invoke the wrath of the git gods.