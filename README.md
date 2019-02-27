## Synopsis
Using the React and Django REST framework, add the ability for a user to add services (Hotels, Accommodations and Transportation) to a given trip. These services should have a name, a location, a type and a cost. The sum of all of the costs on a Trip makes the sell price for a trip. This should take no more than 4 hours or so, but more time can be used, if necessary.

## What's the end goal?
We'd like to get a sense of your work! We're looking for well-documented code, that explains what you're doing, and more importantly, the reasoning behind it. This will help us get a better understanding of your thinking process. Frequent, and numerous commits are also encouraged, with sensible, and relevant commit messages.

## Getting started
**Not part of the 4-hour time frame**

First, you'll need to get your environment set up. Here's a quick TODO list, to get things going. We've also added more detailed explanations on some of the tasks.

- [install pip](http://stackoverflow.com/questions/17271319/installing-pip-on-mac-os-x)
- [install git](https://help.github.com/articles/set-up-git/)
- [clone repo](https://github.com/gadventures/precious-challenge/blob/master/README.md#pulling-the-repo)
- Install requirements `pip install -r requirements.txt`
- Run Django Server `python manage.py runserver`
- Run Webpack Server `./node_modules/.bin/webpack --config webpack.config.js --watch`

** Use of virtualenv (and virtualenvwrapper) is recommended.

### Pulling the repo
Create a folder for your work, then do:

`git clone https://github.com/gadventures/precious-challenge.git` or `git clone git@github.com:gadventures/precious-challenge.git`

To install the requirements, do:

`pip install -r requirements.txt`

### Creating a git branch
Before you dive into the code, create a separate branch to do your work. The reason for this is so that you can issue a pull request, which will allow us to review your code. To create a new branch:

`git checkout -b your_branch_name`

**Note: Put your name in the branch so we can identify you.**

We encourage, and recommend frequent commits:

`git commit -ma "your message here"`

That's good for us and you. It helps get a better understanding of your thought process, and problem solving skills.

## The Task
We want you to create an application that lists the trips using React. Users should be able to add services (Hotels, Accommodations and Transportation) to a given trip. These services should have a name, a location, a type and a cost. The sum of all of the costs on a Trip makes the sell price for a trip. The frontend should call the backend via an API call. A 'Trip' and 'Service' can be as detailed as you wish. 

Have one view that lists all trips, at `https://127.0.0.1:8000/`
Have another view that listens for API calls, at `https://127.0.0.1:8000/api/`

## When you're finished
Once you're ready to submit, you can create a pull request on the github project page. After that, you're done!
