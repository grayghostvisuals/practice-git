Get your Practice-Git on!
============

Git Reference................................................&rarr; [http://gitref.org/basic](http://gitref.org/basic)
Quick Command Practice.......................................&rarr; [http://try.github.com](http://try.github.com)
How to GitHub: Fork, Branch, Track, Squash and Pull Request..&rarr; [http://gun.io/blog/how-to-github-fork-branch-and-pull-request](http://gun.io/blog/how-to-github-fork-branch-and-pull-request)

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

## Typical and highly used git commands

``git clone git@github.com:<user_name>/the-repo-you-are-cloning.git``
* Clones your remote origin repo locally

``git fetch upstream``
* Pulls in the remote changes not present in your local repo.
Downloads objects and references from another repository.

``git merge upstream/master``
* Merges any changes fetched into your working files

``git add [file]``
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

``git rebase``
* Rebase allows you to [easily change a series of commits, reordering, editing, or squashing commits together into a single commit](https://help.github.com/articles/interactive-rebase).
* Be warned: it's considered bad practice to rebase commits which you have already pushed to a remote repo. Doing so may invoke the wrath of the git gods. [https://help.github.com/articles/interactive-rebase](https://help.github.com/articles/interactive-rebase)