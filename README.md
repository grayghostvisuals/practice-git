Get your Practice-Git on!
============

* Git Reference................................................[http://gitref.org/basic](http://gitref.org/basic)
* Pro Git Online Book..........................................[http://git-scm.com/book](http://git-scm.com/book)
* Quick Command Practice.......................................[http://try.github.com](http://try.github.com)
* How to GitHub: Fork, Branch, Track, Squash and Pull Request..[http://gun.io/blog/how-to-github-fork-branch-and-pull-request](http://gun.io/blog/how-to-github-fork-branch-and-pull-request)
* Learn Git Online.............................................[http://learn.github.com/p/intro.html](http://learn.github.com/p/intro.html)
* Git: The Simple Guide........................................[http://rogerdudler.github.com/git-guide](http://rogerdudler.github.com/git-guide)
* Git Immersion................................................[http://gitimmersion.com](http://gitimmersion.com)
Welcome to my practice git repository where you can eff up as much as you'd like plus work with a real, living, breathing person on the other side.
Here we learn all things git. Feel free to send me Pull Requests just to discover what it's like when a Repo Master asks you

<blockquote>
"Can you squash your commits for us"
</blockquote>

and you're all like...

<blockquote>
"How the hell do I do that?"
</blockquote>

This is where we make those mistakes ... so don't be scared :)

##Instructions

Fork this repo and send me a Pull Request with anything from Grandma Peggy's Crumbled Oatmeal Cookie Recipe to your favorite Sublime Text 2 preferences.
It's all good yo! Learning is the prize in this game.

## Typical and highly useful git commands

``git clone git@github.com:<user_name>/the-repo-you-are-cloning.git``
* Clones your remote origin repo locally

``git fetch upstream``
* Pulls in the remote changes not present in your local repo. Downloads objects and references from another repository.

``git merge upstream/master``
* Merges any changes fetched into your working files

``git add <file>``
* Start tracking new files and also stage changes to already tracked files

``git status`` and ``git diff``
* Tells us what files and assets have been modified and staged

``git status -s``
* This will display what files have been removed, changed or modified. 
* (M)  - modified
* (A)  - added
* (AM) - file has not been altered since it was last added

``git commit -m 'the message goes here for the commit'``
* Records a snapshot of the project into your history at the time of your commit.

``git add '*.<file_extension>'``
* This command adds all file types with the same extension, especially from different directories. Without quotes the command will only execute within the same directory it's been called from.

``git rm --cached <file>``
* Unstages a file from the working tree (i.e. stops tracking the file).

``git log``
* Remembers all the changes we've committed so far, in the order we committed them.

``git log --summary``
* See where new files were added for the first time or where files were deleted.

``git remote add origin git@github.com:<user_name>/<repo_name>.git``
* Creates a brand new remote repository.

``git remote -v``
* Show a list of the current remote repositories

``git reset <file>``
* Removes the desired file from staging area.

``git branch -r``
* List all the remote branches currently tracked

``git remote prune origin``
* Deletes branch locally if it has been removed remotely. Helps to remove stale references.

``git checkout <target>``
* Changes the desired target back to the state of the last commit. A target can be a file or a directory (for example).

``git rebase``
* Rebase allows you to [easily change a series of commits, reordering, editing, or squashing commits together into a single commit](https://help.github.com/articles/interactive-rebase).
* Be warned: it's considered bad practice to rebase commits which you have already pushed to a remote repo. Doing so may invoke the wrath of the git gods. [https://help.github.com/articles/interactive-rebase](https://help.github.com/articles/interactive-rebase)